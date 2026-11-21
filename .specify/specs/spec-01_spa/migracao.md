# Registro de Migração — Moldura da SPA (spec-01)

> Plano: [plano-migracao.md](../../catalog/plano-migracao.md) · Branch: `feat/padronizacao_pagina_SPA` ·
> Status: **Concluída e aprovada (2026-11-20)**

A spec-01 não descreve uma página de conteúdo, e sim a **moldura** que fica fixa em volta de todas elas:
layout, sidebar (identidade + menu), régua de breadcrumbs, área de conteúdo e roteador. Por isso o
mapeamento abaixo trata riscos que as páginas não tinham (CSS sempre carregado, JS de navegação,
dependência das seis páginas já migradas).

## 1. Linha de base (Etapa 1) — 2026-11-20

Medido em `/` (página Sobre carregada). Retângulos `x,y,largura,altura`.

| Largura | sidebar | identidade | foto | nome · cargo | menu | itens (1º · último) | breadcrumbs | área de conteúdo |
|---|---|---|---|---|---|---|---|---|
| 375  | 0,0,375,139 (topo) | 0,0,375,77 | 13,9,56,56 | 89,14,205,24 · 89,41,205,20 | 0,77,375,60 (faixa com rolagem) | 12,85,89,44 · 569,85,108,44 | 0,139,375,38 | 0,177,375,635 |
| 1024 | 0,0,240,800 (lateral) | 0,0,238,225 | 55,17,128,128 | 8,160,222,26 · 8,189,222,22 | 0,225,238,575 | 8,243,221,44 · 8,533,221,44 | 240,0,784,42 | 240,42,784,758 |
| 1440 | 0,0,270,900 (lateral) | 0,0,268,230 | 70,18,128,128 | 9,162,250,28 · 9,192,250,23 | 0,230,268,670 | 9,250,249,44 · 9,542,249,44 | 270,0,1170,44 | 270,44,1170,856 |

Sem rolagem horizontal da página nas três larguras. Item ativo inicial: "Sobre"; breadcrumb inicial: "Início".

### Comportamentos (testados)
- Clique no menu (375px, "Contatos"): item ativo + `aria-current="page"`, a faixa rola sozinha até deixar
  o item ativo visível (`scrollLeft` 315), breadcrumb "Início / Meus Contatos".
- Subpágina (capa do projeto CLA): breadcrumb "Início › Portfólio › Projetos › AES1 › Customer Lifecycle
  Analytics (CLA)" com os níveis anteriores clicáveis; menu mantém "Portfólio" ativo.
- Voltar/Avançar do navegador: conteúdo e item ativo restaurados (`/spa/portfolio/` ↔ `/spa/contatos/`).
- Breadcrumb pai ("Portfólio") e "Início" navegam pela SPA (`/spa/portfolio`, `/spa` → Sobre).
- Rota inexistente (`/spa/nao-existe`): página de fallback (`data-page-id="default"`), breadcrumb
  "Início / Página não encontrada".

## 2. Inventário (Etapa 2)

### 2.1 Árvore atual (`pages/spa/spa.astro`, usado por `pages/index.astro`)

```
html > body
  div#spa-layout.spa-layout                         (coluna < 1024; linha ≥ 1024)
    aside#sidebar.sidebar                           (topo < 1024; lateral ≥ 1024)
      header#identity-header.identity-header        (fundo profile-bg.png)
        div.profile-photo-wrapper > img.profile-photo   (moldura em gradiente)
        div.identity-contrast-strip > h1.profile-name + p.profile-role
      nav#sidebar-nav.sidebar-nav-container         (fundo menu-bg.png; faixa horizontal < 1024)
        div.nav-items-wrapper
          a.nav-item[.active][data-menu-id][aria-current] ×6
            span.nav-icon-container > img.nav-icon.icon-light + img.nav-icon.icon-dark
            span.nav-label
    div#main-container.main-container
      nav#breadcrumbs.breadcrumbs-bar > ol#breadcrumbs-list.breadcrumbs-list
        li.breadcrumb-item[.current] > (a.breadcrumb-link | span.breadcrumb-current-text) + span.breadcrumb-separator
      section#page-content-host.page-content-host   (área com rolagem; recebe o #page-content das páginas)
```

