# Feature Specification: Estrutura e Estilização da Página "Portfólio" ('portfolio.astro')

**Feature Branch**: '05-portfolio'  
**Created**: 2026-11-05  
**Updated**: 2026-11-16  
**Status**: Proposto / Planejado  

**Input**: User description: "Criar a pagina que servirá de portal para seleção dos projetos do meu portfólio pessoal de Ciencia de dados. Cada projeto terá um card interativo no qual será exibida uma imagem e outras informações resumidas. O card do projeto servirá de link para a pagina específica de cada projeto. 
Os projetos serão organizados em categorias, haverá um mecanismo fixo no topo da pagina para facilitar a navegação para as categorias. 
A página deve seguir a arquitetura SPA do projeto (injetada no Main Container '#page-content-host' via History API sem full reload), garantindo isolamento estrito de assets (CSS, JS e images em subdiretórios de assets) e usando caminhos absolutos para assets estáticos conforme a convenção do projeto."

---

## 1. Objetivo

Este documento define de forma unificada a estrutura de apresentação, a organização dos elementos, a identidade visual, a tipografia, o layout, a responsividade, os estados visuais, o roteamento aninhado em SPA, bem como os requisitos funcionais, cenários de teste e critérios de aceite da página de portfólio de projetos.

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

Para garantir que as páginas abertas a partir dos links nas imagens dos projetos (e eventuais subpáginas navegadas a partir delas) sejam reconhecidas e renderizadas dentro da área de exibição da SPA (`#page-content-host`), fica estabelecida a seguinte hierarquia oficial de rotas e estrutura de fragmentos:

### 2.1 Árvore Hierárquica de Páginas do Portfólio

```text
pages/portfolio/
├── portfolio.astro
├── assets/
│   ├── css/
│   │   └── portfolio.css
│   ├── images/
│   │   ├── projeto_CLA.avif
│   │   └── projeto_pipeline1.avif
│   └── js/
│       └── portfolio.js
└── projetos/
    ├── AES1/
    │   └── AES1.html
    └── testes/
        └── pagina_teste.html
```

### 2.2 Contrato de Reconhecimento pelo Roteador SPA (`#page-content-host`)

Toda página ou subpágina situada sob `/pages/portfolio/projetos/**` DEVE seguir o contrato de fragmento SPA para que o motor de navegação (`History API`) a injete sem recarregar a página inteira:

1. **Contêiner Raiz Obrigatório**: O documento da subpágina deve expor o elemento `#page-content` contendo:
   - `id="page-content"`
   - `data-page-id="portfolio-project-<slug>"` (ex: `data-page-id="portfolio-project-aes1"`)
   - `data-titulo_pagina="<Título do Projeto>"`
   - `data-parent-route="/portfolio"` (permite botão "Voltar ao Portfólio" via SPA).
2. **Interceptação de Cliques**:
   - Links internos nas imagens de capa (`project_image-wrap[href^="/"]` ou `.card-cover-wrap[href^="/"]`) e links internos dentro das páginas de projeto que apontem para rotas sob `/pages/portfolio/projetos/` devem receber o atributo `data-spa-link` (ou serem capturados pelo listener delegado da SPA).
   - Ao acionar o link, o roteador SPA faz o `fetch` do documento alvo, extrai o nó `#page-content` (bem como folhas de estilo/scripts específicos declarados no fragmento), injeta no `#page-content-host` e atualiza a URL via `history.pushState()`.
3. **Fallback / Encapsulamento para HTML Estático Legado**: Caso uma página em `/pages/portfolio/projetos/<slug>/<arquivo>.html` seja um documento HTML completo sem a estrutura modular Astro, o loader da SPA deve extrair automaticamente o conteúdo de `<body>` (ou envolver em um `<div id="page-content">`) mantendo a renderização dentro de `#page-content-host`.

### 2.3 Descrição dos Elementos da Página

- `page`: Representa a página como um todo.
- `header`: Área de cabeçalho no topo da página.
  - Permanece sempre fixo no limite superior da página sem gap, não se movendo na rolagem da página.
