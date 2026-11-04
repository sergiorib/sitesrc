function initArtigosPage() {
  if (typeof document === 'undefined') return;

  // Alternância de Acordeão (Grupos e Subgrupos)
  const toggles = document.querySelectorAll('.group-toggle, .subgroup-toggle');

  toggles.forEach(toggle => {
    if (toggle.dataset.listenerAttached) return;
    toggle.dataset.listenerAttached = 'true';

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = toggle.parentElement;
      const isOpen = parent.classList.contains('open');

      if (isOpen) {
        parent.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Seleção dos Subitens (Leafs)
  const leafs = document.querySelectorAll('.leaf');

  leafs.forEach(leaf => {
    if (leaf.dataset.listenerAttached) return;
    leaf.dataset.listenerAttached = 'true';

    leaf.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove seleção prévia
      leafs.forEach(item => {
        item.classList.remove('selected');
        const check = item.querySelector('.check-mark');
        if (check) {
          check.remove();
        }
      });

      // Aplica seleção ao item atual
      leaf.classList.add('selected');

      const checkMark = document.createElement('span');
      checkMark.className = 'check-mark';
      checkMark.textContent = '✓';
      leaf.appendChild(checkMark);

      // Redireciona para o caminho data-url
      const targetUrl = leaf.getAttribute('data-url');
      if (targetUrl) {
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 150);
      }
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArtigosPage);
  } else {
    initArtigosPage();
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('spa:page-loaded', () => {
    initArtigosPage();
  });
}

// Endpoint GET para compatibilidade com file-based routing do Astro
export function GET() {
  return new Response(JSON.stringify({ module: 'artigos' }), {
    headers: { 'content-type': 'application/json' },
  });
}