CSS: `spa-layout.css` (reset global `*`, `html/body`, tokens próprios `--color-*`, import da Barlow
Condensed), `sidebar.css`, `breadcrumbs.css`, `main-container.css`. ~32 cores fixas no CSS.

### 2.2 Ganchos de JS e dependências
- `router.js`: `#page-content-host` (alvo e área de rolagem), `#page-content`, `.page-header` (folga de âncoras).
- `nav.js`: `.nav-item`, `data-menu-id`, classe `.active`, `aria-current`, `.sidebar-nav-container` (rolagem da faixa).
- `breadcrumbs.js`: `#breadcrumbs-list`; gera `li.breadcrumb-item[.current]`, `a.breadcrumb-link`,
  `span.breadcrumb-current-text`, `span.breadcrumb-separator`.
- `portfolio.js` (página já migrada): `#page-content-host` como área de rolagem.
- `main-container.css`: `.page-content-host:has(.page-header)` (Portfólio).

### 2.3 Conteúdo embutido
- Menu: 6 itens (id, rótulo, rota, ícone claro, ícone escuro) no frontmatter de `NavMenu.astro` **e**,
  repetidos e desatualizados, em `nav.js` (`NAV_ITEMS`: sem "Formação", caminhos de ícone errados;
  usado só pelo `GET()` de compatibilidade).
- Identidade: nome, cargo e foto em `IdentityHeader.astro`.
- Rótulos dos breadcrumbs em `breadcrumbs.js` (`SEGMENT_LABELS`, sem "formacao").

### 2.4 Divergências spec × código
- Medidas em px da spec (sidebar 300px, cabeçalho 275px, foto 160px, itens 50px, nome 30px…) diferem da
  escala fluida atual (ex.: sidebar 270px e foto 128px em 1440).
- A spec cita a Constituição v1.0.0 (hoje v2.0.1).
- `NAV_ITEMS` em `nav.js` e `SEGMENT_LABELS` em `breadcrumbs.js` divergem do menu real (sem Formação).
- `Breadcrumbs.astro` renderiza "Sobre" no HTML inicial; o JS troca por "Início" logo ao carregar.
- A página de fallback (`default.astro`, FR-017) ainda usa px e `<style>` próprio (exceção R-10 do catálogo antigo).

## 3. Mapeamento (Etapa 3)

Nenhum item da moldura equivale a um elemento existente (todos têm função de moldura, que nenhuma
página tem) → todos são **C**. Para não colidir com o catálogo das páginas (o CSS da moldura nunca é
descarregado), os nomes são próprios da moldura.

| Item atual | Cat. | Proposta |
|---|---|---|
| `div#spa-layout.spa-layout` | C | `[app-layout]` — documento em tela cheia; coluna < 1024, linha ≥ 1024 |
| `aside#sidebar.sidebar` | C | `[sidebar]` — topo < 1024, lateral ≥ 1024 |
| `header#identity-header` (foto, nome, cargo) | C | `[identity-card] @dados.identidade` |
| `nav#sidebar-nav` + `a.nav-item` | C | `[nav-menu] *@dados.navegacao` — itens com par de ícones e estado ativo |
| `div#main-container` | C | `[main-area]` — coluna com breadcrumbs + área de conteúdo |
| `nav#breadcrumbs` | C | `[breadcrumbs]` — trilha preenchida pelo JS |
| `section#page-content-host` | C | `[content-host]` — área com rolagem que recebe o `[page-root]` das páginas |
| Reset global e `html/body` | — | nova seção **"Base do documento"** em `estilos.md` (só a moldura usa) |
| Tokens `--color-*` de `spa-layout.css` | — | migrados para `tokens.css` com nomes `--cor-*` |
| Menu, identidade, rótulos | D | `@dados.navegacao`, `@dados.identidade` → `pages/spa/data/navegacao.json` |

### Estrutura resultante (proposta)

