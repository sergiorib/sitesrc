# Feature Specification: Estrutura da Página "Portfólio" (`portfolio.astro`)

**Feature Branch**: `05-portfolio`

**Created**: 2026-11-05 (Updated: 2026-11-20 — migração para o modelo em camadas)

**Status**: Em Execução

**Input**: User description: "Criar a pagina que servirá de portal para seleção dos projetos do meu portfólio pessoal de Ciencia de dados. Cada projeto terá um card interativo no qual será exibida uma imagem e outras informações resumidas. O card do projeto servirá de link para a pagina específica de cada projeto. Os projetos serão organizados em categorias, haverá um mecanismo fixo no topo da pagina para facilitar a navegação para as categorias. A página deve seguir a arquitetura SPA do projeto (injetada no Main Container '#page-content-host' via History API sem full reload), garantindo isolamento estrito de assets (CSS, JS e images em subdiretórios de assets) e usando caminhos absolutos para assets estáticos conforme a convenção do projeto."

---

## 1. Objetivo

Este documento define de forma unificada a página "Portfólio de Projetos": o roteamento e a organização de arquivos na SPA (incluindo as subpáginas de projeto), a composição da página (elementos, hierarquia e fontes de dados), a navegação por categorias, os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4. O registro da migração para este modelo está em [migracao.md](migracao.md).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

A página "Portfólio de Projetos" é exibida dentro da área de exibição (`#page-content-host`) ao acessar `/spa/portfolio`, e mantém o item "Portfólio" ativo no menu lateral. O ponto de entrada da SPA é `pages/spa/portfolio.astro`; `pages/portfolio/portfolio.astro` é a cópia da página no diretório da feature. As páginas abertas pelos links dos projetos (e eventuais subpáginas navegadas a partir delas) também são exibidas em `#page-content-host`.

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
│       └── portfolio.js       (navegação por categorias; ver 7.1)
├── data/
│   └── portfolio.json
└── projetos/
    ├── AES1/
    │   └── AES1.html
    └── testes/
        └── pagina_teste.html
```

Recursos compartilhados usados pela página (fora de `pages/portfolio/`):

```text
pages/spa/
├── portfolio.astro                  ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala (inclui --page-header-h)
│   ├── tokens.css                   ← tokens visuais
│   └── main-container.css           ← zera o padding-top do host para páginas com [page-header]
├── assets/js/router.js              ← âncoras, subpáginas .html e data-parent-route
└── components/elementos/            ← componentes dos elementos do catálogo
```

### 2.2 Contrato de Reconhecimento pelo Roteador SPA (`#page-content-host`)

Toda página ou subpágina sob `/pages/portfolio/projetos/**` DEVE seguir o contrato de fragmento SPA para ser injetada sem recarregar a página inteira:

1. **Contêiner raiz**: o documento expõe `#page-content` com `id="page-content"`, `data-page-id="portfolio-project-<slug>"`, `data-page-title="<Título do Projeto>"` e `data-parent-route="/portfolio"` (mantém o item "Portfólio" ativo no menu).
2. **Interceptação de cliques**: links internos dos cards (capa e título) e links internos das páginas de projeto que apontem para `/pages/portfolio/projetos/` são capturados pelo listener delegado global do roteador, que faz o `fetch`, extrai `#page-content` (com estilos e scripts declarados no fragmento), injeta em `#page-content-host` e atualiza a URL via `history.pushState()`.
3. **HTML estático legado**: se a subpágina for um documento HTML completo sem a estrutura Astro, o roteador extrai o conteúdo de `<body>` (ou o envolve em `#page-content`) mantendo a renderização em `#page-content-host`.
4. **Trilha de breadcrumbs**: a subpágina declara `data-breadcrumbs='[{"rotulo": "Portfólio", "url": "/spa/portfolio/"}]'` (spec-01 FR-008.1), para que a trilha seja "Início / Portfólio / <título>" em vez dos diretórios do arquivo (`projetos`, `testes`, …), que não são páginas.
5. **Isolamento**: as mesmas regras das páginas de artigo (spec-06 §2) — estilos restritos à classe raiz da página (o roteador copia os `<style>` do `<head>` para a SPA), scripts encapsulados e reexecutáveis (sem depender de `DOMContentLoaded`, encerrando timers e listeners globais quando a página sai) e, se usar Tailwind (CDN), carregá-lo pelo `<body>` com `preflight` desligado, `important` restrito à classe raiz e a mesma versão fixada na URL das páginas de artigo (hoje `https://cdn.tailwindcss.com/3.4.17`).

