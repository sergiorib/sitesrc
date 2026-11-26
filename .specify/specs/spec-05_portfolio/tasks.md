# Tasks: Estrutura e Estilização da Página "Portfólio" (`portfolio.astro`)

**Input**: Documentos de design em `.specify/specs/spec-05_portfolio/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md)

**Status**: Implementado em 2026-11-17 (ver notas de validação ao final).

**Tests**: A spec não pede testes automatizados; a validação é feita por `npm run build` e pelo roteiro manual da Fase 6.

**Organization**: Fases em ordem de dependência (Estrutura/Assets → Markup Astro → Estilização CSS → Interatividade JS → Validação/Build). Cada tarefa indica a User Story atendida.

## Format: `[ID] [P?] [Story] Descrição — arquivo alvo`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependência pendente)
- **[Story]**: User Story da spec (US1 cabeçalho/navegação, US2 grids/categorias, US3 navegação SPA de projetos, US4 mobile)

---

## Fase 1: Estrutura e Assets

**Purpose**: Garantir diretórios e arquivos físicos exigidos pela Constituição II e pela §2.1 da spec.

- [X] T001 Criar os diretórios `pages/portfolio/assets/css/` e `pages/portfolio/assets/js/` (se ausentes) — `pages/portfolio/assets/`
- [X] T002 [P] Confirmar a existência física de `projeto_CLA.avif` e `projeto_pipeline1.avif` — `pages/portfolio/assets/images/`
- [X] T003 [P] [US3] Confirmar que `AES1.html` expõe `#page-content` com `data-page-id="portfolio-project-aes1"`, `data-page-title` e `data-parent-route="/portfolio"` (sem alteração esperada) — `pages/portfolio/projetos/AES1/AES1.html`
- [X] T004 [P] [US3] Confirmar que `pagina_teste.html` é carregável pelo fallback `<body>` do roteador (sem alteração; registrar o uso de Tailwind CDN como pendência constitucional) — `pages/portfolio/projetos/testes/pagina_teste.html`

**Checkpoint**: Estrutura e assets presentes.

---

## Fase 2: Markup Astro

**Purpose**: Fragmento SPA com dados declarados no frontmatter e árvore DOM do contrato C-2.

- [X] T005 [US2] Declarar no frontmatter os tipos `Skill`, `Project`, `Category` e o array `categories` com as 7 categorias na ordem da §2.4 (projetos só em `bi-analytics` (1) e `data-engineering` (2), paths absolutos POSIX) — `pages/portfolio/portfolio.astro`
- [X] T006 [US1] Renderizar a raiz `div#page-content.page-content-wrapper.portfolio-page-wrapper` com `data-page-id="portfolio"` e `data-page-title="Portfólio de Projetos"` — `pages/portfolio/portfolio.astro`
- [X] T007 [US1] Renderizar `header.portfolio-header` com `h1.page-title` e `nav.category-selection[aria-label]` contendo 7 `a.selection-button[href="#section-<id>"]` (primeiro com `.active`), sem `data-spa-link` — `pages/portfolio/portfolio.astro`
- [X] T008 [US2] Renderizar `main.portfolio-body` com 7 `section.category-section#section-<id>` + `h2.category-section-title`, gerando `div.project-grid` apenas quando `projects.length > 0` — `pages/portfolio/portfolio.astro`
- [X] T009 [US2] Renderizar cada `article.project-card` com `.project-image-wrap` (link) > `img.project-image[alt][loading="lazy"][width][height]`, `.project-content` > `h3.project-name > a.project-link` + `p.project-resume`, e `.habilities-list` com `span.hability-tag-HS`/`span.hability-tag-SS` — `pages/portfolio/portfolio.astro`
- [X] T010 [US3] Aplicar a regra de links: `href` iniciado por `https://` recebe `target="_blank" rel="noopener noreferrer"`; links internos ficam sem `target` para o roteador interceptar — `pages/portfolio/portfolio.astro`
- [X] T011 [P] Criar o wrapper SPA que importa `../portfolio/assets/css/portfolio.css` no frontmatter e renderiza `<PortfolioContent />` — `pages/spa/portfolio.astro`

**Checkpoint**: Página renderiza estrutura completa (sem estilo/JS) em `/spa/portfolio/`.

---

## Fase 3: Estilização CSS

**Purpose**: Tokens da §3 e responsividade da §4, todos escopados por classes da página (SC-004).

