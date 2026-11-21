---
description: "Lista de tarefas executáveis para a implementação da Página Principal SPA"
---

# Tasks: Estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container)

**Input**: Documentos de design de `.specify/specs/spec-01_spa/`  
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

- [X] T001 Criar a estrutura completa de diretórios do módulo em `pages/spa/` (`components/`, `assets/css/`, `assets/js/`, `assets/images/`)
- [X] T002 [P] Configurar a folha de estilo de reset e importação da tipografia Barlow Condensed (pesos 400, 600) em `pages/spa/assets/css/spa-layout.css`
- [X] T003 [P] Criar o arquivo de constantes de navegação e mapeamento de ícones claros e escuros em `pages/spa/assets/js/nav.js`

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Estruturação do esqueleto HTML/Astro mestre e contêineres principais da SPA antes do detalhamento dos componentes de navegação.

**⚠️ CRITICAL**: Nenhuma User Story pode ser finalizada sem que a estrutura mestre e o contêiner alvo existam.

- [X] T004 Estruturar o layout base da SPA em `pages/spa/spa.astro` com a casca HTML5 em 100vw e 100vh, divisão horizontal entre Sidebar (300px) e Main Container, e injeção dos assets locais
- [X] T005 [P] Implementar as regras de layout de grid e flexbox para 100vw x 100vh em `pages/spa/assets/css/spa-layout.css`
- [X] T006 [P] Criar o componente do contêiner principal em `pages/spa/components/MainContainer.astro` estruturando `#main-container` e a seção de injeção dinâmica `#page-content-host`
- [X] T007 [P] Implementar os estilos do contêiner principal em `pages/spa/assets/css/main-container.css` com rolagem vertical interna dedicada e tema Dark Tech

**Checkpoint**: Base de visualização pronta. O desenvolvimento dos componentes e da navegação pode prosseguir.

---

## Phase 3: User Story 1 - Acesso Inicial e Renderização do Layout Base (Priority: P1) 🎯 MVP

**Goal**: Carregar a SPA em tela cheia com a Sidebar completa (identidade profissional de Sérgio Ribeiro Cerqueira e menu com "Sobre" ativo) e o Main Container renderizando o conteúdo inicial de "Sobre".

**Independent Test**: Abrir `pages/spa/spa.astro` no navegador. Verificar se a tela ocupa 100vw/100vh, a Sidebar de 300px exibe o cabeçalho de 275px com foto circular (160px), nome e profissão legíveis com faixa de contraste, botão "Sobre" ativo com ícone escuro, e o Main Container exibe o conteúdo de `sobre.astro`.

### Implementation for User Story 1

- [X] T008 [P] [US1] Implementar o componente `pages/spa/components/IdentityHeader.astro` com contêiner de 275px, foto de perfil circular de 160px centralizada com moldura em gradiente vertical (`#3893BA` a `#25797F`), faixa de contraste escurecida `#061B2A` e textos "Sérgio Ribeiro Cerqueira" (30px) e "Cientista de Dados" (25px) em Barlow Condensed 600
- [X] T009 [P] [US1] Implementar o componente de item de menu em `pages/spa/components/NavItem.astro` com altura de 50px, border-radius 20px, largura ~93%, suporte aos pares de ícones claro/escuro e alternância da classe `.active`
- [X] T010 [US1] Implementar o contêiner de navegação em `pages/spa/components/NavMenu.astro` instanciando os 6 itens de menu ("Sobre", "Histórico", "Formação", "Portfólio", "Artigos", "Contatos") com fundo `#16222A`, borda `#69C4CE`, fundo `menu-bg.png` e item "Sobre" ativo por padrão
- [X] T011 [US1] Montar o componente unificado da Sidebar em `pages/spa/components/Sidebar.astro` integrando `IdentityHeader.astro` e `NavMenu.astro` sob o elemento `<aside id="sidebar">` de 300px fixos
- [X] T012 [P] [US1] Implementar os estilos da Sidebar, cabeçalho de perfil e estados dos botões (não selecionado: `#061B2A` / texto `#EDF2EE`; selecionado: `#B3CBDB` / texto `#061B2A`) em `pages/spa/assets/css/sidebar.css`
- [X] T013 [P] [US1] Criar a página de conteúdo inicial padrão em `pages/spa/sobre.astro` com a estrutura semântica da seção "Sobre" para carga inicial no Main Container
- [X] T014 [US1] Integrar `Sidebar.astro` e a injeção inicial de `sobre.astro` no layout mestre `pages/spa/spa.astro`

