> **Arquivado em 2026-11-20.** Documento do modelo anterior, substituído pelo modelo em camadas
> ([elementos.md](../elementos.md), [estilos.md](../estilos.md) e a seção 4 — Estrutura — do `spec.md` de cada página).
> Mantido apenas como histórico; não é mais fonte de verdade.

# Catálogo Unificado de Elementos — Visão Geral

> **Escopo:** todos os tipos de elemento usados nas páginas da SPA (`pages/spa/*.astro`, componentes em `pages/spa/components/`, `pages/sobre/components/`, `pages/portfolio/portfolio.astro`, `pages/artigos/artigos.astro`, `pages/contatos/contatos.astro`) e nos fragmentos auxiliares (`default.astro`, `subpagina-demo.astro`).
> **Levantamento:** 2026-11-18, branch `feat/ajuste_tamanho_dinamico` (inclui alterações ainda não commitadas).
> **Visão complementar:** [elementos-por-pagina.md](elementos-por-pagina.md) (estrutura hierárquica de cada página).

## Como ler este catálogo

- Cada **tipo de elemento** recebe um ID estável `EL-NN` e um **nome canônico** genérico (independente de página).
- A coluna **Implementações atuais** lista as classes CSS/IDs reais *como estão no código hoje* e a página onde aparecem. Nenhuma classe foi renomeada; o nome canônico é só a chave do catálogo.
- Siglas de página: **SPA** (shell: sidebar, breadcrumbs, host), **SOB** Sobre, **HIS** Histórico, **FOR** Formação, **POR** Portfólio, **ART** Artigos, **CON** Contatos, **404** fallback (`default.astro`), **DEM** subpágina demo.
- O objetivo é que, no futuro, a definição de estilo seja feita **por tipo** (EL-NN) na especificação, enquanto cada página continua com seu próprio arquivo `.css` aplicando essa definição às suas classes.

Resumo: **9 categorias, 56 tipos de elemento** (+ estados, fundamentos de estilo e inconsistências nas seções 10–12).

## 0. Regras normativas (spec única)

Este catálogo é a **especificação única de elementos**: vale para todas as páginas e prevalece sobre nomes divergentes nas specs individuais (`spec-NN_*`). Cada página **continua com seu próprio arquivo `.css`**, que implementa os tipos daqui com escopo na raiz da página.

| # | Regra | Decidido em |
|---|---|---|
| R-01 | **Escopo obrigatório:** todo tipo compartilhado por mais de uma página é estilizado **uma única vez por página**, sempre prefixado pela classe-raiz da página (ex.: `.historico-page .page-title`). Seletores globais para tipos compartilhados são proibidos. | 2026-11-18 |
| R-02 | **Título de página (EL-15):** toda página tem exatamente um `h1.page-title`, primeiro título dentro de `#page-content`. | 2026-11-18 |
| R-03 | **Raiz de página (EL-05):** `#page-content` sempre com as classes `page-content-wrapper <pagina>-page` + `data-page-id` e `data-page-title`. | 2026-11-18 |
| R-04 | **Lista vertical (EL-13):** nome único `.vertical-list` (flex em coluna). A classe específica (ex.: `.leaf-list`) permanece **apenas como modificadora** para espaçamento/borda próprios. Faixas que mudam de eixo por breakpoint (`.nav-items-wrapper`) não são `vertical-list`. | 2026-11-18 |
| R-05 | **Badge de metadado (EL-38):** nome único `.badge`. | 2026-11-18 |
| R-06 | **Moldura de logo (EL-28):** nome único `.company-logo-container > .company-logo`. | 2026-11-18 |
| R-07 | **Títulos de categoria:** `.category-card-title` (título de card, EL-19) e `.category-section-title` (título de seção, EL-18). `.category-title` não deve mais ser usado. | 2026-11-18 |
| R-08 | **Animação de entrada:** `@keyframes fadeIn` = `opacity 0→1` + `translateY(4px)→0`, `0.3s ease-in-out`. Toda página que a usa define-a com esses valores exatos. | 2026-11-18 |
| R-09 | **Nomes lógicos × classes:** nomes lógicos nas specs podem ser snake_case (`selection_button`); a classe CSS é sempre kebab-case (`.selection-button`). | herdado da spec-05 |
| R-10 | **Exceção temporária:** `default.astro` (404) e `subpagina-demo.astro` mantêm px fixos (fora do Princípio VI) até decisão futura. | 2026-11-18 |