- `page_title`: Texto para exibir o título da página.
- `category_selection`: Área para seleção das categorias onde ficarão os botões (`selection_button`) que apontarão para as âncoras das categorias.
- `selection_button`: Botão que servirá de link para a âncora da categoria correspondente.
- `selection_name`: Texto do `selection_button`.
- `selection_anchor`: Âncora para a qual o link do `selection_button` vai apontar.
- `body`: Área de exibição das categorias.
  - Permite a rolagem para baixo se a quantidade de projetos ultrapassar os limites da página.
- `category_section`: Seção que engloba cada categoria e seus cards de projetos.
- `category_title`: Texto para exibir o título da categoria.
- `category_anchor`: Link interno (âncora) da categoria.
- `project_grid`: Grade onde se organizam os `project_card` da categoria.
- `project_card`: Card interativo para exibição dos dados de cada projeto.
  - Servirá de link para a página específica do projeto.
- `project_link`: Link para a página do projeto.
- `project_image-wrap`: Elemento que receberá a imagem do projeto (`project_image`).
- `project_image`: Imagem do projeto.
- `project_name`: Texto para exibição do nome do projeto.
- `project_resume`: Texto para exibição de um resumo do projeto.
- `habilities_list`: Lista de tags de habilidades usadas no projeto.
- `hability_tag_HS`: Representa uma tag de habilidade `hard_skill` dentro da lista de habilidades (`habilities_list`).
- `hability_tag_SS`: Representa uma tag de habilidade `soft_skill` dentro da lista de habilidades (`habilities_list`).

### 2.4 Estrutura da Página

A página segue estritamente a árvore estrutural abaixo. Apenas as categorias detalhadas com `project_grid` e `project_card` (`bi-analytics` com 1 card e `data-engineering` com 2 cards, totalizando 3 cards) devem gerar cards de projetos. As demais 5 categorias (`machine-learning`, `deep-learning`, `cloud-devops`, `gen-ai`, `stat-modeling`) não possuem projetos cadastrados nesta especificação e DEVEM exibir exclusivamente o seu cabeçalho (`category_title`), sendo terminantemente proibida a geração de cards em categorias não especificadas com projetos.

```text
portfolio.astro
├── header (fixo no limite superior sem gap, não se move com a rolagem da página)
│   ├── page_title: 'Portfólio de Projetos'
│   └── category_selection
│       ├── selection_button (selection_name='Análise de Dados e BI', selection_anchor='#section-bi-analytics')
│       ├── selection_button (selection_name='Machine Learning', selection_anchor='#section-machine-learning')
│       ├── selection_button (selection_name='Deep Learning', selection_anchor='#section-deep-learning')
│       ├── selection_button (selection_name='Engenharia de Dados', selection_anchor='#section-data-engineering')
│       ├── selection_button (selection_name='Cloud & MLOps', selection_anchor='#section-cloud-devops')
│       ├── selection_button (selection_name='IA Generativa & LLMs', selection_anchor='#section-gen-ai')
│       ├── selection_button (selection_name='Modelagem Estatística', selection_anchor='#section-stat-modeling')

└── body
    ├── category_section (category_id='bi-analytics')
    │   ├── category_title: 'Análise de Dados e BI'
    │   └── project_grid
    │       └── project_card
    │           ├── project_name: 'Customer Lifecycle Analytics (CLA)'
    │           ├── project_resume: 'Projeto de análise CLA completa (RFM, LTV, Cohort, CAC e Churn) em um contexto de e-commerce de cosméticos.'
    │           ├── project_link: '/pages/portfolio/projetos/AES1/AES1.html'
    │           ├── project_image: '/pages/portfolio/assets/images/projeto_CLA.avif'
    │           └── habilities_list
    │               ├── hability_tag_HS: 'PowerBI'
    │               ├── hability_tag_HS: 'Python'
    │               ├── hability_tag_HS: 'SQL'
    │               └── hability_tag_HS: 'DuckDB'
    ├── category_section (category_id='machine-learning')
    │   └── category_title: 'Machine Learning'
    ├── category_section (category_id='deep-learning')
    │   └── category_title: 'Deep Learning'
    ├── category_section (category_id='data-engineering')
    │   ├── category_title: 'Engenharia de Dados'
    │   └── project_grid
    │       ├── project_card
    │       │   ├── project_name: 'Pipeline de dados de Transações de Fintech'
    │       │   ├── project_resume: 'Projeto de criação de uma pipeline utilizando uma arquitetura do tipo MDS (Modern Data Stack).'
    │       │   ├── project_link: 'https://github.com/sergiorib/cla-omnibox/blob/main/README.md'
    │       │   ├── project_image: '/pages/portfolio/assets/images/projeto_pipeline1.avif'
    │       │   └── habilities_list
    │       │       ├── hability_tag_HS: 'Apache Airflow'
    │       │       ├── hability_tag_HS: 'Delta Lake'
    │       │       ├── hability_tag_HS: 'Spark'
    │       │       ├── hability_tag_HS: 'DBT'
    │       │       └── hability_tag_HS: 'Python'
    │       └── project_card
    │           ├── project_name: 'Projeto de teste'
    │           ├── project_resume: 'Projeto apenas para teste da especificação.'
    │           ├── project_link: '/pages/portfolio/projetos/testes/pagina_teste.html'
    │           ├── project_image: '/pages/portfolio/assets/images/projeto_CLA.avif'
    │           └── habilities_list
    │               ├── hability_tag_HS: 'Tecnologia 1'
    │               ├── hability_tag_HS: 'Tecnologia 2'
    │               ├── hability_tag_HS: 'Tecnologia 3'
    │               └── hability_tag_HS: 'Tecnologia 4'
    ├── category_section (category_id='cloud-devops')
    │   └── category_title: 'Cloud & MLOps'
    ├── category_section (category_id='gen-ai')
    │   └── category_title: 'IA Generativa & LLMs'
    └── category_section (category_id='stat-modeling')
        └── category_title: 'Modelagem Estatística'
```

