import { WhatsAppIcon } from '../WhatsAppIcon';
import { site, waCotacao } from '@/lib/site';

export function ChamadaFinal() {
  return (
    <section className="chamada-final">
      <div className="container">
        <h2>
          Faça sua <span className="mark mark--verde">primeira cotação</span> agora
        </h2>
        <p>
          Manda sua lista no WhatsApp e receba o preço na hora. Sem cadastro, sem compromisso.
        </p>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
          <a href={waCotacao()} target="_blank" rel="noopener" className="btn btn--verde btn--xl">
            <WhatsAppIcon size={24} />
            {site.mainCtaText}
          </a>
        </div>
      </div>
    </section>
  );
}