---

## 1. Estrutura e layout

| ID | Tipo canônico | Papel | Implementações atuais | Variantes / estados | Observações |
|---|---|---|---|---|---|
| EL-01 | **app-shell** | Contêiner raiz da aplicação; arranjo vertical (<1024px) ou lateral (≥1024px) | `#spa-layout.spa-layout` (SPA) | coluna / linha | `spa-layout.css` |
| EL-02 | **sidebar** | Painel fixo de identidade + navegação | `#sidebar.sidebar` (`<aside>`) (SPA) | topo (mobile) / lateral (desktop) | |
| EL-03 | **main-area** | Área à direita da sidebar com breadcrumbs + host | `#main-container.main-container` (SPA) | — | |
| EL-04 | **content-host** | Região rolável onde o roteador injeta a página | `#page-content-host.page-content-host` (`<section>`) (SPA) | sem padding-top quando contém POR (`:has()`) | Único scroller da SPA |
| EL-05 | **page-root** | Raiz obrigatória de cada página (`#page-content`, `data-page-id`, `data-page-title`) | `.page-content-wrapper` + modificador: `.sobre-page` (SOB), `.historico-page` (HIS), `.formacao-page` (FOR), `.portfolio-page-wrapper` (POR), `.artigos-page` (ART), `.contacts-page` (CON), `.default-fallback-page` (404) | fundo próprio por página | R-03. POR usa sufixo `-wrapper` e CON usa `contacts-` (inglês) — não padronizado ainda |
| EL-06 | **content-container** | Limita largura (`--container-max`) e centraliza | `.panel-container` (HIS, FOR), `.app` (ART) | — | SOB, POR, CON não têm |
| EL-07 | **page-header** | Bloco de topo da página (título + intro/controles) | `.portfolio-header` (`<header>`, sticky) (POR), `header` sem classe (ART), `.page-header` (DEM) | fixo (sticky) / estático | HIS, FOR, SOB, CON não têm wrapper de cabeçalho — o título fica solto |
| EL-08 | **page-body** | Corpo principal da página | `.portfolio-body` (`<main>`) (POR), `.workspace` (`<main>`) (ART), `.content-body` (DEM) | — | `<main>` aninhado dentro de `<section>` do host |
| EL-09 | **page-footer** | Rodapé interno da página | `footer` sem classe (ART) | coluna / linha (≥480px) | Só ART tem |
| EL-10 | **panel** | Bloco de conteúdo emoldurado de grande porte | `.info-panel` + `.about-panel` / `.skills-panel` (`<section>`) (SOB) | — | |
| EL-11 | **section** | Agrupamento temático com título dentro da página | `.section-group` (FOR), `.category-section` (POR, alvo de âncora), `.skill-division` (SOB) | âncora com `scroll-margin-top` (POR) | |
| EL-12 | **grid** | Grade responsiva de cards | `.skills-grid` + `.hard-skills-grid`/`.soft-skills-grid` (SOB), `.cards-grid` + `-academic`/`-languages`/`-trainings` (FOR), `.project-grid` (POR), `.contact-grid` (CON), `.topic-columns` (ART) | 1 → 2 → 3 colunas por breakpoint | Breakpoints e nº de colunas diferem por página |
| EL-13 | **vertical-list** | Lista vertical simples (flex column + gap) | `.vertical-list` + modificador: `.experiences-wrapper` (HIS), `.column` (ART), `.skills-list` (SOB), `.skill-sub-list` (SOB), `.leaf-list` (ART), `.about-bio-container` (SOB), `.contact-info` (CON), `.legend-content` (SOB) | — | R-04. `.nav-items-wrapper` (SPA) fica fora: é horizontal no celular |
| EL-14 | **header-row** | Linha título + controle lateral | `.skills-panel-header` (SOB) | coluna / linha (≥768px) | |