---

## 3. Identidade Visual

### 3.1. Paleta de Cores e Gradientes

- `page`:
  - `background`: `linear-gradient(to bottom, #DAEBF2, #A8CCD9)`
- `page_title`:
  - Cor: `#000000` (Preto)
  - Fonte: `'Barlow Condensed', sans-serif`
  - Tamanho: `36px`
- `category_selection`:
  - `background`: `linear-gradient(to bottom, #2C4855, #1E333D)`
- `selection_button`:
  - **Estado Padrão**:
    - Cor do texto: `#FFFFFF` (Branco)
    - Tamanho da fonte: `14px`
    - Cor do fundo: `rgba(255, 255, 255, 0.1)` (Branco translúcido)
    - Cor da borda: `rgba(255, 255, 255, 0.2)`
  - **Estado Ativo (`.selection_button.active`)**:
    - Cor do texto: `#22D3EE` (Ciano)
    - Tamanho da fonte: `16px`
    - Cor do fundo: `rgba(34, 211, 238, 0.2)`
    - Cor da borda: `#22D3EE`
- `category_title`:
  - Cor: `#1E333D`
  - Fonte: `'Barlow Condensed', sans-serif`
  - Tamanho: `24px`
- `project_card`:
  - `background`: `linear-gradient(to bottom, #FFEFBA, #FFFFFF)`
  - Borda: `1px solid #0381B0`
  - `border-radius`: `12px`
  - Sombra (`box-shadow`): `0 4px 8px rgba(0, 0, 0, 0.1)`
- `project_name`:
  - Cor: `#000000` (Preto)
  - Tamanho: `18px`
  - Fonte: `'Barlow Condensed', sans-serif`
- `project_resume`:
  - Cor: `#333333`
  - Tamanho: `14px`
  - Fonte: `'Inter', sans-serif`
- `hability_tag_HS`:
  - Cor do texto: `#386312`
  - Tamanho da fonte: `12px`
  - Cor do fundo: `#E2F0D9`
  - Cor da borda: `#386312`
- `hability_tag_SS`:
  - Cor do texto: `#4B7725`
  - Tamanho da fonte: `12px`
  - Cor do fundo: `#E2F0D9`
  - Cor da borda: `#497225`

