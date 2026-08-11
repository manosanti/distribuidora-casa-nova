'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ClipboardList, Settings, User as UserIcon } from 'lucide-react';
import { useLoja, type Prefs } from '@/store/loja';
import { brl } from '@/lib/format';
import { CAMPOS_PERFIL } from '@/lib/pedido';

type Tab = 'perfil' | 'pedidos' | 'config';

const PREFS_UI: { chave: keyof Prefs; titulo: string; nota: string }[] = [
  {
    chave: 'avisosWhats',
    titulo: 'Avisos de pedido no WhatsApp',
    nota: 'Confirmação, saída para entrega e chegada na sua região.',
  },
  {
    chave: 'ofertasEmail',
    titulo: 'Ofertas por e-mail',
    nota: 'Promoções e novidades do catálogo, no máximo uma vez por semana.',
  },
  {
    chave: 'salvarEndereco',
    titulo: 'Salvar endereço de entrega',
    nota: 'Deixa o checkout preenchido na próxima compra.',
  },
];

export function ContaClient({ tabInicial }: { tabInicial: Tab }) {
  const { pronto, user, prefs, pedidos, salvarUser, togglePref, excluirConta, abrirAuth } =
    useLoja();

  const [tab, setTab] = useState<Tab>(tabInicial);
  const [perfil, setPerfil] = useState<Record<string, string>>({});
  const [carregado, setCarregado] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState('');

  if (user && !carregado) {
    setCarregado(true);
    setPerfil({
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
      telefone: user.telefone,
      empresa: user.empresa,
      doc: user.doc,
    });
  }

  if (!pronto) return <div className="conta" />;

  if (!user) {
    return (
      <div className="conta">
        <Link href="/" className="btn--fantasma">
          <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: -2 }} aria-hidden="true" />{' '}
          Início
        </Link>
        <div className="estado-vazio" style={{ marginTop: 26 }}>
          <div className="vazio__titulo">Você ainda não está logado</div>
          <p style={{ marginTop: 6 }}>Entre ou crie uma conta para ver seus dados e pedidos.</p>
          <button
            type="button"
            onClick={() => abrirAuth('login')}
            className="btn btn--navy"
            style={{ marginTop: 16 }}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const iniciais =
    ((user.nome?.[0] ?? '') + (user.sobrenome?.[0] ?? '')).toUpperCase() || '?';
  const nomeCompleto = [user.nome, user.sobrenome].filter(Boolean).join(' ');

  const salvarPerfil = () => {
    if (!perfil.nome || !perfil.email) {
      setErro('Nome e e-mail são obrigatórios.');
      return;
    }
    salvarUser({ ...user, ...perfil, prefs } as typeof user);
    setErro('');
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2500);
  };

  return (
    <div className="conta">
      <Link href="/" className="btn--fantasma">
        <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: -2 }} aria-hidden="true" />{' '}
        Início
      </Link>

      <div className="conta__cabecalho">
        <span className="avatar avatar--lg">{iniciais}</span>
        <div style={{ minWidth: 0 }}>
          <h1>{nomeCompleto}</h1>
          <div style={{ fontSize: '15.5px', color: 'var(--texto-fraco)', marginTop: 2 }}>
            {user.email}
          </div>
        </div>
      </div>

      <div className="conta__grid">
        <nav className="conta__menu" aria-label="Seções da conta">
          <button type="button" aria-current={tab === 'perfil'} onClick={() => setTab('perfil')}>
            <UserIcon size={17} aria-hidden="true" />
            Meu perfil
          </button>
          <button type="button" aria-current={tab === 'pedidos'} onClick={() => setTab('pedidos')}>
            <ClipboardList size={17} aria-hidden="true" />
            Meus pedidos
          </button>
          <button type="button" aria-current={tab === 'config'} onClick={() => setTab('config')}>
            <Settings size={17} aria-hidden="true" />
            Configurações
          </button>
        </nav>

        <div className="conta__conteudo">
          {tab === 'perfil' && (
            <div className="conta__painel">
              <h2>Dados pessoais</h2>
              <p style={{ fontSize: 15, color: 'var(--texto-fraco)', marginTop: 6 }}>
                Usamos estes dados para preencher seus pedidos automaticamente.
              </p>
              <div className="conta__campos">
                {CAMPOS_PERFIL.map((c) => (
                  <label key={c.id} className="campo">
                    {c.label}
                    {c.req ? '' : ' (opcional)'}
                    <input
                      className="input"
                      value={perfil[c.id] ?? ''}
                      onChange={(e) => {
                        setPerfil((p) => ({ ...p, [c.id]: e.target.value }));
                        setErro('');
                      }}
                      placeholder={c.placeholder}
                    />
                  </label>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 14,
                  marginTop: 22,
                }}
              >
                <button type="button" onClick={salvarPerfil} className="btn btn--navy">
                  Salvar alterações
                </button>
                {salvo && (
                  <span
                    style={{ fontSize: '14.5px', color: 'var(--verde-texto)', fontWeight: 700 }}
                  >
                    Dados salvos.
                  </span>
                )}
              </div>
              {erro && (
                <div className="alerta-erro" style={{ marginTop: 14 }}>
                  {erro}
                </div>
              )}
            </div>
          )}

          {tab === 'pedidos' && (
            <div className="conta__painel">
              <h2>Meus pedidos</h2>
              {pedidos.length === 0 ? (
                <div className="estado-vazio">
                  <div>Você ainda não fez pedidos por aqui.</div>
                  <Link href="/catalogo" className="btn btn--navy" style={{ marginTop: 16 }}>
                    Ver catálogo
                  </Link>
                </div>
              ) : (
                <div
                  style={{
                    marginTop: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {pedidos.map((p) => (
                    <div key={p.numero} className="pedido">
                      <div style={{ flex: 1, minWidth: 150 }}>
                        <div className="pedido__numero">{p.numero}</div>
                        <div className="pedido__meta">
                          {new Date(p.data).toLocaleDateString('pt-BR')} · {p.itens.length}{' '}
                          {p.itens.length === 1 ? 'item' : 'itens'} ·{' '}
                          {p.entrega === 'retirada' ? 'Retirada' : 'Entrega'}
                        </div>
                      </div>
                      <span className="pedido__status">Confirmado</span>
                      <div
                        className="disp"
                        style={{ fontWeight: 800, fontSize: 18, color: 'var(--navy)' }}
                      >
                        {brl(p.total)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'config' && (
            <div className="conta__painel">
              <h2>Configurações</h2>
              <div style={{ marginTop: 20 }}>
                {PREFS_UI.map((p) => (
                  <div key={p.chave} className="pref">
                    <div>
                      <div className="pref__titulo">{p.titulo}</div>
                      <div className="pref__nota">{p.nota}</div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={prefs[p.chave]}
                      aria-label={p.titulo}
                      className="switch switch--lg"
                      data-on={prefs[p.chave]}
                      onClick={() => togglePref(p.chave)}
                    >
                      <span />
                    </button>
                  </div>
                ))}
              </div>

              <div className="zona-perigo">
                <div className="pref__titulo">Excluir minha conta</div>
                <p>Apaga seus dados e o histórico de pedidos deste navegador.</p>
                <button
                  type="button"
                  onClick={excluirConta}
                  className="btn btn--perigo"
                  style={{ marginTop: 14, fontSize: 15, padding: '13px 20px' }}
                >
                  Excluir conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
