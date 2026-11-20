# Registro de Migração — Página Formação (spec-04)

> Plano: [plano-migracao.md](../../catalog/plano-migracao.md) · Status: **Concluída e aprovada (2026-11-20)**

## 1. Linha de base (Etapa 1) — 2026-11-20

Medido no shell da SPA (`/` → clique em "Formação"), animações finalizadas. Retângulos `x,y,largura,altura`.

| Largura | `#page-content` | `h1` | `h2` (Acadêmica · Idiomas · Treinamentos) |
|---|---|---|---|
| 375  | 20,197,327,975 | 36,213,295,29 | 36,254,295,25 · 36,632,295,25 · 36,938,295,25 |
| 1024 | 264,66,728,800 | 282,84,692,31 | 282,129,692,28 · 282,378,692,28 · 282,578,692,28 |
| 1440 | 301,75,1100,805 | 321,95,1061,34 | 321,143,1061,29 · 321,384,1061,29 · 321,597,1061,29 |

Cards (Acadêmica ×2 · Idiomas ×2 · Treinamentos ×1):

| Largura | Cards |
|---|---|
| 375  | 36,289,295,148 · 36,449,295,167 · 36,667,295,121 · 36,801,295,121 · 36,973,295,167 |
| 1024 | 282,169,339,191 · 635,169,339,191 · 282,418,221,142 · 517,418,221,142 · 282,618,221,212 |
| 1440 | 321,185,523,180 · 858,185,523,180 · 321,425,344,152 · 679,425,344,152 · 321,638,344,203 |

Colunas: Acadêmica 1 → 2 @768; Idiomas e Treinamentos 1 → 2 @768 → 3 @1024. Sem rolagem horizontal.
Breadcrumb: "Formação". Comportamento: hover do card sobe 2px e aumenta a sombra. Sem JS próprio.

## 2. Inventário (Etapa 2)

### 2.1 Árvore atual (as duas cópias têm o mesmo corpo)

```
div#page-content.page-content-wrapper.formacao-page   data-page-id="formacao" data-page-title="Formação"
  div.panel-container                                (largura máx. --container-max, centralizado)
    h1.page-title 'Formação'
    section.section-group ×3                         ('Acadêmica', 'Idiomas', 'Treinamentos')
      h2.section-title
      div.cards-grid.cards-grid-<secao>
        div.formacao-card ×N                         (conteúdo centralizado, sombra, hover)
          div.company-logo-container > img.company-logo
          h3.course-title
          span.badge                                 (opcional — Idiomas não tem)
```

### 2.2 Ganchos de JS
Nenhum JS próprio. O roteador usa só `#page-content`, `data-page-id` e `data-page-title`.

### 2.3 Conteúdo embutido
Os 5 cards (logo, texto alternativo, título do curso, badge opcional) estão escritos direto no markup.

### 2.4 Divergências spec × código (o código é a referência)
- A spec se contradiz na cor do título (`#000000` no FR-005 e na US1; `#ffffff` na US2); o código usa branco.
- A spec fala em `.main-container` com padding de 20px; o contêiner real é `#page-content` (`.formacao-page`) dentro de `#page-content-host`.
- FR-007 descreve "stack vertical" e um `.cards-wrapper` que não existe; o código usa grids por seção.
- FR-008 está rotulado como "Idiomas", mas lista os cursos acadêmicos.
- Nomes de arquivo na spec (`logo-ingles.png`, `logo-espanhol.png`, `logo-enap.png`) diferem dos reais (`logo_ingles.png`, `logo_espanhol.png`, `logo_enap.png`).
- Tamanhos em px da spec (título 32/26px, curso 24/26px, badge 20/12px, paddings) não batem com a escala fluida do CSS.
- FR-010 cita treinamentos de exemplo que não existem na página.

## 3. Mapeamento (Etapa 3)