```
[app-layout:escuro]
  [sidebar:escuro]
    [identity-card:moldura] @dados.identidade
    [nav-menu:escuro] *@dados.navegacao {rotulo: 'Menu Principal'}
  [main-area:escuro]
    [breadcrumbs:discreto]
    [content-host]                 ← recebe o [page-root] da página da rota atual
```

Os estilos novos reproduzem o visual atual; não há elemento existente reaproveitado, então **não há
diferenças visuais previstas por M-02**.

## 4. Decisões (aprovação 1 — 2026-11-20)
1. **Mapeamento**: **aprovado** (sete elementos novos da moldura, seção "Base do documento", dados em `navegacao.json`).
2. **Ganchos de JS**: **opção (a) aprovada** — manter ids, renomear classes e atualizar o JS.
   - **(a) recomendado** — manter os **ids** atuais (`#page-content-host`, `#breadcrumbs-list`, `#sidebar`…),
     que são o que o roteador e o Portfólio usam, e renomear as **classes** para os nomes dos elementos,
     atualizando `nav.js`, `breadcrumbs.js` e `main-container.css` junto;
   - **(b)** manter também as classes atuais, registradas como exceção ao R-E02.
3. **Fonte única do menu**: **aprovada** — `NavMenu.astro` e `breadcrumbs.js` passam a ler `navegacao.json` (corrige a
   ausência de "Formação"); o `NAV_ITEMS` duplicado de `nav.js` sai.
4. **Página de fallback 404** (`default.astro`): **incluída nesta migração** — (montada com `page-root`,
   `container`, `page-title`, `paragraph` e um link do catálogo, sujeita a M-02) ou deixar para depois.

## 5. Catálogo (Etapa 4)
- `elementos.md`: nova categoria **8. Moldura da SPA** com `app-layout` (EL-26), `sidebar` (EL-27),
  `identity-card` (EL-28), `nav-menu` (EL-29), `main-area` (EL-30), `breadcrumbs` (EL-31), `content-host` (EL-32).
  Estados com `is-ativo` (menu) e `is-atual` (breadcrumbs), conforme R-E06; ids preservados.
- `estilos.md`: seção **1.1 Base do documento** (reset e `html/body`), seção **9. Moldura da SPA** com os estilos
  `escuro`, `moldura`, `discreto` e `padrao` reproduzindo o visual atual, e 19 tokens novos (cores, gradiente,
  sombras, raios e as imagens de fundo `--imagem-identidade` / `--imagem-menu`).
- `formato-estilos.md`: regra **R-S07** (base do documento só na moldura; nomes da moldura não colidem com os das páginas).
- Nenhum elemento ou estilo das páginas mudou (M-04).

## 6. Spec (Etapa 5)
- `spec.md` reescrita no modelo (seções 1 a 10), sem valores visuais. Seção 4.1 (moldura) e 4.2 (página 404).
- Requisitos de comportamento preservados e organizados: roteador (FR-006), menu (FR-007), breadcrumbs (FR-008),
  ids estáveis (FR-003), fonte única do menu (FR-009).
- `contracts/ui-contracts.md` marcado como substituído; `contracts/router-contract.md` continua válido (o roteador não muda).

### 6.1 Página 404 — diferenças visuais (efeito de M-02)

| Item | Hoje | Depois |
|---|---|---|
| Largura | cartão de até 680px, 60px abaixo do topo | `container:centralizado` (até `--container-max`), respiro do `page-root` |
| Fundo da página | o da área de conteúdo (`#061B2A`) | `page-root:petroleo` |
| Cartão | `#16222A`, borda ciano 2px, cantos 16px, sombra, conteúdo centralizado | `panel:escuro` (gradiente escuro, borda azul 1px, sombra interna), alinhado à esquerda |
| Ícone ⚠️ | grande, separado | dentro do título |
| Título | ciano `#69C4CE`, 32px, `h1` | `header:painel` (branco, `--fs-3xl`, `h2`); a página não tem `page-title` (R: opcional) |
| Mensagem | `#EDF2EE`, 18px, centralizada | `paragraph:claro` (Barlow, branco, justificado) |
| Botão de retorno | pílula escura com borda ciano, hover claro | `link-item:ciano` (pílula com marcador, hover ciano) |

