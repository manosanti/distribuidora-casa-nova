'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { ProdutoCard } from '@/components/ProdutoCard';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { semAcento } from '@/lib/format';
import { waLista } from '@/lib/site';
import {
  BUSCAS_RELACIONADAS,
  FAIXAS,
  NICHOS,
  OFERTAS,
  ORDENS,
  PRODUTOS,
  foraEstoque,
  nichoNome,
  precoPor,
  type OrdemId,
  type Produto,
} from '@/lib/catalogo';

const POR_PAGINA = 12;

type Props = { nichoInicial: string; buscaInicial: string };

export function CatalogoClient({ nichoInicial, buscaInicial }: Props) {
  const [filtro, setFiltro] = useState(nichoInicial);
  const [busca, setBusca] = useState(buscaInicial);
  const [ordenar, setOrdenar] = useState<OrdemId>('relevancia');
  const [soEstoque, setSoEstoque] = useState(false);
  const [soOferta, setSoOferta] = useState(false);
  const [faixa, setFaixa] = useState<string | null>(null);
  const [precoMin, setPrecoMin] = useState('');
  const [precoMax, setPrecoMax] = useState('');
  const [pagina, setPagina] = useState(1);

  const visiveis = useMemo(
    () => filtrar({ filtro, busca, soEstoque, soOferta, faixa, precoMin, precoMax, ordenar }),
    [filtro, busca, soEstoque, soOferta, faixa, precoMin, precoMax, ordenar],
  );

  const totalPaginas = Math.max(1, Math.ceil(visiveis.length / POR_PAGINA));
  const paginaAtual = Math.min(Math.max(1, pagina), totalPaginas);
  const inicio = (paginaAtual - 1) * POR_PAGINA;
  const fim = Math.min(inicio + POR_PAGINA, visiveis.length);
  const naPagina = visiveis.slice(inicio, fim);

  const irPagina = (n: number) => {
    setPagina(n);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const limparFiltros = () => {
    setFiltro('todos');
    setBusca('');
    setSoEstoque(false);
    setSoOferta(false);
    setFaixa(null);
    setPrecoMin('');
    setPrecoMax('');
    setPagina(1);
  };

  const chips: { label: string; limpar: () => void }[] = [];
  if (filtro !== 'todos')
    chips.push({ label: nichoNome(filtro), limpar: () => { setFiltro('todos'); setPagina(1); } });
  if (busca) chips.push({ label: `“${busca}”`, limpar: () => { setBusca(''); setPagina(1); } });
  if (soEstoque) chips.push({ label: 'Em estoque', limpar: () => { setSoEstoque(false); setPagina(1); } });
  if (soOferta) chips.push({ label: 'Em oferta', limpar: () => { setSoOferta(false); setPagina(1); } });
  if (faixa) {
    const fx = FAIXAS.find((x) => x.id === faixa);
    chips.push({ label: fx?.label ?? '', limpar: () => { setFaixa(null); setPagina(1); } });
  } else if (precoMin || precoMax) {
    chips.push({
      label: `Preço ${precoMin || '0'} – ${precoMax || '∞'}`,
      limpar: () => { setPrecoMin(''); setPrecoMax(''); setPagina(1); },
    });
  }

  const resultadoLabel =
    (filtro === 'todos' ? 'Todos os nichos' : nichoNome(filtro)) +
    ' · ' +
    visiveis.length +
    (visiveis.length === 1 ? ' item' : ' itens') +
    (totalPaginas > 1 ? ` · mostrando ${inicio + 1}–${fim}` : '');

  return (
    <>
      <div className="buscas-relacionadas">
        <div className="container buscas-relacionadas__inner">
          <span
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: 'var(--navy)',
              fontFamily: 'var(--font-sora), sans-serif',
            }}
          >
            Buscas relacionadas:
          </span>
          {BUSCAS_RELACIONADAS.map((t) => (
            <button key={t} type="button" onClick={() => { setBusca(t); setPagina(1); }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="barra-busca">
        <div className="container barra-busca__inner">
          <div className="barra-busca__campo">
            <Search size={17} color="#8494a8" aria-hidden="true" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
              placeholder="Buscar no catálogo"
              aria-label="Buscar no catálogo"
            />
          </div>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              fontSize: 14,
              color: 'var(--texto-suave)',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Ordenar por
            <select
              className="select"
              value={ordenar}
              onChange={(e) => { setOrdenar(e.target.value as OrdemId); setPagina(1); }}
            >
              {ORDENS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section>
        <div className="container catalogo__corpo">
          <aside className="filtros">
            <div className="filtros__bloco">
              <div className="filtros__topo">
                <span className="filtros__titulo">Filtros</span>
                <button
                  type="button"
                  onClick={limparFiltros}
                  style={{ fontSize: 13, color: 'var(--azul)', fontWeight: 600 }}
                >
                  limpar
                </button>
              </div>
              <div className="filtros__toggle">
                <span>Em estoque</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={soEstoque}
                  aria-label="Mostrar só itens em estoque"
                  className="switch"
                  data-on={soEstoque}
                  onClick={() => { setSoEstoque((v) => !v); setPagina(1); }}
                >
                  <span />
                </button>
              </div>
              <div className="filtros__toggle">
                <span>Em oferta</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={soOferta}
                  aria-label="Mostrar só itens em oferta"
                  className="switch"
                  data-on={soOferta}
                  onClick={() => { setSoOferta((v) => !v); setPagina(1); }}
                >
                  <span />
                </button>
              </div>
            </div>

            <div className="filtros__bloco">
              <div className="filtros__titulo">Categorias</div>
              <div className="filtros__lista">
                <button
                  type="button"
                  className="filtros__opcao"
                  data-ativo={filtro === 'todos'}
                  onClick={() => { setFiltro('todos'); setPagina(1); }}
                >
                  Todos os produtos
                </button>
                {NICHOS.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className="filtros__opcao"
                    data-ativo={filtro === n.id}
                    onClick={() => { setFiltro(n.id); setPagina(1); }}
                  >
                    {n.nome}
                  </button>
                ))}
              </div>
            </div>

            <div className="filtros__bloco">
              <div className="filtros__titulo">Preço</div>
              <div className="filtros__lista">
                {FAIXAS.map((fx) => (
                  <button
                    key={fx.id}
                    type="button"
                    className="filtros__opcao"
                    data-ativo={faixa === fx.id}
                    onClick={() => {
                      setFaixa(fx.id);
                      setPrecoMin('');
                      setPrecoMax('');
                      setPagina(1);
                    }}
                  >
                    {fx.label}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
                <input
                  className="input"
                  style={{ fontSize: 14, padding: '10px 11px', borderRadius: 10, minWidth: 0 }}
                  value={precoMin}
                  onChange={(e) => { setPrecoMin(e.target.value); setFaixa(null); setPagina(1); }}
                  placeholder="Mínimo"
                  aria-label="Preço mínimo"
                  inputMode="decimal"
                />
                <span style={{ color: 'var(--texto-tenue)' }}>–</span>
                <input
                  className="input"
                  style={{ fontSize: 14, padding: '10px 11px', borderRadius: 10, minWidth: 0 }}
                  value={precoMax}
                  onChange={(e) => { setPrecoMax(e.target.value); setFaixa(null); setPagina(1); }}
                  placeholder="Máximo"
                  aria-label="Preço máximo"
                  inputMode="decimal"
                />
              </div>
            </div>
          </aside>

          <div className="resultados">
            <div className="resultados__label">{resultadoLabel}</div>

            {chips.length > 0 && (
              <div className="chips">
                {chips.map((ch) => (
                  <button key={ch.label} type="button" onClick={ch.limpar} className="chip">
                    {ch.label}
                    <X size={14} color="var(--texto-tenue)" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}

            {visiveis.length === 0 && (
              <div className="vazio">
                <div className="vazio__titulo">Nenhum produto com esses filtros</div>
                <p>Tente limpar os filtros ou buscar por outro termo.</p>
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="btn btn--navy"
                  style={{ marginTop: 16 }}
                >
                  Limpar filtros
                </button>
              </div>
            )}

            <div className="grid-resultados">
              {naPagina.map((p) => (
                <ProdutoCard key={p.nome} produto={p} />
              ))}
            </div>

            {totalPaginas > 1 && (
              <nav className="paginacao" aria-label="Paginação do catálogo">
                <button
                  type="button"
                  onClick={() => irPagina(paginaAtual - 1)}
                  disabled={paginaAtual === 1}
                >
                  <ArrowLeft size={15} aria-hidden="true" /> Anterior
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="paginacao__num"
                    aria-current={n === paginaAtual ? 'page' : undefined}
                    onClick={() => irPagina(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => irPagina(paginaAtual + 1)}
                  disabled={paginaAtual === totalPaginas}
                >
                  Próxima <ArrowRight size={15} aria-hidden="true" />
                </button>
              </nav>
            )}

            <div className="cta-faixa">
              <div>
                <h3>Não achou o que precisa?</h3>
                <p>
                  Trabalhamos com mais itens do que o catálogo mostra. Manda sua lista e a
                  gente confirma.
                </p>
              </div>
              <a href={waLista()} target="_blank" rel="noopener" className="btn btn--verde btn--lg">
                <WhatsAppIcon size={20} />
                Mandar minha lista
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function filtrar(s: {
  filtro: string;
  busca: string;
  soEstoque: boolean;
  soOferta: boolean;
  faixa: string | null;
  precoMin: string;
  precoMax: string;
  ordenar: OrdemId;
}): Produto[] {
  const termo = semAcento(s.busca).trim();
  const faixa = s.faixa ? FAIXAS.find((x) => x.id === s.faixa) : null;
  const min = faixa ? faixa.min : parseFloat(s.precoMin.replace(',', '.')) || 0;
  const max = faixa ? faixa.max : parseFloat(s.precoMax.replace(',', '.')) || Infinity;

  const lista = PRODUTOS.filter((p) => {
    if (s.filtro !== 'todos' && p.nicho !== s.filtro) return false;
    if (termo && !semAcento(`${p.nome} ${p.descricao}`).includes(termo)) return false;
    if (s.soEstoque && foraEstoque(p.nome)) return false;
    if (s.soOferta && !OFERTAS[p.nome]) return false;
    const v = precoPor(p.nome);
    return v >= min && v <= max;
  });

  if (s.ordenar === 'menor') return [...lista].sort((a, b) => precoPor(a.nome) - precoPor(b.nome));
  if (s.ordenar === 'maior') return [...lista].sort((a, b) => precoPor(b.nome) - precoPor(a.nome));
  if (s.ordenar === 'az') return [...lista].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  return lista;
}
