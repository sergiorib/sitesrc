---
description: "Lista de tarefas executáveis para a implementação da Página Principal SPA"
---

# Tasks: Estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container)

**Input**: Documentos de design de `.specify/specs/spec-01_pagina_spa/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/router-contract.md](./contracts/router-contract.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md), [quickstart.md](./quickstart.md)  
**Tests**: Validação guiada por cenários de aceitação em [quickstart.md](./quickstart.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [ ] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e rigorosamente isolados em `pages/spa/` conforme a Constituição v1.0.0.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura de diretórios e arquivos de configuração base em `pages/spa/`.

- [ ] T001 Criar a estrutura completa de diretórios do módulo em `pages/spa/` (`components/`, `assets/css/`, `assets/js/`, `assets/images/`)
- [ ] T002 [P] Configurar a folha de estilo de reset e importação da tipografia Barlow Condensed (pesos 400, 600) em `pages/spa/assets/css/spa-layout.css`
- [ ] T003 [P] Criar o arquivo de constantes de navegação e mapeamento de ícones claros e escuros em `pages/spa/assets/js/nav.js`

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Estruturação do esqueleto HTML/Astro mestre e contêineres principais da SPA antes do detalhamento dos componentes de navegação.

**⚠️ CRITICAL**: Nenhuma User Story pode ser finalizada sem que a estrutura mestre e o contêiner alvo existam.

- [ ] T004 Estruturar o layout base da SPA em `pages/spa/spa.astro` com a casca HTML5 em 100vw e 100vh, divisão horizontal entre Sidebar (300px) e Main Container, e injeção dos assets locais
- [ ] T005 [P] Implementar as regras de layout de grid e flexbox para 100vw x 100vh em `pages/spa/assets/css/spa-layout.css`
- [ ] T006 [P] Criar o componente do contêiner principal em `pages/spa/components/MainContainer.astro` estruturando `#main-container` e a seção de injeção dinâmica `#page-content-host`
- [ ] T007 [P] Implementar os estilos do contêiner principal em `pages/spa/assets/css/main-container.css` com rolagem vertical interna dedicada e tema Dark Tech

**Checkpoint**: Base de visualização pronta. O desenvolvimento dos componentes e da navegação pode prosseguir.

---

## Phase 3: User Story 1 - Acesso Inicial e Renderização do Layout Base (Priority: P1) 🎯 MVP

**Goal**: Carregar a SPA em tela cheia com a Sidebar completa (identidade profissional de Sérgio Ribeiro Cerqueira e menu com "Sobre" ativo) e o Main Container renderizando o conteúdo inicial de "Sobre".

**Independent Test**: Abrir `pages/spa/spa.astro` no navegador. Verificar se a tela ocupa 100vw/100vh, a Sidebar de 300px exibe o cabeçalho de 275px com foto circular (160px), nome e profissão legíveis com faixa de contraste, botão "Sobre" ativo com ícone escuro, e o Main Container exibe o conteúdo de `sobre.astro`.

### Implementation for User Story 1

- [ ] T008 [P] [US1] Implementar o componente `pages/spa/components/IdentityHeader.astro` com contêiner de 275px, foto de perfil circular de 160px centralizada com moldura em gradiente vertical (`#3893BA` a `#25797F`), faixa de contraste escurecida `#061B2A` e textos "Sérgio Ribeiro Cerqueira" (30px) e "Cientista de Dados" (25px) em Barlow Condensed 600
- [ ] T009 [P] [US1] Implementar o componente de item de menu em `pages/spa/components/NavItem.astro` com altura de 50px, border-radius 20px, largura ~93%, suporte aos pares de ícones claro/escuro e alternância da classe `.active`
- [ ] T010 [US1] Implementar o contêiner de navegação em `pages/spa/components/NavMenu.astro` instanciando os 6 itens de menu ("Sobre", "Histórico", "Formação", "Portfólio", "Artigos", "Contatos") com fundo `#16222A`, borda `#69C4CE`, fundo `menu-bg.png` e item "Sobre" ativo por padrão
- [ ] T011 [US1] Montar o componente unificado da Sidebar em `pages/spa/components/Sidebar.astro` integrando `IdentityHeader.astro` e `NavMenu.astro` sob o elemento `<aside id="sidebar">` de 300px fixos
- [ ] T012 [P] [US1] Implementar os estilos da Sidebar, cabeçalho de perfil e estados dos botões (não selecionado: `#061B2A` / texto `#EDF2EE`; selecionado: `#B3CBDB` / texto `#061B2A`) em `pages/spa/assets/css/sidebar.css`
- [ ] T013 [P] [US1] Criar a página de conteúdo inicial padrão em `pages/spa/sobre.astro` com a estrutura semântica da seção "Sobre" para carga inicial no Main Container
- [ ] T014 [US1] Integrar `Sidebar.astro` e a injeção inicial de `sobre.astro` no layout mestre `pages/spa/spa.astro`

