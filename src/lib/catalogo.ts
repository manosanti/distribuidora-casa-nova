import { slug } from './format';

export type NichoId =
  | 'vassouras'
  | 'sacos'
  | 'limpeza'
  | 'descartaveis'
  | 'higiene'
  | 'utensilios';

export type Nicho = {
  id: NichoId;
  num: string;
  nome: string;
  resumo: string;
  slotHint: string;
};

export type Produto = {
  nicho: NichoId;
  nome: string;
  venda: string;
  descricao: string;
  specs: [string, string][];
};

export const NICHOS: Nicho[] = [
  {
    id: 'vassouras',
    num: '01',
    nome: 'Vassouras, rodos e pás',
    resumo: 'Cabo de madeira ou alumínio, cerdas firmes',
    slotHint: 'Foto: vassouras, rodos e pás',
  },
  {
    id: 'sacos',
    num: '02',
    nome: 'Sacos de lixo',
    resumo: 'Do 30L ao 200L, comum e reforçado',
    slotHint: 'Foto: sacos de lixo',
  },
  {
    id: 'limpeza',
    num: '03',
    nome: 'Produtos de limpeza',
    resumo: 'Detergente, desinfetante, água sanitária, multiuso, ceras',
    slotHint: 'Foto: produtos de limpeza',
  },
  {
    id: 'descartaveis',
    num: '04',
    nome: 'Descartáveis',
    resumo: 'Copos, pratos, guardanapos, marmitas',
    slotHint: 'Foto: descartáveis',
  },
  {
    id: 'higiene',
    num: '05',
    nome: 'Higiene',
    resumo: 'Papel higiênico, papel toalha, sabonete, álcool',
    slotHint: 'Foto: higiene',
  },
  {
    id: 'utensilios',
    num: '06',
    nome: 'Utensílios e acessórios',
    resumo: 'Baldes, mops, panos, luvas, esponjas',
    slotHint: 'Foto: utensílios',
  },
];

const P = (
  nicho: NichoId,
  nome: string,
  venda: string,
  descricao: string,
  specs: [string, string][],
): Produto => ({ nicho, nome, venda, descricao, specs });