### 6.2 Mudanças de implementação previstas (Etapa 6)
- `spa.css` substitui `spa-layout.css`, `sidebar.css`, `breadcrumbs.css` e `main-container.css`; os tokens
  `--color-*` e o `@import` da Barlow Condensed passam para `tokens.css`.
- Componentes da moldura passam a usar as classes dos elementos (ids mantidos).
- `nav.js`: `.nav-menu-item`, `is-ativo`, `.nav-menu` (faixa); sai o `NAV_ITEMS` duplicado.
- `breadcrumbs.js`: classes `breadcrumbs-*` e `is-atual`; rótulos lidos de `navegacao.json`.
- `default.astro`: montado com componentes do catálogo e `default.css`.

**Aguardando aprovação 2** para seguir para a implementação (Etapa 6).

## 7. Aprovação 2 — 2026-11-20
- Spec da moldura e da página 404: **aprovada**.

## 8. Implementação (Etapa 6)
- `pages/spa/data/navegacao.json`: identidade e os 6 itens do menu (fonte única).
- Componentes novos em `pages/spa/components/elementos/`: `AppLayout`, `Sidebar`, `IdentityCard`, `NavMenu`,
  `MainArea`, `Breadcrumbs`, `ContentHost`. Removidos os componentes antigos de `pages/spa/components/`
  (`Sidebar`, `IdentityHeader`, `NavMenu`, `NavItem`, `MainContainer`, `Breadcrumbs`).
- `spa.astro`: moldura montada só com componentes do catálogo; ids mantidos.
- CSS: `spa.css` (base do documento + moldura) substitui `spa-layout.css`, `sidebar.css`, `breadcrumbs.css` e
  `main-container.css`; `tokens.css` ganhou os 19 tokens da moldura e passou a carregar também a Barlow Condensed.
  As imagens de fundo (`--imagem-identidade`, `--imagem-menu`) são resolvidas pelo build.
- `nav.js`: `.nav-menu-item` + `is-ativo`, faixa `.nav-menu`; removido o `NAV_ITEMS` duplicado.
- `breadcrumbs.js`: classes `breadcrumbs-*` + `is-atual`; rótulos lidos de `navegacao.json` (inclui "Formação").
- `default.astro` + `default.css`: página 404 montada com `page-root`, `container`, `panel`, `vertical-list`,
  `paragraph` e `link-item`.

## 9. Validação (Etapa 7) — 2026-11-20
- `npm run build`: sem erros nem avisos. Console: sem erros.
- **Moldura idêntica à linha de base** nas três larguras: todos os retângulos da tabela do §1 (sidebar,
  identidade, foto, nome, cargo, menu, 6 itens, breadcrumbs, área de conteúdo) batem pixel a pixel; mesmas
  cores (fundo `#061B2A`, item ativo `#B3CBDB`), 6 ícones visíveis (claro/escuro conforme o estado).
- Comportamentos (todos iguais à linha de base):
  - menu no celular: "Contatos" ativo com `aria-current`, faixa rola até ele (`scrollLeft` 315) e o mantém visível;
  - subpágina CLA: trilha "Início › Portfólio › Projetos › AES1 › Customer Lifecycle Analytics (CLA)", "Portfólio" ativo;
  - Voltar/Avançar: conteúdo e item ativo restaurados;
  - breadcrumb pai e "Início" navegam pela SPA; "Início" → Sobre;
  - rota inexistente: página 404 nova, trilha "Início / Página não encontrada"; o link de retorno leva à Sobre.
- Navegação completa pelas 6 páginas: página certa, breadcrumb com o título da página, item ativo correto,
  grids das páginas inalterados (Sobre 3/2, Formação 2/3/3, Portfólio 2/2, Artigos 2, Contatos 2) e
  `padding-top` do host zerado só na Portfólio (cabeçalho fixo).
- Página 404: diferenças visuais do §6.1 aplicadas (painel escuro à esquerda, título branco em `h2`, link em pílula).

## 10. Fechamento (Etapa 8)
- `plano-migracao.md` e CLAUDE.md atualizados com a moldura convertida.
- Commit/PR: não feitos.
- **Migração aprovada pelo responsável em 2026-11-20.**
