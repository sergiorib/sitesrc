# Feature Specification: Estrutura e Estilização da Página "Sobre mim" (`sobre.astro`)

**Feature Branch**: `02-sobre`

**Created**: 2026-10-29 (Updated: 2026-11-03)

**Status**: Concluído / Em Execução

**Input**: User description: "Criar a estrutura e estilização da Página 'Sobre mim' (sobre.astro) com dois painéis principais ('Sobre mim' e 'Habilidades'), exibindo biografia profissional, divisões de Hard-Skills e Soft-Skills com agrupamentos hierárquicos colapsáveis, ícones de tecnologias e classificação por estrelas para cada competência, integrada dinamicamente dentro do Main Container da SPA."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Painel "Sobre mim" com Apresentação Executiva (Priority: P1)

Como recrutador, executivo ou visitante do portfólio, desejo visualizar um painel superior dedicado à introdução profissional de Sérgio Ribeiro Cerqueira, para compreender imediatamente seu posicionamento estratégico na intersecção entre modelagem matemática rigorosa, Machine Learning e liderança técnica orientada a resultados.

**Why this priority**: É a primeira impressão conceitual e biográfica transmitida pelo portfólio. Estabelece a autoridade e a proposta de valor do profissional de forma concisa e legível.

**Independent Test**: Acessar a rota da página "Sobre" na SPA. Verificar se o painel superior é renderizado com fundo em gradiente suave (`#DAEBF2` ao `#A8CCD9`), borda `#0381B0`, cantos de 10px, efeito encastrado com sombra interna suave, título "Sobre mim" em Barlow Condensed 700 (32px, preto) e texto em fonte monoespaçada (22px, `#4A5B61`, line-height 1.5, justificado).

**Acceptance Scenarios**:

1. **Given** que o usuário acessa a página inicial ou clica em "Sobre" na Sidebar da SPA, **When** o conteúdo é carregado dentro do `Main Container`, **Then** a área inteira exibe o fundo em gradiente vertical partindo de `#16222A` no topo até `#3A6073` na base.
2. **Given** a renderização do Painel Superior ("Sobre mim"), **When** inspecionada a estrutura visual, **Then** o contêiner deve possuir gradiente `#DAEBF2` a `#A8CCD9`, borda contínua fina `#0381B0`, raio de 10px, padding interno de 16px e margem inferior de 16px.
3. **Given** o conteúdo textual do Painel Superior, **When** exibido no navegador, **Then** o título "Sobre mim" está alinhado à esquerda em Barlow Condensed Bold 32px (`#000000`) e o parágrafo biográfico está justificado em tipografia monoespaçada (Consolas/Courier New) de 22px na cor `#4A5B61`.

---

### User Story 2 - Consulta às Habilidades Técnicas e Comportamentais com Avaliação por Estrelas e Árvore Hierárquica (Priority: P1)

Como gestor técnico ou líder de engenharia de dados, desejo analisar as competências do profissional organizadas em divisões distintas (Hard-Skills e Soft-Skills) com cards por categoria (Desenvolvimento, Bancos de Dados, Análise de Dados e BI, Engenharia de Dados, Cloud e Infraestrutura, Inteligência Artificial, Infraestrutura, Metodologias e Ferramentas, além das Soft-Skills estratégicas e de gestão), contendo subgrupos hierárquicos colapsáveis (`<details>` / `<summary>`), ícones dedicados (18x18px) e avaliação por estrelas, para auditar rapidamente a senioridade e o domínio ferramental.

**Why this priority**: A matriz de habilidades com classificação por estrelas e subgrupos modulares quantifica o nível de proficiência técnica e comportamental de forma transparente e detalhada, permitindo validação imediata das tecnologias dominadas.

