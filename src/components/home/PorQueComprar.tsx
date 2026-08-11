const MOTIVOS = [
  {
    num: '01',
    titulo: 'Qualidade que dura',
    texto:
      'Vassoura que não solta cerda, rodo que não descola, material que aguenta o dia a dia. Você compra menos vezes e não fica na mão no meio do expediente.',
  },
  {
    num: '02',
    titulo: 'Entrega própria na sua região',
    texto:
      'Nada de transportadora nem prazo incerto. Rota organizada, com dia certo pra sua cidade, sempre com quem já conhece seu comércio.',
  },
  {
    num: '03',
    titulo: 'Entrega ou retirada, você escolhe',
    texto:
      'Recebe no balcão ou retira e leva mais barato, descontando o frete. Flexibilidade que fornecedor grande não dá.',
  },
  {
    num: '04',
    titulo: 'Atendimento direto com o dono',
    texto:
      'Você fala com quem decide e resolve na hora. Sem call center, sem representante enrolando.',
    destaque: true,
  },
];

export function PorQueComprar() {
  return (
    <section>
      <div className="container secao">
        <div className="eyebrow">Por que comprar com a gente</div>
        <h2 className="titulo-secao" style={{ maxWidth: 800 }}>
          Por que os comércios da região compram com a Casa Nova
        </h2>

        <div className="motivos">
          {MOTIVOS.map((m) => (
            <div key={m.num} className={m.destaque ? 'motivo motivo--destaque' : 'motivo'}>
              <div className="disp motivo__num">{m.num}</div>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
