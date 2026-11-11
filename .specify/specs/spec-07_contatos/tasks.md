---
description: "Lista de tarefas executáveis para a implementação da Página 'Meus Contatos'"
---

# Tasks: Estrutura e Estilização da Página "Meus Contatos" (`contatos.astro`)

**Input**: Documentos de design de `.specify/specs/spec-07_contatos/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md), [quickstart.md](./quickstart.md)  
**Tests**: Validação visual e de integração guiada por [quickstart.md](./quickstart.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/contatos/` conforme a Constituição v1.0.0.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura de diretórios e inicialização dos assets estáticos da página "Meus Contatos".

- [x] T001 Criar a estrutura completa de pastas do módulo em `pages/contatos/` (`assets/css/`, `assets/images/`)
- [x] T002 [P] Inicializar os ícones gráficos SVG dos contatos (Telefone, E-mail, LinkedIn, GitHub) em `pages/contatos/assets/images/`
- [x] T003 [P] Criar a folha de estilo base em `pages/contatos/assets/css/contatos.css` com as variáveis CSS de cores, gradientes, bordas e regras do painel executivo

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção do contêiner raiz da página e estrutura base de layout.

- [x] T004 Criar o componente Astro principal da seção em `pages/contatos/contatos.astro` com o contêiner raiz `id="page-content"`, atributos `data-page-id="contatos"` e `data-page-title="Meus Contatos"`, e importação da folha de estilos `contatos.css`

**Checkpoint**: Base estrutural configurada.

---

## Phase 3: User Story 1 - Visualização do Cabeçalho e Painel de Contatos (Priority: P1) 🎯 MVP

**Goal**: Exibir a página de contatos com o contêiner `.contacts-page` (fundo em gradiente radial/linear `#142b36` a `#31596a`, bordas arredondadas de 14px, padding responsivo) e o título "Meus Contatos" em tipografia `Barlow Condensed` Bold 32px cor `#ffffff`.

### Implementation for User Story 1

- [x] T005 [P] [US1] Implementar os estilos do contêiner `.contacts-page` e do cabeçalho `h1` em `pages/contatos/assets/css/contatos.css` aplicando tipografia `Barlow Condensed` Bold 32px (`#ffffff`)
- [x] T006 [US1] Integrar a marcação semântica do cabeçalho e container principal em `pages/contatos/contatos.astro`

**Checkpoint**: MVP do cabeçalho e painel executivo concluído.

---

## Phase 4: User Story 2 - Renderização Dinâmica dos Cards de Contato (Priority: P1)

**Goal**: Exibir a grade de cards de contato (`.contact-grid`) renderizando dinamicamente os 4 canais cadastrados (Telefone/WhatsApp, E-mail, LinkedIn, GitHub), aplicando cards individuais (`.contact-card`) com gradiente linear, borda ciano translúcida, hover state (`transform: translateY(-3px)` e borda `--cyan`), contêineres de ícone (`.icon-wrap`), rótulos, valores em `Barlow Condensed` e links com indicador `↗`.

### Implementation for User Story 2

- [x] T007 [P] [US2] Implementar os estilos da grade `.contact-grid` e dos cards `.contact-card` em `pages/contatos/assets/css/contatos.css` com gradientes, bordas, estados de hover e tipografia (`Barlow Condensed` 600, 30px)
- [x] T008 [US2] Declarar a coleção de dados dos 4 canais de contato (Telefone/WhatsApp, E-mail, LinkedIn, GitHub) no frontmatter de `pages/contatos/contatos.astro` conforme o modelo definido em `data-model.md` e FR-007
- [x] T009 [US2] Implementar a renderização dinâmica baseada em loop Astro para gerar os cards de contato contendo ícone SVG, rótulo, valor, detalhe opcional, link funcional e seta indicativa (`↗`) em `pages/contatos/contatos.astro`

**Checkpoint**: Grade de contatos integrada dinamicamente com os 4 canais oficiais.

---

## Phase 5: User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

**Goal**: Assegurar que a página `pages/contatos/contatos.astro` seja carregada e injetada dinamicamente no container `.contacts-page` da SPA via History API / fetch client-side, atualizando o Breadcrumbs e o estado da Sidebar.

### Implementation for User Story 3

- [x] T010 [US3] Integrar a rota `/spa/contatos/` ao roteador SPA (`router.js`) garantindo interceptação de cliques e carregamento assíduo
- [x] T011 [US3] Validar a captura dos atributos `id="page-content"`, `data-page-id="contatos"` e `data-page-title="Meus Contatos"` pelo roteador SPA para atualização automática da régua de Breadcrumbs e seleção na Sidebar

**Checkpoint**: Integração SPA validada para a rota de contatos.

---

## Phase 6: User Story 4 - Adaptabilidade Responsiva (Priority: P2)

**Goal**: Garantir que a grade de contatos e a tipografia se ajustem à largura da tela, exibindo 2 colunas em desktop (≥ 720px) e 1 coluna em mobile (< 720px), com redimensionamento de ícones (42x42px) em viewports < 380px.

### Implementation for User Story 4

- [x] T012 [P] [US4] Implementar as media queries em `pages/contatos/assets/css/contatos.css` para breakpoints de 720px (grid 1 coluna) e 380px (escala de ícones e tipografia)

**Checkpoint**: Layout responsivo testado em desktop, tablet e dispositivos móveis.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificação de conformidade visual, compilação de assets e auditoria constitucional.

- [x] T013 [P] Verificar a conformidade estrita de caminhos absolutos de assets (`/pages/contatos/assets/images/...`) conforme a convenção SPA
- [x] T014 Executar a validação completa de build estático (`npm run build`) para garantir zero erros de compilação
- [x] T015 Validar todos os cenários E2E descritos em `quickstart.md`
