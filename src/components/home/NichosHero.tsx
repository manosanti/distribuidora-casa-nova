import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ImageSlot } from '../ImageSlot';
import { NICHOS } from '@/lib/catalogo';

export function NichosHero() {
  return (
    <div className="container nichos-hero">
      <div className="nichos-hero__grid">
        {NICHOS.slice(0, 4).map((n) => (
          <Link key={n.id} href={`/catalogo?nicho=${n.id}`} className="nicho-hero">
            <div className="moldura moldura--16x10">
              <ImageSlot hint={n.slotHint} />
            </div>
            <div className="nicho-hero__corpo">
              <div className="nicho-hero__nome">{n.nome}</div>
              <span className="ver-produtos">
                Ver produtos <ArrowRight size={15} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
