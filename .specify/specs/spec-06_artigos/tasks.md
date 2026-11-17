# Tasks: Estrutura e Estilização da Página "Artigos" (`artigos.astro`)

**Input**: Documentos de design em `.specify/specs/spec-06_artigos/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md)

**Status**: Implementado em 2026-11-17 (ver notas de validação ao final).

**Tests**: A spec não pede testes automatizados; a validação é feita por `npm run build` e pelo roteiro manual da Fase 5.

**Organization**: Fases em ordem de dependência (Estrutura/Assets → Markup Astro → Estilização CSS → Interatividade JS → Validação/Build). Cada tarefa indica a User Story atendida.

## Format: `[ID] [P?] [Story] Descrição — arquivo alvo`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependência pendente)
- **[Story]**: User Story da spec (US1 cabeçalho/grid/rodapé, US2 acordeão, US3 seleção de artigos, US4 responsivo)

---

## Fase 1: Estrutura e Assets

**Purpose**: Diretórios exigidos pela Constituição II e pela §2.1 da spec.

- [X] T001 Criar os diretórios `pages/artigos/assets/css/`, `pages/artigos/assets/js/` e `pages/artigos/assets/images/` — `pages/artigos/assets/`
- [X] T002 [P] Criar `.gitkeep` para versionar a pasta de imagens vazia — `pages/artigos/assets/images/.gitkeep`
- [X] T003 [P] Confirmar (sem alterar) que o conteúdo de metadados existe — `pages/artigos.md`

**Checkpoint**: Estrutura de diretórios presente.

---

## Fase 2: Markup Astro

**Purpose**: Fragmento SPA gerado a partir do catálogo de dados (contratos C-2/C-3 do plano).

- [X] T004 [US1] Declarar no frontmatter os tipos `Leaf`, `Subgroup`, `Group` e os arrays `leftColumn` (grupos 1–6, grupo 1 com `open: true`) e `rightColumn` (grupos 7–13), com os 42 `.leaf` e 4 subgrupos exatamente como na §2.4 — `pages/artigos/artigos.astro`
- [X] T005 [US1] Renderizar a raiz `div#page-content.page-content-wrapper.artigos-page` com `data-page-id="artigos"` e `data-page-title="Artigos técnicos"`, contendo `div.app` — `pages/artigos/artigos.astro`
- [X] T006 [US1] Renderizar `header` com `h1` "Artigos técnicos", `p.intro` "Seleciona o tema." e `div.rule` — `pages/artigos/artigos.astro`
- [X] T007 [US1] Renderizar `main.workspace > div.topic-columns` com 2 `div.column` mapeando `leftColumn` e `rightColumn` — `pages/artigos/artigos.astro`
- [X] T008 [US2] Renderizar cada `div.topic-group` (`.open` quando `open`) com `button.group-toggle[type=button][aria-expanded][aria-controls]` (`.group-icon[aria-hidden]`, `.group-name`, `.chevron` "›") e `div.group-children[id="artigos-group-<n>"]` — `pages/artigos/artigos.astro`
- [X] T009 [US2] Dentro de `.group-children`, renderizar primeiro a `.leaf-list` (se houver `leaves`) e depois cada `div.subgroup` com `button.subgroup-toggle` (`.subgroup-marker`, `.subgroup-name`, `.chevron`) e `div.subgroup-children[id="artigos-sub-<n>-<m>"] > .leaf-list` — `pages/artigos/artigos.astro`
- [X] T010 [US3] Renderizar cada `a.leaf[href="#"][data-url="/spa/artigos/<slug>"]` com `span.leaf-bullet` "•" + texto — `pages/artigos/artigos.astro`
- [X] T011 [US1] Renderizar `footer` com `p` "© 2026 — Portfólio de Dados" e `p.footer-motto` com os separadores `<span>/</span>` — `pages/artigos/artigos.astro`
- [X] T012 [P] Criar o wrapper SPA que importa `../artigos/assets/css/artigos.css` no frontmatter e renderiza `<ArtigosContent />` — `pages/spa/artigos.astro`

**Checkpoint**: `/spa/artigos/` mostra 13 grupos, 4 subgrupos e 42 links na marcação (sem estilo/JS).

---

