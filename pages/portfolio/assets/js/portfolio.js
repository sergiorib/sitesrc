function initPortfolioPage() {
  if (typeof document === 'undefined') return;

  // Controle interativo do painel de filtros (Pills)
  const filterPills = document.querySelectorAll('.filter-pill');

  filterPills.forEach(pill => {
    if (pill.dataset.listenerAttached) return;
    pill.dataset.listenerAttached = 'true';

    pill.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active state from all pills
      filterPills.forEach(p => p.classList.remove('active'));

      // Add active state to clicked pill
      pill.classList.add('active');

      // Filtragem de seções por categoria correspondente
      const categoryName = pill.textContent.trim();
      const sections = document.querySelectorAll('.category-section');

      sections.forEach(section => {
        const titleEl = section.querySelector('.category-title');
        if (!titleEl) return;
        const sectionTitle = titleEl.textContent.trim();

        if (categoryName === 'Outros Projetos' || sectionTitle.toLowerCase().includes(categoryName.toLowerCase())) {
          section.style.display = 'block';
        } else {
          section.style.display = 'block';
        }
      });
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioPage);
  } else {
    initPortfolioPage();
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('spa:page-loaded', () => {
    initPortfolioPage();
  });
}

export function GET() {
  return new Response(JSON.stringify({ module: 'portfolio' }), {
    headers: { 'content-type': 'application/json' },
  });
}
