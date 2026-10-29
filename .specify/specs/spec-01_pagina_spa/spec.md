# Feature Specification: Estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container)

**Feature Branch**: `01-pagina-spa`

**Created**: 2026-10-29

**Status**: Draft

**Input**: User description: "Criar a estrutura da Página Principal SPA (Layout Base, Sidebar e Main Container) com Sidebar fixa à esquerda com identidade profissional e navegação, e Área de Conteúdo Principal (Main Container) dinâmica à direita, capaz de carregar páginas primárias e subpáginas em cascata de forma transparente, com suporte a navegação por Breadcrumbs."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acesso Inicial e Renderização do Layout Base (Priority: P1)

Como visitante ou recrutador acessando o portfólio de Data Science, desejo visualizar imediatamente uma interface imersiva em tela cheia (100vw/100vh) contendo o cabeçalho de identidade do profissional, o menu lateral com o item inicial ativo e a área de conteúdo já carregada com a página padrão ("Sobre"), para que eu tenha uma experiência fluida de carregamento instantâneo sem elementos desalinhados ou piscamento de tela.

**Why this priority**: É a espinha dorsal de toda a aplicação. Sem o layout base estável, a identidade profissional e o contêiner de exibição carregados, nenhuma outra interação ou navegação subsequente é possível.

**Independent Test**: Carregar a aplicação diretamente no navegador. Verificar se a tela ocupa 100% da altura e largura da janela, a Sidebar de 300px está renderizada com o cabeçalho de identidade do Sérgio Ribeiro Cerqueira, o item "Sobre" está com estilo visual ativo, e o Main Container à direita exibe a página "Sobre".

**Acceptance Scenarios**:

1. **Given** que o usuário acessa a raiz da SPA (`spa.astro`), **When** o documento é renderizado pelo navegador, **Then** a janela exibe o layout dividido horizontalmente entre uma Sidebar de 300px à esquerda e o Main Container ocupando todo o espaço restante à direita em 100vw e 100vh.
2. **Given** o carregamento da Sidebar, **When** inspecionado o cabeçalho superior (275px), **Then** deve ser exibida a imagem de perfil circular (160px) centralizada com moldura em gradiente vertical (`#3893BA` a `#25797F`), com faixa de contraste escura (`#061B2A`), apresentando o nome "Sérgio Ribeiro Cerqueira" e o cargo "Cientista de Dados" em tipografia Barlow Condensed 600.
3. **Given** o estado inicial da navegação, **When** a página termina de carregar, **Then** o item "Sobre" é exibido no estado ativo (fundo `#B3CBDB`, texto `#061B2A`, ícone escuro) e o conteúdo inicial de "Sobre" é renderizado dentro do Main Container.

---

### User Story 2 - Navegação Fluida entre Páginas Primárias sem Recarregamento (Priority: P1)

Como visitante, desejo alternar entre as seções primárias ("Sobre", "Histórico", "Formação", "Portfólio", "Artigos", "Contatos") clicando nos itens da Sidebar, para que o conteúdo do Main Container se atualize imediatamente sem recarregar a Sidebar ou provocar recarregamento completo da página (Full Page Reload).

**Why this priority**: A promessa central de uma Single Page Application (SPA) é a transição fluida e contínua de conteúdo, garantindo estabilidade perceptual e performance ao navegar pelas seções do portfólio.

**Independent Test**: Clicar sequencialmente nos 6 itens do menu lateral. Verificar se cada clique atualiza o estado visual do botão selecionado, carrega o conteúdo correspondente no Main Container, atualiza a URL do navegador e a Sidebar permanece perfeitamente estática.

**Acceptance Scenarios**:

1. **Given** que o usuário está visualizando a seção "Sobre", **When** o usuário clica no item "Portfólio" da Sidebar, **Then** o evento de navegação é interceptado sem recarregar a página, a Sidebar permanece imóvel, o item "Portfólio" adquire o estilo ativo, o item anterior volta ao estilo inativo e o conteúdo de `portfolio.astro` é injetado no Main Container.
2. **Given** a navegação para uma seção primária, **When** o conteúdo é carregado no Main Container, **Then** a URL no navegador é sincronizada via History API sem recarregar a aplicação.
3. **Given** que o usuário clica no botão "Voltar" ou "Avançar" do navegador, **When** o evento de histórico é disparado, **Then** a SPA restaura o conteúdo da página correspondente no Main Container e ajusta o item ativo da Sidebar de forma sincronizada.

