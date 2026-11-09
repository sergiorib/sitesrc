# Feature Specification: Estrutura e Conteúdo Integral da Página "Histórico" (`historico.astro`)

**Feature Branch**: `03-historico`

**Created**: 2026-11-04 (Updated: 2026-11-07)

**Status**: Pending

**Input**: User description: "Implementar a página Histórico Profissional no portfólio pessoal, destinada à apresentação estruturada e detalhada das experiências profissionais do proprietário do site.

A página deverá apresentar cards individuais para cada experiência profissional, contendo identificação da empresa, logotipo, cargo ocupado, período de atuação, duração, modalidade de contratação, área de atuação, descrição das atividades desenvolvidas e respectivas tecnologias e habilidades utilizadas.

A apresentação deverá priorizar a clareza, a organização das informações e a identidade visual do portfólio, permitindo que recrutadores, gestores técnicos e potenciais clientes compreendam rapidamente a trajetória profissional, as responsabilidades assumidas e as competências técnicas do profissional.

A página deverá ser integrada à arquitetura existente da Single Page Application (SPA), sendo carregada dinamicamente no contêiner principal de conteúdo, sem recarregamento completo da aplicação e sem interferir na estrutura permanente de navegação.

O layout deverá ser responsivo, garantindo uma apresentação adequada em desktops, tablets e dispositivos móveis, mantendo a legibilidade e a organização dos cards e de suas informações."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Conteúdo da Página de Histórico (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar o conteúdo da página de Histórico Profissional carregado diretamente no wrapper da página (`#page-content`), exibindo o título principal "Histórico Profissional" em tipografia `Barlow Condensed` Bold 32px.

**Why this priority**: Estabelece a identidade visual principal da página de histórico na SPA.

**Independent Test**: Acessar a rota da página "Histórico" na SPA. Verificar se o título em Barlow Condensed 700 bold (32px, cor `#ffffff`) e os cards são renderizados com precisão.

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Histórico na SPA, **When** o conteúdo é carregado no wrapper (`#page-content-host`), **Then** o conteúdo da página aparece diretamente no layout principal sem o antigo wrapper `.main-container`.
2. **Given** o título da página (`.page-title`), **When** renderizado, **Then** exibe "Histórico Profissional" em fonte `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#ffffff` e margem inferior de 16px.

---

### User Story 2 - Exibição Integral dos Cards de Experiência Profissional, Badges Informativas e Stack Tecnológica (Priority: P1)

Como avaliador ou cliente potencial, desejo examinar os cards de experiência profissional (`.experience-card`), contendo logo da empresa (com destaque ampliado para 100px na Experiência 1), título do cargo em Barlow Condensed (34px), badges informativas completas, descrição detalhada das atividades (24px) e bloco de stack tecnológica e habilidades com escudos (badges shields) de tecnologias.

**Why this priority**: Apresenta de forma estruturada, detalhada e elegante a carreira e experiência profissional completa do profissional com alta fidelidade visual.

**Independent Test**: Verificar se a página exibe os cards de experiência com seus respectivos cargos, logos, badges informativas, descrições textuais e stacks tecnológicas avançadas.

**Acceptance Scenarios**:

1. **Given** cada card de experiência (`.experience-card`), **When** renderizado, **Then** apresenta fundo na cor #FFFFFF, borda `1px solid #0381B0`, `border-radius: 12px`, `box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15)`, e `padding: 20px 24px`.
2. **Given** o cabeçalho do card, **When** exibido, **Then** apresenta a logo da empresa (`.company-logo`, com altura de 100px mantendo a proporção para a Experiência 1, centralizada) e o título exato do cargo em `Barlow Condensed` 700 bold (34px, cor `#000000`).
3. **Given** as badges informativas (`.info-badges` e `.badge`), **When** renderizadas, **Then** exibem informações como área, período, duração e modalidade em badges arredondadas com gradiente `#FFFDEB` a `#FFF9D2`, tamanho 20px, as badges serão definidas adiante em cada experincia.
4. **Given** a descrição da atividade (`.job-description`), **When** exibida, **Then** apresenta o texto textual exato em fonte monoespaçada (`Courier New`/`Consolas`), tamanho 22px, peso 800, cor `#0a0c0c`, `line-height: 1.5` e alinhamento justificado.
5. **Given** o bloco de stack tecnológica (`.tech-stack-block`), **When** renderizado, **Then** exibe título em monoespaçada verde (22px), border-radius de 16px, e lista de escudos (.tech-shield) de tecnologias utilizadas que estarão definidas em cada experiencia. O texto do titulo do .tech-stack-block será 'Stack tecnológica e outras habilidades utilizadas nesta experiencia'
6. **Given** Os itens (`.tech-shield`), **When** renderizado, **Then** exibe texto em monoespaçada Branca (20px), border-radius de 12px. 
A definição dos itens de habilidades (`.tech-shield`) será feita na seção '**Stack Tecnológica e Habilidades**' de cada experiencia. 
Esta definição será feita dizendo, para cada habilidade seu tipo entre parentesis e seu nome (exemplo: '(hard) Python ou (soft) Análise de sistemas'). Haverá dos tipos de habilidade, 'Soft' e 'Hard'. 
Os '.tech-shield' de habilidades do tipo 'hard' serão apresentadas com um fundo na cor #5E718D e texto na cor #FFFFFF.
As '.tech-shield'  de habilidades do tipo  'soft' serão apresentadas com um fundo na cor #3CA296 e texto na cor #FFFFFF.

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
2. **Given** visualização em Mobile (< 767px), **When** a largura é aplicada, **Then** o título reduz para 24px, o card padding reduz para 12px, a logo da Experiência 1 ajusta para 80px mantendo proporção, e as badges organizam-se em grade de 2 colunas (`repeat(2, 1fr)`).

---

## Conteúdo Integral das Experiências Profissionais (Data Content Specification)

A página `historico.astro` e sua contraparte SPA `spa/historico.astro` contêm estritamente os seguintes registros de experiências profissionais:

### Experiência 1: Frete.com
- **Empresa / Logo**: Frete.com (`pages\historico\assets\images\logo_frete.png`, altura 100px proporcional)
- **Cargo**: Analista de BI (`.job-title` em 28px)
- **Badges Informativas** (`.badge` em 20px):
  - `maio 2025 a março 2026`- 
  - `10 meses`
  - `PJ`
  - `Remoto`
  - `Logística`
  As badges devem ser implementadas nesta ordem. 
- **Descrição das Atividades** (`.job-description` em 22px):
  > Em parceria com a equipe de dados do cliente, conduzi a reestruturação dos processos de extração, transformação e carga (ETL) oriundos de diversas fontes. Ao substituir processos manuais por pipelines automatizados e implementar validações rigorosas de qualidade, conseguimos reduzir o tempo de preparação dos dados em 80%. O impacto direto dessa nova arquitetura foi elevar a maturidade da área de planejamento, permitindo que a equipe dedicasse seu tempo a análises preditivas e direcionamento estratégico do negócio.
- **Stack Tecnológica e Habilidades** (com `.tech-stack-title` em 20px e `.tech-stack-block` com border-radius 16px):
  - (hard) Microsoft SQL Server
  - (hard) Python
  - (hard) DuckDB
  - (hard) n8n
  - (hard) dbt
  - (hard) API REST (Consumo)
  - (hard) Postman
  - (hard) Swagger
  - (hard) Microsoft Excel
  - (hard) Drawio
  - (hard) SCRUM
  - (hard) Github
As habilidades devem ser implementadas nesta ordem.  

### Experiência 2: Verity Consultoria em Tecnologia
-- **Empresa / Logo**: Verity Consultoria em Tecnologia (`pages\historico\assets\images\logo_verity.png`, altura 100px proporcional)
- **Cargo**: Analista de BI (`.job-title` em 28px)
- **Badges Informativas** (`.badge` em 20px):
  - `março 2023 a março 2025`- 
  - `2 anos`
  - `CLT`
  - `Remoto`
  - `Seguros`
As badges devem ser implementadas nesta ordem. 
- **Descrição das Atividades** (`.job-description` em 22px):
'Atuei na modelagem de dados e arquitetura de integração em projeto estratégico para uma seguradora de grande porte, visando o lançamento de um novo produto de seguro agrícola. O grande desafio superado foi traduzir regras de negócio complexas em um modelo de dados robusto que garantisse a comunicação fluida entre os sistemas legados da companhia e as APIs de um parceiro internacional. O produto foi implantado em produção com sucesso, destravando a entrada da empresa em um novo e altamente rentável segmento de mercado.'
- **Stack Tecnológica e Habilidades** (com `.tech-stack-title` em 20px e `.tech-stack-block` com border-radius 16px):
- (hard) Progress 4GL
- (hard) SQL
- (hard) Excel 
- (hard) Integração com APIS 
- (hard) Swagger
- (hard) Postman  
- (hard) DrawIO 
- (hard) Jira 
- (hard) Scrum
- (hard) Bitbucket
- (hard) Service Now
- (Soft) Análise de Sistema 
- (Soft) Modelagem de dados
As habilidades devem ser implementadas nesta ordem.  

