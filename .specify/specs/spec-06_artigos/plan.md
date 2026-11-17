# Implementation Plan: Estrutura e Estilização da Página "Artigos" (`artigos.astro`)

**Branch**: `spec-06_artigos` | **Date**: 2026-11-17 | **Spec**: [spec.md](./spec.md) | **Contrato**: [contracts/ui-contracts.md](./contracts/ui-contracts.md)

**Input**: Feature specification from `.specify/specs/spec-06_artigos/spec.md` (Updated 2026-11-17)

---

## Summary

Reimplementar a página "Artigos técnicos" (`pages/artigos/artigos.astro`) como fragmento SPA injetável em `#page-content-host`: cabeçalho (título, `.intro`, `.rule`), grade de 2 colunas (`.topic-columns`) com 13 `.topic-group` em acordeão (4 `.subgroup` aninhados) e links finais `.leaf` com feedback de seleção (`.selected` + `✓`) e navegação para `data-url` após 150ms, seguido de rodapé com lema. Estética Dark Tech (glassmorphism ciano) em CSS3 puro isolado e comportamento em Vanilla JS idempotente. Os arquivos anteriores foram removidos do working tree; o plano parte do zero, corrigindo dois defeitos do desenho anterior (JS que nunca chegava ao navegador e estilos em `body` vazando para o shell).

---

## Technical Context

**Language/Version**: Astro 5 (`srcDir: './'`), HTML5 semântico, CSS3 puro, JavaScript ES2020 (Vanilla).  
**Primary Dependencies**: Nenhuma além do Astro. Fontes Google `Oswald` (500, 600) e `Roboto Condensed` (300, 400, 700) via `@import` no CSS da página.  
**Storage**: N/A — catálogo declarado como array no frontmatter do `.astro`.  
**Testing**: `npm run build` (+ `npx astro check`) e roteiro manual na SPA.  
**Target Platform**: Navegadores evergreen; shell SPA e modo isolado (`/spa/artigos/`).  
**Project Type**: Submódulo de página de SPA Astro SSG.  
**Performance Goals**: Injeção < 150ms (SC-001); 1 script inline < 3 KB.  
**Constraints**: Breakpoints `850px` / `540px`; Grupo 1 aberto por padrão; idempotência de listeners após N navegações SPA.  
**Scale/Scope**: 1 página, 13 grupos, 4 subgrupos, 42 links `.leaf`, 1 CSS, 1 JS.

---

## Constitution Check

| Princípio | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack** | Astro + CSS puro + Vanilla JS | Nenhuma lib nova. | **PASS** |
| **II. Estrutura / Isolamento** | Assets em `pages/artigos/assets/`; `pages/spa/artigos.astro` importa CSS no frontmatter e expõe `#page-content` | Wrapper SPA fino + componente; JS em `assets/js/artigos.js`, emitido via `?raw` + `<script is:inline>` (D-03). | **PASS** |
| **II. Paths absolutos** | `/pages/artigos/assets/images/...` | Página não usa imagens (ícones são glifos Unicode); pasta `images/` criada vazia (`.gitkeep`). | **PASS** |
| **III. Design** | CSS próprio | Tokens da §3 da spec, escopados em `.artigos-page` (D-05). | **PASS** |
| **IV. Workflow** | Git + `gh` | Branch `spec-06_artigos`. | **PASS** |
| **V. Nomenclatura** | `spec-NN_nome` | `spec-06_artigos/`. | **PASS** |

---

## Divergências Spec × Contrato × Código — RESOLVIDAS (2026-11-17)

As resoluções abaixo foram aprovadas e aplicadas em `spec.md` (§2.1, §2.2, §2.4, §3.1, §3.6, US2, US3, FR-001 a FR-003.3, SC-002, SC-004) e o contrato `contracts/ui-contracts.md` foi reescrito. As colunas "spec.md" e "contrato" descrevem o estado **anterior** à sincronização.

