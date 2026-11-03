# Implementation Plan: Estrutura e Estilização da Página "Sobre mim" (`sobre.astro`)

**Branch**: `spec-02_sobre` | **Date**: 2026-10-29 | **Spec**: [.specify/specs/spec-02_sobre/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-02_sobre/spec.md`

---

## Summary

Implementar a página "Sobre mim" (`pages/sobre/sobre.astro`), estruturada em dois painéis principais verticais ("Sobre mim" e "Habilidades") com efeito encastrado de profundidade e estilização em CSS3 puro. O Painel Superior apresenta a biografia executiva com tipografia monoespaçada justificada. O Painel Inferior organiza os cards de tecnologias em um grid responsivo de 3 colunas em desktop (com transição para 1 coluna em mobile), exibindo ícones de 18x18px e um componente de avaliação com 5 estrelas alinhado à direita, utilizando a paleta de cores militar/cinza (`#2D4A22` e `#CCCCCC`).

A página é rigorosamente desacoplada e modular, contendo seus componentes em `pages/sobre/components/`, sua folha de estilo em `pages/sobre/assets/css/sobre.css`, e garantindo 100% de interoperabilidade com o roteador dinâmico Vanilla JS e a régua de Breadcrumbs da SPA mestre.

---

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS.  
**Primary Dependencies**: Astro (apenas para build estático e estrutura de componentes). Zero dependências de UI externas (sem React, Vue, Svelte, Tailwind, Bootstrap ou CSS-in-JS).  
**Storage**: N/A (conteúdo e matriz de habilidades estáticos).  
**Testing**: Cenários de validação end-to-end descritos em [quickstart.md](./quickstart.md), testes visuais de gradientes, bordas e responsividade em viewport desktop, tablet e mobile.  
**Target Platform**: Navegadores Web Modernos (Evergreen Browsers).  
**Project Type**: Submódulo de Página de SPA em Astro SSG.  
**Performance Goals**: Tempo de renderização/injeção < 150ms; zero layout shift na injeção; zero dependências pesadas de runtime.  
**Constraints**: Gradiente global `#16222A` a `#3A6073`; gradiente dos painéis `#DAEBF2` a `#A8CCD9`; borda `#0381B0`; estrelas `#2D4A22` (ativas) e `#CCCCCC` (inativas); 100% de isolamento de assets sob `pages/sobre/`.  
**Scale/Scope**: 1 página principal (`sobre.astro`), 4 componentes Astro modulares (`AboutPanel`, `SkillsPanel`, `SkillCard`, `StarRating`), 1 folha de estilo CSS pura (`sobre.css`) e 10 ícones vetoriais/PNG.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro (sem Tailwind/Bootstrap); Vanilla JS nativo | Componentes `.astro` sem scripts desnecessários; CSS puro nativo com variáveis e gradientes. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todo o código reside em `pages/sobre/`, com estilos em `pages/sobre/assets/css/` e componentes em `pages/sobre/components/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Cada página define sua arquitetura de design em CSS puro | Paleta, gradientes e efeito encastrado implementados autonomamente em `pages/sobre/assets/css/sobre.css`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `spec-02_sobre` e commits atômicos estruturados. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação registrada em `.specify/specs/spec-02_sobre/` e `.specify/specs/spec-02_sobre.md`. | **PASS** |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (5/5)**.

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-02_sobre/
├── spec.md              # Especificação funcional completa
├── plan.md              # Este plano de arquitetura técnica
├── research.md          # Pesquisa e fundamentação de decisões técnicas
├── data-model.md        # Modelo de dados e entidades visuais
├── quickstart.md        # Roteiro de validação end-to-end
├── contracts/           # Contratos formais da arquitetura
│   └── ui-contracts.md
└── checklists/          # Checklist de qualidade de requisitos
    └── requirements.md
```

### Source Code (repository root)

```text
pages/
└── sobre/
    ├── sobre.astro                     # Página principal exportando #page-content
    ├── components/                     # Componentes modulares Astro
    │   ├── AboutPanel.astro            # Painel Superior ("Sobre mim")
    │   ├── SkillsPanel.astro           # Painel Inferior ("Habilidades")
    │   ├── SkillCard.astro             # Card individual de categoria técnica
    │   └── StarRating.astro            # Componente de 5 estrelas em SVG puro
    └── assets/
        ├── css/
        │   └── sobre.css               # Estilos CSS3 puros isolados da página
        └── images/                     # Ícones das tecnologias (18x18px)
            ├── icon-tensorflow.png
            ├── icon-pytorch.png
            ├── icon-scikit-learn.png
            ├── icon-xgboost.png
            ├── icon-python.png
            ├── icon-sql.png
            ├── icon-r.png
            ├── icon-dax.png
            └── icon-javascript.png
```

**Structure Decision**:
A organização modular em `pages/sobre/` assegura o isolamento de escopo sem poluir arquivos globais do projeto. A página principal `sobre.astro` orquestra os dois painéis que são desacoplados em componentes dedicados, e a injeção na SPA ocorre por meio do nó `#page-content`, mantendo a estabilidade do layout mestre.

---

## Complexity Tracking

> *Nenhuma complexidade adicional ou violação constitucional identificada.*

| Tópico | Abordagem Selecionada | Alternativa Mais Complexa Rejeitada |
|---|---|---|
| Estrelas de Avaliação | SVGs vetoriais inline em `StarRating.astro` | Bibliotecas de ícones de terceiros (FontAwesome, Lucide) |
| Grid de Habilidades | CSS Grid nativo (`repeat(3, 1fr)`) | Bibliotecas utilitárias de grid ou flex-calculado com polyfills |
| Profundidade Visual | `box-shadow: inset ...` em CSS3 puro | Imagens de background fatiadas ou pseudo-elementos pesados |
