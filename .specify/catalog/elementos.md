# Catálogo de Elementos

> Formato: [formato-elementos.md](formato-elementos.md) · Estilos: [estilos.md](estilos.md) ·
> Notação das páginas: [notacao-estrutura.md](notacao-estrutura.md)
>
> Componentes Astro: `pages/spa/components/elementos/<Elemento>.astro` (um por elemento).
> Páginas já convertidas: **todas** (spec-02 a spec-07). O catálogo antigo
> ([arquivo/catalogo-elementos.md](arquivo/catalogo-elementos.md)) fica arquivado como histórico.

## 1. Layout

### page-root
ID: EL-01
Descrição: Contêiner raiz de uma página do SPA.
HTML:
  <div id="page-content"
       class="page-content-wrapper page-root {estilo} {texto}-page"
       data-page-id="{texto}"
       data-page-title="{titulo}">
    {filhos}
  </div>
Texto principal: obrigatório — identificador da página (`sobre`)
Filhos: page-title (opcional, primeiro), panel, …
Configurações:
  titulo: texto — título da página para breadcrumbs (padrão: texto do `[page-title]`)
Estilos: petroleo (padrão)
Regras:
  - um por página, raiz da árvore
  - `{titulo}` = configuração `titulo`; se omitida, texto do `[page-title]` da página.
    Página sem `[page-title]` DEVE declarar `{titulo: …}`
  - escrito diretamente no arquivo `pages/spa/<pagina>.astro` (constituição: contêiner raiz explícito)

### grid
ID: EL-02
Descrição: Distribui os filhos em colunas.
HTML:
  <div class="grid {estilo}" style="{config}">{filhos}</div>
Filhos: card
Configurações:
  colunas: número, aceita breakpoints (padrão: 1)
    → `--colunas`, `--colunas-<bp>`
Estilos: padrao (padrão)

### vertical-list
ID: EL-03
Descrição: Empilha os filhos em coluna, com espaçamento uniforme.
HTML:
  <div class="vertical-list {estilo}">{filhos}</div>
Filhos: qualquer
Estilos: normal (padrão) | amplo | compacto

### subsection
ID: EL-04
Descrição: Divisão titulada de conteúdo (dentro de um painel ou direto na página).
HTML:
  <div class="subsection {estilo}">
    <h{nivel} class="subsection-title">{texto}</h{nivel}>
    {filhos}
  </div>
Texto principal: obrigatório — título da sub-seção
Filhos: divider, grid, …
Configurações:
  ancora: texto (opcional) → atributo `id` da sub-seção, alvo de links `#ancora`
Estilos: destaque (padrão) | escuro
Regras:
  - nivel (R-E03): h3 dentro de [panel]; h2 quando filho de [page-root] ou [container]
  - com âncora, a rolagem até ela para abaixo de um [page-header] fixo (folga `--page-header-h` + 35px)

### container
ID: EL-16
Descrição: Limita a largura do conteúdo da página e o centraliza.
HTML:
  <div class="container {estilo}">{filhos}</div>
Filhos: page-title, subsection, panel, grid, …
Estilos: centralizado (padrão)
Regras:
  - filho direto de [page-root]; envolve todo o conteúdo da página

### page-header
ID: EL-23
Descrição: Cabeçalho fixo da página, com o título e itens de navegação; fica no topo ao rolar.
HTML:
  <header class="page-header {estilo}">{filhos}</header>
Filhos: page-title, anchor-nav
Estilos: claro (padrão)
Comportamento:
  - fixo (sticky) no topo da área de rolagem, ocupando a largura total da página (anula o respiro do [page-root])
  - a página que o usa publica a altura dele em `--page-header-h` (JS da página), usada pelas âncoras
  - `#page-content-host` zera o próprio `padding-top` quando a página tem um page-header
Regras:
  - primeiro filho do [page-root]; no máximo um por página

### page-footer
ID: EL-22
Descrição: Rodapé da página, com texto e lema.
HTML:
  <footer class="page-footer {estilo}">
    <p class="page-footer-text">{item.texto}</p>
    <p class="page-footer-motto">{lema[0]}<span class="page-footer-sep">/</span>{lema[1]}…</p>
  </footer>