## 2. Tipografia

| ID | Tipo canônico | Papel | Implementações atuais | Observações |
|---|---|---|---|---|
| EL-15 | **page-title** | Título principal da página | `h1.page-title` em SOB, HIS, FOR, POR, ART, CON e DEM; `h1.fallback-title` (404) | R-01, R-02. Cada página define o estilo uma vez, com escopo (`.<pagina>-page .page-title`) |
| EL-16 | **page-subtitle** | Linha de apoio abaixo do título | `.intro` (ART), `.page-subtitle` (DEM) | |
| EL-17 | **panel-title** | Título de painel | `.panel-title` `<h2>` (SOB) | Em SOB faz o papel de título de página |
| EL-18 | **section-title** | Título de seção | `.section-title` `<h2>` (FOR), `.category-section-title` `<h2>` (POR), `.division-title` `<h3>` (SOB) | R-07 |
| EL-19 | **card-title** | Título de card | `.job-title` `<h3>` (HIS), `.course-title` `<h3>` (FOR), `.project-name` `<h3>` (POR), `.category-card-title` `<h3>` (SOB, skill-card), `.group-name` `<span>` (ART) | R-07 |
| EL-20 | **block-title** | Título de sub-bloco dentro de card | `.tech-stack-title` `<h4>` (HIS) | |
| EL-21 | **body-text** | Parágrafo de conteúdo | `.about-bio-text` (SOB), `.job-description` (HIS), `.project-resume` (POR, truncado em 3 linhas), `.fallback-message` (404), `.intro-paragraph` (DEM) | Fontes variam: monospace (SOB, HIS) vs Inter (POR) |
| EL-22 | **label / eyebrow** | Rótulo curto acima de um valor | `.contact-label` (CON) | Uppercase |
| EL-23 | **value-text** | Valor em destaque | `.contact-value` (CON) | |
| EL-24 | **caption / detail** | Texto secundário pequeno | `.contact-detail` (CON), `footer p` (ART) | |
| EL-25 | **identity-text** | Nome e cargo do perfil | `.profile-name` `<h1>`, `.profile-role` `<p>` (SPA) | `.profile-name` é o único `<h1>` do shell |
| EL-26 | **item-label** | Texto de item em lista/linha | `.tech-name` (SOB), `.nav-label` (SPA), `.subgroup-name` (ART) | |
| EL-27 | **motto** | Frase de assinatura com separadores | `.footer-motto` (+ `span` separador) (ART) | |

## 3. Mídia e ícones

| ID | Tipo canônico | Papel | Implementações atuais | Observações |
|---|---|---|---|---|
| EL-28 | **logo-frame** | Moldura centralizada + logo de organização | `.company-logo-container` > `.company-logo` (HIS, FOR) | R-06. Altura `--logo-h` (HIS) vs `--logo-h * 0.6` (FOR), cada uma no CSS da página |
| EL-29 | **avatar** | Foto de perfil circular com anel em gradiente | `.profile-photo-wrapper` > `.profile-photo` (SPA) | |
| EL-30 | **cover-image** | Imagem de capa 16:9 clicável | `.project-image-wrap` (`<a>`) > `.project-image` (POR) | zoom no hover |
| EL-31 | **icon-tile** | Ícone dentro de caixa/moldura fixa | `.icon-wrap` > `img` (CON), `.nav-icon-container` > `.nav-icon` (SPA) | `.nav-icon` tem par claro/escuro (`.icon-light`/`.icon-dark`) alternado pelo estado ativo |
| EL-32 | **inline-icon** | Ícone pequeno alinhado ao texto | `.skill-icon` (img/span) (SOB), `.group-icon` (glifo) (ART), `.fallback-icon` (emoji) (404) | `.tech-icon` está no CSS de SOB mas **não é usado** |
| EL-33 | **glyph / indicador** | Caractere decorativo de direção/estado | `.chevron` (ART), `.subgroup-marker` (ART), `.leaf-bullet` (ART), `.contact-action` ↗ (CON), `.check-mark` ✓ (ART, criado via JS), `.breadcrumb-separator` / (SPA), `::before` ▶ em `.skill-group-summary` (SOB), `.star-fallback` ☆ (SOB) | |

