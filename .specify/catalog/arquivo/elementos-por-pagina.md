> **Arquivado em 2026-11-20.** Documento do modelo anterior, substituído pelo modelo em camadas
> ([elementos.md](../elementos.md), [estilos.md](../estilos.md) e a seção 4 — Estrutura — do `spec.md` de cada página).
> Mantido apenas como histórico; não é mais fonte de verdade.

# Catálogo de Elementos — Visão por Página (estrutura hierárquica)

> **Levantamento:** 2026-11-18, branch `feat/ajuste_tamanho_dinamico` — atualizado após as decisões R-01…R-10 do catálogo.
> **Visão geral (tipos únicos):** [catalogo-elementos.md](catalogo-elementos.md). Cada nó abaixo traz entre colchetes o tipo do catálogo (`[EL-NN tipo]`).
> Notação: `tag.classe#id` · `×N` = repetido N vezes · `(n)` = gerado em loop a partir de dados · `{JS}` = criado/alterado por script.

---

## 0. Shell da SPA — `pages/spa/spa.astro`

CSS: `scale.css`, `spa-layout.css`, `sidebar.css`, `breadcrumbs.css`, `main-container.css` · JS: `router.js`, `nav.js`, `breadcrumbs.js`

```
html > body
└── div#spa-layout.spa-layout ............................ [EL-01 app-shell]
    ├── aside#sidebar.sidebar ............................ [EL-02 sidebar]          (Sidebar.astro)
    │   ├── header#identity-header.identity-header ....... (cabeçalho com imagem de fundo)   (IdentityHeader.astro)
    │   │   ├── div.profile-photo-wrapper ................ [EL-29 avatar]
    │   │   │   └── img.profile-photo
    │   │   └── div.identity-contrast-strip .............. [EL-55 contrast-strip]
    │   │       ├── h1.profile-name ...................... [EL-25 identity-text]
    │   │       └── p.profile-role ....................... [EL-25 identity-text]
    │   └── nav#sidebar-nav.sidebar-nav-container ........ [EL-41 nav-menu]         (NavMenu.astro)
    │       └── div.nav-items-wrapper .................... (faixa: horizontal no celular, vertical no desktop — fora do R-04)
    │           └── a.nav-item[.active] ×6 ............... [EL-42 nav-item]         (NavItem.astro) {JS: .active}
    │               ├── span.nav-icon-container .......... [EL-31 icon-tile]
    │               │   ├── img.nav-icon.icon-light
    │               │   └── img.nav-icon.icon-dark
    │               └── span.nav-label ................... [EL-26 item-label]
    └── div#main-container.main-container ................ [EL-03 main-area]        (MainContainer.astro)
        ├── nav#breadcrumbs.breadcrumbs-bar .............. [EL-43 breadcrumbs]      (Breadcrumbs.astro) {JS: re-render}
        │   └── ol#breadcrumbs-list.breadcrumbs-list
        │       └── li.breadcrumb-item[.current] (n)
        │           ├── a.breadcrumb-link ................ [EL-48 text-link]
        │           │   ou span.breadcrumb-current-text
        │           └── span.breadcrumb-separator ........ [EL-33 glyph]
        └── section#page-content-host.page-content-host .. [EL-04 content-host]
            └── «página injetada pelo roteador» → seções 1–8
```

---

## 1. Sobre — `pages/spa/sobre.astro`

CSS: `pages/sobre/assets/css/sobre.css` · Componentes: `AboutPanel`, `SkillsPanel`, `SkillCard`, `SkillItemRow` (recursivo), `StarRating`

