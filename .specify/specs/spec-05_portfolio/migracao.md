# Registro de Migração — Página Portfólio (spec-05)

> Plano: [plano-migracao.md](../../catalog/plano-migracao.md) · Status: **Concluída e aprovada (2026-11-20)**

## 1. Linha de base (Etapa 1) — 2026-11-20

Medido no shell da SPA (`/` → clique em "Portfólio"), rolagem no topo. Retângulos `x,y,largura,altura`.

| Largura | `#page-content` | cabeçalho fixo | `h1` | barra de categorias | Cards (1 a 3) |
|---|---|---|---|---|---|
| 375  | 20,177,327,1422 | 20,177,327,109 | 36,189,295,28 | 36,227,295,50 (rola na horizontal) | 36,342,295,307 · 36,793,295,334 · 36,1137,295,298 |
| 1024 | 264,42,728,1245 | 264,42,728,154 | 282,56,692,30 | 282,98,692,86 | 282,258,337,336 · 282,756,337,345 · 637,756,337,345 |
| 1440 | 301,44,1100,1455 | 301,44,1100,162 | 321,59,1061,32 | 321,103,1061,90 | 321,271,521,427 · 321,870,521,427 · 861,870,521,427 |

Topo das 7 seções (1440): 214, 699, 756, 813, 1297, 1354, 1411. Grid: 1 col < 768; 2 col ≥ 768.
7 botões de categoria, 3 cards, 13 tags. Sem rolagem horizontal da página. Breadcrumb: "Portfólio de Projetos".

### Comportamentos de JS (testados)
- Cabeçalho fixo no topo de `#page-content-host`, sem folga (o host zera o `padding-top` para a página).
- Clique em "Engenharia de Dados": botão ativo, rolagem suave até a seção, título 53px abaixo do cabeçalho
  (cabeçalho + 35px de folga), URL ganha `#section-data-engineering` sem trocar de rota.
- Scroll-spy: ao voltar ao topo, o botão ativo volta para "Análise de Dados e BI".
- Links: projeto interno (`/pages/portfolio/projetos/AES1/AES1.html`) abre na SPA com "Portfólio" ativo no
  menu; projeto externo (GitHub) abre em nova aba (`noopener noreferrer`).
- Hover: card sobe 4px; imagem amplia 2%; título do projeto fica azul.

## 2. Inventário (Etapa 2)

### 2.1 Árvore atual
`pages/spa/portfolio.astro` importa `pages/portfolio/portfolio.astro` como componente. Corpo:

```
div#page-content.page-content-wrapper.portfolio-page-wrapper  data-page-id="portfolio" data-page-title="Portfólio de Projetos"
  header.portfolio-header                         (sticky; gradiente azul-claro; sombra)
    h1.page-title 'Portfólio de Projetos'
    nav.category-selection                        (barra escura; rola na horizontal < 768)
      a.selection-button[.active] ×7              (href="#section-<id>", data-section)
  main.portfolio-body
    section#section-<id>.category-section ×7     (scroll-margin-top = altura do cabeçalho + 35px)
      h2.category-section-title
      div.project-grid                            (só se houver projetos; 1 → 2 col @768)
        article.project-card ×N                   (gradiente amarelo, sombra, hover)
          a.project-image-wrap > img.project-image   (16:9, zoom no hover)
          div.project-content
            h3.project-name > a.project-link
            p.project-resume                      (corta em 3 linhas)
          div.habilities-list > span.hability-tag-HS|SS ×N
  script (portfolio.js inline)
```

### 2.2 Ganchos de JS e de outros arquivos
- `portfolio.js`: `.portfolio-page-wrapper`, `.portfolio-header`, `.selection-button` (+ `data-section`),
  `.category-section`, classe `.active`, variável `--portfolio-header-h` (publicada no wrapper), eventos
  `spa:page-loaded` e `pageshow`, `IntersectionObserver` + `ResizeObserver`.
- `pages/spa/assets/css/main-container.css`: `.page-content-host:has(.portfolio-page-wrapper)` zera o `padding-top`.
- `pages/spa/assets/js/router.js`: `scrollToAnchor()` mede `.portfolio-header` para a folga das âncoras.
- `pages/spa/assets/css/scale.css`: token `--portfolio-header-h` (valor inicial antes da medição).

### 2.3 Conteúdo embutido
7 categorias e 3 projetos (nome, resumo, link, imagem, tags HS/SS) no frontmatter de `portfolio.astro`.

