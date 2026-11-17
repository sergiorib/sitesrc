/**
 * Página "Portfólio" — navegação por categorias (spec-05_portfolio, FR-003.x)
 *
 * Entregue ao navegador como <script is:inline type="module"> dentro de #page-content
 * (import `?raw` em portfolio.astro), para ser re-executado pelo roteador SPA a cada injeção.
 */

const HEADER_GAP = 35;          // folga abaixo do cabeçalho fixo (FR-003)
const SPY_PAUSE_MS = 600;       // suspensão do scroll-spy após clique (FR-003.4)
const SPY_ROOT_MARGIN = '-160px 0px -40% 0px';

function getScrollHost() {
  return document.getElementById('page-content-host');
}

function setActiveButton(buttons, sectionId) {
  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.section === sectionId);
  });
}

function scrollToSection(wrapper, section) {
  const header = wrapper.querySelector('.portfolio-header');
  const offset = (header ? header.offsetHeight : 150) + HEADER_GAP;
  const host = getScrollHost();

  if (host && host.contains(section)) {
    const top = section.getBoundingClientRect().top - host.getBoundingClientRect().top + host.scrollTop - offset;
    host.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  } else {
    const top = window.scrollY + section.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}

function setupScrollSpy(wrapper, buttons, sections, state) {
  if (window.__portfolioSpy) {
    window.__portfolioSpy.observer.disconnect();
    window.__portfolioSpy.cleanup();
    window.__portfolioSpy = null;
  }
  if (!('IntersectionObserver' in window)) return;

  const host = getScrollHost();
  const root = host && host.contains(wrapper) ? host : null;
  const header = wrapper.querySelector('.portfolio-header');

  // Seção ativa = a última cujo topo já alcançou a linha logo abaixo do cabeçalho fixo.
  // (Categorias vazias são curtas; "primeira seção visível" escolheria a seção errada.)
  const updateActive = () => {
    if (state.locked || Date.now() < state.pausedUntil) return;
    const rootTop = root ? root.getBoundingClientRect().top : 0;
    const line = (header ? header.getBoundingClientRect().bottom : rootTop) + HEADER_GAP + 2;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) current = section;
    });
    if (current) setActiveButton(buttons, current.id);
  };

  const observer = new IntersectionObserver(updateActive, {
    root,
    rootMargin: SPY_ROOT_MARGIN,
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });
  sections.forEach((section) => observer.observe(section));

  // Após um clique, a seleção fica travada até o usuário rolar por conta própria.
  const scrollTarget = root || window;
  const unlock = () => {
    if (state.locked && Date.now() >= state.pausedUntil) {
      state.locked = false;
      updateActive();
    }
  };
  const userEvents = ['wheel', 'touchmove', 'keydown'];
  userEvents.forEach((type) => scrollTarget.addEventListener(type, unlock, { passive: true }));

  // O observer só dispara nas bordas da área observada; o scroll (limitado por rAF)
  // cobre a passagem do topo de cada seção pela linha do cabeçalho.
  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; updateActive(); });
  };
  scrollTarget.addEventListener('scroll', onScroll, { passive: true });

  window.__portfolioSpy = {
    observer,
    cleanup: () => {
      userEvents.forEach((type) => scrollTarget.removeEventListener(type, unlock));
      scrollTarget.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    },
  };
}

function initPortfolioNavigation() {
  if (typeof document === 'undefined') return;

  const wrapper = document.querySelector('.portfolio-page-wrapper');
  if (!wrapper || wrapper.dataset.listenerAttached === 'true') return;
  wrapper.dataset.listenerAttached = 'true';

  const buttons = Array.from(wrapper.querySelectorAll('.selection-button'));
  const sections = Array.from(wrapper.querySelectorAll('.category-section'));
  const state = { pausedUntil: 0, locked: false };

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const sectionId = button.dataset.section || (button.getAttribute('href') || '').slice(1);
      const section = sectionId ? document.getElementById(sectionId) : null;
      if (!section) return;

      state.pausedUntil = Date.now() + SPY_PAUSE_MS;
      state.locked = true;
      setActiveButton(buttons, sectionId);
      scrollToSection(wrapper, section);

      // Sincroniza o fragmento sem disparar recarga de rota (FR-003.2).
      if (window.location.hash !== `#${sectionId}`) {
        history.pushState(history.state, '', `#${sectionId}`);
      }
    });
  });

  setupScrollSpy(wrapper, buttons, sections, state);

  // Âncora inicial (#section-*) vinda da URL.
  const initialHash = window.location.hash.slice(1);
  if (initialHash.startsWith('section-')) {
    const section = document.getElementById(initialHash);
    if (section) {
      state.pausedUntil = Date.now() + SPY_PAUSE_MS;
      state.locked = true;
      setActiveButton(buttons, initialHash);
      requestAnimationFrame(() => scrollToSection(wrapper, section));
    }
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioNavigation, { once: true });
  } else {
    initPortfolioNavigation();
  }

  if (!window.__portfolioNavBound) {
    window.__portfolioNavBound = true;
    window.addEventListener('pageshow', initPortfolioNavigation);
    window.addEventListener('spa:page-loaded', initPortfolioNavigation);
  }
}

// Endpoint GET para compatibilidade com file-based routing do Astro (arquivo sob pages/)
export function GET() {
  return new Response(JSON.stringify({ module: 'portfolio' }), {
    headers: { 'content-type': 'application/json' },
  });
}