| # | Ponto | spec.md (antes) | Contrato / realidade técnica (antes) | Resolução aplicada |
|---|---|---|---|---|
| D-01 | Quantidade de artigos | §2.4, FR-003.3, SC-002, US2: "35 links `.leaf`" | A árvore da própria §2.4 contém **42** `.leaf` (coluna esquerda 25, direita 17) | Manter a árvore (42 itens) e **corrigir o número para 42** na spec. |
| D-02 | Classes e estrutura | `.app`, `main.workspace`, `header` sem classe, `.group-icon`/`.group-name`/`.group-children`, `footer` com `p`/`p.footer-motto`, chevron `›`, raiz com `class="page-content-wrapper"` | Contrato: `.artigos-header`, `h1.title`, `.group-title`, `.group-content`, `.artigos-footer`, `.copyright`, `.accent`, chevron `▶`, sem `.app`/`.workspace` | **Seguir a spec** (mais recente e completa). **Reescrever o contrato** para refletir a §2.3/§2.4. Adicionar apenas a classe de escopo `.artigos-page` (D-05). |
| D-03 | Carregamento do JS | §2.2.2/FR-003.1: `artigos.js` importado no **frontmatter** do `.astro` | Import no frontmatter executa o módulo **no build (Node)** — o código nunca é enviado ao navegador; o acordeão fica inerte. Scripts `<script>` hoisted também não são re-executados pelo roteador (ele só executa scripts dentro de `#page-content`) | `import artigosScript from './assets/js/artigos.js?raw'` + `<script is:inline type="module" set:html={artigosScript} />` dentro de `#page-content`. Atualizar §2.2.2 e FR-003.1. |
| D-04 | Navegação do `.leaf` | FR-003.2: `window.location.href = data-url` | Isso faz **full page reload** (contradiz FR-002/SC-001), e as rotas `/spa/artigos/<slug>` não existem → 404 estático fora do shell | Após 150ms, criar `<a href=data-url>` temporário e disparar `.click()`: o listener global do roteador intercepta, navega via SPA e, se a rota não existir, exibe o fallback `default.astro` dentro do host. Atualizar FR-003.2. |
| D-05 | Estilos em `body` | §3.1 aplica `background`, `font-family`, `color` em `body` | No SPA, o CSS da página é clonado no `<head>` do shell: regras em `body` alterariam fonte/cor da sidebar enquanto Artigos estiver ativa (viola SC-004 "sem vazamento") | Aplicar os mesmos tokens em **`#page-content.artigos-page`** (ou `.page-content-wrapper[data-page-id="artigos"]`). Atualizar §3.1 (seletor). |
| D-06 | `.app { min-height: 100vh }` | §3.6 | Dentro do `#page-content-host` (altura = viewport − breadcrumbs) gera rolagem extra permanente | Usar `min-height: 100%`. Ajuste textual na §3.6. |
| D-07 | `pages/spa/artigos.astro` | §2.1 lista o arquivo | Versão anterior duplicava as ~300 linhas do componente | Wrapper fino (padrão `spa/contatos.astro`). |

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-06_artigos/
├── spec.md                 # Especificação (fonte de verdade)
├── plan.md                 # Este plano
├── contracts/
│   └── ui-contracts.md     # Reescrever após D-02
└── tasks.md                # Gerado por /speckit.tasks (próximo passo)
```

### Source Code — arquivos a criar (C) / modificar (M)

```text
pages/
├── artigos.md                         (existe; sem mudança)
├── artigos/
│   ├── artigos.astro                  (C) fragmento #page-content + catálogo no frontmatter
│   └── assets/
│       ├── css/artigos.css            (C) estilos isolados (escopo .artigos-page)
│       ├── images/.gitkeep            (C) pasta exigida pela constituição
│       └── js/artigos.js              (C) initArtigosPage + export GET
└── spa/
    └── artigos.astro                  (C) wrapper: import CSS + <ArtigosContent />
```

Nenhuma alteração em `router.js`, `nav.js`, `breadcrumbs.js` ou `main-container.css`: `ROUTE_PARENT_MAP` já mapeia `/spa/artigos` e o regex de `resolveParentMenu` cobre `/spa/artigos/<slug>`; `breadcrumbs.js` já rotula `artigos`.

**Structure Decision**: Padrão `pages/spa/contatos.astro` → componente da página. O catálogo vira dado (frontmatter) e a marcação é gerada por `map`, eliminando ~250 linhas repetidas e garantindo fidelidade à §2.4 por construção.

---

## Contratos de Implementação

### C-1. `pages/spa/artigos.astro`

```astro
---
import ArtigosContent from '../artigos/artigos.astro';
import '../artigos/assets/css/artigos.css';
---
<ArtigosContent />
```

### C-2. `pages/artigos/artigos.astro` — modelo de dados

```ts
type Leaf = { text: string; slug: string };                 // data-url = `/spa/artigos/${slug}`
type Subgroup = { name: string; leaves: Leaf[] };
type Group = { icon: string; name: string; open?: boolean; leaves?: Leaf[]; subgroups?: Subgroup[] };
const leftColumn: Group[];   // grupos 1–6 (grupo 1 com open: true)
const rightColumn: Group[];  // grupos 7–13
import artigosScript from './assets/js/artigos.js?raw';
```

Ordem de renderização dentro de `.group-children`: primeiro `.leaf-list` (se houver `leaves`), depois os `.subgroup` (caso Deep Learning da §2.4).

### C-3. Árvore DOM obrigatória

```text
div#page-content.page-content-wrapper.artigos-page
    [data-page-id="artigos"] [data-page-title="Artigos técnicos"]
