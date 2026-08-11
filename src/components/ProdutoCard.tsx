'use client';

import Link from 'next/link';
import { ImageSlot } from './ImageSlot';
import { useLoja } from '@/store/loja';
import { brl } from '@/lib/format';
import {
  OFERTAS,
  SELOS,
  foraEstoque,
  nichoNome,
  precoDe,
  precoPor,
  produtoSlug,
  temOferta,
  type Produto,
} from '@/lib/catalogo';

type Props = {
  produto: Produto;
  /** `destaque` reproduz o cartão da home (selo + sem badge de nicho). */
  variante?: 'catalogo' | 'destaque';
};

export function ProdutoCard({ produto, variante = 'catalogo' }: Props) {
  const { adicionar } = useLoja();
  const href = `/produto/${produtoSlug(produto.nome)}`;
  const emOferta = temOferta(produto.nome);
  const semEstoque = foraEstoque(produto.nome);
  const selo = SELOS[produto.nome];

  return (
    <article className="produto">
      <Link href={href} className="produto__foto" aria-label={produto.nome}>
        <ImageSlot hint={produto.nome} />
        {variante === 'destaque' && selo ? (
          <span className="selo selo--destaque">{selo}</span>
        ) : (
          <>
            {emOferta && (
              <span className="selo selo--oferta">{OFERTAS[produto.nome]}% OFF</span>
            )}
            {semEstoque && <span className="selo selo--estoque">Sob encomenda</span>}
          </>
        )}
      </Link>

      <div className="produto__corpo">
        {variante === 'catalogo' && (
          <div className="produto__nicho">{nichoNome(produto.nicho)}</div>
        )}
        <Link href={href} className="produto__nome">
          {produto.nome}
        </Link>
        <div className="produto__venda">{produto.venda}</div>

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          {emOferta && <div className="produto__preco-de">{brl(precoDe(produto.nome))}</div>}
          <div className="disp produto__preco">{brl(precoPor(produto.nome))}</div>
        </div>

        {variante === 'destaque' ? (
          <button
            type="button"
            onClick={() => adicionar(produto.nome)}
            className="btn btn--navy btn--bloco"
            style={{ marginTop: 4, fontSize: 15, padding: '12px 16px', borderRadius: 11 }}
          >
            Adicionar
          </button>
        ) : (
          <div className="produto__acoes">
            <button
              type="button"
              onClick={() => adicionar(produto.nome)}
              className="btn btn--navy"
              style={{ flex: 1, fontSize: '14.5px', padding: '11px 12px', borderRadius: 11 }}
            >
              Adicionar
            </button>
            <Link
              href={href}
              className="btn btn--suave"
              style={{ fontSize: '14.5px', padding: '11px 14px', borderRadius: 11 }}
            >
              Detalhes
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
