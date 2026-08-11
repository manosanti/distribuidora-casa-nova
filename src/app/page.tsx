import { Hero } from '@/components/home/Hero';
import { NichosHero } from '@/components/home/NichosHero';
import { Destaques } from '@/components/home/Destaques';
import { AreaAtendimento } from '@/components/home/AreaAtendimento';
import { PorQueComprar } from '@/components/home/PorQueComprar';
import { NichosCatalogo } from '@/components/home/NichosCatalogo';
import { ProvaSocial } from '@/components/home/ProvaSocial';
import { ComoFunciona } from '@/components/home/ComoFunciona';
import { Faq } from '@/components/home/Faq';
import { OndeEstamos } from '@/components/home/OndeEstamos';
import { ChamadaFinal } from '@/components/home/ChamadaFinal';

export default function Home() {
  return (
    <>
      <Hero />
      <NichosHero />
      <Destaques />
      <AreaAtendimento />
      <PorQueComprar />
      <NichosCatalogo />
      <ProvaSocial />
      <ComoFunciona />
      <Faq />
      <OndeEstamos />
      <ChamadaFinal />
    </>
  );
}