export const PRODUTOS: Produto[] = [
  P('vassouras', 'Vassoura de piaçava com cabo', 'Venda por unidade', 'Vassoura de piaçava para áreas externas e piso bruto. Cerda resistente, boa para varrer terra, folhas e sujeira grossa.', [['Cerda', 'Piaçava'], ['Cabo', '[madeira / alumínio]'], ['Largura', '[medida]'], ['Marca', '[marca]']]),
  P('vassouras', 'Vassoura de nylon 30 cm', 'Venda por unidade', 'Vassoura de nylon para piso interno liso. Cerda fina que não solta e não risca o piso.', [['Cerda', 'Nylon'], ['Largura', '30 cm'], ['Cabo', '[incluso / avulso]'], ['Marca', '[marca]']]),
  P('vassouras', 'Rodo de espuma 40 cm', 'Venda por unidade', 'Rodo com espuma para secar piso e vidro. Absorve bem e não deixa marca.', [['Base', 'Espuma'], ['Largura', '40 cm'], ['Cabo', '[incluso / avulso]'], ['Marca', '[marca]']]),
  P('vassouras', 'Rodo de borracha dupla 60 cm', 'Venda por unidade', 'Rodo de borracha dupla para área grande e molhada. Puxa mais água por passada.', [['Base', 'Borracha dupla'], ['Largura', '60 cm'], ['Cabo', '[incluso / avulso]'], ['Marca', '[marca]']]),
  P('vassouras', 'Pá de lixo com cabo longo', 'Venda por unidade', 'Pá com cabo longo para recolher sujeira sem agachar. Boa para uso contínuo em loja e salão.', [['Material', '[plástico / metal]'], ['Cabo', 'Longo'], ['Marca', '[marca]']]),

  P('sacos', 'Saco de lixo 30 L', 'Venda por pacote', 'Saco de lixo 30 L para cesto de banheiro, escritório e balcão.', [['Capacidade', '30 L'], ['Espessura', '[comum / reforçado]'], ['Pacote', '[qtd] unidades'], ['Cor', '[preto / azul]']]),
  P('sacos', 'Saco de lixo 60 L', 'Venda por pacote', 'Saco de lixo 60 L, o tamanho mais usado no dia a dia do comércio.', [['Capacidade', '60 L'], ['Espessura', '[comum / reforçado]'], ['Pacote', '[qtd] unidades'], ['Cor', '[preto / azul]']]),
  P('sacos', 'Saco de lixo 100 L', 'Venda por pacote', 'Saco de lixo 100 L para cozinha, estoque e áreas de maior volume.', [['Capacidade', '100 L'], ['Espessura', '[comum / reforçado]'], ['Pacote', '[qtd] unidades'], ['Cor', '[preto / azul]']]),
  P('sacos', 'Saco de lixo 200 L reforçado', 'Venda por pacote', 'Saco de 200 L reforçado para descarte pesado e caçamba. Suporta peso sem furar.', [['Capacidade', '200 L'], ['Espessura', 'Reforçado'], ['Pacote', '[qtd] unidades'], ['Cor', '[preto]']]),

  P('limpeza', 'Detergente neutro 500 ml', 'Caixa fechada ou unidade', 'Detergente neutro para louça e uso geral. Boa rendimento por frasco.', [['Volume', '500 ml'], ['Fragrância', 'Neutro'], ['Caixa', '[qtd] frascos'], ['Marca', '[marca]']]),
  P('limpeza', 'Desinfetante 2 L', 'Caixa fechada ou unidade', 'Desinfetante concentrado para piso e banheiro. Rende diluído em água.', [['Volume', '2 L'], ['Fragrância', '[lavanda / pinho / floral]'], ['Caixa', '[qtd] frascos'], ['Marca', '[marca]']]),
  P('limpeza', 'Água sanitária 5 L', 'Caixa fechada ou unidade', 'Água sanitária em galão de 5 L para limpeza pesada e desinfecção.', [['Volume', '5 L'], ['Teor de cloro ativo', '[%]'], ['Caixa', '[qtd] galões'], ['Marca', '[marca]']]),
  P('limpeza', 'Limpador multiuso 500 ml', 'Caixa fechada ou unidade', 'Multiuso para bancada, vidro, inox e superfícies em geral.', [['Volume', '500 ml'], ['Tipo', '[spray / refil]'], ['Caixa', '[qtd] frascos'], ['Marca', '[marca]']]),
  P('limpeza', 'Cera líquida 750 ml', 'Caixa fechada ou unidade', 'Cera líquida para dar brilho e proteger o piso.', [['Volume', '750 ml'], ['Cor', '[incolor / vermelha / amarela]'], ['Caixa', '[qtd] frascos'], ['Marca', '[marca]']]),
  P('limpeza', 'Sabão em pó 1 kg', 'Fardo fechado ou unidade', 'Sabão em pó para lavagem de panos, uniformes e roupa de serviço.', [['Peso', '1 kg'], ['Fardo', '[qtd] unidades'], ['Marca', '[marca]']]),

  P('descartaveis', 'Copo descartável 200 ml', 'Venda por pacote', 'Copo descartável 200 ml para água e refresco. Uso em loja, escritório e evento.', [['Volume', '200 ml'], ['Pacote', '[qtd] copos'], ['Material', '[PP / PS]'], ['Marca', '[marca]']]),
  P('descartaveis', 'Prato descartável', 'Venda por pacote', 'Prato descartável para refeição rápida e evento.', [['Tamanho', '[medida]'], ['Pacote', '[qtd] pratos'], ['Material', '[isopor / plástico]'], ['Marca', '[marca]']]),
  P('descartaveis', 'Guardanapo de papel', 'Venda por pacote', 'Guardanapo de papel para mesa, balcão e delivery.', [['Tamanho', '[medida]'], ['Pacote', '[qtd] folhas'], ['Folhas', '[simples / dupla]'], ['Marca', '[marca]']]),
  P('descartaveis', 'Marmitex de alumínio', 'Caixa fechada', 'Marmitex de alumínio com tampa, para delivery e comida pronta.', [['Tamanho', '[n.º]'], ['Caixa', '[qtd] unidades'], ['Tampa', 'Inclusa'], ['Marca', '[marca]']]),

  P('higiene', 'Papel higiênico rolão 300 m', 'Fardo fechado', 'Papel higiênico rolão para dispenser, indicado para banheiro de uso coletivo.', [['Metragem', '300 m'], ['Fardo', '[qtd] rolos'], ['Folhas', '[simples / dupla]'], ['Marca', '[marca]']]),
  P('higiene', 'Papel toalha interfolha', 'Fardo fechado', 'Papel toalha interfolha para dispenser de banheiro e cozinha.', [['Folhas', '[qtd] por pacote'], ['Fardo', '[qtd] pacotes'], ['Tipo', '[branco / natural]'], ['Marca', '[marca]']]),
  P('higiene', 'Sabonete líquido 5 L', 'Galão', 'Sabonete líquido em galão de 5 L para refil de dispenser.', [['Volume', '5 L'], ['Fragrância', '[erva-doce / neutro]'], ['Marca', '[marca]']]),
  P('higiene', 'Álcool em gel 5 L', 'Galão', 'Álcool em gel 70% em galão de 5 L para refil de dispenser e uso no balcão.', [['Volume', '5 L'], ['Teor', '70%'], ['Marca', '[marca]']]),

  P('utensilios', 'Balde 12 L', 'Venda por unidade', 'Balde plástico 12 L com alça reforçada, para limpeza geral.', [['Capacidade', '12 L'], ['Material', 'Plástico'], ['Cor', '[cor]'], ['Marca', '[marca]']]),
  P('utensilios', 'Mop úmido completo', 'Conjunto', 'Conjunto de mop úmido com balde espremedor. Limpa piso grande com menos esforço.', [['Itens', 'Mop + cabo + balde'], ['Refil', '[incluso / avulso]'], ['Marca', '[marca]']]),
  P('utensilios', 'Pano multiuso em rolo', 'Rolo', 'Pano multiuso em rolo picotado, para limpeza de balcão, mesa e cozinha.', [['Metragem', '[medida]'], ['Picotado', 'Sim'], ['Cor', '[cor]'], ['Marca', '[marca]']]),
  P('utensilios', 'Luva de látex', 'Par ou caixa', 'Luva de látex para limpeza e manuseio de produto químico.', [['Tamanho', 'P / M / G'], ['Tipo', '[forrada / sem forro]'], ['Caixa', '[qtd] pares'], ['Marca', '[marca]']]),
  P('utensilios', 'Esponja dupla face', 'Pacote', 'Esponja dupla face para louça e superfícies. Lado abrasivo e lado macio.', [['Pacote', '[qtd] unidades'], ['Medida', '[medida]'], ['Marca', '[marca]']]),
  P('utensilios', 'Escova de mão', 'Venda por unidade', 'Escova de mão para cantos, rodapé e sujeira encrostada.', [['Cerda', '[nylon / piaçava]'], ['Formato', '[oval / retangular]'], ['Marca', '[marca]']]),
];