## Fase 3: Estilização CSS

**Purpose**: Tokens da §3 e responsividade da §4, todos prefixados por `.artigos-page` (nenhuma regra em `body`/`html` ou em elementos soltos).

- [X] T013 [US1] Adicionar `@import` do Google Fonts (`Oswald` 500/600, `Roboto Condensed` 300/400/700) no topo e estilizar `.artigos-page` (radial-gradient `#102636→#070e14`, Roboto Condensed 15px/1.5, `#e2f1f8`) com `box-sizing:border-box` escopado — `pages/artigos/assets/css/artigos.css`
- [X] T014 [US1] Estilizar `.app` (`max-width:1200px`, centralizado, `padding:32px 36px`, `min-height:100%`, flex coluna) e `.workspace` (`flex:1`) — `pages/artigos/assets/css/artigos.css`
- [X] T015 [US1] Estilizar `header h1` (Oswald 600, `clamp(28px,3.5vw,40px)`, `#fff`, text-shadow ciano), `.intro` (`#88a9bc`, 300, `max-width:760px`) e `.rule` (1px, gradiente ciano, `margin-bottom:28px`) — `pages/artigos/assets/css/artigos.css`
- [X] T016 [US1] Estilizar `.topic-columns` (`repeat(2,minmax(0,1fr))`, `gap:16px`, `align-items:start`) e `.column` (flex coluna, `gap:16px`) — `pages/artigos/assets/css/artigos.css`
- [X] T017 [US2] Estilizar `.topic-group` (glassmorphism, borda `rgba(0,229,255,.25)`, raio 18px, sombra; hover borda `.45`; `.open` borda `#00e5ff` + glow) e `.group-toggle`, `.group-icon`, `.group-name`, `.chevron` (com `transition`) — `pages/artigos/assets/css/artigos.css`
- [X] T018 [US2] Estilizar a visibilidade e rotação: `.group-children`/`.subgroup-children` com `display:none`; `.topic-group.open > .group-children` e `.subgroup.open > .subgroup-children` com `display:block`; chevron `rotate(90deg)` + `#00e5ff` só no toggle filho direto (`>`) — `pages/artigos/assets/css/artigos.css`
- [X] T019 [US2] Estilizar `.group-children` (bg `rgba(4,12,18,.3)`, borda superior, `padding:6px 14px 14px 18px`), `.subgroup-toggle` (+ hover) e `.subgroup-children` (borda esquerda 2px ciano, margens) — `pages/artigos/assets/css/artigos.css`
- [X] T020 [US3] Estilizar `.leaf-list`, `.leaf` (pílula, `#b0d3e5`, 14px), `.leaf-bullet`, `.leaf:hover` (`translateX(3px)`, borda `#00e5ff`, texto `#fff`), `.leaf.selected` (`#dbeaf0`, borda `#fff`, `#091a24` 700, glow) e `.check-mark` (`margin-left:auto`) — `pages/artigos/assets/css/artigos.css`
- [X] T021 [US1] Estilizar `footer` (borda superior, `margin-top:48px`, flex `space-between`), `footer p` (`#88a9bc`, 12px) e `.footer-motto span` (`#00e5ff`, bold) — `pages/artigos/assets/css/artigos.css`
- [X] T022 [US4] Adicionar breakpoints: `<=850px` → `.app{padding:24px 20px}`, `.topic-columns{1fr}`; `<=540px` → `footer` em coluna (`gap:12px`, `align-items:flex-start`); garantir que o hover do `.leaf` não cause scroll horizontal — `pages/artigos/assets/css/artigos.css`

**Checkpoint**: Visual conforme §3/§4 e sidebar/breadcrumbs inalterados com Artigos ativa.

---

## Fase 4: Interatividade JS

**Purpose**: Contrato C-5 do plano e FR-003.x da spec.

