# Registro de Migração — Página Artigos (spec-06)

> Plano: [plano-migracao.md](../../catalog/plano-migracao.md) · Status: **Concluída e aprovada (2026-11-20)**

## 1. Linha de base (Etapa 1) — 2026-11-20

Medido no shell da SPA (`/` → clique em "Artigos"), grupo 1 aberto (estado inicial). Retângulos `x,y,largura,altura`.

| Largura | `#page-content` | `h1` | Colunas (esq. · dir.) | Rodapé |
|---|---|---|---|---|
| 375  | 20,197,327,1148 | 36,213,295,34 | 36,312,295,504 · 36,828,295,419 | 36,1271,295,58 |
| 1024 | 264,66,728,738 | 288,90,680,36 | 288,198,333,519 · 635,198,333,434 | 288,746,680,34 |
| 1440 | 301,75,1100,798 | 332,106,1038,39 | 332,227,512,541 · 858,227,512,449 | 332,805,1038,37 |

Altura dos grupos fechados: 50px (375/1024) e 52px (1440); grupo 1 aberto: 197 · 199 · 210px.
Colunas: 1 < 1024; 2 ≥ 1024. 13 grupos, 42 artigos, 3 visíveis no início. Sem rolagem horizontal.
Breadcrumb: "Artigos técnicos".

### Comportamentos de JS (testados)
- Clique no cabeçalho do grupo: abre/fecha (`.open`, `aria-expanded`); grupos independentes.
- Clique no cabeçalho do subgrupo: abre/fecha os artigos do subgrupo.
- Clique num artigo: marca como selecionado (`.selected` + `✓`), desmarca o anterior e, após 150ms,
  navega pelo roteador SPA para `/spa/artigos/<slug>`.
- Hoje nenhum artigo existe: a navegação cai na página de fallback ("Página não encontrada"), com o
  item "Artigos" ativo no menu.

## 2. Inventário (Etapa 2)

### 2.1 Árvore atual
`pages/spa/artigos.astro` importa `pages/artigos/artigos.astro` como componente (como a Contatos antes
da migração). Corpo:

```
div#page-content.page-content-wrapper.artigos-page   data-page-id="artigos" data-page-title="Artigos técnicos"
  div.app                                           (largura máx., padding próprio)
    header
      h1.page-title 'Artigos técnicos'               (Oswald, brilho ciano)
      p.intro 'Seleciona o tema.'
      div.rule                                      (linha de 1px em gradiente ciano)
    main.workspace
      div.topic-columns                             (1 col → 2 @1024)
        div.vertical-list.column ×2                 (esq.: grupos 1–6; dir.: grupos 7–13)
          div.topic-group[.open] ×N                 (card "vidro" escuro)
            button.group-toggle > span.group-icon + span.group-name + span.chevron
            div.group-children
              div.vertical-list.leaf-list > a.leaf ×N   (pílula, href="#", data-url)
              div.subgroup ×N
                button.subgroup-toggle > span.subgroup-marker + span.subgroup-name + span.chevron
                div.subgroup-children > div.vertical-list.leaf-list > a.leaf ×N
    footer
      p '© 2026 — Portfólio de Dados'
      p.footer-motto 'ANALISAR / CONSTRUIR / EVOLUIR'
  script (artigos.js inline, re-executado a cada injeção)
```

### 2.2 Ganchos de JS (`artigos.js`)
`.artigos-page`, `.group-toggle`, `.subgroup-toggle` (acordeão por clique + `aria-expanded`),
`.leaf` + `data-url` (seleção e navegação), classes `.open`, `.selected`, `.check-mark`, evento
`spa:page-loaded`, marcador `dataset.listenerAttached`. O arquivo exporta `GET()` por estar sob `pages/`.

### 2.3 Conteúdo embutido
Catálogo de 13 grupos, 4 subgrupos e 42 artigos no frontmatter de `artigos.astro`; textos do rodapé no markup.

