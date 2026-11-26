# Feature Specification: Moldura da SPA (Layout Base, Sidebar, Breadcrumbs e Área de Conteúdo)

**Feature Branch**: `01-pagina-spa`

**Created**: 2026-10-29 (Updated: 2026-11-20 — migração para o modelo em camadas)

**Status**: Em Execução

**Input**: User description: "Criar a estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container) com Sidebar fixa à esquerda com identidade profissional e navegação, e Área de Conteúdo Principal (Main Container) dinâmica à direita, capaz de carregar páginas primárias e subpáginas em cascata de forma transparente, com suporte a navegação por Breadcrumbs."

---

## 1. Objetivo

Este documento define de forma unificada a **moldura** da SPA — o que fica fixo em volta de todas as páginas: layout em tela cheia, sidebar (identidade e menu), régua de breadcrumbs e área de conteúdo — além do roteamento client-side e da página de fallback (404). Cobre a organização de arquivos, a composição (elementos, hierarquia e fontes de dados), os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4. O registro da migração para este modelo está em [migracao.md](migracao.md).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

O documento da SPA é `pages/spa/spa.astro`, servido em `/` (via `pages/index.astro`) e em `/spa`. Ele monta a moldura e carrega a página "Sobre" como conteúdo inicial. A partir daí, o roteador client-side (`router.js`) intercepta os links internos, busca a página da rota (`/spa/<pagina>/` ou qualquer subpágina sob `pages/`), extrai o `#page-content` e o injeta no `[content-host]`, sem recarregar a moldura. Rotas inexistentes exibem a página de fallback `pages/spa/default.astro`.

### 2.1 Árvore Hierárquica da Moldura da SPA

```text
pages/
├── index.astro                       ← "/" → renderiza spa.astro
└── spa/
    ├── spa.astro                     ← documento da SPA (moldura + página inicial)
    ├── default.astro                 ← página de fallback (404)
    ├── sobre.astro · historico.astro · formacao.astro · portfolio.astro · artigos.astro · contatos.astro
    ├── subpagina-demo.astro          (página de demonstração; fora do modelo)
    ├── assets/
    │   ├── css/
    │   │   ├── scale.css             ← tokens de escala
    │   │   ├── tokens.css            ← tokens visuais e fontes
    │   │   ├── spa.css               ← CSS da moldura (base do documento + elementos da moldura)
    │   │   └── default.css           ← CSS da página de fallback
    │   ├── images/
    │   │   ├── profile-photo.png · profile-bg.png · menu-bg.png
    │   │   └── icone-<item>-claro.png · icone-<item>-escuro.png (6 pares)
    │   └── js/
    │       ├── router.js             ← roteador client-side
    │       ├── nav.js                ← item ativo do menu
    │       └── breadcrumbs.js        ← trilha de breadcrumbs
    ├── components/
    │   └── elementos/                ← componentes dos elementos do catálogo (moldura e páginas)
    └── data/
        └── navegacao.json            ← identidade e itens do menu (fonte única)
```

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Acesso Inicial e Renderização da Moldura (Priority: P1)

Como visitante ou recrutador, desejo ver imediatamente a interface em tela cheia com a identidade do profissional, o menu com o item inicial ativo e a página "Sobre" já carregada.

**Why this priority**: É a espinha dorsal da aplicação; nenhuma navegação é possível sem a moldura estável.

**Independent Test**: Carregar a aplicação. Verificar se a moldura corresponde à seção 4.1 (Estrutura): sidebar com `[identity-card]` e `[nav-menu]`, área principal com `[breadcrumbs]` e `[content-host]` exibindo a página "Sobre".

**Acceptance Scenarios**:

1. **Given** que o usuário acessa `/` ou `/spa`, **When** o documento é renderizado, **Then** a moldura ocupa a janela inteira, sem rolagem do documento, com a sidebar à esquerda (≥ 1024px) ou no topo (< 1024px) e a área principal no espaço restante.
2. **Given** o carregamento da sidebar, **When** inspecionada, **Then** exibe a foto, o nome e o cargo de `@dados.identidade` (seção 6).
3. **Given** o estado inicial, **When** a página termina de carregar, **Then** o item de menu com `padrao: true` ("Sobre") está ativo e a página "Sobre" aparece na área de conteúdo.
4. **Given** largura < 1024px, **When** a aplicação é exibida, **Then** a sidebar aparece no topo como cabeçalho compacto, com o menu em faixa horizontal de rolagem própria logo abaixo e o item ativo visível na faixa, sem rolagem horizontal da página.
5. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a aplicação é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** a moldura e a página carregada apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
6. **Given** o acesso por celular (~375px) ou tablet (~768px), **When** a aplicação é exibida, **Then** a moldura e a página carregada se apresentam adaptadas e legíveis, sem rolagem horizontal.
7. **Given** que o usuário aumentou o tamanho de fonte padrão do navegador, **When** a aplicação é exibida, **Then** os textos da moldura e da página são ampliados proporcionalmente, sem sobreposição.

---

### 3.2 User Story 2 - Navegação entre Páginas sem Recarregamento (Priority: P1)

Como visitante, desejo alternar entre as seções do menu sem recarregar a moldura.

**Why this priority**: É a promessa central de uma Single Page Application.

**Independent Test**: Clicar nos 6 itens do menu. Verificar se cada clique ativa o item, troca o conteúdo do `[content-host]`, atualiza a URL e mantém a sidebar estática.

**Acceptance Scenarios**:

1. **Given** a página "Sobre", **When** o usuário clica em "Portfólio", **Then** o clique é interceptado, a sidebar não recarrega, "Portfólio" fica ativo (`is-ativo` + `aria-current="page"`), o item anterior fica inativo e a página do Portfólio é injetada no `[content-host]`.
2. **Given** a navegação para uma seção, **When** o conteúdo é carregado, **Then** a URL é sincronizada via History API, sem recarregar a aplicação.
3. **Given** os botões Voltar/Avançar do navegador, **When** acionados, **Then** o conteúdo e o item ativo do menu são restaurados de forma sincronizada.
4. **Given** largura < 1024px, **When** um item fora da área visível da faixa fica ativo, **Then** a faixa rola sozinha até mostrá-lo, sem mover a página.

---

### 3.3 User Story 3 - Breadcrumbs em Páginas e Subpáginas (Priority: P2)

Como usuário em páginas profundas, desejo ver a trilha hierárquica no topo da área principal e voltar aos níveis anteriores.

**Why this priority**: Dá contexto de localização em páginas com subníveis.

**Independent Test**: Abrir uma subpágina de projeto do Portfólio e verificar a trilha e a navegação pelos níveis anteriores.

**Acceptance Scenarios**:

1. **Given** uma página do menu, **When** carregada, **Then** a trilha mostra "Início / <data-page-title da página>".
2. **Given** uma subpágina (ex.: projeto do Portfólio), **When** carregada, **Then** a trilha mostra todos os níveis da rota, com os anteriores clicáveis (rótulos do menu quando existirem) e o último igual ao `data-page-title`.
3. **Given** o clique num nível anterior, **When** acionado, **Then** a SPA navega para ele e sincroniza menu e histórico; "Início" leva a `/spa` (página "Sobre").
4. **Given** uma subpágina com `data-breadcrumbs` (ex.: glossário do artigo "Séries temporais"), **When** carregada, **Then** a trilha mostra "Início", os níveis declarados (clicáveis) e o `data-page-title`.

---

### 3.4 User Story 4 - Subpáginas Dinâmicas e Página de Fallback (Priority: P2)

Como visitante ou desenvolvedor, desejo que qualquer link interno sob `pages/` abra na área de conteúdo e que rotas inexistentes mostrem uma página de fallback.

**Why this priority**: Permite crescer o portfólio sem listas fixas de rotas e trata erros sem quebrar a aplicação.

