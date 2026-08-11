'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { precoPor, produtoPorNome } from '@/lib/catalogo';
import * as store from './persistencia';
import type { AuthModo, Cart, CartLine, Entrega, Pedido, Prefs, User } from './tipos';

export type { AuthModo, Cart, CartLine, Entrega, Pedido, Prefs, User } from './tipos';

type LojaCtx = {
  /** false até o localStorage ser lido — evita divergência de hidratação. */
  pronto: boolean;

  cart: Cart;
  linhas: CartLine[];
  subtotal: number;
  totalItens: number;
  adicionar: (nome: string, qtd?: number) => void;
  definirQtd: (nome: string, qtd: number) => void;
  limparCart: () => void;

  cartOpen: boolean;
  abrirCart: () => void;
  fecharCart: () => void;

  entrega: Entrega;
  setEntrega: (e: Entrega) => void;

  user: User | null;
  prefs: Prefs;
  pedidos: Pedido[];
  entrar: (u: User) => void;
  salvarUser: (u: User) => void;
  sair: () => void;
  excluirConta: () => void;
  togglePref: (chave: keyof Prefs) => void;
  registrarPedido: (p: Pedido) => void;

  authOpen: boolean;
  authModo: AuthModo;
  abrirAuth: (modo: AuthModo) => void;
  fecharAuth: () => void;
  trocarAuthModo: () => void;
};

const Ctx = createContext<LojaCtx | null>(null);

export function LojaProvider({ children }: { children: ReactNode }) {
  const persistido = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const [cartOpen, setCartOpen] = useState(false);
  const [entrega, setEntrega] = useState<Entrega>('entrega');
  const [authOpen, setAuthOpen] = useState(false);
  const [authModo, setAuthModo] = useState<AuthModo>('cadastro');

  const { pronto, cart, user, prefs, pedidos } = persistido;

  const adicionar = useCallback(
    (nome: string, qtd = 1) => {
      store.definirCart({ ...cart, [nome]: (cart[nome] || 0) + qtd });
      setCartOpen(true);
    },
    [cart],
  );

  const definirQtd = useCallback(
    (nome: string, qtd: number) => {
      const proximo = { ...cart };
      if (qtd <= 0) delete proximo[nome];
      else proximo[nome] = qtd;
      store.definirCart(proximo);
    },
    [cart],
  );

  const togglePref = useCallback(
    (chave: keyof Prefs) => store.definirPrefs({ ...prefs, [chave]: !prefs[chave] }),
    [prefs],
  );

  const linhas = useMemo<CartLine[]>(
    () =>
      Object.keys(cart).map((nome) => {
        const p = produtoPorNome(nome);
        const qtd = cart[nome];
        const preco = precoPor(nome);
        return { nome, qtd, preco, subtotal: preco * qtd, venda: p ? p.venda : '' };
      }),
    [cart],
  );

  const subtotal = useMemo(() => linhas.reduce((a, l) => a + l.subtotal, 0), [linhas]);
  const totalItens = useMemo(() => linhas.reduce((a, l) => a + l.qtd, 0), [linhas]);

  const valor = useMemo<LojaCtx>(
    () => ({
      pronto,
      cart,
      linhas,
      subtotal,
      totalItens,
      adicionar,
      definirQtd,
      limparCart: store.limparCart,
      cartOpen,
      abrirCart: () => setCartOpen(true),
      fecharCart: () => setCartOpen(false),
      entrega,
      setEntrega,
      user,
      prefs,
      pedidos,
      entrar: store.definirUser,
      salvarUser: store.definirUser,
      sair: store.sairDaConta,
      excluirConta: store.apagarConta,
      togglePref,
      registrarPedido: store.adicionarPedido,
      authOpen,
      authModo,
      abrirAuth: (modo: AuthModo) => {
        setAuthModo(modo);
        setAuthOpen(true);
      },
      fecharAuth: () => setAuthOpen(false),
      trocarAuthModo: () => setAuthModo((m) => (m === 'cadastro' ? 'login' : 'cadastro')),
    }),
    [
      pronto,
      cart,
      linhas,
      subtotal,
      totalItens,
      adicionar,
      definirQtd,
      togglePref,
      cartOpen,
      entrega,
      user,
      prefs,
      pedidos,
      authOpen,
      authModo,
    ],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useLoja() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLoja precisa estar dentro de <LojaProvider>');
  return ctx;
}
