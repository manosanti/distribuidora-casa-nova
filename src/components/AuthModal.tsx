'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLoja, type User } from '@/store/loja';

const VAZIO = {
  nome: '',
  sobrenome: '',
  empresa: '',
  telefone: '',
  email: '',
  senha: '',
};

export function AuthModal() {
  const { authOpen } = useLoja();
  // Desmontar quando fechado zera formulário e erro sem precisar de efeito.
  if (!authOpen) return null;
  return <AuthModalAberto />;
}

function AuthModalAberto() {
  const { authModo, fecharAuth, trocarAuthModo, entrar, prefs } = useLoja();
  const [form, setForm] = useState(VAZIO);
  const [erro, setErro] = useState('');

  const ehCadastro = authModo === 'cadastro';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharAuth();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [fecharAuth]);

  const set = (id: keyof typeof VAZIO) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [id]: e.target.value }));
    setErro('');
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.senha || (ehCadastro && (!form.nome || !form.sobrenome))) {
      setErro('Preencha os campos obrigatórios.');
      return;
    }
    const user: User = {
      nome: form.nome || form.email.split('@')[0],
      sobrenome: form.sobrenome,
      email: form.email,
      telefone: form.telefone,
      empresa: form.empresa,
      doc: '',
      endereco: {},
      prefs,
    };
    entrar(user);
    setForm(VAZIO);
    fecharAuth();
  };

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={ehCadastro ? 'Criar minha conta' : 'Entrar na minha conta'}>
      <button type="button" onClick={fecharAuth} aria-label="Fechar" className="modal__backdrop" />
      <form className="modal__painel" onSubmit={enviar}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h2 style={{ fontWeight: 800, fontSize: 24, color: 'var(--navy)' }}>
            {ehCadastro ? 'Criar minha conta' : 'Entrar na minha conta'}
          </h2>
          <button type="button" onClick={fecharAuth} aria-label="Fechar" className="fechar">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <p style={{ fontSize: 15, color: 'var(--texto-suave)', marginTop: 8 }}>
          Sua conta guarda endereço e histórico de pedidos para a próxima compra ser mais
          rápida.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
          {ehCadastro && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label className="campo">
                  Nome
                  <input className="input" value={form.nome} onChange={set('nome')} placeholder="João" />
                </label>
                <label className="campo">
                  Sobrenome
                  <input
                    className="input"
                    value={form.sobrenome}
                    onChange={set('sobrenome')}
                    placeholder="Silva"
                  />
                </label>
              </div>
              <label className="campo">
                Nome do comércio (opcional)
                <input
                  className="input"
                  value={form.empresa}
                  onChange={set('empresa')}
                  placeholder="Mercado Bom Preço"
                />
              </label>
              <label className="campo">
                WhatsApp
                <input
                  className="input"
                  value={form.telefone}
                  onChange={set('telefone')}
                  placeholder="(11) 90000-0000"
                />
              </label>
            </>
          )}
          <label className="campo">
            E-mail
            <input
              className="input"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="contato@seucomercio.com.br"
            />
          </label>
          <label className="campo">
            Senha
            <input
              className="input"
              type="password"
              value={form.senha}
              onChange={set('senha')}
              placeholder="Mínimo 6 caracteres"
            />
          </label>
        </div>

        {erro && (
          <div className="alerta-erro" style={{ marginTop: 14 }}>
            {erro}
          </div>
        )}

        <button type="submit" className="btn btn--navy btn--bloco" style={{ marginTop: 20 }}>
          {ehCadastro ? 'Criar conta' : 'Entrar'}
        </button>
        <button
          type="button"
          onClick={trocarAuthModo}
          style={{
            width: '100%',
            marginTop: 10,
            color: 'var(--azul)',
            fontWeight: 600,
            fontSize: '14.5px',
            padding: 10,
          }}
        >
          {ehCadastro ? 'Já tenho conta — entrar' : 'Não tenho conta — cadastrar'}
        </button>
      </form>
    </div>
  );
}