```
div#page-content.page-content-wrapper.sobre-page ......... [EL-05 page-root] [EL-56 page-background]
├── h1.page-title "Sobre" .................................. [EL-15 page-title]
├── section.info-panel.about-panel ....................... [EL-10 panel]            (AboutPanel.astro)
│   ├── h2.panel-title "Sobre mim" ....................... [EL-17 panel-title]
│   └── div.vertical-list.about-bio-container ............ [EL-13 vertical-list]
│       └── p.about-bio-text ×4 .......................... [EL-21 body-text]
└── section.info-panel.skills-panel ...................... [EL-10 panel]            (SkillsPanel.astro)
    ├── div.skills-panel-header .......................... [EL-14 header-row]
    │   ├── h2.panel-title "Habilidades" ................. [EL-17 panel-title]
    │   └── details.legend-details ....................... [EL-49 disclosure]
    │       ├── summary.legend-summary
    │       └── div.vertical-list.legend-content .......... [EL-13 vertical-list]
    │           └── div.legend-item ×5 ................... [EL-53 legend]
    │               └── span.legend-stars
    ├── div.skill-division (Hard-Skills) ................. [EL-11 section]
    │   ├── h3.division-title ............................ [EL-18 section-title] [EL-54 divider]
    │   └── div.skills-grid.hard-skills-grid ............. [EL-12 grid] 1 → 2 (768) → 3 (1280) col
    │       └── div.skill-card.hard-skill-card ×8 ........ [EL-34 card]             (SkillCard.astro)
    │           ├── h3.category-card-title ............... [EL-19 card-title]
    │           └── div.vertical-list.skills-list ........ [EL-13 vertical-list]
    │               └── «SkillItemRow» (n), recursivo:
    │                   ├─ (folha) div.skill-row ......... [EL-52 data-row]
    │                   │   ├── img.skill-icon | span.skill-icon.star-fallback  [EL-32 inline-icon]
    │                   │   ├── span.tech-name ........... [EL-26 item-label]
    │                   │   └── div.star-rating-container  [EL-51 rating]       (StarRating.astro)
    │                   │       └── svg.star-icon.active|.inactive ×5
    │                   └─ (grupo) details.skill-group-details .......... [EL-49 disclosure]
    │                       ├── summary.skill-group-summary ............. [EL-52 data-row] (▶ via ::before)
    │                       │   ├── img.skill-icon | span.star-fallback
    │                       │   ├── span.tech-name
    │                       │   └── div.star-rating-container (média dos filhos)
    │                       └── div.vertical-list.skill-sub-list ........ [EL-13 vertical-list]
    │                           └── «SkillItemRow» (recursão)
    └── div.skill-division (Soft-Skills) ................. [EL-11 section]
        ├── h3.division-title
        └── div.skills-grid.soft-skills-grid ............. [EL-12 grid] 1 → 2 col
            └── div.skill-card.soft-skill-card ×4 ........ [EL-34 card] (mesma subárvore acima)
```

Observações: o título `h1.page-title` "Sobre" foi adicionado em 2026-11-18 (catálogo R-02).

---

## 2. Histórico — `pages/spa/historico.astro`
> **Migrada para o modelo em camadas (2026-11-20).** A estrutura vigente está na seção 4 de `.specify/specs/spec-03_historico/spec.md`; a árvore abaixo é histórica.

CSS: `pages/historico/assets/css/historico.css`

```
div#page-content.page-content-wrapper.historico-page ..... [EL-05 page-root] [EL-56 page-background]
└── div.panel-container .................................. [EL-06 content-container]
    ├── h1.page-title "Histórico Profissional" ........... [EL-15 page-title]
    └── div.vertical-list.experiences-wrapper ............ [EL-13 vertical-list]
        └── div.experience-card ×5 ....................... [EL-34 card]
            ├── div.company-logo-container ............... [EL-28 logo-frame]
            │   └── img.company-logo
            ├── h3.job-title ............................. [EL-19 card-title]
            ├── div.info-badges .......................... [EL-40 tag-list] grid 2 col → flex (1024)
            │   └── span.badge ×5 ........................ [EL-38 meta-badge] (período, duração, regime, modalidade, setor)
            ├── p.job-description ........................ [EL-21 body-text]
            └── div.tech-stack-block ..................... [EL-36 inset-block]
                ├── h4.tech-stack-title .................. [EL-20 block-title]
                └── div.tech-shields ..................... [EL-40 tag-list]
                    └── span.tech-shield.hard|.soft (n) .. [EL-39 skill-tag]
```

Observações: conteúdo escrito à mão (não há array de dados); experiência 5 repete o texto da experiência 3.

---

## 3. Formação — `pages/spa/formacao.astro`
> **Migrada para o modelo em camadas (2026-11-20).** A estrutura vigente está na seção 4 de `.specify/specs/spec-04_formacao/spec.md`; a árvore abaixo é histórica.

