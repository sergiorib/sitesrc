# Feature Specification: Estrutura da Página "Artigos técnicos" (`artigos.astro`)

**Feature Branch**: `06-artigos`

**Created**: 2026-11-04 (Updated: 2026-11-20 — migração para o modelo em camadas)

**Status**: Em Execução

**Input**: User description: "Página de entrada dos artigos técnicos do portfólio: um catálogo temático em grupos recolhíveis (com subgrupos), em que cada artigo é um link para a página do artigo, integrada à SPA (injetada em '#page-content-host' via History API, sem full reload), com assets isolados por página e caminhos absolutos."

---

## 1. Objetivo

Este documento define de forma unificada a página "Artigos técnicos": o roteamento e a organização de arquivos na SPA, a composição da página (elementos, hierarquia e fontes de dados), o comportamento de seleção de artigos, os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4. O registro da migração para este modelo está em [migracao.md](migracao.md).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

A página "Artigos técnicos" é exibida dentro da área de exibição (`#page-content-host`) ao acessar `/spa/artigos`, e mantém o item "Artigos" ativo no menu lateral (mapeamento `ROUTE_PARENT_MAP` em `pages/spa/assets/js/router.js`). O ponto de entrada da SPA é `pages/spa/artigos.astro`; `pages/artigos/artigos.astro` é a cópia da página no diretório da feature.

Cada artigo é uma subpágina sob `/spa/artigos/<slug>`, aberta pelo roteador SPA dentro de `#page-content-host`. As páginas dos artigos ainda não existem: até serem criadas, a navegação exibe o fallback 404 da SPA. Quando criadas, DEVEM seguir o contrato de fragmento da SPA (`id="page-content"`, `data-page-id`, `data-page-title`) e declarar `data-parent-route="/artigos"`, para manter o item "Artigos" ativo no menu.

### 2.1 Árvore Hierárquica de Páginas da Artigos

```text
pages/artigos/
├── artigos.astro
├── assets/
│   ├── css/
│   │   └── artigos.css
│   ├── images/              (sem imagens no momento; .gitkeep)
│   └── js/
│       └── artigos.js       (seleção de artigos; ver 7.1)
└── data/
    └── artigos.json
```

Recursos compartilhados usados pela página (fora de `pages/artigos/`):

