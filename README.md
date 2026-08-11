# Distribuidora Casa Nova

Site da Distribuidora Casa Nova — atacado de material de limpeza no Alto Tietê.
Implementação em Next.js do design `Casa Nova Landing.dc.html` (Claude Design).

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · lucide-react.

## Rodando

```bash
npm install
cp .env.example .env.local   # ajuste o número do WhatsApp
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # produção
npx eslint . && npx tsc --noEmit
```

## Rotas

| Rota | O que é |
| --- | --- |
| `/` | Landing: hero, nichos, carro-chefe, área de atendimento, FAQ, mapa, CTA |
| `/catalogo` | Catálogo com busca, filtros, ordenação e paginação (`?nicho=`, `?busca=`) |
| `/produto/[slug]` | Detalhe do produto (gerado estaticamente para os 29 itens) |
| `/checkout` | Fechamento em 4 etapas: dados → entrega → pagamento → confirmação |
| `/conta` | Perfil, pedidos e configurações (`?tab=perfil\|pedidos\|config`) |

O carrinho, o modal de login e o botão fixo de WhatsApp ficam no layout raiz e
funcionam em qualquer rota.

## Estrutura

```
src/
  app/            rotas do App Router (uma pasta por tela)
  components/     header, footer, carrinho, modal, cartões, ícones
    home/         seções da landing
  lib/
    catalogo.ts   nichos, produtos, preços, ofertas e helpers de catálogo
    pedido.ts     frete, cupons e definições de campos de formulário
    site.ts       contato/marca e montagem dos links de WhatsApp e mapa
    format.ts     brl(), slug(), semAcento(), soDigitos()
  store/
    loja.tsx      contexto React consumido pelas telas
    persistencia.ts  localStorage lido via useSyncExternalStore
    tipos.ts      tipos compartilhados de carrinho, usuário e pedido
  styles/         tokens, base, componentes, layout e telas (CSS global)
```

## Estado e persistência

Carrinho, conta, preferências e histórico de pedidos ficam no `localStorage`
(`cn_cart`, `cn_user`, `cn_orders`), lidos por `useSyncExternalStore` para que o
primeiro render bata com o HTML do servidor. `useLoja().pronto` indica quando os
dados salvos já foram carregados — use-o antes de renderizar valores que dependem
do storage.

## Pontos de integração pendentes

Estes trechos são demonstração e esperam o back-end:

- **Pagamento** — `finalizar()` em `src/app/checkout/page.tsx` gera um número de
  pedido local; é onde entra a chamada ao gateway.
- **Frete** — `calcularFrete()` em `src/lib/pedido.ts` usa uma tabela por prefixo
  de CEP das seis cidades da rota.
- **Cupons** — `CUPONS` em `src/lib/pedido.ts` (`PRIMEIRA10`, `CASANOVA5`,
  `FRETEGRATIS`) valida no cliente.
- **Autenticação** — `AuthModal` cria a conta apenas no navegador, sem senha real.
- **Catálogo** — produtos, preços e ofertas estão fixos em `src/lib/catalogo.ts`.

## Imagens

Os produtos e nichos ainda não têm fotos: `<ImageSlot>` desenha o placeholder
listrado com a legenda do item. Assim que houver arquivos, basta passar `src`
para o componente que ele troca por um `next/image` otimizado.

Textos entre colchetes (`[dia da rota]`, `[marca]`, `[número]`) são do design e
marcam conteúdo a preencher.
