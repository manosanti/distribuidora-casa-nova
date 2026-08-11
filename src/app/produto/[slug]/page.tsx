import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdicionarButton } from './AdicionarButton';
import { ImageSlot } from '@/components/ImageSlot';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { brl } from '@/lib/format';
import { waLink } from '@/lib/site';
import {
  OFERTAS,
  PRODUTOS,
  nichoNome,
  precoDe,
  precoPor,
  produtoPorSlug,
  produtoSlug,
  temOferta,
} from '@/lib/catalogo';

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: produtoSlug(p.nome) }));
}

export async function generateMetadata(
  props: PageProps<'/produto/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const produto = produtoPorSlug(slug);
  if (!produto) return { title: 'Produto não encontrado' };
  return { title: produto.nome, description: produto.descricao };
}

export default async function ProdutoPage(props: PageProps<'/produto/[slug]'>) {
  const { slug } = await props.params;
  const produto = produtoPorSlug(slug);
  if (!produto) notFound();

  const nicho = nichoNome(produto.nicho);
  const emOferta = temOferta(produto.nome);
  const relacionados = PRODUTOS.filter(
    (p) => p.nicho === produto.nicho && produtoSlug(p.nome) !== slug,
  ).slice(0, 4);

  return (
    <>
      <section>
        <nav className="container trilha" aria-label="Você está em">
          <Link href="/">Início</Link>
          <span>/</span>
          <Link href="/catalogo">Catálogo</Link>
          <span>/</span>
          <Link href={`/catalogo?nicho=${produto.nicho}`}>{nicho}</Link>
          <span>/</span>
          <span className="trilha__atual">{produto.nome}</span>
        </nav>

        <div className="container produto-detalhe">
          <div className="produto-detalhe__foto">
            <div className="moldura moldura--1x1">
              <ImageSlot hint={produto.nome} />
            </div>
          </div>

          <div>
            <div className="produto-detalhe__tag">{nicho}</div>
            <h1>{produto.nome}</h1>
            <p className="produto-detalhe__desc">{produto.descricao}</p>

            <dl className="specs">
              {produto.specs.map(([rotulo, valor]) => (
                <div key={rotulo} className="specs__linha">
                  <dt className="specs__rotulo">{rotulo}</dt>
                  <dd className="specs__valor">{valor}</dd>
                </div>
              ))}
            </dl>

            <div className="preco-box">
              {emOferta && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 15,
                      color: 'var(--texto-tenue)',
                      textDecoration: 'line-through',
                    }}
                  >
                    {brl(precoDe(produto.nome))}
                  </span>
                  <span className="badge-oferta">{OFERTAS[produto.nome]}% OFF</span>
                </div>
              )}
              <div className="disp preco-box__valor">{brl(precoPor(produto.nome))}</div>
              <div className="preco-box__nota">
                {produto.venda} · preço de atacado. Quantidade maior pode ter condição melhor —
                pergunte no WhatsApp.
              </div>
            </div>

            <div className="linha-acoes" style={{ marginTop: 20 }}>
              <AdicionarButton nome={produto.nome} />
            </div>

            <div className="linha-acoes" style={{ marginTop: 12 }}>
              <a
                href={waLink(`Olá! Quero cotação do item: ${produto.nome}.`)}
                target="_blank"
                rel="noopener"
                className="btn btn--verde"
                style={{ fontSize: '17.5px', padding: '16px 28px', borderRadius: 14 }}
              >
                <WhatsAppIcon size={22} />
                Pedir cotação deste item
              </a>
              <Link
                href="/catalogo"
                className="btn btn--contorno"
                style={{ fontSize: '16.5px', padding: '15px 24px', borderRadius: 14 }}
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Voltar ao catálogo
              </Link>
            </div>

            <div className="garantias">
              <span>
                <span className="ponto ponto--verde" aria-hidden="true" />
                Entrega na sua região
              </span>
              <span>
                <span className="ponto ponto--azul" aria-hidden="true" />
                Retirada com desconto
              </span>
            </div>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section className="secao--clara">
          <div className="container" style={{ paddingBlock: 56 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(24px, 4.4vw, 34px)', color: 'var(--navy)' }}>
              Outros itens de {nicho}
            </h2>
            <div className="grid-produtos" style={{ marginTop: 26 }}>
              {relacionados.map((r) => (
                <Link key={r.nome} href={`/produto/${produtoSlug(r.nome)}`} className="relacionado">
                  <div className="moldura moldura--1x1">
                    <ImageSlot hint={r.nome} />
                  </div>
                  <div style={{ padding: '16px 18px 18px' }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: 'var(--navy)',
                        fontFamily: 'var(--font-sora), sans-serif',
                        lineHeight: 1.25,
                      }}
                    >
                      {r.nome}
                    </div>
                    <div style={{ fontSize: '13.5px', color: 'var(--texto-fraco)', marginTop: 4 }}>
                      {r.venda}
                    </div>
                    <div
                      className="disp"
                      style={{ fontWeight: 800, fontSize: 18, color: 'var(--navy)', marginTop: 8 }}
                    >
                      {brl(precoPor(r.nome))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