### 2.4 Divergências spec × código
A spec atual descreve o código com fidelidade (estrutura, catálogo e JS). Diferenças pequenas:
- a árvore de arquivos cita `pages/artigos.md` e pastas `<slug-do-artigo>/` que não existem;
- `pages/spa/artigos.astro` não tem o contêiner `#page-content` explícito (exigência do Princípio II);
- as fontes `Oswald` e `Roboto Condensed` são carregadas só por esta página;
- o rodapé usa breakpoint de 480px, fora dos aceitos (768/1024/1280).

## 3. Mapeamento (Etapa 3)

| Item atual | Cat. | Proposta | Observação |
|---|---|---|---|
| `div#page-content.artigos-page` | A | `[page-root:petroleo] artigos` | M-02 |
| `div.app` | A | `[container:centralizado]` | |
| `h1.page-title` | A | `[page-title:claro] 'Artigos técnicos'` | M-02 |
| `p.intro` | A | `[paragraph:claro] 'Seleciona o tema.'` | M-02 |
| `div.rule` | A | `[divider:sublinhado]` | M-02 |
| `div.topic-columns` | A | `[grid] {colunas: 1 → 2 @1024}` | |
| `div.vertical-list.column` | A | `[vertical-list:amplo] *@dados.colunas` | M-02 |
| `div.topic-group` + `div.subgroup` | **C** | **`[accordion]`** — elemento novo, estilos `vidro` (grupo) e `pilula` (subgrupo) | ver §4 |
| `div.vertical-list.leaf-list` | A | `[vertical-list:compacto]` | |
| `a.leaf` | **C** | **`[link-item:ciano]`** — elemento novo | ver §4 |
| `footer` | **C** | **`[page-footer:ciano]`** — elemento novo | ver §4 |
| Catálogo de grupos e textos do rodapé | D | `@dados.colunas`, `@dados.rodape` → `pages/artigos/data/artigos.json` | |

### Por que três elementos novos
- **`accordion`**: grupo recolhível com ícone, título, seta e filhos (artigos e/ou subgrupos). `legend`
  e `skill-item` também são recolhíveis, mas têm outra função (legenda explicativa; habilidade com
  estrelas). Grupo e subgrupo têm o mesmo esqueleto e mudam só a aparência → **um elemento, dois estilos**.
- **`link-item`**: link compacto em pílula (marcador + texto) com estado "selecionado". O `link-card`
  tem a mesma função, mas outro esqueleto (ícone, rótulo, valor, detalhe, seta) → critério 2 falha.
- **`page-footer`**: rodapé de página (texto + lema com separadores). Não há equivalente; nome genérico
  para reuso em outras páginas.

### Estrutura resultante (proposta)

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

## 4. Elementos novos propostos

```
### accordion (EL-20)
Descrição: Grupo recolhível com cabeçalho (ícone, título, seta) e conteúdo.
HTML:
  <details class="accordion {estilo}" [open]>
    <summary class="accordion-summary">
      <span class="accordion-icon" aria-hidden="true">{item.icone}</span>
      <span class="accordion-title">{item.titulo}</span>
      <span class="accordion-chevron" aria-hidden="true">›</span>
    </summary>
    <div class="accordion-content">{filhos}</div>
  </details>
Dados do item: icone, titulo, aberto?, artigos[]?, subgrupos[]?
Estilos: vidro (padrão) | pilula
Comportamento: recolhível (nativo, sem JS); `aberto: true` começa aberto; seta gira ao abrir.

### link-item (EL-21)
Descrição: Link compacto em pílula, com marcador e estado "selecionado".
HTML:
  <a class="link-item {estilo}" href="{item.url}">
    <span class="link-item-bullet" aria-hidden="true">•</span>{item.titulo}
  </a>
  (selecionado: classe `is-selecionado` + <span class="link-item-check">✓</span>, aplicados pelo JS da página)
Dados do item: titulo, url
Estilos: ciano (padrão)

### page-footer (EL-22)
Descrição: Rodapé da página com texto e lema.
HTML:
  <footer class="page-footer {estilo}">
    <p class="page-footer-text">{item.texto}</p>
    <p class="page-footer-motto">{palavra}<span class="page-footer-sep">/</span>{palavra}…</p>
  </footer>
Dados: texto, lema[]
Estilos: ciano (padrão)
```

