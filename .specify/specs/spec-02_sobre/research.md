# Research: Arquitetura Técnica da Página "Sobre mim" (`sobre.astro`)

**Feature**: `02-sobre` (Página "Sobre mim")  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Contexto e Objetivos da Pesquisa

Esta pesquisa estabelece as decisões arquiteturais fundamentadas para implementar a página "Sobre mim" em estrita conformidade com a Constituição v1.0.0:
- **Modularidade e Isolamento**: Código localizado em `pages/sobre/sobre.astro`, com componentes em `pages/sobre/components/` e estilos exclusivos em `pages/sobre/assets/css/sobre.css`.
- **Zero Frameworks CSS**: Todas as regras visuais (gradientes múltiplos, sombras internas encastradas, grid responsivo e alinhamentos flexíveis) implementadas em CSS3 Puro.
- **Renderização e Injeção SPA**: Compatibilidade total com o roteador dinâmico Vanilla JS da aplicação SPA através do contêiner padrão `#page-content`.

---

## 2. Decisões Técnicas Consolidadas

### Decisão 1: Arquitetura de Componentes Astro e Separação de Preocupações

- **Decisão**: Decompor a página `sobre.astro` em 4 componentes semânticos modulares dentro de `pages/sobre/components/`:
  1. `AboutPanel.astro`: Encapsula o Painel Superior com o título "Sobre mim" e o texto biográfico oficial justificado.
  2. `SkillsPanel.astro`: Encapsula o Painel Inferior com o título "Habilidades" e o grid de 3 colunas dos cards técnicos.
  3. `SkillCard.astro`: Componente reutilizável para cada card de categoria (título `#386312`, gradiente horizontal `#FFEFBA` a `#FFFFFF` e lista de tecnologias).
  4. `StarRating.astro`: Componente dedicado para renderização das 5 estrelas com cores contratuais (`#2D4A22` ativa e `#CCCCCC` inativa).
- **Racional**:
  - Evita blocos monolíticos de código HTML/Astro.
  - Permite reutilização do componente de estrelas e facilidade de manutenção para inclusão de novas categorias no Card 3.
- **Alternativas consideradas**:
  - *Arquivo único `sobre.astro` com toda a marcação inline*: Rejeitado por prejudicar a legibilidade e violar o princípio de modularidade.

### Decisão 2: Renderização de Estrelas com SVG Inline Puro

- **Decisão**: O componente `StarRating.astro` gerará exatamente 5 elementos `<svg>` vetoriais inline estilizados via CSS3 puro.
  - Estrela Ativa: `fill: #2D4A22; stroke: #2D4A22; width: 14px; height: 14px;`
  - Estrela Inativa: `fill: transparent; stroke: #CCCCCC; stroke-width: 1.5; width: 14px; height: 14px;`
  - Alinhamento: Contêiner flexível com `margin-left: auto; display: inline-flex; gap: 3px; align-items: center;`.
- **Racional**:
  - Elimina dependências externas (sem FontAwesome, Lucide ou icon fonts).
  - Garante renderização nítida em qualquer densidade de pixels (Retina displays) com precisão de cores.
  - O `margin-left: auto` garante que, independente do tamanho do nome da ferramenta, o bloco de estrelas permaneça fixado à margem direita do card.
- **Alternativas consideradas**:
  - *Caracteres Unicode (`★` / `☆`)*: Descartado por variações tipográficas inconsistentes entre diferentes sistemas operacionais (Windows, macOS, Linux, Android).
  - *Imagens PNG individuais*: Descartado por overhead de requisições HTTP e potencial pixelização.

### Decisão 3: Efeito de Profundidade Encastrado e Sistema de Gradientes

- **Decisão**: 
  - Fundo global da área de conteúdo: `background: linear-gradient(to bottom, #16222A 0%, #3A6073 100%);` ocupando 100% da altura e largura do contêiner.
  - Fundo dos 2 painéis principais: `background: linear-gradient(to bottom, #DAEBF2 0%, #A8CCD9 100%);`
  - Borda dos painéis: `border: 1px solid #0381B0; border-radius: 10px;`
  - Efeito encastrado: `box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 -2px 4px rgba(0, 0, 0, 0.08);`
  - Fundo dos cards de habilidades: `background: linear-gradient(to right, #FFEFBA 0%, #FFFFFF 100%); border: 1px solid #0381B0; border-radius: 10px;`
- **Racional**:
  - Fidelidade visual absoluta aos valores hexadecimais especificados pelo usuário.
  - Efeito encastrado cria o relevo sofisticado típico de dashboards executivos analíticos.

### Decisão 4: Grid Responsivo de 3 Colunas com Fallback Fluido

- **Decisão**: 
  - Desktop (≥ 1024px): `display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`
  - Tablet (768px a 1023px): `grid-template-columns: repeat(2, 1fr);` com o terceiro card ocupando a largura total ou ajustando-se dinamicamente.
  - Mobile (< 768px): `grid-template-columns: 1fr; gap: 16px;` com ajuste da fonte do parágrafo "Sobre mim" para 15px.
- **Racional**:
  - CSS Grid nativo oferece controle dimensional perfeito e distribuição uniforme sem quebras de layout.

### Decisão 5: Interoperabilidade com o Roteador SPA

- **Decisão**: O elemento raiz de `sobre.astro` exporta `<div id="page-content" class="page-content-wrapper sobre-page" data-page-id="sobre" data-page-title="Sobre">`.
- **Racional**:
  - O roteador `router.js` captura a página assincronamente, extrai o nó `#page-content`, injeta-o no `#page-content-host` e atualiza a régua de Breadcrumbs para `Sobre` em tempo zero.

---

## 3. Resumo das Decisões

| Dimensão | Decisão Adotada | Justificativa |
|---|---|---|
| Modularidade | 4 componentes `.astro` isolados em `pages/sobre/components/` | Manutenibilidade e separação de responsabilidades |
| Estilização | Folha CSS3 puro isolada em `pages/sobre/assets/css/sobre.css` | Conformidade estrita com a Constituição v1.0.0 |
| Estrelas | SVG Inline puro com `fill: #2D4A22` e `stroke: #CCCCCC` | Zero dependências, renderização vetorial e alinhamento à direita |
| Layout dos Cards | CSS Grid (`repeat(3, 1fr)`) no desktop e `1fr` no mobile | Distribuição dimensional simétrica e fluida |
| Injeção SPA | Nó `#page-content` com atributos `data-page-*` | Sincronização nativa com o roteador e Breadcrumbs |
