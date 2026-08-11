import type { Frete } from '@/lib/pedido';

export type Cart = Record<string, number>;

export type Prefs = {
  avisosWhats: boolean;
  ofertasEmail: boolean;
  salvarEndereco: boolean;
};

export type Endereco = Record<string, string>;

export type User = {
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  empresa: string;
  doc: string;
  endereco: Endereco;
  prefs: Prefs;
};

export type CartLine = {
  nome: string;
  qtd: number;
  preco: number;
  subtotal: number;
  venda: string;
};

export type Entrega = 'entrega' | 'retirada';
export type AuthModo = 'login' | 'cadastro';

export type Pedido = {
  numero: string;
  total: number;
  pagamento: 'pix' | 'cartao' | 'boleto';
  entrega: Entrega;
  frete: Frete | null;
  itens: CartLine[];
  cliente: Record<string, string>;
  data: string;
};
