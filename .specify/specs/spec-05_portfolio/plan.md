# Implementation Plan: Estrutura e Estilização da Página "Portfólio" (`portfolio.astro`)

**Branch**: `spec-05_portfolio` | **Date**: 2026-11-17 | **Spec**: [spec.md](./spec.md) | **Contrato**: [contracts/ui-contracts.md](./contracts/ui-contracts.md)

**Input**: Feature specification from `.specify/specs/spec-05_portfolio/spec.md` (Updated 2026-11-16)

---

## Summary

Reimplementar a página "Portfólio" (`pages/portfolio/portfolio.astro`) como fragmento SPA injetável em `#page-content-host`, com cabeçalho sticky (título + barra `category_selection` com 7 `selection_button`), corpo rolável com 7 `category_section` e exatamente 3 `project_card` (1 em `bi-analytics`, 2 em `data-engineering`). Estilos em CSS3 puro isolado (`portfolio.css`) e comportamento em Vanilla JS (`portfolio.js`) idempotente, entregue ao cliente como `<script is:inline>` dentro do fragmento para que o roteador SPA o re-execute. Os arquivos de implementação anteriores foram removidos do working tree; este plano parte do zero, reaproveitando os padrões já estabelecidos no shell SPA (`pages/spa/`).

---

## Technical Context

**Language/Version**: Astro 5 (`astro@^5.0.0`, `srcDir: './'`), HTML5 semântico, CSS3 puro, JavaScript ES2020 (Vanilla).  
**Primary Dependencies**: Nenhuma além do Astro. Fontes via Google Fonts (`@import` no CSS da página).  
**Storage**: N/A — dados dos projetos/categorias declarados como arrays no frontmatter do `.astro`.  
**Testing**: `npm run build` (+ `npx astro check` se disponível) e roteiro manual na SPA (`npm run dev` → `/spa` → menu Portfólio).  
**Target Platform**: Navegadores evergreen; execução dentro do shell SPA e em modo isolado (`/spa/portfolio/`).  
**Project Type**: Submódulo de página de SPA Astro SSG.  
**Performance Goals**: Injeção < 150ms (SC-001); zero JS de framework; 1 script inline < 4 KB.  
**Constraints**: Paths absolutos POSIX `/pages/portfolio/...`; `#page-content-host` com `padding-top: 0` nesta página; header sticky sem cobrir `category_title` (offset `header.offsetHeight + 35px`, `scroll-margin-top: 185px`).  
**Scale/Scope**: 1 página, 7 categorias, 3 cards, 2 páginas de projeto (`AES1.html`, `pagina_teste.html`), 1 CSS, 1 JS.

---

## Constitution Check

| Princípio | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack** | Astro + CSS puro + Vanilla JS | Nenhuma lib nova. | **PASS** |
| **II. Estrutura / Isolamento** | Assets em `pages/portfolio/assets/{css,images,js}`; `pages/spa/portfolio.astro` importa CSS no frontmatter e expõe `#page-content` | JS mantido em `assets/js/portfolio.js` e injetado via `?raw` + `<script is:inline>` (ver D-06). | **PASS** |
| **II. Paths absolutos** | `/pages/portfolio/assets/images/...` | Todos os `src`/`href` internos absolutos. | **PASS** (ver R-01) |
| **III. Design** | CSS próprio da página | Tokens da Seção 3 da spec em `portfolio.css`. | **PASS** |
| **IV. Workflow** | Git + `gh` | Branch `spec-05_portfolio`. | **PASS** |
| **V. Nomenclatura** | `spec-NN_nome` em `.specify/specs/` | `spec-05_portfolio/`. | **PASS** |

**Ressalva constitucional**: `pages/portfolio/projetos/testes/pagina_teste.html` carrega Tailwind via CDN (`cdn.tailwindcss.com`), o que viola o Princípio I. Não é tocado por este plano (é conteúdo legado de teste), mas está registrado em **Complexity Tracking**.

---

## Divergências Spec × Contrato × Código — RESOLVIDAS (2026-11-17)

Conforme o protocolo do projeto (CLAUDE.md, "Sincronização"), as resoluções abaixo foram aprovadas e aplicadas em `spec.md` (§2.2, §2.3, §3.1, FR-002, FR-003.1, FR-003.4, FR-005.1) e em `contracts/ui-contracts.md`. As colunas "spec.md" e "contrato" descrevem o estado **anterior** à sincronização.

