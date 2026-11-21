/**
 * Menu da moldura da SPA — item ativo (spec-01 FR-007)
 *
 * Os itens do menu vêm de pages/spa/data/navegacao.json e são renderizados pelo
 * elemento nav-menu (pages/spa/components/elementos/NavMenu.astro).
 */

/**
 * Move o estado ativo (is-ativo + aria-current) para o item de menu da seção
 * @param {string} activeMenuId - id do item ativo (ex.: 'sobre', 'portfolio')
 */
export function setActiveNavItem(activeMenuId) {
  if (!activeMenuId) return;

  const navItems = document.querySelectorAll('.nav-menu-item');
  navItems.forEach((item) => {
    const isTarget = item.getAttribute('data-menu-id') === activeMenuId;
    item.classList.toggle('is-ativo', isTarget);
    if (isTarget) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });

  revealActiveNavItem();
}

/**
 * Abaixo de 1024px o menu é uma faixa horizontal com rolagem própria (spec-01 FR-007):
 * rola apenas a faixa para manter o item ativo visível, sem mover a página.
 */
export function revealActiveNavItem() {
  const strip = document.querySelector('.nav-menu');
  const active = strip ? strip.querySelector('.nav-menu-item.is-ativo') : null;
  if (!strip || !active || strip.scrollWidth <= strip.clientWidth) return;

  const stripRect = strip.getBoundingClientRect();
  const itemRect = active.getBoundingClientRect();
  if (itemRect.left >= stripRect.left && itemRect.right <= stripRect.right) return;

  const target = strip.scrollLeft + (itemRect.left - stripRect.left)
    - (strip.clientWidth - itemRect.width) / 2;
  strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
}

// Endpoint GET para compatibilidade com file-based routing do Astro (arquivo sob pages/)
export function GET() {
  return new Response(JSON.stringify({ module: 'nav' }), {
    headers: { 'content-type': 'application/json' },
  });
}
