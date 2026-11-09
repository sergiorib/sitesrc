# Tasks: Estrutura e Conteúdo Integral da Página "Histórico"

**Input**: Design documents from `.specify/specs/spec-03_historico/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story, ensuring exhaustive coverage of all 5 professional experiences without truncation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for the Histórico page.

- [x] T001 Create page directory structure at `pages/historico/` and asset directories `pages/historico/assets/css/`, `pages/historico/assets/js/`, and `pages/historico/assets/images/`
- [x] T002 [P] Verify physical presence of company logo assets in `pages/historico/assets/images/` (`logo_frete.png`, `logo_verity.png`, `logo_arezzo.png`, `logo_cvc.png`)
- [x] T003 [P] Create base CSS stylesheet at `pages/historico/assets/css/historico.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before user stories can be implemented.

- [x] T004 Create Astro page wrapper for SPA at `pages/spa/historico.astro` with `#page-content`, `data-page-id="historico"`, `data-page-title="Histórico"`, and frontmatter import of `../historico/assets/css/historico.css`
- [x] T005 [P] Create static page entry at `pages/historico.md`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Visualização do Conteúdo da Página de Histórico (Priority: P1) 🎯 MVP

**Goal**: Render the main header and title "Histórico Profissional" inside `#page-content` with Barlow Condensed 700 bold 32px typography.

**Independent Test**: Access the History route in the SPA, verify title typography and container layout.

### Implementation for User Story 1

- [x] T006 [US1] Implement main page title `.page-title` in `pages/historico/assets/css/historico.css` using `Barlow Condensed`, weight 700 bold, size 32px, color `#FFFFFF`, and bottom margin 16px
- [x] T007 [US1] Structure container layout in `pages/spa/historico.astro` and `pages/historico/historico.astro`

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Exibição Integral dos Cards de Experiência, Badges e Stack Tecnológica (Priority: P1)

**Goal**: Render all 5 professional experience cards (`.experience-card`) with logos, exact titles, badges, detailed descriptions, and tech stack shields with correct hard/soft types and colors.

**Independent Test**: Verify all 5 experience records are rendered exhaustively with correct company logos, badges, descriptions, and tech stacks.

### Implementation for User Story 2