| # | Ponto | spec.md (antes) | contracts/ui-contracts.md / código (antes) | Resolução aplicada |
|---|---|---|---|---|
| D-01 | Atributo de título do fragmento | FR-002: `data-titulo_pagina="Portfólio"` | Contrato, `router.js` e `AES1.html` usam `data-page-title` | Usar **`data-page-title="Portfólio de Projetos"`** (é o que o roteador/breadcrumbs leem). Atualizar FR-002 e §2.2 da spec. |
| D-02 | Cor do `page_title` | `#000000` (§3.1, US1) | Contrato: "36px, branco" | **`#000000`** (spec). Corrigir o contrato. |
| D-03 | Folga do scroll | `header.offsetHeight + 35px` | Contrato e `router.scrollToAnchor()`: `+ 20px` | **`+ 35px`** nos dois lugares (inclui ajuste em `router.js`, ver M-03). Corrigir o contrato. |
| D-04 | Classes CSS | §3.1 usa `.selection_button.active` (snake) | Contrato e §3.6 usam kebab (`.selection-button`, `.category-section`, `.portfolio-header`) | **Kebab-case do contrato** para todas as classes; os nomes snake da §2.3 ficam como nomes lógicos. Ajustar §3.1 da spec. |
| D-05 | `IntersectionObserver` (scroll-spy) | Ausente na spec | Contrato §3.4 exige (`rootMargin: -160px 0px -40% 0px`) | **Incluir** (melhora US1) e registrar como FR-003.4 na spec. |
| D-06 | Localização do script | FR-003.1: `<script is:inline>` no fragmento | Constituição II: scripts em `assets/js/` | **Ambos**: fonte em `portfolio.js`, importado como `?raw` e emitido com `<script is:inline type="module" set:html={...}>`. Ver §Contratos/JS. |
| D-07 | Menu ativo em páginas de projeto | §2.2: `data-parent-route="/portfolio"` | `router.resolveParentMenu()` ignora esse atributo; `/portfolio/projetos/...` cai em `'sobre'` | Ajustar `router.js` para ler `data-parent-route` (M-03). Depende da spec-01. |

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-05_portfolio/
├── spec.md                 # Especificação (fonte de verdade)
├── plan.md                 # Este plano
├── contracts/
│   └── ui-contracts.md     # Contrato de seletores (atualizar após D-01..D-05)
└── tasks.md                # Gerado por /speckit.tasks (próximo passo)
```

### Source Code — arquivos a criar (C) / modificar (M)

```text
pages/
├── portfolio/
│   ├── portfolio.astro                (C) fragmento #page-content + dados no frontmatter
│   ├── assets/
│   │   ├── css/portfolio.css          (C) estilos isolados (escopo .portfolio-page-wrapper)
│   │   ├── images/
│   │   │   ├── projeto_CLA.avif       (existe)
│   │   │   └── projeto_pipeline1.avif (existe)
│   │   └── js/portfolio.js            (C) initPortfolioNavigation + export GET
│   └── projetos/
│       ├── AES1/AES1.html             (existe, já conforme: #page-content + data-parent-route)
│       └── testes/pagina_teste.html   (existe, sem #page-content → fallback <body> do roteador)
└── spa/
    ├── portfolio.astro                (C) wrapper: import CSS + <PortfolioContent />
    └── assets/
        ├── css/main-container.css     (sem mudança: regra :has(.portfolio-page-wrapper) já existe)
        └── js/router.js               (M) offset +35px; data-parent-route (D-03, D-07)
```

**Structure Decision**: Mesmo padrão de `pages/spa/contatos.astro` → `pages/contatos/contatos.astro`: o wrapper SPA importa o CSS no frontmatter (Constituição II) e renderiza o componente da página, que contém o `#page-content`.

---

## Contratos de Implementação

### C-1. `pages/spa/portfolio.astro`

```astro
---
import PortfolioContent from '../portfolio/portfolio.astro';
import '../portfolio/assets/css/portfolio.css';
---
<PortfolioContent />
```

### C-2. `pages/portfolio/portfolio.astro` — dados e marcação

Frontmatter declara os dados (sem props externas; a página é autossuficiente):

```ts
type Skill = { label: string; kind: 'HS' | 'SS' };
type Project = { name: string; resume: string; link: string; image: string; skills: Skill[] };
type Category = { id: string; title: string; projects: Project[] };
// categories: 7 itens na ordem da §2.4; projetos SOMENTE em 'bi-analytics' (1) e 'data-engineering' (2)
import portfolioScript from './assets/js/portfolio.js?raw';
```

Árvore DOM obrigatória:

```text
div#page-content.page-content-wrapper.portfolio-page-wrapper
    [data-page-id="portfolio"] [data-page-title="Portfólio de Projetos"]
├── header.portfolio-header
│   ├── h1.page-title                       "Portfólio de Projetos"
│   └── nav.category-selection[aria-label]
│       └── a.selection-button[href="#section-<id>"] ×7   (1º com .active)
├── main.portfolio-body
│   └── section.category-section#section-<id> ×7
│       ├── h2.category-section-title
│       └── div.project-grid                     (renderizado só se projects.length > 0)
│           └── article.project-card ×N
│               ├── a.project-image-wrap[href]   (interno → sem target; externo → target="_blank" rel="noopener noreferrer")
│               │   └── img.project-image[src absoluto][alt=name][loading="lazy"][width][height]
│               ├── div.project-content
│               │   ├── h3.project-name > a.project-link[href]   (mesma regra de target)
│               │   └── p.project-resume
│               └── div.habilities-list
│                   └── span.hability-tag-HS | span.hability-tag-SS
└── <script is:inline type="module" set:html={portfolioScript} />
```

Regras:
- Link externo detectado por `/^https?:\/\//` → `target="_blank"` (o roteador já faz bypass de `_blank` e de URLs externas — US3 cenário 3).
- Link interno (`/pages/portfolio/projetos/...`) **sem** `data-native` → interceptado pelo listener global do roteador; `normalizeFetchUrl` já remove `/pages/` e `.html` (FR-005 já atendido no código).
- O card é `article` (não `<a>` envolvendo tudo) para evitar `<a>` aninhado; a área clicável é imagem + título. `cursor: pointer` no `.project-image-wrap`.
- Não usar `data-spa-link="false"` (atributo sem efeito no roteador atual).

### C-3. `pages/portfolio/assets/css/portfolio.css` — seletores e tokens

| Seletor | Regras-chave |
|---|---|
| `@import` (topo) | Google Fonts: `Barlow Condensed:wght@600;700` e `Inter:wght@400;500` |
| `.portfolio-page-wrapper` | `min-height:100%; display:flex; flex-direction:column; background:linear-gradient(to bottom,#DAEBF2,#A8CCD9);` |
| `.portfolio-header` | `position:sticky; top:0; z-index:100;` fundo sólido/gradiente para não ficar transparente na rolagem |
| `.page-title` | `'Barlow Condensed'` 700, `36px`, `#000000` |
| `.category-selection` | `display:flex; flex-wrap:wrap; gap; background:linear-gradient(to bottom,#2C4855,#1E333D);` |
| `.selection-button` | `#FFFFFF`, `14px`, bg `rgba(255,255,255,.1)`, borda `rgba(255,255,255,.2)`, `text-decoration:none` |
| `.selection-button.active` | `#22D3EE`, `16px`, bg `rgba(34,211,238,.2)`, borda `#22D3EE`, `box-shadow:0 0 8px rgba(34,211,238,.4)` |
| `.category-section` | `scroll-margin-top:185px` |
| `.category-section-title` | `'Barlow Condensed'` 700, `24px`, `#1E333D` |
| `.project-grid` | `display:grid; grid-template-columns:repeat(2,1fr); gap:20px` |
| `.project-card` | gradiente `#FFEFBA→#FFFFFF`, `1px solid #0381B0`, `border-radius:12px`, `box-shadow:0 4px 8px rgba(0,0,0,.1)`, `overflow:hidden`; `:hover` → `translateY(-4px)` + sombra realçada |
| `.project-image-wrap` | `aspect-ratio:16/9; overflow:hidden; display:block; cursor:pointer` |
| `.project-image` | `width:100%; height:100%; object-fit:cover; transition:transform`; `.project-image-wrap:hover .project-image` → `scale(1.02)` |
| `.project-name` | `'Barlow Condensed'` 700, `18px`, `#000` |
| `.project-resume` | `'Inter'`, `14px`, `#333333`, clamp 3 linhas (`-webkit-line-clamp:3`) |
| `.hability-tag-HS` | `12px`, texto/borda `#386312`, bg `#E2F0D9` |
| `.hability-tag-SS` | `12px`, texto `#4B7725`, borda `#497225`, bg `#E2F0D9` |
| `@media (min-width:768px) and (max-width:1023px)` | `.project-grid { gap:16px }` |
| `@media (max-width:767px)` | `.project-grid { grid-template-columns:1fr; gap:12px }`; wrapper `padding:12px`; `.category-selection` com `overflow-x:auto` ou wrap; nenhum overflow horizontal global |

Escopo: nenhum seletor de elemento global (`body`, `h1`, `a`...) — tudo prefixado por classe da página (SC-004).

### C-4. `pages/portfolio/assets/js/portfolio.js` — lógica DOM/SPA

```js
function initPortfolioNavigation() { /* ver contrato abaixo */ }
// bootstrap
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPortfolioNavigation);
  else initPortfolioNavigation();
  window.addEventListener('pageshow', initPortfolioNavigation);
  window.addEventListener('spa:page-loaded', initPortfolioNavigation);
}
export function GET() { /* JSON { module: 'portfolio' } — .js sob pages/ vira endpoint Astro; mesmo padrão de router.js */ }
```

Contrato de `initPortfolioNavigation()`:
1. Retorna cedo se não houver `.portfolio-page-wrapper` no DOM.
2. Idempotência: guarda em `wrapper.dataset.listenerAttached === 'true'` (o wrapper é recriado a cada injeção, então o marcador zera naturalmente). Os listeners globais (`spa:page-loaded`, `pageshow`) são registrados uma única vez via flag `window.__portfolioNavBound`.
3. Clique em `.selection-button`: `preventDefault()` → move `.active` → calcula `offset = header.offsetHeight + 35` → rola `#page-content-host` (`hostEl.scrollTo`) ou `window.scrollTo` em modo isolado → `history.pushState(history.state, '', '#section-<id>')`.
4. `IntersectionObserver` (root = `#page-content-host` ou `null`; `rootMargin: '-160px 0px -40% 0px'`) atualiza `.active`; suspenso por ~600ms após um clique para não "brigar" com a rolagem suave. Observador anterior é desconectado na re-inicialização.
5. Hash inicial (`location.hash` começando com `#section-`) → aplica `.active` e rola após `requestAnimationFrame`.

Por que `type="module"`: o arquivo contém `export function GET()`; num `<script>` clássico isso seria `SyntaxError`. Módulos inline são re-executados a cada inserção feita por `router.executeIncomingScripts()` (que copia os atributos, incluindo `type`).

---

## Modificações em Módulos Compartilhados (spec-01 SPA)

| ID | Arquivo | Mudança | Justificativa |
|---|---|---|---|
| M-01 | `pages/spa/assets/css/main-container.css` | Nenhuma — `.page-content-host:has(.portfolio-page-wrapper)` já aplica `padding-top:0` | FR-003 já atendido |
| M-02 | `pages/spa/assets/js/router.js` → `normalizeFetchUrl` / `handlePopState` | Nenhuma — já remove `.html`/`/pages/` e trata popstate de mesmo pathname | FR-005, FR-003.2 já atendidos |
| M-03 | `pages/spa/assets/js/router.js` | (a) `scrollToAnchor`: `+20` → `+35`; (b) após injeção, se `#page-content[data-parent-route]` existir, usar seu segmento para `setActiveNavItem` | D-03, D-07 — requisito **FR-005.1** da spec-05 (a spec-01 não define offset nem `data-parent-route`, sem conflito) |

---

## Pontos de Atenção e Dependências

- **R-01 (build de produção, transversal a todas as páginas)**: com `srcDir: './'` e sem `public/`, os arquivos em `/pages/<modulo>/assets/images/` **não são copiados para `dist/`** (verificado: `npm run build` gera `dist/` sem a pasta `pages/`). Funcionam no `astro dev`, mas quebram no site estático publicado. O mesmo vale para `AES1.html`, que é servido como rota (`/portfolio/projetos/AES1/AES1/`). Correção (fora do escopo desta feature): emenda constitucional ou `publicDir`/cópia de assets. Recomendo tratar como feature transversal separada.
- **R-02**: `#page-content-host` tem `overflow-y:auto`; o header sticky depende de não haver `overflow` no `.portfolio-page-wrapper` (senão o sticky ancora no wrapper errado).
- **R-03**: O roteador remove `<link data-spa-dynamic>` a cada navegação. Para a página de projeto `AES1.html` funcionar, seus estilos devem estar no `<head>` (o roteador os clona) — já é o caso.
- **R-04**: `pagina_teste.html` não tem `#page-content`; o roteador injeta `doc.body` — atende o fallback da §2.2.3, mas sem metadados de breadcrumb.
- **Ordem de dependência**: `portfolio.css` → `portfolio.astro` (dados + marcação) → `portfolio.js` → `spa/portfolio.astro` → M-03 (`router.js`) → `npm run build` + roteiro manual.

---

## Validação (critérios de aceite → verificação)

| Critério | Verificação |
|---|---|
| SC-002 / FR-003.3 | 7 `.category-section`, exatamente 3 `.project-card` (`document.querySelectorAll('.project-card').length === 3`) |
| SC-003 / US1 | Clique em cada `.selection-button`: `.active` correto, `.category-section-title` visível abaixo do header, URL com hash, sem refetch de rota |
| US3 | Clique na capa do CLA → `AES1` injetado no host com `pushState`; capa do pipeline → nova aba |
| US4 | Viewport 375px: 1 coluna, sem scroll horizontal |
| SC-004 | `npm run build` sem erros |

---

## Complexity Tracking

| Violação / Desvio | Por que é necessário | Alternativa rejeitada |
|---|---|---|
| `pagina_teste.html` usa Tailwind CDN (Princípio I) | Conteúdo legado de teste, fora do escopo | Reescrever agora — não especificado; sugerido como limpeza futura |
| `export function GET()` em script client-side | `.js` sob `pages/` é tratado como endpoint pelo Astro; segue o padrão já adotado em `router.js` | Renomear com prefixo `_` — violaria nomes definidos na spec |