As subpáginas atuais (`AES1.html`, `pagina_teste.html`) são HTML estático com estilos próprios e ainda não usam o modelo em camadas. Ambas seguem o item 4; `pagina_teste.html` (raiz `.pt-teste`) também segue o item 5 (`AES1.html` não tem `<style>` nem `<script>`).

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Cabeçalho Fixo e Navegação por Categorias (Priority: P1)

Como visitante ou recrutador, desejo ver o título da página e uma barra com as categorias que me leve direto à categoria escolhida, com o cabeçalho sempre visível no topo.

**Why this priority**: Estabelece a identidade da página e a navegação interna por categoria.

**Independent Test**: Acessar a página, verificar que o `[page-header]` começa no topo de `#page-content-host` sem folga, clicar num link da `[anchor-nav]` e verificar a rolagem até a categoria, o link ativo e o título da categoria visível abaixo do cabeçalho.

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página, **When** o conteúdo é carregado, **Then** o cabeçalho aparece colado no topo da área de exibição, com o título "Portfólio de Projetos" e um link por item de `@dados.categorias`, o primeiro ativo.
2. **Given** o clique num link de categoria, **When** acionado, **Then** o link fica ativo, a página rola suavemente até a sub-seção da categoria e para com o título 100% visível abaixo do cabeçalho (folga de 35px), a URL ganha `#<ancora>` sem trocar de rota, e a página não volta ao topo.
3. **Given** a rolagem manual da página, **When** o topo de uma categoria passa logo abaixo do cabeçalho, **Then** o link dessa categoria fica ativo (scroll-spy).
4. **Given** uma URL com `#<ancora>` de categoria, **When** a página é aberta, **Then** ela rola até a categoria e marca o link correspondente.

---

### 3.2 User Story 2 - Categorias e Cards de Projeto (Priority: P1)

Como avaliador técnico, desejo ver os projetos organizados por categoria, em cards com capa, título, resumo e tecnologias, e ver também as categorias que ainda não têm projetos.

**Why this priority**: Organiza os trabalhos realizados e mantém visível a estrutura de atuação.

**Independent Test**: Verificar se cada item de `@dados.categorias` gera uma `[subsection]` na ordem do arquivo e se apenas as categorias com projetos exibem o grid de `[media-card]`.

**Acceptance Scenarios**:

1. **Given** as categorias de `@dados.categorias`, **When** a página é renderizada, **Then** cada categoria aparece como sub-seção com título `h2` e âncora própria, na ordem do arquivo.
2. **Given** uma categoria com projetos, **When** renderizada, **Then** exibe um card por projeto, com capa, título, resumo (até 3 linhas) e as tags na ordem do arquivo, com o estilo indicado no dado (`ardosia` para hard, `turquesa` para soft).
3. **Given** uma categoria sem projetos, **When** renderizada, **Then** exibe só o título, sem grid nem cards.
4. **Given** cada faixa de largura, **When** a página é exibida, **Then** o grid assume as colunas configuradas na seção 4 (1 coluna < 768px; 2 colunas ≥ 768px).

---

### 3.3 User Story 3 - Navegação para as Páginas dos Projetos (Priority: P1)