**Independent Test**: Navegar para uma subpágina existente e para uma rota inexistente.

**Acceptance Scenarios**:

1. **Given** um link interno para uma subpágina existente sob `pages/`, **When** acionado, **Then** o roteador a busca e injeta no `[content-host]`, mantendo ativo o item de menu pai.
2. **Given** um link interno para uma rota inexistente (ou falha de carregamento), **When** acionado, **Then** o roteador exibe a página de fallback (seção 4.2) e a trilha "Início / Página não encontrada".
3. **Given** a página de fallback, **When** o usuário clica em "Retornar à Página Inicial", **Then** a SPA navega para a página "Sobre".

---

### 3.5 Edge Cases

- **Cliques rápidos sucessivos no menu**: o `[content-host]` mostra exatamente o último destino solicitado.
- **Falha de rede**: exibe a página de fallback sem travar a sidebar.
- **Links externos**: não são interceptados (comportamento nativo do navegador).
- **Redimensionamento**: a moldura alterna entre os arranjos < 1024px e ≥ 1024px sem perder o item ativo nem o conteúdo.
- **Acesso direto por URL ou refresh**: o estado inicial (item ativo, breadcrumbs) é coerente com a rota.
- **`popstate` só de âncora** (mesmo `pathname`): mantém o conteúdo e só rola até a âncora.

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

### 4.1 Moldura

```
[app-layout:escuro]
  [sidebar:escuro] {rotulo: 'Identidade e Navegação'}
    [identity-card:moldura] @dados.identidade
    [nav-menu:escuro] *@dados.navegacao {rotulo: 'Menu Principal'}
  [main-area:escuro]
    [breadcrumbs:discreto]
    [content-host]                     ← recebe o [page-root] da página da rota atual
```

O documento também aplica a **Base do documento** de [estilos.md](../../catalog/estilos.md) (§1.1).

### 4.2 Página de fallback (404)

```
[page-root:petroleo] default {titulo: 'Página não encontrada'}
  [container:centralizado]
    [panel:escuro] '⚠️ Página Não Encontrada (404)'
      [vertical-list:amplo]
        [paragraph:claro] 'A rota ou recurso solicitado não foi localizado na estrutura do portfólio.'
        [link-item:ciano] @dados.retorno
```

## 5. Textos

A moldura e a página de fallback não possuem textos longos.

## 6. Fontes de dados

| Referência          | Origem                                     | Campos usados |
|---------------------|--------------------------------------------|---------------|
| @dados.identidade   | pages/spa/data/navegacao.json#identidade   | nome, cargo, foto |
| @dados.navegacao    | pages/spa/data/navegacao.json#navegacao    | id, rotulo, rota, icone_claro, icone_escuro, padrao? |
| @dados.retorno      | inline (abaixo)                            | titulo, url |

Identidade: **Sérgio Ribeiro Cerqueira** · Cientista de Dados · `/pages/spa/assets/images/profile-photo.png`.

Menu (ordem de exibição; ícones em `/pages/spa/assets/images/`):

| id | rótulo | rota | ícones |
|---|---|---|---|
| sobre (**padrão**) | Sobre | `/spa/sobre/` | `icone-sobre-claro.png` / `icone-sobre-escuro.png` |
| historico | Histórico | `/spa/historico/` | `icone-historico-claro.png` / `icone-historico-escuro.png` |
| formacao | Formação | `/spa/formacao/` | `icone-formacao-claro.png` / `icone-formacao-escuro.png` |
| portfolio | Portfólio | `/spa/portfolio/` | `icone-portfolio-claro.png` / `icone-portfolio-escuro.png` |
| artigos | Artigos | `/spa/artigos/` | `icone-artigos-claro.png` / `icone-artigos-escuro.png` |
| contatos | Contatos | `/spa/contatos/` | `icone-contatos-claro.png` / `icone-contatos-escuro.png` |

