# Feature Specification: Estrutura da Página "Formação" (`formacao.astro`)

**Feature Branch**: `04-formacao`

**Created**: 2026-11-03 (Updated: 2026-11-20 — migração para o modelo em camadas)

**Status**: Em Execução

**Input**: User description: "Criar a página de Formação (`formacao.astro`) com título 'Formação', 3 seções ('Acadêmica', 'Idiomas', 'Treinamentos') com títulos correspondentes, cada seção com cards das respectivas formações, contendo um logo centralizado, o título da formação e badges em fonte monoespaçada. A página deve ter design responsivo e estar integrada dinamicamente dentro do Main Container da SPA."

---

## 1. Objetivo

Este documento define de forma unificada a página "Formação": o roteamento e a organização de arquivos na SPA, a composição da página (elementos, hierarquia e fontes de dados), os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4. O registro da migração para este modelo está em [migracao.md](migracao.md).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

A página "Formação" é exibida dentro da área de exibição (`#page-content-host`) ao acessar `/spa/formacao`, e mantém o item "Formação" ativo no menu lateral (mapeamento `ROUTE_PARENT_MAP` em `pages/spa/assets/js/router.js`). O ponto de entrada da SPA é `pages/spa/formacao.astro`; `pages/formacao/formacao.astro` é a cópia da página no diretório da feature. A página não possui subpáginas aninhadas; os recursos exclusivos dela ficam organizados na seguinte estrutura:

### 2.1 Árvore Hierárquica de Páginas da Formação

```text
pages/formacao/
├── formacao.astro
├── assets/
│   ├── css/
│   │   └── formacao.css
│   └── images/
│       ├── logo-estacio.png
│       ├── logo-estacio-uniradial.png
│       ├── logo_enap.png
│       ├── logo_espanhol.png
│       └── logo_ingles.png
└── data/
    └── formacao.json
```

Recursos compartilhados usados pela página (fora de `pages/formacao/`):

```text
pages/spa/
├── formacao.astro                   ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala
│   └── tokens.css                   ← tokens visuais
└── components/elementos/            ← componentes dos elementos do catálogo
```

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Visualização e Título da Página de Formação (Priority: P1)

Como recrutador ou visitante do portfólio, desejo visualizar a página de Formação com título em destaque, para identificar rapidamente as qualificações, idiomas e treinamentos de Sérgio Ribeiro Cerqueira.

**Why this priority**: Estabelece o arranjo estrutural e a identidade da página de formação.

**Independent Test**: Acessar a rota da página "Formação" na SPA. Verificar se a página corresponde à seção 4 (Estrutura): `[page-root]` e `[container]` com os estilos indicados e o título "Formação".

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Formação na SPA, **When** o conteúdo é carregado em `#page-content-host`, **Then** a área inteira exibe o fundo do estilo do `[page-root]` definido na seção 4.
2. **Given** telas mais largas que o limite do `[container]`, **When** a página é exibida, **Then** o conteúdo fica centralizado com a largura máxima do estilo do `[container]`.
3. **Given** o topo da página, **When** inspecionado, **Then** existe um único `h1.page-title` com o texto "Formação", no estilo indicado na seção 4.

---

### 3.2 User Story 2 - Seções e Cards de Formação, Idiomas e Treinamentos (Priority: P1)

Como gestor ou avaliador técnico, desejo examinar as 3 seções da página ('Acadêmica', 'Idiomas' e 'Treinamentos'), cada uma com seu título e cards detalhando cursos, idiomas e treinamentos.

**Why this priority**: Apresenta de forma estruturada as credenciais acadêmicas, a proficiência em idiomas e os treinamentos do profissional.

**Independent Test**: Verificar se a página exibe as três `[subsection]` da seção 4, na ordem, cada uma com o grid e os cards gerados da fonte de dados correspondente (seção 6).

**Acceptance Scenarios**:

