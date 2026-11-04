# Feature Specification: Estrutura e Estilização da Página "Histórico" (`historico.astro`)

**Feature Branch**: `03-historico`

**Created**: 2026-11-04

**Status**: Concluído / Atualizado

**Input**: User description: "Gere e atualize a especificação no padrão do GSK para implementar a página 'historico.astro' a partir dos detalhes extraídos do arquivo HTML de referência `C:/Sergio/Anotacoes/projeto_site_pessoal/especificacoes_design_paginas/Exemplos/exemplo_03_pagina_historico.html`. A página gerada reside em `pages/historico.md` (e `pages/historico/historico.astro`), com assets em `pages/historico/assets/css`, `pages/historico/assets/js` e `pages/historico/assets/images`."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Main Container e Título da Página de Histórico (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar o container principal de Histórico Profissional (`.main-container`) com largura máxima de 1200px, gradiente vertical de `#16222A` a `#3A6073`, borda `1px solid #0381B0`, border-radius 10px, box-shadow interna e padding de 16px, exibindo o título principal "Histórico Profissional" em tipografia `Barlow Condensed` Bold 32px.

**Why this priority**: Estabelece o contêiner estrutural e a identidade visual principal da página de histórico na SPA.

**Independent Test**: Acessar a rota da página "Histórico" na SPA. Verificar se o container `.main-container` renderiza o gradiente vertical de fundo, borda ciano, box-shadow interna e o título em Barlow Condensed 700 bold (32px, cor `#ffffff`).

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Histórico na SPA, **When** o conteúdo é carregado no Main Container (`#page-content-host`), **Then** o container principal exibe o gradiente de `#16222A` a `#3A6073`, largura máxima de 1200px e borda ciano de 1px.
2. **Given** o título da página (`.page-title`), **When** renderizado, **Then** exibe "Histórico Profissional" em fonte `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#ffffff` e margem inferior de 16px.

---

### User Story 2 - Exibição dos Cards de Experiência Profissional, Badges e Stack Tecnológica (Priority: P1)

Como avaliador ou cliente potencial, desejo examinar os cards de experiência profissional (`.experience-card`), contendo logo da empresa, título do cargo em Barlow Condensed (22px), badges de informações gerais (período, modalidade, duração), descrição detalhada das atividades e bloco de stack tecnológica e habilidades.

**Why this priority**: Apresenta de forma estruturada e elegante a carreira e experiência profissional detalhada do profissional.

**Independent Test**: Verificar se a página exibe os cards com gradiente de `#DAEBF2` a `#A8CCD9`, borda ciano, badges em gradiente suave, descrição justificada em fonte monoespaçada e bloco de stack tecnológica.

**Acceptance Scenarios**:

1. **Given** cada card de experiência (`.experience-card`), **When** renderizado, **Then** apresenta gradiente vertical de `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, `border-radius: 12px`, `box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15)`, e `padding: 20px 24px`.
2. **Given** o cabeçalho do card, **When** exibido, **Then** apresenta a logo da empresa (`.company-logo`, 40px de altura, centralizada) e o título do cargo (`.job-title`, `Barlow Condensed` 700 bold, 22px, cor `#000000`).
3. **Given** as badges informativas (`.info-badges`), **When** renderizadas, **Then** exibem informações como área, período, duração e modalidade em badges arredondadas com gradiente `#FFFDEB` a `#FFF9D2`.
4. **Given** a descrição da atividade (`.job-description`), **When** exibida, **Then** apresenta texto em fonte monoespaçada (`Courier New`/`Consolas`), peso 800, cor `#0a0c0c`, `line-height: 1.5` e alinhamento justificado.
5. **Given** o bloco de stack tecnológica (`.tech-stack-block`), **When** renderizado, **Then** exibe título em monoespaçada verde e lista de itens/ícones de tecnologias utilizadas.

---

### User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Histórico" carregue instantaneamente sem recarregar a Sidebar, atualizando os Breadcrumbs no topo do Main Container para refletir a localização "Histórico".

**Why this priority**: Assegura a consistência de navegação Single Page Application estabelecida na arquitetura mestre.