Dados do item: texto, lema[]
Estilos: ciano (padrão)
Regras:
  - último filho do [container] (ou do [page-root]); no máximo um por página

## 2. Títulos

### page-title
ID: EL-05
Descrição: Título principal da página.
HTML:
  <h1 class="page-title {estilo}">{texto}</h1>
Texto principal: obrigatório
Estilos: claro (padrão) | escuro
Regras:
  - opcional; no máximo um por página; quando presente, é o primeiro elemento de conteúdo
    (primeiro filho de [page-root] ou do [container] da página)

### header
ID: EL-06
Descrição: Cabeçalho de um container, com título e itens auxiliares ao lado.
HTML:
  <header class="header {estilo}" style="{config}">
    <h{nivel} class="header-title">{texto}</h{nivel}>
    {filhos}
  </header>
Texto principal: obrigatório — título do container
Filhos: legend
Configurações:
  direcao: coluna | linha, aceita breakpoints (padrão: coluna)
    coluna → `--direcao: column; --alinhamento: flex-start`
    linha  → `--direcao: row; --alinhamento: center`
    (com breakpoint: `--direcao-<bp>`, `--alinhamento-<bp>`)
Estilos: painel (padrão) | painel-escuro | card
Regras:
  - primeiro filho do container; num [card], pode vir depois de um [logo]
  - nivel (R-E03): h2 em panel da página; h3 em card; h4 em panel dentro de card
  - substitui o antigo `card-title` (R-E04)

## 3. Containers

### panel
ID: EL-07
Descrição: Painel de conteúdo (no nível da página ou dentro de um [card]).
HTML:
  <section class="panel {estilo}">
    [header] {texto}        ← só quando o panel tem texto (atalho R-N01)
    {filhos}
  </section>
Texto principal: opcional — título (gera `[header]` com o estilo padrão)
Filhos: header (primeiro, quando não há texto), vertical-list, subsection, tag-list, …
Estilos: escuro (padrão) | claro
Regras:
  - pode ser filho de [page-root], [container] ou [card]

### card
ID: EL-08
Descrição: Cartão de conteúdo dentro de um grid.
HTML:
  <div class="card {estilo}">{filhos}</div>
Filhos: header (primeiro), vertical-list, …
Estilos: amarelo (padrão) | verde

### link-card
ID: EL-15
Descrição: Cartão clicável que leva a um destino (contato, perfil, página), com ícone, rótulo, valor, detalhe opcional e seta.
HTML:
  <a class="link-card {estilo}" href="{item.href}" {destino}>
    <span class="link-card-icon"><img src="{item.icone}" alt="" width="23" height="23"></span>
    <span class="vertical-list vertical-list--compacto link-card-body">
      <span class="link-card-label">{item.rotulo}</span>
      <span class="link-card-value">{item.valor}</span>
      <span class="link-card-detail">{item.detalhe}</span>      ← só quando há detalhe
    </span>
    <span class="link-card-action" aria-hidden="true">↗</span>
  </a>
  {destino} =
    href http(s) → target="_blank" rel="noopener noreferrer"
    demais (tel:, mailto:, rotas internas) → nada (mesma aba)
Dados do item: rotulo, valor, detalhe?, href, icone
Estilos: ciano (padrão)
Comportamento:
  - hover: o cartão sobe e realça borda e seta
Regras:
  - usado como filho de [grid], repetido por uma fonte de dados

### accordion
ID: EL-20
Descrição: Grupo recolhível com cabeçalho (ícone, título, seta) e conteúdo; pode conter outros accordions.
HTML:
  <details class="accordion {estilo}" {aberto}>
    <summary class="accordion-summary">
      <span class="accordion-icon" aria-hidden="true">{item.icone}</span>
      <span class="accordion-title">{item.titulo}</span>
      <span class="accordion-chevron" aria-hidden="true">›</span>
    </summary>
    <div class="accordion-content">{filhos}</div>
  </details>
  {aberto} = atributo `open` quando item.aberto é verdadeiro
