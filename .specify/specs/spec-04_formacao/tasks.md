# Tasks: Estrutura e Estilização da Página "Formação" (`formacao.astro`)

**Input**: Design documents from `.specify/specs/spec-04_formacao/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project directory structure and assets for Formação page.

- [ ] T001 Verify existence of `pages/formacao/` directory and asset files in `pages/formacao/assets/images/`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core CSS structure and base module configuration.

- [ ] T002 Initialize `pages/formacao/assets/css/formacao.css` and verify Astro page component structure.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Visualização e Título da Página de Formação (Priority: P1) 🎯 MVP

**Goal**: Implementar o contêiner principal da página, gradiente vertical de fundo e o título principal "Formação" em Barlow Condensed.

**Independent Test**: Acessar a rota da página "Formação" na SPA e verificar se o contêiner exibe o gradiente correto e o título em Barlow Condensed 32px.

### Implementation for User Story 1

- [ ] T003 [US1] Create page structure in `pages/formacao/formacao.astro` with `#page-content`, `data-page-id="formacao"`, and `data-page-title="Formação"`.
- [ ] T004 [US1] Implement `.main-container` background gradient (`#16222A` to `#3A6073`), padding 20px, and layout centering in `pages/formacao/assets/css/formacao.css`.
- [ ] T005 [US1] Implement `.page-title` styling in `formacao.css` with Barlow Condensed, 700 bold, 32px, cor `#000000`, and margin-bottom 16px.

**Checkpoint**: User Story 1 fully functional and testable independently.

---

## Phase 4: User Story 2 - Exibição das Seções e Cards de Formação, Idiomas e Treinamentos (Priority: P1)

**Goal**: Exibir as 3 seções ('Acadêmica', 'Idiomas', 'Treinamentos') com seus títulos correspondentes e cards contendo logos centralizados, títulos de curso e badges em fonte monoespaçada.

**Independent Test**: Verificar se a página possui as 3 seções, títulos correspondentes e cards com logos, títulos e badges corretos.

### Implementation for User Story 2

- [ ] T006 [US2] Implement section titles (`.section-title`) for 'Acadêmica', 'Idiomas', and 'Treinamentos' in Barlow Condensed 28px bold (`#ffffff`).
- [ ] T007 [US2] Implement card wrapper and card container styling with gradient `linear-gradient(to right, #FFF8D6, #FFFFFF)`, border `1px solid #0381B0`, and `border-radius: 10px`.
- [ ] T008 [US2] Implement Academic section cards with institution logos (`logo-estacio.png`, `logo-estacio-uniradial.png`), course titles, and period badges.
- [ ] T009 [US2] Implement Languages section cards with language logos (`logo_ingles.png`, `logo_espanhol.png`) and proficiency titles.
- [ ] T010 [US2] Implement Trainings section card with training logo (`logo_enap.png`), title, and year badge (`2024`).

**Checkpoint**: User Stories 1 and 2 work independently.

---

## Phase 5: User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

**Goal**: Integrar dinamicamente a página no Main Container da SPA sem recarregamento.

**Independent Test**: Navegar para "Formação" via menu lateral e verificar injeção via `fetch` no `#page-content-host` e atualização dos Breadcrumbs.

### Implementation for User Story 3

- [ ] T011 [US3] Verify SPA route configuration and router hook in `pages/spa/` for `/spa/formacao/`.
- [ ] T012 [US3] Test breadcrumb updates and Sidebar active state synchronization for Formação.

**Checkpoint**: Navigation works smoothly via SPA router.

---

## Phase 6: User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Assegurar design responsivo para tablets e dispositivos móveis.

**Independent Test**: Testar viewports de tablet (768px-1023px) e mobile (<767px) validando padding, tamanhos de fonte e badges.

### Implementation for User Story 4

- [ ] T013 [US4] Add media queries in `formacao.css` for Tablet (768px-1023px) padding adjustments (16px).
- [ ] T014 [US4] Add media queries in `formacao.css` for Mobile (<767px) container padding (16px), title size (26px), course title size (26px), and badge padding/font size.

**Checkpoint**: Responsive adaptation verified across all viewports.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final build validation and quality check.

- [ ] T015 [P] Run `npm run build` to validate static generation and asset resolution paths.
- [ ] T016 Run quickstart.md validation steps.

---

## Dependencies & Execution Order

- **Phase 1 & 2**: Setup and foundational CSS base.
- **Phase 3 (US1)**: Page title and container background (MVP).
- **Phase 4 (US2)**: Seção Acadêmica, Idiomas e Treinamentos com cards e logos.
- **Phase 5 (US3)**: SPA route integration.
- **Phase 6 (US4)**: Responsive media queries.
- **Phase 7**: Build validation (`npm run build`).
