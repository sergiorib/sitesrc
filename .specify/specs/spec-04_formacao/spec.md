# Feature Specification: Estrutura e Estilização da Página "Formação" (`formacao.astro`)

**Feature Branch**: `04-formacao`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "Criar a página de Formação (`formacao.astro`) com título em Barlow Condensed ('Formação'), 3 seções ('Acadêmica', 'Idiomas', 'Treinamentos') com títulos correspondentes, cada seção terá cards especificos representando as respectivas formações de cada secao, estes terão um logo centralizado, o título da formação e badges em fonte monoespaçada, A pagina deve ter design responsivo e estar integrada dinamicamente diretamente dentro do Main Container da SPA."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização e Título da Página de Formação (Priority: P1)

Como recrutador ou visitante do portfólio, desejo visualizar a página de Formação com título em destaque diretamente no `.main-container`, para identificar rapidamente as qualificações, idiomas e treinamentos de Sérgio Ribeiro Cerqueira.

**Why this priority**: Estabelece o arranjo estrutural e a identidade visual da página de formação diretamente no contêiner principal da SPA.

**Independent Test**: Acessar a rota da página "Formação" na SPA. Verificar se o conteúdo é renderizado diretamente no `.main-container`, exibindo o título "Formação" em Barlow Condensed 700 bold (32px no desktop, cor `#000000`, margin-bottom 16px).

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Formação na SPA, **When** o conteúdo é carregado no Main Container (`#page-content-host`), **Then** o contêiner principal (`.main-container`) exibe o gradiente vertical de #16222A a #3A6073, com padding de 20px, layout centralizado e as seções renderizadas diretamente nele.
2. **Given** o `.main-container`, **When** inspecionado, **Then** abriga diretamente as seções e cards de formação com largura máxima de 1200px e espaçamento adequado.
3. **Given** o título da página (`.page-title`), **When** renderizado, **Then** exibe "Formação" em fonte `Barlow Condensed`, peso 700 bold, tamanho 32px, cor #000000 e `margin-bottom: 16px`.

---

### User Story 2 - Exibição das Seções e Cards de Formação, Idiomas e Treinamentos (Priority: P1)

Como gestor ou avaliador técnico, desejo examinar as 3 seções da página ('Acadêmica', 'Idiomas' e 'Treinamentos'), cada uma com seu título correspondente e cards detalhando cursos, idiomas e treinamentos de forma clara e elegante.

**Why this priority**: Apresenta de forma estruturada as credenciais acadêmicas, proficiência em idiomas e treinamentos do profissional.

**Independent Test**: Verificar se a página possui 3 seções ('Acadêmica', 'Idiomas', 'Treinamentos'), cada uma com um título correspondente, e cards contendo títulos e badges em fonte monoespaçada renderizados diretamente no `.main-container`.

**Acceptance Scenarios**:

1. **Given** o `.main-container`, **When** renderizado, **Then** exibe três seções distintas diretamente em seu escopo: 'Acadêmica', 'Idiomas' e 'Treinamentos'.
2. **Given** o título da página (`.page-title`), **When** renderizado, **Then** exibe "Formação" em fonte `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#ffffff` e margem inferior de 16px.
3. **Given** cada seção, **When** renderizada, **Then** apresenta um título correspondente (`.section-title`) em fonte `Barlow Condensed`, tamanho 28px, peso 700 bold.
4. **Given** a seção 'Acadêmica', **When** exibida, **Then** contém os cards de formação acadêmica com logos institucionais, títulos de curso e badges de período. Esta seção apresenta até 2 cards por linha. 
5. **Given** a seção 'Idiomas', **When** exibida, **Then** contém cards de exemplo para idiomas com títulos e badges de proficiência. Esta seçao apresenta até 3 cards por linha. 
6. **Given** a seção 'Treinamentos', **When** exibida, **Then** contém cards de exemplo para treinamentos com títulos e badges de conclusão/ano. esta seção apresenta até 3 cards por linha . 

---

### User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)


Como visitante navegando pela SPA, desejo que a página "formacao" carregue instantaneamente sem recarregar a Sidebar, atualizando os Breadcrumbs no topo do Main Container para refletir a localização "Formacao".

**Why this priority**: Assegura a consistência de navegação Single Page Application estabelecida na arquitetura mestre.

**Independent Test**: Navegar para "Formacao" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza a régua de breadcrumbs para exibir `Formacao` sem full reload.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/formacao/` é requisitada, **Then** o script de roteamento SPA intercepta o evento e injeta o contêiner da página dentro do `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** a régua de Breadcrumbs no topo do Main Container exibe o nó `Formacao` como ativo e a Sidebar mantém o item "Formacao" selecionado.

---

### User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout se ajuste perfeitamente a telas menores com redimensionamento proporcional de padding, título e badges.

**Why this priority**: Assegura usabilidade em dispositivos móveis e tablets.

**Independent Test**: Testar viewports de tablet (768px a 1023px) e mobile (< 767px) validando o ajuste de padding, tamanhos de fonte e badges.

**Acceptance Scenarios**:

1. **Given** visualização em Tablet (768px a 1023px), **When** a viewport é aplicada, **Then** o padding do card é ajustado para 16px.
2. **Given** visualização em Mobile (< 767px), **When** a viewport é aplicada, **Then** o padding do contêiner principal reduz para 16px, o `.page-title` ajusta para 26px, o `.course-title` ajusta para 26px, e a `.period-badge` ajusta para 12px com padding de 4px 12px.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `formacao.astro` localizada em `pages/formacao/`, com seus assets em `pages/formacao/assets/` (imagens em `pages/formacao/assets/images/` e estilos em `pages/formacao/assets/css/`).
- **FR-002**: A página DEVE ser renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API, sem recarregamento de página.
- **FR-003**: O contêiner pai da página (`.main-container`) DEVE possuir gradiente vertical de #16222A a #3A6073, padding de 20px e display flex centralizado.
- **FR-004**: O conteúdo da página (título, seções e cards) DEVE ser renderizado diretamente dentro do `.main-container`, com largura máxima recomendada de 1200px e espaçamento adequado.
- **FR-005**: O título principal da página (`.page-title`) DEVE exibir o texto "Formação" em tipografia `Barlow Condensed`, peso 700 bold, tamanho 32px (Desktop), cor `#000000`, e `margin-bottom: 16px`.
- **FR-006**: A página DEVE conter exatamente 3 seções chamadas: 'Acadêmica', 'Idiomas' e 'Treinamentos', cada uma com um título correspondente (`.section-title`).
- **FR-007**: O wrapper de cards (`.cards-wrapper`) e os cards individuais DEVEM ser dispostos em stack vertical com `gap: 12px`, largura 100%, gradiente horizontal de #FFF8D6 a #FFFFFF, borda `1px solid #0381B0`, `border-radius: 10px`, `box-shadow: 0px 4px 6px rgba(0,0,0,0.1)`, `padding: 20px 16px`.
- **FR-008**: A seção 'Idiomas' DEVE conter os seguintes cards badges, em fonte monoespaçada uppercase: 
  - ***Formação 1***
    - Logo: 'pages/formacao/assets/images/logo-estacio.png'
    - Nome: 'Superior em Ciência de Dados'
    - Badge(texto): '2024 a 2026' 
  - ***Formação 2***
    - Logo: 'pages/formacao/assets/images/logo-estacio-uniradial.png'
    - Nome: 'Superior em Análise e Desenvolvimento de Sistemas'
    - Badge(texto): '2013 a 2016' 
- **FR-009**: A seção 'Idiomas' DEVE conter os seguintes cards badges:  
  - ***Idioma 1***
    - Logo: 'pages/formacao/assets/images/logo-ingles.png'
    - Nome: 'Inglês - Intermediário'
    - Badge: Não exibir nenhuma badge. 
  - ***Idioma 2***
    - Logo: 'pages/formacao/assets/images/logo-espanhol.png'
    - Nome: 'Espanhol - Avançado'
    - Badge: Não exibir nenhuma badge.
- **FR-010**: A seção 'Treinamentos' DEVE conter cards de exemplo (ex: Python Avançado para Machine Learning, Arquitetura de Microsserviços e Cloud) com badges em fonte monoespaçada uppercase.
  - ***Treinamento 1***
    - Logo: 'pages/formacao/assets/images/logo-enap.png'
    - Nome: 'Estatística Descritiva, Probabilidades e Técnicas de Amostragem'
    - Badge: '2024' 
- **FR-011**: A logo institucional (`.institution-logo`) DEVE ter `max-width: 100%`, `object-fit: contain`, carregada a partir de `pages/formacao/assets/images/`.
- **FR-012**: O título do curso/item (`.course-title`) DEVE utilizar `Barlow Condensed`, peso 700 bold, tamanho 24px, cor `#000000`, e margens `margin: 8px 0 10px 0`.
- **FR-013**: A badge de período/nível (`.period-badge`) DEVE ser `inline-block`, com gradiente vertical de `#FFFFFF` a `#EFEFEF`, borda `1px solid #0381B0`, `border-radius: 20px`, `box-shadow: 0px 2px 4px rgba(0,0,0,0.15)`, `padding: 4px 16px`, fonte monoespaçada (`Consolas`/`Courier New`), peso 600 semibold, 20px, e texto em UPPERCASE.
- **FR-014**: Em resoluções Tablet (768px a 1023px), o padding do card DEVE ser reduzido para 16px.
- **FR-015**: Em resoluções Mobile (< 767px), o padding do `.main-container` DEVE ser 16px, `.page-title` 26px, `.course-title` 26px, e `.period-badge` 12px com padding de 4px 12px.
- **FR-016**: O elemento raiz de conteúdo DEVE conter `id="page-content"`, `data-page-id="formacao"` e `data-page-title="Formação"`.

---

## Success Criteria *(measurable)*

- **SC-001**: O tempo de renderização da página de Formação no Main Container é inferior a 150ms.
- **SC-002**: 100% dos elementos visuais (gradientes, bordas, sombras e tipografia Barlow Condensed / monoespaçada) obedecem rigorosamente às especificações de design.
- **SC-003**: A página apresenta as 3 seções ('Acadêmica', 'Idiomas' e 'Treinamentos') com seus respectivos títulos e cards de exemplo em Idiomas e Treinamentos.
- **SC-004**: O design responsivo adapta perfeitamente os paddings e tamanhos de fonte em viewports de tablet e mobile sem quebras de layout.

## Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/formacao/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../formacao/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/formacao/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/formacao/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/formacao/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.
