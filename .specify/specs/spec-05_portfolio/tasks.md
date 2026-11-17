# Tasks: Estrutura e Estilização da Página "Portfólio" ('portfolio.astro')

**Input**: Design documents from `.specify/specs/spec-05_portfolio/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and directory structure creation

- [X] T001 Create portfolio directory structure in pages/portfolio/ and subdirectories per implementation plan
- [X] T002 [P] Verify presence of required static image assets in pages/portfolio/assets/images/ (projeto_CLA.avif, projeto_pipeline1.avif)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and template setup for the portfolio page

- [X] T003 Create base Astro page structure in pages/portfolio/portfolio.astro with frontmatter and imports
- [X] T004 [P] Create base CSS stylesheet in pages/portfolio/assets/css/portfolio.css following Dark Tech Dashboard / portfolio color palette
- [X] T005 [P] Create base JavaScript file in pages/portfolio/assets/js/portfolio.js

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Fixed Header & Category Navigation (Priority: P1) 🎯 MVP

**Goal**: Implement a fixed header at the top with category selection buttons pointing to category section anchors.

**Independent Test**: Verify fixed header remains at the top during scrolling and clicking selection buttons smoothly scrolls to the respective category section anchors without jumping or resetting in SPA.

### Implementation for User Story 1

- [X] T006 [US1] Implement fixed header container and page title ('Portfólio de Projetos') in pages/portfolio/portfolio.astro
- [X] T007 [US1] Implement category selection buttons (`selection_button`) with data anchors in pages/portfolio/portfolio.astro
- [X] T008 [US1] Style fixed header and selection buttons in pages/portfolio/assets/css/portfolio.css (gradient `#2C4855` to `#1E333D`, active state ciano `#22D3EE`)
- [X] T009 [US1] Implement client-side scroll observer and click handlers in pages/portfolio/assets/js/portfolio.js to highlight active category buttons and smoothly scroll

**Checkpoint**: User Story 1 (Fixed Header & Navigation) fully functional and testable independently

---

## Phase 4: User Story 2 - Project Grid & Interactive Cards (Priority: P2)

**Goal**: Implement category sections and interactive project cards with images, summaries, and skill tags using CSS Grid strictly for the categories specified with cards in Section 2.4.

**Independent Test**: Verify projects are displayed in responsive 2-column grids strictly for bi-analytics (1 card) and data-engineering (2 cards), while the other 5 categories display only their headers.

### Implementation for User Story 2

- [X] T010 [P] [US2] Implement all 7 category sections (`category_section`, `category_title`) in pages/portfolio/portfolio.astro (rendering only titles for empty categories)
- [X] T011 [P] [US2] Implement `project_grid` and `project_card` elements strictly for projects specified in Section 2.4 (1 card in bi-analytics, 2 in data-engineering, total: 3 cards) with absolute asset paths (`/pages/portfolio/assets/images/...`) in pages/portfolio/portfolio.astro
- [X] T012 [P] [US2] Implement `habilities_list` and skill tags (`hability_tag_HS`, `hability_tag_SS`) for the 3 specified project cards in pages/portfolio/portfolio.astro
- [X] T013 [US2] Style project cards, gradients, borders, shadows, and 2-column CSS Grid in pages/portfolio/assets/css/portfolio.css
- [X] T014 [US2] Style hard skill and soft skill tags in pages/portfolio/assets/css/portfolio.css

**Checkpoint**: User Story 2 (Project Grid & Cards) fully functional and testable independently

---

## Phase 5: User Story 3 - SPA Integration & Project Link Routing (Priority: P3)

**Goal**: Ensure project cards link correctly to project subpages and integrate seamlessly with the SPA router (`#page-content-host`).

**Independent Test**: Verify clicking a project card loads the project subpage via SPA fetch without full page reload, maintaining `#page-content` and data attributes.

### Implementation for User Story 3

- [X] T015 [US3] Configure project links (`project_link`) pointing to project subpages (e.g., `/pages/portfolio/projetos/AES1/AES1.html`) in pages/portfolio/portfolio.astro
- [X] T016 [US3] Ensure SPA router link interception attributes (`data-spa-link`) are correctly applied in pages/portfolio/portfolio.astro
- [X] T017 [US3] Verify sample project subpage structure at pages/portfolio/projetos/AES1/AES1.html with `#page-content` and metadata attributes
- [X] T018 [US3] Test client-side navigation between portfolio and project subpages

**Checkpoint**: All user stories independently functional and integrated with SPA router

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, build testing, and quickstart validation

- [X] T019 [P] Perform code cleanup and formatting across pages/portfolio/ files
- [X] T020 Run `npm run build` to validate Astro static build and asset bundling
- [X] T021 Execute quickstart.md validation steps

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: Depend on Foundational phase completion (can proceed sequentially P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Opportunities
- T001 and T002 can run in parallel.
- T003, T004, and T005 can run in parallel.
- T010, T011, and T012 can run in parallel.
- T019 can run in parallel.