Dados do item: icone, titulo, aberto?
Filhos: vertical-list, accordion
Estilos: vidro (padrão) | pilula
Comportamento:
  - recolhível nativo (sem JS); começa fechado, salvo `aberto: true`
  - a seta gira ao abrir

### link-item
ID: EL-21
Descrição: Link compacto em pílula, com marcador e estado "selecionado".
HTML:
  <a class="link-item {estilo}" href="{item.url}">
    <span class="link-item-bullet" aria-hidden="true">•</span>{item.titulo}
  </a>
  selecionado: classe `is-selecionado` + <span class="link-item-check">✓</span> ao final (R-E06)
Dados do item: titulo, url
Estilos: ciano (padrão)
Comportamento:
  - o estado "selecionado" é aplicado pelo JS da página que usa o elemento

### media-card
ID: EL-25
Descrição: Cartão de conteúdo com capa clicável, título-link, resumo e itens extras (ex.: tags).
HTML:
  <article class="media-card {estilo}">
    <a class="media-card-image" href="{item.link}" aria-label="{item.titulo}" {destino}>
      <img src="{item.imagem}" alt="{item.titulo}" loading="lazy" width="640" height="360">
    </a>
    <div class="media-card-body">
      <h3 class="media-card-title"><a href="{item.link}" {destino}>{item.titulo}</a></h3>
      <p class="media-card-summary">{item.resumo}</p>
    </div>
    <div class="media-card-extra">{filhos}</div>          ← só quando há filhos
  </article>
  {destino} = href http(s) → target="_blank" rel="noopener noreferrer"; demais → nada
Dados do item: titulo, resumo, link, imagem
Filhos: tag-list
Estilos: amarelo (padrão)
Comportamento:
  - hover: o cartão sobe e a capa amplia levemente
  - o resumo é cortado em 3 linhas

## 4. Texto

### paragraph
ID: EL-09
Descrição: Parágrafo de texto corrido.
HTML:
  <p class="paragraph {estilo}">{texto}</p>
Texto principal: obrigatório
Estilos: claro (padrão) | escuro

## 5. Listas e itens

### legend
ID: EL-10
Descrição: Legenda recolhível com uma lista de itens explicativos.
HTML:
  <details class="legend {estilo}">
    <summary class="legend-summary">{texto}</summary>
    <div class="vertical-list vertical-list--compacto legend-content">{filhos}</div>
  </details>
Texto principal: obrigatório — rótulo do resumo
Filhos: legend-item
Estilos: claro (padrão)
Comportamento:
  - recolhível; começa fechada

### legend-item
ID: EL-11
Descrição: Item de legenda de estrelas.
HTML:
  <div class="legend-item {estilo}">
    <span class="legend-item-stars">{★ × item.estrelas}{☆ × (5 − item.estrelas)}</span> — {item.descricao}
  </div>
Dados do item: estrelas, descricao
Estilos: padrao (padrão)

### skill-item
ID: EL-12
Descrição: Item de habilidade com ícone, nome e estrelas; pode ter sub-itens.
HTML:
  sem sub-itens →
    <div class="skill-item skill-item-leaf {estilo}">
      {icone}
      <span class="skill-item-name">{item.nome}</span>
      [star-rating] {estrelas}
    </div>
  com sub-itens →
    <details class="skill-item skill-item-group {estilo}">
      <summary class="skill-item-summary">
        {icone}
        <span class="skill-item-name">{item.nome}</span>
        [star-rating] {estrelas}
      </summary>
      <div class="vertical-list vertical-list--compacto skill-item-children">
        [skill-item] *item.skills
      </div>
    </details>
  {icone} =
    com ícone → <img class="skill-item-icon" src="{icone}" alt="{item.nome}" width="22" height="22">
    sem ícone → <span class="skill-item-icon skill-item-fallback">☆</span>