Como visitante, ao clicar na capa ou no título de um projeto, desejo abrir a página do projeto sem sair da SPA (ou o repositório externo em nova aba).

**Why this priority**: Garante continuidade da experiência SPA.

**Independent Test**: Clicar na capa do card "Customer Lifecycle Analytics (CLA)" e confirmar que `AES1.html` é injetado em `#page-content-host`; clicar no card do GitHub e confirmar a abertura em nova aba.

**Acceptance Scenarios**:

1. **Given** um card com link interno (`/pages/portfolio/projetos/...`), **When** o usuário clica na capa ou no título, **Then** o roteador SPA injeta a página do projeto em `#page-content-host`, atualiza a URL e mantém "Portfólio" ativo no menu.
2. **Given** a página de um projeto aberta, **When** o usuário clica em links internos da hierarquia do projeto, **Then** essas subpáginas também são exibidas em `#page-content-host`.
3. **Given** um card com link externo (`https://...`), **When** clicado, **Then** abre em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).

---

### 3.4 User Story 4 - Layout Responsivo (Priority: P2)

Como usuário acessando por smartphone ou tablet, desejo que o cabeçalho e os cards se ajustem à largura da tela.

**Why this priority**: Garante legibilidade em telas estreitas.

**Independent Test**: Exibir a página abaixo e acima de 768px, verificando o grid e a barra de categorias.

**Acceptance Scenarios**:

1. **Given** viewport < 768px, **When** a página é exibida, **Then** o grid tem 1 coluna e a barra de categorias fica numa linha com rolagem horizontal própria, sem rolagem horizontal da página.
2. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a página é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** o cabeçalho, a barra de categorias, os títulos e os cards apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
3. **Given** o acesso por celular (largura aproximada de 375 pixels) ou tablet (largura aproximada de 768 pixels), **When** a página é exibida, **Then** o cabeçalho e os cards se apresentam adaptados à tela e legíveis.
4. **Given** que o usuário aumentou o tamanho de fonte padrão nas preferências do navegador, **When** a página é exibida, **Then** os textos são ampliados proporcionalmente e o título da categoria navegada continua visível abaixo do cabeçalho fixo.

---

### 3.5 Edge Cases

- **Categorias vazias e curtas**: o scroll-spy escolhe a última categoria cujo topo já passou da linha do cabeçalho, sem pular para a categoria errada.
- **Altura do cabeçalho variável** (quebra da barra, fonte ampliada): a folga das âncoras e o scroll-spy acompanham a altura medida.
- **Reinjeção pela SPA**: sair e voltar à página não duplica listeners nem observadores.
- **Âncora com `popstate`** sem mudança de `pathname`: o roteador mantém o conteúdo e só ajusta a rolagem.

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root:petroleo] portfolio {titulo: 'Portfólio de Projetos'}
  [page-header:claro]
    [page-title:escuro] 'Portfólio de Projetos'
    [anchor-nav:escuro] *@dados.categorias {rotulo: 'Categorias do portfólio'}

  [subsection:destaque] $item.titulo {ancora: $item.ancora} *@dados.categorias
    [grid] {colunas: 1 → 2 @768}
      [media-card:amarelo] *$item.projetos
        [tag-list]
          [badge:$item.estilo] *$item.tags