### 3.2. Grade de Cards

- O elemento `project_grid` deve utilizar CSS Grid.
- Em viewports Desktop e Tablet com largura igual ou superior a `768px`, a grade deve exibir **2 projetos por linha** (2 colunas expansíveis).
- Nas categorias sem projetos cadastrados, a grade não é renderizada, exibindo-se unicamente o título da categoria.

### 3.3. Organização Interna do `project_card`

Cada `project_card` deve se organizar visualmente desta forma:

1. A imagem de capa (`project_image`) na parte superior com proporção de tela de `16:9` (`aspect-ratio: 16 / 9`), envolvida por `project_image-wrap` (com cursor `pointer` quando houver link associado).
2. O título do projeto (`project_name`) e a descrição truncada (`project_resume`) no corpo do card (`project_card`).
3. O conjunto de tags de tecnologia (`habilities_list`) no rodapé do card (`project_card`).

### 3.4. Estado Padrão

- O `project_card` deve apresentar o gradiente, a borda, o raio e a sombra definidos na seção 3.1.
- Os botões `selection_button` não ativos mantêm o estilo neutro translúcido (`text-decoration: none`).

### 3.5. Estado Hover e Ativo

- `selection_button` Ativo: Fundo translúcido ciano, borda `#22D3EE`, texto `#22D3EE` com fonte de `16px` e sombra de brilho ciano (`0 0 8px rgba(34, 211, 238, 0.4)`).
- Hover no `project_card`: Elevação suave via `transform: translateY(-4px)` e realce sutil na sombra.
- Hover no `project_image-wrap` com Link: Transição sutil de escala (`transform: scale(1.02)`) indicando interatividade clicável na imagem.

### 3.6. Comportamento de Layout, Rolagem e Cabeçalho Fixo

- **Apresentação no Limite Superior sem Gap Vertical e sem Sobreposição Lateral ao Menu da SPA**: O contêiner `#page-content-host` para a página de portfólio DEVE aplicar `padding-top: 0` para que o cabeçalho (`.portfolio-header`) comece exatamente no limite superior da área de exibição da SPA (sem gap vertical), enquanto mantém `padding-left: 40px` e `padding-right: 40px` para preservar a exibição do lado esquerdo e evitar qualquer sobreposição com o menu lateral (sidebar) ou menu da SPA.
- **Cabeçalho Fixo (`header`)**: O `.portfolio-header` deve utilizar `position: sticky; top: 0; z-index: 100;` acompanhado de gradiente de fundo para fixar o título e o painel de filtros no topo da área de rolagem do `#page-content-host`.
- **Desobstrução do Título da Categoria na Rolagem**: A rolagem suave para as seções de categoria (`.category-section`) DEVE compensar dinamicamente a altura total do cabeçalho fixo com respiro de segurança (`scroll-margin-top: 185px` e offset dinâmico de `header.offsetHeight + 35px`), assegurando que em nenhuma hipótese o cabeçalho cubra ou encubra o título da categoria (`category_title`).
- **Contêiner da Página (`.portfolio-page-wrapper`)**: Deve possuir `min-height: 100%` e `display: flex; flex-direction: column;` para permitir o dimensionamento correto e rolagem vertical (`overflow-y: auto` herdado do contêiner SPA `#page-content-host`).

---

## 4. Responsividade

### 4.1. Breakpoints Principais

- **Elemento**: `project_grid`
  - **Desktop**:
    - Viewport: `>= 1024px`
    - Organização: 2 colunas (`repeat(2, 1fr)`)
    - Espaçamento (`gap`): `20px`
  - **Tablet**:
    - Viewport: `768px a 1023px`
    - Organização: 2 colunas (`repeat(2, 1fr)`)
    - Espaçamento (`gap`): `16px`
  - **Mobile**:
    - Viewport: `< 768px`
    - Organização: 1 coluna (`1fr`)
    - Espaçamento (`gap`): `12px`

### 4.2. Ajustes Mobile

Para viewports com largura inferior a `768px`:

