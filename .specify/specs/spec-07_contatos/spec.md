# Feature Specification: Estrutura e Estilização da Página "Meus Contatos" (`contatos.astro`)

**Feature Branch**: `07-contatos`  
**Created**: 2026-11-03  
**Status**: Em Execução  
**Input**: Criar a página "Meus Contatos" (`contatos.astro`), apresentando os canais de comunicação e redes profissionais em um painel executivo com gradientes, cabeçalho estilizado em `Barlow Condensed` e uma grade responsiva com cards interativos de contatos integrados dinamicamente na SPA.

---

## 1. Design & Structure Specifications

### 1.1 Architecture & Layout
- **Page Container (`.contacts-page`)**:
  - Posicionamento relativo, altura mínima `100vh`, `border-radius: 14px`.
  - Padding responsivo: `clamp(28px, 5vw, 62px) clamp(24px, 5.2vw, 76px)`.
  - Fundo com gradiente radial e linear (`#142b36`, `#244653`, `#31596a`).
- **Grid Layout (`.contact-grid`)**:
  - **Desktop (≥ 720px)**: Grid de 2 colunas (`repeat(2, minmax(0, 1fr))`), `gap: 14px`.
  - **Mobile / Tablet (< 720px)**: 1 coluna (`grid-template-columns: 1fr`), `gap: 11px`.

### 1.2 Typography & Elements
- **Page Title (`h1`)**: Tipografia `Barlow Condensed`, peso 700 (Bold), tamanho 32px, cor `#ffffff`.
- **Contact Card (`.contact-card`)**:
  - Fundo em gradiente linear (`rgba(3, 28, 42, .82)` a `rgba(5, 37, 52, .64)`).
  - Borda: `1px solid rgba(102, 218, 238, .44)`, `border-radius: 13px`, padding `20px 21px`.
  - Hover state: `transform: translateY(-3px)` e destaque da borda em `--cyan` (`#19c6e6`).
- **Icon Container (`.icon-wrap`)**:
  - Dimensões: 48x48px (reduzindo para 42x42px em viewports < 380px), `border-radius: 12px`.
  - Fundo/borda translúcidos, abrigando SVG de 23x23px com stroke `--cyan-soft`.
- **Card Content Typography**:
  - **Label**: Maiúsculas, `Barlow Condensed` 600, 24px, cor `#81d3e7` (ajuste proporcional em < 380px).
  - **Value**: `Barlow Condensed` 600, 32px, cor `#f2fbfd` (ajuste proporcional em < 380px).
  - **Detail** (opcional): Tipografia `Inter`, 15px (ou 11px secundário), cor `--muted`.
  - **Action Link**: Seta indicativa (`↗`) à direita com transição no hover.

---

## 2. User Scenarios & Testing

### User Story 1 - Visualização do Cabeçalho e Painel de Contatos (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar a página de contatos com o título "Meus Contatos" em tipografia `Barlow Condensed` dentro de um painel executivo estilizado, para identificar claramente o propósito da página.

**Why this priority**: Estabelece a identidade visual e a estrutura principal da seção de comunicação.

**Independent Test**: Acessar a rota `/spa/contatos/`. Verificar se o contêiner `.contacts-page` renderiza o gradiente de fundo e o título `h1` estilizado.

**Acceptance Scenarios**:
1. **Given** que o usuário navega para a página de Contatos na SPA, **When** o conteúdo carrega no container `.contacts-page`, **Then** o painel ocupa a área designada com fundo em gradiente e borda arredondada de 14px.
2. **Given** o cabeçalho da página, **When** inspecionado, **Then** o título "Meus Contatos" utiliza `Barlow Condensed` Bold 32px na cor `#ffffff`.

---

### User Story 2 - Renderização Dinâmica dos Cards de Contato (Priority: P1)

Como avaliador ou cliente potencial, desejo visualizar todos os cards de contato definidos no sistema dispostos em uma grade responsiva com detalhes visuais e links interativos.

**Why this priority**: Garante acesso direto e estruturado a todos os canais de comunicação configurados.

**Independent Test**: Verificar se a grade `.contact-grid` renderiza dinamica e integralmente o número de cards definidos nos requisitos funcionais, aplicando as regras de layout e interatividade.

**Acceptance Scenarios**:
1. **Given** a lista de contatos definidos no sistema, **When** a seção `.contact-grid` é renderizada, **Then** um card (`.contact-card`) é gerado para cada item configurado.
2. **Given** visualização em desktop (≥ 720px), **When** a grade é exibida, **Then** os cards organizam-se em 2 colunas paralelas.
3. **Given** cada card individual (`.contact-card`), **When** exibido, **Then** apresenta ícone SVG em `.icon-wrap`, rótulo, valor principal em `Barlow Condensed`, detalhe (se aplicável), link funcional e indicação visual (`↗`).

---

### User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Contatos" carregue instantaneamente sem recarregar a estrutura global, atualizando o Breadcrumbs e o estado da Sidebar.

