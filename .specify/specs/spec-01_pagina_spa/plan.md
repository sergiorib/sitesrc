# Implementation Plan: Estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container)

**Branch**: `spec-01_pagina_spa` | **Date**: 2026-10-29 | **Spec**: [.specify/specs/spec-01_pagina_spa/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-01_pagina_spa/spec.md`

## Summary

Implementar a infraestrutura base da Single Page Application (SPA) para o Portfólio de Data Science (`pages/spa/spa.astro`), estruturada com layout fixo em tela cheia (100vw / 100vh). A aplicação é dividida em uma Sidebar fixa de 300px à esquerda — contendo o cabeçalho de identidade profissional (275px) e a área de navegação com 6 itens de menu — e o Main Container flexível à direita, que atua como alvo exclusivo de injeção de conteúdo (*Single Content Target*).

A transição entre páginas é orquestrada por um roteador em Vanilla JavaScript (`pages/spa/assets/js/router.js`) operando por delegação global de eventos, requisições assíncronas via `fetch()`, manipulação do histórico nativo com a `History API` (`pushState` e `popstate`), descoberta dinâmica de subpáginas em cascata e carregamento gracioso de fallback para rotas inexistentes (`pages/spa/default.astro`). A navegação conta com suporte a uma régua de Breadcrumbs em linha única, discreta e dinâmica. Todo o código CSS e JS é rigorosamente isolado em `pages/spa/assets/css/` e `pages/spa/assets/js/`, em estrito cumprimento da Constituição v1.0.0.

---

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS, ECMAScript 2022+ (Vanilla JS puro).  
**Primary Dependencies**: Astro (apenas para estruturação de componentes, layouts e compilação SSG). Zero dependências de runtime de terceiros (sem Tailwind, Bootstrap, CSS-in-JS, React, Vue ou Svelte).  
**Storage**: N/A (Estado de navegação mantido em memória e sincronizado via `window.history.pushState`).  
**Testing**: Cenários de validação end-to-end descritos no [quickstart.md](./quickstart.md), testes de responsividade em viewport 100vw/100vh e testes de transição de rota assíncrona.  
**Target Platform**: Navegadores Web Modernos (Evergreen Browsers: Chrome, Firefox, Edge, Safari).  
**Project Type**: Single Page Application (Astro SSG + Vanilla Client-Side Routing).  
**Performance Goals**: Carregamento inicial < 1s; alternância entre seções < 300ms; zero recarregamento total de página (*zero full page reload*); zero layout shift perceptual na Sidebar.  
**Constraints**: Visual Dark Tech Dashboard com paleta `#061B2A`, `#16222A`, `#69C4CE`, `#3893BA`, `#25797F`, `#B3CBDB`, `#EDF2EE`; tipografia Barlow Condensed 600; isolamento total de assets por página.  
**Scale/Scope**: 1 página mestre (`spa.astro`), 1 página de fallback (`default.astro`), 5 componentes Astro modulares, 4 arquivos CSS modulares, 3 módulos Vanilla JS, 6 rotas primárias e suporte ilimitado a subpáginas dinâmicas.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro (sem Tailwind/Bootstrap); Vanilla JS puro (sem React/Vue/Svelte) | Apenas Astro `.astro` para markup, CSS vanilla modular e Vanilla JS puro nativo do navegador. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todo o código reside em `pages/spa/`, com assets isolados em `pages/spa/assets/css/`, `pages/spa/assets/js/` e `pages/spa/assets/images/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Cada página define sua arquitetura de design sob Dark Tech Dashboard em CSS puro | Paleta e tipografia definidas por variáveis e regras CSS locais dentro de `pages/spa/assets/css/`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `spec-01_pagina_spa` e commits estruturados via git/gh. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação salva em `.specify/specs/spec-01_pagina_spa/` e `.specify/specs/spec-01_pagina_spa.md`. | **PASS** |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (5/5)**. Nenhuma violação ou concessão de complexidade necessária.

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-01_pagina_spa/
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

---

## Complexity Tracking

> *Nenhuma violação constitucional identificada. A arquitetura cumpre integralmente os requisitos com o menor nível de complexidade necessário.*

| Tópico | Abordagem Selecionada | Alternativa Mais Complexa Rejeitada |
|---|---|---|
| Gerenciamento de Rotas | Vanilla JS com `fetch` + `DOMParser` | Framework client-side (React/Vue/Svelte) ou bibliotecas de roteamento de terceiros |
| Estilização | CSS3 Puro com Variáveis CSS locais | Frameworks CSS (Tailwind/Bootstrap) ou CSS-in-JS |
| Transição de Telas | Injeção dinâmica no `#page-content-host` | Iframe encapsulado com overhead de comunicação `postMessage` |