```

Categoria sem projetos: o `[grid]` é omitido (R-N06).

## 5. Textos

A página não possui textos longos.

## 6. Fontes de dados

| Referência          | Origem                                       | Campos usados |
|---------------------|----------------------------------------------|---------------|
| @dados.categorias   | pages/portfolio/data/portfolio.json#categorias | titulo, ancora, projetos[] (titulo, resumo, link, imagem, tags[] (nome, estilo: `ardosia` = hard · `turquesa` = soft)) |

Conteúdo (ordem de exibição; imagens em `/pages/portfolio/assets/images/`):

| Categoria (âncora) | Projetos |
|---|---|
| Análise de Dados e BI (`section-bi-analytics`) | **Customer Lifecycle Analytics (CLA)** — análise CLA completa (RFM, LTV, Cohort, CAC e Churn) em e-commerce de cosméticos · link `/pages/portfolio/projetos/AES1/AES1.html` · capa `projeto_CLA.avif` · PowerBI, Python, SQL, DuckDB |
| Machine Learning (`section-machine-learning`) | — |
| Deep Learning (`section-deep-learning`) | — |
| Engenharia de Dados (`section-data-engineering`) | **Pipeline de dados de Transações de Fintech** — pipeline em arquitetura MDS · link `https://github.com/sergiorib/cla-omnibox/blob/main/README.md` · capa `projeto_pipeline1.avif` · Apache Airflow, Delta Lake, Spark, DBT, Python<br>**Projeto de teste** — projeto apenas para teste da especificação · link `/pages/portfolio/projetos/testes/pagina_teste.html` · capa `projeto_CLA.avif` · Tecnologia 1 a 4 |
| Cloud & MLOps (`section-cloud-devops`) | — |
| IA Generativa & LLMs (`section-gen-ai`) | — |
| Modelagem Estatística (`section-stat-modeling`) | — |

Todas as tags atuais são hard (`ardosia`).

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `pages/spa/portfolio.astro` (e a cópia `pages/portfolio/portfolio.astro`), com a folha `pages/portfolio/assets/css/portfolio.css` gerada a partir de [estilos.md](../../catalog/estilos.md) contendo apenas os elementos e estilos usados na página (R-S02), os dados em `pages/portfolio/data/portfolio.json` e o script `pages/portfolio/assets/js/portfolio.js`. Os elementos do catálogo são componentes compartilhados em `pages/spa/components/elementos/`.
- **FR-002**: A página e as páginas de projeto DEVEM ser injetadas em `#page-content-host` pelo roteador SPA, via History API, sem recarregar a página. O elemento raiz DEVE conter `id="page-content"`, `data-page-id="portfolio"` e `data-page-title="Portfólio de Projetos"`; as subpáginas seguem o contrato da seção 2.2.
- **FR-003**: A composição da página DEVE seguir a seção 4 (Estrutura); a aparência de cada elemento é a do estilo indicado, conforme [estilos.md](../../catalog/estilos.md).
- **FR-004**: A página DEVE exibir todas as categorias de `@dados.categorias` e cards apenas para os projetos do arquivo (hoje 3), nunca cards fictícios.
- **FR-005**: `#page-content-host` DEVE zerar o próprio `padding-top` quando a página tiver um `[page-header]` (`main-container.css`), mantendo os respiros laterais, para que o cabeçalho comece no topo da área de exibição.
- **FR-006**: **Navegação por categorias** (`portfolio.js`):
  - **FR-006.1**: o clique num `anchor-nav-link` DEVE impedir a ação padrão, mover `is-ativo` para o link clicado, rolar suavemente até a sub-seção (no `#page-content-host` na SPA; na janela em modo isolado) com folga de `altura do cabeçalho + 35px`, e sincronizar `#<ancora>` na URL via `history.pushState` sem disparar troca de rota;
  - **FR-006.2**: o script DEVE medir a altura do `.page-header` e publicá-la em `--page-header-h` (usada pela folga das sub-seções com âncora), remedindo quando ela mudar (`ResizeObserver`);
  - **FR-006.3**: **scroll-spy**: um `IntersectionObserver` (root = `#page-content-host` na SPA ou viewport isolada; `rootMargin` superior = `-(altura do cabeçalho + 35px)`) com um listener de rolagem limitado por `requestAnimationFrame` DEVE marcar como ativo o link da última sub-seção cujo topo já passou da linha logo abaixo do cabeçalho; após um clique, a seleção fica travada (mínimo 600ms) até a próxima interação de rolagem do usuário (`wheel`, `touchmove`, `keydown`);
  - **FR-006.4**: uma âncora `#section-*` presente na URL ao abrir a página DEVE ativar o link e rolar até a sub-seção;
  - **FR-006.5**: o script DEVE ser idempotente (`dataset.listenerAttached`), desconectar e recriar observadores a cada reinicialização, responder a `DOMContentLoaded`, `pageshow` e `spa:page-loaded`, atuar apenas dentro de `.portfolio-page`, ser entregue como `<script is:inline type="module">` dentro de `#page-content` (conteúdo via `?raw`) e exportar `GET()` por residir sob `pages/`.
