/**
 * Régua de breadcrumbs da moldura da SPA (spec-01 FR-008)
 *
 * Trilha: "Início" (→ /spa), um nível por segmento da rota (ignorando 'pages' e 'spa'),
 * com rótulos do menu (pages/spa/data/navegacao.json) quando existirem, e o último
 * nível igual ao data-page-title da página injetada.
 */
import navegacao from '../../data/navegacao.json';

// Rótulos dos segmentos: fonte única = itens do menu (spec-01 FR-009)
const SEGMENT_LABELS = Object.fromEntries(navegacao.navegacao.map((item) => [item.id, item.rotulo]));

/**
 * Converte um pathname em uma lista de segmentos estruturados
 * @param {string} pathname
 * @param {string} [customTitle]
 * @returns {Array<{ label: string, url: string|null, isCurrent: boolean }>}
 */
export function parseBreadcrumbs(pathname, customTitle = null) {
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
 */
export function updateBreadcrumbsDOM(pathname, customTitle = null) {
  const listEl = document.getElementById('breadcrumbs-list');
  if (!listEl) return;

  const items = parseBreadcrumbs(pathname, customTitle);

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
