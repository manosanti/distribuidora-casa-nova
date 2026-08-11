/**
 * Configuração de contato/marca. No design original estes valores eram props
 * editáveis do canvas; aqui vêm de variáveis de ambiente com fallback.
 */
export const site = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999',
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  enderecoLoja:
    process.env.NEXT_PUBLIC_ENDERECO_LOJA || 'Água Chata, Itaquaquecetuba - SP',
  mainCtaText: 'Fazer cotação no WhatsApp',
  stickyEnabled: true,
} as const;

export function waLink(text: string) {
  const num = site.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export const waCotacao = () =>
  waLink('Olá! Gostaria de fazer uma cotação de material de limpeza para o meu comércio.');
export const waLista = () =>
  waLink('Olá! Quero receber a lista completa de produtos com preços.');
export const waComecar = () => waLink('Olá! Quero começar a minha cotação.');

export const temMapa = () => site.googleMapsApiKey.trim().length > 0;

export const mapaSrc = () =>
  'https://www.google.com/maps/embed/v1/place?key=' +
  encodeURIComponent(site.googleMapsApiKey.trim()) +
  '&q=' +
  encodeURIComponent(site.enderecoLoja) +
  '&zoom=15&language=pt-BR&region=BR';

export const mapaLink = () =>
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(site.enderecoLoja);

export const mapaRota = () =>
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent(site.enderecoLoja);
