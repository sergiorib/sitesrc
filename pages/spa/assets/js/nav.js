/**
 * Navegação e controle de estados visuais da Sidebar
 */

export const NAV_ITEMS = [
  {
    id: 'sobre',
    label: 'Sobre',
    targetFile: 'sobre.astro',
    targetRoute: '/spa/sobre',
    iconLight: '/spa/assets/images/icone-sobre-claro.png',
    iconDark: '/spa/assets/images/icone-sobre-escuro.png',
    isDefault: true,
  },
  {
    id: 'historico',
    label: 'Histórico',
    targetFile: 'historico.astro',
    targetRoute: '/spa/historico',
    iconLight: '/spa/assets/images/icone-historico-claro.png',
    iconDark: '/spa/assets/images/icone-historico-escuro.png',
    isDefault: false,
  },

  {
    id: 'portfolio',
    label: 'Portfólio',
    targetFile: 'portfolio.astro',
    targetRoute: '/spa/portfolio',
    iconLight: '/spa/assets/images/icone-portfolio-claro.png',
    iconDark: '/spa/assets/images/icone-portfolio-escuro.png',
    isDefault: false,
  },
  {
    id: 'artigos',
    label: 'Artigos',
    targetFile: 'artigos.astro',
    targetRoute: '/spa/artigos',
    iconLight: '/spa/assets/images/icone-artigos-claro.png',
    iconDark: '/spa/assets/images/icone-artigos-escuro.png',
    isDefault: false,
  },
  {
    id: 'contatos',
    label: 'Contatos',
    targetFile: 'contatos.astro',
    targetRoute: '/spa/contatos',
    iconLight: '/spa/assets/images/icone-contatos-claro.png',
    iconDark: '/spa/assets/images/icone-contatos-escuro.png',
    isDefault: false,
  },
];

/**
 * Atualiza o estado visual dos itens de navegação na Sidebar
 * @param {string} activeMenuId - ID do item ativo (ex: 'sobre', 'portfolio')
 */
export function setActiveNavItem(activeMenuId) {
  if (!activeMenuId) return;

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach((item) => {
    const itemId = item.getAttribute('data-menu-id');
    const isTarget = itemId === activeMenuId;

    if (isTarget) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    } else {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    }
  });

  revealActiveNavItem();
}

/**
 * Abaixo de 1024px o menu é uma faixa horizontal com rolagem própria (spec-01 FR-022):
 * rola apenas a faixa para manter o item ativo visível, sem mover a página.
 */
export function revealActiveNavItem() {
  const strip = document.querySelector('.sidebar-nav-container');
  const active = strip ? strip.querySelector('.nav-item.active') : null;
  if (!strip || !active || strip.scrollWidth <= strip.clientWidth) return;

  const stripRect = strip.getBoundingClientRect();
  const itemRect = active.getBoundingClientRect();
  if (itemRect.left >= stripRect.left && itemRect.right <= stripRect.right) return;

  const target = strip.scrollLeft + (itemRect.left - stripRect.left)
    - (strip.clientWidth - itemRect.width) / 2;
  strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
}

// Endpoint GET para compatibilidade com file-based routing do Astro
export function GET() {
  return new Response(JSON.stringify(NAV_ITEMS), {
    headers: { 'content-type': 'application/json' },
  });
}
