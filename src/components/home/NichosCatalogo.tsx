import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImageSlot } from '../ImageSlot';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { NICHOS } from '@/lib/catalogo';
import { waLista } from '@/lib/site';

export function NichosCatalogo() {
  return (
    <section className="secao--clara">
      <div className="container secao">
        <div className="eyebrow">Catálogo</div>
        <h2 className="titulo-secao" style={{ maxWidth: 720 }}>
          Tudo pra limpeza do seu comércio em um lugar só
        </h2>
        <p className="sub-secao">
          Do básico do dia a dia ao que falta na hora do aperto. Escolha um nicho para ver os
          produtos.
        </p>

        <div className="nichos-grid">
          {NICHOS.map((n) => (
            <Link key={n.id} href={`/catalogo?nicho=${n.id}`} className="nicho-card">
              <div className="moldura moldura--4x3" style={{ background: '#eef3fa' }}>
                <ImageSlot hint={n.slotHint} />
                <span className="disp nicho-card__num">{n.num}</span>
              </div>
              <div className="nicho-card__corpo">
                <div className="nicho-card__nome">{n.nome}</div>
                <div className="nicho-card__resumo">{n.resumo}</div>
                <span className="ver-produtos" style={{ fontSize: '14.5px', paddingTop: 14 }}>
                  Ver produtos <ArrowRight size={15} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="linha-acoes" style={{ marginTop: 32 }}>
          <Link href="/catalogo" className="btn btn--navy btn--lg">
            Ver catálogo completo <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={waLista()} target="_blank" rel="noopener" className="btn btn--verde btn--lg">
            <WhatsAppIcon size={20} />
            Peça a lista com preços
          </a>
        </div>
      </div>
    </section>
  );
}