```text
pages/spa/
├── artigos.astro                    ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala
│   └── tokens.css                   ← tokens visuais
└── components/elementos/            ← componentes dos elementos do catálogo
```

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Visualização da Página e do Catálogo Temático (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo ver a página "Artigos técnicos" com o catálogo de temas organizado em duas colunas e o rodapé institucional.

**Why this priority**: Estabelece a estrutura de navegação temática da página.

**Independent Test**: Acessar a rota da página "Artigos" na SPA. Verificar se a página corresponde à seção 4 (Estrutura): título, subtítulo, divisória, as duas colunas de grupos de `@dados.colunas` e o rodapé de `@dados.rodape`.

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página na SPA, **When** o conteúdo é injetado em `#page-content-host`, **Then** exibe o título "Artigos técnicos", o subtítulo "Seleciona o tema." e a divisória, nos estilos indicados na seção 4.
2. **Given** cada faixa de largura, **When** a página é exibida, **Then** o grid de grupos assume as colunas configuradas na seção 4 (1 coluna < 1024px; 2 colunas ≥ 1024px), com a coluna esquerda antes da direita.
3. **Given** o rodapé, **When** renderizado, **Then** exibe o texto e o lema de `@dados.rodape`, com os separadores entre as palavras do lema.

---

### 3.2 User Story 2 - Grupos e Subgrupos Recolhíveis (Priority: P1)

Como avaliador ou entusiasta de dados, desejo abrir e fechar os grupos de temas e seus subgrupos, para explorar o catálogo de forma progressiva.

**Why this priority**: Permite navegar por um catálogo extenso de artigos sem poluir a página.

**Independent Test**: Carregar a página, confirmar que apenas o grupo marcado com `aberto` em `@dados.colunas` inicia aberto e abrir/fechar grupos e subgrupos.

**Acceptance Scenarios**:

1. **Given** o carregamento inicial, **When** a página é exibida, **Then** só "Análise de dados e BI" está aberto; os demais grupos e todos os subgrupos estão fechados.
2. **Given** o clique no cabeçalho de um grupo ou subgrupo, **When** acionado, **Then** o conteúdo abre ou fecha e a seta indica o estado, conforme o comportamento de `accordion` em [elementos.md](../../catalog/elementos.md).
3. **Given** o teclado, **When** o cabeçalho de um grupo recebe foco e o usuário pressiona Enter ou Espaço, **Then** o grupo abre ou fecha.

---

### 3.3 User Story 3 - Seleção de Artigos e Navegação (Priority: P2)

Como usuário navegando pelos artigos, desejo clicar em um artigo, ver qual escolhi e ser levado à página dele.

**Why this priority**: Conecta o catálogo aos artigos com retorno visual claro.

**Independent Test**: Clicar em um artigo (ex.: "Séries temporais"), confirmar a marcação de selecionado e a navegação para `/spa/artigos/<slug>` após 150ms.

**Acceptance Scenarios**:

1. **Given** o clique em um artigo, **When** acionado, **Then** a seleção anterior é desfeita e o artigo clicado fica selecionado, com a marca `✓`.
2. **Given** um artigo selecionado, **When** passam 150ms, **Then** o roteador SPA abre o `url` do artigo em `#page-content-host`, sem recarregar a página.
3. **Given** cliques rápidos em artigos diferentes, **When** feitos em menos de 150ms, **Then** só o último artigo clicado é aberto.
4. **Given** um artigo cuja página ainda não existe, **When** aberto, **Then** a SPA exibe o fallback 404 e o item "Artigos" continua ativo no menu.

---

### 3.4 User Story 4 - Layout Responsivo (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que a página se adapte à largura da tela sem perda de legibilidade.

**Why this priority**: Assegura legibilidade e usabilidade sem quebras de layout em dispositivos móveis.

**Independent Test**: Exibir a página abaixo de 768px, entre 768px e 1023px e a partir de 1024px. Verificar as colunas do grid e o arranjo do rodapé.

**Acceptance Scenarios**:

1. **Given** cada faixa de largura, **When** a página é redimensionada, **Then** o grid e o rodapé seguem a seção 4 e o comportamento responsivo dos elementos, sem rolagem horizontal.
2. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a página é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** o cabeçalho, os grupos, os artigos e o rodapé apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
3. **Given** o acesso por celular (largura aproximada de 375 pixels) ou tablet (largura aproximada de 768 pixels), **When** a página é exibida, **Then** os grupos se apresentam adaptados à tela e legíveis, sem rolagem horizontal.
4. **Given** que o usuário aumentou o tamanho de fonte padrão nas preferências do navegador, **When** a página é exibida, **Then** os textos dos grupos e dos artigos são ampliados proporcionalmente, sem sobreposição ou perda de conteúdo.

---

### 3.5 Edge Cases

- **Reinjeção pela SPA**: navegar para outra página e voltar não duplica listeners do JS de seleção nem estilos.
- **Grupo só com subgrupos** (Nuvem): exibe apenas os subgrupos, sem lista vazia.
- **Grupo com artigos e subgrupo** (Deep Learning): exibe primeiro os artigos e depois o subgrupo.
- **JS indisponível**: grupos continuam abrindo e fechando (recurso nativo) e os artigos continuam navegáveis (links reais).

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root:petroleo] artigos {titulo: 'Artigos técnicos'}
  [container:centralizado]
    [page-title:claro] 'Artigos técnicos'
    [paragraph:claro] 'Seleciona o tema.'
    [divider:sublinhado]

    [grid] {colunas: 1 → 2 @1024}
      [vertical-list:amplo] *@dados.colunas
        [accordion:vidro] *$item.grupos
          [vertical-list:compacto]
            [link-item:ciano] *$item.artigos
          [accordion:pilula] *$item.subgrupos
            [vertical-list:compacto]
              [link-item:ciano] *$item.artigos

    [page-footer:ciano] @dados.rodape
