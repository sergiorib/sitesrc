# Implementation Plan: Estrutura e Estilização da Página "Meus Contatos" (`contatos.astro`)

**Branch**: `07-contatos` | **Date**: 2026-11-11 | **Spec**: [.specify/specs/spec-07_contatos/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-07_contatos/spec.md`

## Summary

Implementar a página "Meus Contatos" (`contatos.astro`), exibindo os canais de comunicação profissional (Telefone/WhatsApp, E-mail, LinkedIn e GitHub) em um painel executivo com gradiente, título estilizado em `Barlow Condensed` e uma grade responsiva com cards interativos. A página integra-se perfeitamente à Single Page Application (`/spa/contatos/`), mantendo isolamento estrito de estilos e conformidade com a Constituição v1.0.0.

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS, ECMAScript 2022+ (Vanilla JS).  
**Primary Dependencies**: Astro (estritamente para SSG e marcação). Zero dependências de runtime de terceiros (sem Tailwind, Bootstrap, React, Vue).  
**Storage**: N/A (dados estáticos definidos no componente Astro).  
**Testing**: Cenários de validação end-to-end descritos em [quickstart.md](./quickstart.md), testes de responsividade em grade (< 720px e < 380px) e verificação de build estático.  
**Target Platform**: Navegadores Web Modernos (Chrome, Firefox, Edge, Safari).  
**Project Type**: Módulo SPA / Página Estática Astro.  
**Performance Goals**: Carregamento instantâneo (< 150ms em navegação SPA); zero layout shift; renderização fluida em dispositivos móveis e desktop.  
**Constraints**: Estética Dark Tech Dashboard com paleta de gradientes azuis/ciano, tipografia `Barlow Condensed`, e isolamento de assets em `pages/contatos/`.  
**Scale/Scope**: 1 componente de página (`contatos.astro`), 1 folha de estilos (`contatos.css`), 4 cards interativos de contato estruturados.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro (sem Tailwind/Bootstrap); Vanilla JS puro (sem React/Vue/Svelte) | Apenas Astro `.astro`, CSS vanilla puro e sem dependências externas. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todos os arquivos da feature residem estritamente em `pages/contatos/` com subdiretórios `assets/css/` e `assets/images/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Cada página define sua arquitetura de design sob Dark Tech Dashboard em CSS puro | Estilos e gradientes encapsulados em `contatos.css`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `07-contatos` e commits estruturados. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação salva em `.specify/specs/spec-07_contatos/spec.md`. | **PASS** |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (5/5)**.

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-07_contatos/
├── spec.md              # Especificação funcional
├── plan.md              # Este plano técnico
├── research.md          # Fase 0: Pesquisa arquitetural
├── data-model.md        # Fase 1: Modelo de entidades (contatos)
├── quickstart.md        # Fase 1: Guia de validação E2E
├── contracts/           # Fase 1: Contratos de UI
│   └── ui-contracts.md
└── tasks.md             # Fase 2: Backlog (gerado via /speckit.tasks)
```

### Source Code (repository root)

```text
pages/
└── contatos/
    ├── contatos.astro          # Componente Astro principal da página de contatos
    └── assets/
        ├── css/
        │   └── contatos.css    # Estilos isolados em CSS puro
        └── images/             # Ícones e mídias da página de contatos
```

**Structure Decision**: A implementação segue rigorosamente o padrão modular por página estabelecido no projeto (`pages/contatos/`), garantindo desacoplamento total.
