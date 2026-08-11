'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { useLoja, type Pedido } from '@/store/loja';
import { brl, soDigitos } from '@/lib/format';
import { waLink } from '@/lib/site';
import {
  CAMPOS_DADOS,
  CAMPOS_ENDERECO,
  CUPONS,
  FRETE_GRATIS_A_PARTIR,
  calcularFrete,
  type Cupom,
  type Frete,
} from '@/lib/pedido';

type Pagamento = 'pix' | 'cartao' | 'boleto';

const FORM_VAZIO: Record<string, string> = {
  nome: '',
  doc: '',
  email: '',
  telefone: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
};

export default function CheckoutPage() {
  const {
    pronto,
    linhas,
    subtotal,
    definirQtd,
    limparCart,
    entrega,
    setEntrega,
    user,
    abrirAuth,
    registrarPedido,
  } = useLoja();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Record<string, string>>(() => ({ ...FORM_VAZIO }));
  const [frete, setFrete] = useState<Frete | null>(null);
  const [pagamento, setPagamento] = useState<Pagamento>('pix');
  const [cartao, setCartao] = useState({ numero: '', titular: '', validade: '', cvv: '' });
  const [erro, setErro] = useState('');
  const [pedido, setPedido] = useState<Pedido | null>(null);

  const [cupomOpen, setCupomOpen] = useState(false);
  const [cupom, setCupom] = useState('');
  const [cupomErro, setCupomErro] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState<(Cupom & { codigo: string }) | null>(null);

  // Preenche os dados do cliente a partir da conta, sem sobrescrever edições.
  const [preenchido, setPreenchido] = useState(false);
  if (user && !preenchido) {
    setPreenchido(true);
    setForm((f) => ({
      ...f,
      nome: [user.nome, user.sobrenome].filter(Boolean).join(' '),
      email: user.email,
      telefone: user.telefone || '',
      doc: user.doc || '',
      ...user.endereco,
    }));
  }

  const freteInfo = entrega === 'entrega' ? frete : null;
  const freteGratis = subtotal >= FRETE_GRATIS_A_PARTIR || cupomAplicado?.tipo === 'frete';
  const freteValor = entrega === 'retirada' || !freteInfo || freteGratis ? 0 : freteInfo.valor;
  const desconto =
    cupomAplicado?.tipo === 'percentual' ? subtotal * (cupomAplicado.valor / 100) : 0;
  const total = subtotal - desconto + freteValor;

  const pedidoWa = useMemo(
    () =>
      waLink(
        'Olá! Quero fechar este pedido:\n\n' +
          linhas.map((l) => `• ${l.qtd}x ${l.nome} — ${brl(l.subtotal)}`).join('\n') +
          '\n\nSubtotal: ' +
          brl(subtotal) +
          '\nRecebimento: ' +
          (entrega === 'retirada'
            ? 'Retirada na Água Chata (com desconto)'
            : 'Entrega na minha região'),
      ),
    [linhas, subtotal, entrega],
  );

  const setCampo = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [id]: e.target.value }));
    setErro('');
  };

  const faltando = () => {
    const req = CAMPOS_DADOS.filter((c) => c.req).map((c) => c.id);
    const reqEnd =
      entrega === 'entrega'
        ? [...CAMPOS_ENDERECO.filter((c) => c.req).map((c) => c.id), 'cep']
        : [];
    return [...req, ...reqEnd].filter((id) => !String(form[id] || '').trim());
  };

  const irStep = (n: number) => {
    if (n === 3 && faltando().length) {
      setErro('Preencha os campos obrigatórios para continuar.');
      return;
    }
    if (n === 3 && entrega === 'entrega' && !frete) {
      setErro('Calcule o frete pelo CEP para continuar.');
      return;
    }
    setStep(n);
    setErro('');
    window.scrollTo(0, 0);
  };

  const buscarFrete = () => {
    const r = calcularFrete(form.cep);
    if (!r) {
      setErro('Digite um CEP com 8 dígitos.');
      return;
    }
    setFrete(r);
    setErro('');
    setForm((f) => ({
      ...f,
      cidade: r.foraDeRota ? f.cidade : r.cidade,
      uf: f.uf || 'SP',
    }));
  };

  const aplicarCupom = () => {
    const codigo = cupom.trim().toUpperCase();
    const achado = CUPONS[codigo];
    if (!achado) {
      setCupomErro('Cupom inválido ou expirado.');
      setCupomAplicado(null);
      return;
    }
    setCupomAplicado({ ...achado, codigo });
    setCupomErro('');
  };

  const finalizar = () => {
    if (pagamento === 'cartao') {
      if (!cartao.numero || !cartao.titular || !cartao.validade || !cartao.cvv) {
        setErro('Preencha os dados do cartão.');
        return;
      }
    }
    // Ponto de integração do gateway: aqui entra a chamada ao serviço de pagamento.
    const novo: Pedido = {
      numero: 'CN-' + String(Math.floor(Math.random() * 9000) + 1000),
      total,
      pagamento,
      entrega,
      frete,
      itens: linhas,
      cliente: form,
      data: new Date().toISOString(),
    };
    registrarPedido(novo);
    limparCart();
    setPedido(novo);
    setStep(4);
    window.scrollTo(0, 0);
  };

  if (!pronto) return <div className="checkout" />;

  if (pedido) {
    return (
      <div className="checkout">
        <div className="sucesso">
          <div className="sucesso__icone">
            <Check size={30} aria-hidden="true" />
          </div>
          <h1>Pedido confirmado</h1>
          <p style={{ fontSize: 17, color: 'var(--texto-suave)', marginTop: 10 }}>
            Pedido <strong style={{ color: 'var(--navy)' }}>{pedido.numero}</strong> registrado.
            Enviamos a confirmação para o seu e-mail e nosso time já foi avisado.
          </p>
          <div className="sucesso__resumo">
            <div>
              <span style={{ color: 'var(--texto-fraco)' }}>Total pago</span>
              <span style={{ color: 'var(--navy)', fontWeight: 700 }}>{brl(pedido.total)}</span>
            </div>
            <div>
              <span style={{ color: 'var(--texto-fraco)' }}>Pagamento</span>
              <span style={{ color: 'var(--navy)', fontWeight: 600 }}>
                {{ pix: 'Pix', cartao: 'Cartão', boleto: 'Boleto' }[pedido.pagamento]}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--texto-fraco)' }}>Recebimento</span>
              <span style={{ color: 'var(--navy)', fontWeight: 600, textAlign: 'right' }}>
                {pedido.entrega === 'retirada'
                  ? 'Retirada na Água Chata, Itaquaquecetuba'
                  : `Entrega em ${pedido.frete?.cidade ?? ''} · ${pedido.frete?.prazo ?? ''}`}
              </span>
            </div>
          </div>
          <div className="linha-acoes" style={{ marginTop: 26, justifyContent: 'center' }}>
            <a
              href={waLink(
                `Olá! Acabei de fazer o pedido ${pedido.numero} no site, total ${brl(pedido.total)}.`,
              )}
              target="_blank"
              rel="noopener"
              className="btn btn--verde btn--lg"
            >
              Falar sobre o pedido
            </a>
            <Link href="/catalogo" className="btn btn--contorno btn--lg">
              Fazer novo pedido
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (linhas.length === 0) {
    return (
      <div className="checkout">
        <Link href="/catalogo" className="btn--fantasma">
          <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: -2 }} aria-hidden="true" />{' '}
          Continuar comprando
        </Link>
        <div
          style={{
            marginTop: 26,
            background: 'var(--azul-secao)',
            borderRadius: 18,
            padding: '40px 26px',
            textAlign: 'center',
          }}
        >
          <div className="vazio__titulo">Seu carrinho está vazio</div>
          <p style={{ fontSize: '15.5px', color: 'var(--texto-suave)', marginTop: 6 }}>
            Escolha os produtos no catálogo para montar seu pedido.
          </p>
          <Link href="/catalogo" className="btn btn--navy" style={{ marginTop: 18 }}>
            Ir ao catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <Link href="/catalogo" className="btn--fantasma">
        <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: -2 }} aria-hidden="true" />{' '}
        Continuar comprando
      </Link>

      <h1>Fechar pedido</h1>
      <div className="checkout__passos">
        <strong>Etapa {step} de 4</strong>
        <span>·</span>
        <span>Dados</span>
        <span>→</span>
        <span>Entrega</span>
        <span>→</span>
        <span>Pagamento</span>
      </div>

      {!user && (
        <div className="login-faixa">
          <div>Já é cliente? Entre para preencher tudo mais rápido.</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={() => abrirAuth('login')}
              className="btn btn--contorno"
              style={{ fontSize: '14.5px', padding: '11px 18px', borderRadius: 11 }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => abrirAuth('cadastro')}
              className="btn btn--navy"
              style={{ fontSize: '14.5px', padding: '11px 18px', borderRadius: 11 }}
            >
              Criar conta
            </button>
          </div>
        </div>
      )}

      <div className="checkout__grid">
        <div>
          {step === 1 && (
            <div className="painel">
              <h2>Seus dados</h2>
              <div className="painel__campos">
                {CAMPOS_DADOS.map((c) => (
                  <label key={c.id} className="campo">
                    {c.label}
                    {c.req ? '' : ' (opcional)'}
                    <input
                      className="input"
                      value={form[c.id] ?? ''}
                      onChange={setCampo(c.id)}
                      placeholder={c.placeholder}
                    />
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={() => irStep(2)}
                className="btn btn--navy btn--bloco"
                style={{ marginTop: 22, fontSize: '16.5px', padding: '15px 20px', borderRadius: 13 }}
              >
                Continuar para entrega
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="painel">
              <h2>Como você quer receber?</h2>
              <div className="opcoes">
                <button
                  type="button"
                  className="opcao"
                  data-sel={entrega === 'entrega'}
                  onClick={() => setEntrega('entrega')}
                >
                  <div className="opcao__titulo">Entrega na minha região</div>
                  <div className="opcao__nota">Calculada pelo CEP, no dia da rota.</div>
                </button>
                <button
                  type="button"
                  className="opcao"
                  data-sel={entrega === 'retirada'}
                  onClick={() => setEntrega('retirada')}
                >
                  <div className="opcao__titulo">Retirar na Água Chata</div>
                  <div className="opcao__nota">Itaquaquecetuba · sem frete.</div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="painel">
              <h2>Pagamento</h2>
              <div className="opcoes opcoes--pagamento">
                {(
                  [
                    ['pix', 'Pix'],
                    ['cartao', 'Cartão'],
                    ['boleto', 'Boleto'],
                  ] as [Pagamento, string][]
                ).map(([id, rotulo]) => (
                  <button
                    key={id}
                    type="button"
                    className="opcao"
                    data-sel={pagamento === id}
                    onClick={() => {
                      setPagamento(id);
                      setErro('');
                    }}
                  >
                    {rotulo}
                  </button>
                ))}
              </div>

              {pagamento === 'pix' && (
                <div className="aviso">
                  <div className="aviso__titulo">Pix em uma etapa</div>
                  <p>
                    Ao finalizar, geramos o QR Code e o código copia e cola. A confirmação é
                    automática.
                  </p>
                  <div className="pix-codigo">
                    {'00020126CASANOVA' + soDigitos(total.toFixed(2)) + '5204000053039865802BR'}
                  </div>
                </div>
              )}

              {pagamento === 'cartao' && (
                <div
                  style={{
                    marginTop: 18,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                    gap: 14,
                  }}
                >
                  <label className="campo">
                    Número do cartão
                    <input
                      className="input"
                      value={cartao.numero}
                      onChange={(e) => setCartao((c) => ({ ...c, numero: e.target.value }))}
                      placeholder="0000 0000 0000 0000"
                      inputMode="numeric"
                    />
                  </label>
                  <label className="campo">
                    Nome impresso
                    <input
                      className="input"
                      value={cartao.titular}
                      onChange={(e) => setCartao((c) => ({ ...c, titular: e.target.value }))}
                      placeholder="Como está no cartão"
                    />
                  </label>
                  <label className="campo">
                    Validade
                    <input
                      className="input"
                      value={cartao.validade}
                      onChange={(e) => setCartao((c) => ({ ...c, validade: e.target.value }))}
                      placeholder="MM/AA"
                    />
                  </label>
                  <label className="campo">
                    CVV
                    <input
                      className="input"
                      value={cartao.cvv}
                      onChange={(e) => setCartao((c) => ({ ...c, cvv: e.target.value }))}
                      placeholder="000"
                      inputMode="numeric"
                    />
                  </label>
                </div>
              )}

              {pagamento === 'boleto' && (
                <div className="aviso">
                  <div className="aviso__titulo">Boleto para CNPJ</div>
                  <p>
                    O boleto é enviado por e-mail e o pedido segue na rota após a confirmação do
                    pagamento.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                <button
                  type="button"
                  onClick={() => irStep(2)}
                  className="btn btn--contorno"
                  style={{ padding: '15px 20px', borderRadius: 13 }}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={finalizar}
                  className="btn btn--sucesso"
                  style={{ flex: 1, fontSize: '16.5px', padding: '15px 20px', borderRadius: 13 }}
                >
                  {pagamento === 'pix'
                    ? 'Gerar Pix e finalizar'
                    : pagamento === 'boleto'
                      ? 'Gerar boleto e finalizar'
                      : `Pagar ${brl(total)}`}
                </button>
              </div>
              <p style={{ fontSize: 13, color: 'var(--texto-tenue)', marginTop: 12 }}>
                Ambiente de demonstração: nenhum pagamento real é processado até a integração
                com o gateway.
              </p>
            </div>
          )}

          {erro && (
            <div className="alerta-erro" style={{ marginTop: 14 }}>
              {erro}
            </div>
          )}
        </div>

        <aside className="resumo">
          <h2>Resumo do pedido</h2>
          <div style={{ marginTop: 14 }}>
            {linhas.map((l) => (
              <div key={l.nome} className="resumo__linha-item">
                <div style={{ flex: 1 }}>
                  <div className="resumo__nome">{l.nome}</div>
                  <div className="resumo__unit">{brl(l.preco)} cada</div>
                </div>
                <div className="qtd qtd--sm">
                  <button
                    type="button"
                    onClick={() => definirQtd(l.nome, l.qtd - 1)}
                    aria-label={`Diminuir ${l.nome}`}
                  >
                    <Minus size={15} aria-hidden="true" />
                  </button>
                  <span>{l.qtd}</span>
                  <button
                    type="button"
                    onClick={() => definirQtd(l.nome, l.qtd + 1)}
                    aria-label={`Aumentar ${l.nome}`}
                  >
                    <Plus size={15} aria-hidden="true" />
                  </button>
                </div>
                <div className="disp resumo__sub">{brl(l.subtotal)}</div>
              </div>
            ))}
          </div>

          {!cupomOpen ? (
            <button type="button" onClick={() => setCupomOpen(true)} className="cupom-aberto">
              <span>
                <Plus size={14} aria-hidden="true" />
              </span>
              Possui um cupom de desconto?
            </button>
          ) : (
            <div className="cupom-box">
              <label className="campo">
                Cupom de desconto
                <div className="campo-linha">
                  <input
                    className="input"
                    style={{ textTransform: 'uppercase', padding: '11px 13px', borderRadius: 10 }}
                    value={cupom}
                    onChange={(e) => {
                      setCupom(e.target.value);
                      setCupomErro('');
                    }}
                    placeholder="PRIMEIRA10"
                  />
                  <button
                    type="button"
                    onClick={aplicarCupom}
                    className="btn"
                    style={{
                      background: 'var(--azul)',
                      color: '#fff',
                      fontSize: '14.5px',
                      padding: '11px 16px',
                      borderRadius: 10,
                    }}
                  >
                    Aplicar
                  </button>
                </div>
              </label>
              {cupomErro && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: '13.5px',
                    color: 'var(--perigo)',
                    fontWeight: 600,
                  }}
                >
                  {cupomErro}
                </div>
              )}
              {cupomAplicado && (
                <div className="cupom-ok">
                  <span>
                    {cupomAplicado.codigo} · {cupomAplicado.texto}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCupomAplicado(null);
                      setCupom('');
                      setCupomErro('');
                    }}
                    style={{ fontSize: 13, color: 'var(--verde-texto)', fontWeight: 600 }}
                  >
                    remover
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="resumo__total-linha" style={{ marginTop: 16 }}>
            <span>Subtotal</span>
            <strong>{brl(subtotal)}</strong>
          </div>
          {desconto > 0 && (
            <div className="resumo__total-linha resumo__desconto">
              <span>Desconto ({cupomAplicado?.codigo})</span>
              <span style={{ fontWeight: 700 }}>- {brl(desconto)}</span>
            </div>
          )}
          <div className="resumo__total-linha">
            <span>{entrega === 'retirada' ? 'Retirada' : 'Frete'}</span>
            <strong>
              {freteValor === 0
                ? entrega === 'retirada'
                  ? 'sem frete'
                  : freteInfo
                    ? 'grátis'
                    : 'calcule pelo CEP'
                : brl(freteValor)}
            </strong>
          </div>
          <div className="resumo__divisor" />
          <div className="resumo__total">
            <span>Total</span>
            <b className="disp">{brl(total)}</b>
          </div>
          <a href={pedidoWa} target="_blank" rel="noopener" className="resumo__wa">
            Prefiro fechar pelo WhatsApp
          </a>
        </aside>
      </div>

      {step === 2 && (
        <div className="painel" style={{ marginTop: 20 }}>
          {entrega === 'entrega' && (
            <div>
              <h2 style={{ marginBottom: 18 }}>Endereço de entrega</h2>
              <label className="campo">
                CEP de entrega
                <div className="campo-linha">
                  <input
                    className="input"
                    value={form.cep}
                    onChange={setCampo('cep')}
                    placeholder="07000-000"
                    inputMode="numeric"
                  />
                  <button
                    type="button"
                    onClick={buscarFrete}
                    className="btn"
                    style={{
                      background: 'var(--azul)',
                      color: '#fff',
                      fontSize: 15,
                      padding: '12px 20px',
                      borderRadius: 11,
                    }}
                  >
                    Calcular
                  </button>
                </div>
              </label>

              {freteInfo && (
                <div className="frete-box">
                  <div className="frete-box__cidade">{freteInfo.cidade}</div>
                  <div style={{ fontSize: '14.5px', color: 'var(--texto-suave)', marginTop: 3 }}>
                    Prazo: {freteInfo.prazo} · Frete: {brl(freteInfo.valor)}
                  </div>
                  {freteGratis && (
                    <div
                      style={{
                        fontSize: 14,
                        color: 'var(--verde-forte)',
                        fontWeight: 700,
                        marginTop: 6,
                      }}
                    >
                      Seu pedido tem frete grátis.
                    </div>
                  )}
                </div>
              )}

              <div style={{ fontSize: '13.5px', color: 'var(--texto-tenue)', marginTop: 10 }}>
                Pedidos acima de {brl(FRETE_GRATIS_A_PARTIR)} têm frete grátis na rota própria.
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 14,
                  marginTop: 18,
                }}
              >
                {CAMPOS_ENDERECO.map((c) => (
                  <label key={c.id} className="campo">
                    {c.label}
                    {c.req ? '' : ' (opcional)'}
                    <input
                      className="input"
                      value={form[c.id] ?? ''}
                      onChange={setCampo(c.id)}
                      placeholder={c.placeholder}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <button
              type="button"
              onClick={() => irStep(1)}
              className="btn btn--contorno"
              style={{ padding: '15px 20px', borderRadius: 13 }}
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => irStep(3)}
              className="btn btn--navy"
              style={{ flex: 1, fontSize: '16.5px', padding: '15px 20px', borderRadius: 13 }}
            >
              Ir para o pagamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