export const PRECOS: Record<string, number> = {
  'Vassoura de piaçava com cabo': 18.9,
  'Vassoura de nylon 30 cm': 15.5,
  'Rodo de espuma 40 cm': 16.9,
  'Rodo de borracha dupla 60 cm': 27.9,
  'Pá de lixo com cabo longo': 21.9,
  'Saco de lixo 30 L': 12.9,
  'Saco de lixo 60 L': 18.9,
  'Saco de lixo 100 L': 27.9,
  'Saco de lixo 200 L reforçado': 44.9,
  'Detergente neutro 500 ml': 2.49,
  'Desinfetante 2 L': 7.9,
  'Água sanitária 5 L': 11.9,
  'Limpador multiuso 500 ml': 4.9,
  'Cera líquida 750 ml': 8.9,
  'Sabão em pó 1 kg': 9.9,
  'Copo descartável 200 ml': 6.9,
  'Prato descartável': 9.9,
  'Guardanapo de papel': 4.5,
  'Marmitex de alumínio': 89.9,
  'Papel higiênico rolão 300 m': 79.9,
  'Papel toalha interfolha': 64.9,
  'Sabonete líquido 5 L': 32.9,
  'Álcool em gel 5 L': 39.9,
  'Balde 12 L': 14.9,
  'Mop úmido completo': 89.9,
  'Pano multiuso em rolo': 24.9,
  'Luva de látex': 8.9,
  'Esponja dupla face': 7.9,
  'Escova de mão': 9.9,
};

