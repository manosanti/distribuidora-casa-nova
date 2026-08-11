'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Store, Truck, UserRound } from 'lucide-react';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { site, waCotacao } from '@/lib/site';

export function Hero() {
  const [busca, setBusca] = useState('');
  const router = useRouter();

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    const q = busca.trim();
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : '/catalogo');
  };

  return (
    <section className="hero">
      <div className="hero__brilho hero__brilho--azul" aria-hidden="true" />
      <div className="hero__brilho hero__brilho--verde" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__ponto" aria-hidden="true" />
          Atacado de limpeza · Alto Tietê
        </div>

        <h1 className="hero__titulo">
          Material de limpeza que <span className="mark mark--verde">dura</span>, entregue
          direto no seu comércio
        </h1>
        <p className="hero__texto">
          Variedade e qualidade de verdade para comércios de Guarulhos, Itaquá, Mogi, Arujá,
          Suzano e região, com atendimento direto com quem entende.
        </p>

        <div className="hero__acoes">
          <form className="hero__busca" onSubmit={buscar} role="search">
            <Search size={18} color="#8494a8" aria-hidden="true" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Saco de lixo, detergente, papel…"
              aria-label="Buscar produtos"
            />
            <button
              type="submit"
              className="btn btn--navy"
              style={{ fontSize: 15, padding: '12px 20px', borderRadius: 11 }}
            >
              Buscar
            </button>
          </form>

          <a href={waCotacao()} target="_blank" rel="noopener" className="btn btn--verde btn--lg">
            <WhatsAppIcon size={21} />
            {site.mainCtaText}
          </a>
        </div>

        <div className="hero__provas">
          <span className="hero__prova">
            <Truck size={17} color="#7fb0ee" aria-hidden="true" />
            Entrega própria na região
          </span>
          <span className="hero__prova">
            <Store size={17} color="#7fb0ee" aria-hidden="true" />
            Retirada com desconto
          </span>
          <span className="hero__prova">
            <UserRound size={17} color="#7fb0ee" aria-hidden="true" />
            Fala direto com o dono
          </span>
        </div>
      </div>
    </section>
  );
}