1. **Given** a página carregada, **When** inspecionada, **Then** exibe as seções 'Acadêmica', 'Idiomas' e 'Treinamentos', nessa ordem, cada uma com título `h2`.
2. **Given** cada seção, **When** renderizada, **Then** exibe exatamente um card por item da fonte de dados correspondente, na ordem do arquivo.
3. **Given** um card, **When** renderizado, **Then** exibe o logo da instituição (`[logo]`), o título da formação (`[header:card]`) e, quando a fonte de dados informar, o selo de período (`[badge]`).
4. **Given** os cards de 'Idiomas', **When** renderizados, **Then** não exibem selo.
5. **Given** cada faixa de largura, **When** a página é exibida, **Then** cada grid assume o número de colunas configurado na seção 4 para aquela faixa.

---

### 3.3 User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Formação" carregue sem recarregar a Sidebar, atualizando os Breadcrumbs para refletir a localização "Formação".

**Why this priority**: Assegura a consistência de navegação Single Page Application estabelecida na arquitetura mestre.

**Independent Test**: Navegar para "Formação" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza os Breadcrumbs sem recarregar a página.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/formacao/` é requisitada, **Then** o roteador SPA intercepta o evento e injeta o conteúdo de `#page-content` em `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** os Breadcrumbs exibem "Formação" como ativo e a Sidebar mantém o item "Formação" selecionado.

---

### 3.4 User Story 4 - Adaptabilidade Responsiva (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout se ajuste a telas menores sem perda de legibilidade.

**Why this priority**: Assegura usabilidade em dispositivos móveis e tablets.

**Independent Test**: Exibir a página abaixo de 768px, entre 768px e 1023px e a partir de 1024px. Verificar se os grids seguem a configuração responsiva da seção 4 e se os textos se ajustam pela escala fluida (`scale.css`).

**Acceptance Scenarios**:

1. **Given** cada faixa de largura (< 768px, 768–1023px, ≥ 1024px), **When** a página é redimensionada, **Then** os grids assumem as colunas configuradas na seção 4, sem colisão de textos.
2. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a página é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** o título, as seções e os cards apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
3. **Given** o acesso por celular (largura aproximada de 375 pixels) ou tablet (largura aproximada de 768 pixels), **When** a página é exibida, **Then** as seções e os cards se apresentam adaptados à tela e legíveis, sem rolagem horizontal.
4. **Given** que o usuário aumentou o tamanho de fonte padrão nas preferências do navegador, **When** a página é exibida, **Then** os títulos e os selos são ampliados proporcionalmente, sem sobreposição ou perda de conteúdo.

---

### 3.5 Edge Cases

- **Card sem selo**: o card termina no título, sem espaço reservado para o selo.
- **Títulos de formação longos**: quebram em várias linhas dentro do card, sem transbordar.
- **Logos com proporções diferentes**: cada logo é contido na faixa do `[logo]`, sem distorção nem corte.
- **Injeção repetida no Main Container**: a reinjeção via roteador SPA não duplica estilos.

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root:petroleo] formacao
  [container:centralizado]
    [page-title:claro] 'Formação'

    [subsection:destaque] 'Acadêmica'
      [grid] {colunas: 1 → 2 @768}
        [card:amarelo] *@dados.academica
          [logo:faixa] $item.logo
          [header:card] $item.titulo
          [badge:pilula] $item.badge

    [subsection:destaque] 'Idiomas'
      [grid] {colunas: 1 → 2 @768 → 3 @1024}
        [card:amarelo] *@dados.idiomas
          [logo:faixa] $item.logo
          [header:card] $item.titulo

    [subsection:destaque] 'Treinamentos'
      [grid] {colunas: 1 → 2 @768 → 3 @1024}
        [card:amarelo] *@dados.treinamentos
          [logo:faixa] $item.logo
          [header:card] $item.titulo
          [badge:pilula] $item.badge
