---
description: "Lista de tarefas executáveis para a implementação da Página 'Formação'"
---

# Tasks: Estrutura e Estilização da Página "Formação" (`formacao.astro`)

**Input**: Documentos de design de `.specify/specs/spec-04_formacao/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  
**Tests**: Validação visual e de integração guiada por [spec.md](./spec.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/formacao/` conforme a Constituição v1.0.0.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura de diretórios e organização dos assets estáticos (logos institucionais e folha de estilo) da página de Formação.

- [x] T001 Criar a estrutura completa de pastas do módulo em `pages/formacao/` (`assets/css/`, `assets/images/`)
- [x] T002 [P] Validar e posicionar as logos institucionais (`logo-estacio.png`, `logo-estacio-uniradial.png`) em `pages/formacao/assets/images/`
- [x] T003 [P] Criar a folha de estilo base em `pages/formacao/assets/css/formacao.css` com as variáveis CSS de cores, gradientes verticais/horizontais, bordas e box-shadows

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção da página mestre e estrutura de layout base.

**⚠️ CRITICAL**: A casca da página e o invólucro do contêiner principal devem existir antes da integração das User Stories.

- [x] T004 Criar a página mestre da seção em `pages/formacao/formacao.astro` com o contêiner raiz `#page-content`, atributos `data-page-id="formacao"` e `data-page-title="Formação"`, importação da folha de estilos `formacao.css` e gradiente de fundo global `#16222A` a `#3A6073`

**Checkpoint**: Base e casca estrutural configuradas. As User Stories podem ser implementadas.

---

## Phase 3: User Story 1 - Visualização do Painel Principal e Título da Página de Formação (Priority: P1) 🎯 MVP

**Goal**: Exibir o painel principal (`.panel-container`) com largura máxima de 1200px, gradiente vertical de `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, border-radius 10px, box-shadow interna e padding de 20px, contendo o título "Formação" em Barlow Condensed 700 bold (32px desktop, cor `#000000`, margin-bottom 16px).

**Independent Test**: Acessar a rota da página "Formação" e verificar se o painel e o título são renderizados com precisão nas cores, gradiente, borda, sombra interna e tipografia Barlow Condensed.

### Implementation for User Story 1

- [x] T005 [P] [US1] Implementar os estilos do painel container (`.panel-container`) em `pages/formacao/assets/css/formacao.css` aplicando `max-width: 1200px`, gradiente vertical `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, `border-radius: 10px`, `box-shadow: inset 0px 0px 12px rgba(0,0,0,0.25)`, e `padding: 20px`
- [x] T006 [US1] Implementar o título principal (`.page-title`) em `pages/formacao/formacao.astro` e estilizar em `formacao.css` com fonte `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#000000`, e `margin-bottom: 16px`, exibindo o texto "Formação"

**Checkpoint**: MVP do painel principal e título concluído.

---

## Phase 4: User Story 2 - Exibição das Seções e Cards de Formação, Idiomas e Treinamentos (Priority: P1)

**Goal**: Organizar a página em 3 seções ('Acadêmica', 'Idiomas' e 'Treinamentos'), cada uma com seu título correspondente (`.section-title`), contendo cards estruturados com gradiente horizontal de `#FFF8D6` a `#FFFFFF`, borda `1px solid #0381B0`, border-radius 10px, drop shadow, contendo títulos de curso/item em Barlow Condensed 700 bold (24px) e badges em fonte monoespaçada uppercase.

**Independent Test**: Validar se as 3 seções são renderizadas com seus títulos e cards (incluindo logos na Acadêmica e exemplos em Idiomas e Treinamentos).

### Implementation for User Story 2

- [x] T007 [P] [US2] Implementar as 3 seções (`.formacao-section`) e títulos correspondentes (`.section-title`) para 'Acadêmica', 'Idiomas' e 'Treinamentos' em `pages/formacao/formacao.astro` e estilizar em `formacao.css`
- [x] T008 [P] [US2] Implementar os cards (`.cards-wrapper` e `.education-card`) com gradiente horizontal `#FFF8D6` a `#FFFFFF`, borda `1px solid #0381B0`, `border-radius: 10px`, `box-shadow: 0px 4px 6px rgba(0,0,0,0.1)`, `padding: 20px 16px`, e alinhamento centralizado em coluna
- [x] T009 [US2] Estilizar os elementos internos dos cards em `formacao.css`: logo (`.institution-logo`), título (`.course-title`, Barlow Condensed, 700 bold, 24px, `#000000`), e badge (`.period-badge`, fonte monoespaçada uppercase)
- [x] T010 [US2] Inserir no `formacao.astro` os cards da Seção Acadêmica (Ciência de Dados, Análise e Desenvolvimento de Sistemas), da Seção Idiomas (Inglês, Espanhol) e da Seção Treinamentos (Python Avançado para Machine Learning, Arquitetura de Microsserviços e Cloud)

**Checkpoint**: Seções e cards de Formação, Idiomas e Treinamentos totalmente funcionais e estilizados.

---

## Phase 5: User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Garantir que o layout se ajuste perfeitamente a viewports de tablet (768px a 1023px) e mobile (< 767px) com redimensionamento proporcional de padding, título e badges.

**Independent Test**: Testar em viewports de tablet e mobile validando o ajuste de padding, redução do `.page-title`, `.section-title`, `.course-title`, e `.period-badge` para dispositivos móveis.

### Implementation for User Story 4

- [x] T011 [P] [US4] Implementar media query para Tablet (`@media (min-width: 768px) and (max-width: 1023px)`) em `formacao.css` ajustando o padding do card para 16px
- [x] T012 [US4] Implementar media query para Mobile (`@media (max-width: 767px)`) em `formacao.css` configurando padding do painel para 16px, `.page-title` para 26px, `.section-title` para 22px, `.course-title` para 24px, e `.period-badge` para 12px com `padding: 4px 12px`

**Checkpoint**: Layout responsivo verificado em desktop, tablet e mobile.

---

## Phase 6: User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

**Goal**: Assegurar que a página `formacao.astro` seja carregada dinamicamente na SPA sem recarregamento de página, mantendo a Sidebar e atualizando os Breadcrumbs.

**Independent Test**: Clicar na opção de Formação na Sidebar e verificar a injeção instantânea no `#page-content-host` com os atributos data corretos (`data-page-id="formacao"` e `data-page-title="Formação"`).

### Implementation for User Story 3

- [x] T013 [US3] Validar e registrar a página `formacao.astro` no roteador do sistema (`router.js`) para carregamento assíncrono no `#page-content-host` com atualização automática dos Breadcrumbs
- [x] T014 [US3] Importar a folha de estilo `formacao.css` em `pages/spa/formacao.astro` para garantir o empacotamento e aplicação de estilos ao ser carregada no ambiente SPA.
- [x] T015 [US3] Encapsular o bloco `<style>` ou importação em `pages/spa/formacao.astro` para permitir que o roteador SPA capture e injete os conteúdos e estilos via `innerHTML` sem perda de formatação.

---