| Item atual | Cat. | Proposta | Observação |
|---|---|---|---|
| `div#page-content.formacao-page` | A | `[page-root:petroleo] formacao` | visual idêntico ao atual |
| `div.panel-container` | **C** | **`[container:centralizado]`** — elemento novo | também usado pela Histórico |
| `h1.page-title` | A | `[page-title:claro] 'Formação'` | visual idêntico |
| `section.section-group` + `h2.section-title` | **B** | `[subsection:destaque] '<título>'` | extensão: nível do título pelo contexto (ver §4) |
| `div.cards-grid` | A* | `[grid] {colunas: …}` | *estilo do grid ganha a regra `@1024` (ver §4) |
| `div.formacao-card` | A | `[card:amarelo]` | |
| `h3.course-title` | A | `[header:card] $item.titulo` | título do card (R-E04) |
| `div.company-logo-container > img` | **C** | **`[logo:faixa]`** — elemento novo | também usado pela Histórico |
| `span.badge` | **C** | **`[badge:pilula]`** — elemento novo | também usado pela Histórico |
| Dados dos 5 cards | D | `@dados.academica`, `@dados.idiomas`, `@dados.treinamentos` → `pages/formacao/data/formacao.json` | |

## 4. Mudanças propostas no catálogo

### 4.1 Elementos novos (C)

```
### container (EL-16)
Descrição: Limita a largura do conteúdo da página e o centraliza.
HTML:
  <div class="container {estilo}">{filhos}</div>
Estilos: centralizado (padrão)        → largura 100%, máx. --container-max, margem automática

### logo (EL-17)
Descrição: Faixa que exibe um logotipo centralizado, sem distorção.
HTML:
  <div class="logo {estilo}"><img class="logo-image" src="{src}" alt="{alt}"></div>
Estilos: faixa (padrão)               → largura 100%, altura --logo-h × 0,6, imagem contida e centralizada

### badge (EL-18)
Descrição: Selo curto de texto (período, duração, nível, categoria).
HTML:
  <span class="badge {estilo}">{texto}</span>
Estilos: pilula (padrão)              → visual atual do .badge da Formação (pílula com borda azul,
                                        gradiente branco, fonte monoespaçada em maiúsculas)
Regras: empurrado para o fim do contêiner em coluna (margin-top: auto)
```

### 4.2 Extensões compatíveis (B, M-04)
- **`subsection`**: o nível do título passa a seguir o contexto (R-E03): `h2` quando filho direto do
  `[page-root]`/`[container]`, `h3` dentro de `[panel]`. A Sobre continua com `h3` (sub-seções dentro de painel).
- **`grid`** (estilo): acrescenta a regra `@1024` (`--colunas-1024`), já prevista em R-S05 e nas
  variáveis registradas, mas ainda sem regra CSS. Sem efeito em quem não usa `@1024`.

## 5. Diferenças visuais (efeito de M-02, estilos existentes)

| Item | Hoje | Depois |
|---|---|---|
| Títulos de seção | brancos, sem caixa alta, ~0,875 × `--fs-3xl`, margem inferior `--space-md` | estilo `destaque`: creme `#FFF1C3`, CAIXA ALTA, `--fs-xl`, `letter-spacing`, espaço até o grid `--space-xs` |
| Fundo do card | gradiente `#FFF8D6 → #FFFFFF` | `amarelo`: `#FFEFBA → #FFFFFF` (amarelo um pouco mais forte) |
| Alinhamento do card | conteúdo **centralizado** | conteúdo alinhado à **esquerda** (logo continua centralizado na faixa) |
| Sombra e hover do card | sombra; sobe 2px no hover | sem sombra e sem hover |
| Padding do card | `--space-lg` (≥768: `--space-xl --space-lg`) | `--space-md` |
| Título do curso | preto, sem caixa alta, centralizado | estilo `header:card`: verde `#386312`, CAIXA ALTA, alinhado à esquerda |
| Badge | centralizada | alinhada à esquerda, no fim do card |

## 6. Aprovação 1 — 2026-11-20
- Mapeamento: **aprovado** (elementos novos `container`, `logo`, `badge`; extensões de `subsection` e `grid`).
- Diferenças visuais do §5: **todas aceitas** (sem exceções M-03).