```

Lista de artigos vazia ou sem subgrupos: o elemento correspondente é omitido.

## 5. Textos

A página não possui textos longos.

## 6. Fontes de dados

| Referência       | Origem                                   | Campos usados |
|------------------|------------------------------------------|---------------|
| @dados.colunas   | pages/artigos/data/artigos.json#colunas  | grupos[] (icone, titulo, aberto?, artigos[] (titulo, url), subgrupos[] (icone, titulo, artigos[])) |
| @dados.rodape    | pages/artigos/data/artigos.json#rodape   | texto, lema[] |

Catálogo (13 grupos, 4 subgrupos, 42 artigos; `url` de cada artigo = `/spa/artigos/<slug>`):

| Coluna | Grupo (ícone) | Artigos | Subgrupos |
|---|---|---|---|
| esq. | Análise de dados e BI (▥) — **aberto** | Séries temporais · Gráficos · KPIs | — |
| esq. | Engenharia de dados (⚙) | Pipelines | — |
| esq. | Machine Learning (☧) | Modelos de otimização · Sistemas de Recomendação · Aprendizado por Reforço | — |
| esq. | Deep Learning (✣) | Redes Neurais Artificiais (ANN) · Processamento de Linguagem Natural (NLP) | Redes Neurais Recorrentes: RNN · LSTM · GRU |
| esq. | IA (◼) | Agentes · Transformers e IA Generativa · Prompt patterns · GSK | — |
| esq. | Nuvem (☁) | — | GCP · AWS · AZURE: Armazenamento de dados · Integração e processamento · Data warehouse e análise (cada) |
| dir. | Conceitos (☧) | Arquitetura medalhão · Big Data · ETL/ELT | — |
| dir. | Apresentação (▥) | Power BI · Tableau | — |
| dir. | Linguagens (‹›) | Python · R · SQL | — |
| dir. | Databases e formatos de dados (▤) | SQL Server · Oracle · MySQL · PostgreSQL · Parquet · Delta Lake | — |
| dir. | Plataformas (±) | Databricks | — |
| dir. | Matemática (∑) | Estatística | — |
| dir. | Outros (☆) | GitHub | — |

Rodapé: texto "© 2026 — Portfólio de Dados"; lema "ANALISAR", "CONSTRUIR", "EVOLUIR".

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `pages/spa/artigos.astro` (e a cópia `pages/artigos/artigos.astro`), com a folha `pages/artigos/assets/css/artigos.css` gerada a partir de [estilos.md](../../catalog/estilos.md) contendo apenas os elementos e estilos usados na página (R-S02), os dados em `pages/artigos/data/artigos.json` e o script `pages/artigos/assets/js/artigos.js`. Os elementos do catálogo são componentes compartilhados em `pages/spa/components/elementos/`.
- **FR-002**: A página DEVE ser injetada em `#page-content-host` pelo roteador SPA, via History API, sem recarregar a página. O elemento raiz DEVE conter `id="page-content"`, `data-page-id="artigos"` e `data-page-title="Artigos técnicos"`.
- **FR-003**: A composição da página DEVE seguir a seção 4 (Estrutura); a aparência de cada elemento é a do estilo indicado, conforme [estilos.md](../../catalog/estilos.md).
- **FR-004**: O catálogo exibido DEVE corresponder exatamente a `@dados.colunas` (13 grupos, 4 subgrupos, 42 artigos), na ordem do arquivo; só o grupo com `aberto: true` inicia aberto.
- **FR-005**: Abrir e fechar grupos e subgrupos é comportamento nativo do `accordion` (sem JavaScript).
- **FR-006**: **Seleção de artigos** (`artigos.js`):
  - **FR-006.1**: ao clicar num `link-item`, o script DEVE impedir a navegação imediata, desfazer a seleção anterior (classe `is-selecionado` e marca `link-item-check`), aplicar `is-selecionado` ao item clicado e anexar `<span class="link-item-check">✓</span>`;
  - **FR-006.2**: após 150ms, o script DEVE navegar para o `href` do item pelo roteador SPA (âncora temporária interceptada pelo listener global), sem recarregar a página; um novo clique antes desse prazo cancela a navegação pendente;
  - **FR-006.3**: o script DEVE ser idempotente entre navegações SPA (marcador `dataset.listenerAttached`), inicializar no carregamento e no evento `spa:page-loaded` (registrado uma única vez) e atuar apenas dentro de `.artigos-page`;
  - **FR-006.4**: o script DEVE ser entregue como `<script is:inline type="module">` dentro de `#page-content` (conteúdo importado via `?raw`), para ser reexecutado pelo roteador a cada injeção, e exportar `GET()` por residir sob `pages/`.
- **FR-007**: A página DEVE apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-008**: Os tamanhos de texto e os espaçamentos DEVEM se adaptar à largura disponível pela escala fluida (`scale.css`), respeitando limites mínimos e máximos.
- **FR-009**: O aumento do tamanho de fonte configurado nas preferências do navegador DEVE ampliar proporcionalmente os textos da página, sem sobreposição ou perda de conteúdo.

### 7.2 Key Entities

- Os elementos da página (`page-root`, `container`, `page-title`, `paragraph`, `divider`, `grid`, `vertical-list`, `accordion`, `link-item`, `page-footer`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Grupo** (dados): `icone`, `titulo`, `aberto?`, `artigos[]`, `subgrupos[]`; **Artigo**: `titulo`, `url` — ver `pages/artigos/data/artigos.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: A página é injetada em `#page-content-host` em menos de 150ms, sem recarregamento completo.
- **SC-002**: 100% dos elementos da página exibem a aparência do estilo indicado na seção 4, conforme [estilos.md](../../catalog/estilos.md).
- **SC-003**: 100% dos 13 grupos, 4 subgrupos e 42 artigos de `@dados.colunas` são exibidos, com "Análise de dados e BI" aberto por padrão.
- **SC-004**: 100% dos cliques em artigos exibem o estado selecionado e `✓` antes da navegação em 150ms, sem duplicação de listeners após várias navegações SPA.
- **SC-005**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a página exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-006**: Em celular (largura aproximada de 375 pixels) e tablet (largura aproximada de 768 pixels), a página apresenta layout adaptado e legível, sem rolagem horizontal.

---

## 9. Assumptions

- O projeto segue a Constituição v2.0.0: Astro para estruturação estática, CSS3 puro e Vanilla JS.
- As fontes `Barlow` e `Barlow Condensed` são carregadas do Google Fonts (por `tokens.css` e `spa-layout.css`).
- As páginas dos artigos serão criadas depois; até lá, a navegação para elas exibe o fallback 404 da SPA.

---

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: ao adicionar imagens ou assets em `pages/artigos/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../artigos/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/artigos/`).
  2. **Utilize SEMPRE o caminho absoluto** (ex: `/pages/artigos/assets/images/<arquivo>`).
  3. **Garanta que o arquivo exista fisicamente** em `pages/artigos/assets/images/`.
  4. **Valide a renderização** executando `npm run build` ao finalizar.