Estilos novos (`accordion:vidro`, `accordion:pilula`, `link-item:ciano`, `page-footer:ciano`) reproduzem
o visual atual desses itens, com tokens novos para as cores ciano/vidro e com as fontes do catálogo
(ver §5).

### Mudanças de comportamento e de JS (M-07)
- **Acordeão nativo**: grupos e subgrupos passam de `<button>` + JS para `<details>/<summary>`, como
  `legend` e `skill-item`. Abre/fecha sem JS; acessibilidade nativa no lugar de `aria-expanded`.
- **Links reais**: cada artigo passa a ter `href="/spa/artigos/<slug>"` (antes `href="#"` + `data-url`).
- **`artigos.js`** fica só com a seleção: marca `is-selecionado` + `✓` e navega após 150ms, como hoje.
  Os seletores mudam: `.leaf` → `.link-item`; `.selected` → `.is-selecionado`; `.check-mark` →
  `.link-item-check`; escopo `.artigos-page` mantido.
- `pages/spa/artigos.astro` passa a ter o contêiner `#page-content` explícito.

## 5. Diferenças visuais (efeito de M-02 e das fontes do catálogo)

| Item | Hoje | Depois |
|---|---|---|
| Fundo da página | radial escuro `#102636 → #070e14`, cantos 12px | `petroleo` (vertical `#16222A → #3A6073`), cantos retos |
| Padding | `--space-xl` (≥1024: `--space-2xl`) | `--space-xl` em todas as larguras |
| Título | Oswald 600, `--fs-hero`, brilho ciano | `claro`: Barlow Condensed 700, `--fs-3xl`, sem brilho |
| Subtítulo | `--fs-base`, peso 300, `#88a9bc` | `paragraph:claro`: Barlow, `--fs-lg`, branco |
| Linha divisória | 1px, gradiente ciano que some à direita | `sublinhado`: 2px azul `#0381B0` sólido |
| Espaço entre grupos | `--space-lg` | `--space-md` (`vertical-list:amplo`) |
| Fontes do conteúdo | Oswald (nomes dos grupos), Roboto Condensed (artigos e rodapé) | Barlow Condensed (`--fonte-titulo`) e Barlow (`--fonte-texto`); Oswald e Roboto deixam de ser carregadas |
| Rodapé | coluna < 480px, linha ≥ 480px | coluna < 768px, linha ≥ 768px |
| Cores, vidro, pílulas, hover, aberto e selecionado | — | mantidos pelos estilos novos |

## 6. Aprovação 1 — 2026-11-20
- Mapeamento: **aprovado** (`accordion`, `link-item`, `page-footer`; acordeão nativo; links reais; JS só para a seleção).
- Diferenças visuais do §5: **todas aceitas** (sem exceções M-03).

## 7. Catálogo (Etapa 4)
- `elementos.md`: novos `page-footer` (EL-22, Layout), `accordion` (EL-20) e `link-item` (EL-21), em Containers.
- `estilos.md`: `page-footer:ciano`, `accordion:vidro`, `accordion:pilula`, `link-item:ciano` (reproduzem o
  visual atual de rodapé, grupos, subgrupos e artigos, com as fontes do catálogo) e 21 tokens novos
  (cores ciano/vidro, sombras, `--raio-vidro`, `--raio-total`).
- Nenhum elemento ou estilo existente mudou → páginas convertidas não são afetadas (M-04).

## 8. Spec da página (Etapa 5)
- `spec.md` reescrita no modelo (seções 1 a 10), sem valores visuais; catálogo temático completo na seção 6.
- Comportamento de seleção preservado em FR-006 (agora sobre `link-item`, `is-selecionado`, `link-item-check` e `href`);
  abrir/fechar passa a ser nativo (FR-005).