### 2.4 Subpáginas de projeto
`projetos/AES1/AES1.html` e `projetos/testes/pagina_teste.html` são HTML estáticos com estilos inline.
**Fora do escopo desta migração**: a spec continua definindo o contrato de fragmento que elas seguem; a
conversão delas para o modelo fica para quando forem reescritas.

### 2.5 Divergências spec × código
A spec atual descreve o código com fidelidade (estrutura, conteúdo e JS). Diferenças pequenas:
- a fonte `Inter` e uma segunda cópia da `Barlow Condensed` são carregadas só por esta página;
- `pages/spa/portfolio.astro` não tem o contêiner `#page-content` explícito (Princípio II).

## 3. Mapeamento (Etapa 3)

| Item atual | Cat. | Proposta | Observação |
|---|---|---|---|
| `div#page-content.portfolio-page-wrapper` | A | `[page-root:petroleo] portfolio {titulo: 'Portfólio de Projetos'}` | M-02 |
| `header.portfolio-header` | **C** | **`[page-header:claro]`** — elemento novo (EL-23) | cabeçalho fixo de página |
| `h1.page-title` | A | `[page-title:escuro] 'Portfólio de Projetos'` | M-02 (título preto sobre o cabeçalho claro) |
| `nav.category-selection` + `a.selection-button` | **C** | **`[anchor-nav:escuro] *@dados.categorias`** — elemento novo (EL-24) | navegação por âncoras da página |
| `main.portfolio-body` | — | (sem elemento: o `page-root` já dá o respiro) | |
| `section.category-section` + `h2` | **B** | `[subsection:destaque] $item.titulo {ancora: $item.ancora}` | extensão: âncora (`id`) e folga sob cabeçalho fixo |
| `div.project-grid` | A | `[grid] {colunas: 1 → 2 @768}` | |
| `article.project-card` (imagem, nome, resumo) | **C** | **`[media-card:amarelo] *$item.projetos`** — elemento novo (EL-25) | ver abaixo |
| `div.habilities-list` | A | `[tag-list]` | |
| `span.hability-tag-HS/SS` | A | `[badge:$item.estilo]` — `ardosia` (HS) / `turquesa` (SS) | mesma regra da Histórico |
| Categorias e projetos | D | `@dados.categorias` → `pages/portfolio/data/portfolio.json` | |

### Por que três elementos novos
- **`page-header`**: cabeçalho fixo da página (fica no topo ao rolar), contendo título e navegação. O
  `header` do catálogo é o cabeçalho *de um container* (título próprio em `h2`/`h3`/`h4`); aqui o título é
  o `h1` da página (`page-title`) → função diferente. Simétrico ao `page-footer`.
- **`anchor-nav`**: barra de links para seções da mesma página, com item ativo. `link-item` e `tag-list`
  têm outra função (link para outra página; lista de selos).
- **`media-card`**: cartão de conteúdo com imagem de capa clicável, título-link, resumo e filhos (tags).
  `link-card` tem a mesma função (levar a um destino), mas outro esqueleto (ícone, rótulo, valor, seta);
  compor com `card` + `header` + `paragraph` exigiria estender três elementos (título como link, imagem
  sem respiro, resumo cortado em 3 linhas). Nome genérico para reuso (ex.: futuras páginas de artigo).

### Estrutura resultante (proposta)

```
[page-root:petroleo] portfolio {titulo: 'Portfólio de Projetos'}
  [page-header:claro]
    [page-title:escuro] 'Portfólio de Projetos'
    [anchor-nav:escuro] *@dados.categorias

  [subsection:destaque] *@dados.categorias  {ancora: $item.ancora}   ← título = $item.titulo
    [grid] {colunas: 1 → 2 @768}                                       ← só se houver projetos
      [media-card:amarelo] *$item.projetos
        [tag-list]
          [badge:$item.estilo] *$item.tags
```

## 4. Mudanças propostas no catálogo

### 4.1 Elementos novos (C)