Dados do item: nome, icone?, estrelas?, skills[]?
Estilos: padrao (padrão)
Comportamento:
  - recursivo: sub-itens são skill-item
  - recolhível quando tem sub-itens; começa fechado
  - {estrelas} = item.estrelas; se ausente, floor(média das estrelas dos sub-itens)
  - {icone} = item.icone; se ausente, herda o ícone do pai

### star-rating
ID: EL-13
Descrição: Avaliação de 0 a 5 estrelas.
HTML:
  <div class="star-rating {estilo}" aria-label="Avaliação: {n} de 5 estrelas">
    <svg class="star-rating-star is-ativa|is-inativa" viewBox="0 0 24 24">
      <polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" />
    </svg> × 5
  </div>
Texto principal: — (recebe `{n}`, número de estrelas ativas)
Estilos: padrao (padrão)
Regras:
  - usado dentro do molde de skill-item; não aparece sozinho na spec da página

### badge
ID: EL-18
Descrição: Selo curto de texto (período, duração, nível, categoria).
HTML:
  <span class="badge {estilo}">{texto}</span>
Texto principal: obrigatório
Estilos: pilula (padrão) | ardosia | turquesa
Regras:
  - dentro de contêiner em coluna (ex.: [card]), fica no fim e alinhado ao início
  - em [tag-list], o estilo pode vir de um campo do item (`[badge:$item.estilo]`, R-N05)

### anchor-nav
ID: EL-24
Descrição: Barra de links para seções da própria página, com o item da seção atual destacado.
HTML:
  <nav class="anchor-nav {estilo}" aria-label="{rotulo}">
    <a class="anchor-nav-link" href="#{item.ancora}">{item.titulo}</a> …
  </nav>
  ativo: classe `is-ativo` no link (R-E06)
Dados do item: titulo, ancora
Configurações:
  rotulo: texto — rótulo acessível da navegação
Estilos: escuro (padrão)
Comportamento:
  - o primeiro link começa ativo; o JS da página move `is-ativo` no clique e na rolagem (scroll-spy)
  - < 768px: uma linha com rolagem horizontal própria; ≥ 768px: quebra em linhas

### tag-list
ID: EL-19
Descrição: Linha de selos curtos que quebra para a linha seguinte quando falta espaço.
HTML:
  <div class="tag-list {estilo}">{filhos}</div>
Filhos: badge
Estilos: padrao (padrão)

## 6. Separadores

### divider
ID: EL-14
Descrição: Linha divisória horizontal.
HTML:
  <hr class="divider {estilo}">
Estilos: sublinhado (padrão)

## 7. Mídia

### logo
ID: EL-17
Descrição: Faixa que exibe um logotipo centralizado, sem distorção.
HTML:
  <div class="logo {estilo}">
    <img class="logo-image" src="{item.src}" alt="{item.alt}">
  </div>
Dados do item: src, alt
Estilos: faixa (padrão)

## 8. Moldura da SPA

> Elementos que ficam fixos em volta de todas as páginas (spec-01). O CSS deles fica sempre carregado,
> por isso têm nomes próprios, que não colidem com os elementos das páginas. Os **ids** são ganchos
> estáveis do JS de navegação e não mudam.

### app-layout
ID: EL-26
Descrição: Documento da SPA em tela cheia, com a sidebar e a área principal.
HTML:
  <div id="spa-layout" class="app-layout {estilo}">{filhos}</div>
Filhos: sidebar, main-area
Estilos: escuro (padrão)
Comportamento:
  - ocupa 100% da janela, sem rolagem do documento
  - < 1024px: sidebar no topo e área principal abaixo; ≥ 1024px: sidebar à esquerda
Regras:
  - raiz do `<body>` de `pages/spa/spa.astro`; um por documento

### sidebar
ID: EL-27
Descrição: Faixa de identidade e navegação da SPA.
HTML:
  <aside id="sidebar" class="sidebar {estilo}" aria-label="{config.rotulo}">{filhos}</aside>
Filhos: identity-card, nav-menu
Configurações:
  rotulo: texto — rótulo acessível