- **FR-007**: **Roteador SPA** (`router.js`): (a) `scrollToAnchor()` DEVE usar a mesma folga (`altura do .page-header + 35px`); (b) após injetar um fragmento com `data-parent-route`, o item ativo do menu é o desse atributo; (c) `popstate` sem mudança de `pathname` mantém o conteúdo e só ajusta a rolagem; (d) URLs internas com `.html`/`.htm` são normalizadas antes do `fetch` (ex.: `/pages/portfolio/projetos/AES1/AES1.html` → `/portfolio/projetos/AES1/AES1/`).
- **FR-008**: A página e as páginas de projeto DEVEM apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-009**: Os tamanhos de texto e os espaçamentos DEVEM se adaptar à largura disponível pela escala fluida (`scale.css`), respeitando limites mínimos e máximos.
- **FR-010**: O aumento do tamanho de fonte configurado nas preferências do navegador DEVE ampliar proporcionalmente os textos da página, sem sobreposição ou perda de conteúdo.

### 7.2 Key Entities

- Os elementos da página (`page-root`, `page-header`, `page-title`, `anchor-nav`, `subsection`, `grid`, `media-card`, `tag-list`, `badge`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Categoria** (dados): `titulo`, `ancora`, `projetos[]`; **Projeto**: `titulo`, `resumo`, `link`, `imagem`, `tags[]` (`nome`, `estilo`) — ver `pages/portfolio/data/portfolio.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: A página e as páginas de projeto são exibidas em `#page-content-host` em menos de 150ms, sem recarregamento completo.
- **SC-002**: 100% dos elementos da página exibem a aparência do estilo indicado na seção 4, conforme [estilos.md](../../catalog/estilos.md).
- **SC-003**: As 7 categorias são exibidas e só as que têm projetos geram cards (hoje 3 cards).
- **SC-004**: O cabeçalho começa no topo sem folga; 100% dos cliques na barra de categorias ativam o link, rolam até a categoria e deixam o título visível abaixo do cabeçalho, sem voltar ao topo, na SPA e na página isolada.
- **SC-005**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a página exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-006**: Em celular (largura aproximada de 375 pixels) e tablet (largura aproximada de 768 pixels), a página apresenta layout adaptado e legível, sem rolagem horizontal da página.

---

## 9. Assumptions

- O projeto segue a Constituição v2.0.0: Astro para estruturação estática, CSS3 puro e Vanilla JS.
- As fontes `Barlow` e `Barlow Condensed` são carregadas do Google Fonts (por `tokens.css` e `spa-layout.css`).
- As subpáginas de projeto atuais são HTML estático e serão convertidas ao modelo quando forem reescritas.

---

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos e Links**: ao referenciar imagens ou links de projeto em `pages/portfolio/`:
  1. **NÃO utilize caminhos relativos** ou barras invertidas (`pages\portfolio\...`, `./assets/...`, `../portfolio/assets/...`), pois falham nas rotas aninhadas da SPA.
  2. **Utilize SEMPRE caminhos absolutos POSIX** (ex.: `/pages/portfolio/assets/images/projeto_CLA.avif`, `/pages/portfolio/projetos/AES1/AES1.html`).
  3. **Garanta que os arquivos existam fisicamente** nos diretórios correspondentes.
  4. **Valide a renderização** executando `npm run build` ao finalizar.
