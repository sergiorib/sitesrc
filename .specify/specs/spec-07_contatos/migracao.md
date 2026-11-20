# Registro de Migração — Página Contatos (spec-07)

> Plano: [plano-migracao.md](../../catalog/plano-migracao.md) · Status: **Concluída e aprovada (2026-11-20)**

## 1. Linha de base (Etapa 1) — 2026-11-20

Medido no shell da SPA (`/` → clique em "Contatos"), animações finalizadas. Retângulos `x,y,largura,altura`.

| Largura | `#page-content` | `h1` | Cards (1 a 4) |
|---|---|---|---|
| 375  | 20,197,327,812 | 36,213,295,29 | 36,262,295,88 · 36,359,295,88 · 36,457,295,177 · 36,644,295,135 |
| 1024 | 264,66,728,800 | 310,102,637,31 | 310,157,312,96 · 634,157,312,96 · 310,265,312,190 · 634,265,312,190 |
| 1440 | 301,75,1100,900 | 360,122,982,33 | 360,186,485,102 · 857,186,485,102 · 360,300,485,155 · 857,300,485,155 |

Sem rolagem horizontal nas três larguras. Breadcrumb: "Meus Contatos".
Comportamentos (sem JS próprio): links `tel:` e `mailto:` na mesma aba; LinkedIn e GitHub em nova aba
(`target="_blank" rel="noopener noreferrer"`); hover do card sobe 3px e realça borda e seta.

## 2. Inventário (Etapa 2)

### 2.1 Árvore atual (as duas cópias têm o mesmo corpo; `pages/spa/contatos.astro` importa `pages/contatos/contatos.astro` como componente)

```
div#page-content.page-content-wrapper.contacts-page   data-page-id="contatos" data-page-title="Meus Contatos"
  h1.page-title 'Meus Contatos'
  div.contact-grid                                   (1 col → 2 @768)
    a.contact-card ×4  (href, target/rel conforme o tipo de link)
      div.icon-wrap > img (23×23)
      div.vertical-list.contact-info
        span.contact-label
        span.contact-value
        span.contact-detail   (opcional)
      span.contact-action '↗'
```

### 2.2 Ganchos de JS
Nenhum JS próprio. O roteador usa só `#page-content`, `data-page-id` e `data-page-title`.
`breadcrumbs.js` e `nav.js` usam apenas o id `contatos`.

### 2.3 Conteúdo embutido
Array `contacts` (4 itens: `id`, `label`, `value`, `detail`, `href`, `icon`) no frontmatter de
`pages/contatos/contatos.astro`.

### 2.4 Divergências spec × código (o código é a referência do que a página faz)
- Padding do contêiner, gap do grid, tamanhos de ícone e textos da spec (px fixos e `clamp`) não batem com o CSS atual, que usa a escala fluida.
- A spec cita breakpoint de 480px, que não existe no código e não é aceito pelo modelo (só 768/1024/1280).
- FR-001 cita `pages/contatos/assets/js/contatos.js` e `pages/contatos.md`, que não existem.
- FR-003 diz que a página é injetada em `.contacts-page`; o correto é `#page-content-host`.
- `.contact-detail` usa a fonte `Inter`, que a página não carrega (só o Portfólio carrega); na prática aparece em fonte genérica.

## 3. Mapeamento (Etapa 3)

| Item atual | Cat. | Proposta | Observação |
|---|---|---|---|
| `div#page-content.contacts-page` | A | `[page-root:petroleo] contatos` | único estilo existente (M-02) |
| `h1.page-title` | A | `[page-title:claro] 'Meus Contatos'` | |
| `div.contact-grid` | A | `[grid] {colunas: 1 → 2 @768}` | |
| `a.contact-card` (e tudo dentro) | **C** | **`[link-card] *@dados.contatos`** — elemento novo | ver §4 |
| `div.vertical-list.contact-info` | A | parte do molde de `link-card` (`vertical-list--compacto`) | gap igual (`--space-xs`) |
| Array `contacts` | D | `@dados.contatos` → `pages/contatos/data/contatos.json` | |

### Por que `link-card` é elemento novo, e não `card`
Pelo critério de equivalência (plano §3): `card` é um contêiner (`div`) que recebe filhos
compostos na página; `contact-card` é um **link** (`a`) com função de ação e estrutura fixa
alimentada por dados (ícone, rótulo, valor, detalhe, seta). Função e tag raiz diferentes → **C**.
Nenhum outro elemento do catálogo (`skill-item`, `legend-item`) tem essa função.
Nome genérico (`link-card`, não `contact-card`) para poder ser reusado em outras páginas.

## 4. Elemento novo proposto: `link-card` (EL-15)

```
HTML:
  <a class="link-card {estilo}" href="{item.href}" [target="_blank" rel="noopener noreferrer"]>
    <span class="link-card-icon"><img src="{item.icone}" alt="" width="23" height="23"></span>
    <span class="vertical-list vertical-list--compacto link-card-body">
      <span class="link-card-label">{item.rotulo}</span>
      <span class="link-card-value">{item.valor}</span>
      <span class="link-card-detail">{item.detalhe}</span>      ← só se houver detalhe
    </span>
    <span class="link-card-action" aria-hidden="true">↗</span>
  </a>
Dados do item: rotulo, valor, detalhe?, href, icone
Estilos: ciano (padrão)
Comportamento:
  - href http(s) → abre em nova aba (target/rel); demais (tel:, mailto:) na mesma aba
  - hover: sobe o card e realça borda e seta
```