CSS: `pages/formacao/assets/css/formacao.css`

```
div#page-content.page-content-wrapper.formacao-page ...... [EL-05 page-root] [EL-56 page-background]
└── div.panel-container .................................. [EL-06 content-container]
    ├── h1.page-title "Formação" ......................... [EL-15 page-title]
    ├── section.section-group (Acadêmica) ................ [EL-11 section]
    │   ├── h2.section-title ............................. [EL-18 section-title]
    │   └── div.cards-grid.cards-grid-academic ........... [EL-12 grid] 1 → 2 (768) col
    │       └── div.formacao-card ×2 ..................... [EL-34 card] (hover: elevação)
    │           ├── div.company-logo-container ...........  [EL-28 logo-frame]
    │           │   └── img.company-logo
    │           ├── h3.course-title ...................... [EL-19 card-title]
    │           └── span.badge .......................... [EL-38 meta-badge]
    ├── section.section-group (Idiomas) .................. [EL-11 section]
    │   ├── h2.section-title
    │   └── div.cards-grid.cards-grid-languages .......... [EL-12 grid] 1 → 2 (768) → 3 (1024) col
    │       └── div.formacao-card ×2 (sem badge)
    └── section.section-group (Treinamentos) ............. [EL-11 section]
        ├── h2.section-title
        └── div.cards-grid.cards-grid-trainings .......... [EL-12 grid] 1 → 2 → 3 col
            └── div.formacao-card ×1 (com badge)
```

---

## 4. Portfólio — `pages/spa/portfolio.astro` → `pages/portfolio/portfolio.astro`
> **Migrada para o modelo em camadas (2026-11-20).** A estrutura vigente está na seção 4 de `.specify/specs/spec-05_portfolio/spec.md`; a árvore abaixo é histórica.

CSS: `pages/portfolio/assets/css/portfolio.css` · JS: `portfolio.js` (scroll-spy, âncoras, `--portfolio-header-h`)

```
div#page-content.page-content-wrapper.portfolio-page-wrapper  [EL-05 page-root] [EL-56 page-background]
├── header.portfolio-header (sticky) ..................... [EL-07 page-header]
│   ├── h1.page-title ..................................... [EL-15 page-title]
│   └── nav.category-selection ........................... [EL-44 filter-bar]
│       └── a.selection-button[.active] ×7 .............. [EL-45 filter-pill] {JS: .active}
├── main.portfolio-body .................................. [EL-08 page-body]
│   └── section#section-<id>.category-section ×7 ......... [EL-11 section] (alvo de âncora)
│       ├── h2.category-section-title ................... [EL-18 section-title]
│       └── div.project-grid (só se houver projetos) ..... [EL-12 grid] 1 → 2 (768) col
│           └── article.project-card (n) ................. [EL-34 card] (hover: elevação)
│               ├── a.project-image-wrap ................. [EL-30 cover-image]
│               │   └── img.project-image
│               ├── div.project-content .................. [EL-37 card-body]
│               │   ├── h3.project-name .................. [EL-19 card-title]
│               │   │   └── a.project-link ............... [EL-48 text-link]
│               │   └── p.project-resume ................. [EL-21 body-text] (3 linhas)
│               └── div.habilities-list .................. [EL-40 tag-list]
│                   └── span.hability-tag-HS|-SS (n) ..... [EL-39 skill-tag]
└── script (portfolio.js inline)
```

Observações: 5 das 7 categorias estão vazias (só título). Header sticky dentro do host; o host remove o `padding-top` via `:has()`.

---

## 5. Artigos — `pages/spa/artigos.astro` → `pages/artigos/artigos.astro`
> **Migrada para o modelo em camadas (2026-11-20).** A estrutura vigente está na seção 4 de `.specify/specs/spec-06_artigos/spec.md`; a árvore abaixo é histórica.

CSS: `pages/artigos/assets/css/artigos.css` · JS: `artigos.js` (acordeão, seleção, navegação)

