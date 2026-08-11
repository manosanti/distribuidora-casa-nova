'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Minus, Plus, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useLoja } from '@/store/loja';
import { brl } from '@/lib/format';
import { waLink } from '@/lib/site';

export function CartDrawer() {
  const {
    cartOpen,
    fecharCart,
    linhas,
    subtotal,
    definirQtd,
    entrega,
  } = useLoja();
  const router = useRouter();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharCart();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cartOpen, fecharCart]);

  if (!cartOpen) return null;

  const pedidoWa = waLink(
    'Olá! Quero fechar este pedido:\n\n' +
      linhas.map((l) => `• ${l.qtd}x ${l.nome} — ${brl(l.subtotal)}`).join('\n') +
      '\n\nSubtotal: ' +
      brl(subtotal) +
      '\nRecebimento: ' +
      (entrega === 'retirada'
        ? 'Retirada na Água Chata (com desconto)'
        : 'Entrega na minha região'),
  );

  const irPara = (rota: string) => {
    fecharCart();
    router.push(rota);
  };

  return (
    <div className="gaveta" role="dialog" aria-modal="true" aria-label="Seu carrinho">
      <button
        type="button"
        onClick={fecharCart}
        aria-label="Fechar carrinho"
        className="gaveta__backdrop"
      />
      <aside className="gaveta__painel">
        <div className="gaveta__topo">
          <div
            style={{
              fontWeight: 700,
              fontSize: 19,
              color: 'var(--navy)',
              fontFamily: 'var(--font-sora), sans-serif',
            }}
          >
            Seu carrinho
          </div>
          <button type="button" onClick={fecharCart} aria-label="Fechar" className="fechar">
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="gaveta__lista">
          {linhas.length === 0 ? (
            <div
              style={{
                padding: '40px 24px',
                textAlign: 'center',
                color: 'var(--texto-fraco)',
                fontSize: '15.5px',
              }}
            >
              Nenhum item ainda. Adicione produtos do catálogo.
            </div>
          ) : (
            linhas.map((l) => (
              <div key={l.nome} className="gaveta__item">
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '15.5px',
                    color: 'var(--navy)',
                    fontFamily: 'var(--font-sora), sans-serif',
                  }}
                >
                  {l.nome}
                </div>
                <div style={{ fontSize: 13, color: 'var(--texto-fraco)', marginTop: 2 }}>
                  {brl(l.preco)} · {l.venda}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    marginTop: 10,
                  }}
                >
                  <div className="qtd">
                    <button
                      type="button"
                      onClick={() => definirQtd(l.nome, l.qtd - 1)}
                      aria-label={`Diminuir ${l.nome}`}
                    >
                      <Minus size={16} aria-hidden="true" />
                    </button>
                    <span>{l.qtd}</span>
                    <button
                      type="button"
                      onClick={() => definirQtd(l.nome, l.qtd + 1)}
                      aria-label={`Aumentar ${l.nome}`}
                    >
                      <Plus size={16} aria-hidden="true" />
                    </button>
                  </div>
                  <div
                    className="disp"
                    style={{ fontWeight: 800, fontSize: '16.5px', color: 'var(--navy)' }}
                  >
                    {brl(l.subtotal)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="gaveta__rodape">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 12,
            }}
          >
            <span style={{ fontSize: '15.5px', color: 'var(--texto-suave)' }}>Subtotal</span>
            <span className="disp" style={{ fontWeight: 800, fontSize: 24, color: 'var(--navy)' }}>
              {brl(subtotal)}
            </span>
          </div>
          <div style={{ fontSize: '13.5px', color: 'var(--texto-tenue)', marginTop: 4 }}>
            Frete confirmado no fechamento do pedido.
          </div>
          <button
            type="button"
            onClick={() => irPara('/catalogo')}
            className="btn btn--contorno btn--bloco"
            style={{ marginTop: 14 }}
          >
            Continuar comprando
          </button>
          <button
            type="button"
            onClick={() => irPara('/checkout')}
            className="btn btn--navy btn--bloco"
            style={{ marginTop: 10 }}
            disabled={linhas.length === 0}
          >
            Fechar pedido
          </button>
          <a
            href={pedidoWa}
            target="_blank"
            rel="noopener"
            className="btn btn--verde btn--bloco"
            style={{ marginTop: 10 }}
          >
            <WhatsAppIcon size={20} />
            Pedir pelo WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
}
