---
description: "Lista de tarefas executáveis para a implementação da Página 'Sobre mim'"
---

# Tasks: Estrutura e Estilização da Página "Sobre mim" (`sobre.astro`)

**Input**: Documentos de design de `.specify/specs/spec-02_sobre/`  
**Prerequisites**: [spec.md](./spec.md), [plan.md](./plan.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-contracts.md](./contracts/ui-contracts.md), [quickstart.md](./quickstart.md)  
**Tests**: Validação visual e de integração guiada por [quickstart.md](./quickstart.md)  
**Organization**: Tarefas agrupadas por fases de infraestrutura, fundamentação e User Stories para execução e validação incrementais.

## Formato: `- [x] [ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Tarefa executável em paralelo (arquivos distintos, sem dependências de bloqueio)
- **[Story]**: Rótulo da User Story correspondente (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Todos os caminhos de arquivos são explícitos e isolados em `pages/sobre/` conforme a Constituição v1.0.0.

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Purpose**: Criação da estrutura de diretórios e inicialização dos assets estáticos da página "Sobre mim".

- [x] T001 Criar a estrutura completa de pastas do módulo em `pages/sobre/` (`components/`, `assets/css/`, `assets/images/`)
- [x] T002 [P] Inicializar os ícones gráficos das tecnologias (18x18px) em `pages/sobre/assets/images/`
- [x] T003 [P] Criar a folha de estilo base em `pages/sobre/assets/css/sobre.css` com as variáveis CSS de cores, gradientes, bordas e regras do efeito encastrado (`box-shadow: inset ...`)

---

## Phase 2: Foundational (Pré-Requisitos Estruturais Bloqueantes)

**Purpose**: Construção dos componentes de apresentação base e do invólucro principal da página.

- [x] T004 Implementar o componente vetorial `pages/sobre/components/StarRating.astro` para renderização das 5 estrelas em SVG puro (estrelas ativas `#2D4A22` e inativas vazadas `#CCCCCC`) com alinhamento flexível à direita via `margin-left: auto`
- [x] T005 [P] Implementar o componente modular `pages/sobre/components/SkillCard.astro` para renderizar o card de categoria com título em `#386312`, gradientes horizontais específicos (`#FFEFBA` a `#FFFFFF` para hard skills, `#C6E9BC` a `#FFFFFF` para soft skills), padding de 14px e renderização das linhas com ícones de 18x18px, rótulos e estrelas
- [x] T005b Implementar o componente recursivo `pages/sobre/components/SkillItemRow.astro` suportando árvores hierárquicas colapsáveis via `<details>` / `<summary>` e cálculo automático de média de estrelas para nós pai
- [x] T006 Criar a página mestre da seção em `pages/sobre/sobre.astro` com o contêiner raiz `#page-content`, atributos `data-page-id="sobre"` e `data-page-title="Sobre"`, importação da folha de estilos `sobre.css` e gradiente de fundo global `#16222A` a `#3A6073`

**Checkpoint**: Base e componentes atômicos estruturados.

---

## Phase 3: User Story 1 - Visualização do Painel "Sobre mim" (Priority: P1) 🎯 MVP

**Goal**: Exibir o Painel Superior com fundo em gradiente `#DAEBF2` a `#A8CCD9`, borda `#0381B0`, cantos de 10px, sombra interna encastrada, título "Sobre mim" (32px Bold preto) e o parágrafo biográfico justificado em fonte monoespaçada (22px, `#4A5B61`).

### Implementation for User Story 1

- [x] T007 [P] [US1] Implementar o componente `pages/sobre/components/AboutPanel.astro` estruturando o contêiner com o título "Sobre mim" em Barlow Condensed Bold 32px (`#000000`) e o texto biográfico oficial justificado
- [x] T008 [P] [US1] Implementar os estilos do Painel Superior em `pages/sobre/assets/css/sobre.css` aplicando fundo gradiente `#DAEBF2` a `#A8CCD9`, borda `#0381B0`, cantos de 10px, padding de 16px, margem inferior de 16px e tipografia monoespaçada (22px, `#4A5B61`, line-height 1.5)
- [x] T009 [US1] Integrar o componente `AboutPanel.astro` dentro da página principal `pages/sobre/sobre.astro`

**Checkpoint**: MVP do Painel Superior concluído.

---

## Phase 4: User Story 2 - Consulta às Habilidades Técnicas e Comportamentais com Avaliação por Estrelas (Priority: P1)

**Goal**: Exibir o Painel Inferior ("Habilidades") contendo o título em 32px Bold preto, legenda colapsável de estrelas, divisão de Hard-Skills (8 cards) e divisão de Soft-Skills (4 cards) com subgrupos hierárquicos e avaliação por estrelas.

### Implementation for User Story 2

- [x] T010 [P] [US2] Implementar o componente `pages/sobre/components/SkillsPanel.astro` contendo o título "Habilidades", legenda de estrelas, divisão de Hard-Skills e divisão de Soft-Skills
- [x] T011 [US2] Mapear a taxonomia completa de Hard-Skills (Desenvolvimento, Bancos de Dados, Análise de Dados e BI, Engenharia de Dados, Cloud e Infraestrutura, Inteligência Artificial, Infraestrutura, Metodologias e Ferramentas) e Soft-Skills (Análise e Pensamento Estratégico, Comunicação e Relacionamento, Liderança e Gestão, Resolução de Problemas e Adaptabilidade) com base em `docs/99_lista_habilidades.md` e FR-018
- [x] T012 [P] [US2] Implementar as regras de estilização dos cards, títulos de categorias (`#386312`), gradientes horizontais, ícones de 18x18px e fixação das estrelas na borda direita
- [x] T013 [US2] Integrar o componente `SkillsPanel.astro` na página principal `pages/sobre/sobre.astro` logo abaixo do `AboutPanel.astro`

**Checkpoint**: Painel de Habilidades completo com taxonomia oficial de 8 hard-skills e 4 soft-skills.

---

## Phase 5: User Story 3 - Adaptação Responsiva para Dispositivos Móveis e Tablets (Priority: P2)

**Goal**: Garantir que o grid de hard-skills se organize em 4 colunas em desktop (≥ 1200px) e soft-skills em 2 colunas, adaptando-se fluidamente em telas intermédias e colapsando para 1 coluna vertical em mobile (< 768px).

### Implementation for User Story 3

- [x] T014 [P] [US3] Implementar em `pages/sobre/assets/css/sobre.css` os grids responsivos (`.hard-skills-grid` com 4 colunas em desktop e `.soft-skills-grid` com 2 colunas)
- [x] T015 [US3] Adicionar media queries para tablets (`max-width: 1200px`) e dispositivos móveis (`max-width: 767px`), configurando 1 coluna vertical no mobile com `gap: 16px` e ajuste da biografia para 15px

**Checkpoint**: Layout responsivo verificado em desktop, tablet e mobile.

---

## Phase 6: User Story 4 - Integração Dinâmica com o Roteador SPA e Régua de Breadcrumbs (Priority: P2)

**Goal**: Assegurar que a página `pages/sobre/sobre.astro` seja consumida pelo roteador SPA da aplicação, permitindo carregamento assíncrono no Main Container e atualização da régua de Breadcrumbs para `Sobre`.

### Implementation for User Story 4

- [x] T016 [US4] Integrar a página `pages/sobre/sobre.astro` ao roteamento do sistema (`router.js`)
- [x] T017 [US4] Validar a captura dos atributos `id="page-content"`, `data-page-id="sobre"` e `data-page-title="Sobre"` pelo roteador SPA para atualização automática da régua de Breadcrumbs

**Checkpoint**: Integração SPA concluída.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verificação de conformidade visual, qualidade de código e auditoria constitucional.

- [x] T018 [P] Executar o checklist de validação visual do [quickstart.md](./quickstart.md), inspecionando cores dos gradientes, borda `#0381B0`, sombra encastrada e cores das estrelas (`#2D4A22` e `#CCCCCC`)
- [x] T019 Validar a compilação estática do projeto executando `npx astro build` e verificando que a rota `sobre` é gerada sem avisos ou quebras
- [x] T020 Validar conformidade estrita com a Constituição v1.0.0 (zero dependências de frameworks de UI, CSS3 puro e isolamento em `pages/sobre/`)
