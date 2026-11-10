# Implementation Plan: Estrutura e Estilização da Página "Formação" (`formacao.astro`)

**Branch**: `spec-04_formacao` | **Date**: 2026-11-09 | **Spec**: [.specify/specs/spec-04_formacao/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-04_formacao/spec.md`

---

## Summary

Implementar a página "Formação" (`pages/formacao/formacao.astro`), estruturada com título principal "Formação" em Barlow Condensed, contendo 3 seções distintas ('Acadêmica', 'Idiomas' e 'Treinamentos'), cada uma com seu título correspondente e cards contendo logos institucionais centralizados, título da formação e badges em fonte monoespaçada. A estilização utiliza CSS3 puro seguindo o Design System do portfólio. A página é rigorosamente desacoplada e modular, integrada dinamicamente dentro do Main Container da SPA Astro.

---

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS.  
**Primary Dependencies**: Astro (apenas para build estático e estrutura de componentes). Zero dependências de UI externas (sem React, Vue, Svelte, Tailwind, Bootstrap ou CSS-in-JS).  
**Storage**: N/A (conteúdo e dados de formação estáticos).  
**Testing**: Cenários de validação end-to-end descritos em [quickstart.md](./quickstart.md), validação de build e responsividade.  
**Target Platform**: Navegadores Web Modernos (Evergreen Browsers).  
**Project Type**: Submódulo de Página de SPA em Astro SSG.  
**Performance Goals**: Tempo de renderização/injeção < 150ms; zero layout shift na injeção; zero dependências pesadas de runtime.  
**Constraints**: Gradiente global `#16222A` a `#3A6073`; gradiente dos cards `#FFF8D6` a `#FFFFFF`; borda `#0381B0`; tipografia Barlow Condensed e fontes monoespaçadas (`Consolas`/`Courier New`); rotas absolutas para assets em `/pages/formacao/assets/images/`.  
**Scale/Scope**: 1 página principal (`formacao.astro`), 3 seções estruturadas, cards modulares, 1 folha de estilo CSS pura (`formacao.css`) e 5 imagens institucionais.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro; Vanilla JS nativo | Componentes `.astro` sem scripts desnecessários; CSS puro nativo com variáveis e gradientes. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todo o código reside em `pages/formacao/`, com estilos em `pages/formacao/assets/css/` e imagens em `pages/formacao/assets/images/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Cada página define sua arquitetura de design em CSS puro | Paleta, gradientes e layout implementados autonomamente em `pages/formacao/assets/css/formacao.css`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `spec-04_formacao` e commits atômicos estruturados. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação registrada em `.specify/specs/spec-04_formacao/` e `.specify/specs/spec-04_formacao.md`. | **PASS** |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (5/5)**.

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-04_formacao/
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
└── formacao/
    ├── formacao.astro                  # Página principal exportando #page-content
    └── assets/
        ├── css/
        │   └── formacao.css            # Estilos CSS3 puros isolados da página
        └── images/                     # Logos institucionais e de idiomas
            ├── logo-estacio.png
            ├── logo-estacio-uniradial.png
            ├── logo_ingles.png
            ├── logo_espanhol.png
            └── logo_enap.png
```

**Structure Decision**:
A organização modular em `pages/formacao/` assegura o isolamento de escopo sem poluir arquivos globais do projeto. A página principal `formacao.astro` orquestra as três seções ('Acadêmica', 'Idiomas', 'Treinamentos') e a injeção na SPA ocorre por meio do nó `#page-content`, mantendo a estabilidade do layout mestre.

---

## Complexity Tracking

> *Nenhuma complexidade adicional ou violação constitucional identificada.*