**Independent Test**: Verificar se o Painel Inferior exibe o título "Habilidades" (32px, preto), a legenda interativa de estrelas, as divisões de Hard-Skills (4 colunas em desktop) e Soft-Skills (2 colunas em desktop), contendo cards com gradiente horizontal (`#FFEFBA` a `#FFFFFF` para Hard-Skills e `#C6E9BC` a `#FFFFFF` para Soft-Skills), borda `#0381B0`, ícones e contagem exata de estrelas ativas (`#2D4A22`) e inativas (`#CCCCCC`).

**Acceptance Scenarios**:

1. **Given** o Painel Inferior ("Habilidades"), **When** renderizado em tela desktop (≥ 1200px), **Then** os cards de Hard-Skills são distribuídos em 4 colunas paralelas e os de Soft-Skills em 2 colunas paralelas, com espaçamento (`gap`) de 12px a 12px.
2. **Given** qualquer card individual de habilidade, **When** inspecionado visualmente, **Then** apresenta gradiente horizontal adequado (`#FFEFBA` a `#FFFFFF` para hard skills, `#C6E9BC` a `#FFFFFF` para soft skills), borda fina `#0381B0`, cantos de 10px, padding interno de 14px e título de categoria em Barlow Condensed Bold 15px na cor `#386312` (uppercase).
3. **Given** a estrutura hierárquica de tecnologias, **When** um nó possui sub-itens (ex: Python com subgrupos de Fundamentos, Manipulação de dados, etc.), **Then** o grupo é renderizado como um elemento colapsável (`<details>`) com seta indicativa (`▶`), ícone de 18x18px, nome da tecnologia e média calculada das estrelas ativas alinhada à direita.
4. **Given** as linhas de tecnologia folha, **When** exibidas, **Then** cada linha possui ícone opcional (18x18px), rótulo em Barlow Condensed Semibold 14px (`#000000`) e as 5 estrelas posicionadas na extremidade direita via `margin-left: auto`.
5. **Given** a legenda de estrelas no topo do painel de Habilidades, **When** expandida pelo usuário, **Then** exibe a correspondência exata dos níveis de 1 a 5 estrelas definidos em `docs/99_lista_habilidades.md`.

---

### User Story 3 - Adaptação Responsiva para Dispositivos Móveis e Tablets (Priority: P2)

Como usuário acessando o portfólio por smartphone ou tablet, desejo que a página "Sobre mim" e seus cards de habilidades se reorganizem ergonomicamente sem perda de legibilidade ou quebra indesejada das estrelas de avaliação.

**Why this priority**: Garante uma experiência impecável em qualquer formato de tela, sem barras de rolagem horizontais espúrias ou desalinhamento de ícones e estrelas.

**Independent Test**: Reduzir a largura da viewport para < 768px (mobile) e entre 768px e 1200px (tablet). Verificar se os cards de habilidades se reorganizam para 2 colunas em telas médias e 1 coluna vertical suave no mobile com `gap: 16px`, o tamanho da fonte biográfica ajusta-se para 15px e as estrelas permanecem alinhadas à direita.

**Acceptance Scenarios**:

1. **Given** visualização em tela intermédia (< 1200px), **When** a página é redimensionada, **Then** os cards de hard skills reorganizam-se para 2 colunas de forma fluida sem colisão de textos.
2. **Given** visualização em tela Mobile (< 768px), **When** o usuário rola a tela, **Then** o texto do painel "Sobre mim" é renderizado a 15px e os cards de habilidades se empilham em 1 única coluna vertical com espaçamento de 16px.
3. **Given** a exibição mobile, **When** inspecionadas as linhas de habilidades e subgrupos colapsáveis, **Then** o alinhamento flexível garante que as 5 estrelas permaneçam intactas e encostadas à borda direita do card.

---

### User Story 4 - Integração Dinâmica com o Roteador SPA e Régua de Breadcrumbs (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Sobre mim" carregue instantaneamente sem recarregar a Sidebar, atualizando os Breadcrumbs no topo do Main Container para refletir a localização "Sobre".

