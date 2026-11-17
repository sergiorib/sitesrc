/**
 * Página "Artigos técnicos" — acordeão e seleção de artigos (spec-06_artigos, FR-003.x)
 *
 * Entregue ao navegador como <script is:inline type="module"> dentro de #page-content
 * (import `?raw` em artigos.astro), para ser re-executado pelo roteador SPA a cada injeção.
 */

const SELECT_DELAY_MS = 150;

/**
 * Navega para a URL do artigo pelo roteador SPA: uma âncora temporária dentro da página
 * é clicada e o listener delegado global do roteador intercepta (sem full page reload).
 * Sem o roteador (modo isolado), o clique segue a navegação nativa.
 */
function navigateTo(container, url) {
  const link = document.createElement('a');
  link.href = url;
  link.hidden = true;
  container.appendChild(link);
  link.click();
  link.remove();
}

function initArtigosPage() {
  if (typeof document === 'undefined') return;

  const page = document.querySelector('.artigos-page');
  if (!page) return;

  // Acordeão de grupos e subgrupos
  page.querySelectorAll('.group-toggle, .subgroup-toggle').forEach((toggle) => {
    if (toggle.dataset.listenerAttached === 'true') return;
    toggle.dataset.listenerAttached = 'true';

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const parent = toggle.parentElement;
      const isOpen = parent.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Seleção de artigos (.leaf) — só a última seleção navega (cliques rápidos cancelam a anterior)
  const leaves = page.querySelectorAll('.leaf');
  let pendingNavigation = 0;
  leaves.forEach((leaf) => {
    if (leaf.dataset.listenerAttached === 'true') return;
    leaf.dataset.listenerAttached = 'true';

    leaf.addEventListener('click', (event) => {
      event.preventDefault();

      leaves.forEach((item) => {
        item.classList.remove('selected');
        const check = item.querySelector('.check-mark');
        if (check) check.remove();
      });

      leaf.classList.add('selected');
      const mark = document.createElement('span');
      mark.className = 'check-mark';
      mark.textContent = '✓';
      leaf.appendChild(mark);

      const targetUrl = leaf.dataset.url;
      clearTimeout(pendingNavigation);
      if (targetUrl) {
        pendingNavigation = setTimeout(() => navigateTo(page, targetUrl), SELECT_DELAY_MS);
      }
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArtigosPage, { once: true });
  } else {
    initArtigosPage();
  }

  if (!window.__artigosBound) {
    window.__artigosBound = true;
    window.addEventListener('spa:page-loaded', initArtigosPage);
  }
}

// Endpoint GET para compatibilidade com file-based routing do Astro (arquivo sob pages/)
export function GET() {
  return new Response(JSON.stringify({ module: 'artigos' }), {
    headers: { 'content-type': 'application/json' },
  });
}