Estilo `ciano`: reproduz o visual atual do `contact-card` com tokens novos de cor
(`--cor-ciano`, `--cor-ciano-suave`, `--cor-ciano-claro`, `--cor-texto-gelo`, `--cor-texto-nevoa`,
bordas e gradientes do card em repouso e hover). Para o detalhe, usa `--fonte-texto` (Barlow),
já carregada, em vez de `Inter`, que hoje não é carregada.

## 5. Diferenças visuais aceitas (efeito de M-02) — para aprovação

| Item | Hoje | Depois |
|---|---|---|
| Fundo da página | gradiente **radial** azul-petróleo/ciano (`#142b36 → #244653 → #31596a`) | gradiente **vertical** `petroleo` (`#16222A → #3A6073`), igual ao da Sobre |
| Cantos do contêiner | arredondados 14px | retos |
| Padding do contêiner ≥768px | maior (`--space-2xl × 1,5` / `× 1,9`) | `--space-xl` em todas as larguras |
| Altura mínima | `100vh` | `100%` |
| Entrada da página | sem animação | `fadeIn` (4px, 0,3s), como a Sobre |
| Título `h1` | margem inferior `--space-2xl`, `letter-spacing 0.03em`, `line-height 1.2` | margem `--space-lg`, sem espaçamento extra (estilo `claro`) |
| Espaço entre cards | `--space-md` | `--space-lg` (estilo do `grid`) |
| Detalhe do card | `Inter` (não carregada → fonte genérica) | `Barlow` |

## 6. Aprovação 1 — 2026-11-20
- Mapeamento e elemento novo `link-card` (EL-15): **aprovados**.
- Diferenças visuais do §5: **todas aceitas** (sem exceções M-03).
- Git: **continuar na branch atual** (`feat/padronizacao_elementos`), sem commit nem branch nova.

## 7. Catálogo (Etapa 4)
- `elementos.md`: ficha `link-card` (EL-15), em Containers.
- `estilos.md`: estilo `link-card:ciano` e 12 tokens novos (`--raio-lg`, `--raio-icone`, `--cor-ciano*`,
  `--cor-texto-gelo`, `--cor-texto-nevoa`, `--gradiente-card-ciano`, `--gradiente-card-ciano-hover`).
- Nenhum elemento ou estilo existente foi alterado → página Sobre não é afetada (M-04).

## 8. Spec da página (Etapa 5)
- `spec.md` reescrita no modelo (seções 1 a 10), sem valores visuais; divergências do §2.4 resolvidas.
- Classe da raiz muda de `contacts-page` para `contatos-page` (molde do `page-root`); nenhum JS usa a antiga.
- `contracts/ui-contracts.md` marcado como substituído.
- **Aguardando aprovação 2** para seguir para a implementação (Etapa 6).

## 9. Aprovação 2 — 2026-11-20
- Spec da página: **aprovada**.

## 10. Implementação (Etapa 6)
- `pages/contatos/data/contatos.json` (4 contatos, campos `rotulo`, `valor`, `detalhe?`, `href`, `icone`).
- Componente novo `pages/spa/components/elementos/LinkCard.astro` (EL-15).
- `pages/spa/contatos.astro` passou a ter o contêiner raiz explícito (antes importava a página da
  feature como componente, contra o Princípio II); `pages/contatos/contatos.astro` é a cópia.
- `contatos.css` reescrito a partir de `estilos.md`: `page-root`, `grid`, `vertical-list` (compacto),
  `page-title` (claro) e `link-card` (ciano).
- `tokens.css`: 12 tokens novos.

## 11. Validação (Etapa 7) — 2026-11-20
- `npm run build`: sem erros nem avisos.
- Comparação com a linha de base (`x,y,largura,altura`):

| Largura | `h1` | Cards (1 a 4) |
|---|---|---|
| 375  | 36,213,295,29 (igual) | 36,254,295,88 · 36,353,295,88 · 36,453,295,177 · 36,642,295,135 |
| 1024 | 282,84,700,31 | 282,129,343,96 · 639,129,343,96 · 282,239,343,176 · 639,239,343,176 |
| 1440 | 321,95,1069,34 | 321,143,527,102 · 862,143,527,102 · 321,260,527,157 · 862,260,527,157 |

  Todas as diferenças decorrem do §5: padding fixo `--space-xl` (cards mais largos ≥768px),
  margem menor do título (cards sobem), gap `--space-lg`, altura `100%` em vez de `100vh` e
  detalhe em Barlow. Mesma ordem, mesmas colunas (1 → 2 @768), sem rolagem horizontal.
- Links: `tel:`/`mailto:` na mesma aba; LinkedIn/GitHub com `target="_blank" rel="noopener noreferrer"`.
- Hover: card sobe 3px, borda e seta em `--cor-ciano`.
- Breadcrumb: "Meus Contatos"; item "Contatos" ativo.
- Regressão: Sobre sem mudanças (sem `h1`, `panel--claro`, 12 cards).
- Colisão de classes: ao navegar Contatos → Histórico, o CSS da Contatos é descarregado e o
  `h1.page-title` da Histórico mantém o estilo próprio.
- Console: sem erros da página (apenas avisos de reconexão do servidor de desenvolvimento).

## 12. Fechamento (Etapa 8)
- `elementos.md`, `elementos-por-pagina.md` e CLAUDE.md atualizados com a Contatos como convertida.
- Commit/PR: não feitos (decisão de continuar na branch atual, sem commit).
- **Migração aprovada pelo responsável em 2026-11-20.**
