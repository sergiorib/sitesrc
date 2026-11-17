/**
 * Comportamento Client-Side para a Página Portfólio
 * Gerencia scroll suave para âncoras de categorias e destaque do botão ativo.
 */

export function initPortfolioNavigation() {
  if (typeof document === 'undefined') return;
  const buttons = document.querySelectorAll('.selection-button');
  const sections = document.querySelectorAll('.category-section');
  const contentHost = document.getElementById('page-content-host') || document.querySelector('.page-content-host');

  if (!buttons.length || !sections.length) return;

  // Interceptar cliques nos botões de categoria para rolagem suave no container SPA (.page-content-host) ou janela
  buttons.forEach(btn => {
    // Evitar múltiplos listeners
    if (btn.dataset.listenerAttached === 'true') return;
    btn.dataset.listenerAttached = 'true';

    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Atualizar classes ativas imediatamente
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          // Atualizar URL hash sem disparar navegação de rota
          if (typeof history !== 'undefined' && history.pushState) {
            history.pushState(null, '', targetId);
          }

          // Calcular offset dinâmico com folga para que o cabeçalho nunca cubra o título da seção
          const headerEl = document.querySelector('.portfolio-header');
          const headerHeight = headerEl ? headerEl.offsetHeight : 140;
          const headerOffset = headerHeight + 20;

          // Rolar com precisão considerando o container scrollável da SPA (.page-content-host) ou janela
          if (contentHost) {
            const elementRect = targetElement.getBoundingClientRect();
            const hostRect = contentHost.getBoundingClientRect();
            const scrollTopTarget = elementRect.top - hostRect.top + contentHost.scrollTop - headerOffset;

            contentHost.scrollTo({
              top: Math.max(0, scrollTopTarget),
              behavior: 'smooth'
            });
          } else {
            const elementRect = targetElement.getBoundingClientRect();
            const scrollTopTarget = window.scrollY + elementRect.top - headerOffset;
            window.scrollTo({
              top: Math.max(0, scrollTopTarget),
              behavior: 'smooth'
            });
          }
        }
      }
    });
  });

  // Observador de interseção para atualizar botão ativo conforme o scroll
  const observerOptions = {
    root: contentHost || null,
    rootMargin: '-160px 0px -40% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        buttons.forEach(btn => {
          const href = btn.getAttribute('href');
          if (href === `#${id}`) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPortfolioNavigation();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      initPortfolioNavigation();
    });
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('pageshow', () => {
    initPortfolioNavigation();
  });
  window.addEventListener('spa:page-loaded', () => {
    initPortfolioNavigation();
  });
}

// Endpoint GET para compatibilidade com file-based routing do Astro
export function GET() {
  return new Response(JSON.stringify({ module: 'portfolio' }), {
    headers: { 'content-type': 'application/json' },
  });
}