**Independent Test**: Navegar para "Histórico" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza a régua de breadcrumbs para exibir `Histórico` sem full reload.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/historico/` é requisitada, **Then** o script de roteamento SPA intercepta o evento e injeta o contêiner da página dentro do `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** a régua de Breadcrumbs no topo do Main Container exibe o nó `Histórico` como ativo e a Sidebar mantém o item "Histórico" selecionado.

---

### User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout do histórico se ajuste perfeitamente a telas menores com redimensionamento proporcional de padding, título, badges e grid responsivo.

**Why this priority**: Garante usabilidade impecável em viewports mobile e tablets.

**Independent Test**: Reduzir a largura da viewport para resoluções mobile (< 767px) e tablet. Verificar se o layout se adapta perfeitamente.

**Acceptance Scenarios**:

1. **Given** visualização em Tablet (768px a 1023px), **When** a largura é aplicada, **Then** as badges organizam-se proporcionalmente em 2 colunas.
2. **Given** visualização em Mobile (< 767px), **When** a largura é aplicada, **Then** o título reduz para 24px, o card padding reduz para 12px, e as badges organizam-se em grade de 2 colunas (`repeat(2, 1fr)`).

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página de histórico organizada estritamente nos seguintes diretórios e arquivos:
  - Arquivo principal da página: `pages/historico.md` e `pages/historico/historico.astro` (com versão SPA em `pages/spa/historico.astro`).
  - Folha de estilos isolada: `pages/historico/assets/css/historico.css`
  - Scripts de UI client-side: `pages/historico/assets/js/historico.js`
  - Diretório de imagens: `pages/historico/assets/images/`
- **FR-002**: A página DEVE ser injetada e renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full reload.
- **FR-003**: O contêiner principal (`.main-container`) DEVE ter largura máxima de 1200px, min-height 100vh, gradiente vertical de `#16222A` a `#3A6073`, borda `1px solid #0381B0`, border-radius 10px, box-shadow interna e padding de 16px.
- **FR-004**: O título principal da página (`.page-title`) DEVE utilizar tipografia `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#FFFFFF` e margem inferior de 16px.
- **FR-005**: Cada card de experiência (`.experience-card`) DEVE apresentar gradiente vertical de `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, border-radius 12px, box-shadow de 4px e padding de 20px 24px.
- **FR-006**: A logo da empresa (`.company-logo`) DEVE ter altura de 40px, largura automática e estar centralizada.
- **FR-007**: O título do cargo (`.job-title`) DEVE utilizar `Barlow Condensed`, peso 700 bold, tamanho 22px, cor `#000000`, centralizado.
- **FR-008**: As badges (`.badge`) DEVEM ter gradiente `#FFFDEB` a `#FFF9D2`, borda `1px solid #0381B0`, border-radius 20px, padding de 6px 16px, fonte monoespaçada/Barlow Condensed, peso 600, tamanho 14px e cor `#000000`.
- **FR-009**: A descrição da atividade (`.job-description`) DEVE utilizar fonte monoespaçada (`Courier New`/`Consolas`), tamanho 16px, peso 800, cor `#0a0c0c`, `line-height: 1.5` e alinhamento justificado.
- **FR-010**: O bloco de stack tecnológica (`.tech-stack-block`) DEVE possuir fundo em gradiente `#FFFDEB` a `#FFF8D6`, borda `1px solid #0381B0`, border-radius 6px e padding de 12px 16px.
- **FR-011**: Em resoluções Mobile (< 767px), o título reduz para 24px, card padding para 12px e as badges organizam-se em grade de 2 colunas.
- **FR-012**: O elemento raiz deve conter `id="page-content"`, `data-page-id="historico"` e `data-page-title="Histórico"`.

---

## Success Criteria *(measurable)*

- **SC-001**: O tempo de renderização da página de Histórico no Main Container é inferior a 150ms.
- **SC-002**: 100% dos elementos visuais extraídos do arquivo de referência `exemplo_03_pagina_historico.html` (Main Container, Experience Cards, Company Logos, Job Titles, Info Badges, Job Descriptions e Tech Stack Blocks) são reproduzidos fielmente.
- **SC-003**: A separação de assets (CSS, JS, imagens em diretórios dedicados) está rigorosamente documentada e estruturada.
- **SC-004**: O design responsivo adapta perfeitamente os cards em tablets e smartphones sem quebras de layout.
