'use client';

import { ShoppingCart } from 'lucide-react';
import { useLoja } from '@/store/loja';

export function AdicionarButton({ nome }: { nome: string }) {
  const { adicionar } = useLoja();

  return (
    <button
      type="button"
      onClick={() => adicionar(nome)}
      className="btn btn--navy"
      style={{ fontSize: '17.5px', padding: '16px 28px', borderRadius: 14 }}
    >
      <ShoppingCart size={20} aria-hidden="true" />
      Adicionar ao carrinho
    </button>
  );
}
