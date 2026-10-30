/**
 * Utilitário de Formatação e Atualização da Régua de Breadcrumbs
 */

const SEGMENT_LABELS = {
  spa: 'Início',
  sobre: 'Sobre',
  historico: 'Histórico',
  formacao: 'Formação',
  portfolio: 'Portfólio',
  artigos: 'Artigos',
  contatos: 'Contatos',
  'subpagina-demo': 'Detalhes do Projeto',
  default: 'Página não encontrada',
};

/**
 * Converte um pathname em uma lista de segmentos estruturados
 * @param {string} pathname
 * @param {string} [customTitle]
 * @returns {Array<{ label: string, url: string|null, isCurrent: boolean }>}
 */
export function parseBreadcrumbs(pathname, customTitle = null) {
  // Limpar e quebrar em segmentos
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const rawSegments = cleanPath.split('/').filter(Boolean);

  // Filtrar segmentos de prefixo 'pages' ou 'spa' se desejado para manter limpo
  const segments = rawSegments.filter((seg) => seg !== 'pages');

  // Caso esteja na raiz da SPA
  if (segments.length === 0 || (segments.length === 1 && segments[0] === 'spa')) {
    return [{ label: 'Sobre', url: null, isCurrent: true }];
  }

  const breadcrumbs = [];
  let accumulatedPath = '/pages';

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

  return breadcrumbs;
}

/**
 * Renderiza os Breadcrumbs no elemento #breadcrumbs-list
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
        ? `<span class="breadcrumb-current-text">${item.label}</span>`
        : `<a href="${item.url}" class="breadcrumb-link">${item.label}</a>`;

      const separator = !isLast
        ? `<span class="breadcrumb-separator" aria-hidden="true">/</span>`
        : '';

      return `<li class="breadcrumb-item ${item.isCurrent ? 'current' : ''}">${content}${separator}</li>`;
    })
    .join('');
}

// Endpoint GET para compatibilidade com file-based routing do Astro
export function GET() {
  return new Response(JSON.stringify({ module: 'breadcrumbs' }), {
    headers: { 'content-type': 'application/json' },
  });
}
