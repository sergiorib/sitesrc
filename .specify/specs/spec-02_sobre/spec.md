# Feature Specification: Estrutura e Estilização da Página "Sobre mim" (`sobre.astro`)

**Feature Branch**: `02-sobre`

**Created**: 2026-10-29 (Updated: 2026-11-03)

**Status**: Concluído / Em Execução

**Input**: User description: "Criar a estrutura e estilização da Página 'Sobre mim' (sobre.astro) com dois painéis principais ('Sobre mim' e 'Habilidades'), exibindo biografia profissional, divisões de Hard-Skills e Soft-Skills com agrupamentos hierárquicos colapsáveis, ícones de tecnologias e classificação por estrelas para cada competência, integrada dinamicamente dentro do Main Container da SPA."

---

## 1. Objetivo

Este documento define de forma unificada a página "Sobre": o roteamento e a organização de arquivos na SPA, a composição da página (elementos, hierarquia, textos e fontes de dados), os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4.

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

A página "Sobre" é a rota inicial da SPA: é exibida dentro da área de exibição (`#page-content-host`) ao acessar `/`, `/spa` ou `/spa/sobre`, e mantém o item "Sobre" ativo no menu lateral (mapeamento `ROUTE_PARENT_MAP` em `pages/spa/assets/js/router.js`). O ponto de entrada da SPA é `pages/spa/sobre.astro`; `pages/sobre/sobre.astro` é a cópia da página no diretório da feature. A página não possui subpáginas aninhadas; os recursos exclusivos dela ficam organizados na seguinte estrutura:

### 2.1 Árvore Hierárquica de Páginas da Sobre

```text
pages/sobre/
├── sobre.astro
├── assets/
│   ├── css/
│   │   └── sobre.css
│   └── images/
│       ├── analise.svg
│       ├── brain.svg
│       ├── cloud.svg
│       ├── conceito.svg
│       ├── database.svg
│       ├── engenharia.svg
│       ├── ia.svg
│       ├── linux.svg
│       ├── python_verde.svg
│       ├── r.svg
│       ├── shell.svg
│       ├── sql.svg
│       ├── ssh.svg
│       ├── tool.svg
│       └── windows.svg
└── data/
    └── skills.json
```

Recursos compartilhados usados pela página (fora de `pages/sobre/`):

```text
pages/spa/
├── sobre.astro                      ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala
│   └── tokens.css                   ← tokens visuais
└── components/elementos/            ← componentes dos elementos do catálogo
```

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Visualização do Painel "Sobre mim" com Apresentação Executiva (Priority: P1)

Como recrutador, executivo ou visitante do portfólio, desejo visualizar um painel superior dedicado à introdução profissional de Sérgio Ribeiro Cerqueira, para compreender imediatamente seu posicionamento estratégico na intersecção entre modelagem matemática rigorosa, Machine Learning e liderança técnica orientada a resultados.

**Why this priority**: É a primeira impressão conceitual e biográfica transmitida pelo portfólio. Estabelece a autoridade e a proposta de valor do profissional de forma concisa e legível.

**Independent Test**: Acessar a rota da página "Sobre" na SPA. Verificar se o primeiro painel corresponde ao primeiro `[panel]` da seção 4 (Estrutura): cabeçalho "Sobre mim" e os parágrafos de `@textos.bio`, cada elemento com a aparência do estilo indicado, conforme [estilos.md](../../catalog/estilos.md).

**Acceptance Scenarios**:

1. **Given** que o usuário acessa a página inicial ou clica em "Sobre" na Sidebar da SPA, **When** o conteúdo é carregado dentro do `Main Container`, **Then** a área inteira exibe o fundo do estilo do `[page-root]` definido na seção 4.
2. **Given** a renderização do painel "Sobre mim", **When** inspecionada a estrutura, **Then** ele é um `section.panel` com a classe do estilo definido na seção 4, contendo um `header` com o título "Sobre mim" e uma `vertical-list` com os parágrafos da bio.
3. **Given** o conteúdo textual do painel, **When** exibido no navegador, **Then** os parágrafos aparecem na ordem de `@textos.bio` (seção 5), com o texto legível sobre o fundo do painel.

---

### 3.2 User Story 2 - Consulta às Habilidades Técnicas e Comportamentais com Avaliação por Estrelas e Árvore Hierárquica (Priority: P1)

Como gestor técnico ou líder de engenharia de dados, desejo analisar as competências do profissional organizadas em divisões distintas (Hard-Skills e Soft-Skills) com cards por categoria, contendo subgrupos hierárquicos recolhíveis, ícones e avaliação por estrelas, para auditar rapidamente a senioridade e o domínio ferramental.

