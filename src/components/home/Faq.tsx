import { Plus } from 'lucide-react';

const PERGUNTAS = [
  {
    q: 'Tem pedido mínimo?',
    a: 'Não exigimos mínimo rígido, mas trabalhamos melhor a partir de pedidos de cerca de R$ 200.',
  },
  {
    q: 'Vocês entregam na minha cidade?',
    a: 'Guarulhos, Itaquaquecetuba, Arujá, Mogi das Cruzes, Suzano e Poá. Não achou a sua? Manda mensagem.',
  },
  { q: 'Qual o prazo de entrega?', a: 'Cada cidade tem seu dia de rota. Confirme no WhatsApp.' },
  {
    q: 'Como funciona o pagamento?',
    a: 'Na retirada, você vê o produto e paga na hora, sem sinal. Na entrega, combinamos na cotação.',
  },
  { q: 'Tem desconto na retirada?', a: 'Tem — descontamos o custo da entrega do seu pedido.' },
  { q: 'Atende comércio pequeno e MEI?', a: 'Sim, na mesma condição.' },
];

export function Faq() {
  return (
    <section>
      <div className="container container--estreito secao">
        <div className="eyebrow">Dúvidas frequentes</div>
        <h2 className="titulo-secao" style={{ marginBottom: 26 }}>
          Perguntas frequentes
        </h2>

        <div className="faq">
          {PERGUNTAS.map((p) => (
            <details key={p.q}>
              <summary>
                {p.q}
                <span className="faq__mais" aria-hidden="true">
                  <Plus size={20} />
                </span>
              </summary>
              <p>{p.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