└── div.app
    ├── header
    │   ├── h1                         "Artigos técnicos"
    │   ├── p.intro                    "Seleciona o tema."
    │   └── div.rule
    ├── main.workspace
    │   └── div.topic-columns
    │       └── div.column ×2
    │           └── div.topic-group[.open] ×N
    │               ├── button.group-toggle[type=button][aria-expanded][aria-controls]
    │               │   ├── span.group-icon[aria-hidden]
    │               │   ├── span.group-name
    │               │   └── span.chevron[aria-hidden]   "›"
    │               └── div.group-children[id]
    │                   ├── div.leaf-list > a.leaf[href="#"][data-url] > span.leaf-bullet "•" + texto
    │                   └── div.subgroup
    │                       ├── button.subgroup-toggle[type=button][aria-expanded][aria-controls]
    │                       │   ├── span.subgroup-marker "›"
    │                       │   ├── span.subgroup-name
    │                       │   └── span.chevron "›"
    │                       └── div.subgroup-children[id] > div.leaf-list > a.leaf ...
    ├── footer
    │   ├── p                          "© 2026 — Portfólio de Dados"
    │   └── p.footer-motto             ANALISAR <span>/</span> CONSTRUIR <span>/</span> EVOLUIR
    └── <script is:inline type="module" set:html={artigosScript} />
```

`aria-controls`/`id` são acréscimos de acessibilidade não conflitantes (ids `artigos-group-<n>` / `artigos-sub-<n>-<m>`).

### C-4. `pages/artigos/assets/css/artigos.css`

| Seletor | Regras-chave (§3 da spec) |
|---|---|
| `@import` (topo) | `Oswald:wght@500;600` + `Roboto+Condensed:wght@300;400;700` |
| `.artigos-page` | radial-gradient `#102636→#070e14`, `'Roboto Condensed'`, `15px/1.5`, `#e2f1f8`; `*, *::before, *::after { box-sizing:border-box }` escopado |
| `.artigos-page .app` | `width:100%; max-width:1200px; margin:0 auto; padding:32px 36px; min-height:100%; display:flex; flex-direction:column` |
| `.artigos-page header h1` | `'Oswald'` 600, `clamp(28px,3.5vw,40px)`, `#fff`, `text-shadow:0 0 12px rgba(0,229,255,.2)` |
| `.intro` / `.rule` | conforme §3.1 |
| `.workspace` | `flex:1` |
| `.topic-columns` | `grid; repeat(2,minmax(0,1fr)); gap:16px; align-items:start` |
| `.column` | `flex column; gap:16px` |
| `.topic-group` | `rgba(10,25,38,.75)`, `backdrop-filter:blur(8px)` (+ `-webkit-`), borda `rgba(0,229,255,.25)`, `radius:18px`, sombra; `:hover` borda `.45`; `.open` borda `#00e5ff` + glow |
| `.group-toggle` | `width:100%; min-height:54px; padding:14px 18px; display:flex; align-items:center; gap; background:none; border:0; cursor:pointer; color:inherit; font:inherit` |
| `.group-icon` / `.group-name` / `.chevron` | conforme §3.1; `.chevron{margin-left:auto; transition:transform .2s}` |
| `.topic-group.open > .group-toggle .chevron`, `.subgroup.open > .subgroup-toggle .chevron` | `rotate(90deg)`, `#00e5ff` (seletor com `>` para não girar chevrons de subgrupos fechados) |
| `.group-children` / `.subgroup-children` | `display:none`; `.topic-group.open > .group-children`, `.subgroup.open > .subgroup-children` → `display:block` |
| `.subgroup-toggle` (+ `:hover`) | pílula `50px`, conforme §3.1/§3.5 |
| `.leaf-list` | `flex column` |
| `.leaf` (+ `:hover`, `.selected`) | conforme §3.1/§3.5; `.leaf.selected .leaf-bullet{color:#091a24}`; `.check-mark{margin-left:auto;font-weight:bold}` |
| `footer`, `.footer-motto span` | conforme §3.1; `display:flex; justify-content:space-between` |
| `@media (max-width:850px)` | `.app{padding:24px 20px}`; `.topic-columns{grid-template-columns:1fr}` |
| `@media (max-width:540px)` | `footer{flex-direction:column; gap:12px; align-items:flex-start}` |