**Why this priority**: A matriz de habilidades com classificação por estrelas e subgrupos modulares quantifica o nível de proficiência técnica e comportamental de forma transparente e detalhada, permitindo validação imediata das tecnologias dominadas.

**Independent Test**: Verificar se o painel "Habilidades" corresponde ao segundo `[panel]` da seção 4: cabeçalho com a legenda de estrelas, sub-seções Hard-Skills e Soft-Skills, cards gerados de `@dados.hard-skills` e `@dados.soft-skills` (seção 6) e itens com a contagem exata de estrelas ativas e inativas.

**Acceptance Scenarios**:

1. **Given** o painel "Habilidades", **When** renderizado em qualquer largura, **Then** cada grid exibe o número de colunas configurado na seção 4 para aquela faixa de largura.
2. **Given** qualquer card de habilidade, **When** renderizado, **Then** exibe o título da categoria (`$item.titulo`) e a lista de habilidades do item correspondente em `pages/sobre/data/skills.json`, com o estilo de card indicado na seção 4.
3. **Given** um item de habilidade com sub-itens (ex.: Python), **When** renderizado, **Then** é exibido como grupo recolhível (`skill-item`, forma grupo), com ícone, nome e estrelas iguais ao `floor` da média dos sub-itens, conforme a ficha de `skill-item` em [elementos.md](../../catalog/elementos.md).
4. **Given** um item de habilidade sem sub-itens, **When** renderizado, **Then** exibe ícone (próprio, herdado do pai ou `☆`), nome e as 5 estrelas alinhadas à direita da linha.
5. **Given** a legenda de estrelas no cabeçalho do painel, **When** expandida pelo usuário, **Then** exibe os níveis de 1 a 5 estrelas definidos em `@dados.legenda-estrelas` (seção 6).

---

### 3.3 User Story 3 - Adaptação Responsiva para Dispositivos Móveis e Tablets (Priority: P2)

Como usuário acessando o portfólio por smartphone ou tablet, desejo que a página "Sobre mim" e seus cards de habilidades se reorganizem ergonomicamente sem perda de legibilidade ou quebra indesejada das estrelas de avaliação.

**Why this priority**: Garante uma experiência impecável em qualquer formato de tela, sem barras de rolagem horizontais espúrias ou desalinhamento de ícones e estrelas.

**Independent Test**: Exibir a página abaixo de 768px, entre 768px e 1279px e a partir de 1280px. Verificar se os grids e o cabeçalho de "Habilidades" seguem as configurações responsivas da seção 4, se os textos se ajustam pela escala fluida (`scale.css`) e se as estrelas permanecem alinhadas à direita.

**Acceptance Scenarios**:

1. **Given** cada faixa de largura (< 768px, 768–1279px, ≥ 1280px), **When** a página é redimensionada, **Then** os grids e o cabeçalho de "Habilidades" assumem a configuração declarada na seção 4 para aquela faixa, sem colisão de textos.
2. **Given** visualização em tela Mobile (< 768px), **When** o usuário rola a tela, **Then** os cards de habilidades se empilham em uma única coluna e a legenda ocupa a largura do cabeçalho.
3. **Given** a exibição mobile, **When** inspecionadas as linhas de habilidades e subgrupos recolhíveis, **Then** as 5 estrelas permanecem intactas e encostadas à borda direita do card.
4. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a página "Sobre mim" é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** a biografia, os títulos e os cards de habilidades apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
5. **Given** o acesso por celular (largura aproximada de 375 pixels) ou tablet (largura aproximada de 768 pixels), **When** a página é exibida, **Then** os painéis e os cards de habilidades se apresentam adaptados à tela e legíveis, sem rolagem horizontal.
6. **Given** que o usuário aumentou o tamanho de fonte padrão nas preferências do navegador, **When** a página é exibida, **Then** a biografia, os nomes das tecnologias e os títulos são ampliados proporcionalmente, sem sobreposição com as estrelas de avaliação.

---

### 3.4 User Story 4 - Integração Dinâmica com o Roteador SPA e Régua de Breadcrumbs (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Sobre mim" carregue instantaneamente sem recarregar a Sidebar, atualizando os Breadcrumbs no topo do Main Container para refletir a localização "Sobre".

**Why this priority**: Assegura a consistência de navegação Single Page Application estabelecida na arquitetura mestre.