- O padding da `page` deve adaptar-se para `12px`.
- Os `selection_button` devem permitir rolagem horizontal ou wrap responsivo sem quebrar o layout.
- O conteúdo não deve provocar rolagem horizontal global na página.

---

## 5. User Scenarios & Testing *(mandatory)*

### User Story 1 - Cabeçalho, Seleção de Categorias e Navegação Interna por Categoria (Priority: P1)

Como visitante ou recrutador, desejo visualizar o título da página ("Portfólio de Projetos") e um painel de navegação contendo links/botões (`selection_button`) correspondentes a cada categoria criada para alternar o estado ativo e navegar diretamente até a seção da categoria correspondente, com o cabeçalho fixado no limite superior sem gap e sem cobrir o título da categoria navegada.

- **Why this priority**: Estabelece a identidade visual inicial da página e as opções de navegação interna por categoria.
- **Independent Test**: Acessar a página de Portfólio, verificar que o cabeçalho está colado no limite superior da página sem gap, clicar em um `selection_button` de categoria e verificar se o link interno aciona a navegação/rolagem para `selection_anchor`, aplica o estado ativo correspondente, mantém o título da seção completamente visível e desobstruído abaixo do cabeçalho, e mantém a posição sem voltar ao topo tanto na SPA quanto na página isolada.

**Acceptance Scenarios**:
1. **Given** que o usuário navega para a página de Portfólio, **When** o conteúdo é carregado, **Then** o cabeçalho é apresentado exatamente no limite superior da página sem gap vertical e o título exibe "Portfólio de Projetos" em fonte `Barlow Condensed` (`36px`, cor preta).
2. **Given** o clique em um `selection_button` de categoria específica, **When** acionado (seja na visualização via SPA ou na execução isolada da página), **Then** o cabeçalho permanece no limite superior sem gap, o estado `Ativo` é transferido para esse `selection_button`, a visualização rola suavemente até a `category_section` correspondente parando com folga visual que mantém o título da categoria (`category_title`) 100% visível e desobstruído abaixo do cabeçalho fixo (sem ser encoberto pelo header), a URL sincroniza o fragmento/âncora via History API, e a página permanece na seção selecionada sem retornar ao topo ou disparar recarga de rota pelo roteador SPA.

### User Story 2 - Grids de Categorias (2 por Linha) e Categorias Vazias (Priority: P1)

Como avaliador técnico, desejo visualizar as seções de projetos organizadas por categorias (`category_section`) com **2 cards por linha** em telas médias/grandes exclusivamente nas categorias que possuem projetos especificados, e visualizar apenas o cabeçalho das categorias que ainda não possuem projetos publicados.

- **Why this priority**: Organiza visualmente os trabalhos realizados com maior destaque por card (2 por linha) e mantém a transparência da estrutura de atuação mesmo em categorias sem projetos cadastrados.

**Acceptance Scenarios**:
1. **Given** uma categoria com projetos cadastrados em viewport `>= 768px`, **When** renderizada, **Then** o grid de projetos (`project_grid`) organiza os cards em **2 colunas por linha** (`repeat(2, 1fr)`).
2. **Given** cada card de projeto (`project_card`), **When** renderizado, **Then** apresenta fundo com gradiente (`#FFEFBA` a `#FFFFFF`), borda `#0381B0`, `border-radius: 12px`, sombra suave (`0 4px 8px rgba(0,0,0,0.1)`), capa `16:9`, título, descrição truncada em 3 linhas e tags `hability_tag_HS` e `hability_tag_SS`.
3. **Given** as 7 categorias cadastradas, **When** a página é renderizada, **Then** são gerados estritamente os 3 cards descritos na Seção 2.4 (1 card em "Análise de Dados e BI" e 2 cards em "Engenharia de Dados"), e as demais 5 categorias ("Machine Learning", "Deep Learning", "Cloud & MLOps", "IA Generativa & LLMs" e "Modelagem Estatística") exibem unicamente o cabeçalho (`category_title`), sem qualquer card.

### User Story 3 - Navegação SPA nas Páginas Linkadas pelas Imagens dos Projetos (Priority: P1)