## 4. Cards e contêineres de conteúdo

| ID | Tipo canônico | Papel | Implementações atuais | Variantes / estados | Observações |
|---|---|---|---|---|---|
| EL-34 | **card** | Unidade de conteúdo emoldurada | `.experience-card` (HIS), `.formacao-card` (FOR), `.skill-card` (SOB), `.project-card` `<article>` (POR), `.fallback-card` (404), `.subpage-box` (DEM) | `.hard-skill-card` / `.soft-skill-card` (SOB); hover com elevação (FOR, POR) | Todos com borda `#0381B0` exceto 404/DEM |
| EL-35 | **link-card** | Card inteiro clicável | `.contact-card` (`<a>`) (CON) | hover: elevação + seta desloca | |
| EL-36 | **inset-block** | Bloco destacado dentro de um card | `.tech-stack-block` (HIS) | | |
| EL-37 | **card-body** | Área de texto interna do card | `.project-content` (POR) | | Outras páginas põem o texto direto no card |

## 5. Badges, tags e chips

| ID | Tipo canônico | Papel | Implementações atuais | Variantes | Observações |
|---|---|---|---|---|---|
| EL-38 | **meta-badge** | Pílula de metadado (período, regime, local) | `.badge` (HIS, FOR) | — | R-05. Visual próprio em cada página (escopado) |
| EL-39 | **skill-tag** | Chip de tecnologia/habilidade com variante hard/soft | `.tech-shield.hard` / `.tech-shield.soft` (HIS), `.hability-tag-HS` / `.hability-tag-SS` (POR) | hard / soft | Mesmo conceito, duas convenções de variante (classe modificadora vs sufixo) |
| EL-40 | **tag-list** | Contêiner flex-wrap de badges/tags | `.info-badges` (HIS, grid 2 col → flex), `.tech-shields` (HIS), `.habilities-list` (POR) | | |

## 6. Navegação

| ID | Tipo canônico | Papel | Implementações atuais | Estados | Observações |
|---|---|---|---|---|---|
| EL-41 | **nav-menu** | Menu principal | `#sidebar-nav.sidebar-nav-container` (`<nav>`) (SPA) | faixa horizontal rolável / coluna | |
| EL-42 | **nav-item** | Item do menu principal (ícone + rótulo) | `.nav-item` (`<a>`, `data-menu-id`) (SPA) | `.active` + `aria-current="page"`; hover | |
| EL-43 | **breadcrumbs** | Trilha hierárquica | `#breadcrumbs.breadcrumbs-bar` > `#breadcrumbs-list.breadcrumbs-list` > `.breadcrumb-item` > `.breadcrumb-link` / `.breadcrumb-current-text` + `.breadcrumb-separator` (SPA) | `.breadcrumb-item.current` | Re-renderizado por `breadcrumbs.js` |
| EL-44 | **filter-bar** | Barra de pílulas de seleção | `.category-selection` (`<nav>`) (POR) | rolável (mobile) / wrap (≥768px) | |
| EL-45 | **filter-pill** | Pílula de seleção/âncora interna | `.selection-button` (`<a>`, `data-section`) (POR) | `.active` (scroll-spy), hover, `:focus-visible` | Nome lógico na spec-05: `selection_button` (snake → classe kebab `.selection-button`) |
| EL-46 | **list-pill-link** | Item de lista clicável em pílula | `.leaf` (`<a>`, `data-url`) (ART) | `.selected` (+ `.check-mark`), hover, `:focus-visible` | |
| EL-47 | **button-link** | Botão de ação (CTA) | `.fallback-button` (404), `.test-btn` / `.test-btn.secondary` (DEM) | primário / secundário | Só em páginas auxiliares, com px fixos |
| EL-48 | **text-link** | Link em texto | `.project-link` (POR), `.breadcrumb-link` (SPA) | hover | |