**Why this priority**: Assegura a consistência de navegação Single Page Application.

**Independent Test**: Acionar o link de Contatos na navegação. Verificar injeção dinâmica no container `.contacts-page` e atualização de estado dos Breadcrumbs sem refresh completo da página.

**Acceptance Scenarios**:
1. **Given** o clique em um link para a rota `/spa/contatos/`, **When** a requisição é interceptada pelo roteador SPA, **Then** o conteúdo é injetado diretamente em `.contacts-page`.
2. **Given** a renderização concluída, **When** inspecionado o topo do Main Container, **Then** o Breadcrumb indica a rota ativa "Contatos" e o item correspondente na Sidebar permanece selecionado.

---

### User Story 4 - Adaptabilidade Responsiva (Priority: P2)

Como usuário acessando via smartphone ou tablet, desejo que a grade de contatos e a tipografia se ajustem à largura da tela.

**Why this priority**: Garante acessibilidade e usabilidade em qualquer dispositivo.

**Independent Test**: Reduzir a viewport para < 720px e < 380px, verificando os pontos de quebra do layout grid e o redimensionamento de elementos internos.

**Acceptance Scenarios**:
1. **Given** viewport < 720px, **When** a grade é exibida, **Then** os cards organizam-se em 1 coluna única (`1fr`).
2. **Given** viewport < 380px, **When** a página é renderizada, **Then** os contêineres de ícone ajustam-se para 42x42px e a tipografia escala para evitar quebra de layout.

---

## 3. Requirements

### Functional Requirements

- **FR-001**: O sistema DEVE estruturar os artefatos da página estritamente nos seguintes caminhos:
  - Componente de página: `pages/contatos/contatos.astro` (com suporte/referência a `pages/contatos.md`).
  - Estilos isolados: `pages/contatos/assets/css/contatos.css`
  - Scripts client-side: `pages/contatos/assets/js/contatos.js`
  - Ativos estáticos/ícones: `pages/contatos/assets/images/`
- **FR-002**: O elemento raiz da página DEVE conter os atributos `id="page-content"`, `data-page-id="contatos"` e `data-page-title="Meus Contatos"`.
- **FR-003**: A página DEVE ser injetada e renderizada dinamicamente no container `.contacts-page` da SPA via History API / fetch client-side.
- **FR-004**: O contêiner `.contacts-page` e seus elementos DEVEM aplicar rigorosamente as especificações de estilo estipuladas na seção **1. Design & Structure Specifications**.
- **FR-005**: A grade `.contact-grid` DEVE renderizar dinamicamente uma quantidade de cards estritamente correspondente ao conjunto de contatos definidos no **FR-009**.
- **FR-006**: Cada `.contact-card` DEVE conter: `.icon-wrap` com SVG dedicado, rótulo (*label*), valor principal (*value*), detalhe opcional (*detail*) e link de direcionamento com indicador visual (`↗`).
- **FR-007**: Os canais de contato cadastrados no sistema DEVEM ser:
  - **Card 1**: Telefone / Whatsapp -> `(11) 98368-0639` (`tel:+5511983680639`)
  - **Card 2**: E-mail -> `Sergio.rib@live.com` (`mailto:Sergio.rib@live.com`), detalhe: `""`
  - **Card 3**: LinkedIn -> `https://www.linkedin.com/in/sergio-ribeiro-cerqueira` (`https://www.linkedin.com/in/sergio-ribeiro-cerqueira`), detalhe: `"Conecte-se comigo profissionalmente"`
  - **Card 4**: GitHub -> `https://github.com/sergiorib/sergiorib` (`https://github.com/sergiorib/sergiorib`), detalhe: `"Veja meus códigos e projetos"`

---

## 4. Success Criteria

- **SC-001**: Tempo de carregamento e injeção do conteúdo no container `.contacts-page` inferior a 150ms em navegação SPA.
- **SC-002**: Fidelidade visual de 100% em relação aos parâmetros definidos na seção **Design & Structure Specifications** (variáveis CSS, gradientes, grid e tipografia).
- **SC-003**: Renderização exata e dinâmica dos cards declarados no **FR-009**, com todos os links funcionais e testados.
- **SC-004**: Adaptação responsiva perfeita do grid em breakpoints (< 720px e < 380px) sem transbordamento (*overflow*) de texto ou elementos.

---

## 5. Asset Resolution Convention (SPA Pages)

Para garantir o correto carregamento de ativos em rotas dinâmicas da SPA:
1. **NÃO utilizar caminhos relativos** (ex: `./assets/...` ou `../contatos/assets/...`).
2. **Utilizar SEMPRE caminhos absolutos** baseados na raiz do servidor estático (ex: `/pages/contatos/assets/images/<arquivo>`).
3. **Verificar a existência física** dos arquivos no diretório correspondente.
4. **Validar a compilação** executando `npm run build`.