---

### User Story 3 - Navegação Hierárquica por Breadcrumbs em Páginas e Subpáginas (Priority: P2)

Como usuário navegando por páginas profundas ou subpáginas em cascata (por exemplo, detalhes de um projeto de Data Science em `pages/portfolio/projeto-01`), desejo visualizar uma trilha hierárquica (Breadcrumbs) discreta no topo do Main Container e poder clicar em níveis anteriores para retornar com facilidade.

**Why this priority**: Dá contexto de localização ao usuário dentro de páginas com subníveis, permitindo retornar facilmente ao contexto pai sem depender exclusivamente dos controles do navegador.

**Independent Test**: Navegar para uma subpágina aninhada e verificar se o componente Breadcrumbs exibe a trilha horizontal formatada (ex: `portfolio / projeto-01`), permitindo clicar no nível `portfolio` para retornar à página principal da seção.

**Acceptance Scenarios**:

1. **Given** que o usuário acessa uma página primária (ex: "Sobre"), **When** o Main Container é renderizado, **Then** o componente de Breadcrumbs no topo exibe a indicação do nível atual de forma sutil e integrada ao tema visual.
2. **Given** que o usuário acessa uma subpágina em cascata (ex: detalhes de projeto), **When** a rota é resolvida, **Then** a régua de Breadcrumbs exibe o caminho hierárquico `pagina-pai / subpagina`, onde todos os níveis anteriores são links clicáveis e o nível terminal representa a página atual ativa.
3. **Given** que o usuário clica em um nível pai na régua de Breadcrumbs, **When** a ação é executada, **Then** a SPA intercepta a navegação, atualiza o Main Container com a página pai e sincroniza os estados da Sidebar e do histórico.

---

### User Story 4 - Descoberta Dinâmica de Subpáginas e Tratamento de Rota Inexistente / Fallback (Priority: P2)

Como visitante ou desenvolvedor adicionando novos conteúdos no portfólio, desejo que qualquer link interno sob a estrutura de `pages/` seja automaticamente carregado e renderizado no Main Container, e que qualquer rota inexistente exiba uma página padronizada de fallback (`default.astro`), mantendo a estabilidade global do sistema.

**Why this priority**: Evita listas engessadas ou *hardcoded* de rotas no roteador, viabilizando a expansão do portfólio com novos projetos, artigos ou páginas secundárias com tratamento resiliente de erros 404.

**Independent Test**: Disparar navegação para uma subpágina válida existente e para uma rota inexistente. Verificar se a primeira injeta o conteúdo normalmente e a segunda renderiza graciosamente a interface de `default.astro` ("Página não encontrada") sem quebrar a aplicação.

**Acceptance Scenarios**:

1. **Given** um link interno apontando para uma subpágina existente dentro da árvore `pages/`, **When** o usuário aciona o link, **Then** o roteador realiza a requisição assíncrona da página solicitada e a renderiza dentro do Main Container mantendo a Sidebar com o menu pai visualmente selecionado.
2. **Given** uma requisição de link interno para uma página inexistente ou que retorne erro de carregamento (404), **When** a requisição falhar, **Then** o roteador intercepta a falha e renderiza o conteúdo do arquivo `pages/spa/default.astro` indicando "Página não encontrada" dentro do Main Container.

---

### Edge Cases