Estilos: escuro (padrão)
Comportamento:
  - < 1024px: cabeçalho compacto no topo, com borda inferior
  - ≥ 1024px: coluna lateral com altura da janela e largura `--sidebar-width`, com borda direita

### identity-card
ID: EL-28
Descrição: Identidade profissional: foto, nome e cargo.
HTML:
  <header id="identity-header" class="identity-card {estilo}">
    <div class="identity-card-frame">
      <img class="identity-card-photo" src="{item.foto}" alt="Foto de perfil de {item.nome}" width="160" height="160">
    </div>
    <div class="identity-card-strip">
      <h1 class="identity-card-name">{item.nome}</h1>
      <p class="identity-card-role">{item.cargo}</p>
    </div>
  </header>
Dados do item: nome, cargo, foto
Estilos: moldura (padrão)
Comportamento:
  - < 1024px: foto pequena ao lado do nome; ≥ 1024px: foto centralizada acima do nome

### nav-menu
ID: EL-29
Descrição: Menu principal da SPA, com ícone claro/escuro por item e item ativo.
HTML:
  <nav id="sidebar-nav" class="nav-menu {estilo}" aria-label="{config.rotulo}">
    <div class="nav-menu-items">
      <a class="nav-menu-item" href="{item.rota}" data-menu-id="{item.id}">
        <span class="nav-menu-icon">
          <img class="nav-menu-icon-light" src="{item.icone_claro}" alt="" width="24" height="24" aria-hidden="true">
          <img class="nav-menu-icon-dark" src="{item.icone_escuro}" alt="" width="24" height="24" aria-hidden="true">
        </span>
        <span class="nav-menu-label">{item.rotulo}</span>
      </a> …
    </div>
  </nav>
  ativo: classe `is-ativo` + `aria-current="page"` (R-E06)
Dados do item: id, rotulo, rota, icone_claro, icone_escuro, padrao?
Configurações:
  rotulo: texto — rótulo acessível
Estilos: escuro (padrão)
Comportamento:
  - o item com `padrao: true` começa ativo; o JS da moldura (`nav.js`) move `is-ativo` conforme a rota
  - ativo mostra o ícone escuro; inativo, o claro
  - < 1024px: faixa horizontal com rolagem própria, que rola sozinha para mostrar o item ativo
  - ≥ 1024px: lista vertical

### main-area
ID: EL-30
Descrição: Coluna principal da SPA: régua de breadcrumbs e área de conteúdo.
HTML:
  <div id="main-container" class="main-area {estilo}">{filhos}</div>
Filhos: breadcrumbs, content-host
Estilos: escuro (padrão)

### breadcrumbs
ID: EL-31
Descrição: Trilha hierárquica da rota atual.
HTML:
  <nav id="breadcrumbs" class="breadcrumbs {estilo}" aria-label="Navegação Hierárquica">
    <ol id="breadcrumbs-list" class="breadcrumbs-list">
      <li class="breadcrumbs-item [is-atual]">
        <a class="breadcrumbs-link" href="{url}">{rotulo}</a>      ← níveis anteriores
        <span class="breadcrumbs-current">{rotulo}</span>         ← nível atual
        <span class="breadcrumbs-sep" aria-hidden="true">/</span> ← entre níveis
      </li> …
    </ol>
  </nav>
Estilos: discreto (padrão)
Comportamento:
  - a trilha é montada pelo JS da moldura (`breadcrumbs.js`) a cada navegação: "Início" (→ `/spa`),
    um nível por segmento da rota (rótulo do menu quando existir) e, no fim, o `data-page-title` da página
  - o HTML inicial traz só "Início"

### content-host
ID: EL-32
Descrição: Área com rolagem própria onde o roteador injeta o `#page-content` da página da rota atual.
HTML:
  <section id="page-content-host" class="content-host {estilo}" tabindex="-1">{página}</section>
Estilos: padrao (padrão)
Comportamento:
  - é a área de rolagem das páginas (âncoras, scroll-spy)
  - quando a página tem [page-header], o respiro superior é zerado para o cabeçalho colar no topo