```
div#page-content.page-content-wrapper.artigos-page ....... [EL-05 page-root] [EL-56 page-background]
├── div.app .............................................. [EL-06 content-container]
│   ├── header ........................................... [EL-07 page-header]
│   │   ├── h1.page-title "Artigos técnicos" ............. [EL-15 page-title]
│   │   ├── p.intro ...................................... [EL-16 page-subtitle]
│   │   └── div.rule ..................................... [EL-54 divider]
│   ├── main.workspace ................................... [EL-08 page-body]
│   │   └── div.topic-columns ............................ [EL-12 grid] 1 → 2 (1024) col
│   │       └── div.vertical-list.column ×2 .............. [EL-13 vertical-list] (6 + 7 grupos)
│   │           └── div.topic-group[.open] ×13 ........... [EL-50 accordion] + [EL-34 card] {JS: .open}
│   │               ├── button.group-toggle[aria-expanded]
│   │               │   ├── span.group-icon .............. [EL-32 inline-icon]
│   │               │   ├── span.group-name .............. [EL-19 card-title]
│   │               │   └── span.chevron ................. [EL-33 glyph]
│   │               └── div.group-children#artigos-group-N
│   │                   ├── div.vertical-list.leaf-list [EL-13 vertical-list]
│   │                   │   └── a.leaf[.selected] (n) .... [EL-46 list-pill-link] {JS: .selected}
│   │                   │       ├── span.leaf-bullet ..... [EL-33 glyph]
│   │                   │       ├── «texto»
│   │                   │       └── span.check-mark ...... [EL-33 glyph] {JS, só no selecionado}
│   │                   └── div.subgroup[.open] (n) ...... [EL-50 accordion] {JS: .open}
│   │                       ├── button.subgroup-toggle
│   │                       │   ├── span.subgroup-marker . [EL-33 glyph]
│   │                       │   ├── span.subgroup-name ... [EL-26 item-label]
│   │                       │   └── span.chevron
│   │                       └── div.subgroup-children#artigos-sub-N-M
│   │                           └── div.vertical-list.leaf-list > a.leaf (n)
│   └── footer ........................................... [EL-09 page-footer] [EL-54 divider]
│       ├── p (©) ........................................ [EL-24 caption]
│       └── p.footer-motto > span ×2 ..................... [EL-27 motto]
└── script (artigos.js inline)
```

Observações: única página com tipografia própria (Oswald/Roboto Condensed) e com rodapé; `header` e `footer` sem classes (estilizados por seletor de tag escopado em `.artigos-page`).

---

## 6. Contatos — `pages/spa/contatos.astro` → `pages/contatos/contatos.astro`

> **Migrada para o modelo em camadas (2026-11-20).** A estrutura vigente está na seção 4 de `.specify/specs/spec-07_contatos/spec.md`; a árvore abaixo é histórica.

CSS: `pages/contatos/assets/css/contatos.css`

```
div#page-content.page-content-wrapper.contacts-page .... [EL-05 page-root] [EL-56 page-background]
├── h1.page-title "Meus Contatos" .........................  [EL-15 page-title]
└── div.contact-grid ..................................... [EL-12 grid] 1 → 2 (768) col
    └── a.contact-card ×4 ................................ [EL-35 link-card]
        ├── div.icon-wrap ................................ [EL-31 icon-tile]
        │   └── img
        ├── div.vertical-list.contact-info ............... [EL-13 vertical-list]
        │   ├── span.contact-label ....................... [EL-22 label]
        │   ├── span.contact-value ....................... [EL-23 value-text]
        │   └── span.contact-detail (opcional) ........... [EL-24 caption]
        └── span.contact-action "↗" ...................... [EL-33 glyph]
```

---

## 7. Fallback 404 — `pages/spa/default.astro` (+ fallback inline em `router.js`)

CSS: `<style>` local, px fixos

```
div#page-content.page-content-wrapper.default-fallback-page  [EL-05 page-root]
└── div.fallback-card .................................... [EL-34 card]
    ├── div.fallback-icon "⚠️" ........................... [EL-32 inline-icon]
    ├── h1.fallback-title ................................ [EL-15 page-title]
    ├── p.fallback-message ............................... [EL-21 body-text]
    └── div.fallback-actions
        └── a.fallback-button ............................ [EL-47 button-link]
```

## 8. Subpágina demo — `pages/spa/subpagina-demo.astro` (auxiliar de teste)

CSS: `<style>` local, px fixos