**Checkpoint**: MVP concluído. A página principal SPA carrega com identidade visual completa, layout estável e conteúdo padrão renderizado.

---

## Phase 4: User Story 2 - Navegação Fluida entre Páginas Primárias sem Recarregamento (Priority: P1)

**Goal**: Permitir alternância fluida entre as 6 seções primárias ao clicar nos itens da Sidebar, atualizando visualmente o botão ativo, trocando o ícone para a versão escura, sincronizando a URL via History API e atualizando o Main Container sem recarregar a Sidebar.

**Independent Test**: Clicar sequencialmente nos 6 itens da Sidebar. Validar se a Sidebar permanece completamente imóvel (*zero full page reloads*), o botão clicado torna-se ativo (`#B3CBDB`, ícone escuro), o botão anterior volta ao estado inativo, a URL é atualizada e os botões "Voltar" e "Avançar" do navegador restauram os conteúdos e seleções correspondentes.

### Implementation for User Story 2

- [X] T015 [P] [US2] Criar as páginas de conteúdo estático para as demais seções primárias em `pages/spa/historico.astro`, `pages/spa/formacao.astro`, `pages/spa/portfolio.astro`, `pages/spa/artigos.astro` e `pages/spa/contatos.astro`
- [X] T016 [US2] Implementar as funções de manipulação de classe ativa e alternância dos ícones claro/escuro no script `pages/spa/assets/js/nav.js`
- [X] T017 [US2] Implementar o roteador Vanilla JS em `pages/spa/assets/js/router.js` com delegação global de eventos (`document.addEventListener('click')`), captura de cliques em `<a>` internos, cancelamento de recarregamento com `e.preventDefault()`, requisição assíncrona com `fetch()` e injeção do fragmento extraído em `#page-content-host`
- [X] T018 [US2] Adicionar ao roteador `pages/spa/assets/js/router.js` a sincronização de histórico via `window.history.pushState` e o listener do evento `popstate` para suporte completo aos botões Voltar/Avançar do navegador
- [X] T019 [US2] Integrar os scripts `router.js` e `nav.js` no arquivo `pages/spa/spa.astro` e inicializar o ciclo de vida do roteador após o carregamento do DOM

**Checkpoint**: Navegação SPA funcional e fluida entre todas as páginas primárias sem reload de tela.

---

## Phase 5: User Story 3 - Navegação Hierárquica por Breadcrumbs em Linha Única (Priority: P2)

**Goal**: Exibir uma régua discreta no topo do Main Container no formato `pagina1 / pagina2 / ...`, atualizada dinamicamente a cada mudança de rota, com links clicáveis nos níveis ancestrais que disparam navegação SPA de retorno.

**Independent Test**: Navegar para diferentes rotas primárias e subpáginas; confirmar que a régua de Breadcrumbs no topo exibe a trilha horizontal formatada com separador `/`, e que clicar em um elo anterior da trilha faz a SPA retornar à página correspondente sem recarregar a tela.

### Implementation for User Story 3

- [X] T020 [P] [US3] Implementar o componente Astro da régua de navegação em `pages/spa/components/Breadcrumbs.astro` com contêiner `<nav id="breadcrumbs">`, lista ordenada horizontal e separadores visuais `/`
- [X] T021 [P] [US3] Implementar a folha de estilo da régua de Breadcrumbs em `pages/spa/assets/css/breadcrumbs.css` garantindo tipografia discreta, alinhamento em linha única e integração com a paleta escura
- [X] T022 [US3] Implementar o módulo `pages/spa/assets/js/breadcrumbs.js` com a lógica de decomposição de rotas em segmentos hierárquicos, geração dinâmica de links clicáveis e marcação do segmento terminal inativo
- [X] T023 [US3] Conectar o utilitário `pages/spa/assets/js/breadcrumbs.js` ao ciclo de navegação em `pages/spa/assets/js/router.js`, atualizando a régua automaticamente a cada transição de rota