- Seção 2 registra o contrato das futuras páginas de artigo (`data-parent-route="/artigos"`).
- `contracts/ui-contracts.md` marcado como substituído.
- **Aguardando aprovação 2** para seguir para a implementação (Etapa 6).

## 9. Aprovação 2 — 2026-11-20
- Spec da página: **aprovada**.

## 10. Implementação (Etapa 6)
- `pages/artigos/data/artigos.json`: catálogo extraído do frontmatter atual por script (13 grupos, 4 subgrupos,
  42 artigos, `url` = `/spa/artigos/<slug>`) e textos do rodapé.
- Componentes novos: `Accordion.astro` (`<details>` nativo), `LinkItem.astro`, `PageFooter.astro`.
- `artigos.js` reescrito só com a seleção (`.link-item`, `is-selecionado`, `.link-item-check`, navegação
  pelo `href` após 150ms; `stopPropagation` para o roteador não navegar antes do prazo).
- Páginas: `pages/spa/artigos.astro` com `#page-content` explícito; `pages/artigos/artigos.astro` é a cópia.
- `artigos.css` reescrito a partir de `estilos.md` (sem `@import` de Oswald/Roboto); `tokens.css` com 21 tokens novos.

## 11. Validação (Etapa 7) — 2026-11-20
- `npm run build`: sem erros nem avisos.
- Conteúdo: 13 grupos, 4 subgrupos, 42 artigos; só "Análise de dados e BI" aberto; 3 artigos visíveis no início.
- Comparação com a linha de base (`x,y,largura,altura`):

| Largura | `h1` | Colunas (esq. · dir.) | Rodapé | Grupo 1 aberto / fechados |
|---|---|---|---|---|
| 375  | 36,213,295,29 | 36,288,295,466 · 36,766,295,407 | 36,1197,295,51 | 169 / 50 |
| 1024 | 282,84,700,31 | 282,170,343,478 · 639,170,343,478 | 282,677,700,31 | 171 / 50 |
| 1440 | 321,95,1069,34 | 321,186,527,492 · 862,186,527,492 | 321,715,1069,34 | 182 / 50 |

  Mesmas colunas (1 → 2 @1024) e mesmos grupos; diferenças do §5 (aceitas): fundo, título, subtítulo,
  divisória, padding, espaço entre grupos e fontes. As colunas têm a mesma altura no grid (são
  transparentes, sem efeito visual). Sem rolagem horizontal.
- Comportamentos:
  - abrir/fechar grupo e subgrupo (nativo): ok; seta gira 90°;
  - seleção: `is-selecionado` + `✓`; dois cliques rápidos → só o último navega (`/spa/artigos/graficos`);
  - após 150ms abre a rota pelo roteador; fallback 404 com "Artigos" ativo no menu;
  - idempotência: após sair e voltar à página duas vezes, um clique gera **uma** navegação.
- Breadcrumb: "Artigos técnicos". Console: sem erros.
- Regressão: Sobre (3/2), Histórico (44 selos ardósia), Formação (2/3/3), Contatos (2 col., 4 cartões).
- Colisão de classes: ao navegar Artigos → Portfólio (não convertida), o CSS da Artigos é descarregado e o
  título da Portfólio mantém o estilo próprio.
- **Observação:** como `paragraph` e `divider` não têm margem entre si, a linha divisória fica encostada no
  subtítulo "Seleciona o tema.". Se quiser espaço ali, é um ajuste de composição na seção 4 (ex.: envolver
  título, subtítulo e divisória num `[vertical-list]`), sem mudar o catálogo.

## 12. Fechamento (Etapa 8)
- `elementos.md`, `elementos-por-pagina.md` e CLAUDE.md atualizados com a Artigos como convertida.
- Commit/PR: não feitos (trabalho segue na branch atual, sem commit).
- **Migração aprovada pelo responsável em 2026-11-20** (divisória encostada no subtítulo fica para a revisão geral).
