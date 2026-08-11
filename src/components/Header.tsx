'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ClipboardList, LogOut, Settings, ShoppingCart, User } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useLoja } from '@/store/loja';
import { waCotacao } from '@/lib/site';

export function Header() {
  const {
    pronto,
    totalItens,
    abrirCart,
    user,
    sair,
    abrirAuth,
  } = useLoja();
  const pathname = usePathname();
  const naHome = pathname === '/';
  const noCatalogo = pathname.startsWith('/catalogo') || pathname.startsWith('/produto');

  const iniciais = user
    ? ((user.nome?.[0] ?? '') + (user.sobrenome?.[0] ?? '')).toUpperCase() || '?'
    : '';
  const nomeCompleto = user ? [user.nome, user.sobrenome].filter(Boolean).join(' ') : '';

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="header__logo" aria-label="Distribuidora Casa Nova — início">
          <Image
            src="/images/logo-casa-nova.png"
            alt="Distribuidora Casa Nova"
            width={910}
            height={531}
            priority
            style={{ height: 42, width: 'auto' }}
          />
        </Link>

        <div className="header__nav">
          <Link href="/" className="header__link" aria-current={naHome ? 'page' : undefined}>
            Início
          </Link>
          <Link
            href="/catalogo"
            className="header__link"
            aria-current={noCatalogo ? 'page' : undefined}
          >
            Catálogo
          </Link>

          <span className="header__divisor" aria-hidden="true" />

          <button type="button" onClick={abrirCart} className="header__cart" aria-label="Abrir carrinho">
            <ShoppingCart size={18} aria-hidden="true" />
            <span>{pronto ? totalItens : 0}</span>
          </button>

          <a href={waCotacao()} target="_blank" rel="noopener" className="header__wa">
            <WhatsAppIcon size={17} />
            <span>WhatsApp</span>
          </a>

          {!user ? (
            <button type="button" onClick={() => abrirAuth('login')} className="header__entrar">
              <User size={17} aria-hidden="true" />
              <span>Entrar</span>
            </button>
          ) : (
            <MenuUsuario iniciais={iniciais} nome={user.nome} nomeCompleto={nomeCompleto} email={user.email} onSair={sair} />
          )}
        </div>
      </div>
    </header>
  );
}

function MenuUsuario({
  iniciais,
  nome,
  nomeCompleto,
  email,
  onSair,
}: {
  iniciais: string;
  nome: string;
  nomeCompleto: string;
  email: string;
  onSair: () => void;
}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const fechar = () => setMenuAberto(false);

  return (
    <div className="usuario">
      <button
        type="button"
        onClick={() => setMenuAberto((v) => !v)}
        className="usuario__botao"
        aria-label="Minha conta"
        aria-expanded={menuAberto}
      >
        <span className="avatar">{iniciais}</span>
        <span className="usuario__nome truncar">{nome}</span>
        <ChevronDown size={14} color="var(--azul)" aria-hidden="true" />
      </button>

      {menuAberto && (
        <>
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar menu"
            className="usuario__backdrop"
          />
          <div className="usuario__menu">
            <div className="usuario__cabecalho">
              <div
                className="truncar"
                style={{
                  fontWeight: 700,
                  fontSize: '15.5px',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-sora), sans-serif',
                }}
              >
                {nomeCompleto}
              </div>
              <div
                className="truncar"
                style={{ fontSize: 13, color: 'var(--texto-fraco)', marginTop: 2 }}
              >
                {email}
              </div>
            </div>
            <div className="usuario__itens">
              <Link href="/conta?tab=perfil" className="usuario__item" onClick={fechar}>
                <User size={17} aria-hidden="true" />
                Meu perfil
              </Link>
              <Link href="/conta?tab=pedidos" className="usuario__item" onClick={fechar}>
                <ClipboardList size={17} aria-hidden="true" />
                Meus pedidos
              </Link>
              <Link href="/conta?tab=config" className="usuario__item" onClick={fechar}>
                <Settings size={17} aria-hidden="true" />
                Configurações
              </Link>
              <div style={{ height: 1, background: 'var(--borda-suave)', margin: '6px 4px' }} />
              <button
                type="button"
                className="usuario__item usuario__item--sair"
                onClick={() => {
                  fechar();
                  onSair();
                }}
              >
                <LogOut size={17} aria-hidden="true" />
                Sair da conta
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
