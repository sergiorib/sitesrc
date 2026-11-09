# Feature Specification: Estrutura e Estilização da Página "Portfólio" (`portfolio.astro`)

**Feature Branch**: `05-portfolio`

**Created**: 2026-11-05

**Status**: Proposto / Planejado

**Input**: User description: "Leia o arquivo 'C:/Sergio/Anotacoes/projeto_site_pessoal/especificacoes_design_paginas/Exemplos/exemplo_05_pagina_portfolio.html' e use como arquivo de referencia para gerar uma especificação no padrão do GSK para implementar a pagina 'portfolio.astro'. Extraia cada detalhe do arquivo de referencia e transforme em especificações GSK para a pagina de portfolio. As especificações devem refletir fielmente o design do html de exemplo, informando que CSS, JavaScript e imagens devem ficar em seus respectivos arquivos separados."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Cabeçalho e Painel de Filtros (Pills) do Portfólio (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar o título da página ("Portfólio de Projetos") em fonte `Barlow Condensed` e o painel de filtros (`.filter-panel`) com botões interativos (pills) para alternar entre categorias de projetos.

**Why this priority**: Estabelece a identidade visual inicial da página e as opções de filtragem rápida por categoria.

**Independent Test**: Acessar a página de Portfólio. Verificar se o título e o painel de filtros com as 8 categorias são renderizados corretamente com gradientes e estilos corretos.

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Portfólio, **When** o conteúdo é carregado, **Then** o título exibe "Portfólio de Projetos" em fonte `Barlow Condensed`, peso 700, tamanho 36px, cor preta.
2. **Given** o painel de filtros (`.filter-panel`), **When** renderizado, **Then** exibe fundo com gradiente vertical (`#2C4855` a `#1E333D`), borda `#0381B0`, cantos arredondados (12px) e as 8 pills de categoria (ex: "Análise de dados e BI", "Machine Learning", "Deep Learning", etc.).

---

### User Story 2 - Exibição das Seções de Categorias e Cards de Projetos (Priority: P1)

Como avaliador técnico, desejo visualizar as seções de projetos organizadas por categorias, cada uma contendo um grid responsivo de 3 colunas (`.project-grid`) com cards detalhados de projetos (`.project-card`).

**Why this priority**: Organiza visualmente os trabalhos realizados com alta fidelidade estética e estruturada.

**Independent Test**: Verificar se as seções de categoria (ex: "Análise de dados e BI", "Análise de Machine Learning") contêm o grid com cards contendo imagem de capa, título, descrição truncada em 3 linhas e tags de tecnologias (`.tag-pill`).

**Acceptance Scenarios**:

1. **Given** cada card de projeto (`.project-card`), **When** renderizado, **Then** apresenta fundo com gradiente (`#FFEFBA` a `#FFFFFF`), borda `#0381B0`, border-radius 12px, e sombra suave (`0 4px 8px rgba(0,0,0,0.1)`).
2. **Given** o conteúdo do card, **When** exibido, **Then** contém uma imagem 16:9 (`.card-cover`), título em Barlow Condensed (18px), descrição truncada (`display: -webkit-box`, `-webkit-line-clamp: 3`), e conjunto de tags de tecnologias estilizadas (`.tag-pill`).

---

### User Story 3 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout de portfólio se ajuste perfeitamente (2 colunas em tablets e 1 coluna em smartphones).

**Why this priority**: Garante responsividade impecável em diferentes viewports.

**Independent Test**: Reduzir a largura da viewport para faixas de tablet (768px-1023px) e mobile (< 768px). Verificar se o grid se reorganiza em 2 e 1 coluna respectivamente.

**Acceptance Scenarios**:

1. **Given** visualização em Tablet (768px a 1023px), **When** aplicada, **Then** o grid de projetos (`.project-grid`) ajusta-se para 2 colunas (`repeat(2, 1fr)`).
2. **Given** visualização em Mobile (< 768px), **When** aplicada, **Then** o grid de projetos ajusta-se para coluna única (`1fr`) e o padding do container se adapta.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página de portfólio organizada estritamente nos seguintes diretórios e arquivos:
  - Arquivo principal: `pages/portfolio/portfolio.astro` (com versão SPA em `pages/spa/portfolio.astro`).
  - Folha de estilos isolada: `pages/portfolio/assets/css/portfolio.css`
  - Script JavaScript client-side: `pages/portfolio/assets/js/portfolio.js`
  - Diretório de imagens: `pages/portfolio/assets/images/`
- **FR-002**: A página DEVE ser injetada e renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full reload.
- **FR-003**: O contêiner principal (`.main-container`) DEVE possuir gradiente vertical (`#DAEBF2` a `#A8CCD9`), borda `#0381B0` (3px), border-radius 16px, padding 20px, e sombra interna (`inset 0 0 12px rgba(0,0,0,0.25)`).
- **FR-004**: O painel de filtros (`.filter-panel`) DEVE conter botões interativos (`.filter-pill`) com suporte ao estado `.active` (fundo translúcido ciano, borda `#22D3EE`, cor `#22D3EE`, sombra `0 0 8px rgba(34,211,238,0.4)`).
- **FR-005**: Os cards de projetos (`.project-card`) DEVEM exibir imagem de capa (`.card-cover`, 16:9), título (`.card-title`), descrição (`.card-description`, truncada em 3 linhas via `-webkit-line-clamp`), e tags de competências/tecnologias (`.tag-pill`, fundo `#E2F0D9`, borda `#386312`).
- **FR-006**: Em resoluções de tablet (768px-1023px), o grid exibe 2 colunas; em mobile (< 768px), exibe 1 coluna.
- **FR-007**: O elemento raiz deve conter `id="page-content"`, `data-page-id="portfolio"` e `data-page-title="Portfólio"`.

---

## Success Criteria *(measurable)*

- **SC-001**: A página de Portfólio é renderizada no Main Container em menos de 150ms.
- **SC-002**: 100% dos elementos visuais e comportamentais extraídos de `exemplo_05_pagina_portfolio.html` (filtros, categorias, cards, tags e fontes Barlow Condensed) são reproduzidos fielmente.
- **SC-003**: A separação de assets (CSS em `pages/portfolio/assets/css/portfolio.css`, JS em `pages/portfolio/assets/js/portfolio.js`, e imagens em `pages/portfolio/assets/images/`) está estritamente implementada.
- **SC-004**: O design responsivo adapta perfeitamente os grids em desktop, tablet e mobile.

## Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/portfolio/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../portfolio/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/portfolio/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/portfolio/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/portfolio/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.
