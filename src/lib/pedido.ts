import { soDigitos } from './format';

export type Frete = {
  cidade: string;
  valor: number;
  prazo: string;
  foraDeRota: boolean;
};

/** Tabela de frete de demonstração — trocar pelo serviço de frete do back-end. */
const FRETES = [
  { pre: '07', cidade: 'Guarulhos', valor: 24.9, prazo: '1 dia útil' },
  { pre: '072', cidade: 'Arujá', valor: 22.9, prazo: '1 dia útil' },
  { pre: '089', cidade: 'Itaquaquecetuba', valor: 19.9, prazo: 'no dia da rota' },
  { pre: '088', cidade: 'Mogi das Cruzes', valor: 29.9, prazo: '2 dias úteis' },
  { pre: '087', cidade: 'Suzano', valor: 27.9, prazo: '2 dias úteis' },
  { pre: '086', cidade: 'Poá', valor: 26.9, prazo: '2 dias úteis' },
];

export const FRETE_GRATIS_A_PARTIR = 500;

export function calcularFrete(cep: string): Frete | null {
  const d = soDigitos(cep);
  if (d.length < 8) return null;
  const achado =
    FRETES.find((f) => d.indexOf(f.pre) === 0 && f.pre.length === 3) ||
    FRETES.find((f) => d.indexOf(f.pre) === 0);
  if (achado) {
    return {
      cidade: achado.cidade,
      valor: achado.valor,
      prazo: achado.prazo,
      foraDeRota: false,
    };
  }
  return {
    cidade: 'Fora da rota própria',
    valor: 34.9,
    prazo: '3 a 4 dias úteis',
    foraDeRota: true,
  };
}

export type Cupom = {
  tipo: 'percentual' | 'frete';
  valor: number;
  texto: string;
};

/** Cupons de demonstração — trocar pela validação do back-end. */
export const CUPONS: Record<string, Cupom> = {
  PRIMEIRA10: { tipo: 'percentual', valor: 10, texto: '10% de desconto' },
  CASANOVA5: { tipo: 'percentual', valor: 5, texto: '5% de desconto' },
  FRETEGRATIS: { tipo: 'frete', valor: 0, texto: 'frete grátis' },
};

export type CampoDef = {
  id: string;
  label: string;
  placeholder: string;
  req: boolean;
};

export const CAMPOS_DADOS: CampoDef[] = [
  { id: 'nome', label: 'Nome ou razão social', placeholder: 'Mercado Bom Preço', req: true },
  { id: 'doc', label: 'CNPJ ou CPF', placeholder: '00.000.000/0000-00', req: true },
  { id: 'email', label: 'E-mail', placeholder: 'contato@seucomercio.com.br', req: true },
  { id: 'telefone', label: 'WhatsApp', placeholder: '(11) 90000-0000', req: true },
];

export const CAMPOS_PERFIL: CampoDef[] = [
  { id: 'nome', label: 'Nome', placeholder: 'João', req: true },
  { id: 'sobrenome', label: 'Sobrenome', placeholder: 'Silva', req: true },
  { id: 'email', label: 'E-mail', placeholder: 'contato@seucomercio.com.br', req: true },
  { id: 'telefone', label: 'WhatsApp', placeholder: '(11) 90000-0000', req: true },
  { id: 'empresa', label: 'Nome do comércio', placeholder: 'Mercado Bom Preço', req: false },
  { id: 'doc', label: 'CNPJ ou CPF', placeholder: '00.000.000/0000-00', req: false },
];

export const CAMPOS_ENDERECO: CampoDef[] = [
  { id: 'rua', label: 'Rua', placeholder: 'Av. Brasil', req: true },
  { id: 'numero', label: 'Número', placeholder: '1200', req: true },
  { id: 'complemento', label: 'Complemento', placeholder: 'Loja 2 (opcional)', req: false },
  { id: 'bairro', label: 'Bairro', placeholder: 'Centro', req: true },
  { id: 'cidade', label: 'Cidade', placeholder: 'Guarulhos', req: true },
  { id: 'uf', label: 'UF', placeholder: 'SP', req: true },
];
