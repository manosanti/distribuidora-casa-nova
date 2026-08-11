import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CatalogoClient } from './CatalogoClient';
import { NICHOS, PRODUTOS } from '@/lib/catalogo';

export const metadata: Metadata = {
  title: 'Catálogo completo',
  description:
    'Vassouras, sacos de lixo, produtos de limpeza, descartáveis, higiene e utensílios com preço de atacado para comércios do Alto Tietê.',
};

const primeiro = (v: string | string[] | undefined) =>
  typeof v === 'string' ? v : Array.isArray(v) ? (v[0] ?? '') : '';

export default async function CatalogoPage(props: PageProps<'/catalogo'>) {
  const sp = await props.searchParams;
  const nichoParam = primeiro(sp.nicho);
  const nicho = NICHOS.some((n) => n.id === nichoParam) ? nichoParam : 'todos';
  const busca = primeiro(sp.busca);

  return (
    <>
      <section className="catalogo__capa">
        <div className="container">
          <Link href="/" className="btn--fantasma" style={{ color: 'var(--azul-medio)' }}>
            <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: -2 }} aria-hidden="true" />{' '}
            Início
          </Link>
          <h1>Catálogo completo</h1>
          <p>
            {PRODUTOS.length} itens em {NICHOS.length} nichos. Escolha um produto para ver os
            detalhes ou peça sua cotação direto no WhatsApp.
          </p>
        </div>
      </section>

      {/* A key remonta os filtros quando a home aponta para outro nicho/busca. */}
      <CatalogoClient key={`${nicho}|${busca}`} nichoInicial={nicho} buscaInicial={busca} />
    </>
  );
}