**Checkpoint**: MVP concluído. A página principal SPA carrega com identidade visual completa, layout estável e conteúdo padrão renderizado.

---

## Phase 4: User Story 2 - Navegação Fluida entre Páginas Primárias sem Recarregamento (Priority: P1)

**Goal**: Permitir alternância fluida entre as 6 seções primárias ao clicar nos itens da Sidebar, atualizando visualmente o botão ativo, trocando o ícone para a versão escura, sincronizando a URL via History API e atualizando o Main Container sem recarregar a Sidebar.

**Independent Test**: Clicar sequencialmente nos 6 itens da Sidebar. Validar se a Sidebar permanece completamente imóvel (*zero full page reloads*), o botão clicado torna-se ativo (`#B3CBDB`, ícone escuro), o botão anterior volta ao estado inativo, a URL é atualizada e os botões "Voltar" e "Avançar" do navegador restauram os conteúdos e seleções correspondentes.

### Implementation for User Story 2

- [ ] T015 [P] [US2] Criar as páginas de conteúdo estático para as demais seções primárias em `pages/spa/historico.astro`, `pages/spa/formacao.astro`, `pages/spa/portfolio.astro`, `pages/spa/artigos.astro` e `pages/spa/contatos.astro`
- [ ] T016 [US2] Implementar as funções de manipulação de classe ativa e alternância dos ícones claro/escuro no script `pages/spa/assets/js/nav.js`
- [ ] T017 [US2] Implementar o roteador Vanilla JS em `pages/spa/assets/js/router.js` com delegação global de eventos (`document.addEventListener('click')`), captura de cliques em `<a>` internos, cancelamento de recarregamento com `e.preventDefault()`, requisição assíncrona com `fetch()` e injeção do fragmento extraído em `#page-content-host`
- [ ] T018 [US2] Adicionar ao roteador `pages/spa/assets/js/router.js` a sincronização de histórico via `window.history.pushState` e o listener do evento `popstate` para suporte completo aos botões Voltar/Avançar do navegador
- [ ] T019 [US2] Integrar os scripts `router.js` e `nav.js` no arquivo `pages/spa/spa.astro` e inicializar o ciclo de vida do roteador após o carregamento do DOM

**Checkpoint**: Navegação SPA funcional e fluida entre todas as páginas primárias sem reload de tela.

---

## Phase 5: User Story 3 - Navegação Hierárquica por Breadcrumbs em Linha Única (Priority: P2)

**Goal**: Exibir uma régua discreta no topo do Main Container no formato `pagina1 / pagina2 / ...`, atualizada dinamicamente a cada mudança de rota, com links clicáveis nos níveis ancestrais que disparam navegação SPA de retorno.

**Independent Test**: Navegar para diferentes rotas primárias e subpáginas; confirmar que a régua de Breadcrumbs no topo exibe a trilha horizontal formatada com separador `/`, e que clicar em um elo anterior da trilha faz a SPA retornar à página correspondente sem recarregar a tela.

### Implementation for User Story 3

- [ ] T020 [P] [US3] Implementar o componente Astro da régua de navegação em `pages/spa/components/Breadcrumbs.astro` com contêiner `<nav id="breadcrumbs">`, lista ordenada horizontal e separadores visuais `/`
- [ ] T021 [P] [US3] Implementar a folha de estilo da régua de Breadcrumbs em `pages/spa/assets/css/breadcrumbs.css` garantindo tipografia discreta, alinhamento em linha única e integração com a paleta escura
- [ ] T022 [US3] Implementar o módulo `pages/spa/assets/js/breadcrumbs.js` com a lógica de decomposição de rotas em segmentos hierárquicos, geração dinâmica de links clicáveis e marcação do segmento terminal inativo
- [ ] T023 [US3] Conectar o utilitário `pages/spa/assets/js/breadcrumbs.js` ao ciclo de navegação em `pages/spa/assets/js/router.js`, atualizando a régua automaticamente a cada transição de rota

**Checkpoint**: Breadcrumbs integrados e sincronizados com a navegação SPA em tempo real.

---

## Phase 6: User Story 4 - Descoberta Dinâmica de Subpáginas e Tratamento de Rota Inexistente / Fallback (Priority: P2)

**Goal**: Garantir que o roteador busque e renderize dinamicamente qualquer subpágina interna adicionada em cascata sob `pages/` (mantendo o item do menu primário pai selecionado), e exiba elegantemente a página de fallback `pages/spa/default.astro` em caso de rota 404 ou falha de carregamento.

**Independent Test**: Clicar em um link direcionado a uma subpágina aninhada (ex: `subpagina-demo.astro`) e verificar se o menu pai permanece selecionado; em seguida, requisitar uma rota inválida e validar se `default.astro` é carregado no Main Container sem travar a Sidebar.

### Implementation for User Story 4

