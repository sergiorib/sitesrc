# Implementation Plan: Estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container)

**Branch**: `spec-01_spa` | **Date**: 2026-10-29 (Updated: 2026-11-17) | **Spec**: [.specify/specs/spec-01_spa/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-01_spa/spec.md`

## Summary

Implementar a infraestrutura base da Single Page Application (SPA) para o Portfólio de Data Science (`pages/spa/spa.astro`), estruturada com layout fixo em tela cheia (100vw / 100vh). A aplicação é dividida em uma Sidebar fixa de 300px à esquerda — contendo o cabeçalho de identidade profissional (275px) e a área de navegação com 6 itens de menu — e o Main Container flexível à direita, que atua como alvo exclusivo de injeção de conteúdo (*Single Content Target*).

A transição entre páginas é orquestrada por um roteador em Vanilla JavaScript (`pages/spa/assets/js/router.js`) operando por delegação global de eventos, requisições assíncronas via `fetch()`, manipulação do histórico nativo com a `History API` (`pushState` e `popstate`), descoberta dinâmica de subpáginas em cascata e carregamento gracioso de fallback para rotas inexistentes (`pages/spa/default.astro`). A navegação conta com suporte a uma régua de Breadcrumbs em linha única, discreta e dinâmica. Todo o código CSS e JS é rigorosamente isolado em `pages/spa/assets/css/` e `pages/spa/assets/js/`, em estrito cumprimento da Constituição v1.1.0.

O dimensionamento de toda a aplicação (layout base e as 6 páginas injetadas) é fluido e centralizado em um único arquivo global de escala, `pages/spa/assets/css/scale.css`, que define em `:root` os tokens de tipografia (`--fs-sm` a `--fs-hero`), espaçamento (`--space-xs` a `--space-2xl`) e contêiner (`--container-max`) com `clamp()`, calibrados para ~1280px (mínimo) e ~1920px (máximo) de largura efetiva, com base em `rem` para respeitar o tamanho de fonte do navegador (Constituição, Princípio VI; spec FR-019 a FR-021 e SC-007/SC-008). Detalhes na seção **Dimensionamento Fluido**.

---

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS, ECMAScript 2022+ (Vanilla JS puro).  
**Primary Dependencies**: Astro (apenas para estruturação de componentes, layouts e compilação SSG). Zero dependências de runtime de terceiros (sem Tailwind, Bootstrap, CSS-in-JS, React, Vue ou Svelte).  
**Storage**: N/A (Estado de navegação mantido em memória e sincronizado via `window.history.pushState`).  
**Testing**: Cenários de validação end-to-end descritos no [quickstart.md](./quickstart.md), testes de responsividade em viewport 100vw/100vh e testes de transição de rota assíncrona. Validação de dimensionamento via DevTools em modo responsivo nas larguras 375, 768, 1280, 1366, 1536 e 1920px, mais teste com fonte padrão do navegador ampliada (ver **Dimensionamento Fluido → Validação**).  
**Target Platform**: Navegadores Web Modernos (Evergreen Browsers: Chrome, Firefox, Edge, Safari).  
**Project Type**: Single Page Application (Astro SSG + Vanilla Client-Side Routing).  
**Performance Goals**: Carregamento inicial < 1s; alternância entre seções < 300ms; zero recarregamento total de página (*zero full page reload*); zero layout shift perceptual na Sidebar.  
**Constraints**: Visual Dark Tech Dashboard com paleta `#061B2A`, `#16222A`, `#69C4CE`, `#3893BA`, `#25797F`, `#B3CBDB`, `#EDF2EE`; tipografia Barlow Condensed 600; isolamento total de assets por página; dimensionamento fluido via tokens globais `clamp()` em `rem` (sem `px` em fontes/espaçamentos/larguras, sem `html { font-size }` em px, sem `zoom`/`transform: scale()` em `html`/`body`); breakpoints mobile-first 480/768/1024/1280/1536/1920px.  
**Scale/Scope**: 1 página mestre (`spa.astro`), 1 página de fallback (`default.astro`), 5 componentes Astro modulares, 5 arquivos CSS modulares (incluindo `scale.css`), 3 módulos Vanilla JS, 6 rotas primárias e suporte ilimitado a subpáginas dinâmicas. A migração para os tokens de escala abrange também as 6 folhas de estilo das páginas (`sobre`, `historico`, `formacao`, `portfolio`, `artigos`, `contatos`).

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro (sem Tailwind/Bootstrap); Vanilla JS puro (sem React/Vue/Svelte) | Apenas Astro `.astro` para markup, CSS vanilla modular e Vanilla JS puro nativo do navegador. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todo o código reside em `pages/spa/`, com assets isolados em `pages/spa/assets/css/`, `pages/spa/assets/js/` e `pages/spa/assets/images/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Cada página define sua arquitetura de design sob Dark Tech Dashboard em CSS puro | Paleta e tipografia definidas por variáveis e regras CSS locais dentro de `pages/spa/assets/css/`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `spec-01_spa` e commits estruturados via git/gh. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação salva em `.specify/specs/spec-01_spa/` e `.specify/specs/spec-01_spa.md`. | **PASS** |
| **VI. Apresentação Responsiva e Fluida** | Tamanhos fluidos com mínimo e máximo; sem tamanhos fixos globais nem `zoom`/`scale`; escala centralizada em um único ponto; adesão de todas as páginas; respeito à fonte do navegador | Tokens `clamp()` em `rem` num único `scale.css` em `:root`; todas as folhas de estilo consomem os tokens; `html` sem `font-size` em px; proibição de `zoom`/`scale` em `html`/`body`. | **PASS** (após a migração descrita em **Dimensionamento Fluido**) |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (6/6)**. Nenhuma violação ou concessão de complexidade necessária. O gate VI só é atendido de fato quando a migração das 10 folhas de estilo estiver concluída; até lá o código atual está **em não conformidade** (≈400 valores em `px` e breakpoints `max-width`).

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-01_spa/
├── spec.md              # Especificação funcional completa
├── plan.md              # Este plano de arquitetura técnica
├── research.md          # Decisões arquiteturais fundamentadas (Fase 0)
├── data-model.md        # Modelo de dados e entidades de estado (Fase 1)
├── quickstart.md        # Roteiro de validação end-to-end (Fase 1)
├── contracts/           # Contratos formais da arquitetura (Fase 1)
│   ├── router-contract.md
│   └── ui-contracts.md
├── checklists/          # Checklist de qualidade de requisitos
│   └── requirements.md
└── tasks.md             # Backlog executável de tarefas (Fase 2 - gerado via /speckit.tasks)
```

### Source Code (repository root)

```text
pages/
└── spa/
    ├── spa.astro                     # Layout mestre SPA (100vw / 100vh)
    ├── default.astro                 # Página de fallback "Página não encontrada" (404)
    ├── components/                   # Componentes modulares Astro
    │   ├── IdentityHeader.astro      # Cabeçalho da Sidebar (275px de altura)
    │   ├── NavMenu.astro             # Contêiner dos botões de navegação
    │   ├── NavItem.astro             # Item de menu individual (50px, border-radius: 20px)
    │   ├── Breadcrumbs.astro         # Régua de navegação hierárquica em linha única
    │   └── MainContainer.astro       # Área de Conteúdo Principal (Single Target)
    └── assets/
        ├── css/                      # Folhas de estilo em CSS3 puro isoladas
        │   ├── scale.css             # [NOVO] Fonte única de escala: tokens fluidos (tipografia, espaçamento, contêiner, layout)
        │   ├── spa-layout.css        # Grid/Flexbox base 100vw x 100vh
        │   ├── sidebar.css           # Estilos da Sidebar, identidade e menu ativo/inativo
        │   ├── breadcrumbs.css       # Estilos da régua horizontal discreta
        │   └── main-container.css    # Área de injeção e scroll dedicado
        ├── js/                       # Scripts em Vanilla JS puro isolados
        │   ├── router.js             # Roteador SPA (delegação global, fetch, History API, fallback)
        │   ├── breadcrumbs.js        # Utilitário de formatação e atualização da trilha
        │   └── nav.js                # Alternância visual de estados e ícones claro/escuro
        └── images/                   # Mídias e ícones da página SPA
            ├── profile-bg.png        # Fundo do cabeçalho de identidade
            ├── profile-photo.png     # Foto circular do profissional (160px)
            ├── menu-bg.png           # Fundo da área de navegação
            ├── icone-sobre-claro.png
            ├── icone-sobre-escuro.png
            ├── icone-historico-claro.png
            ├── icone-historico-escuro.png
            ├── icone-formacao-claro.png
            ├── icone-formacao-escuro.png
            ├── icone-portfolio-claro.png
            ├── icone-portfolio-escuro.png
            ├── icone-artigos-claro.png
            ├── icone-artigos-escuro.png
            ├── icone-contatos-claro.png
            └── icone-contatos-escuro.png
```

**Structure Decision**:
A estrutura modular adotada isola estritamente todas as partes da SPA sob `pages/spa/`. A decomposição separa claramente:
1. **Marcação Estática (`pages/spa/components/`)**: Componentes Astro que encapsulam apenas estrutura semântica HTML.
2. **Estilização Autônoma (`pages/spa/assets/css/`)**: Folhas de estilo temáticas modulares sem dependência de pré-processadores ou frameworks utilitários.
3. **Interatividade e Roteamento (`pages/spa/assets/js/`)**: Módulos Vanilla JavaScript focados em desempenho e desacoplamento, controlando o roteador SPA dinâmico e o suporte à History API.
4. **Escala Global (`pages/spa/assets/css/scale.css`)**: Único arquivo compartilhado entre páginas. Fica sob `pages/spa/` porque a SPA é dona do shell (`:root`, `html`, `body`) em que todas as páginas são renderizadas; as páginas apenas *consomem* os tokens, preservando o isolamento de estilos por página (Constituição II).

---

## Dimensionamento Fluido

### 1. Fonte única de escala (`pages/spa/assets/css/scale.css`)

- Define exclusivamente custom properties em `:root`; não contém seletores de componentes.
- Abordagem **mobile-first**: o bloco base de `:root` contém os valores de celular; blocos `@media (min-width: …)` redefinem os tokens nas faixas superiores.
- Todos os limites em `rem` (base = fonte padrão do navegador, normalmente 16px), para que a ampliação de fonte do navegador escale todo o site (spec FR-021). A parcela preferida usa `vw`.
- **Fórmula de calibração** (faixa ≥ 1280px): para um token com mínimo `a rem` em 1280px e máximo `b rem` em 1920px:
  `clamp(a rem, (a − 2(b − a)) rem + 2.5(b − a) vw, b rem)`.
  Ex.: `a = 1.625`, `b = 2` → `clamp(1.625rem, 0.875rem + 0.9375vw, 2rem)`.
- **Calibração dos máximos**: os tamanhos em px hoje descritos nas specs (referência desktop, spec FR-020) passam a ser os **máximos em 1920px**; os mínimos em 1280px ficam ≈ 80–85% deles.

#### Tokens de tipografia

| Token | Uso típico (referência atual) | < 768px | 768–1279px | 1280px → 1920px |
|---|---|---|---|---|
| `--fs-sm` | tags, rodapés, legendas (12–14px) | 0.75rem | 0.75rem | 0.75rem → 0.875rem |
| `--fs-base` | texto corrido, itens de lista (14–15px) | 0.875rem | 0.875rem | 0.875rem → 1rem |
| `--fs-md` | nomes de projeto, grupos (17–18px) | 0.9375rem | 1rem | 1rem → 1.125rem |
| `--fs-lg` | biografia, descrições, badges (20–22px) | 1rem | 1.125rem | 1.125rem → 1.375rem |
| `--fs-xl` | subtítulos de seção (24px) | 1.125rem | 1.25rem | 1.25rem → 1.5rem |
| `--fs-2xl` | cargos, nome na sidebar (28–30px) | 1.375rem | 1.5rem | 1.5rem → 1.875rem |
| `--fs-3xl` | títulos de página (32px) | 1.5rem | 1.625rem | 1.625rem → 2rem |
| `--fs-hero` | títulos de destaque (36–40px) | 1.75rem | 1.875rem | 1.875rem → 2.5rem |

#### Tokens de espaçamento

| Token | Referência atual | < 768px | 768–1279px | 1280px → 1920px |
|---|---|---|---|---|
| `--space-xs` | 4–6px | 0.25rem | 0.25rem | 0.25rem → 0.375rem |
| `--space-sm` | 8–10px | 0.5rem | 0.5rem | 0.5rem → 0.625rem |
| `--space-md` | 12–14px | 0.625rem | 0.75rem | 0.75rem → 0.875rem |
| `--space-lg` | 16px | 0.75rem | 0.875rem | 0.875rem → 1rem |
| `--space-xl` | 20–24px | 1rem | 1.125rem | 1.125rem → 1.5rem |
| `--space-2xl` | 28–40px | 1.25rem | 1.5rem | 1.75rem → 2.5rem |

#### Tokens de contêiner e layout

| Token | Valor |
|---|---|
| `--container-max` | `min(1200px, 92vw)` (valor de layout; o px aqui é limite de largura, não tamanho fixo) |
| `--sidebar-width` | referência 300px: `clamp(15rem, 18.75vw, 18.75rem)` a partir de 1024px |
| `--identity-header-height` | referência 275px: `clamp(13.75rem, 14.3vw, 17.1875rem)` |
| `--profile-photo-size` | referência 160px: `clamp(8rem, 8.33vw, 10rem)` |
| `--nav-item-height` | referência 50px: `clamp(2.75rem, 2.6vw, 3.125rem)` |
| `--portfolio-header-h` | altura medida do cabeçalho do portfólio, publicada por `portfolio.js`; valor inicial `9.375rem` até a primeira medição |

#### Tokens de ícones e logos

| Token | Uso (referência atual) | < 768px | 768–1279px | 1280px → 1920px |
|---|---|---|---|---|
| `--icon-xs` | estrelas de avaliação (13px) | 0.75rem | 0.75rem | 0.75rem → 0.8125rem |
| `--icon-sm` | ícones de tecnologia em `sobre` (18px) | 1rem | 1rem | 1rem → 1.125rem |
| `--icon-md` | ícones do menu (24px), SVG dos contatos (23px) | 1.25rem | 1.25rem | 1.25rem → 1.5rem |
| `--icon-lg` | contêiner de ícone dos contatos (48px; 42px no celular estreito) | 2.625rem | 2.75rem | 2.75rem → 3rem |
| `--logo-h` | logos das empresas no histórico (100px; 80px no celular) | 5rem | 5.25rem | 5.5rem → 6.25rem |

Ícones tipográficos (glifos como `▥`, `›`, `•`) continuam usando tokens `--fs-*`, pois são texto.

Os tokens de layout já existentes em `spa-layout.css` (`--sidebar-width`, `--identity-header-height`) **migram** para `scale.css` (único ponto de escala); os tokens de cor permanecem em `spa-layout.css`.

### 2. Regras de consumo (todas as folhas de estilo)

1. `font-size`, `padding`, `margin`, `gap` e larguras/alturas de componentes DEVEM usar os tokens (`var(--fs-*)`, `var(--space-*)`, `var(--container-max)`, tokens de layout). Combinações são permitidas (`calc(var(--space-sm) * 1.5)`).
2. `px` permitido **somente** em bordas finas (espessura de `border` e `outline`, `1px`/`2px`) e sombras (`box-shadow`, `text-shadow`). `border-radius` usa `rem`. Os breakpoints das media queries seguem a convenção em px da seção 3 (são limites de viewport, não tamanhos de elemento; CSS não aceita `var()` em media queries).
3. `html` e `body` **não** recebem `font-size` em px (a raiz herda a preferência do navegador). `html, body { width: 100vw }` passa a `width: 100%` para evitar estouro horizontal causado pela barra de rolagem.
4. Proibido `zoom` e `transform: scale()` em `html`/`body` (o `scale(1.02)` de hover em `.project-image-wrap` do portfólio é efeito de componente e permanece).
5. Imagens: regra base em `scale.css` → `img { max-width: 100%; height: auto; }`. Imagens com dimensão definida por token (foto de perfil, ícones) sobrescrevem `height` explicitamente.
6. Valores de cor, gradiente, tipografia (famílias, pesos) e estrutura DOM **não mudam**.

### 3. Breakpoints mobile-first

CSS não aceita `var()` em media queries; os breakpoints são uma **convenção** documentada no topo de `scale.css`:

| Faixa | Media query | Uso |
|---|---|---|
| Celular pequeno | base (sem query) | layout em 1 coluna, sidebar compacta |
| Celular | `(min-width: 480px)` | |
| Tablet | `(min-width: 768px)` | grades de 2 colunas |
| Desktop pequeno | `(min-width: 1024px)` | sidebar lateral, grades completas |
| Desktop | `(min-width: 1280px)` | início da calibração dos tokens |
| Desktop largo | `(min-width: 1536px)` | |
| Full HD+ | `(min-width: 1920px)` | tokens no máximo |

**Mapeamento dos breakpoints atuais** (hoje `max-width`, convertidos para `min-width`):

| Arquivo | Atual | Proposto | Efeito de comportamento |
|---|---|---|---|
| `sobre.css` | `max-width: 1200px`, `767px` | `min-width: 768px`, `1280px` | 4 colunas de Hard-Skills passam a começar em 1280px (hoje 1201px) |
| `historico.css` | `767px`, `768–1023px` | `768px`, `1024px` | sem mudança perceptível |
| `formacao.css` | `767px`, `768–1023px` | `768px`, `1024px` | sem mudança perceptível |
| `portfolio.css` | `767px`, `768–1023px` | `768px`, `1024px` | sem mudança perceptível |
| `artigos.css` | `850px`, `540px` | `1024px`, `480px` | 2 colunas a partir de 1024px (hoje 851px); rodapé empilha abaixo de 480px (hoje 540px) |
| `contatos.css` | `719px`, `379px` | `768px`, `480px` | 2 colunas a partir de 768px (hoje 720px); ícone reduzido abaixo de 480px (hoje 380px) |

### 4. Arquivos a criar / modificar

| Arquivo | Ação |
|---|---|
| `pages/spa/assets/css/scale.css` | **Criar**: tokens, convenção de breakpoints, regra base de `img`. |
| `pages/spa/spa.astro` | Importar `./assets/css/scale.css` **antes** de `spa-layout.css` no frontmatter. |
| `pages/spa/{sobre,historico,formacao,portfolio,artigos,contatos}.astro` | Importar `./assets/css/scale.css` no frontmatter (garante tokens quando o fragmento é aberto isoladamente; no bundle da SPA o Vite deduplica o módulo). |
| `pages/spa/assets/css/spa-layout.css` | Remover tokens de layout (migrados), trocar `100vw` por `100%` em `html, body`. |
| `pages/spa/assets/css/sidebar.css` (48 px) | Migrar fontes (30/25/22px), dimensões da foto, altura dos itens, espaçamentos; layout mobile (ver Pontos de Atenção). |
| `pages/spa/assets/css/breadcrumbs.css` (8 px), `main-container.css` (7 px) | Migrar fontes e paddings. |
| `pages/sobre/assets/css/sobre.css` (73 px) | Migrar + converter breakpoints. |
| `pages/historico/assets/css/historico.css` (53 px) | Migrar + converter breakpoints. |
| `pages/formacao/assets/css/formacao.css` (44 px) | Migrar + converter breakpoints; `max-width: 1200px` → `var(--container-max)`. |
| `pages/portfolio/assets/css/portfolio.css` (60 px) | Migrar + converter breakpoints; revisar `scroll-margin-top: 185px` (ver Pontos de Atenção). |
| `pages/artigos/assets/css/artigos.css` (70 px) | Migrar (incl. `clamp(28px, 3.5vw, 40px)` → `var(--fs-hero)`, `.app max-width` → `var(--container-max)`) + converter breakpoints. |
| `pages/contatos/assets/css/contatos.css` (40 px) | Migrar (paddings `clamp()` locais → tokens) + converter breakpoints. |

Nenhum `.js`, componente `.astro` de conteúdo ou asset de imagem precisa mudar, exceto o ponto do portfólio abaixo.

### 5. Pontos de atenção e dependências

1. **Ordem de carregamento**: `scale.css` precisa estar no bundle antes de qualquer CSS de página; como os fragmentos são injetados após o carregamento do shell, os tokens já existem em `:root`. Toda folha de página depende de `scale.css`.
2. **Sidebar em telas < 1024px** *(definido na spec FR-022)*: abaixo de 1024px, `.spa-layout` passa a `flex-direction: column`; a Sidebar vira cabeçalho compacto (foto em `--profile-photo-size` reduzido, nome e cargo) e `.nav-menu` vira faixa horizontal com `overflow-x: auto` própria, itens com `width: auto` (ícone + rótulo sem quebra, `white-space: nowrap`), altura `--nav-item-height`, `gap: var(--space-sm)` e `scrollIntoView({ inline: 'nearest' })` do item ativo após a navegação (FR-007/FR-022); a partir de 1024px, layout lateral atual. O Main Container mantém a rolagem vertical interna. Afeta `spa-layout.css`, `sidebar.css` e `main-container.css`; `nav.js` ganha apenas a chamada que mantém o item ativo visível na faixa (estados e ícones não mudam).
3. **Portfólio – offset do cabeçalho fixo**: `scroll-margin-top: 185px` e o offset `header.offsetHeight + 35px` (FR-003) assumem altura fixa. Com cabeçalho fluido, `scroll-margin-top` passa a `calc(var(--portfolio-header-h) + 35px)` (mesma folga de 35px definida na spec-05 FR-003), com a variável atualizada por `portfolio.js` a partir de `offsetHeight` (o cálculo JS já é dinâmico; só o CSS muda). O `rootMargin: -160px` do scroll-spy (FR-003.4) também deve derivar da altura medida.
4. **Specs com breakpoints explícitos** *(convergido)*: spec-02 (1280/768), spec-03/04 (768/768–1023), spec-06 (1024/480) e spec-07 (768/480) já citam os breakpoints da convenção mobile-first (tabela da seção 3). A spec-05 já usava 768/1024 e teve o offset do cabeçalho fixo e o `rootMargin` do scroll-spy redefinidos a partir da altura medida.
5. **Calibração dos máximos**: assumido que os px atuais das specs representam o tamanho em 1920px. Se a intenção for que representem 1280px, inverte-se a calibração (tokens crescem ~20% em 1920px).
6. **Feature ativa**: `.specify/feature.json` aponta para `spec-05_portfolio`; este plano foi registrado na spec-01 por ser a dona do shell global. Os planos das demais features recebem apenas a referência a esta seção ao serem migrados.
7. **Fora de escopo**: páginas HTML legadas de projetos (`pages/portfolio/projetos/**`) mantêm seus estilos próprios; a codificação de caracteres ao abrir fragmentos isoladamente (`/spa/sobre/`) não é tratada aqui.

### 6. Validação

1. `npm run build` sem erros após cada folha migrada.
2. Varredura estática: `grep` por `font-size: *[0-9.]+px`, `(padding|margin|gap): [^;]*[0-9]px` e `zoom|scale\(` em `html`/`body` nas folhas migradas deve retornar zero ocorrências (exceto exceções da regra 2).
3. DevTools em modo responsivo, navegador em 100% de zoom, em cada página: **375, 768, 1280, 1366, 1536 e 1920px** — sem rolagem horizontal (`document.documentElement.scrollWidth <= innerWidth`), textos e espaçamentos equilibrados (SC-007/SC-008).
4. Escala do SO: 1920px em 125% ≈ 1536px e em 150% = 1280px efetivos; cobertas pelas larguras acima.
5. Acessibilidade: fonte padrão do navegador em 20px → textos ampliam proporcionalmente, sem sobreposição (FR-021).

---

## Complexity Tracking

> *Nenhuma violação constitucional identificada. A arquitetura cumpre integralmente os requisitos com o menor nível de complexidade necessário.*

| Tópico | Abordagem Selecionada | Alternativa Mais Complexa Rejeitada |
|---|---|---|
| Gerenciamento de Rotas | Vanilla JS com `fetch` + `DOMParser` | Framework client-side (React/Vue/Svelte) ou bibliotecas de roteamento de terceiros |
| Estilização | CSS3 Puro com Variáveis CSS locais | Frameworks CSS (Tailwind/Bootstrap) ou CSS-in-JS |
| Transição de Telas | Injeção dinâmica no `#page-content-host` | Iframe encapsulado com overhead de comunicação `postMessage` |
| Escala Responsiva | Tokens `clamp()` em `rem` num único `scale.css` | `zoom`/`transform: scale()` global, `font-size` raiz em px ajustado por JS, ou pré-processador (Sass) para gerar escalas |