**Checkpoint**: Breadcrumbs integrados e sincronizados com a navegação SPA em tempo real.

---

## Phase 6: User Story 4 - Descoberta Dinâmica de Subpáginas e Tratamento de Rota Inexistente / Fallback (Priority: P2)

**Goal**: Garantir que o roteador busque e renderize dinamicamente qualquer subpágina interna adicionada em cascata sob `pages/` (mantendo o item do menu primário pai selecionado), e exiba elegantemente a página de fallback `pages/spa/default.astro` em caso de rota 404 ou falha de carregamento.

**Independent Test**: Clicar em um link direcionado a uma subpágina aninhada (ex: `subpagina-demo.astro`) e verificar se o menu pai permanece selecionado; em seguida, requisitar uma rota inválida e validar se `default.astro` é carregado no Main Container sem travar a Sidebar.

### Implementation for User Story 4

- [X] T024 [P] [US4] Criar a página de fallback para rota inexistente em `pages/spa/default.astro` com mensagem "Página não encontrada" estilizada e link de retorno para a tela "Sobre"
- [X] T025 [US4] Implementar no roteador `pages/spa/assets/js/router.js` a identificação automática do nó raiz da rota para manter o item pai correspondente na Sidebar com a classe `.active` durante a navegação em subpáginas
- [X] T026 [US4] Implementar no roteador `pages/spa/assets/js/router.js` o interceptador de erro HTTP (`!response.ok` ou erro de rede) que carrega assincronamente o conteúdo de `pages/spa/default.astro` no `#page-content-host`
- [X] T027 [P] [US4] Criar uma subpágina de teste em `pages/spa/subpagina-demo.astro` contendo links internos e link inválido para validar a descoberta dinâmica e o acionamento do fallback 404

**Checkpoint**: Roteamento dinâmico resiliente com suporte a subpáginas e proteção contra erros 404 implementado.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificação global de qualidade, responsividade e conformidade constitucional.

- [X] T028 [P] Validar o enquadramento rígido do layout em 100vw x 100vh em `pages/spa/assets/css/spa-layout.css` e a ausência de vazamento de scroll da janela
- [X] T029 Executar todos os 5 cenários de teste descritos em `.specify/specs/spec-01_spa/quickstart.md`
- [X] T030 Validar conformidade estrita com a Constituição v1.0.0 em todo o código gerado (zero frameworks JS client-side, zero CSS-in-JS/Tailwind, isolamento total em `pages/spa/`)

---

## Phase 8: Dimensionamento Fluido (FR-019 a FR-022, SC-007, SC-008 — Constituição v1.1.0, Princípio VI)

**Goal**: Centralizar a escala da aplicação em `pages/spa/assets/css/scale.css` e refatorar todo o CSS já implementado (shell da SPA e as 6 páginas) para consumir os tokens fluidos, com breakpoints mobile-first e arranjo vertical da Sidebar abaixo de 1024px. Referência técnica: seção **Dimensionamento Fluido** do [plan.md](./plan.md).

**Independent Test**: Em DevTools (modo responsivo, zoom 100%), percorrer as 6 páginas em 375, 768, 1280, 1366, 1536 e 1920px: nenhuma rolagem horizontal, textos e espaçamentos equilibrados; abaixo de 1024px a Sidebar aparece como cabeçalho compacto com menu horizontal; com fonte padrão do navegador em 20px, os textos ampliam sem sobreposição.

### 8.1 Estrutura e Assets