/** Ofertas: percentual de desconto sobre o preço de tabela. */
export const OFERTAS: Record<string, number> = {
  'Saco de lixo 60 L': 15,
  'Detergente neutro 500 ml': 20,
  'Rodo de espuma 40 cm': 10,
  'Álcool em gel 5 L': 12,
  'Papel toalha interfolha': 18,
  'Balde 12 L': 10,
};

export const FORA_ESTOQUE = ['Marmitex de alumínio', 'Cera líquida 750 ml'];

export const DESTAQUES = [
  'Saco de lixo 60 L',
  'Detergente neutro 500 ml',
  'Papel higiênico rolão 300 m',
  'Mop úmido completo',
];

export const SELOS: Record<string, string> = {
  'Saco de lixo 60 L': 'Carro-chefe',
  'Detergente neutro 500 ml': 'Mais vendido',
  'Papel higiênico rolão 300 m': 'Mais pedido',
  'Mop úmido completo': 'Melhor custo',
};

export type Faixa = { id: string; label: string; min: number; max: number };

export const FAIXAS: Faixa[] = [
  { id: 'ate20', label: 'Até R$ 20', min: 0, max: 20 },
  { id: '20a50', label: 'R$ 20 a R$ 50', min: 20, max: 50 },
  { id: 'mais50', label: 'Mais de R$ 50', min: 50, max: Infinity },
];

export type OrdemId = 'relevancia' | 'menor' | 'maior' | 'az';

export const ORDENS: { id: OrdemId; label: string }[] = [
  { id: 'relevancia', label: 'Mais relevantes' },
  { id: 'menor', label: 'Menor preço' },
  { id: 'maior', label: 'Maior preço' },
  { id: 'az', label: 'Nome (A-Z)' },
];

export const BUSCAS_RELACIONADAS = [
  'saco de lixo',
  'papel higiênico',
  'detergente',
  'vassoura',
  'álcool em gel',
  'copo descartável',
];

export const precoDe = (nome: string) => PRECOS[nome] || 0;

export const precoPor = (nome: string) => {
  const d = OFERTAS[nome];
  return d ? Math.round(precoDe(nome) * (1 - d / 100) * 100) / 100 : precoDe(nome);
};

export const temOferta = (nome: string) => !!OFERTAS[nome];
export const foraEstoque = (nome: string) => FORA_ESTOQUE.includes(nome);

export const nichoNome = (id: string) => NICHOS.find((n) => n.id === id)?.nome ?? '';

export const produtoSlug = (nome: string) => slug(nome);

export const produtoPorSlug = (s: string) =>
  PRODUTOS.find((p) => produtoSlug(p.nome) === s);

export const produtoPorNome = (nome: string) => PRODUTOS.find((p) => p.nome === nome);

export const contagemPorNicho = (id: NichoId) =>
  PRODUTOS.filter((p) => p.nicho === id).length;
