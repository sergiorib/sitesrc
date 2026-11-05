---
description: "Lista de tarefas executáveis para a implementação da Página 'Portfólio'"
---

# Tasks: Estrutura e Estilização da Página "Portfólio" (`portfolio.astro`)

**Input**: Documentos de design de `.specify/specs/spec-05_portfolio/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  
**Tests**: Validação visual e interativa guiada por [spec.md](./spec.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/portfolio/` conforme a arquitetura da SPA.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura completa de diretórios e organização dos assets estáticos para a página de Portfólio.

- [x] T001 Criar a estrutura completa de pastas do módulo em `pages/portfolio/` (`assets/css/`, `assets/js/`, `assets/images/`)
- [x] T002 [P] Criar a folha de estilo em `pages/portfolio/assets/css/portfolio.css` com as definições de gradientes, painel de filtros, cards de projeto, tags e tipografia (Barlow Condensed, Consolas)
- [x] T003 [P] Criar o script client-side em `pages/portfolio/assets/js/portfolio.js` para controle de filtragem interativa por categorias (pills)

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção da página mestre e estrutura de layout base.

**⚠️ CRITICAL**: A casca da página e o invólucro do contêiner principal devem existir antes da integração das User Stories.

- [x] T004 Criar a página mestre em `pages/portfolio/portfolio.astro` e garantir a compatibilidade em `pages/spa/portfolio.astro` com o contêiner raiz `#page-content`, atributos `data-page-id="portfolio"` e `data-page-title="Portfólio"`

**Checkpoint**: Base e casca estrutural configuradas. As User Stories podem ser implementadas.

---

## Phase 3: User Story 1 - Visualização do Cabeçalho e Painel de Filtros (Pills) do Portfólio (Priority: P1) 🎯 MVP

**Goal**: Exibir o título principal ("Portfólio de Projetos") em fonte `Barlow Condensed` e o painel de filtros (`.filter-panel`) com 8 botões interativos (pills) com estado `.active`.

**Independent Test**: Acessar a página de Portfólio e verificar se o título e o painel de filtros são renderizados com exatidão estética.

### Implementation for User Story 1

- [x] T005 [P] [US1] Implementar os estilos do cabeçalho (`.page-title`) e painel de filtros (`.filter-panel`, `.filter-pill`) em `pages/portfolio/assets/css/portfolio.css`
- [x] T006 [US1] Implementar a marcação HTML do título e do painel de filtros com as 8 pills em `pages/portfolio/portfolio.astro`

**Checkpoint**: MVP do cabeçalho e painel de filtros concluído.

---

## Phase 4: User Story 2 - Exibição das Seções de Categorias e Cards de Projetos (Priority: P1)

**Goal**: Implementar as seções de categorias de projetos e o grid responsivo de 3 colunas (`.project-grid`) contendo cards detalhados (`.project-card`) com imagens de capa, títulos, descrições truncadas em 3 linhas e tags de tecnologias (`.tag-pill`).

**Independent Test**: Verificar se as seções de categoria e os cards exibem corretamente capas, textos, truncamento e tags.

### Implementation for User Story 2

- [x] T007 [P] [US2] Implementar os estilos das seções de categoria (`.category-section`, `.category-title`), grids (`.project-grid`), cards (`.project-card`, `.card-cover`, `.card-title`, `.card-description`) e tags (`.tag-tags`, `.tag-pill`) em `pages/portfolio/assets/css/portfolio.css`
- [x] T008 [US2] Implementar a marcação HTML das seções de categoria e cards de projetos em `pages/portfolio/portfolio.astro`

**Checkpoint**: Seções de projetos e cards estilizados e estruturados.

---

## Phase 5: User Story 3 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Garantir que o layout da página de portfólio se ajuste perfeitamente a viewports de tablet (2 colunas) e mobile (1 coluna).

**Independent Test**: Testar em viewports menores que 1023px e 768px verificando o redimensionamento do grid e espaçamentos.

### Implementation for User Story 3

- [x] T009 [P] [US3] Implementar media queries em `pages/portfolio/assets/css/portfolio.css` para transformar `.project-grid` em 2 colunas (`repeat(2, 1fr)`) em tablets e 1 coluna (`1fr`) em dispositivos móveis

**Checkpoint**: Layout responsivo verificado em desktop, tablet e mobile.

---

## Phase 6: Integração SPA e Validação Final

**Purpose**: Registrar a página no roteador SPA e validar a integridade da implementação.

- [x] T010 Registrar a página de portfólio em `pages/spa/portfolio.astro` importando os estilos e scripts correspondentes para injeção sem recarregamento no `#page-content-host`
- [x] T011 Realizar testes finais de validação visual e interativa da página de Portfólio.

---

## Phase 7: Convergence (Codebase Sync & Verification)

- [x] T012 Verificar a integridade e paridade entre o código-fonte em `pages/portfolio/` e as especificações GSK (`spec-05_portfolio`).
- [x] T013 Validar o build de produção estático do Astro cobrindo todas as rotas sem erros de compilação ou incompatibilidades de SSR.