### Experiência 3: Arezzo&Co
-- **Empresa / Logo**: Arezzo&Co (`pages\historico\assets\images\logo_arezzo.png`, altura 100px proporcional)
- **Cargo**:  Analista de dados (`.job-title` em 28px)
- **Badges Informativas** (`.badge` em 20px):
  - `janeiro março 2021 a outubro 2022`- 
  - `1 ano e 6 meses`
  - `PJ`
  - `Remoto`
  - `Varejo`
As badges devem ser implementadas nesta ordem. 
- **Descrição das Atividades** (`.job-description` em 22px):
'Atuei em projetos de construção de soluções analíticas para acompanhamento da operação de varejo da empresa Arezzo, utilizando dados corporativos disponibilizados em ambiente Databricks. Desenvolvi consultas e processos de preparação de dados para integrar informações de vendas, produtos, clientes, lojas e canais digitais, transformando grandes volumes de dados em indicadores confiáveis para as áreas Comercial, Operações e Gestão. A estruturação das análises permitiu ampliar a visibilidade sobre desempenho de vendas, comportamento dos clientes e performance por loja e canal, apoiando decisões mais rápidas e orientadas por dados.'
- **Stack Tecnológica e Habilidades** (com `.tech-stack-title` em 20px e `.tech-stack-block` com border-radius 16px):
As habilidades devem ser implementadas nesta ordem.  
- (hard)Databricks
- (hard) SQL
- (hard) PySpark
- (hard) Delta Lake
- (hard) Power BI
- (hard) Python
- (hard) Excel
- (hard) Git
As habilidades devem ser implementadas nesta ordem.  

### Experiência 4: CVC Viagens e Turismo
-- **Empresa / Logo**: CVC Viagens e Turismo (`pages\historico\assets\images\logo_cvc.png`, altura 100px proporcional)
- **Cargo**:  Especialista em TI (`.job-title` em 28px)
- **Badges Informativas** (`.badge` em 20px):
  - `janeiro 2018 a janeiro/2021`- 
  - `3 anos`
  - `CLT`
  - `Presencial`
  - `e-commerce de turismo`
As badges devem ser implementadas nesta ordem. 
- **Descrição das Atividades** (`.job-description` em 22px):
'Coordenei por 2 anos e meio equipe de TI de sustentação de ERP financeiro (Oracle EBS) na qual implementei rotina de apuração de indicadores operacionais para identificar gargalos sistêmicos e propor planos de ação que resultou em ganho significatbvo de tempo em atendimentos e redução dos custos de suporte em mais de 60%. Desenvolvi painéis analíticos (Grafana) e soluções de observabilidade cruzando dados de vendas com métricas de infraestrutura em nuvem (AWS CloudWatch) para alimentar sistemas internos de observabilidade (Zabbix). Também fui responsável por apurar e disponibilizar indicadores de disponibilidade do site e preparar o material para apresentações executivas.'
- **Stack Tecnológica e Habilidades** (com `.tech-stack-title` em 20px e `.tech-stack-block` com border-radius 16px):
As habilidades devem ser implementadas nesta ordem.  
- (hard) Oracle EBS
- (hard) SQL
- (hard) Excel
- (hard) Grafana
- (hard) Zabbix
- (hard) Python
- (hard) AWS Cloudewatch
- (hard) Power BI
- (hard) PowerPoint
- (hard) Jira 
- (hard) Scrum
As habilidades devem ser implementadas nesta ordem.  

### Experiência 5: Submarino (varejo e turismo) e B2W Digital
-- **Empresa / Logo**: Arezzo&Co (`pages\historico\assets\images\logo_arezzo.png`, altura 100px proporcional)
- **Cargo**: Analista de dados (`.job-title` em 28px)
- **Badges Informativas** (`.badge` em 20px):
  - `janeiro 2015 a dezembro 2017` 
  - `3 anos`
  - `PJ`
  - `Presencial`
  - `ecommerce`
