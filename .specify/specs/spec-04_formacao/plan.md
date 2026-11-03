# Implementation Plan: Estrutura e Estilização da Página "Formação" (`formacao.astro`)

**Branch**: `04-formacao` | **Date**: 2026-11-03 | **Spec**: [.specify/specs/spec-04_formacao/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-04_formacao/spec.md`

---

## Summary

Implementar a página "Formação" (`pages/formacao/formacao.astro`), estruturada com painel container estilizado com gradiente vertical (`#DAEBF2` a `#A8CCD9`), borda azul (`#0381B0`), sombra interna e título principal em tipografia `Barlow Condensed` 700 bold ("Formação"). A página é dividida em **3 seções**: **'Acadêmica'**, **'Idiomas'** e **'Treinamentos'**, cada uma com seu título correspondente (`.section-title`), contendo cards detalhados (incluindo logos institucionais para formação acadêmica e cards de exemplo para idiomas e treinamentos), badges em fonte monoespaçada (`Consolas`/`Courier New`) em caixa alta (uppercase). 

A página é 100% desacoplada e modular, integrada na SPA via History API sem recarregamento de página, garantindo atendimento estrito aos requisitos funcionais e não funcionais sob a Constituição do projeto (Astro + CSS3 puro).

---

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS.  
**Primary Dependencies**: Astro (apenas para build estático e estrutura de componentes). Zero dependências de UI externas (sem React, Vue, Svelte, Tailwind, Bootstrap ou CSS-in-JS).  
**Storage**: N/A (conteúdo estático).  
**Testing**: Cenários de validação end-to-end e testes visuais de gradientes, tipografia (Barlow Condensed e monoespaçada), badges e responsividade (Desktop, Tablet, Mobile).  
**Target Platform**: Navegadores Web Modernos (Evergreen Browsers).  
**Project Type**: Submódulo de Página de SPA em Astro SSG.  
**Performance Goals**: Tempo de renderização/injeção < 150ms no `#page-content-host`; zero layout shift.  
**Constraints**: Gradiente global `#16222A` a `#3A6073`; painel container com gradiente vertical `#DAEBF2` a `#A8CCD9` e borda `#0381B0`; cards com gradiente horizontal `#FFF8D6` a `#FFFFFF`; badges com fonte monoespaçada uppercase; 100% de isolamento de assets sob `pages/formacao/`.  
**Scale/Scope**: 1 página principal (`formacao.astro`), 1 folha de estilo CSS pura (`formacao.css`), 2 imagens de logo institucional.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro (sem Tailwind/Bootstrap); Vanilla JS nativo | Utilização de componente `.astro` limpo e CSS puro com variáveis e gradientes nativos. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todo o código reside em `pages/formacao/`, com estilos em `pages/formacao/assets/css/` e assets em `pages/formacao/assets/images/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Chaque página define sua arquitetura de design em CSS puro | Paleta, gradientes, tipografia Barlow Condensed e monoespaçada implementados em `formacao.css`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `04-formacao` e commits atômicos estruturados. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação registrada em `.specify/specs/spec-04_formacao.md` e `.specify/specs/spec-04_formacao/spec.md`. | **PASS** |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (5/5)**.

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-04_formacao/
├── spec.md              # Especificação funcional completa
├── plan.md              # Este plano de arquitetura técnica
└── tasks.md             # Tarefas de implementação (geradas via /speckit.tasks)
```

### Source Code (repository root)

```text
pages/
├── formacao/
│   ├── formacao.astro                  # Página principal exportando #page-content
│   └── assets/
│       ├── css/
│       │   └── formacao.css            # Estilos CSS3 puros isolados da página
│       └── images/                     # Logos institucionais
│           ├── logo-estacio.png
│           └── logo-estacio-uniradial.png
└── spa/
    └── formacao.astro                  # Wrapper SPA importando formacao.astro e formacao.css
```

**Structure Decision**:
A organização modular em `pages/formacao/` assegura o isolamento completo de escopo sem afetar outras páginas. A página `formacao.astro` renderiza o layout estrutural e carrega o arquivo `formacao.css`, sendo importada em `pages/spa/formacao.astro` juntamente com a folha de estilo `formacao.css` para garantir o correto empacotamento de estilos (bundling) no build estático e injeção dinâmica no `#page-content-host` da SPA.

---

## Complexity Tracking

> *Nenhuma complexidade adicional ou violação constitucional identificada.*

| Tópico | Abordagem Selecionada | Alternativa Mais Complexa Rejeitada |
|---|---|---|
| Estilização de Badges e Cards | CSS3 Puro (`linear-gradient`, `box-shadow`, `border`) | Frameworks utilitários CSS ou bibliotecas de UI externas |
| Tipografia | Importação de fontes via Google Fonts / `@font-face` / stack padrão | Webfonts externas pesadas com dependências de runtime |
