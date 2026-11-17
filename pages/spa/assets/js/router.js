/**
 * Roteador Client-Side Vanilla JS para a Single Page Application (SPA)
 * Portfólio de Data Science - Sérgio Ribeiro Cerqueira
 */

import { setActiveNavItem } from './nav.js';
import { updateBreadcrumbsDOM } from './breadcrumbs.js';

// Mapeamento de rotas e seus respectivos itens de menu primário pai
const ROUTE_PARENT_MAP = {
  '/spa/sobre': 'sobre',
  '/spa/historico': 'historico',
  '/spa/formacao': 'formacao',
  '/spa/portfolio': 'portfolio',
  '/spa/artigos': 'artigos',
  '/spa/contatos': 'contatos',
  '/spa/subpagina-demo': 'portfolio',
  '/pages/spa/sobre': 'sobre',
  '/pages/spa/historico': 'historico',
  '/pages/spa/formacao': 'formacao',
  '/pages/spa/portfolio': 'portfolio',
  '/pages/spa/artigos': 'artigos',
  '/pages/spa/contatos': 'contatos',
  '/spa': 'sobre',
  '/': 'sobre',
};

// URL da página de fallback 404
const FALLBACK_URL = '/spa/default/';

class SPARouter {
  constructor() {
    this.contentHost = null;
    this.isNavigating = false;
    this.currentPath = null;
  }

  /**
   * Inicializa o roteador e registra os listeners globais
   */
  init() {
    this.contentHost = document.getElementById('page-content-host');

    // Registrar delegação global de eventos de clique
    document.addEventListener('click', this.handleGlobalClick.bind(this));

    // Escutar eventos de navegação do histórico nativo (Voltar/Avançar)
    window.addEventListener('popstate', this.handlePopState.bind(this));

    // Sincronizar estado inicial
    const initialPath = window.location.pathname;
    this.currentPath = this.normalizeFetchUrl(initialPath);
    this.syncInitialState(initialPath);

    // Se houver âncora na carga inicial da SPA, rolar suavemente até ela
    if (window.location.hash) {
      setTimeout(() => {
        this.scrollToAnchor(window.location.hash);
      }, 100);
    }
  }

  /**
   * Sincroniza o estado inicial de menu e breadcrumbs
   */
  syncInitialState(pathname) {
    const activeMenuId = this.resolveMenuFor(pathname, document.getElementById('page-content'));
    setActiveNavItem(activeMenuId);
    updateBreadcrumbsDOM(pathname);
  }

  /**
   * Determina qual item do menu principal deve permanecer ativo
   */
  resolveParentMenu(url) {
    const normalized = url.replace(/\/+$/, '');
    if (ROUTE_PARENT_MAP[normalized]) {
      return ROUTE_PARENT_MAP[normalized];
    }

    // Tentar deduzir pelo primeiro segmento significativo
    const match = normalized.match(/(?:pages\/)?spa\/([^/]+)/);
    if (match && match[1]) {
      const candidate = match[1];
      if (['sobre', 'historico', 'formacao', 'portfolio', 'artigos', 'contatos'].includes(candidate)) {
        return candidate;
      }
    }

    return 'sobre';
  }

  /**
   * Resolve o item de menu ativo considerando o atributo data-parent-route
   * do fragmento carregado (ex.: páginas de projeto do portfólio → '/portfolio').
   */
  resolveMenuFor(url, contentEl) {
    const parentRoute = contentEl ? contentEl.getAttribute('data-parent-route') : null;
    if (parentRoute) {
      const segment = parentRoute.replace(/^\/+|\/+$/g, '').split('/').pop();
      if (segment) {
        return this.resolveParentMenu(`/spa/${segment}`);
      }
    }
    return this.resolveParentMenu(url);
  }

  /**
   * Intercepta cliques globais em links âncora
   */
  handleGlobalClick(event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Verificar se deve ignorar (bypass) o roteador
    if (this.shouldBypassRouter(link, href)) {
      return;
    }

    // Interceptar navegação interna
    event.preventDefault();
    this.navigateTo(href);
  }