- [X] T012 [US1] Adicionar `@import` do Google Fonts (`Barlow Condensed` 600/700, `Inter` 400/500) no topo e estilizar `.portfolio-page-wrapper` (gradiente `#DAEBF2→#A8CCD9`, `min-height:100%`, flex coluna, sem `overflow`) — `pages/portfolio/assets/css/portfolio.css`
- [X] T013 [US1] Estilizar `.portfolio-header` (`position:sticky; top:0; z-index:100`, fundo opaco), `.page-title` (Barlow 700, 36px, `#000000`) e `.category-selection` (gradiente `#2C4855→#1E333D`, flex wrap) — `pages/portfolio/assets/css/portfolio.css`
- [X] T014 [US1] Estilizar `.selection-button` (padrão translúcido, 14px, `text-decoration:none`) e `.selection-button.active` (`#22D3EE`, 16px, bg `rgba(34,211,238,.2)`, glow `0 0 8px rgba(34,211,238,.4)`) — `pages/portfolio/assets/css/portfolio.css`
- [X] T015 [US2] Estilizar `.category-section` (`scroll-margin-top:185px`) e `.category-section-title` (Barlow 700, 24px, `#1E333D`) — `pages/portfolio/assets/css/portfolio.css`
- [X] T016 [US2] Estilizar `.project-grid` (`grid; repeat(2,1fr); gap:20px`) e `.project-card` (gradiente `#FFEFBA→#FFFFFF`, borda `#0381B0`, raio 12px, sombra; hover `translateY(-4px)` + sombra realçada) — `pages/portfolio/assets/css/portfolio.css`
- [X] T017 [US2] Estilizar `.project-image-wrap` (`aspect-ratio:16/9`, `overflow:hidden`, `cursor:pointer`), `.project-image` (`object-fit:cover`, hover `scale(1.02)`), `.project-name`, `.project-link`, `.project-resume` (Inter 14px `#333`, clamp 3 linhas) — `pages/portfolio/assets/css/portfolio.css`
- [X] T018 [US2] Estilizar `.habilities-list`, `.hability-tag-HS` (`#386312` / bg `#E2F0D9`) e `.hability-tag-SS` (texto `#4B7725`, borda `#497225`) — `pages/portfolio/assets/css/portfolio.css`
- [X] T019 [US4] Adicionar breakpoints: `768–1023px` → `gap:16px`; `<768px` → `1fr`, `gap:12px`, padding 12px, `.category-selection` com wrap/scroll horizontal interno e sem overflow global — `pages/portfolio/assets/css/portfolio.css`
- [X] T020 [P] [US1] Confirmar (sem alterar) que `.page-content-host:has(.portfolio-page-wrapper)` aplica `padding-top:0` e mantém laterais de 40px — `pages/spa/assets/css/main-container.css`

**Checkpoint**: Visual conforme §3/§4 em desktop, tablet e mobile.

---

## Fase 4: Interatividade JS

**Purpose**: Contrato C-4 do plano e FR-003.x da spec.

- [X] T021 [US1] Implementar `initPortfolioNavigation()` com retorno antecipado sem `.portfolio-page-wrapper` e idempotência via `wrapper.dataset.listenerAttached` — `pages/portfolio/assets/js/portfolio.js`
- [X] T022 [US1] Implementar o clique em `.selection-button`: `preventDefault()`, troca de `.active`, rolagem suave em `#page-content-host` (ou `window` em modo isolado) com offset `header.offsetHeight + 35`, e `history.pushState(history.state, '', '#section-<id>')` — `pages/portfolio/assets/js/portfolio.js`
- [X] T023 [US1] Implementar o scroll-spy com `IntersectionObserver` (`rootMargin: -160px 0px -40% 0px`), suspenso ~600ms após clique e desconectado/recriado a cada re-inicialização (FR-003.4) — `pages/portfolio/assets/js/portfolio.js`
- [X] T024 [US1] Tratar o hash inicial (`#section-*`): aplicar `.active` e rolar após `requestAnimationFrame` — `pages/portfolio/assets/js/portfolio.js`
- [X] T025 [US1] Implementar o bootstrap (`DOMContentLoaded`/execução imediata, `pageshow`, `spa:page-loaded` registrados uma única vez via `window.__portfolioNavBound`) e `export function GET()` retornando `{ module: 'portfolio' }` — `pages/portfolio/assets/js/portfolio.js`
- [X] T026 [US1] Importar o script como `?raw` e emitir `<script is:inline type="module" set:html={portfolioScript} />` dentro de `#page-content` — `pages/portfolio/portfolio.astro`
- [X] T027 [US1] Ajustar `scrollToAnchor()` para usar folga `+35` em vez de `+20` (FR-005.1a) — `pages/spa/assets/js/router.js`
- [X] T028 [US3] Após injetar o fragmento em `navigateTo()`, se `#page-content[data-parent-route]` existir, usar seu segmento para `setActiveNavItem()` (FR-005.1b) — `pages/spa/assets/js/router.js`

**Checkpoint**: Navegação por categorias, scroll-spy e menu ativo em páginas de projeto funcionando.

---

