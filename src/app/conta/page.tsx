import type { Metadata } from 'next';
import { ContaClient } from './ContaClient';

export const metadata: Metadata = {
  title: 'Minha conta',
  robots: { index: false },
};

const TABS = ['perfil', 'pedidos', 'config'] as const;
type Tab = (typeof TABS)[number];

export default async function ContaPage(props: PageProps<'/conta'>) {
  const sp = await props.searchParams;
  const bruto = typeof sp.tab === 'string' ? sp.tab : '';
  const tab: Tab = (TABS as readonly string[]).includes(bruto) ? (bruto as Tab) : 'perfil';

  return <ContaClient key={tab} tabInicial={tab} />;
}
