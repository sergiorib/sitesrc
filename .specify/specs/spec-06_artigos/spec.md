# Feature Specification: Estrutura e Estilização da Página "Artigos" (`artigos.astro`)

**Feature Branch**: `06-artigos`

**Created**: 2026-11-04

**Status**: Concluído / Atualizado

**Input**: User description: "Leia o arquivo 'C:/Sergio/Anotacoes/projeto_site_pessoal/especificacoes_design_paginas/Exemplos/exemplo_06_pagina_artigos.html' e use como referencia para gerar uma especificação no padrão do GSK para implementar a pagina 'artigos.astro'. Extraia cada detalhe do arquivo de referencia e transforme em especificações GSK para a pagina de artigos. As especificações devem refletir fielmente o design do html de exemplo, informando que CSS, JavaScript e imagens devem ficar em seus respectivos arquivos separados."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Cabeçalho e Grid de Duas Colunas da Página de Artigos (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar o cabeçalho da página de artigos ("Artigos técnicos", subtítulo "Seleciona o tema." e linha divisoria com gradiente ciano) e o grid principal de duas colunas contendo os 13 grupos temáticos.

**Why this priority**: Estabelece a estrutura visual principal e a navegação por tópicos técnicos na SPA.

**Independent Test**: Acessar a rota da página "Artigos" na SPA. Verificar se o título "Artigos técnicos", o intro, a regra com gradiente e o grid de duas colunas (`.topic-columns`) com 13 grupos são renderizados com precisão.

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Artigos na SPA, **When** o conteúdo é carregado no Main Container (`#page-content-host`), **Then** o cabeçalho exibe o título em fonte `Oswald` (clamp 28px-40px, cor `#ffffff`) e subtítulo `.intro` ("Seleciona o tema.", cor `#88a9bc`).
2. **Given** o layout principal, **When** renderizado, **Then** exibe um grid de 2 colunas (`.topic-columns`, `repeat(2, minmax(0, 1fr))`, `gap: 16px`) alinhadas ao topo.

---

### User Story 2 - Exibição dos Grupos de Tópicos, Subgrupos e Acordeão Interativo (Priority: P1)

Como avaliador ou entusiasta de dados, desejo interagir com os cards de grupos de tópicos (`.topic-group`), alternando o estado de expansão (acordeão) de grupos e subgrupos ('Redes Neurais Recorrentes', 'GCP', 'AWS', 'AZURE') com ícones e setas (`.chevron`).

**Why this priority**: Permite navegar por uma vasta árvore de conhecimentos de forma limpa, organizada e interativa.

**Independent Test**: Clicar nos botões de alternância (`.group-toggle` e `.subgroup-toggle`) e verificar se os grupos e subgrupos abrem/fecham corretamente com transição suave e rotação de chevron.

**Acceptance Scenarios**:

1. **Given** cada grupo de tópico (`.topic-group`), **When** renderizado, **Then** apresenta fundo `rgba(10, 25, 38, 0.75)`, backdrop blur 8px, borda `1px solid rgba(0, 229, 255, 0.25)`, `border-radius: 18px`, `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)`.
2. **Given** o primeiro grupo ("Análise de dados e BI"), **When** a página carrega, **Then** inicia aberto (`.topic-group.open`).
3. **Given** o clique em um `.group-toggle` ou `.subgroup-toggle`, **When** acionado, **Then** alterna a classe `.open` e o atributo `aria-expanded` (`true`/`false`), rotacionando o chevron em 90 graus.

---

### User Story 3 - Seleção de Subitens (Leafs), Feedback Visual e Redirecionamento (Priority: P2)

Como usuário navegando pelos artigos, desejo clicar em qualquer subitem (`.leaf`) para visualizar feedback visual instantâneo (seleção com marca de verificação `✓` e cor de destaque) e ser redirecionado para o artigo correspondente especificado em `data-url`.

**Why this priority**: Assegura a interatividade funcional de seleção e navegação para os artigos técnicos específicos.

**Independent Test**: Clicar em um subitem `.leaf`. Verificar se o item recebe a classe `.selected`, exibe a marca de verificação `✓` e após 150ms executa o redirecionamento para a URL em `data-url`.

**Acceptance Scenarios**:

1. **Given** os subitens de artigos (`.leaf`), **When** renderizados, **Then** exibem um marcador circular (`.leaf-bullet`, cor `#00e5ff`) e texto estilizado em `#b0d3e5` com efeito de transição horizontal (`translateX(3px)` no hover).
2. **Given** o clique em um `.leaf`, **When** acionado, **Then** remove a seleção anterior, aplica `.selected` (fundo `#dbeaf0`, borda `#ffffff`, cor `#091a24`, peso bold, `box-shadow`), adiciona a marca de verificação `✓` e redireciona para `data-url` após 150ms.

---

### User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout de artigos se ajuste perfeitamente a telas menores (coluna única em viewports menores e rodapé flexível).

**Why this priority**: Garante uma experiência de leitura e navegação impecável em todos os dispositivos.

**Independent Test**: Reduzir a largura da viewport para resoluções abaixo de 850px e 540px. Verificar se o grid se reorganiza em 1 coluna e o rodapé se adapta em coluna.

**Acceptance Scenarios**:

1. **Given** visualização em Tablet/Mobile (< 850px), **When** a largura é aplicada, **Then** o grid de tópicos (`.topic-columns`) transforma-se em coluna única (`grid-template-columns: 1fr`).
2. **Given** visualização mobile estreita (< 540px), **When** renderizada, **Then** o rodapé reorganiza-se em coluna com espaçamento adequado.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página de artigos organizada estritamente nos seguintes diretórios e arquivos:
  - Arquivo principal da página: `pages/artigos.md`, `pages/artigos/artigos.astro` (com versão SPA em `pages/spa/artigos.astro`).
  - Folha de estilos isolada: `pages/artigos/assets/css/artigos.css`
  - Script JavaScript client-side: `pages/artigos/assets/js/artigos.js`
  - Diretório de imagens/ícones: `pages/artigos/assets/images/`
- **FR-002**: A página DEVE ser injetada e renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full reload.
- **FR-003**: O cabeçalho (`header`) DEVE exibir o título "Artigos técnicos" em fonte `Oswald` (clamp 28px-40px, `#ffffff`), subtítulo `.intro` ("Seleciona o tema.", `#88a9bc`), e linha divisoria `.rule` com gradiente ciano (`90deg, #00e5ff 0%, rgba(0, 229, 255, 0.15) 60%, transparent 100%`).
- **FR-004**: O layout principal (`.topic-columns`) DEVE exibir um grid de 2 colunas (`repeat(2, minmax(0, 1fr))`) contendo 13 grupos temáticos distribuídos entre as colunas esquerda (grupos 1 a 6) e direita (grupos 7 a 13).
- **FR-005**: Cada grupo (`.topic-group`) DEVE ter fundo `rgba(10, 25, 38, 0.75)`, backdrop blur 8px, borda `1px solid rgba(0, 229, 255, 0.25)`, `border-radius: 18px`, e `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3)`. O Grupo 1 ("Análise de dados e BI") DEVE iniciar aberto (`.topic-group.open`).
- **FR-006**: Os subgrupos (`.subgroup`, ex: Redes Neurais Recorrentes, GCP, AWS, AZURE) DEVEM possuir botão de alternância (`.subgroup-toggle`) com borda arredondada e container de subitens com borda lateral esquerda.
- **FR-007**: Os subitens finais (`.leaf`) DEVEM conter `data-url` apontando para o caminho do artigo, efetuando o comportamento de seleção visual com classe `.selected`, inserção de `✓` e redirecionamento via `window.location.href` após 150ms.
- **FR-008**: O rodapé (`footer`) DEVE exibir o copyright "© 2026 — Portfólio de Dados" e o lema `.footer-motto` "ANALISAR / CONSTRUIR / EVOLUIR" com a barra `/` em destaque ciano (`#00e5ff`).
- **FR-009**: Em resoluções menores que 850px, o layout de colunas (`.topic-columns`) DEVE adaptar-se para coluna única (`1fr`).
- **FR-010**: O elemento raiz deve conter `id="page-content"`, `data-page-id="artigos"` e `data-page-title="Artigos técnicos"`.

---

## Success Criteria *(measurable)*

- **SC-001**: O tempo de renderização da página de Artigos no Main Container é inferior a 150ms.
- **SC-002**: 100% dos elementos visuais e comportamentais extraídos de `exemplo_06_pagina_artigos.html` (13 grupos temáticos, subgrupos, acordeão, seleção com `✓` e redirecionamento) são reproduzidos fielmente.
- **SC-003**: A separação de assets (CSS em `pages/artigos/assets/css/artigos.css`, JS em `pages/artigos/assets/js/artigos.js`, e imagens em `pages/artigos/assets/images/`) está estritamente implementada.
- **SC-004**: O design responsivo adapta perfeitamente as colunas e espaçamentos em viewports de tablet e mobile.

## Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/artigos/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../artigos/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/artigos/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/artigos/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/artigos/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.
