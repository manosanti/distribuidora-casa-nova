import { MapPin } from 'lucide-react';
import { mapaLink, mapaRota, mapaSrc, temMapa } from '@/lib/site';

export function OndeEstamos() {
  const comMapa = temMapa();

  return (
    <section className="secao--clara">
      <div className="container secao">
        <div className="eyebrow">Onde estamos</div>
        <h2
          className="titulo-secao"
          style={{ fontSize: 'clamp(26px, 5vw, 42px)', maxWidth: 640, marginTop: 12 }}
        >
          Retirada na Água Chata, Itaquaquecetuba
        </h2>
        <p style={{ fontSize: 17, color: 'var(--texto-suave)', marginTop: 12, maxWidth: 560 }}>
          Vem buscar e leva com desconto. Se preferir, a gente entrega no dia da rota da sua
          cidade.
        </p>

        <div className="mapa-grid">
          <div className="mapa-box">
            {comMapa ? (
              <iframe
                title="Mapa da Distribuidora Casa Nova"
                src={mapaSrc()}
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="mapa-box__vazio">
                <MapPin size={34} color="var(--azul)" aria-hidden="true" />
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: 'var(--navy)',
                    fontFamily: 'var(--font-sora), sans-serif',
                  }}
                >
                  Água Chata, Itaquaquecetuba · SP
                </div>
                <a href={mapaLink()} target="_blank" rel="noopener" className="btn btn--navy">
                  Abrir no Google Maps
                </a>
              </div>
            )}
          </div>

          <div className="contato-card">
            <div>
              <div className="contato-card__rotulo">Endereço</div>
              <div className="contato-card__valor">[Rua e número], Água Chata</div>
              <div style={{ fontSize: '15.5px', color: 'var(--texto-suave)' }}>
                Itaquaquecetuba · SP · CEP [00000-000]
              </div>
            </div>
            <div>
              <div className="contato-card__rotulo">Horário</div>
              <div className="contato-card__texto">
                Segunda a sexta, [08h às 18h] · Sábado, [08h às 12h]
              </div>
            </div>
            <div>
              <div className="contato-card__rotulo">Contato</div>
              <div className="contato-card__texto">WhatsApp [número]</div>
            </div>
            <div className="linha-acoes" style={{ marginTop: 'auto' }}>
              <a href={mapaRota()} target="_blank" rel="noopener" className="btn btn--navy">
                Traçar rota
              </a>
              <a href={mapaLink()} target="_blank" rel="noopener" className="btn btn--suave">
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
