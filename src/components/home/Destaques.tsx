import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProdutoCard } from '../ProdutoCard';
import { DESTAQUES, produtoPorNome } from '@/lib/catalogo';

export function Destaques() {
  const produtos = DESTAQUES.map(produtoPorNome).filter((p) => p !== undefined);

  return (
    <section>
      <div className="container" style={{ padding: '20px var(--gutter) 72px' }}>
        <div className="destaques__topo">
          <div>
            <div className="eyebrow">Carro-chefe</div>
            <h2 className="titulo-secao" style={{ fontSize: 'clamp(26px, 5vw, 42px)', maxWidth: 620 }}>
              Os itens que mais saem toda semana
            </h2>
            <p style={{ fontSize: 17, color: 'var(--texto-suave)', marginTop: 12, maxWidth: 560 }}>
              Preço de atacado, pronta entrega. Adicione ao carrinho ou peça no WhatsApp.
            </p>
          </div>
          <Link href="/catalogo" className="btn btn--suave" style={{ fontSize: '15.5px' }}>
            Ver todos <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid-produtos">
          {produtos.map((p) => (
            <ProdutoCard key={p.nome} produto={p} variante="destaque" />
          ))}
        </div>
      </div>
    </section>
  );
}