- **Tentativa de navegação rápida sucessiva (duplo clique ou múltiplos cliques em itens do menu)**: O roteador deve tratar requisições concorrentes ou cancelar a anterior, garantindo que o Main Container renderize exatamente o último estado solicitado pelo usuário.
- **Falha de conectividade ou rede ao buscar nova rota**: A aplicação deve exibir graciosamente a página de fallback (`default.astro`) ou mensagem contextual no Main Container sem travar a Sidebar.
- **Clique em links externos**: Links apontando para domínios externos não devem ser interceptados pelo roteador da SPA, permitindo comportamento padrão do navegador (abertura externa ou em nova aba conforme especificado no link).
- **Redimensionamento da janela do navegador**: O layout deve se manter estável ocupando 100vw e 100vh, com a Sidebar mantendo seus 300px de largura e o Main Container preenchendo a área remanescente com rolagem interna de conteúdo quando o conteúdo ultrapassar a altura da viewport.
- **Navegação direta por URL ou refresh**: O sistema deve manter coerência com o roteamento estático do Astro ao inicializar o estado da aplicação.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer o layout mestre da aplicação SPA estruturado no arquivo `pages/spa/spa.astro`, ocupando exatamente 100% da largura e altura da janela (100vw e 100vh).
- **FR-002**: O sistema DEVE dividir horizontalmente a janela em duas áreas principais: uma Sidebar fixa à esquerda com 300px de largura e um Main Container dinâmico à direita preenchendo todo o espaço restante.
- **FR-003**: A Sidebar DEVE ser subdividida verticalmente em Cabeçalho de Identidade com altura fixa de 275px no topo e Área de Navegação no espaço restante inferior.
- **FR-004**: O Cabeçalho de Identidade DEVE exibir a imagem de fundo `pages/spa/assets/images/profile-bg.png` (`background-size: cover`) com borda `#69C4CE`, foto de perfil circular com 160px de diâmetro (`pages/spa/assets/images/profile-photo.png`, `object-fit: cover`) centralizada com moldura em gradiente vertical de `#3893BA` (topo) a `#25797F` (base).
- **FR-005**: O Cabeçalho de Identidade DEVE conter o nome "Sérgio Ribeiro Cerqueira" (Barlow Condensed, peso 600, tamanho 30px, cor `#FFFFFF`, centralizado) e a profissão "Cientista de Dados" (Barlow Condensed, peso 600, tamanho 25px, cor `#FFFFFF`, centralizado), suportados por uma faixa de contraste escuro (`#061B2A`) com baixa opacidade para assegurar legibilidade sobre a imagem de fundo.
- **FR-006**: A Área de Navegação DEVE possuir contêiner com cor de fundo `#16222A`, borda `#69C4CE` e imagem de fundo `pages/spa/assets/images/menu-bg.png`.
- **FR-007**: Os itens do menu lateral DEVEM ter largura de aproximadamente 93% da Sidebar, altura de 50px, espaçamento vertical de 16px e cantos arredondados com raio de 20px.
- **FR-008**: O sistema DEVE mapear os seguintes itens de menu com seus respectivos arquivos de destino e pares de ícones (localizados em `pages/spa/assets/images/`):
  1. "Sobre" -> `sobre.astro` (ícones: `icone-sobre-claro.png` / `icone-sobre-escuro.png`);
  2. "Histórico" -> `historico.astro` (ícones: `icone-historico-claro.png` / `icone-historico-escuro.png`);
  3. "Formação" -> `formacao.astro` (ícones: `icone-formacao-claro.png` / `icone-formacao-escuro.png`);
  4. "Portfólio" -> `portfolio.astro` (ícones: `icone-portfolio-claro.png` / `icone-portfolio-escuro.png`);
  5. "Artigos" -> `artigos.astro` (ícones: `icone-artigos-claro.png` / `icone-artigos-escuro.png`);
  6. "Contatos" -> `contatos.astro` (ícones: `icone-contatos-claro.png` / `icone-contatos-escuro.png`).
- **FR-009**: O item de menu "Sobre" DEVE ser o item selecionado por padrão na inicialização do sistema.
- **FR-010**: Os itens de menu DEVEM alternar visualmente entre dois estados estritos:
  - Estado Não Selecionado: Fundo `#061B2A`, Borda `#69C4CE`, Texto `#EDF2EE`, exibição do ícone na versão clara.
  - Estado Selecionado (Ativo): Fundo `#B3CBDB`, Borda `#69C4CE`, Texto `#061B2A`, exibição do ícone na versão escura.
