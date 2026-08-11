// Faixa de marcas diacríticas combinantes (U+0300–U+036F), removidas após NFD.
const DIACRITICOS = new RegExp('[\\u0300-\\u036f]', 'g');

export const brl = (n: number) => 'R$ ' + n.toFixed(2).replace('.', ',');

export const soDigitos = (s: string) => (s || '').replace(/\D/g, '');

export const semAcento = (s: string) =>
  (s || '').toLowerCase().normalize('NFD').replace(DIACRITICOS, '');

export const slug = (s: string) =>
  semAcento(s)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
