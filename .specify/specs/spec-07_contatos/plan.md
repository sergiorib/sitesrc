# Implementation Plan: Estrutura e Estilização da Página "Meus Contatos" (`contatos.astro`)

**Branch**: `07-contatos` | **Date**: 2026-11-03 | **Spec**: [.specify/specs/spec-07_contatos/spec.md](./spec.md)

**Input**: Feature specification from `.specify/specs/spec-07_contatos/spec.md`

---

## Summary

Implementar a página "Meus Contatos" (`pages/contatos/contatos.astro`), estruturada com contêiner principal `.contacts-page`, gradientes radiais/lineares (`#142b36`, `#244653`, `#31596a`), barra *eyebrow* ("Canais de contato") e título principal `h1` ("Meus Contatos") em tipografia `Barlow Condensed` 700 bold. A página exibe um grid responsivo de **6 cards interativos** (Telefone/WhatsApp, E-mail, LinkedIn, GitHub, Portfólio e Site Pessoal), extraídos de `meus_contatos.html`, contendo ícones em SVG (`48x48px`), rótulos em maiúsculas, valores em `Barlow Condensed` (24px) e setas de navegação com transição suave no hover.

A página é 100% desacoplada, modular e integrada na SPA via History API sem recarregamento completo de página, garantindo atendimento estrito aos requisitos funcionais e sob a Constituição do projeto (Astro + CSS3 puro).

---

## Technical Context

**Language/Version**: Astro (componentes `.astro`), HTML5 Semântico, CSS3 Puro / Vanilla CSS.  
**Primary Dependencies**: Astro (apenas para build estático e estrutura de componentes). Zero dependências de UI externas (sem React, Vue, Svelte, Tailwind, Bootstrap ou CSS-in-JS).  
**Storage**: N/A (conteúdo estático).  
**Testing**: Cenários de validação end-to-end e testes visuais de gradientes, tipografia (Barlow Condensed e Inter), ícones SVG e responsividade (Desktop, Tablet, Mobile < 720px).  
**Target Platform**: Navegadores Web Modernos (Evergreen Browsers).  
**Project Type**: Submódulo de Página de SPA em Astro SSG.  
**Performance Goals**: Tempo de renderização/injeção < 150ms diretamente no container `.contacts-page`; zero layout shift.  
**Constraints**: Gradiente global de fundo (`#142b36` a `#31596a`); grid de 2 colunas em desktop e 1 coluna em mobile; 100% de isolamento de assets sob `pages/contatos/`.  
**Scale/Scope**: 1 página principal (`contatos.astro`), 1 folha de estilo CSS pura (`contatos.css`), ícones SVG embutidos ou em `pages/contatos/assets/images/`.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio Constitucional | Exigência | Conformidade no Plano | Status |
|---|---|---|---|
| **I. Stack Tecnológica Mandatória** | Astro exclusivo para `.astro`/SSG; CSS3 puro (sem Tailwind/Bootstrap); Vanilla JS nativo | Utilização de componente `.astro` limpo e CSS puro com variáveis e gradientes nativos. | **PASS** |
| **II. Estrutura e Separação de Preocupações** | Páginas em `pages/`; cada página com subdiretórios próprios de `css/`, `images/`, `js/` | Todo o código reside em `pages/contatos/`, com estilos em `pages/contatos/assets/css/` e assets em `pages/contatos/assets/images/`. | **PASS** |
| **III. Arquitetura de Design e UI** | Cada página define sua arquitetura de design em CSS puro | Paleta, gradientes, ícones SVG e tipografia Barlow Condensed implementados em `contatos.css`. | **PASS** |
| **IV. Workflow e Automação** | Git e GitHub CLI (`gh`) para versionamento e automação | Branch `07-contatos` e commits atômicos estruturados. | **PASS** |
| **V. Convenção de Nomenclatura Spec-Kit** | Padrão `spec-[numero]_[nome].md` salvo em `.specify/specs/` | Especificação registrada em `.specify/specs/spec-07_contatos.md` e `.specify/specs/spec-07_contatos/spec.md`. | **PASS** |

*Resultado do Gate*: **TODOS OS GATES CONSTITUCIONAIS APROVADOS (5/5)**.

---

## Project Structure

### Documentation (this feature)

```text
.specify/specs/spec-07_contatos/
├── spec.md              # Especificação funcional completa
├── plan.md              # Este plano de arquitetura técnica
└── tasks.md             # Tarefas de implementação (geradas via /speckit.tasks)
```

### Source Code (repository root)

```text
pages/
├── contatos/
│   ├── contatos.astro                  # Página principal exportando #page-content
│   └── assets/
│       ├── css/
│       │   └── contatos.css            # Estilos CSS3 puros isolados da página
│       └── images/                     # Ícones ou assets gráficos opcionais
└── spa/
    └── contatos.astro                  # Wrapper SPA importando contatos.astro e contatos.css
```

**Structure Decision**:
A organização modular em `pages/contatos/` assegura o isolamento completo de escopo sem afetar outras páginas. A página `contatos.astro` renderiza o layout estrutural e carrega o arquivo `contatos.css`, sendo importada em `pages/spa/contatos.astro` juntamente com a folha de estilo `contatos.css` para garantir o correto empacotamento de estilos (bundling) no build estático e injeção dinâmica diretamente no container `.contacts-page` da SPA.

---

## Complexity Tracking

> *Nenhuma complexidade adicional ou violação constitucional identificada.*

| Tópico | Abordagem Selecionada | Alternativa Mais Complexa Rejeitada |
|---|---|---|
| Estilização de Cards e Grid | CSS3 Grid (`repeat(2, minmax(0, 1fr))`) e Flexbox | Frameworks utilitários CSS ou bibliotecas de UI externas |
| Ícones e Vetores | SVGs inline encapsulados com stroke em `--cyan-soft` | Arquivos de fontes de ícones externas ou dependências npm |