```

## 5. Textos

A página não possui textos longos.

## 6. Fontes de dados

| Referência           | Origem                                          | Campos usados                          |
|----------------------|-------------------------------------------------|----------------------------------------|
| @dados.academica     | pages/formacao/data/formacao.json#academica     | logo (src, alt), titulo, badge         |
| @dados.idiomas       | pages/formacao/data/formacao.json#idiomas       | logo (src, alt), titulo                |
| @dados.treinamentos  | pages/formacao/data/formacao.json#treinamentos  | logo (src, alt), titulo, badge         |

Conteúdo (ordem de exibição; logos em `/pages/formacao/assets/images/`):

| Fonte | Logo | Título | Selo |
|---|---|---|---|
| academica | `logo-estacio.png` (Estácio) | Superior em Ciência de Dados | 2024 a 2026 |
| academica | `logo-estacio-uniradial.png` (Estácio Uniradial) | Superior em Análise e Desenvolvimento de Sistemas | 2013 a 2016 |
| idiomas | `logo_ingles.png` (Inglês) | Inglês - Intermediário | — |
| idiomas | `logo_espanhol.png` (Espanhol) | Espanhol - Avançado | — |
| treinamentos | `logo_enap.png` (ENAP) | Estatística Descritiva, Probabilidades e Técnicas de Amostragem | 2024 |

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `pages/spa/formacao.astro` (e a cópia `pages/formacao/formacao.astro`), com a folha `pages/formacao/assets/css/formacao.css` gerada a partir de [estilos.md](../../catalog/estilos.md) contendo apenas os elementos e estilos usados na página (R-S02), os dados em `pages/formacao/data/formacao.json` e os logos em `pages/formacao/assets/images/`. Os elementos do catálogo são componentes compartilhados em `pages/spa/components/elementos/`.
- **FR-002**: A página DEVE ser renderizada dentro de `#page-content-host` pelo roteador SPA, via History API, sem recarregamento de página.
- **FR-003**: A composição da página DEVE seguir a seção 4 (Estrutura); a aparência de cada elemento é a do estilo indicado, conforme [estilos.md](../../catalog/estilos.md).
- **FR-004**: A página DEVE conter exatamente as 3 seções 'Acadêmica', 'Idiomas' e 'Treinamentos', nessa ordem.
- **FR-005**: Cada seção DEVE renderizar exatamente um card por item da sua fonte de dados, na ordem do arquivo; o selo só aparece quando o item tem `badge`.
- **FR-006**: O elemento raiz DEVE conter `id="page-content"`, `data-page-id="formacao"` e `data-page-title="Formação"`.
- **FR-007**: A página DEVE apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-008**: Os tamanhos de texto e os espaçamentos DEVEM se adaptar à largura disponível pela escala fluida (`scale.css`), respeitando limites mínimos e máximos.
- **FR-009**: O aumento do tamanho de fonte configurado nas preferências do navegador DEVE ampliar proporcionalmente os textos da página, sem sobreposição ou perda de conteúdo.

### 7.2 Key Entities

- Os elementos da página (`page-root`, `container`, `page-title`, `subsection`, `grid`, `card`, `logo`, `header`, `badge`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Formação** (dados): `logo` (`src`, `alt`), `titulo`, `badge?` — ver `pages/formacao/data/formacao.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: O tempo de renderização da página no Main Container é inferior a 150ms.
- **SC-002**: 100% dos elementos da página exibem a aparência do estilo indicado na seção 4, conforme [estilos.md](../../catalog/estilos.md).
- **SC-003**: A página apresenta as 3 seções com todos os itens das fontes de dados (2 acadêmicos, 2 idiomas, 1 treinamento).
- **SC-004**: Os grids seguem as colunas configuradas na seção 4 em cada faixa de largura, sem quebras de layout.
- **SC-005**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a página exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-006**: Em celular (largura aproximada de 375 pixels) e tablet (largura aproximada de 768 pixels), a página apresenta layout adaptado e legível, sem rolagem horizontal.

---

## 9. Assumptions

- O projeto segue a Constituição v2.0.0: Astro para estruturação estática, CSS3 puro e Vanilla JS.
- As fontes `Barlow Condensed` e `Barlow` são carregadas do Google Fonts (por `spa-layout.css` e `tokens.css`); a fonte monoespaçada de sistema (`Consolas`, `Courier New`, `monospace`) usada nos selos está disponível no navegador.
- A página não possui JavaScript próprio.

---

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: ao adicionar imagens ou logos em `pages/formacao/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../formacao/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/formacao/`).
  2. **Utilize SEMPRE o caminho absoluto** (ex: `/pages/formacao/assets/images/<arquivo>`).
  3. **Garanta que o arquivo exista fisicamente** em `pages/formacao/assets/images/`.
  4. **Valide a renderização** executando `npm run build` ao finalizar.
