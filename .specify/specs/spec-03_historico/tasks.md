---
description: "Lista de tarefas executáveis para a implementação da Página 'Histórico'"
---

# Tasks: Estrutura e Estilização da Página "Histórico" (`historico.astro`)

**Input**: Documentos de design de `.specify/specs/spec-03_historico/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  
**Tests**: Validação visual e de integração guiada por [spec.md](./spec.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/historico/` conforme a arquitetura da SPA.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura de diretórios e organização dos assets estáticos (folha de estilo) da página de Histórico.

- [x] T001 Criar a estrutura completa de pastas do módulo em `pages/historico/` (`assets/css/`, `assets/images/`)
- [x] T002 [P] Criar a folha de estilo base em `pages/historico/assets/css/historico.css` com as variáveis CSS de cores, gradientes verticais, bordas e sombras
- [x] T003 [P] Configurar assets e referências estáticas

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção da página mestre e estrutura de layout base.

**⚠️ CRITICAL**: A casca da página e o invólucro do contêiner principal devem existir antes da integração das User Stories.

- [x] T004 Criar a página mestre da seção em `pages/historico/historico.astro`, `pages/historico.md` e `pages/spa/historico.astro` com o contêiner raiz `#page-content`, atributos `data-page-id="historico"` e `data-page-title="Histórico"`

**Checkpoint**: Base e casca estrutural configuradas. As User Stories podem ser implementadas.

---

## Phase 3: User Story 1 - Visualização do Main Container e Título da Página de Histórico (Priority: P1) 🎯 MVP

**Goal**: Exibir o container principal (`.main-container`) com largura máxima de 1200px, gradiente vertical de `#16222A` a `#3A6073`, borda `1px solid #0381B0`, border-radius 10px, box-shadow interna e padding de 16px, contendo o título "Histórico Profissional" em Barlow Condensed 700 bold (32px, cor `#ffffff`).

**Independent Test**: Acessar a rota da página "Histórico" e verificar se o container `.main-container` e o título são renderizados com precisão nas cores, gradiente, borda, sombra interna e tipografia.

### Implementation for User Story 1

- [x] T005 [P] [US1] Implementar os estilos do Main Container (`.main-container`) em `pages/historico/assets/css/historico.css` aplicando `max-width: 1200px`, gradiente vertical `#16222A` a `#3A6073`, borda `1px solid #0381B0`, `border-radius: 10px`, `box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5)`, e `padding: 16px`
- [x] T006 [US1] Implementar o título principal (`.page-title`) em `pages/historico/historico.astro` e estilizar em `historico.css` com fonte `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#ffffff`, e margem inferior de 16px

**Checkpoint**: MVP do Main Container e título concluído.

---

## Phase 4: User Story 2 - Exibição dos Cards de Experiência Profissional, Badges e Stack Tecnológica (Priority: P1)

**Goal**: Organizar a trajetória profissional em cards de experiência (`.experience-card`) com gradiente vertical de `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, border-radius 12px, box-shadow, contendo logo da empresa (`.company-logo`, 40px), título do cargo (`.job-title`, Barlow Condensed 700 bold, 22px), badges de informações gerais (`.badge`, gradiente `#FFFDEB` a `#FFF9D2`), descrição justificada (`.job-description`, Courier New/Consolas, peso 800) e bloco de stack tecnológica (`.tech-stack-block`).

**Independent Test**: Validar se os cards exibem corretamente todas as informações de experiência, badges, descrições e stack tecnológica.

### Implementation for User Story 2

- [x] T007 [P] [US2] Implementar os cards de experiência (`.experience-card`) em `pages/historico/historico.astro` e estilizar em `historico.css` com gradiente vertical `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, `border-radius: 12px`, `box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15)`, e `padding: 20px 24px`
- [x] T008 [US2] Implementar o cabeçalho do card com logo (`.company-logo`, altura 40px) e título do cargo (`.job-title`, Barlow Condensed 700 bold, 22px, cor `#000000`)
- [x] T009 [US2] Implementar as badges informativas (`.info-badges` e `.badge`) com gradiente `#FFFDEB` a `#FFF9D2`, borda `1px solid #0381B0`, border-radius 20px, padding 6px 16px, e fonte monoespaçada/Barlow Condensed
- [x] T010 [US2] Implementar a descrição da atividade (`.job-description`) com fonte monoespaçada (`Courier New`/`Consolas`), tamanho 16px, peso 800, cor `#0a0c0c`, `line-height: 1.5` e alinhamento justificado
- [x] T011 [US2] Implementar o bloco de stack tecnológica (`.tech-stack-block`, `.tech-stack-title`, `.tech-list`, `.tech-item`, `.tech-icon`) com fundo em gradiente `#FFFDEB` a `#FFF8D6`, borda `1px solid #0381B0`, e border-radius 6px

**Checkpoint**: Cards de experiência profissional totalmente funcionais e estilizados conforme o design de referência.

---

## Phase 5: User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Garantir que o layout da página de histórico se ajuste perfeitamente a viewports de tablet e mobile com redimensionamento proporcional de padding, título e grid de badges.

**Independent Test**: Testar em viewports de tablet e mobile validando o ajuste do grid de badges, redução do `.page-title` e padding do card.

### Implementation for User Story 4

- [x] T012 [P] [US4] Implementar media query para Tablet (768px a 1023px) ajustando o layout das badges para centralização e max-width
- [x] T013 [US4] Implementar media query para Mobile (< 767px) configurando `.page-title` para 24px, card padding para 12px, e badges em grade de 2 colunas (`repeat(2, 1fr)`)

**Checkpoint**: Layout responsivo verificado em desktop, tablet e mobile.

---

## Phase 6: User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

**Goal**: Assegurar que a página de histórico seja carregada dinamicamente na SPA sem recarregamento de página (`pages/spa/historico.astro`), mantendo a Sidebar ativa e atualizando os Breadcrumbs.

**Independent Test**: Clicar na opção de Histórico na Sidebar e verificar a injeção instantânea no `#page-content-host` com os atributos data corretos (`data-page-id="historico"` e `data-page-title="Histórico"`).

### Implementation for User Story 3

- [x] T014 [US3] Validar e registrar a página `historico.astro` em `pages/spa/historico.astro` e no roteador do sistema (`router.js`) para carregamento assíncrono no `#page-content-host` com atualização automática dos Breadcrumbs
- [x] T015 [US3] Importar e encapsular a folha de estilo `historico.css` em `pages/spa/historico.astro` para garantir o empacotamento e aplicação de estilos ao ser carregada no ambiente SPA.