```
### page-header (EL-23)
HTML: <header class="page-header {estilo}">{filhos}</header>
Comportamento: fixo no topo da área de rolagem; ocupa a largura total da página (anula o respiro do
  page-root); publica a própria altura em --page-header-h (JS da página)
Estilos: claro (padrão)       → visual atual do cabeçalho do Portfólio

### anchor-nav (EL-24)
HTML: <nav class="anchor-nav {estilo}" aria-label="{rotulo}">
        <a class="anchor-nav-link [is-ativo]" href="#{item.ancora}">{item.titulo}</a> …
      </nav>
Dados do item: titulo, ancora
Comportamento: o primeiro item começa ativo; o JS da página move `is-ativo` (clique e rolagem);
  < 768px rola na horizontal, ≥ 768px quebra em linhas
Estilos: escuro (padrão)      → visual atual da barra de categorias

### media-card (EL-25)
HTML: <article class="media-card {estilo}">
        <a class="media-card-image" href="{item.link}" aria-label="{item.titulo}" {destino}>
          <img src="{item.imagem}" alt="{item.titulo}" loading="lazy" width="640" height="360">
        </a>
        <div class="media-card-body">
          <h3 class="media-card-title"><a href="{item.link}" {destino}>{item.titulo}</a></h3>
          <p class="media-card-summary">{item.resumo}</p>
        </div>
        {filhos}
      </article>
  {destino} = http(s) → target="_blank" rel="noopener noreferrer" (como no link-card)
Dados do item: titulo, resumo, link, imagem
Estilos: amarelo (padrão)     → visual atual do card de projeto (capa 16:9, resumo em 3 linhas, hover)
```

### 4.2 Extensão compatível (B)
- **`subsection`**: configuração opcional `{ancora: id}` → atributo `id` na sub-seção, e
  `scroll-margin-top` = `--page-header-h` + folga, para que a âncora pare abaixo de um cabeçalho fixo.
  Sem `ancora`, nada muda (Sobre e Formação não são afetadas).

### 4.3 Ganchos fora da página (M-07)
- `portfolio.js`: seletores passam para `.portfolio-page`, `.page-header`, `.anchor-nav-link`,
  `.subsection`, classe `is-ativo` e variável `--page-header-h`; lógica de rolagem e scroll-spy mantida.
- `main-container.css`: `:has(.portfolio-page-wrapper)` → `:has(.page-header)` (qualquer página com
  cabeçalho fixo começa sem folga no topo).
- `router.js`: `scrollToAnchor()` passa a medir `.page-header`.
- `scale.css`: token `--portfolio-header-h` → `--page-header-h`.
- `pages/spa/portfolio.astro` passa a ter o contêiner `#page-content` explícito.

## 5. Diferenças visuais (efeito de M-02 e das fontes do catálogo)

| Item | Hoje | Depois |
|---|---|---|
| Fundo da página | gradiente azul-claro `#DAEBF2 → #A8CCD9` | `petroleo` (escuro), como as demais páginas |
| Título da página | Barlow Condensed, `--fs-hero × 0,9`, preto | `page-title:escuro`: `--fs-3xl`, preto |
| Títulos das categorias | azul-escuro `#1E333D`, sem caixa alta | `subsection:destaque`: creme `#FFF1C3`, CAIXA ALTA |
| Respiro do corpo | `--space-sm` topo / `--space-xl` lados / `--space-2xl` base | `--space-xl` (respiro do `page-root`) |
| Espaço entre cards | `--space-md` → `lg` @768 → `xl` @1024 | `--space-lg` (estilo do `grid`) |
| Tags de habilidade | pílula verde-clara com contorno verde | `badge:ardosia` (hard) / `turquesa` (soft), como na Histórico |
| Fontes do texto | Inter (resumo, botões, tags) | Barlow (`--fonte-texto`); Inter deixa de ser carregada |
| Cabeçalho, barra de categorias, cards, hover, ativo | — | mantidos pelos estilos novos |

## 6. Aprovação 1 — 2026-11-20
- Mapeamento: **aprovado** (`page-header`, `anchor-nav`, `media-card`; `subsection` com âncora; tags como `badge`; ajustes de ganchos).
- Diferenças visuais do §5: **todas aceitas** (sem exceções M-03).

## 7. Catálogo (Etapa 4)
- `elementos.md`: novos `page-header` (EL-23, Layout), `media-card` (EL-25, Containers), `anchor-nav` (EL-24, Listas e itens);
  `subsection` com configuração `{ancora}` (id + folga sob cabeçalho fixo).
- `notacao-estrutura.md`: **R-N06** (repetição vazia omite o elemento) e **R-N07** (texto e configuração vindos do item).
- `estilos.md`: `page-header:claro`, `anchor-nav:escuro`, `media-card:amarelo`; `subsection[id]` com `scroll-margin-top`;
  16 tokens novos; `--page-header-h` passa a ser o token de escala do cabeçalho fixo.