**Why this priority**: Assegura a consistência de navegação Single Page Application estabelecida na arquitetura mestre.

**Independent Test**: Navegar para "Sobre" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza a régua de breadcrumbs para exibir `Sobre` sem full reload.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/sobre/` é requisitada, **Then** o script de roteamento SPA intercepta o evento e injeta o contêiner da página dentro do `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** a régua de Breadcrumbs no topo do Main Container exibe o nó `Sobre` como ativo e a Sidebar mantém o item "Sobre" selecionado.

---

### Edge Cases

- **Telas ultra-estreitas (< 360px de largura)**: Os nomes de tecnologias longos devem truncar suavemente com reticências ou quebrar sem empurrar as 5 estrelas para fora do card.
- **Carregamento assíncrono de imagens de ícones**: A ausência momentânea de uma imagem de ícone não deve colapsar a altura da linha nem desalinhar o grupo de estrelas (reserva de espaço de 18x18px garantida por CSS).
- **Injeção repetida no Main Container**: A reinjeção do conteúdo via roteador SPA não deve duplicar estilos nem gerar listeners redundantes.
- **Árvores de habilidades profundas**: Subgrupos aninhados com múltiplos níveis (ex: Python -> Manipulação de dados -> Pandas) devem calcular recursivamente a média das estrelas do grupo pai.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer o arquivo da página `sobre.astro` localizado em `pages/sobre/sobre.astro`, com seus estilos exclusivos isolados em folha CSS sob `pages/sobre/assets/css/sobre.css` e componentes modulares em `pages/sobre/components/`.
- **FR-002**: A página DEVE ser configurada para injeção exclusiva dentro do `Main Container` (`#page-content-host`) da aplicação SPA, ocupando 100% da largura e altura disponíveis.
- **FR-003**: O contêiner global da página DEVE possuir fundo em gradiente vertical suave partindo de `#16222A` no topo até `#3A6073` na base.
- **FR-004**: O sistema DEVE estruturar dois painéis principais verticais em cascata: Painel Superior ("Sobre mim") e Painel Inferior ("Habilidades").
- **FR-005**: Ambos os painéis principais DEVEM compartilhar o mesmo padrão visual: fundo em gradiente horizontal de `#041E2F` (esquerda) a `#607D8B` (direita), borda contínua fina na cor `#0381B0`, cantos arredondados de 10px, efeito de profundidade encastrado com sombra interna suave, padding interno de 16px e margem inferior de 16px.
- **FR-006**: O Painel Superior ("Sobre mim") DEVE exibir o título "Sobre mim" em tipografia `Barlow Condensed`, peso 700 (Bold), tamanho 32px, cor `#FFFFFF`, alinhado à esquerda com margem inferior de 12px.
- **FR-007**: O Painel Superior DEVE exibir o texto biográfico oficial: *"Cientista de Dados com sólida base em análise de sistemas e programação. Meu foco é traduzir desafios de negócio em soluções analíticas precisas, escaláveis e de alto impacto. A visão de ponta a ponta que adquiri ao longo dos anos me permite atuar com segurança em todas as etapas do ciclo de vida dos dados. Valorizo o aprendizado contínuo e a inteligência coletiva para construir resultados reais. Convido você a explorar as experiências profissionais, acadêmicas e projetos que constroem essa visão."* em fonte monoespaçada (`Consolas`, `Courier New`), tamanho 22px, cor `#FFFFFF`, line-height de 1.5 e alinhamento justificado.
- **FR-008**: O Painel Inferior ("Habilidades") DEVE exibir o título "Habilidades" em `Barlow Condensed`, peso 700 (Bold), tamanho 32px, cor `#000000`, alinhado à esquerda, acompanhado por uma legenda colapsável de avaliação de estrelas.
- **FR-009**: O Painel Inferior DEVE organizar as competências em duas divisões principais ("Hard-Skills" e "Soft-Skills"), com subtítulos em `Barlow Condensed` Bold 24px (`#1F382B`, uppercase) e borda inferior de destaque.
- **FR-010**: Os cards de Hard-Skills DEVEM ser distribuídos em grid responsivo de 4 colunas em desktop (≥ 1200px), 2 colunas em tablets e 1 coluna em mobile. Os cards de Soft-Skills DEVEM ser distribuídos em 2 colunas em desktop e 1 coluna em mobile.
- **FR-011**: Cada Card Individual de Habilidade DEVE possuir fundo em gradiente horizontal suave de `#FFEFBA` a `#FFFFFF` (para Hard-Skills) ou de `#C6E9BC` a `#FFFFFF` (para Soft-Skills), borda contínua fina na cor `#0381B0`, cantos arredondados de 10px e padding interno de 14px.
- **FR-012**: Cada card DEVE exibir o título de sua categoria em `Barlow Condensed`, peso 700 (Bold), tamanho 15px, cor `#386312` (uppercase) e margem inferior de 10px.
- **FR-013**: Cada linha de tecnologia ou grupo hierárquico DEVE ser disposto em layout flex horizontal com ícone opcional de 18px x 18px (`.tech-icon`), rótulo em `Barlow Condensed` Semibold 14px (`.tech-name`), e rating de 5 estrelas alinhado à extremidade direita via `margin-left: auto`.
- **FR-014**: O componente `SkillItemRow.astro` DEVE suportar renderização recursiva de subgrupos colapsáveis utilizando elementos HTML `<details>` e `<summary>`, com animação de rotação da seta indicativa (`▶`) e cálculo automático da média de estrelas para nós pai.
- **FR-015**: O sistema de Rating (`StarRating.astro`) DEVE utilizar a cor verde-escura militar (`#2D4A22`) para estrelas ativas/preenchidas e a cor cinza claro (`#CCCCCC`) com contorno vazado para estrelas inativas em formato SVG (13x13px).
- **FR-016**: Em resoluções móveis (< 768px), os cards de habilidades DEVEM transicionar para 1 coluna vertical empilhada com `gap` de 16px, e o texto biográfico deve ajustar o tamanho para 15px, mantendo as estrelas de rating fixas à direita.
- **FR-017**: O elemento raiz de conteúdo da página DEVE conter os atributos `id="page-content"`, `data-page-id="sobre"` e `data-page-title="Sobre"` para perfeita interoperabilidade com o roteador SPA e atualização da régua de Breadcrumbs.
- **FR-019**: O sistema DEVE integrar ícones SVG oficiais para as habilidades 'Python' (`python.svg`), 'SQL' (`sql.svg`) e 'Linguagem R' (`r.svg`) salvos em `pages/sobre/assets/images/`, exibidos à esquerda do nome da habilidade. Para todas as demais habilidades e subgrupos sem ícone dedicado, DEVE ser utilizado um ícone padrão de estrela fallback (`☆`). A classe CSS `.skill-icon` padroniza os ícones com `width: 20px; height: 20px; object-fit: contain; display: inline-block; vertical-align: middle; margin-right: 8px;`.
- **FR-018**: O sistema DEVE integrar rigorosamente a taxonomia oficial de legendas de estrelas e a estrutura completa de cards, grupos e subgrupos de competências conforme especificado em `docs/99_lista_habilidades.md`, detalhado a seguir:
  - **Legenda de Estrelas**:
    - `★☆☆☆☆` — Conhecimento conceitual
    - `★★☆☆☆` — Prática básica
    - `★★★☆☆` — Uso em projetos pessoais
    - `★★★★☆` — Uso em projetos profissionais
    - `★★★★★` — Domínio teórico e prático
  - **Taxonomia de Hard-Skills**:
    - **1.1. DESENVOLVIMENTO**: Python (com subgrupos: Fundamentos [Modularização (5), OOP (4), Estruturas de dados e algoritmos (4), Tratamento de exceções (5), Paralelismo e concorrência (4), Programação funcional (3)], Testes automatizados (3), Manipulação de dados [Pandas (5), NumPy (5), Polars (4), Dask (3), PyArrow (4)], Ciencia e matemáticas [SciPy (4), SymPy (3)], Visualização [Matplotlib (4), Seaborn (3), Plotly (4)], Interfaces de dados [Streamlit (3)], Dev. de APIs [FastAPI (3)], Web scraping [Beautiful Soup (4), Selenium (4)]); SQL (Consultas avançadas [5], Joins e subconsultas [5], CTEs e consultas recursivas [5], Window Functions [5], Views e Materialized Views [4], Stored Procedures e Functions [4], Triggers [4], Transações e controle de concorrência [4], Otimização de consultas [4], Índices e planos de execução [4], SQL analítico [4]); PL/SQL (4); T-SQL (4); Linguagem R (com subgrupos: Programação estatística [3], Manipulação de dados [dplyr (3), tidyr (3), data.table (3)], Visualização [ggplot2 (3), Shiny (2)], Modelagem estatística [3], R Markdown / Quarto [3]); Versionamento (GitHub [5], Bitbucket [4]); Conceitos gerais (Clean Code [4], SOLID [3], Design Patterns [4], Arquitetura em camadas [4], Modularização [5], Documentação de código [4], Testes unitários [3], Testes de integração [2], Testes de contrato [2], CI/CD [4], Versionamento semântico [5], Gerenciamento de dependências [5]).
    - **1.2. BANCOS DE DADOS**: Relacionais (SQL Server [3], Oracle [3], MySQL [4], PostgreSQL [4]); Time series (InfluxDB [3], Graphite [3], Prometheus [2]); NoSQL (MongoDB [4], DocumentDB [2]); Key-Value (Redis [3], DynamoDB [2]); Analiticos (BigQuery [3], RedShift [4], Snowflake [3], DuckDB [5]); Colunar (Cassandra [3]); Grafos (Neo4j [3]).
    - **1.3. ANÁLISE DE DADOS E BI**: Análise Exploratória (EDA) [4]; Business Intelligence (BI) [5]; Storytelling com Dados [4]; KPIs e OKRs [5]; Análises Especializadas (Séries Temporais [4], Forecasting [3], Customer Lifetime Cycle [Analise de Cohort (4), Lifetime Value (LTV) (4), Analise de Churn (4), Segmentação RFM (4), Análise de Funil (4)], Análise Redes Sociais (ARS) [3], Análise Operacional (SLA e OTIF) [3]); Testes A/B [3]; Ferramentas (Power BI [5], Tableau [3], Grafana [4], Excel [5]).
    - **1.4. ENGENHARIA DE DADOS**: ETL / ELT [5]; Modelagem de Dados [5]; Data Lakes [4]; Arquitetura Medalhão [4]; dbt [4]; Apache Spark [4]; Databricks [4]; Apache Airflow [3]; Delta Lake [4]; Data Lineage [3]; N8N [4].
    - **1.5. CLOUD E INFRAESTRUTURA**: Fundamentos para Dados (Armazenamento vs. Computação [3], Data Lake/Warehouse/Lakehouse [3], FinOps [3]); Amazon Web Services (AWS: S3 [3], Glue [3], Athena [3], Redshift [3], Lambda [3]); Google Cloud Platform (GCP: BigQuery [3], Cloud Storage (GCS) [3], Cloud Composer [3], Dataflow / Pub/Sub [3]); Microsoft Azure (Azure Databricks [3], ADF [3], ADLS Gen2 [3], Microsoft Fabric / Synapse [3]); DataOps (Terraform [3]).
    - **1.6. INTELIGÊNCIA ARTIFICIAL**: IA aplicada a Dados [4]; Engenharia de Prompts [4]; IA aplicada à Programação [4]; IA aplicada à Documentação Técnica [4]; SDD [4]; MCP [3].
    - **1.7. INFRAESTRUTURA**: Linux [4]; Windows Server [2]; SSH [5]; Shell Script [4].
    - **1.8. METODOLOGIAS E FERRAMENTAS**: Scrum [3]; CRISP-DM [4]; Jira [3]; Draw.io [4]; Figma [3]; Swagger [3]; Postman [4].
  - **Taxonomia de Soft-Skills**:
    - **2.1. ANÁLISE E PENSAMENTO ESTRATÉGICO**: Pensamento Analítico [4]; Visão Estratégica de Negócio [4]; Capacidade de Análise Crítica [4]; Visão Sistêmica [4]; Tomada de Decisão Orientada por Dados [4].
    - **2.2. COMUNICAÇÃO E RELACIONAMENTO**: Comunicação com Stakeholders [4]; Trabalho em Equipe [5]; Colaboração Interdisciplinar [3]; Compartilhamento de Conhecimento [3].
    - **2.3. LIDERANÇA E GESTÃO**: Liderança Técnica [3]; Gestão de Projetos [2]; Organização e Planejamento [4]; Orientação a Resultados [4].
    - **2.4. RESOLUÇÃO DE PROBLEMAS E ADAPTABILIDADE**: Resolução de Problemas [5]; Adaptabilidade [5]; Aprendizado Contínuo [5]; Autonomia [4]; Pensamento Estruturado [5].

