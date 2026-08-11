import { Truck } from 'lucide-react';
import { ImageSlot } from '../ImageSlot';

const ROTA = [
  'Guarulhos',
  'Arujá',
  'Itaquaquecetuba',
  'Mogi das Cruzes',
  'Suzano',
  'Poá',
];

export function AreaAtendimento() {
  return (
    <section className="secao--escura">
      <div className="container" style={{ paddingBlock: 64 }}>
        <div className="eyebrow eyebrow--claro">Área de atendimento</div>
        <h2 className="titulo-secao titulo-secao--claro" style={{ maxWidth: 820 }}>
          Distribuidora de material de limpeza no Alto Tietê
        </h2>
        <p className="sub-secao sub-secao--claro" style={{ maxWidth: 640 }}>
          Atendemos comércios em toda a região, com entrega própria e opção de retirada.
        </p>

        <div className="atendimento__grid">
          <div className="painel-escuro">
            <div className="rota__titulo">
              <Truck size={20} color="#7fb0ee" aria-hidden="true" />
              <span>Rota da semana</span>
            </div>
            {ROTA.map((cidade, i) => (
              <div key={cidade} className="rota__item">
                <span className="rota__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="rota__cidade">{cidade}</span>
                <span className="rota__dia">[dia da rota]</span>
              </div>
            ))}
            <div className="rota__nota">Confirme o dia da sua cidade pelo WhatsApp.</div>
          </div>

          <div className="atendimento__coluna">
            <div className="atendimento__foto">
              <ImageSlot hint="Foto: caminhão / entrega no comércio" escuro />
              <span className="atendimento__tag">Frota própria</span>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="disp stat__valor">6</div>
                <div className="stat__rotulo">cidades na rota própria</div>
              </div>
              <div className="stat">
                <div className="disp stat__valor">Água Chata</div>
                <div className="stat__rotulo">ponto de retirada em Itaquaquecetuba</div>
              </div>
            </div>
          </div>
        </div>

        <div className="duo">
          <div className="duo__card">
            <h3>Rota de entrega</h3>
            <p>
              Cada região tem seu dia de entrega. Confirme o dia da sua cidade pelo WhatsApp.
            </p>
          </div>
          <div className="duo__card">
            <h3>Retirada com desconto</h3>
            <p>
              Prefere buscar? Retire na região da Água Chata, em Itaquaquecetuba, e ganhe
              desconto no pedido.
            </p>
          </div>
        </div>

        <p style={{ marginTop: 20, fontSize: 16, color: 'var(--texto-inverso-claro)' }}>
          <strong style={{ color: '#fff', fontWeight: 700, fontFamily: 'var(--font-sora), sans-serif' }}>
            Não achou sua cidade?
          </strong>{' '}
          Chama no WhatsApp — se estiver na região, a gente dá um jeito.
        </p>
      </div>
    </section>
  );
}