## 7. Divulgação progressiva (acordeões)

| ID | Tipo canônico | Papel | Implementações atuais | Estados | Observações |
|---|---|---|---|---|---|
| EL-49 | **disclosure (nativo)** | `<details>/<summary>` | `.legend-details` > `.legend-summary` + `.legend-content` (SOB); `.skill-group-details` > `.skill-group-summary` + `.skill-sub-list` (SOB, recursivo) | `[open]` | Sem JS |
| EL-50 | **accordion (JS)** | Botão `aria-expanded` + painel | `.topic-group` > `.group-toggle` + `.group-children` (ART); `.subgroup` > `.subgroup-toggle` + `.subgroup-children` (ART) | `.open`, `aria-expanded` | Card-acordeão; chevron gira 90° |

## 8. Dados e indicadores

| ID | Tipo canônico | Papel | Implementações atuais | Observações |
|---|---|---|---|---|
| EL-51 | **rating** | Avaliação 0–5 em estrelas SVG | `.star-rating-container` > `svg.star-icon.active` / `.inactive` (SOB) | Componente `StarRating.astro` |
| EL-52 | **data-row** | Linha ícone + rótulo + indicador à direita | `.skill-row` (SOB), `.skill-group-summary` (SOB, mesma anatomia) | |
| EL-53 | **legend** | Lista de legenda de símbolos | `.legend-item` > `.legend-stars` (SOB) | Usa estrelas em texto (★☆), não o EL-51 |

## 9. Decoração e separadores

| ID | Tipo canônico | Papel | Implementações atuais | Observações |
|---|---|---|---|---|
| EL-54 | **divider** | Linha separadora | `.rule` (ART, gradiente); bordas inferiores em `.division-title` (SOB), `.page-header` (DEM), `footer` border-top (ART) | Só ART tem elemento dedicado |
| EL-55 | **contrast-strip** | Faixa translúcida sobre imagem para legibilidade | `.identity-contrast-strip` (SPA) | |
| EL-56 | **page-background** | Fundo gradiente da página | aplicado no EL-05 de cada página | 5 gradientes diferentes (ver §11) |

---

## 10. Estados e comportamentos transversais

| Estado | Classe / atributo | Onde |
|---|---|---|
| Ativo (seleção única) | `.active` | `.nav-item` (SPA), `.selection-button` (POR) |
| Atual | `.current`, `aria-current="page"` | `.breadcrumb-item` (SPA), `.nav-item` (SPA) |
| Aberto | `.open` + `aria-expanded` | `.topic-group`, `.subgroup` (ART) |
| Aberto (nativo) | `[open]` | `.skill-group-details`, `.legend-details` (SOB) |
| Selecionado | `.selected` | `.leaf` (ART) |
| Variante hard/soft | `.hard`/`.soft`, `-HS`/`-SS`, `.hard-skill-card`/`.soft-skill-card` | HIS, POR, SOB |
| Hover — elevação | `translateY(-2…-4px)` + sombra | `.formacao-card`, `.project-card`, `.contact-card` |
| Hover — deslocamento lateral | `translateX(2…3px)` | `.nav-item` (desktop), `.leaf` |
| Foco visível | `:focus-visible` outline 2px ciano | `.selection-button` (POR, `#22D3EE`), `.group-toggle`/`.subgroup-toggle`/`.leaf` (ART, `#00e5ff`) — demais interativos sem regra própria |
| Animação de entrada | `@keyframes fadeIn` (4px, R-08) | SOB, HIS, FOR, 404, DEM |
| Truncamento | `line-clamp: 3` / `text-overflow: ellipsis` | `.project-resume` (POR), `.tech-name` (SOB) |

## 11. Fundamentos de estilo em uso (insumo para tokens)