- [X] T031 Criar `pages/spa/assets/css/scale.css` com, em `:root` e abordagem mobile-first: tokens de tipografia `--fs-sm`, `--fs-base`, `--fs-md`, `--fs-lg`, `--fs-xl`, `--fs-2xl`, `--fs-3xl`, `--fs-hero`; tokens de espaçamento `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-2xl`; `--container-max: min(1200px, 92vw)`; tokens de layout `--sidebar-width`, `--identity-header-height`, `--profile-photo-size`, `--nav-item-height` e `--portfolio-header-h` (valor inicial para antes da medição); tokens de ícones e logos `--icon-xs`, `--icon-sm`, `--icon-md`, `--icon-lg` e `--logo-h`; valores por faixa conforme as tabelas do plano (`clamp()` em `rem`, calibrado 1280px → 1920px); comentário de convenção dos breakpoints 480/768/1024/1280/1536/1920px; regra base `img { max-width: 100%; height: auto; }`
- [X] T032 Remover de `pages/spa/assets/css/spa-layout.css` os tokens `--sidebar-width` e `--identity-header-height` (migrados para `scale.css`), substituir `width: 100vw` por `width: 100%` em `html, body` e garantir ausência de `font-size` em px, `zoom` e `transform: scale()` em `html`/`body`

### 8.2 Markup Astro

- [X] T033 Importar `./assets/css/scale.css` no frontmatter de `pages/spa/spa.astro`, antes de `./assets/css/spa-layout.css`
- [X] T034 [P] Importar `./assets/css/scale.css` no frontmatter dos wrappers `pages/spa/sobre.astro`, `pages/spa/historico.astro`, `pages/spa/formacao.astro`, `pages/spa/portfolio.astro`, `pages/spa/artigos.astro` e `pages/spa/contatos.astro` (tokens disponíveis também com o fragmento aberto isoladamente)

### 8.3 Estilização CSS — Shell da SPA

- [X] T035 [P] Refatorar `pages/spa/assets/css/sidebar.css` substituindo tamanhos fixos pelos tokens: nome (30px) e cargo (25px) → `--fs-2xl`/`--fs-xl`, rótulos do menu (22px) → `--fs-lg`, foto e moldura (160/168px) → `--profile-photo-size`, altura dos itens (50px) → `--nav-item-height`, ícones do menu (24px) → `--icon-md`, `border-radius` (20px) → `rem`, paddings/margins/gaps → `--space-*`; fallbacks `var(--sidebar-width, 300px)` passam a usar só o token
- [X] T036 Implementar o arranjo vertical abaixo de 1024px (FR-022) em `pages/spa/assets/css/spa-layout.css` e `pages/spa/assets/css/sidebar.css`: base mobile-first com `.spa-layout` em coluna, Sidebar como cabeçalho compacto (foto reduzida, nome e cargo) e menu em faixa horizontal com `overflow-x: auto` própria e itens com largura ajustada ao conteúdo (`width: auto`, `white-space: nowrap`), altura `--nav-item-height`, raio do FR-007 e `gap: var(--space-sm)`, preservando estados ativo/inativo e ícones; Breadcrumbs permanecem no topo do Main Container; `@media (min-width: 1024px)` restaura o arranjo lateral com `--sidebar-width` (depende de T035)
- [X] T037 [P] Refatorar `pages/spa/assets/css/main-container.css`: paddings `32px 40px` e `padding-left/right: 40px` (modo portfólio) → `--space-*`, mantendo rolagem vertical interna nos dois arranjos e `padding-top: 0` do modo portfólio
- [X] T038 [P] Refatorar `pages/spa/assets/css/breadcrumbs.css`: fontes 15px/14px → `--fs-base`/`--fs-sm`, espaçamentos → `--space-*`

### 8.4 Estilização CSS — Páginas existentes