- **FR-011**: O Main Container DEVE ser o alvo exclusivo de injeção de conteúdo (`single content target`) para todas as páginas primárias e subpáginas em cascata, preservando a Sidebar e a moldura do layout perfeitamente estáveis sem recarregamento da página (*no full page reload*).
- **FR-012**: O sistema DEVE disponibilizar um componente de Breadcrumbs posicionado no topo do Main Container, exibido em linha horizontal no formato `pagina1 / pagina2 / ...`, discreto, integrado ao design Dark Tech Dashboard, com todos os níveis ancestrais clicáveis e com atualização automática a cada troca de rota.
- **FR-013**: O sistema de roteamento client-side DEVE implementar delegação global de eventos (`document.addEventListener('click', ...)`) para interceptar cliques em links (`<a>`) internos sob a estrutura `pages/`, cancelando o reload padrão com `e.preventDefault()`.
- **FR-014**: O roteador DEVE ser dinâmico e capaz de carregar assincronamente páginas e subpáginas adicionadas dentro de `pages/` (ex: subpáginas de portfólio), sem depender de listas estritamente restritas aos 6 itens do menu.
- **FR-015**: Ao navegar para uma subpágina aninhada em cascata, o sistema DEVE manter o item de menu primário pai visualmente selecionado na Sidebar.
- **FR-016**: O sistema DEVE sincronizar o histórico de navegação com a History API (`window.history.pushState` e evento `popstate`), permitindo pleno funcionamento dos botões nativos de "Voltar" e "Avançar" do navegador.
- **FR-017**: O sistema DEVE fornecer o arquivo de fallback `pages/spa/default.astro` indicando "Página não encontrada" e renderizá-lo dentro do Main Container sempre que uma rota interna solicitada for inválida ou inexistente (erro 404).

---

### Key Entities

- **LayoutBase**: Representa a moldura estrutural da SPA composta pela divisão rígida entre a Sidebar (300px) e a Área de Conteúdo Principal (Main Container), gerenciando o ciclo de vida da tela cheia (100vw x 100vh).
- **IdentityHeader**: Estrutura do cabeçalho da Sidebar (275px de altura) contendo foto de perfil (160px), moldura com gradiente, faixa de contraste escuro, tipografia Barlow Condensed, nome profissional e profissão.
- **NavigationMenu**: Contêiner de navegação que gerencia a lista dos itens de menu primários, controle de estado ativo/inativo, estilização contrastante e troca dinâmica de pares de ícones (claro vs escuro).
- **NavigationItem**: Entidade individual de cada opção de navegação, contendo rótulo, rota associada, ícone claro, ícone escuro e estado de seleção.
- **BreadcrumbTrail**: Representação da hierarquia de navegação ativa, composta por uma sequência de segmentos navegáveis que refletem a profundidade da página atual em relação à sua seção raiz.
- **ContentRoute**: Entidade que encapsula a rota de destino requisitada, seu resolvedor de conteúdo assíncrono, a identificação do nó pai para ativação visual no menu e o tratamento de fallback para rotas não encontradas.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O layout inicial da SPA é completamente carregado e visível pelo usuário em menos de 1 segundo em conexões padrão de banda larga.
- **SC-002**: A alternância entre quaisquer seções primárias ou subpáginas ocorre em menos de 300ms a partir do clique do usuário, sem qualquer oscilação visual (*layout shift* ou recarregamento total da tela).
- **SC-003**: 100% das tentativas de navegação via links internos sob `pages/` preservam a Sidebar estável e sem recarregamento da janela (*zero full page reloads*).
- **SC-004**: 100% das rotas internas inexistentes ou inválidas exibem a página de fallback padronizada `pages/spa/default.astro` no Main Container sem travar a interface da aplicação.
- **SC-005**: 100% das interações com os botões "Voltar" e "Avançar" do navegador restauram fidedignamente o estado do conteúdo e o estado visual do menu e breadcrumbs correspondentes.
- **SC-006**: A interface permanece perfeitamente enquadrada em 100% da viewport (100vw e 100vh) em qualquer resolução de tela desktop, mantendo a Sidebar fixa em 300px de largura e o Main Container com barra de rolagem interna dedicada quando o conteúdo exceder a altura visível.

---

## Assumptions

- O projeto segue as diretrizes mandatadas na Constituição v1.0.0: Astro para estruturação estática, Vanilla CSS puro para estilização (sem Tailwind/Bootstrap) e Vanilla JavaScript puro para interatividade no cliente (sem React/Vue/Svelte).
- Os assets visuais especificados (`profile-bg.png`, `profile-photo.png`, `menu-bg.png`, pares de ícones claros/escuros) estarão disponíveis sob o diretório de assets da página em `pages/spa/assets/images/`.
- A tipografia `Barlow Condensed` estará disponível e carregada globalmente ou importada via CSS na página da SPA.
- As páginas de destino das seções (`sobre.astro`, `historico.astro`, `formacao.astro`, `portfolio.astro`, `artigos.astro`, `contatos.astro`) terão sua marcação inicial compatível com injeção assíncrona ou carregamento modular no Main Container.