**Independent Test**: Navegar para "Sobre" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza a régua de breadcrumbs para exibir `Sobre` sem full reload.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/sobre/` é requisitada, **Then** o script de roteamento SPA intercepta o evento e injeta o contêiner da página dentro do `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** a régua de Breadcrumbs no topo do Main Container exibe o nó `Sobre` como ativo e a Sidebar mantém o item "Sobre" selecionado.

---

### 3.5 Edge Cases

- **Telas ultra-estreitas (< 360px de largura)**: Os nomes de tecnologias longos devem truncar suavemente com reticências ou quebrar sem empurrar as 5 estrelas para fora do card.
- **Carregamento assíncrono de imagens de ícones**: A ausência momentânea de uma imagem de ícone não deve colapsar a altura da linha nem desalinhar o grupo de estrelas (o espaço do ícone é reservado pelo estilo de `skill-item`, token `--icon-md`).
- **Injeção repetida no Main Container**: A reinjeção do conteúdo via roteador SPA não deve duplicar estilos nem gerar listeners redundantes.
- **Árvores de habilidades profundas**: Subgrupos aninhados com múltiplos níveis (ex: Python -> Manipulação de dados -> Pandas) devem calcular recursivamente a média das estrelas do grupo pai.

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root:petroleo] sobre {titulo: 'Sobre'}

  [panel:claro]
    [header:painel-escuro] 'Sobre mim'
    [vertical-list:amplo]
      [paragraph:escuro] *@textos.bio

  [panel:claro]
    [header:painel-escuro] 'Habilidades' {direcao: coluna → linha @768}
      [legend] 'Legenda de Estrelas'
        [legend-item] *@dados.legenda-estrelas

    [subsection:escuro] 'Hard-Skills'
      [divider:sublinhado]
      [grid] {colunas: 1 → 2 @768 → 3 @1280}
        [card:amarelo] *@dados.hard-skills
          [header:card] $item.titulo
          [vertical-list]
            [skill-item] *$item.skills

    [subsection:escuro] 'Soft-Skills'
      [divider:sublinhado]
      [grid] {colunas: 1 → 2 @768}
        [card:verde] *@dados.soft-skills
          [header:card] $item.titulo
          [vertical-list]
            [skill-item] *$item.skills
```

## 5. Textos

@textos.bio
  - Sou um Cientista de Dados com sólida base em matemática, estatística e programação, aplicadas à análise de dados e ao desenvolvimento de soluções de Analise de Dados e Machine Learning.
  - Tenho mais de 25 anos de experiência profissional em desenvolvimento, análise de sistemas e dados, atuando em empresas de destaque em seus segmentos e em ambientes de elevada exigência técnica.
  - Essa trajetória me proporcionou uma visão abrangente dos processos, sistemas e desafios de negócio, que hoje utilizo no desenvolvimento de soluções de dados e analíticas, combinando conhecimento técnico e visão de negócio para gerar resultados.
  - Acredito que o aprendizado contínuo, a troca de experiências e o trabalho colaborativo são essenciais para enfrentar desafios e alcançar resultados consistentes.
  - Convido você a conhecer minha trajetória profissional, formação e projetos desenvolvidos na área de dados.

## 6. Fontes de dados

| Referência               | Origem                              | Campos usados                              |
|--------------------------|-------------------------------------|--------------------------------------------|
| @dados.legenda-estrelas  | inline (abaixo)                     | estrelas, descricao                        |
| @dados.hard-skills       | pages/sobre/data/skills.json#hard   | titulo, skills[] (nome, icone?, estrelas?, skills[]?) |
| @dados.soft-skills       | pages/sobre/data/skills.json#soft   | titulo, skills[] (nome, icone?, estrelas?, skills[]?) |

@dados.legenda-estrelas
  - 1 | Conhecimento conceitual
  - 2 | Prática básica
  - 3 | Uso em projetos pessoais
  - 4 | Uso em projetos profissionais
  - 5 | Domínio teórico e prático

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `pages/spa/sobre.astro` (e a cópia `pages/sobre/sobre.astro`), com a folha `pages/sobre/assets/css/sobre.css` gerada a partir de [estilos.md](../../catalog/estilos.md) contendo apenas os elementos e estilos usados na página (R-S02), e os dados de habilidades em `pages/sobre/data/skills.json`. Os elementos do catálogo são componentes compartilhados em `pages/spa/components/elementos/`.
- **FR-002**: A página DEVE ser configurada para injeção exclusiva dentro do `Main Container` (`#page-content-host`) da aplicação SPA, ocupando 100% da largura e altura disponíveis.
- **FR-003**: A composição da página DEVE seguir a seção **Estrutura** desta spec; a aparência de cada elemento é a do estilo indicado, conforme [estilos.md](../../catalog/estilos.md). Os antigos requisitos visuais FR-005 a FR-016 foram substituídos por essas duas fontes.
- **FR-017**: O elemento raiz de conteúdo da página DEVE conter os atributos `id="page-content"`, `data-page-id="sobre"` e `data-page-title="Sobre"` para perfeita interoperabilidade com o roteador SPA e atualização da régua de Breadcrumbs.
- **FR-017a**: A página NÃO exibe título de página (`[page-title]` omitido). O título usado pelos breadcrumbs (`data-page-title="Sobre"`) vem da configuração `{titulo: 'Sobre'}` do `[page-root]`.
- **FR-018**: A legenda de estrelas DEVE seguir `@dados.legenda-estrelas` e a taxonomia de competências DEVE seguir `pages/sobre/data/skills.json` (fonte única, originada de `docs/99_lista_habilidades.md`).
- **FR-019**: A página DEVE apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-020**: Os tamanhos de texto e os espaçamentos da página DEVEM se adaptar à largura disponível, respeitando limites mínimos e máximos; os tamanhos descritos nesta especificação são valores de referência para a faixa de tela em que são indicados (telas desktop, quando não houver indicação), a partir dos quais o dimensionamento se adapta.
- **FR-021**: O aumento do tamanho de fonte configurado nas preferências do navegador (recurso de acessibilidade) DEVE ampliar proporcionalmente os textos da página, sem sobreposição ou perda de conteúdo.