- [X] T039 [P] Refatorar `pages/sobre/assets/css/sobre.css`: fontes, paddings, margins e gaps → tokens (títulos 32px → `--fs-3xl`, biografia 22px → `--fs-lg`, subtítulos 24px → `--fs-xl`, cards 15/14px → `--fs-base`/`--fs-sm`); ícones de tecnologia 18px → `--icon-sm` (com a reserva de espaço do ícone ausente), estrelas SVG 13px → `--icon-xs`, `border-radius` → `rem`; converter `max-width: 1200px`/`767px` para `min-width: 768px` (2 colunas) e `min-width: 1280px` (4 colunas Hard-Skills)
- [X] T040 [P] Refatorar `pages/historico/assets/css/historico.css`: título 32px → `--fs-3xl`, cargo 30px → `--fs-2xl`, descrição 22px e badges/escudos 20px → `--fs-lg`, logo 100/80px → `--logo-h`, `border-radius` → `rem`, paddings/gaps → `--space-*`; converter `767px` e `768–1023px` para `min-width: 768px` e `min-width: 1024px`
- [X] T041 [P] Refatorar `pages/formacao/assets/css/formacao.css`: títulos 32/28/24px → `--fs-3xl`/`--fs-2xl`/`--fs-xl`, badge 20px → `--fs-lg`, paddings/gaps → `--space-*`, `max-width: 1200px` → `var(--container-max)`; converter `767px` e `768–1023px` para `min-width: 768px` e `min-width: 1024px`
- [X] T042 [P] Refatorar `pages/portfolio/assets/css/portfolio.css`: título 36px → `--fs-hero`, categoria 24px → `--fs-xl`, botões 14/16px → `--fs-base`/`--fs-md`, nome 18px → `--fs-md`, resumo 14px → `--fs-base`, tags 12px → `--fs-sm`, paddings/gaps → `--space-*`; `scroll-margin-top: 185px` → `calc(var(--portfolio-header-h) + 35px)`; manter `transform: scale(1.02)` do hover da imagem; converter `767px`/`768–1023px` para `min-width: 768px`/`1024px`
- [X] T043 [P] Refatorar `pages/artigos/assets/css/artigos.css`: `h1 clamp(28px, 3.5vw, 40px)` → `--fs-hero`, base 15px → `--fs-base`, grupos 17px → `--fs-md`, itens 14px e rodapé 12px → `--fs-sm`, ícones/chevron 18px → `--fs-md`, `.app` `max-width: 1200px` e `padding: 32px 36px` → `--container-max`/`--space-*`, margens do cabeçalho/rodapé → `--space-*`; converter `850px`/`540px` para `min-width: 1024px` (2 colunas) e `min-width: 480px` (rodapé horizontal)
- [X] T044 [P] Refatorar `pages/contatos/assets/css/contatos.css`: título 32px → `--fs-3xl`, valor 32px → `--fs-3xl`, rótulo 24px → `--fs-xl`, detalhe 15/11px → `--fs-base`/`--fs-sm`, padding `clamp()` local da `.contacts-page` → `--space-*`, contêiner de ícone 48/42px → `--icon-lg`, SVG 23px → `--icon-md`, `border-radius` → `rem`; converter `719px`/`379px` para `min-width: 768px` (2 colunas) e `min-width: 480px` (ícone 48px)

### 8.5 Interatividade JS

- [X] T045 Atualizar `pages/portfolio/assets/js/portfolio.js` para medir `header.offsetHeight`, publicar o valor em `--portfolio-header-h` no `.portfolio-page-wrapper` e derivar o `rootMargin` do scroll-spy (hoje `SPY_ROOT_MARGIN = '-160px 0px -40% 0px'`) de `-(offsetHeight + HEADER_GAP)`; recalcular e recriar o `IntersectionObserver` quando a altura do cabeçalho mudar (`ResizeObserver`), mantendo a idempotência de `initPortfolioNavigation` (depende de T042)
- [X] T046 [P] Revisar `scrollToAnchor()` em `pages/spa/assets/js/router.js` para que a folga use exclusivamente `header.offsetHeight + 35px` medido no momento da rolagem (o valor `140` permanece apenas como fallback sem cabeçalho)
- [X] T053 Atualizar `pages/spa/assets/js/nav.js` para, após cada troca do item ativo, manter o item ativo visível na faixa horizontal de navegação abaixo de 1024px (`scrollIntoView({ inline: 'nearest', block: 'nearest' })` limitado ao contêiner do menu), sem alterar estados nem ícones (FR-022; depende de T036)