- [x] T008 [US2] Implement `.experience-card` styles in `pages/historico/assets/css/historico.css` with vertical gradient from `#e8f4fa` to `#c1d3db`, border `1px solid #0381B0`, `border-radius: 12px`, `box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15)`, and `padding: 20px 24px`
- [x] T009 [US2] Implement `.company-logo` styles in `pages/historico/assets/css/historico.css` with 100px height for Experience 1 (`width: auto`, `object-fit: contain`)
- [x] T010 [US2] Implement `.job-title` styles in `pages/historico/assets/css/historico.css` using `Barlow Condensed`, weight 700 bold, size 34px, color `#000000`
- [x] T011 [US2] Implement `.badge` styles in `pages/historico/assets/css/historico.css` with gradient `#FFFDEB` to `#FFF9D2`, border `1px solid #0381B0`, `border-radius: 20px`, padding `6px 16px`, font-size `20px`, weight 600, color `#000000`
- [x] T012 [US2] Implement `.job-description` styles in `pages/historico/assets/css/historico.css` with monospace font (`Courier New`/`Consolas`), size `22px`, weight 800, color `#0a0c0c`, `line-height: 1.5`, and justified alignment
- [x] T013 [US2] Implement `.tech-stack-block` and `.tech-stack-title` styles in `pages/historico/assets/css/historico.css` (title in monospace green 22px, block border-radius 16px)
- [x] T014 [US2] Implement `.tech-shield` styles for hard skills (background `#5E718D`, color `#FFFFFF`, `border-radius: 12px`, size 20px) and soft skills (background `#3CA296`, color `#FFFFFF`)
- [x] T015 [US2] Render **Experiência 1: Frete.com** in `pages/spa/historico.astro` with logo (`/pages/historico/assets/images/logo_frete.png`), cargo "Analista de BI", badges (`maio 2025 a março 2026`, `10 meses`, `PJ`, `Remoto`, `Logística`), description, and 12 hard skill shields: Microsoft SQL Server, Python, DuckDB, n8n, dbt, API REST (Consumo), Postman, Swagger, Microsoft Excel, Drawio, SCRUM, Github
- [x] T016 [US2] Render **Experiência 2: Verity Consultoria em Tecnologia** in `pages/spa/historico.astro` with logo (`/pages/historico/assets/images/logo_verity.png`), cargo "Analista de BI", badges (`março 2023 a março 2025`, `2 anos`, `CLT`, `Remoto`, `Seguros`), description, 11 hard skill shields (Progress 4GL, SQL, Excel, Integração com APIS, Swagger, Postman, DrawIO, Jira, Scrum, Bitbucket, Service Now), and 2 soft skill shields (Análise de Sistema, Modelagem de dados)
- [x] T017 [US2] Render **Experiência 3: Arezzo&Co** in `pages/spa/historico.astro` with logo (`/pages/historico/assets/images/logo_arezzo.png`), cargo "Analista de dados", badges (`janeiro 2021 a outubro 2022`, `1 ano e 6 meses`, `PJ`, `Remoto`, `Varejo`), description, and 8 hard skill shields: Databricks, SQL, PySpark, Delta Lake, Power BI, Python, Excel, Git
- [x] T018 [US2] Render **Experiência 4: CVC Viagens e Turismo** in `pages/spa/historico.astro` with logo (`/pages/historico/assets/images/logo_cvc.png`), cargo "Especialista em TI", badges (`janeiro 2018 a janeiro 2021`, `3 anos`, `CLT`, `Presencial`, `e-commerce de turismo`), description, and 5 hard skill shields: SQL Server, Oracle, Excel, C#, Databricks
- [x] T019 [US2] Render **Experiência 5: Submarino (varejo e turismo) e B2W Digital** in `pages/spa/historico.astro` with logo (`/pages/historico/assets/images/logo_submarino.png`), cargo "Analista de dados", badges (`janeiro 2015 a dezembro 2017`, `3 anos`, `PJ`, `Presencial`, `ecommerce`), description, and 7 hard skill shields: Databricks, SQL, PySpark, Delta Lake, Power BI, Python, Excel, Git

**Checkpoint**: All 5 experience records rendered exhaustively with complete metadata, descriptions, and stacks.

---

## Phase 5: User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

**Goal**: Integrate the history page into the SPA client-side router and update breadcrumbs.

**Independent Test**: Navigate to History via SPA menu and verify seamless injection into `#page-content-host` without full reload.

### Implementation for User Story 3

- [x] T020 [US3] Verify SPA route configuration for `/spa/historico/` and ensure dynamic content injection via `fetch` works correctly without relative path errors
- [x] T021 [US3] Update breadcrumb controller logic to reflect active state "Histórico" when page is loaded

**Checkpoint**: Seamless SPA navigation and breadcrumb updates confirmed.

---

## Phase 6: User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Ensure flawless responsive layout across tablets and mobile viewports.

**Independent Test**: Test viewport resizing at < 767px (mobile) and 768px-1023px (tablet).

### Implementation for User Story 4

- [x] T022 [US4] Implement Tablet media query (768px to 1023px) in `pages/historico/assets/css/historico.css` for 2-column badge layout
- [x] T023 [US4] Implement Mobile media query (< 767px) in `pages/historico/assets/css/historico.css` reducing title to 24px, card padding to 12px, logo to 80px, and 2-column badge grid (`repeat(2, 1fr)`)

**Checkpoint**: Responsive styling verified across devices.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validation, asset checks, and build verification.

- [x] T024 [P] Verify absolute paths usage for all static images (`/pages/historico/assets/images/...`) per SPA asset resolution convention
- [x] T025 Run `npm run build` to validate static generation and bundle compilation without errors
- [x] T026 Execute quickstart validation scenarios from `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup
- **User Stories (Phase 3-6)**: Depend on Foundational completion
- **Polish (Phase 7)**: Depends on all user stories being complete

### Parallel Opportunities
- T001, T002, T003 can run in parallel.
- T015 to T019 (rendering the 5 experiences) can be implemented in parallel blocks.
- T024, T025, T026 run in final polish phase.