```
div#page-content.page-content-wrapper .................... [EL-05 page-root]
├── div.page-header ...................................... [EL-07 page-header] [EL-54 divider]
│   ├── h1.page-title .................................... [EL-15 page-title]
│   └── p.page-subtitle .................................. [EL-16 page-subtitle]
└── div.content-body ..................................... [EL-08 page-body]
    ├── p.intro-paragraph ................................ [EL-21 body-text]
    └── div.subpage-box .................................. [EL-34 card]
        ├── h3 (sem classe) .............................. [EL-19 card-title]
        ├── p
        └── div (style inline)
            └── a.test-btn[.secondary] ×2 ................ [EL-47 button-link]
```

---

## Matriz de uso: tipo × página

`●` usa · `○` usa só em página auxiliar (404/DEM)

| Tipo | SPA | SOB | HIS | FOR | POR | ART | CON | 404/DEM |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| EL-01…04 shell (app-shell, sidebar, main-area, content-host) | ● | | | | | | | |
| EL-05 page-root | | ● | ● | ● | ● | ● | ● | ○ |
| EL-06 content-container | | | ● | ● | | ● | | |
| EL-07 page-header | | | | | ● | ● | | ○ |
| EL-08 page-body | | | | | ● | ● | | ○ |
| EL-09 page-footer | | | | | | ● | | |
| EL-10 panel | | ● | | | | | | |
| EL-11 section | | ● | | ● | ● | | | |
| EL-12 grid | | ● | | ● | ● | ● | ● | |
| EL-13 vertical-list | | ● | ● | | | ● | ● | |
| EL-14 header-row | | ● | | | | | | |
| EL-15 page-title | | ● | ● | ● | ● | ● | ● | ○ |
| EL-16 page-subtitle | | | | | | ● | | ○ |
| EL-17 panel-title | | ● | | | | | | |
| EL-18 section-title | | ● | | ● | ● | | | |
| EL-19 card-title | | ● | ● | ● | ● | ● | | ○ |
| EL-20 block-title | | | ● | | | | | |
| EL-21 body-text | | ● | ● | | ● | | | ○ |
| EL-22 label · EL-23 value-text | | | | | | | ● | |
| EL-24 caption | | | | | | ● | ● | |
| EL-25 identity-text | ● | | | | | | | |
| EL-26 item-label | ● | ● | | | | ● | | |
| EL-27 motto | | | | | | ● | | |
| EL-28 logo-frame | | | ● | ● | | | | |
| EL-29 avatar | ● | | | | | | | |
| EL-30 cover-image | | | | | ● | | | |
| EL-31 icon-tile | ● | | | | | | ● | |
| EL-32 inline-icon | | ● | | | | ● | | ○ |
| EL-33 glyph | ● | ● | | | | ● | ● | |
| EL-34 card | | ● | ● | ● | ● | ● | | ○ |
| EL-35 link-card | | | | | | | ● | |
| EL-36 inset-block | | | ● | | | | | |
| EL-37 card-body | | | | | ● | | | |
| EL-38 meta-badge | | | ● | ● | | | | |
| EL-39 skill-tag | | | ● | | ● | | | |
| EL-40 tag-list | | | ● | | ● | | | |
| EL-41 nav-menu · EL-42 nav-item · EL-43 breadcrumbs | ● | | | | | | | |
| EL-44 filter-bar · EL-45 filter-pill | | | | | ● | | | |
| EL-46 list-pill-link | | | | | | ● | | |
| EL-47 button-link | | | | | | | | ○ |
| EL-48 text-link | ● | | | | ● | | | |
| EL-49 disclosure (nativo) | | ● | | | | | | |
| EL-50 accordion (JS) | | | | | | ● | | |
| EL-51 rating · EL-52 data-row · EL-53 legend | | ● | | | | | | |
| EL-54 divider | | ● | | | | ● | | ○ |
| EL-55 contrast-strip | ● | | | | | | | |
| EL-56 page-background | | ● | ● | ● | ● | ● | ● | |

**Tipos compartilhados por 3+ páginas** (candidatos prioritários a uma definição de estilo unificada): EL-05 page-root, EL-12 grid, EL-13 vertical-list, EL-15 page-title, EL-19 card-title, EL-34 card, EL-21 body-text, EL-11 section, EL-18 section-title, EL-56 page-background, EL-33 glyph.
