import type { Metadata, Viewport } from 'next';
import { Hanken_Grotesk, Sora } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { AuthModal } from '@/components/AuthModal';
import { StickyWhatsApp } from '@/components/StickyWhatsApp';
import { LojaProvider } from '@/store/loja';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Distribuidora Casa Nova — material de limpeza no atacado',
    template: '%s · Distribuidora Casa Nova',
  },
  description:
    'Atacado de material de limpeza para comércios do Alto Tietê: Guarulhos, Itaquaquecetuba, Arujá, Mogi das Cruzes, Suzano e Poá. Entrega própria e retirada com desconto.',
};

export const viewport: Viewport = {
  themeColor: '#0e2748',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${hanken.variable}`}>
      <body>
        <LojaProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <AuthModal />
          <StickyWhatsApp />
        </LojaProvider>
      </body>
    </html>
  );
}