- Nada existente muda de aparência → páginas convertidas não são afetadas (M-04).

## 8. Spec da página (Etapa 5)
- `spec.md` reescrita no modelo (seções 1 a 10), sem valores visuais; conteúdo completo na seção 6.
- Mantidos: contrato das subpáginas (2.2), navegação por categorias e scroll-spy (FR-006), requisitos do roteador (FR-007).
- `contracts/ui-contracts.md` marcado como substituído.
- **Aguardando aprovação 2** para seguir para a implementação (Etapa 6).

## 9. Aprovação 2 — 2026-11-20
- Spec da página: **aprovada**.

## 10. Implementação (Etapa 6)
- `pages/portfolio/data/portfolio.json`: categorias e projetos extraídos do frontmatter atual por script
  (7 categorias, 3 projetos, 13 tags `ardosia`).
- Componentes novos: `PageHeader.astro`, `AnchorNav.astro`, `MediaCard.astro`; `Subsection.astro` ganhou `ancora`.
- `portfolio.js`: seletores trocados (`.portfolio-page`, `.page-header`, `.anchor-nav-link`, `.subsection[id]`,
  `is-ativo`, `--page-header-h`); lógica de rolagem e scroll-spy sem mudança.
- Ganchos externos: `main-container.css` (`:has(.page-header)`), `router.js` (`.page-header`), `scale.css` (`--page-header-h`).
- Páginas: `pages/spa/portfolio.astro` com `#page-content` explícito; `pages/portfolio/portfolio.astro` é a cópia.
- `portfolio.css` reescrito a partir de `estilos.md` (sem `@import` de Inter/Barlow Condensed); `tokens.css` com 16 tokens novos.

## 11. Validação (Etapa 7) — 2026-11-20
- `npm run build`: sem erros nem avisos. Console: sem erros.
- Conteúdo: 7 categorias (`h2`, cada uma com âncora), 3 cards, 13 tags; grid só em 2 categorias (R-N06).
- Comparação com a linha de base (`x,y,largura,altura`):

| Largura | cabeçalho fixo | barra | Cards (1 a 3) |
|---|---|---|---|
| 375  | 20,177,327,113 | 36,230,295,50 (rola na horizontal) | 36,335,295,347 · 36,844,295,329 · 36,1185,295,311 |
| 1024 | 264,42,728,157 | 282,101,692,86 | 282,249,339,363 · 282,792,339,363 · 635,792,339,363 |
| 1440 | 301,44,1100,127 | 321,107,1061,52 | 321,224,523,436 · 321,850,523,476 · 858,850,523,476 |

  Mesma estrutura, mesmas colunas (1 → 2 @768), sem rolagem horizontal da página. Diferenças do §5 (aceitas).
  Em 1440 a barra cabe numa linha (texto em Barlow é mais estreito que Inter).
- Comportamentos:
  - cabeçalho no topo de `#page-content-host` (`padding-top: 0`), ocupando a largura toda; continua no topo ao rolar;
  - clique em "Engenharia de Dados": link ativo, rolagem até a seção, título 49px abaixo do cabeçalho
    (antes 53px), URL com `#section-data-engineering` sem trocar de rota;
  - scroll-spy: topo → "Análise de Dados e BI"; posição de "Deep Learning" → "Deep Learning";
  - capa do projeto interno abre `AES1.html` na SPA com "Portfólio" ativo; GitHub com `target="_blank"`;
  - o `padding-top` do host volta ao normal nas páginas sem cabeçalho fixo (Contatos: 24px).
  - Observação: o painel do navegador estava oculto, o que congela rolagem suave e `requestAnimationFrame`;
    os testes de rolagem usaram rolagem instantânea e `rAF` substituto só no teste.
- Regressão: Sobre (3/2, nenhuma sub-seção com âncora), Histórico (44 selos), Formação (2/3/3), Artigos
  (17 accordions, 42 links), Contatos (2 col., 4 cartões).

## 12. Fechamento (Etapa 8)
- `elementos.md`, `elementos-por-pagina.md` e CLAUDE.md atualizados: todas as páginas convertidas.
- Commit/PR: não feitos (trabalho segue na branch atual, sem commit).
- **Migração aprovada pelo responsável em 2026-11-20.**