@dados.retorno: `titulo` "← Retornar à Página Inicial (Sobre)", `url` `/spa/sobre/`.

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer o documento `pages/spa/spa.astro` (servido em `/` por `pages/index.astro`), montado com os componentes da moldura e os dados de `pages/spa/data/navegacao.json`, com o CSS da moldura `pages/spa/assets/css/spa.css` gerado a partir de [estilos.md](../../catalog/estilos.md) (Base do documento + elementos da moldura) e os tokens de `scale.css` e `tokens.css`.
- **FR-002**: A composição da moldura DEVE seguir a seção 4.1; a da página de fallback, a seção 4.2. A aparência de cada elemento é a do estilo indicado.
- **FR-003**: Os **ids** da moldura são ganchos estáveis do JS e NÃO DEVEM mudar: `#spa-layout`, `#sidebar`, `#identity-header`, `#sidebar-nav`, `#main-container`, `#breadcrumbs`, `#breadcrumbs-list`, `#page-content-host`.
- **FR-004**: O item do menu com `padrao: true` DEVE estar ativo na inicialização.
- **FR-005**: O `[content-host]` DEVE ser o alvo único de injeção de conteúdo para todas as páginas e subpáginas, preservando a moldura sem recarregamento.
- **FR-006**: **Roteador** (`router.js`):
  - **FR-006.1**: delegação global de cliques (`document.addEventListener('click', …)`) para links internos, cancelando o reload (`preventDefault()`); links com `#`, `target="_blank"`, externos (`http(s)`, `mailto:`, `tel:`) ou `data-native` não são interceptados;
  - **FR-006.2**: carregamento assíncrono de qualquer página ou subpágina sob `pages/`, sem lista fixa de rotas; URLs internas com `.html`/`.htm` são normalizadas antes do `fetch`;
  - **FR-006.3**: o item de menu ativo é o da rota (mapa de rotas) ou o de `data-parent-route` do fragmento injetado; subpáginas mantêm o item pai ativo;
  - **FR-006.4**: sincronização com a History API (`pushState` e `popstate`); `popstate` sem mudança de `pathname` NÃO recarrega o conteúdo nem volta ao topo, apenas rola até a âncora (folga = altura do `.page-header` + 35px, quando houver);
  - **FR-006.5**: rota inválida ou erro de carregamento exibe `pages/spa/default.astro` no `[content-host]`;
  - **FR-006.6**: scripts presentes no fragmento injetado são reexecutados (`executeIncomingScripts`) e o evento `spa:page-loaded` é disparado após a injeção; estilos dinâmicos da página anterior são removidos.
- **FR-007**: **Menu** (`nav.js`): ao trocar de rota, move `is-ativo` e `aria-current="page"` para o `nav-menu-item` da seção (por `data-menu-id`) e, abaixo de 1024px, rola apenas a faixa do menu para manter o item ativo visível.
- **FR-008**: **Breadcrumbs** (`breadcrumbs.js`): monta a trilha em `#breadcrumbs-list` a cada navegação — "Início" (→ `/spa`), um nível por segmento da rota (ignorando `pages` e `spa`), com rótulos do menu de `navegacao.json` quando existirem, e o último nível igual ao `data-page-title` da página.
  - **FR-008.1**: **Trilha declarada**: se o `#page-content` injetado declarar `data-breadcrumbs` (JSON: lista de `{"rotulo", "url"}` dos níveis anteriores, do mais alto ao pai), a trilha é "Início" + esses níveis (clicáveis) + o `data-page-title`, em vez dos segmentos da rota. Usado por subpáginas cuja rota de arquivo tem diretórios que não são páginas (ex.: `pages/artigos/artigos_pages/…`).
