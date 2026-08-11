export function ProvaSocial() {
  return (
    <section>
      <div className="container secao">
        <div className="eyebrow">Prova social</div>
        <h2 className="titulo-secao" style={{ maxWidth: 820 }}>
          Comércios da região que já confiam na Casa Nova
        </h2>
        <p className="sub-secao" style={{ maxWidth: 720 }}>
          Mercados, padarias, bares, restaurantes, salões, escritórios e condomínios contam com
          a gente pra repor material de limpeza sem dor de cabeça.
        </p>

        <div className="depoimentos">
          {[0, 1, 2].map((i) => (
            <figure key={i} className="depoimento">
              <div className="disp depoimento__aspas" aria-hidden="true">
                &ldquo;
              </div>
              <blockquote>
                <p>[depoimento do cliente]</p>
              </blockquote>
              <figcaption className="depoimento__autor">
                [Nome do comércio] · [cidade]
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          style={{
            marginTop: 22,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            fontSize: '14.5px',
            color: 'var(--texto-fraco)',
          }}
        >
          <span
            style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--verde)' }}
            aria-hidden="true"
          />
          Avaliações reais no Google
        </div>
      </div>
    </section>
  );
}