- [ ] T024 [P] [US4] Criar a página de fallback para rota inexistente em `pages/spa/default.astro` com mensagem "Página não encontrada" estilizada e link de retorno para a tela "Sobre"
- [ ] T025 [US4] Implementar no roteador `pages/spa/assets/js/router.js` a identificação automática do nó raiz da rota para manter o item pai correspondente na Sidebar com a classe `.active` durante a navegação em subpáginas
- [ ] T026 [US4] Implementar no roteador `pages/spa/assets/js/router.js` o interceptador de erro HTTP (`!response.ok` ou erro de rede) que carrega assincronamente o conteúdo de `pages/spa/default.astro` no `#page-content-host`
- [ ] T027 [P] [US4] Criar uma subpágina de teste em `pages/spa/subpagina-demo.astro` contendo links internos e link inválido para validar a descoberta dinâmica e o acionamento do fallback 404

**Checkpoint**: Roteamento dinâmico resiliente com suporte a subpáginas e proteção contra erros 404 implementado.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificação global de qualidade, responsividade e conformidade constitucional.

- [ ] T028 [P] Validar o enquadramento rígido do layout em 100vw x 100vh em `pages/spa/assets/css/spa-layout.css` e a ausência de vazamento de scroll da janela
- [ ] T029 Executar todos os 5 cenários de teste descritos em `.specify/specs/spec-01_pagina_spa/quickstart.md`
- [ ] T030 Validar conformidade estrita com a Constituição v1.0.0 em todo o código gerado (zero frameworks JS client-side, zero CSS-in-JS/Tailwind, isolamento total em `pages/spa/`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências externas — inicia imediatamente.
- **Foundational (Phase 2)**: Depende da criação da estrutura em Phase 1 — BLOQUEIA a integração das User Stories.
- **User Story 1 (Phase 3 - P1 / MVP)**: Depende de Phase 1 e Phase 2 — Estabelece a visualização e os componentes base.
- **User Story 2 (Phase 4 - P1)**: Depende de User Story 1 (menu e contêiner precisam existir para o roteador injetar páginas).
- **User Story 3 (Phase 5 - P2)**: Depende do roteador de User Story 2 para sincronizar a régua de Breadcrumbs.
- **User Story 4 (Phase 6 - P2)**: Depende do roteador de User Story 2 para integrar o fallback 404 e subpáginas em cascata.
- **Polish (Phase 7)**: Depende da conclusão de todas as User Stories anteriores.

### Parallel Opportunities

- **Fase 1 (Setup)**: `T002` e `T003` podem ser desenvolvidas em paralelo.
- **Fase 2 (Foundational)**: `T005`, `T006` e `T007` podem ser desenvolvidas em paralelo.
- **Fase 3 (User Story 1)**: `T008` (IdentityHeader), `T009` (NavItem), `T012` (sidebar.css) e `T013` (sobre.astro) podem ser implementadas simultaneamente por serem arquivos isolados.
- **Fase 4 (User Story 2)**: `T015` (criação das páginas estáticas) pode ser feita em paralelo com `T016` (nav.js).
- **Fase 5 (User Story 3)**: `T020` (Breadcrumbs.astro) e `T021` (breadcrumbs.css) podem rodar em paralelo.
- **Fase 6 (User Story 4)**: `T024` (default.astro) e `T027` (subpagina-demo.astro) podem ser criadas em paralelo.

---

## Parallel Example: User Story 1

```bash
# Execução paralela de componentes estáticos e folhas de estilo desacopladas:
Task T008: "Implementar o componente pages/spa/components/IdentityHeader.astro"
Task T009: "Implementar o componente de item de menu em pages/spa/components/NavItem.astro"
Task T012: "Implementar os estilos da Sidebar em pages/spa/assets/css/sidebar.css"
Task T013: "Criar a página de conteúdo inicial padrão em pages/spa/sobre.astro"
```

---

## Implementation Strategy

### MVP First (Fases 1, 2 e 3)

1. Concluir a infraestrutura de pastas e layout base em 100vw/100vh.
2. Implementar os componentes da Sidebar (`IdentityHeader` e `NavMenu`).
3. Renderizar a página inicial `sobre.astro` no `#main-content`.
4. **Validar MVP**: Layout visualmente impecável, Sidebar estática de 300px com foto circular (160px) em moldura com gradiente, e texto legível com contraste.

### Entrega Incremental

1. **Incremento 1 (MVP)**: Layout base + Sidebar fixa + conteúdo inicial "Sobre" (US1).
2. **Incremento 2**: Roteador Vanilla JS + transição SPA sem reload + History API entre as 6 páginas primárias (US2).
3. **Incremento 3**: Régua dinâmica de Breadcrumbs em linha única com retorno navegável (US3).
4. **Incremento 4**: Descoberta dinâmica de subpáginas em cascata e fallback resiliente 404 com `default.astro` (US4).
5. **Incremento 5**: Polimento final, auditoria constitucional e testes de aceitação (Polish).
