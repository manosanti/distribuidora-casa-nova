import type { Cart, Pedido, Prefs, User } from './tipos';

export type EstadoPersistido = {
  /** false enquanto o localStorage ainda não foi lido (SSR e 1º render). */
  pronto: boolean;
  cart: Cart;
  user: User | null;
  prefs: Prefs;
  pedidos: Pedido[];
};

export const PREFS_PADRAO: Prefs = {
  avisosWhats: true,
  ofertasEmail: false,
  salvarEndereco: true,
};

const K_USER = 'cn_user';
const K_CART = 'cn_cart';
const K_ORDERS = 'cn_orders';

const VAZIO: EstadoPersistido = {
  pronto: false,
  cart: {},
  user: null,
  prefs: PREFS_PADRAO,
  pedidos: [],
};

let estado: EstadoPersistido = VAZIO;
let hidratado = false;
const ouvintes = new Set<() => void>();

function ler<T>(chave: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function gravar(chave: string, valor: unknown) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* storage indisponível */
  }
}

function apagar(chave: string) {
  try {
    localStorage.removeItem(chave);
  } catch {
    /* storage indisponível */
  }
}

function emitir() {
  for (const f of ouvintes) f();
}

function hidratar() {
  hidratado = true;
  const user = ler<User | null>(K_USER, null);
  estado = {
    pronto: true,
    cart: ler<Cart>(K_CART, {}),
    user,
    prefs: { ...PREFS_PADRAO, ...(user?.prefs ?? {}) },
    pedidos: ler<Pedido[]>(K_ORDERS, []),
  };
}

/**
 * O carrinho e a conta vivem no localStorage — uma store externa ao React.
 * Ler por `useSyncExternalStore` mantém o primeiro render igual ao HTML do
 * servidor (estado vazio) e só então troca para os dados salvos.
 */
export function subscribe(ouvinte: () => void) {
  if (!hidratado) hidratar();
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export const getSnapshot = () => estado;
export const getServerSnapshot = () => VAZIO;

function aplicar(patch: Partial<EstadoPersistido>) {
  estado = { ...estado, ...patch };
  emitir();
}

export function definirCart(cart: Cart) {
  gravar(K_CART, cart);
  aplicar({ cart });
}

export function limparCart() {
  apagar(K_CART);
  aplicar({ cart: {} });
}

export function definirUser(user: User) {
  gravar(K_USER, user);
  aplicar({ user, prefs: { ...PREFS_PADRAO, ...(user.prefs ?? {}) } });
}

export function sairDaConta() {
  apagar(K_USER);
  aplicar({ user: null });
}

export function apagarConta() {
  apagar(K_USER);
  apagar(K_ORDERS);
  aplicar({ user: null, pedidos: [] });
}

export function definirPrefs(prefs: Prefs) {
  const user = estado.user ? { ...estado.user, prefs } : null;
  if (user) gravar(K_USER, user);
  aplicar({ prefs, user: user ?? estado.user });
}

export function adicionarPedido(pedido: Pedido) {
  const pedidos = [pedido, ...estado.pedidos];
  gravar(K_ORDERS, pedidos);
  aplicar({ pedidos });
}