- **FR-009**: Os dados do menu e da identidade DEVEM ter uma única fonte (`navegacao.json`), lida pelo menu e pelos breadcrumbs.
- **FR-010**: A aplicação DEVE apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-011**: Os tamanhos de texto e os espaçamentos DEVEM se adaptar à largura disponível pela escala fluida (`scale.css`), com limites mínimos e máximos, de forma uniforme em toda a aplicação.
- **FR-012**: O aumento do tamanho de fonte configurado no navegador DEVE ampliar proporcionalmente os textos de toda a aplicação, sem sobreposição ou perda de conteúdo.
- **FR-013**: **Publicação das imagens no build**: o `npm run build` DEVE copiar cada `pages/<modulo>/assets/images/` para `dist/pages/<modulo>/assets/images/` (integração `copiar-imagens-das-paginas` em `astro.config.mjs`, hook `astro:build:done`), ignorando arquivos ocultos (ex.: `.gitkeep`), para que os caminhos absolutos `/pages/<modulo>/assets/images/<arquivo>` funcionem no site publicado como funcionam no servidor de desenvolvimento. Uma pasta `assets/images` nova em qualquer página é incluída sem alterar a configuração.

### 7.2 Key Entities

- Os elementos da moldura (`app-layout`, `sidebar`, `identity-card`, `nav-menu`, `main-area`, `breadcrumbs`, `content-host`) e os da página de fallback (`page-root`, `container`, `panel`, `vertical-list`, `paragraph`, `link-item`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Identidade** (dados): `nome`, `cargo`, `foto`; **Item de menu**: `id`, `rotulo`, `rota`, `icone_claro`, `icone_escuro`, `padrao?` — ver `pages/spa/data/navegacao.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: A moldura inicial é carregada e visível em menos de 1 segundo em conexões de banda larga.
- **SC-002**: A troca entre seções ou subpáginas ocorre em menos de 300ms após o clique, sem *layout shift* nem recarregamento.
- **SC-003**: 100% das navegações por links internos sob `pages/` preservam a moldura sem recarregar a janela.
- **SC-004**: 100% das rotas internas inexistentes exibem a página de fallback sem travar a interface.
- **SC-005**: 100% das interações com Voltar/Avançar restauram conteúdo, item ativo e breadcrumbs, preservando âncoras e posições de rolagem.
- **SC-006**: A moldura permanece enquadrada em 100% da janela em qualquer resolução, com rolagem apenas dentro do `[content-host]` (e da faixa do menu < 1024px).
- **SC-007**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a aplicação exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-008**: Em celular (~375px) e tablet (~768px), a aplicação apresenta layout adaptado e legível, sem rolagem horizontal da página.

---

## 9. Assumptions

- O projeto segue a Constituição v2.0.5: Astro para estruturação estática, CSS3 puro e Vanilla JS.
- As fontes `Barlow` e `Barlow Condensed` são carregadas do Google Fonts por `tokens.css`.
- `subpagina-demo.astro` é uma página de demonstração do roteamento aninhado e fica fora do modelo em camadas.
- As subpáginas de projeto do Portfólio (`pages/portfolio/projetos/`) e as páginas de artigo (`pages/artigos/artigos_pages/`), em HTML estático legado, seguem a exceção do Princípio VII; mesmo assim cumprem o contrato de fragmento (`#page-content`, `data-page-id`, `data-page-title`, `data-parent-route`), declaram a trilha em `data-breadcrumbs` (FR-008.1) e não alteram a moldura.

---

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: imagens e ícones referenciados no markup DEVEM usar caminhos absolutos (ex.: `/pages/spa/assets/images/<arquivo>`), pois caminhos relativos falham nas rotas aninhadas da SPA. Imagens de fundo referenciadas em CSS usam caminhos relativos ao arquivo CSS (resolvidos no build).
- **Garanta que os arquivos existam fisicamente** em `pages/spa/assets/images/` e **valide** executando `npm run build` ao finalizar.
- **Publicação**: as imagens referenciadas por caminho absoluto não são importadas pelo código; o build as copia para `dist/pages/...` (FR-013). Confira o site compilado com `astro preview` (configuração `astro-preview` em `.claude/launch.json`), pois o servidor de desenvolvimento encontra qualquer arquivo do projeto e esconde imagens ausentes do build.
