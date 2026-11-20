/**
 * Página "Artigos técnicos" — seleção de artigos (spec-06_artigos, FR-006)
 *
 * Abrir/fechar grupos e subgrupos é nativo do elemento accordion (<details>), sem JS.
 * Este script só cuida da seleção: marca o link-item clicado (is-selecionado + ✓) e,
 * após 150ms, navega para o href dele pelo roteador SPA.
 *
 * Entregue ao navegador como <script is:inline type="module"> dentro de #page-content
 * (import `?raw` em artigos.astro), para ser re-executado pelo roteador SPA a cada injeção.
 */

const SELECT_DELAY_MS = 150;

/**
 * Navega para a URL pelo roteador SPA: uma âncora temporária dentro da página é clicada
 * e o listener delegado global do roteador intercepta (sem full page reload).
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

  // Seleção de artigos — só a última seleção navega (cliques rápidos cancelam a anterior)
  const items = page.querySelectorAll('.link-item');
  let pendingNavigation = 0;
  items.forEach((item) => {
    if (item.dataset.listenerAttached === 'true') return;
    item.dataset.listenerAttached = 'true';

    item.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      items.forEach((other) => {
        other.classList.remove('is-selecionado');
        const check = other.querySelector('.link-item-check');
        if (check) check.remove();
      });

      item.classList.add('is-selecionado');
      const mark = document.createElement('span');
      mark.className = 'link-item-check';
      mark.textContent = '✓';
      item.appendChild(mark);

      const targetUrl = item.getAttribute('href');
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
