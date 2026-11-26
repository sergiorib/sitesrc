/**
 * Régua de breadcrumbs da moldura da SPA (spec-01 FR-008)
 *
 * Trilha: "Início" (→ /spa), um nível por segmento da rota (ignorando 'pages' e 'spa'),
 * com rótulos do menu (pages/spa/data/navegacao.json) quando existirem, e o último
 * nível igual ao data-page-title da página injetada.
 *
 * Trilha declarada (spec-01 FR-008.1): se o #page-content injetado declarar
 * data-breadcrumbs (JSON [{ "rotulo", "url" }, …]), os níveis intermediários são os
 * declarados, em vez dos segmentos da rota.
 */
import navegacao from '../../data/navegacao.json';

// Rótulos dos segmentos: fonte única = itens do menu (spec-01 FR-009)
const SEGMENT_LABELS = Object.fromEntries(navegacao.navegacao.map((item) => [item.id, item.rotulo]));

/**
 * Lê a trilha declarada em data-breadcrumbs do #page-content (spec-01 FR-008.1)
 * @param {Element|null} contentEl
 * @returns {Array<{ rotulo: string, url: string }>|null}
 */
export function readDeclaredTrail(contentEl) {
  const raw = contentEl ? contentEl.getAttribute('data-breadcrumbs') : null;
  if (!raw) return null;
  try {
    const trail = JSON.parse(raw);
    if (!Array.isArray(trail)) return null;
    const valid = trail.filter((nivel) => nivel && nivel.rotulo && nivel.url);
    return valid.length > 0 ? valid : null;
  } catch (error) {
    console.warn('[breadcrumbs] data-breadcrumbs inválido; usando os segmentos da rota.', error);
    return null;
  }
}

/**
 * Converte um pathname em uma lista de segmentos estruturados
 * @param {string} pathname
 * @param {string} [customTitle]
 * @param {Array<{ rotulo: string, url: string }>|null} [declaredTrail]
 * @returns {Array<{ label: string, url: string|null, isCurrent: boolean }>}
 */
export function parseBreadcrumbs(pathname, customTitle = null, declaredTrail = null) {
  if (declaredTrail && declaredTrail.length > 0) {
    return [
      { label: 'Início', url: '/spa', isCurrent: false },
      ...declaredTrail.map((nivel) => ({ label: nivel.rotulo, url: nivel.url, isCurrent: false })),
      { label: customTitle || document.title || '', url: null, isCurrent: true },
    ];
  }

  // Limpar e quebrar em segmentos, evitando barras duplicadas
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
  const rawSegments = cleanPath.split('/').filter(Boolean);

  // Filtrar segmentos de prefixo 'pages' ou 'spa'
  const segments = rawSegments.filter((seg) => seg !== 'pages' && seg !== 'spa');

  const breadcrumbs = [];
  const isAtRoot = segments.length === 0;

  // O primeiro elo é sempre "Início" apontando para a raiz '/spa'
  breadcrumbs.push({
    label: 'Início',
    url: isAtRoot ? null : '/spa',
    isCurrent: isAtRoot,
  });

  if (!isAtRoot) {
    let accumulatedPath = '/spa';
    segments.forEach((seg, index) => {
      accumulatedPath += `/${seg}`;
      const isLast = index === segments.length - 1;
      let label = SEGMENT_LABELS[seg] || seg.replace(/[-_]/g, ' ');

      if (isLast && customTitle) {
        label = customTitle;
      }

      breadcrumbs.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        url: isLast ? null : accumulatedPath,
        isCurrent: isLast,
      });
    });
  }

  return breadcrumbs;
}

/**
 * Renderiza a trilha no elemento #breadcrumbs-list (elemento breadcrumbs do catálogo)
 * @param {string} pathname
 * @param {string} [customTitle]
 * @param {Array<{ rotulo: string, url: string }>|null} [declaredTrail]
 */
export function updateBreadcrumbsDOM(pathname, customTitle = null, declaredTrail = null) {
  const listEl = document.getElementById('breadcrumbs-list');
  if (!listEl) return;

  const items = parseBreadcrumbs(pathname, customTitle, declaredTrail);

  listEl.innerHTML = items
    .map((item, idx) => {
      const isLast = idx === items.length - 1;
      const content = item.isCurrent || !item.url
        ? `<span class="breadcrumbs-current">${item.label}</span>`
        : `<a href="${item.url}" class="breadcrumbs-link">${item.label}</a>`;

      const separator = !isLast
        ? `<span class="breadcrumbs-sep" aria-hidden="true">/</span>`
        : '';

      return `<li class="breadcrumbs-item${item.isCurrent ? ' is-atual' : ''}">${content}${separator}</li>`;
    })
    .join('');
}

// Endpoint GET para compatibilidade com file-based routing do Astro (arquivo sob pages/)
export function GET() {
  return new Response(JSON.stringify({ module: 'breadcrumbs' }), {
    headers: { 'content-type': 'application/json' },
  });
}