---

### Key Entities

- **ProfileAboutSection**: Painel Superior contendo biografia executiva estruturada e estilizada em fonte monoespaçada.
- **SkillsSection**: Painel Inferior contendo a legenda de estrelas, as divisões de Hard-Skills e Soft-Skills e o sistema de cards responsivos.
- **SkillCategoryCard**: Card de categoria técnica ou comportamental contendo título em destaque (`#386312`), gradiente horizontal e lista de competências.
- **SkillItemRow**: Linha ou nó hierárquico de competência suportando ícones (18x18px), nomes (`.tech-name`), subgrupos colapsáveis (`<details>`) e cálculo recursivo de estrelas.
- **StarRating**: Componente visual de avaliação formado por 5 estrelas SVG com preenchimento `#2D4A22` (ativo) ou contorno `#CCCCCC` (inativo).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O tempo de renderização da página "Sobre mim" ao ser injetada no Main Container da SPA é inferior a 150ms a partir do acionamento no menu.
- **SC-002**: 100% dos painéis principais respeitam com precisão milimétrica os parâmetros de cores: fundo `#DAEBF2` ao `#A8CCD9`, borda `#0381B0`, cantos de 10px e padding de 16px.
- **SC-003**: 100% das competências mapeadas exibem rigorosamente a pontuação de estrelas ativas e inativas especificada, com todas as estrelas ativas na cor `#2D4A22` e inativas na cor `#CCCCCC`.
- **SC-004**: Em resoluções desktop (≥ 1200px), os cards de hard skills mantêm proporção idêntica de 4 colunas paralelas; em mobile (< 768px), o layout colapsa perfeitamente para 1 única coluna vertical sem quebra horizontal.
- **SC-005**: 100% das transições de navegação para a página "Sobre" atualizam a régua de Breadcrumbs para exibir `Sobre` sem provocar qualquer recarregamento da Sidebar ou da tela mestre (*zero full page reload*).

---

## Assumptions

- O projeto segue estritamente a Constituição v1.0.0: Astro para estruturação estática, CSS3 Puro / Vanilla CSS (sem frameworks utilitários) e Vanilla JS nativo.
- Os ícones de tecnologias (18x18px) estão organizados no diretório de assets da página em `pages/sobre/assets/images/`.
- As fontes `Barlow Condensed` e fontes monoespaçada de sistema (`Consolas`, `Courier New`, `monospace`) estão disponíveis no ambiente do navegador.
