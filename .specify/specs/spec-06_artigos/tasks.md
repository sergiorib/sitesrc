---
description: "Lista de tarefas executáveis para a implementação da Página 'Artigos'"
---

# Tasks: Estrutura e Estilização da Página "Artigos" (`artigos.astro`)

**Input**: Documentos de design de `.specify/specs/spec-06_artigos/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  
**Tests**: Validação visual e interativa guiada por [spec.md](./spec.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/artigos/` conforme a arquitetura da SPA.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura completa de diretórios e organização dos assets estáticos para a página de Artigos.

- [ ] T001 Criar a estrutura completa de pastas do módulo em `pages/artigos/` (`assets/css/`, `assets/js/`, `assets/images/`)
- [ ] T002 [P] Criar a folha de estilo em `pages/artigos/assets/css/artigos.css` com as definições de gradientes, glassmorphism, acordeão, estados hover/selected e tipografia (Oswald, Roboto Condensed)
- [ ] T003 [P] Criar o script client-side em `pages/artigos/assets/js/artigos.js` para controle de acordeão de grupos/subgrupos e seleção de subitens com feedback visual e redirecionamento de 150ms

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção da página mestre e estrutura de layout base.

**⚠️ CRITICAL**: A casca da página e o invólucro do contêiner principal devem existir antes da integração das User Stories.

- [ ] T004 Criar a página mestre e documentação em `pages/artigos/artigos.astro`, `pages/artigos.md` e `pages/spa/artigos.astro` com o contêiner raiz `#page-content`, atributos `data-page-id="artigos"` e `data-page-title="Artigos técnicos"`

**Checkpoint**: Base e casca estrutural configuradas. As User Stories podem ser implementadas.

---

## Phase 3: User Story 1 - Visualização do Cabeçalho e Grid de Duas Colunas da Página de Artigos (Priority: P1) 🎯 MVP

**Goal**: Exibir o cabeçalho ("Artigos técnicos", subtítulo "Seleciona o tema.", linha divisória com gradiente ciano) e o grid principal de duas colunas (`.topic-columns`) alinhadas ao topo contendo os 13 grupos temáticos.

**Independent Test**: Acessar a rota da página "Artigos" e verificar se o cabeçalho e o grid de duas colunas são renderizados com exatidão tipográfica e estrutural.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Implementar os estilos do cabeçalho (`header h1`, `header .intro`, `header .rule`) em `pages/artigos/assets/css/artigos.css` com fonte Oswald, gradiente ciano e espaçamentos adequados
- [ ] T006 [US1] Implementar o grid de duas colunas (`.topic-columns`, `.column`) em `pages/artigos/artigos.astro` e estruturar os 13 grupos temáticos divididos entre coluna esquerda (1-6) e coluna direita (7-13)

**Checkpoint**: MVP do cabeçalho e grid principal concluído.

---

## Phase 4: User Story 2 - Exibição dos Grupos de Tópicos, Subgrupos e Acordeão Interativo (Priority: P1)

**Goal**: Implementar os cards de grupos de tópicos (`.topic-group`) com glassmorphism (`rgba(10, 25, 38, 0.75)`, backdrop blur, borda ciano translúcida, border-radius 18px), suporte a acordeão (Grupo 1 aberto por padrão, demais fechados com rotação de chevron), e subgrupos ('Redes Neurais Recorrentes', 'GCP', 'AWS', 'AZURE').

**Independent Test**: Verificar se os 13 grupos exibem seus ícones, títulos e chevrons corretos, e testar a abertura/fechamento dos acordeões de grupos e subgrupos.

### Implementation for User Story 2

- [ ] T007 [P] [US2] Implementar os estilos dos grupos de tópicos (`.topic-group`, `.group-toggle`, `.group-icon`, `.group-name`, `.chevron`, `.group-children`) em `pages/artigos/assets/css/artigos.css`
- [ ] T008 [US2] Implementar os estilos dos subgrupos (`.subgroup`, `.subgroup-toggle`, `.subgroup-marker`, `.subgroup-children`) em `pages/artigos/assets/css/artigos.css`
- [ ] T009 [US2] Conectar o comportamento de acordeão para grupos e subgrupos no script `pages/artigos/assets/js/artigos.js` manipulando classes `.open` e atributos `aria-expanded`

**Checkpoint**: Acordeões e grupos de tópicos totalmente interativos e estilizados.

---

## Phase 5: User Story 3 - Seleção de Subitens (Leafs), Feedback Visual e Redirecionamento (Priority: P2)

**Goal**: Implementar os subitens (`.leaf`) com marcador circular (`.leaf-bullet`), efeito hover de transição, estado de seleção (`.selected` com fundo `#dbeaf0`, cor `#091a24`, marcação `✓`), e redirecionamento assíncrono para `data-url` após 150ms.

**Independent Test**: Clicar em subitens de artigos e verificar a animação de seleção, aparição da marca de verificação e redirecionamento correto.

### Implementation for User Story 3

- [ ] T010 [P] [US3] Implementar os estilos dos subitens (`.leaf`, `.leaf-bullet`, `.leaf.selected`, `.check-mark`) em `pages/artigos/assets/css/artigos.css`
- [ ] T011 [US3] Implementar o manipulador de clique nos leafs em `pages/artigos/assets/js/artigos.js` para limpar seleções prévias, aplicar `.selected` e `✓`, e disparar o redirecionamento com `setTimeout` de 150ms

**Checkpoint**: Seleção de artigos e navegação testadas com sucesso.

---

## Phase 6: User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Garantir que o layout da página de artigos se ajuste perfeitamente a viewports de tablet e mobile (coluna única para `.topic-columns` abaixo de 850px e rodapé flexível abaixo de 540px).

**Independent Test**: Testar em viewports menores que 850px e 540px verificando o redimensionamento do grid e do rodapé.

### Implementation for User Story 4

- [ ] T012 [P] [US4] Implementar media queries em `pages/artigos/assets/css/artigos.css` para transformar `.topic-columns` em coluna única (`1fr`) abaixo de 850px e ajustar o layout do rodapé abaixo de 540px

**Checkpoint**: Layout responsivo verificado em desktop, tablet e mobile.

---

## Phase 7: Integração SPA e Validação Final

**Purpose**: Registrar a página no roteador SPA e validar a integridade da implementação.

- [ ] T013 Registrar a página de artigos em `pages/spa/artigos.astro` importando os estilos e scripts correspondentes para injeção sem recarregamento no `#page-content-host`
- [ ] T014 Realizar testes finais de validação visual e interativa da página de Artigos.
