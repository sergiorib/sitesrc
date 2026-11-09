# Feature Specification: Estrutura e Estilização da Página "Meus Contatos" (`contatos.astro`)

**Feature Branch**: `07-contatos`

**Created**: 2026-11-03

**Status**: Concluído / Em Execução

**Input**: User description: "Gere uma especificação no padrão do GSK para implementar a página 'contatos.astro' a partir dos detalhes extraídos do arquivo HTML de referência `C:/Sergio/Anotacoes/projeto_site_pessoal/especificacoes_design_paginas/Exemplos/meus_contatos.html`. Os arquivos devem ser salvos em `C:/github/sitesrc/.specify/specs/spec-07_contatos.md` e `C:/github/sitesrc/.specify/specs/spec-07_contatos/spec.md`, instruindo a criação em `pages/contatos/contatos.astro` (e `pages/contatos.md`), com assets em `pages/contatos/assets/css`, `pages/contatos/assets/js` e `pages/contatos/assets/images`."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Cabeçalho e Eyebrow de Contatos (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar o painel principal de contatos contendo a barra de destaque (*eyebrow* "Canais de contato") e o título principal "Meus Contatos" em tipografia `Barlow Condensed`, para identificar imediatamente os canais de comunicação com Sérgio Ribeiro Cerqueira.

**Why this priority**: Estabelece a identidade visual e o ponto de entrada executivo para a comunicação profissional.

**Independent Test**: Acessar a rota da página de Contatos na SPA. Verificar se o contêiner `.contacts-page` renderiza o gradiente radial/linear de fundo, o *eyebrow* em maiúsculas (`Canais de contato` com traço indicador em `--cyan`), e o título `h1` "Meus Contatos" em Barlow Condensed 700 (32px, cor `#ffffff`).

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Contatos na SPA, **When** o conteúdo é carregado no Main Container (`#page-content-host`), **Then** o painel ocupa 100% da largura com gradiente radial e linear (`#142b36` a `#31596a`), borda arredondada de 14px.
2. **Given** o cabeçalho da página, **When** inspecionado, **Then** exibe o *eyebrow* "Canais de contato" com letra maiuscula, espaçamento `letter-spacing: .18em`, cor `--cyan-soft` (`#8eddeb`) e o título principal "Meus Contatos" em `Barlow Condensed` Bold 32px.

---

### User Story 2 - Exibição dos 6 Cards de Contatos e Redes Profissionais (Priority: P1)

Como avaliador ou cliente potencial, desejo examinar os 6 cards interativos de contato (Telefone/WhatsApp, E-mail, LinkedIn, GitHub, Portfólio e Site Pessoal) dispostos em grid de 2 colunas, contendo ícones em SVG (`48x48px`), rótulos descritivos, valores em destaque e seta indicativa de link externo.

**Why this priority**: Oferece acesso direto, elegante e estruturado a todos os canais de contato e portfólio do profissional.

**Independent Test**: Verificar se a página renderiza a grade `.contact-grid` com 2 colunas no desktop, exibindo os 6 cards com fundo em gradiente linear (`rgba(3, 28, 42, .82)` a `rgba(5, 37, 52, .64)`), borda `1px solid rgba(102, 218, 238, .44)`, border-radius 13px, ícone dedicado, valor em Barlow Condensed (24px) e animação de hover (`transform: translateY(-3px)`, borda `--cyan`).

**Acceptance Scenarios**:

1. **Given** a seção `.contact-grid`, **When** renderizada em desktop (≥ 720px), **Then** exibe exatamente 2 colunas paralelas de cards de contato.
2. **Given** cada card individual (`.contact-card`), **When** inspecionado, **Then** exibe:
   - Um contêiner de ícone (`.icon-wrap`, 48x48px, borda arredondada 12px) com ícone SVG em stroke de cor `--cyan-soft`.
   - Rótulo (*label*) em maiúsculas (ex: "TELEFONE / WHATSAPP", "E-MAIL", "LINKEDIN", "GITHUB", "PORTFÓLIO", "SITE PESSOAL").
   - Valor principal (*value*) em `Barlow Condensed` 600, tamanho 24px, cor `#f2fbfd`.
   - Detalhe opcional (*detail*) em Inter 11px na cor `--muted`.
   - Seta indicativa (`↗`) na extremidade direita com transição suave no hover.
3. **Given** a lista de cards, **When** verificados os links e valores específicos:
   - Card 1: Telefone / Whatsapp -> `(11) 98368-0639` (tel:+5511983680639)
   - Card 2: E-mail -> `Sergio.rib@live.com` (mailto:Sergio.rib@live.com), detalhe "Vamos trocar uma ideia"
   - Card 3: LinkedIn -> `Sergio Ribeiro Cerqueira` (https://www.linkedin.com/in/sergio-ribeiro-cerqueira), detalhe "Conecte-se comigo profissionalmente"
   - Card 4: GitHub -> `sergiorib / sergiorib` (https://github.com/sergiorib/sergiorib), detalhe "Veja meus códigos e projetos"
   - Card 5: Portfólio -> `Projetos de dados` (https://SergioRibSite/src/pages/portfolio.html), detalhe "Explore análises, estudos e soluções"
   - Card 6: Site pessoal -> `Conheça minha trajetória` (https://SergioRibSite/src/Sobre.html), detalhe "Saiba mais sobre mim e meu trabalho"

---

### User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Contatos" carregue instantaneamente sem recarregar a Sidebar, atualizando os Breadcrumbs no topo do Main Container para refletir a localização "Contatos".

**Why this priority**: Assegura a consistência de navegação Single Page Application estabelecida na arquitetura mestre.

**Independent Test**: Navegar para "Contatos" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza a régua de breadcrumbs para exibir `Contatos` sem full reload.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/contatos/` é requisitada, **Then** o script de roteamento SPA intercepta o evento e injeta o contêiner da página dentro do `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** a régua de Breadcrumbs no topo do Main Container exibe o nó `Contatos` como ativo e a Sidebar mantém o item "Contatos" selecionado.

---

### User Story 4 - Adaptabilidade Responsiva para Tablets e Dispositivos Móveis (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout de contatos se ajuste perfeitamente a telas menores com empilhamento de coluna única e espaçamentos proporcionais.

**Why this priority**: Garante usabilidade impecável em viewports mobile e tablets.

**Independent Test**: Reduzir a largura da viewport para < 720px. Verificar se a grade `.contact-grid` reorganiza-se para 1 coluna (`1fr`) e o padding adapta-se de forma fluida.

**Acceptance Scenarios**:

1. **Given** visualização em tela Tablet / Mobile (< 720px), **When** a largura é reduzida, **Then** a grade de contatos reorganiza-se automaticamente para 1 única coluna (`grid-template-columns: 1fr`) com espaçamento de 11px.
2. **Given** visualização em telas ultra-estreitas (< 380px), **When** renderizado, **Then** os ícones ajustam-se para 42x42px e os valores reduzem proporcionalmente para evitar quebras de layout.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página de contatos organizada estritamente nos seguintes diretórios e arquivos:
  - Arquivo principal da página: `pages/contatos/contatos.astro` (com suporte e referência a `pages/contatos.md`).
  - Folha de estilos isolada: `pages/contatos/assets/css/contatos.css`
  - Scripts de UI client-side: `pages/contatos/assets/js/contatos.js`
  - Diretório de imagens/ícones: `pages/contatos/assets/images/`
- **FR-002**: A página DEVE ser injetada e renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full reload.
- **FR-003**: O contêiner raiz da página (`.contacts-page`) DEVE utilizar posicionamento relativo, `min-height: 100vh`, padding responsivo (`clamp(28px, 5vw, 62px) clamp(24px, 5.2vw, 76px)`), gradientes radiais/lineares (`#142b36`, `#244653`, `#31596a`) e border-radius de 14px.
- **FR-004**: O cabeçalho deve conter um *eyebrow* em maiúsculas (`Canais de contato`) na cor `--cyan-soft` com barra indicativa e o título `h1` "Meus Contatos" em tipografia `Barlow Condensed`, peso 700 bold, 32px, cor `#ffffff`.
- **FR-005**: A grade de contatos (`.contact-grid`) DEVE possuir 2 colunas paralelas em desktop (`repeat(2, minmax(0, 1fr))`) com `gap: 14px`.
- **FR-006**: Cada card (`.contact-card`) DEVE possuir fundo em gradiente linear (`rgba(3, 28, 42, .82)` a `rgba(5, 37, 52, .64)`), borda `1px solid rgba(102, 218, 238, .44)`, `border-radius: 13px`, padding de `20px 21px`, e transição de hover com elevação (`transform: translateY(-3px)`) e destaque da borda em `--cyan` (`#19c6e6`).
- **FR-007**: O contêiner de ícone (`.icon-wrap`) DEVE ter dimensões de 48x48px, borda arredondada de 12px, cor `--cyan-soft`, borda e fundo translúcidos, abrigando SVG de 23x23px.
- **FR-008**: O conteúdo do card DEVE conter o rótulo (*label*) em maiúsculas (12px, `--cyan-soft`), o valor principal (*value*) em `Barlow Condensed` 600 (24px, `#f2fbfd`), o detalhe opcional (11px, `--muted`), e a seta indicativa (`↗`).
- **FR-009**: A página DEVE incluir exatamente os 6 canais especificados: Telefone/WhatsApp, E-mail, LinkedIn, GitHub, Portfólio e Site Pessoal, com seus respectivos links e metadados.
- **FR-010**: Em resoluções Mobile (< 720px), a grade deve transicionar para 1 coluna (`grid-template-columns: 1fr`).
- **FR-011**: O elemento raiz deve conter `id="page-content"`, `data-page-id="contatos"` e `data-page-title="Meus Contatos"`.

---

## Success Criteria *(measurable)*

- **SC-001**: O tempo de renderização da página de Contatos no Main Container é inferior a 150ms.
- **SC-002**: 100% dos elementos visuais especificados em `meus_contatos.html` (variáveis CSS, gradientes radiais/lineares, grid de 2 colunas, ícones SVG e tipografia Barlow Condensed) são reproduzidos fielmente.
- **SC-003**: Todos os 6 cards de contato e redes sociais encontram-se funcionais, acessíveis via teclado e com links corretos.
- **SC-004**: O design responsivo adapta perfeitamente o grid em tablets e smartphones (< 720px) sem quebras de layout.

## Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/contatos/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../contatos/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/contatos/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/contatos/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/contatos/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.