Todas as regras prefixadas por `.artigos-page` — nenhum seletor global (`body`, `header`, `footer` soltos).

### C-5. `pages/artigos/assets/js/artigos.js`

```js
function initArtigosPage() { /* contrato abaixo */ }
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initArtigosPage);
  else initArtigosPage();
  if (!window.__artigosBound) { window.__artigosBound = true; window.addEventListener('spa:page-loaded', initArtigosPage); }
}
export function GET() { return new Response(JSON.stringify({ module: 'artigos' }), { headers: { 'content-type': 'application/json' } }); }
```

Contrato de `initArtigosPage()`:
1. Retorna cedo se `.artigos-page` não existir.
2. `.group-toggle, .subgroup-toggle` sem `dataset.listenerAttached` → marca `'true'` e registra `click`: `e.stopPropagation()`, alterna `.open` em `toggle.parentElement`, sincroniza `aria-expanded`.
3. `.leaf` sem marcador → `click`: `e.preventDefault()`; remove `.selected` e `.check-mark` de todos os `.leaf` da página; aplica `.selected` + `<span class="check-mark">✓</span>`; após `150ms` navega para `data-url` pelo roteador (D-04: âncora temporária + `.click()`; em modo isolado sem roteador, o clique segue a navegação nativa).

`type="module"` é necessário por causa do `export function GET()` (num script clássico seria `SyntaxError`); `router.executeIncomingScripts()` preserva o atributo `type`.

---

## Pontos de Atenção e Dependências

- **R-01 (transversal)**: assets em `/pages/<modulo>/assets/...` não vão para `dist/` no build atual (não afeta esta página, que não usa imagens). Ver o mesmo item no plano da spec-05.
- **R-02**: As 42 rotas `/spa/artigos/<slug>` ainda não existem. Com D-04, o usuário verá o fallback 404 da SPA dentro do shell — comportamento aceitável até as subpáginas serem especificadas.
- **R-03**: `backdrop-filter` só tem efeito sobre o fundo radial do `.artigos-page`; no Firefox antigo degrada para fundo semitransparente (aceitável).
- **R-04**: O `:hover` com `translateX(3px)` em `.leaf` precisa de `overflow-x` controlado nos contêineres para não gerar scroll horizontal no mobile.
- **Ordem de dependência**: `artigos.css` → `artigos.astro` (catálogo + marcação) → `artigos.js` → `spa/artigos.astro` → `npm run build` + roteiro manual.

---

## Validação (critérios de aceite → verificação)

| Critério | Verificação |
|---|---|
| SC-002 | 13 `.topic-group`, 4 `.subgroup`, 42 `.leaf`; só o grupo 1 com `.open` |
| SC-003 | Navegar Sobre → Artigos → Sobre → Artigos 3×; um clique em `.group-toggle` alterna apenas uma vez (sem listeners duplicados) |
| US3 | Clique em `.leaf`: `.selected` + `✓` visíveis, navegação SPA após 150ms (sem reload; checar aba Network: nenhuma requisição `document`) |
| US4 | 820px → 1 coluna; 500px → rodapé empilhado; sem scroll horizontal |
| SC-004 | Sidebar mantém fonte/cores com Artigos ativa; `npm run build` sem erros |

---

## Complexity Tracking

| Violação / Desvio | Por que é necessário | Alternativa rejeitada |
|---|---|---|
| `export function GET()` em script client-side | `.js` sob `pages/` é tratado como endpoint pelo Astro; mesmo padrão de `router.js` | Renomear com prefixo `_` — violaria nomes definidos na spec |
