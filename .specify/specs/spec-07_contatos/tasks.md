---
description: "Lista de tarefas executáveis para a implementação da Página 'Meus Contatos'"
---

# Tasks: Estrutura e Estilização da Página "Meus Contatos" (`contatos.astro`)

**Input**: Documentos de design de `.specify/specs/spec-07_contatos/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md)  
**Tests**: Validação visual e de integração guiada por [spec.md](./spec.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/contatos/` conforme a Constituição v1.0.0.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura de diretórios e organização dos assets estáticos (estilos e imagens/ícones) da página de Contatos.

- [x] T001 Criar a estrutura completa de pastas do módulo em `pages/contatos/` (`assets/css/`, `assets/images/`, `assets/js/`)
- [x] T002 [P] Criar a folha de estilo base em `pages/contatos/assets/css/contatos.css` com as variáveis CSS de cores (`--cyan`, `--cyan-soft`, `--navy`, `--panel`, `--line`, `--text`, `--muted`), gradientes radiais/lineares e estilos globais

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção da página mestre e estrutura de layout base.

**⚠️ CRITICAL**: A casca da página e o invólucro do contêiner principal devem existir antes da integração das User Stories.

- [x] T003 Criar a página mestre da seção em `pages/contatos/contatos.astro` com o contêiner raiz `#page-content`, atributos `data-page-id="contatos"` e `data-page-title="Meus Contatos"`, importação da folha de estilos `contatos.css` e gradiente de fundo global da página de contatos

---

## Phase 3: User Story 1 - Visualização do Cabeçalho e Eyebrow de Contatos (Priority: P1) 🎯 MVP

**Goal**: Exibir o contêiner principal `.contacts-page`, a barra *eyebrow* ("Canais de contato") com traço indicador em `--cyan`, e o título principal `h1` "Meus Contatos" em `Barlow Condensed` 700 bold (32px, cor `#ffffff`).

**Independent Test**: Acessar a rota da página de Contatos e verificar se o cabeçalho, eyebrow e título `h1` são renderizados com precisão nas cores, gradientes e tipografia Barlow Condensed.

### Implementation for User Story 1

- [x] T004 [P] [US1] Implementar os estilos do contêiner `.contacts-page` e do cabeçalho em `pages/contatos/assets/css/contatos.css` aplicando gradientes radiais/lineares, borda arredondada de 14px e padding responsivo (`clamp`)
- [x] T005 [US1] Implementar o componente de *eyebrow* ("Canais de contato") e o título `h1` "Meus Contatos" em `pages/contatos/contatos.astro` e estilizar em `contatos.css` com fonte `Barlow Condensed`, peso 700 bold, tamanho 32px e cor `#ffffff`

---

## Phase 4: User Story 2 - Exibição dos 6 Cards de Contatos e Redes Profissionais (Priority: P1)

**Goal**: Organizar os 6 cartões interativos (Telefone/WhatsApp, E-mail, LinkedIn, GitHub, Portfólio e Site Pessoal) em grade `.contact-grid` de 2 colunas, contendo ícones SVG (`48x48px`), rótulos em maiúsculas, valores em `Barlow Condensed` (24px) e setas de navegação.

**Independent Test**: Validar se a grade `.contact-grid` exibe os 6 cards com gradientes, bordas, ícones SVG e animações de hover corretas.

### Implementation for User Story 2

- [x] T006 [P] [US2] Implementar a grade `.contact-grid` em `pages/contatos/assets/css/contatos.css` com layout de 2 colunas (`repeat(2, minmax(0, 1fr))`) e `gap: 14px`
- [x] T007 [P] [US2] Estilizar os cards individuais (`.contact-card`), contêineres de ícones (`.icon-wrap`), rótulos (`.label`), valores (`.value`), detalhes (`.detail`) e setas de navegação (`.arrow`) com efeitos de hover (`transform: translateY(-3px)`)
- [x] T008 [US2] Inserir no `pages/contatos/contatos.astro` os 6 cards de contato com seus respectivos SVGs, links de destino (`tel:`, `mailto:`, URLs externas) e textos especificados em `meus_contatos.html`

---

## Phase 5: User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

**Goal**: Garantir que o layout de contatos se ajuste perfeitamente a viewports mobile e tablets (< 720px) com empilhamento de coluna única (`grid-template-columns: 1fr`).

**Independent Test**: Testar em viewports mobile (< 720px e < 380px) validando o rearranjo da grade para 1 coluna e ajuste de padding e tamanhos.

### Implementation for User Story 4

- [x] T009 [P] [US4] Implementar media query para Tablet / Mobile (`@media (max-width: 720px)`) em `contatos.css` ajustando a grade para 1 coluna (`1fr`), espaçamento de 11px e padding do contêiner
- [x] T010 [US4] Implementar media query para telas ultra-estreitas (`@media (max-width: 380px)`) ajustando dimensões dos ícones e tamanhos de fonte dos valores para 18px

---

## Phase 6: User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

**Goal**: Assegurar que a página `contatos.astro` seja carregada dinamicamente na SPA sem recarregamento de página, mantendo a Sidebar e atualizando os Breadcrumbs.

**Independent Test**: Clicar na opção de Contatos na Sidebar e verificar a injeção instantânea diretamente no container `.contacts-page` com os atributos data corretos (`data-page-id="contatos"` e `data-page-title="Meus Contatos"`).

### Implementation for User Story 3

- [x] T011 [US3] Validar e registrar a página `contatos.astro` no roteador do sistema (`router.js`) para carregamento assíncrono diretamente no container `.contacts-page` com atualização automática dos Breadcrumbs
- [x] T012 [US3] Importar a folha de estilo `contatos.css` em `pages/spa/contatos.astro` para garantir o empacotamento e aplicação de estilos ao ser carregada no ambiente SPA.
- [x] T013 [US3] Encapsular o bloco `<style>` ou importação em `pages/spa/contatos.astro` para permitir que o roteador SPA capture e injete os conteúdos e estilos via `innerHTML` sem perda de formatação.