Como visitante, ao clicar na imagem de capa de um projeto que possui link interno (como `/pages/portfolio/projetos/AES1/AES1.html`) e navegar por eventuais subpáginas internas desse projeto, desejo que todo o conteúdo seja aberto dentro da área principal da SPA (`#page-content-host`) sem recarregar a aplicação inteira.

- **Why this priority**: Garante continuidade da experiência SPA, preservando o shell de navegação da aplicação principal.
- **Independent Test**: Clicar na imagem de capa do card "Customer Lifecycle Analytics (CLA)" e confirmar que `AES1.html` é carregado dentro de `#page-content-host` via History API sem full page reload.

**Acceptance Scenarios**:
1. **Given** um card cujo link de capa aponta para uma rota interna da hierarquia `/pages/portfolio/projetos/...`, **When** o usuário clica na imagem de capa, **Then** o roteador SPA intercepta a navegação, injeta o conteúdo da página de projeto em `#page-content-host` e atualiza a URL via `history.pushState`.
2. **Given** que o usuário está dentro de uma página de projeto no `#page-content-host`, **When** clica em links internos subsequentes pertencentes à hierarquia do projeto, **Then** essas subpáginas também são renderizadas dentro de `#page-content-host`.
3. **Given** um card cujo link de capa é uma URL externa (`https://...`), **When** o usuário clica na imagem de capa, **Then** o link abre em uma nova aba do navegador (`target="_blank"`).

### User Story 4 - Layout Responsivo Mobile (Priority: P2)

Como usuário acessando por smartphone, desejo que o layout de portfólio se ajuste perfeitamente ao meu dispositivo em 1 coluna por linha.

- **Why this priority**: Garante responsividade impecável e legibilidade em telas estreitas.
- **Independent Test**: Reduzir a largura da viewport para Mobile (`< 768px`) e verificar se a grade se reorganiza para 1 coluna.

**Acceptance Scenarios**:
1. **Given** visualização em Mobile (`< 768px`), **When** aplicada, **Then** o grid de projetos ajusta-se para 1 coluna (`1fr`) e o padding do contêiner adapta-se para `12px`.

---

## 6. Arquitetura & Estrutura de Arquivos

### 6.1. Integração SPA, Subpáginas de Projetos & DOM

- **FR-001**: A página de Portfólio, bem como **todas as páginas e subpáginas abertas através dos links nas imagens dos projetos**, DEVEM ser injetadas e renderizadas 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full page reload.
- **FR-002**: O elemento raiz do fragmento HTML da página principal DEVE conter obrigatoriamente os atributos `id="page-content"`, `data-page-id="portfolio"` e `data-titulo_pagina="Portfólio"`. As páginas filhas em `/pages/portfolio/projetos/**` DEVEM seguir o mesmo padrão (`id="page-content"`, `data-page-id`, `data-titulo_pagina`) ou serem normalizadas pelo interceptador SPA ao serem carregadas em `#page-content-host`.

### 6.2. Lógica de Seleção de Categorias, Alinhamento Superior e Âncoras Internas