- [X] T023 [US2] Implementar `initArtigosPage()` com retorno antecipado sem `.artigos-page` e listeners em `.group-toggle, .subgroup-toggle` (idempotentes via `dataset.listenerAttached`): `stopPropagation()`, alterna `.open` no pai e sincroniza `aria-expanded` — `pages/artigos/assets/js/artigos.js`
- [X] T024 [US3] Implementar o clique em `.leaf` (idempotente): `preventDefault()`, limpar `.selected`/`.check-mark` dos demais, aplicar `.selected` + `<span class="check-mark">✓</span>` e, após 150ms, criar `<a href=data-url>` temporário e acionar `.click()` para o roteador SPA interceptar — `pages/artigos/assets/js/artigos.js`
- [X] T025 [US2] Implementar o bootstrap (`DOMContentLoaded`/execução imediata e `spa:page-loaded` registrado uma única vez via `window.__artigosBound`) e `export function GET()` retornando `{ module: 'artigos' }` — `pages/artigos/assets/js/artigos.js`
- [X] T026 [US2] Importar o script como `?raw` e emitir `<script is:inline type="module" set:html={artigosScript} />` dentro de `#page-content` — `pages/artigos/artigos.astro`

**Checkpoint**: Acordeão e seleção funcionando na SPA e em modo isolado.

---

## Fase 5: Validação e Build

- [X] T027 Executar `npm run build` (e `npx astro check`, se disponível) sem erros — raiz do projeto
- [X] T028 [US1] Na SPA (`npm run dev` → `/spa` → Artigos), verificar cabeçalho, 2 colunas (grupos 1–6 / 7–13) e rodapé com lema (US1) — `/spa/artigos/`
- [X] T029 [US2] Verificar via console: 13 `.topic-group`, 4 `.subgroup`, 42 `.leaf`, apenas o grupo 1 com `.open` (SC-002) — `/spa/artigos/`
- [X] T030 [US2] Navegar Artigos → Sobre → Artigos 3× e confirmar que cada clique em `.group-toggle`/`.subgroup-toggle` alterna uma única vez e atualiza `aria-expanded` e o chevron (SC-003) — `/spa/artigos/`
- [X] T031 [US3] Clicar em um `.leaf`: `.selected` + `✓` visíveis, navegação SPA após 150ms sem requisição de documento na aba Network (fallback 404 da SPA enquanto a rota não existir) — `/spa/artigos/`
- [X] T032 [US4] Viewport 820px → 1 coluna; 500px → rodapé empilhado; sem scroll horizontal — `/spa/artigos/`
- [X] T033 Confirmar que, com Artigos ativa, a sidebar e os breadcrumbs mantêm fonte e cores (SC-004, sem vazamento de CSS) — `/spa/artigos/`

---

## Dependências e Execução

- Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5.
- T002, T003 e T012 são independentes ([P]); as tarefas de CSS (Fase 3) podem ser feitas em paralelo à Fase 4 depois que a marcação existir, pois ficam em arquivos diferentes.
- T026 depende de T023–T025.
- **MVP**: Fases 1–3 + T023, T025, T026 entregam US1, US2 e US4; T024 completa US3.
- Nenhuma alteração em `router.js`, `nav.js`, `breadcrumbs.js` ou `main-container.css` é necessária.
- **Pendência conhecida** (plano, R-02): as 42 rotas `/spa/artigos/<slug>` ainda não existem.

---

## Notas de Validação (2026-11-17)

- `npm run build`: sem erros (13 `.topic-group`, 4 `.subgroup`, 42 `.leaf`, 1 grupo aberto no HTML gerado). `npx astro check` não executado (`@astrojs/check` não instalado).
- SPA (desktop): cabeçalho em Oswald, 2 colunas, menu "Artigos" ativo; sidebar mantém fonte e cor (sem vazamento de CSS).
- US2: grupo e subgrupo alternam `.open`/`aria-expanded` uma única vez por clique após 3 ciclos Artigos ↔ Sobre; chevron gira 90° em `#00e5ff` só no grupo aberto.
- US3: `.leaf` recebe `.selected` (`#dbeaf0`/`#091a24`) + `✓`; navegação via roteador sem reload, fallback 404 da SPA dentro do host (rotas ainda inexistentes), `history.back()` restaura a página. Corrigido durante a validação: cliques rápidos agora cancelam a navegação pendente (FR-003.2 atualizado).
- US4: 820px → 1 coluna e `padding: 24px 20px`; 500px → rodapé em coluna; sem scroll horizontal.
- Console: apenas os 404 esperados das rotas `/spa/artigos/<slug>`.