## 7. Catálogo (Etapa 4)
- `elementos.md`:
  - novos: `container` (EL-16, Layout), `badge` (EL-18, Listas e itens), `logo` (EL-17, nova categoria Mídia);
  - `subsection`: título `h{nivel}` (h3 em painel; h2 sob `page-root`/`container`);
  - **ajustes de regra necessários para a composição** (compatíveis com Sobre e Contatos):
    - `page-title`: "primeiro elemento de conteúdo" (filho de `page-root` **ou do `container`**);
    - `header`: "primeiro filho do container; **num `card`, pode vir depois de um `logo`**".
- `estilos.md`:
  - `grid`: regra `@1024` e cadeia de fallback `@1280 → 1024 → 768 → base` (sem efeito em quem não usa `@1024`);
  - novos estilos `container:centralizado`, `badge:pilula`, `logo:faixa`;
  - tokens novos: `--gradiente-badge-claro`, `--sombra-badge`, `--raio-pilula`.

## 8. Spec da página (Etapa 5)
- `spec.md` reescrita no modelo (seções 1 a 10), sem valores visuais; divergências do §2.4 resolvidas.
- Classe da raiz passa a incluir `page-root page-root--petroleo` (mantém `formacao-page`).
- `contracts/ui-contracts.md` marcado como substituído.
- **Aguardando aprovação 2** para seguir para a implementação (Etapa 6).

## 9. Aprovação 2 — 2026-11-20
- Spec da página (com os dois ajustes de regra do §7): **aprovada**.

## 10. Implementação (Etapa 6)
- `pages/formacao/data/formacao.json` (grupos `academica`, `idiomas`, `treinamentos`).
- Componentes novos: `Container.astro`, `Logo.astro`, `Badge.astro`; `Subsection.astro` ganhou `nivel` (padrão 3).
- Páginas: as duas cópias montadas só com componentes do catálogo; raiz com `page-root page-root--petroleo formacao-page`.
- `formacao.css` reescrito a partir de `estilos.md`.
- `tokens.css`: 3 tokens novos.
- `sobre.css` e `contatos.css`: regras do `grid` regeneradas (`@1024` e nova cadeia do `@1280`), sem efeito visual.

## 11. Validação (Etapa 7) — 2026-11-20
- `npm run build`: sem erros nem avisos.
- Colunas (Acadêmica / Idiomas / Treinamentos): 375 → 1/1/1 · 800 → 2/2/2 · 1024 → 2/3/3 · 1440 → 2/3/3 (iguais à linha de base).
- Comparação com a linha de base (`x,y,largura,altura`):

| Largura | `h2` (Acadêmica · Idiomas · Treinamentos) | Cards |
|---|---|---|
| 375  | 36,254 · 36,595 · 36,863 | 36,280,295,134 · 36,426,295,153 · 36,621,295,107 · 36,740,295,107 · 36,889,295,153 |
| 1024 | 282,129 · 282,342 · 282,507 | 282,157,343,167 · 639,157,343,167 · 282,370,224,118 · 520,370,224,118 · 282,535,224,189 |
| 1440 | 321,143 · 321,346 · 321,520 | 321,173,527,154 · 862,173,527,154 · 321,375,347,126 · 682,375,347,126 · 321,550,347,177 |

  Diferenças decorrentes do §5 (aceitas): cards mais baixos (padding `--space-md`), espaço menor
  entre título de seção e grid, títulos de seção e de curso em caixa alta, conteúdo à esquerda,
  sem sombra/hover. Mesmas seções, mesmos cards, mesmos selos, sem rolagem horizontal.
- Títulos: 1 `h1`, 3 `h2` (seções), 5 `h3` (cards). Selos: "2024 a 2026", "2013 a 2016", "2024"; Idiomas sem selo.
- Breadcrumb: "Formação".
- Regressão: Sobre com grids 3/2 a 1440; Contatos com 2 colunas e 4 cartões.
- Colisão de classes: ao navegar Formação → Histórico, o CSS da Formação é descarregado e o `.badge`
  da Histórico mantém o estilo próprio.

## 12. Fechamento (Etapa 8)
- `elementos.md`, `elementos-por-pagina.md` e CLAUDE.md atualizados com a Formação como convertida.
- Commit/PR: não feitos (trabalho segue na branch atual, sem commit).
- **Migração aprovada pelo responsável em 2026-11-20.**