- **FR-003**: O contêiner principal da SPA (`#page-content-host`) DEVE aplicar `padding-top: 0` quando a página de portfólio estiver ativa, garantindo que o cabeçalho (`.portfolio-header`) comece exatamente no limite superior da área de exibição sem gap vertical, enquanto preserva `padding-left: 40px` e `padding-right: 40px` para evitar sobreposição com o menu lateral (sidebar) e menu da SPA no lado esquerdo. O script de comportamento do portfólio (`portfolio.js` / `<script is:inline>`) DEVE escutar os cliques nos elementos `selection_button`, interceptar a ação padrão (`e.preventDefault()`), atualizar o estado visual ativo (`active`) para o `selection_button` clicado e acionar a rolagem suave até o link interno definido em `selection_anchor` / `category_anchor`. A rolagem suave DEVE compensar dinamicamente a altura total do cabeçalho fixo com respiro de segurança (`scroll-margin-top: 185px` e offset dinâmico de `header.offsetHeight + 35px`), assegurando que o cabeçalho sticky nunca cubra ou encubra o título da categoria (`category_title`), funcionando no contêiner `#page-content-host` da SPA e via `window.scrollTo` em modo isolado.
- **FR-003.1**: **Idempotência e Ciclo de Vida de Scripts na SPA**: O script de inicialização (`initPortfolioNavigation`) deve ser idempotente (usando marcadores como `dataset.listenerAttached`), utilizar a diretiva `<script is:inline>` no fragmento Astro para ser preservado no build estático e responder tanto aos eventos nativos (`DOMContentLoaded`, `pageshow`) quanto ao evento de navegação da SPA (`spa:page-loaded`), além de re-execução controlada pelo roteador SPA (`executeIncomingScripts`).
- **FR-003.2**: **Estabilidade da Navegação por Âncoras**: A sincronização de fragmentos na URL via `history.pushState(null, '', targetId)` NÃO DEVE disparar o recarregamento de rota do roteador SPA. Quando ocorrer `popstate` sem alteração de `pathname`, o roteador deve manter o conteúdo atual e apenas ajustar a rolagem para a âncora solicitada.
- **FR-003.3**: **Conformidade Estrita com a Seção 2.4**: A página DEVE conter cards de projetos exclusivamente nas categorias detalhadas na Seção 2.4 (`bi-analytics` e `data-engineering`). Categorias sem projetos cadastrados na especificação não devem renderizar `project_grid` nem cards mockados.

### 6.3. Convenções de Resolução de Assets e Links

- **FR-004**: Ao referenciar imagens, assets estáticos ou links internos de projeto dentro de `pages/portfolio/`:
  1. **NÃO utilizar caminhos relativos** ou barras invertidas estilo Windows (como `pages\portfolio\...`, `./assets/...` ou `../portfolio/assets/...`), pois falham ao serem resolvidos pelo roteador SPA em rotas aninhadas.
  2. **Utilizar SEMPRE caminhos absolutos POSIX** iniciados por `/` baseados na raiz do servidor estático do Astro (ex: `/pages/portfolio/assets/images/projeto_CLA.avif` e `/pages/portfolio/projetos/AES1/AES1.html`).
  3. **Garantir que os arquivos existam fisicamente** nos diretórios correspondentes.
  4. **Validar a renderização** executando `npm run build` ao finalizar.
- **FR-005**: **Normalização de Rotas de Subpáginas com Extensão `.html`**: O roteador SPA global (`router.js`) DEVE normalizar URLs de requisição provenientes de links internos que contenham extensões estáticas (`.html` ou `.htm`), removendo-as antes de realizar o `fetch` (`normalizeFetchUrl`), de forma a mapear corretamente as rotas geradas pelo build estático do Astro (ex: `/pages/portfolio/projetos/AES1/AES1.html` resolvido para `/portfolio/projetos/AES1/AES1/`), evitando erros 404 durante a navegação aninhada.

---

## 7. Success Criteria *(measurable)*

- **SC-001**: **Desempenho SPA**: A página de Portfólio e as páginas de projetos linkadas nas imagens são renderizadas no Main Container (`#page-content-host`) em menos de 150ms sem reload completo do navegador.
- **SC-002**: **Fidelidade Visual, Grid e Categorias Vazias**: 100% das 7 categorias cadastradas são exibidas e apenas as categorias especificadas na Seção 2.4 geram cards (totalizando exatamente 3 cards no portfólio), exibindo apenas cabeçalho quando sem projetos.
- **SC-003**: **Navegação por Seleção de Categoria e Estabilidade na SPA**: O cabeçalho é apresentado no limite superior sem gap vertical; 100% dos cliques em `selection_button` aplicam o estado ativo, acionam a rolagem suave até a âncora correspondente (`category_anchor`), mantêm o título da categoria 100% visível e desobstruído abaixo do cabeçalho e mantêm a visualização estável na categoria selecionada sem retorno abrupto ao topo/seção inicial, tanto na navegação via SPA quanto na execução isolada da página.
- **SC-004**: **Isolamento de Assets & Build**: A separação de assets é mantida sem vazamento de estilos globais e `npm run build` compila sem erros.