---

### 7.2 Key Entities

- Os elementos da página (`page-root`, `panel`, `header`, `subsection`, `divider`, `grid`, `card`, `vertical-list`, `paragraph`, `legend`, `legend-item`, `skill-item`, `star-rating`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Skill** (dados): `nome`, `icone?`, `estrelas?`, `skills[]?` — ver `pages/sobre/data/skills.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: O tempo de renderização da página "Sobre mim" ao ser injetada no Main Container da SPA é inferior a 150ms a partir do acionamento no menu.
- **SC-002**: 100% dos elementos da página exibem a aparência do estilo indicado na seção **Estrutura**, conforme [estilos.md](../../catalog/estilos.md) (medidas como valores de referência, conforme FR-020).
- **SC-003**: 100% das competências mapeadas exibem exatamente a quantidade de estrelas ativas e inativas definida em `pages/sobre/data/skills.json` (ou a média calculada, para grupos), com as cores do estilo de `star-rating` em [estilos.md](../../catalog/estilos.md).
- **SC-004**: Os grids seguem as colunas configuradas na seção **Estrutura** (Hard-Skills: 1 → 2 @768 → 3 @1280; Soft-Skills: 1 → 2 @768); em mobile (< 768px) ambos ficam em 1 coluna, sem rolagem horizontal.
- **SC-005**: 100% das transições de navegação para a página "Sobre" atualizam a régua de Breadcrumbs para exibir `Sobre` sem provocar qualquer recarregamento da Sidebar ou da tela mestre (*zero full page reload*).
- **SC-006**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a página "Sobre mim" exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-007**: Em celular (largura aproximada de 375 pixels) e tablet (largura aproximada de 768 pixels), a página "Sobre mim" apresenta layout adaptado e legível, sem rolagem horizontal.

---

## 9. Assumptions

- O projeto segue estritamente a Constituição v1.0.0: Astro para estruturação estática, CSS3 Puro / Vanilla CSS (sem frameworks utilitários) e Vanilla JS nativo.
- Os ícones de tecnologias estão organizados no diretório de assets da página em `pages/sobre/assets/images/`.
- As fontes `Barlow` e `Barlow Condensed` são carregadas do Google Fonts (por `tokens.css` e `spa-layout.css`), e a fonte monoespaçada de sistema (`Consolas`, `Courier New`, `monospace`) usada na legenda está disponível no ambiente do navegador.

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: No contexto da nossa arquitetura SPA Astro (onde o roteador client-side injeta trechos de HTML em `#page-content-host` via `fetch`), ao adicionar imagens ou assets estáticos (como logos, ícones ou fotos) em páginas dentro de `pages/sobre/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../sobre/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/sobre/`).
  2. **Utilize SEMPRE o caminho absoluto** baseado na raiz do servidor estático do Astro seguindo o padrão já estabelecido no projeto (ex: `/pages/sobre/assets/images/<arquivo>`).
  3. **Garanta que o arquivo de imagem exista fisicamente** no diretório correspondente (`pages/sobre/assets/images/`).
  4. **Valide a renderização** executando `npm run build` ao finalizar.