## Fase 5: Validação e Build

- [X] T029 Executar `npm run build` (e `npx astro check`, se disponível) sem erros — raiz do projeto
- [X] T030 [US2] Na SPA (`npm run dev` → `/spa` → Portfólio), verificar 7 `.category-section` e exatamente 3 `.project-card` (SC-002) — `/spa/portfolio/`
- [X] T031 [US1] Clicar em cada `.selection-button` e verificar `.active`, título da categoria visível abaixo do header, hash na URL, sem refetch de rota e sem volta ao topo; repetir em modo isolado (SC-003) — `/spa/portfolio/`
- [X] T032 [US3] Clicar na capa e no título do card CLA → `AES1` injetado no host com `pushState` e menu "Portfólio" ativo; capa do Pipeline → nova aba; card de teste → `pagina_teste` no host — `/spa/portfolio/`
- [X] T033 [US4] Viewport 375px: grade em 1 coluna, sem scroll horizontal global — `/spa/portfolio/`
- [X] T034 Navegar Portfólio → Sobre → Portfólio 3× e confirmar que cada clique em `.selection-button` dispara um único handler (idempotência) — `/spa/portfolio/`

---

## Dependências e Execução

- Fase 1 → Fase 2 → Fase 3 → Fase 4 → Fase 5.
- T011, T020 e as verificações T002–T004 são independentes ([P]).
- T026 depende de T021–T025; T027–T028 (roteador global) podem ser feitos em paralelo com T021–T025, mas afetam todas as páginas: validar Sobre/Histórico/Formação/Contatos em T029–T034.
- **MVP**: Fases 1–3 + T021–T027 entregam US1 e US2; T028 completa US3.
- **Fora do escopo** (plano, R-01): os assets em `/pages/...` não são copiados para `dist/` no build atual.

---

## Notas de Validação (2026-11-17)

- `npm run build`: sem erros. `npx astro check` não executado (`@astrojs/check` não instalado).
- SPA (desktop): 7 seções, 3 cards; 7/7 botões com `.active` correto, título visível abaixo do header, 1 `pushState` por clique; idempotente após 3 ciclos Portfólio ↔ Sobre; sem erros de console.
- US3: AES1 injetado sem reload, menu "Portfólio" ativo, breadcrumbs corretos, `history.back()` restaura o portfólio; links externos com `target="_blank"`; `pagina_teste` injetada via fallback `<body>`.
- US4: no shell a 375px, grade em 1 coluna, gap/padding 12px e barra de categorias com rolagem horizontal. **Pendência do shell (spec-01)**: a sidebar mantém 300px no mobile e o `#page-content-host` fica com ~80px em todas as páginas.
- Colisão de CSS encontrada: `sobre.css` definia `.category-title` globalmente (carregado no shell); neutralizada em `portfolio.css` com `.portfolio-page-wrapper .category-section-title`.
- Regressão: Sobre, Histórico, Formação e Contatos carregam com menu ativo correto após as mudanças no `router.js`.

---

## Fase 6: Subpáginas de Projeto na SPA (spec-05 §2.2, itens 4 e 5 — 2026-11-26)

**Objetivo**: as subpáginas de projeto mantêm "Portfólio" ativo, exibem a trilha "Início / Portfólio / <título>" e não alteram a moldura.

- [X] T035 [US1] Declarar `data-breadcrumbs` com "Portfólio" no `#page-content` — `pages/portfolio/projetos/AES1/AES1.html`
- [X] T036 [US1] Envolver o `<body>` em `#page-content.pt-teste` (`data-page-id="portfolio-project-teste"`, `data-page-title="Projeto de teste"`, `data-parent-route="/portfolio"`, `data-breadcrumbs` com "Portfólio"); base mínima restrita a `.pt-teste`; Tailwind carregado pelo `<body>` com `preflight` desligado e `important: '.pt-teste'` — `pages/portfolio/projetos/testes/pagina_teste.html`
- [X] T037 [US1] Executar o script na hora (sem `DOMContentLoaded`), encapsulado, encerrando o relógio e o listener de `resize` quando a página sair — `pages/portfolio/projetos/testes/pagina_teste.html`
- [X] T038 Executar `npm run build` sem erros — raiz do projeto

### Notas de Validação (2026-11-26)

- AES1: trilha "Início / Portfólio / Customer Lifecycle Analytics (CLA)", menu "Portfólio" ativo; "Portfólio" na trilha volta à página.
- Projeto de teste: estilizado dentro da moldura, relógio, resolução, User-Agent e botão de teste funcionando; trilha "Início / Portfólio / Projeto de teste".
- Alternância com o glossário de Séries temporais (outra configuração de Tailwind): as duas páginas mantêm o CSS, sem erros de console.
- Acesso direto à página de teste continua funcionando.