As badges devem ser implementadas nesta ordem. 
- **Descrição das Atividades** (`.job-description` em 22px):
'Atuei em projetos de construção de soluções analíticas para acompanhamento da operação de varejo da empresa Arezzo, utilizando dados corporativos disponibilizados em ambiente Databricks. Desenvolvi consultas e processos de preparação de dados para integrar informações de vendas, produtos, clientes, lojas e canais digitais, transformando grandes volumes de dados em indicadores confiáveis para as áreas Comercial, Operações e Gestão. A estruturação das análises permitiu ampliar a visibilidade sobre desempenho de vendas, comportamento dos clientes e performance por loja e canal, apoiando decisões mais rápidas e orientadas por dados.'
- **Stack Tecnológica e Habilidades** (com `.tech-stack-title` em 20px e `.tech-stack-block` com border-radius 16px):
As habilidades devem ser implementadas nesta ordem.  
- (hard) SQL Server
- (hard) Oracle
- (hard) Excel
- (hard) C#
As habilidades devem ser implementadas nesta ordem. 

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página de histórico organizada estritamente nos seguintes diretórios e arquivos:
  - Arquivo principal da página: `pages/historico.md` e `pages/historico/historico.astro` (com versão SPA em `pages/spa/historico.astro`).
  - Folha de estilos isolada: `pages/historico/assets/css/historico.css`
  - Scripts de UI client-side: `pages/historico/assets/js/historico.js`
  - Diretório de imagens: `pages/historico/assets/images/`
- **FR-002**: A página DEVE ser injetada e renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full reload.
- **FR-003**: O conteúdo principal é renderizado diretamente no wrapper da página (`#page-content`).
- **FR-004**: O título principal da página (`.page-title`) DEVE utilizar tipografia `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#FFFFFF` e margem inferior de 16px.
- **FR-005**: Cada card de experiência (`.experience-card`) DEVE apresentar Fundo na cor #FFFFFF, borda `1px solid #0381B0`, border-radius 12px, box-shadow de 4px e padding de 20px 24px.
- **FR-006**: A logo da Experiência 1 (`.company-logo`) DEVE ter altura de 80px mantendo a proporção (`width: auto`, `object-fit: contain`), centralizada.
- **FR-007**: O título do cargo (`.job-title`) DEVE utilizar `Barlow Condensed`, peso 700 bold, tamanho 30px, cor `#000000`, centralizado.
- **FR-008**: As badges informativas (`.badge`) DEVEM ter gradiente `#FFFDEB` a `#FFF9D2`, borda `1px solid #0381B0`, border-radius 20px, padding de 6px 16px, peso 600, tamanho 20px e cor `#000000`.
- **FR-009**: A descrição da atividade (`.job-description`) DEVE utilizar fonte monoespaçada (`Courier New`/`Consolas`), tamanho 22px, peso 800, cor `#0a0c0c`, `line-height: 1.5` e alinhamento justificado.
- **FR-010**: O bloco de stack tecnológica (`.tech-stack-block`) DEVE possuir fundo em gradiente vertical de `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, border-radius 16px e padding de 12px 16px, com título em 20x (`.tech-stack-title`).
- **FR-011**: Em resoluções Mobile (< 767px), o título reduz para 24px, card padding para 12px, logo da Experiência 1 para 80px, e as badges organizam-se em grade de 2 colunas.
- **FR-012**: O elemento raiz deve conter `id="page-content"`, `data-page-id="historico"` e `data-page-title="Histórico"`.
- **FR-013**: O conteúdo textual e badges dos cards de experiência DEVEM refletir integralmente as experiências especificadas.

---

## Success Criteria *(measurable)*

- **SC-001**: O tempo de renderização da página de Histórico é inferior a 150ms.
- **SC-002**: 100% dos elementos visuais, badges e escudos de tecnologia estão documentados e reproduzidos fielmente.
- **SC-003**: A separação de assets (CSS, imagens em diretórios dedicados) está rigorosamente documentada e estruturada.
- **SC-004**: O design responsivo adapta perfeitamente os cards em tablets e smartphones sem quebras de layout.
- **SC-005**: A especificação reflete integralmente o estado atual da distribuição em produção.

## Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/historico/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../historico/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/historico/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/historico/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/historico/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.