  /**
   * Critérios para ignorar interceptação de link
   */
  shouldBypassRouter(link, href) {
    if (href.startsWith('#')) return true;
    if (link.getAttribute('target') === '_blank') return true;
    if (/^(https?:|mailto:|tel:|javascript:)/i.test(href) && !href.startsWith(window.location.origin)) {
      return true;
    }
    if (link.hasAttribute('data-native')) return true;
    return false;
  }

  /**
   * Rola suavemente até um elemento identificado por hash/âncora
   */
  scrollToAnchor(hash) {
    if (!hash) return;
    const cleanId = hash.startsWith('#') ? hash.slice(1) : hash;
    const targetElement = document.getElementById(cleanId);
    if (!targetElement) return;

    const headerEl = document.querySelector('.portfolio-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 140;
    const headerOffset = headerHeight + 35;

    if (this.contentHost) {
      const elementRect = targetElement.getBoundingClientRect();
      const hostRect = this.contentHost.getBoundingClientRect();
      const scrollTopTarget = elementRect.top - hostRect.top + this.contentHost.scrollTop - headerOffset;

      this.contentHost.scrollTo({
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

  /**
   * Executa tags <script> inseridas dinamicamente via innerHTML
   */
  executeIncomingScripts(container) {
    if (!container) return;
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  /**
   * Trata o evento popstate (botões Voltar/Avançar do navegador)
   */
  handlePopState(event) {
    const currentPathname = window.location.pathname;
    const currentHash = window.location.hash;
    const normalizedTarget = this.normalizeFetchUrl(currentPathname);

    // Se o pathname não mudou, foi apenas navegação por âncora/hash interna
    if (this.currentPath && normalizedTarget === this.currentPath) {
      if (currentHash) {
        this.scrollToAnchor(currentHash);
      } else if (this.contentHost) {
        this.contentHost.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    this.navigateTo(currentPathname + currentHash, { pushState: false });
  }

  /**
   * Normaliza URL para busca estática do Astro
   */
  normalizeFetchUrl(url) {
    let clean = url.split('?')[0].split('#')[0];
    clean = clean.replace(/\/+/g, '/');
    if (clean.startsWith('/pages/')) {
      clean = clean.replace('/pages/', '/');
    }
    // Remover extensões como .html ou .htm antes de normalizar o trailing slash
    clean = clean.replace(/\.html?$/i, '');
    // Mapear rota raiz ('/' ou '/spa') para a view inicial padrão (sobre.astro)
    if (clean === '/' || clean === '/spa' || clean === '/spa/') {
      clean = '/spa/sobre/';
    }
    if (!clean.endsWith('/')) {
      clean += '/';
    }
    return clean;
  }

  /**
   * Navega para a URL solicitada e injeta o conteúdo no Main Container
   */
  async navigateTo(url, { pushState = true } = {}) {
    if (this.isNavigating) return;
    this.isNavigating = true;

    try {
      if (!this.contentHost) {
        this.contentHost = document.getElementById('page-content-host');
      }

      const fetchUrl = this.normalizeFetchUrl(url);
      const urlHash = url.includes('#') ? ('#' + url.split('#')[1]) : (window.location.hash || '');
      let response = await fetch(fetchUrl);

      // Tentar URL original caso a normalizada falhe
      if (!response.ok && fetchUrl !== url) {
        response = await fetch(url);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ao carregar ${url}`);
      }

      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      // Extrair e injetar estilos/links do <head> do documento carregado para garantir renderização correta
      const incomingHeadStyles = doc.querySelectorAll('head link[rel="stylesheet"], head style');
      document.querySelectorAll('style[data-spa-dynamic], link[data-spa-dynamic]').forEach(el => el.remove());

      incomingHeadStyles.forEach(styleEl => {
        const cloned = styleEl.cloneNode(true);
        cloned.setAttribute('data-spa-dynamic', 'true');
        document.head.appendChild(cloned);
      });

      // Extrair o contêiner de conteúdo #page-content ou o corpo
      const incomingContent = doc.getElementById('page-content') || doc.body;

      if (!incomingContent) {
        throw new Error(`Estrutura de conteúdo inválida em ${url}`);
      }

      // Extrair metadados da página (título)
      const pageTitle = incomingContent.getAttribute('data-page-title') || doc.title || '';

      // Injetar novo conteúdo no alvo único (#page-content-host)
      this.contentHost.innerHTML = incomingContent.outerHTML;
      this.currentPath = fetchUrl;

      // Sincronizar Breadcrumbs e estado do menu da Sidebar
      const parentMenuId = this.resolveMenuFor(url, this.contentHost.querySelector('#page-content'));
      setActiveNavItem(parentMenuId);
      updateBreadcrumbsDOM(url, pageTitle);

      // Sincronizar History API
      if (pushState) {
        window.history.pushState({ url, parentMenuId }, '', url);
      }

      // Re-executar scripts contidos no fragmento injetado para garantir interatividade
      this.executeIncomingScripts(this.contentHost);

      // Notificar módulos clientes sobre carregamento da página SPA
      window.dispatchEvent(new CustomEvent('spa:page-loaded', {
        detail: { url, pageTitle }
      }));

      // Rolar para a âncora especificada ou para o topo do Main Container
      if (urlHash) {
        requestAnimationFrame(() => {
          this.scrollToAnchor(urlHash);
        });
      } else {
        this.contentHost.scrollTop = 0;
      }
    } catch (error) {
      console.warn(`[SPARouter] Falha ao carregar rota "${url}". Acionando fallback 404.`, error);
      await this.loadFallback(url, pushState);
    } finally {
      this.isNavigating = false;
    }
  }

  /**
   * Carrega a página de fallback gracioso (default.astro) em caso de erro 404
   */
  async loadFallback(failedUrl, pushState = true) {
    try {
      const response = await fetch(FALLBACK_URL);
      if (response.ok) {
        const htmlText = await response.text();
        const doc = new DOMParser().parseFromString(htmlText, 'text/html');
        const fallbackContent = doc.getElementById('page-content') || doc.body;

        if (this.contentHost && fallbackContent) {
          this.contentHost.innerHTML = fallbackContent.outerHTML;
          this.currentPath = FALLBACK_URL;
          updateBreadcrumbsDOM(failedUrl, 'Página não encontrada');

          if (pushState) {
            window.history.pushState({ url: failedUrl, isFallback: true }, '', failedUrl);
          }
          return;
        }
      }
    } catch (e) {
      console.error('[SPARouter] Erro crítico ao carregar página de fallback:', e);
    }

    // Fallback inline de emergência
    if (this.contentHost) {
      this.contentHost.innerHTML = `
        <div id="page-content" class="page-content-wrapper default-fallback-page">
          <div class="fallback-card" style="background:#16222A; border:2px solid #69C4CE; border-radius:16px; padding:32px; text-align:center;">
            <h2 style="color:#69C4CE; font-size:28px;">Página Não Encontrada</h2>
            <p style="color:#EDF2EE; margin:16px 0;">Não foi possível carregar a rota solicitada (${failedUrl}).</p>
            <a href="/spa/sobre/" style="color:#061B2A; background:#B3CBDB; padding:8px 20px; border-radius:20px; text-decoration:none; font-weight:600;">Voltar para Sobre</a>
          </div>
        </div>
      `;
      this.currentPath = FALLBACK_URL;
      updateBreadcrumbsDOM(failedUrl, 'Página não encontrada');
    }
  }
}

// Instanciar e inicializar o roteador global da SPA
export const router = new SPARouter();

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => router.init());
  } else {
    router.init();
  }
}

// Endpoint GET para compatibilidade com file-based routing do Astro
export function GET() {
  return new Response(JSON.stringify({ module: 'router' }), {
    headers: { 'content-type': 'application/json' },
  });
}