### 8.6 Validação e Build

- [X] T047 Executar `npm run build` e confirmar compilação sem erros após T031–T046 e T053
- [X] T048 [P] Varredura estática em `pages/spa/assets/css/`, `pages/{sobre,historico,formacao,portfolio,artigos,contatos}/assets/css/`: zero `font-size` em px, zero px em `padding`/`margin`/`gap`/`border-radius`/larguras e alturas de componentes (px aceito apenas na espessura de `border`/`outline`, em `box-shadow`/`text-shadow` e nos breakpoints das media queries) e zero `zoom`/`transform: scale()` em `html`/`body`
- [X] T049 Validar em DevTools (modo responsivo, zoom 100%) as 6 páginas em 375, 768, 1280, 1366, 1536 e 1920px: `document.documentElement.scrollWidth <= innerWidth`, textos e espaçamentos equilibrados, Sidebar compacta abaixo de 1024px e lateral a partir de 1024px (SC-007, SC-008, FR-022)
- [X] T050 Validar com a fonte padrão do navegador em 20px que os textos da Sidebar, Breadcrumbs e páginas ampliam proporcionalmente sem sobreposição (FR-021), e que o título da categoria do portfólio permanece visível abaixo do cabeçalho fixo após a navegação por âncora
- [X] T051 [P] Adicionar os cenários de dimensionamento fluido (larguras de validação, arranjo vertical da Sidebar e fonte ampliada) em `.specify/specs/spec-01_spa/quickstart.md`
- [X] T052 Validar conformidade com a Constituição v1.1.0, Princípio VI, em todo o CSS da aplicação (escala centralizada em `scale.css`, adesão de todas as páginas, respeito à fonte do navegador)

**Checkpoint**: Aplicação inteira com dimensionamento fluido centralizado, sem tamanhos fixos globais e com layout adaptado do celular ao Full HD.

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
- **Dimensionamento Fluido (Phase 8)**: Depende das Fases 1–7 (refatora código já entregue). Internamente: 8.1 (T031–T032) → 8.2 (T033–T034) → 8.3/8.4 (T035–T044) → 8.5 (T045–T046, T053) → 8.6 (T047–T052). T036 depende de T035 (mesmo arquivo); T045 depende de T042 (`--portfolio-header-h`); T053 depende de T036 (faixa horizontal). Em todas as refatorações T035–T044, `border-radius` passa a `rem` e px fica restrito à espessura de bordas e às sombras.

### Parallel Opportunities

- **Fase 1 (Setup)**: `T002` e `T003` podem ser desenvolvidas em paralelo.
- **Fase 2 (Foundational)**: `T005`, `T006` e `T007` podem ser desenvolvidas em paralelo.
- **Fase 3 (User Story 1)**: `T008` (IdentityHeader), `T009` (NavItem), `T012` (sidebar.css) e `T013` (sobre.astro) podem ser implementadas simultaneamente por serem arquivos isolados.
- **Fase 4 (User Story 2)**: `T015` (criação das páginas estáticas) pode ser feita em paralelo com `T016` (nav.js).
- **Fase 5 (User Story 3)**: `T020` (Breadcrumbs.astro) e `T021` (breadcrumbs.css) podem rodar em paralelo.
- **Fase 6 (User Story 4)**: `T024` (default.astro) e `T027` (subpagina-demo.astro) podem ser criadas em paralelo.
- **Fase 8 (Dimensionamento Fluido)**: após T031–T034, as refatorações `T035`, `T037`, `T038` e `T039`–`T044` atuam em arquivos distintos e podem rodar em paralelo; `T046` e `T053` são independentes de `T045`; `T048` e `T051` podem rodar em paralelo após `T047`.

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
6. **Incremento 6**: Escala fluida centralizada em `scale.css`, refatoração do shell e das 6 páginas para os tokens, breakpoints mobile-first e Sidebar compacta abaixo de 1024px (Phase 8). Sugestão de entrega: shell da SPA primeiro (T031–T038), validando em 375/1280/1920px, depois uma página por vez (T039–T044).
