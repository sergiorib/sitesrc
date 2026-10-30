# Contract: Roteador Client-Side Vanilla JS (`router.js`)

**Feature**: `01-pagina-spa`  
**Spec**: [spec.md](../spec.md)  
**Status**: Concluído

---

## 1. Visão Geral

O contrato do roteador define o comportamento operacional do script `router.js` em Vanilla JavaScript, isolado em `pages/spa/assets/js/router.js`. O roteador é responsável pela interceptação global de links, atualização assíncrona do contêiner único, manipulação do histórico e roteamento resiliente com fallback.

---

## 2. Assinatura da Interface Interna (`SPARouter`)

```javascript
/**
 * @typedef {Object} RouteOptions
 * @property {boolean} [pushState=true] - Se deve registrar uma nova entrada no window.history
 * @property {string} [parentKey] - Força uma chave de menu pai específica (opcional)
 */

interface SPARouter {
  /**
   * Inicializa o roteador, registra os listeners globais de clique e popstate,
   * e carrega a rota inicial padrão ("Sobre").
   */
  init(): void;

  /**
   * Navega programaticamente ou via evento para uma URL interna.
   * @param {string} targetUrl - Caminho relativo da página (ex: "/pages/sobre" ou "pages/portfolio/projeto-01")
   * @param {RouteOptions} [options]
   * @returns {Promise<boolean>} Retorna true em caso de sucesso ou false se acionado fallback
   */
  navigateTo(targetUrl: string, options?: RouteOptions): Promise<boolean>;

  /**
   * Realiza a requisição assíncrona, extrai o nó de conteúdo e injeta em #page-content-host.
   * @param {string} url - URL a ser buscada
   * @returns {Promise<DocumentFragment | HTMLElement>}
   */
  fetchPageContent(url: string): Promise<HTMLElement>;

  /**
   * Dispara a renderização graciosa da página de fallback (pages/spa/default.astro compilada).
   * @param {string} failedUrl - A URL que não pôde ser encontrada
   */
  loadFallback(failedUrl: string): Promise<void>;

  /**
   * Atualiza os Breadcrumbs com base na rota e na hierarquia de segmentos.
   * @param {string} url - Rota atual
   * @param {string} [title] - Título amigável opcional da página
   */
  updateBreadcrumbs(url: string, title?: string): void;

  /**
   * Sincroniza o estado visual da Sidebar (item ativo e ícone escuro/claro).
   * @param {string} activeMenuId - Identificador do menu ("sobre", "historico", etc.)
   */
  updateSidebarMenu(activeMenuId: string): void;
}
```

---

## 3. Contrato de Interceptação de Eventos (Event Delegation)

O listener deve ser registrado estritamente uma única vez no nó raiz do documento:

```javascript
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link) return;

  // Critérios de exclusão (não interceptar):
  // 1. Link sem href ou âncora interna (#)
  // 2. Link com atributo target="_blank"
  // 3. Link externo (protocolos http://, https://, mailto:, tel:)
  // 4. Link marcado com data-native
  if (shouldBypassRouter(link)) return;

  // Interceptar:
  event.preventDefault();
  const targetUrl = link.getAttribute('href');
  router.navigateTo(targetUrl);
});
```

---

## 4. Contrato de Sincronização do Histórico (`popstate`)

Ao receber o evento `popstate`:
1. Extrair `event.state` ou a rota atual de `window.location.pathname`.
2. Chamar `router.navigateTo(currentUrl, { pushState: false })` para atualizar o Main Container e o estado visual da Sidebar sem adicionar nova entrada redundante na pilha do histórico.

---

## 5. Contrato de Fallback 404 (`default.astro`)

Sempre que:
- `fetch(targetUrl)` retornar status HTTP `>= 400` (ex: 404 Not Found);
- Ocorrer erro de rede ou timeout;
- O HTML retornado não contiver o nó de conteúdo esperado;

O roteador DEVE:
1. Efetuar requisição para a rota compilada de fallback: `/pages/spa/default/` (ou carregar o fragmento estático de fallback correspondente a `pages/spa/default.astro`).
2. Injetar a mensagem amigável de "Página não encontrada" dentro de `#page-content-host`.
3. Atualizar a régua de Breadcrumbs para: `Início / Página não encontrada`.
4. Não provocar quebra de script nem desativar a interatividade da Sidebar.
