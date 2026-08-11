import { WhatsAppIcon } from '../WhatsAppIcon';
import { waComecar } from '@/lib/site';

const PASSOS = [
  {
    n: '1',
    titulo: 'Manda sua lista no WhatsApp',
    texto: 'Fala o que precisa, por texto, foto ou áudio. Sem formulário, sem cadastro.',
  },
  {
    n: '2',
    titulo: 'Recebe a cotação na hora',
    texto: 'A gente confirma disponibilidade e passa o preço direto.',
  },
  {
    n: '3',
    titulo: 'Você escolhe como receber',
    texto:
      'Entrega na sua região, no dia da rota da sua cidade, ou retira na Água Chata com desconto.',
  },
];

export function ComoFunciona() {
  return (
    <section className="secao--clara">
      <div className="container secao">
        <div className="eyebrow">Como funciona</div>
        <h2 className="titulo-secao">Comprar é simples, em 3 passos</h2>

        <div className="passos">
          {PASSOS.map((p) => (
            <div key={p.n} className="passo">
              <div className="disp passo__num">{p.n}</div>
              <div className="passo__risco" aria-hidden="true" />
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32 }}>
          <a href={waComecar()} target="_blank" rel="noopener" className="btn btn--verde btn--lg">
            <WhatsAppIcon size={20} />
            Começar minha cotação
          </a>
        </div>
      </div>
    </section>
  );
}
