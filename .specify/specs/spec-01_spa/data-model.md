# Data Model: Estrutura da Página Principal SPA

**Feature**: `01-pagina-spa` (Estrutura da Página Principal SPA)  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Visão Geral das Entidades de Dados e Estado

Como uma aplicação orientada a Astro SSG com Vanilla JavaScript e CSS3 puro, as estruturas de dados modelam o estado de execução da aplicação no cliente, a representação estrutural da navegação e as entidades de interface.

---

## 2. Entidades Principais

### 2.1 `NavigationItem` (Item de Menu Primário)

Representa uma das 6 opções de navegação da Sidebar principal.

| Atributo | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | `string` | Identificador único / chave da seção | `"sobre"` |
| `label` | `string` | Texto visível exibido no botão do menu | `"Sobre"` |
| `targetFile` | `string` | Nome do arquivo Astro correspondente | `"sobre.astro"` |
| `targetRoute` | `string` | Caminho de rota interna requisitado | `"/pages/sobre"` |
| `iconLight` | `string` | Caminho do ícone para estado inativo | `"pages/spa/assets/images/icone-sobre-claro.png"` |
| `iconDark` | `string` | Caminho do ícone para estado ativo | `"pages/spa/assets/images/icone-sobre-escuro.png"` |
| `isDefault` | `boolean` | Indica se é o item ativo padrão inicial | `true` (apenas para "Sobre") |
| `order` | `number` | Ordem de exibição na Sidebar (1 a 6) | `1` |

**Regras de Validação e Transição de Estado**:
- Apenas um `NavigationItem` pode possuir o estado visual ativo (`.active`) simultaneamente.
- Quando `isActive === true`:
  - Cor de fundo: `#B3CBDB`
  - Borda: `#69C4CE`
  - Cor do texto: `#061B2A`
  - Ícone visível: `iconDark`
- Quando `isActive === false`:
  - Cor de fundo: `#061B2A`
  - Borda: `#69C4CE`
  - Cor do texto: `#EDF2EE`
  - Ícone visível: `iconLight`

---

### 2.2 `IdentityHeaderConfig` (Configuração de Identidade)

Encapsula os dados e parâmetros visuais do cabeçalho da Sidebar.

| Atributo | Tipo | Descrição | Valor / Padrão |
|---|---|---|---|
| `height` | `number` | Altura fixa da área superior | `275px` |
| `bgImage` | `string` | Imagem de fundo do cabeçalho | `"pages/spa/assets/images/profile-bg.png"` |
| `borderColor` | `string` | Cor da borda delimitadora | `"#69C4CE"` |
| `photoUrl` | `string` | Imagem da foto de perfil | `"pages/spa/assets/images/profile-photo.png"` |
| `photoDiameter` | `number` | Diâmetro circular da foto | `160px` |
| `photoFrameGradient` | `string` | Gradiente vertical da moldura | `linear-gradient(to bottom, #3893BA, #25797F)` |
| `nameText` | `string` | Nome profissional em destaque | `"Sérgio Ribeiro Cerqueira"` |
| `nameTypography` | `string` | Configuração tipográfica do nome | `Barlow Condensed, 600, 30px, #FFFFFF` |
| `roleText` | `string` | Cargo/profissão em destaque | `"Cientista de Dados"` |
| `roleTypography` | `string` | Configuração tipográfica do cargo | `Barlow Condensed, 600, 25px, #FFFFFF` |
| `contrastOverlayColor` | `string` | Cor da faixa de contraste escurecida | `rgba(6, 27, 42, 0.75)` (`#061B2A`) |

---

### 2.3 `BreadcrumbSegment` (Segmento da Trilha Hierárquica)

Representa um elo na régua horizontal de Breadcrumbs.

| Atributo | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `label` | `string` | Rótulo legível exibido para o nível | `"Portfólio"`, `"Projeto Detalhado"` |
| `url` | `string` | Rota para a qual o link deve navegar | `"/pages/portfolio"`, `null` (se terminal) |
| `isCurrent` | `boolean` | Indica se é o segmento final da página ativa | `true` para a página atual |
| `depth` | `number` | Nível de profundidade na árvore (0 = raiz) | `0`, `1`, `2` |

**Regras de Apresentação**:
- Formatado em linha única com barra `/` como separador sutil.
- Todos os segmentos onde `isCurrent === false` devem possuir comportamento clicável disparando navegação interna.
- O último segmento onde `isCurrent === true` deve ser renderizado como texto inativo/estático destacando a localização atual.

---

### 2.4 `RouteState` (Estado de Rota e Navegação)

Objeto de estado persistido no histórico do navegador (`History API`) e manipulado em tempo de execução pelo `router.js`.

| Atributo | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `url` | `string` | Caminho de rota ativo na URL | `"/pages/portfolio/projeto-01"` |
| `parentKey` | `string` | Chave do menu primário pai que deve ficar ativo | `"portfolio"` |
| `breadcrumbs` | `BreadcrumbSegment[]` | Lista sequencial dos segmentos hierárquicos | `[ { label: 'Portfólio', ... }, ... ]` |
| `isFallback` | `boolean` | Flag que indica se a rota renderizada é 404 | `false` (ou `true` se erro) |
| `timestamp` | `number` | Registro de data/hora do disparo da navegação | `1730220000000` |

---

### 2.5 `DOMBindings` (Elementos Alvo da SPA)

Identificadores de elementos no DOM vinculados aos controladores de interface:

| Identificador | Elemento DOM | Papel no Ciclo de Vida da SPA |
|---|---|---|
| `#spa-layout` | `<div id="spa-layout">` | Contêiner raiz em tela cheia (100vw x 100vh) |
| `#sidebar` | `<aside id="sidebar">` | Sidebar estável de 300px com identidade e menu |
| `#main-content` | `<main id="main-content">` | Ponto exclusivo de injeção de conteúdo (*Single Content Target*) |
| `#breadcrumbs-container` | `<nav id="breadcrumbs-container">` | Barra horizontal discreta de navegação hierárquica |
| `#page-content-host` | `<section id="page-content-host">` | Contêiner interno do conteúdo dinâmico carregado |