**Escala (já unificada):** `pages/spa/assets/css/scale.css` — `--fs-sm … --fs-hero`, `--space-xs … --space-2xl`, `--icon-xs … --icon-lg`, `--logo-h`, `--container-max`, `--sidebar-width`, `--nav-item-height`, `--profile-photo-size`, `--portfolio-header-h`. Consumida por todas as páginas principais; **não** por 404 e DEM (px fixos).

**Cores:** existem tokens em `spa-layout.css` (`--color-bg-primary`, `--color-border-cyan`, `--color-active-bg`, `--color-text-light` …), mas **só o shell os usa**. As páginas usam hex literais. Cores recorrentes:

| Cor | Uso recorrente | Páginas |
|---|---|---|
| `#0381B0` | borda de card/painel/badge | SOB, HIS, FOR, POR |
| `#FFFFFF` / `#000000` | texto em fundos escuros / claros | todas |
| `#16222A → #3A6073` | gradiente de fundo de página | SOB, HIS, FOR |
| `#FFEFBA → #FFFFFF` | gradiente de card "creme" | SOB (`.skill-card`), POR (`.project-card`); FOR usa `#FFF8D6` |
| `#DAEBF2 → #A8CCD9` | gradiente azul claro | HIS (`.tech-stack-block`), POR (fundo) |
| `#386312` / `#2D4A22` | verde de texto/estrela | SOB, POR |
| `#69C4CE` | ciano do shell | SPA, 404, DEM |
| `#00e5ff`, `#22D3EE`, `#19c6e6`, `#8eddeb` | 4 cianos de destaque distintos | ART, POR, CON |

**Famílias tipográficas (5):** Barlow Condensed (shell, SOB, HIS, FOR, POR, CON), Consolas/Courier New monospace (SOB, HIS, FOR), Inter (POR, CON), Oswald + Roboto Condensed (só ART). Inter é importada apenas em `portfolio.css`, mas usada também em `contatos.css`.

**Raios de borda:** 0.375rem, 0.5rem, 0.625rem, 0.75rem, 0.8125rem, 0.875rem, 1rem, 1.125rem, 1.25rem, 999em — sem token.

## 12. Inconsistências e conflitos encontrados

Status em 2026-11-18. ✅ = resolvido (ver regras §0); ⏸ = adiado; ⬜ = em aberto.

1. ✅ **Colisão de classe `.category-title`** → R-07 (`.category-card-title` em SOB, `.category-section-title` em POR).
2. ✅ **`.page-title` definido 3 vezes / global em HIS** → R-01, R-02 (uma definição escopada por página).
3. ✅ **`@keyframes fadeIn` com valores diferentes** → R-08 (4px em todas; HIS passou a defini-la).
4. ✅ (parcial) **Mesmo conceito, nomes diferentes** → R-04, R-05, R-06. ⬜ Ainda em aberto: skill-tag (`.tech-shield.hard` × `.hability-tag-HS`) e sufixos de page-root (`-page` × `-page-wrapper` × `contacts-`).
5. ✅ **Nível de heading do título de página** → R-02 (h1 em todas; SOB ganhou título "Sobre"). Obs.: o shell também tem `<h1 class="profile-name">`, então cada tela tem 2 `h1`.
6. ✅ **`#page-content` de CON sem `.page-content-wrapper`** → R-03.
7. ⏸ **Princípio VI (escala)** — `default.astro`, `subpagina-demo.astro` e o fallback inline em `router.js` continuam em px fixos (R-10).
8. **CSS órfão** — `.tech-icon` (SOB) e `.icon-wrap svg` (CON; o markup usa `<img>`).
9. **Tokens de cor do shell não consumidos** pelas páginas; 4 tons de ciano de destaque diferentes.
10. **Convenção de nomes nas specs** — só a spec-05 declara explicitamente nomes lógicos em snake_case mapeados para classes kebab-case (`selection_button` → `.selection-button`). Vale adotar essa regra no catálogo inteiro. (`.filter-pill`, citada como exemplo no CLAUDE.md, não existe no código.)
