# Feature Specification: Estrutura e Estilização da Página "Artigos" ('artigos.astro')

**Feature Branch**: '06-artigos'  
**Created**: 2026-11-04  
**Updated**: 2026-11-17  
**Status**: Atualizado / Planejado  

**Input**: User description: "Reescrever a especificação da página 'artigos.astro' utilizando rigorosamente o modelo estrutural do Google Spec Kit definido em 'spec_portfolio.md', refletindo fielmente todos os detalhes arquiteturais, visuais, estruturais e comportamentais implementados em 'artigos.html' ('artigos.astro'), 'artigos.css' e 'artigos.js'."

---

## 1. Objetivo

Este documento define de forma unificada a estrutura de apresentação, a hierarquia de páginas e roteamento aninhado em SPA, a organização detalhada dos elementos, a identidade visual, a tipografia, o layout em duas colunas, a responsividade, os estados visuais (padrão, hover, acordeão aberto e item selecionado), bem como os requisitos funcionais, cenários de teste e critérios de aceite da página de artigos técnicos (`artigos.astro`).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

Para garantir que a página de artigos e todos os artigos técnicos abertos a partir dos links finais (`.leaf`) sejam reconhecidos, carregados e renderizados dentro da área principal de exibição da SPA (`#page-content-host`) sem recarregamento completo da aplicação, fica estabelecida a seguinte hierarquia oficial de rotas e estrutura de fragmentos:

### 2.1 Árvore Hierárquica de Páginas e Assets de Artigos

```text
pages/
├── artigos.md
├── spa/
│   └── artigos.astro        (wrapper: importa o CSS e renderiza pages/artigos/artigos.astro)
└── artigos/
    ├── artigos.astro
    ├── assets/
    │   ├── css/
    │   │   └── artigos.css
    │   ├── images/          (sem imagens no momento; .gitkeep)
    │   └── js/
    │       └── artigos.js
    └── <slug-do-artigo>/
        └── <arquivo-do-artigo>
```

### 2.2 Contrato de Reconhecimento pelo Roteador SPA (`#page-content-host`)

A página principal de artigos (`artigos.astro`) e toda subpágina de artigo técnico situada sob `/spa/artigos/**` ou `/pages/artigos/**` DEVEM seguir o contrato de fragmento SPA para integração ao motor de navegação (`History API`):

1. **Contêiner Raiz Obrigatório**: O fragmento da página principal expõe o elemento raiz `#page-content` contendo:
   - `id="page-content"`
   - `class="page-content-wrapper artigos-page"` (`.artigos-page` é a classe de escopo de todos os estilos da página)
   - `data-page-id="artigos"`
   - `data-page-title="Artigos técnicos"`
2. **Importação Isolada de Assets**: O wrapper `pages/spa/artigos.astro` importa `../artigos/assets/css/artigos.css` no frontmatter (Constituição II). O código-fonte do comportamento reside em `pages/artigos/assets/js/artigos.js` e é emitido dentro do fragmento via `import artigosScript from './assets/js/artigos.js?raw'` + `<script is:inline type="module" set:html={artigosScript} />`, para que seja enviado ao navegador e re-executado pelo roteador SPA a cada injeção (um import de `.js` no frontmatter executaria apenas no build). Por residir sob `pages/`, o módulo exporta também `export function GET()` para compatibilidade com o roteamento baseado em arquivos do Astro.
3. **Interceptação e Redirecionamento de Artigos (`.leaf`)**:
   - Cada link final de artigo (`.leaf`) possui `href="#"` e o atributo `data-url="/spa/artigos/<slug>"`.
   - Ao clicar em um `.leaf`, o script `artigos.js` intercepta o evento (`e.preventDefault()`), aplica o feedback visual de seleção (classe `.selected` + marcador `✓`) e, após `150ms`, navega para o destino declarado em `data-url` através do roteador SPA, sem full page reload.

### 2.3 Descrição dos Elementos da Página

- `page-content-wrapper` (`#page-content`): Contêiner raiz do fragmento da página injetado no `#page-content-host`.
- `.app`: Contêiner principal centralizado (`max-width: 1200px`) que estrutura verticalmente cabeçalho, área de trabalho e rodapé.
- `header`: Área de cabeçalho superior da página contendo título, subtítulo e linha divisória decorativa.
  - `h1`: Título principal da página (`"Artigos técnicos"`).
  - `.intro`: Subtítulo orientativo da página (`"Seleciona o tema."`).
  - `.rule`: Linha horizontal divisória de `1px` com gradiente ciano decrescente.
- `main.workspace`: Área expansível (`flex: 1`) que abriga a grade de tópicos técnicos.
- `.topic-columns`: Grade principal CSS Grid de duas colunas (`repeat(2, minmax(0, 1fr))`) que distribui os 13 grupos temáticos.
- `.column`: Contêiner flex vertical (`flex-direction: column; gap: 16px`) representando cada uma das duas colunas (esquerda: grupos 1 a 6; direita: grupos 7 a 13).
- `.topic-group`: Card interativo em estilo *glassmorphism* escuro que agrupa um tema principal e seus respectivos artigos ou subgrupos.
- `.group-toggle`: Botão cabeçalho do card `.topic-group` que controla a expansão/recolhimento do acordeão (`aria-expanded`).
  - `.group-icon`: Ícone tipográfico/geométrico em destaque ciano (`#00e5ff`) à esquerda do título do grupo.
  - `.group-name`: Nome da categoria temática em fonte `'Oswald'`.
  - `.chevron`: Indicador direcional (`›`) alinhado à direita que rotaciona `90deg` quando o grupo está aberto.
- `.group-children`: Contêiner interno recolhível exibido quando `.topic-group` possui a classe `.open`.
- `.subgroup`: Subnível hierárquico expansível dentro de grupos complexos (`Deep Learning` e `Nuvem`).
  - `.subgroup-toggle`: Botão em formato pílula (`border-radius: 50px`) que alterna a visibilidade de `.subgroup-children` (`aria-expanded`).
  - `.subgroup-marker`: Marcador direcional (`›`) à esquerda do nome do subgrupo.
  - `.subgroup-name`: Título do subgrupo (ex.: `Redes Neurais Recorrentes`, `GCP`, `AWS`, `AZURE`).
  - `.subgroup-children`: Contêiner interno com guia visual lateral esquerda (`border-left: 2px solid rgba(0, 229, 255, 0.2)`).
- `.leaf-list`: Lista vertical em flexbox (`flex-direction: column`) contendo os links finais de artigos.
- `.leaf`: Item final clicável em formato pílula (`border-radius: 50px`) que representa um artigo específico e armazena sua rota em `data-url`.
  - `.leaf-bullet`: Marcador circular (`•`) em destaque ciano (`#00e5ff`).
  - `.check-mark`: Elemento `<span>` injetado dinamicamente via JavaScript com o símbolo `✓` quando o item `.leaf` é selecionado.
- `footer`: Rodapé da página separado por borda superior sutil contendo informações de copyright e lema institucional.
  - `.footer-motto`: Lema `"ANALISAR / CONSTRUIR / EVOLUIR"` com separadores `/` estilizados em ciano (`#00e5ff`).

### 2.4 Estrutura da Página

A página segue estritamente a árvore estrutural e o catálogo completo de 13 grupos temáticos, 4 subgrupos e 42 links de artigos (`data-url`) detalhados abaixo:

```text
artigos.astro (#page-content.page-content-wrapper.artigos-page)
└── .app
    ├── header
    │   ├── h1: 'Artigos técnicos'
    │   ├── p.intro: 'Seleciona o tema.'
    │   └── div.rule
    │
    ├── main.workspace
    │   └── .topic-columns
    │       ├── .column (Coluna Esquerda — Grupos 1 a 6)
    │       │   ├── .topic-group.open (Grupo 1 — aberto por padrão, aria-expanded='true')
    │       │   │   ├── .group-toggle (group-icon='▥', group-name='Análise de dados e BI')
    │       │   │   └── .group-children > .leaf-list
    │       │   │       ├── .leaf (text='Séries temporais', data-url='/spa/artigos/series_temporais')
    │       │   │       ├── .leaf (text='Gráficos', data-url='/spa/artigos/graficos')
    │       │   │       └── .leaf (text='KPIs', data-url='/spa/artigos/kpis')
    │       │   │
    │       │   ├── .topic-group (Grupo 2 — fechado por padrão, aria-expanded='false')
    │       │   │   ├── .group-toggle (group-icon='⚙', group-name='Engenharia de dados')
    │       │   │   └── .group-children > .leaf-list
    │       │   │       └── .leaf (text='Pipelines', data-url='/spa/artigos/pipelines')
    │       │   │
    │       │   ├── .topic-group (Grupo 3 — fechado por padrão, aria-expanded='false')
    │       │   │   ├── .group-toggle (group-icon='☧', group-name='Machine Learning')
    │       │   │   └── .group-children > .leaf-list
    │       │   │       ├── .leaf (text='Modelos de otimização', data-url='/spa/artigos/modelo_otimizacao')
    │       │   │       ├── .leaf (text='Sistemas de Recomendação', data-url='/spa/artigos/sistemas_recomendacao')
    │       │   │       └── .leaf (text='Aprendizado por Reforço', data-url='/spa/artigos/aprendizado_reforco')
    │       │   │
    │       │   ├── .topic-group (Grupo 4 — fechado por padrão, aria-expanded='false')
    │       │   │   ├── .group-toggle (group-icon='✣', group-name='Deep Learning')
    │       │   │   └── .group-children
    │       │   │       ├── .leaf-list
    │       │   │       │   ├── .leaf (text='Redes Neurais Artificiais (ANN)', data-url='/spa/artigos/redes_neurais_artificiais')
    │       │   │       │   └── .leaf (text='Processamento de Linguagem Natural (NLP)', data-url='/spa/artigos/processamento_linguagem_natural')
    │       │   │       └── .subgroup (fechado por padrão, aria-expanded='false')
    │       │   │           ├── .subgroup-toggle (subgroup-name='Redes Neurais Recorrentes')
    │       │   │           └── .subgroup-children > .leaf-list
    │       │   │               ├── .leaf (text='RNN', data-url='/spa/artigos/rnn')
    │       │   │               ├── .leaf (text='LSTM', data-url='/spa/artigos/lstm')
    │       │   │               └── .leaf (text='GRU', data-url='/spa/artigos/gru')
    │       │   │
    │       │   ├── .topic-group (Grupo 5 — fechado por padrão, aria-expanded='false')
    │       │   │   ├── .group-toggle (group-icon='◼', group-name='IA')
    │       │   │   └── .group-children > .leaf-list
    │       │   │       ├── .leaf (text='Agentes', data-url='/spa/artigos/agentes')
    │       │   │       ├── .leaf (text='Transformers e IA Generativa', data-url='/spa/artigos/transformers_ia_generativa')
    │       │   │       ├── .leaf (text='Prompt patterns', data-url='/spa/artigos/prompt_patterns')
    │       │   │       └── .leaf (text='GSK', data-url='/spa/artigos/gsk')
    │       │   │
    │       │   └── .topic-group (Grupo 6 — fechado por padrão, aria-expanded='false')
    │       │       ├── .group-toggle (group-icon='☁', group-name='Nuvem')
    │       │       └── .group-children
    │       │           ├── .subgroup (GCP — fechado por padrão, aria-expanded='false')
    │       │           │   ├── .subgroup-toggle (subgroup-name='GCP')
    │       │           │   └── .subgroup-children > .leaf-list
    │       │           │       ├── .leaf (text='Armazenamento de dados', data-url='/spa/artigos/gcp_armazenamento_dados')
    │       │           │       ├── .leaf (text='Integração e processamento', data-url='/spa/artigos/gcp_integracao_processamento')
    │       │           │       └── .leaf (text='Data warehouse e análise', data-url='/spa/artigos/gcp_data_warehouse_analise')
    │       │           ├── .subgroup (AWS — fechado por padrão, aria-expanded='false')
    │       │           │   ├── .subgroup-toggle (subgroup-name='AWS')
    │       │           │   └── .subgroup-children > .leaf-list
    │       │           │       ├── .leaf (text='Armazenamento de dados', data-url='/spa/artigos/aws_armazenamento_dados')
    │       │           │       ├── .leaf (text='Integração e processamento', data-url='/spa/artigos/aws_integracao_processamento')
    │       │           │       └── .leaf (text='Data warehouse e análise', data-url='/spa/artigos/aws_data_warehouse_analise')
    │       │           └── .subgroup (AZURE — fechado por padrão, aria-expanded='false')
    │       │               ├── .subgroup-toggle (subgroup-name='AZURE')
    │       │               └── .subgroup-children > .leaf-list
    │       │                   ├── .leaf (text='Armazenamento de dados', data-url='/spa/artigos/azure_armazenamento_dados')
    │       │                   ├── .leaf (text='Integração e processamento', data-url='/spa/artigos/azure_integracao_processamento')
    │       │                   └── .leaf (text='Data warehouse e análise', data-url='/spa/artigos/azure_data_warehouse_analise')
    │       │
    │       └── .column (Coluna Direita — Grupos 7 a 13)
    │           ├── .topic-group (Grupo 7 — fechado por padrão, aria-expanded='false')
    │           │   ├── .group-toggle (group-icon='☧', group-name='Conceitos')
    │           │   └── .group-children > .leaf-list
    │           │       ├── .leaf (text='Arquitetura medalhão', data-url='/spa/artigos/arquitetura_medalhao')
    │           │       ├── .leaf (text='Big Data', data-url='/spa/artigos/big_data')
    │           │       └── .leaf (text='ETL/ELT', data-url='/spa/artigos/etl_elt')
    │           │
    │           ├── .topic-group (Grupo 8 — fechado por padrão, aria-expanded='false')
    │           │   ├── .group-toggle (group-icon='▥', group-name='Apresentação')
    │           │   └── .group-children > .leaf-list
    │           │       ├── .leaf (text='Power BI', data-url='/spa/artigos/power_bi')
    │           │       └── .leaf (text='Tableau', data-url='/spa/artigos/tableau')
    │           │
    │           ├── .topic-group (Grupo 9 — fechado por padrão, aria-expanded='false')
    │           │   ├── .group-toggle (group-icon='‹›', group-name='Linguagens')
    │           │   └── .group-children > .leaf-list
    │           │       ├── .leaf (text='Python', data-url='/spa/artigos/python')
    │           │       ├── .leaf (text='R', data-url='/spa/artigos/r')
    │           │       └── .leaf (text='SQL', data-url='/spa/artigos/sql')
    │           │
    │           ├── .topic-group (Grupo 10 — fechado por padrão, aria-expanded='false')
    │           │   ├── .group-toggle (group-icon='▤', group-name='Databases e formatos de dados')
    │           │   └── .group-children > .leaf-list
    │           │       ├── .leaf (text='SQL Server', data-url='/spa/artigos/sql_server')
    │           │       ├── .leaf (text='Oracle', data-url='/spa/artigos/oracle')
    │           │       ├── .leaf (text='MySQL', data-url='/spa/artigos/mysql')
    │           │       ├── .leaf (text='PostgreSQL', data-url='/spa/artigos/postgresql')
    │           │       ├── .leaf (text='Parquet', data-url='/spa/artigos/parquet')
    │           │       └── .leaf (text='Delta Lake', data-url='/spa/artigos/delta_lake')
    │           │
    │           ├── .topic-group (Grupo 11 — fechado por padrão, aria-expanded='false')
    │           │   ├── .group-toggle (group-icon='±', group-name='Plataformas')
    │           │   └── .group-children > .leaf-list
    │           │       └── .leaf (text='Databricks', data-url='/spa/artigos/databricks')
    │           │
    │           ├── .topic-group (Grupo 12 — fechado por padrão, aria-expanded='false')
    │           │   ├── .group-toggle (group-icon='∑', group-name='Matemática')
    │           │   └── .group-children > .leaf-list
    │           │       └── .leaf (text='Estatística', data-url='/spa/artigos/estatistica')
    │           │
    │           └── .topic-group (Grupo 13 — fechado por padrão, aria-expanded='false')
    │               ├── .group-toggle (group-icon='☆', group-name='Outros')
    │               └── .group-children > .leaf-list
    │                   └── .leaf (text='GitHub', data-url='/spa/artigos/github')
    │
    └── footer
        ├── p: '© 2026 — Portfólio de Dados'
        └── p.footer-motto: 'ANALISAR <span>/</span> CONSTRUIR <span>/</span> EVOLUIR'
```

---

## 3. Identidade Visual

### 3.1. Paleta de Cores, Tipografia e Gradientes

- `.artigos-page` (`#page-content`; fundo base e tipografia da página — NÃO aplicar em `body`, para não vazar estilos para o shell da SPA):
  - `background`: `radial-gradient(circle at 50% 20%, #102636 0%, #070e14 100%)` com `background-attachment: fixed`
  - `font-family`: `'Roboto Condensed', sans-serif`
  - `font-size`: `15px`
  - `line-height`: `1.5`
  - `color`: `#e2f1f8`
- `header h1`:
  - Fonte: `'Oswald', sans-serif`
  - Peso: `600`
  - Tamanho: `clamp(28px, 3.5vw, 40px)`
  - Cor: `#ffffff`
  - Sombra de texto (`text-shadow`): `0 0 12px rgba(0, 229, 255, 0.2)`
- `header .intro`:
  - Tamanho: `15px`
  - Peso: `300`
  - Cor: `#88a9bc`
  - Largura máxima: `760px` | Margem: `10px 0 20px`
- `header .rule`:
  - Altura: `1px`
  - `background`: `linear-gradient(90deg, #00e5ff 0%, rgba(0, 229, 255, 0.15) 60%, transparent 100%)`
  - Margem inferior: `28px`
- `.topic-group`:
  - `background`: `rgba(10, 25, 38, 0.75)`
  - Efeito de vidro: `backdrop-filter: blur(8px)` (`-webkit-backdrop-filter: blur(8px)`)
  - Borda padrão: `1px solid rgba(0, 229, 255, 0.25)`
  - `border-radius`: `18px`
  - Sombra (`box-shadow`): `0 4px 20px rgba(0, 0, 0, 0.3)`
- `.group-icon`:
  - Cor: `#00e5ff`
  - Tamanho: `18px` | Largura fixa: `24px`
- `.group-name`:
  - Fonte: `'Oswald', sans-serif`
  - Peso: `500`
  - Tamanho: `17px`
  - Cor: `#e2f1f8`
- `.chevron`:
  - Cor padrão: `#88a9bc`
  - Tamanho: `18px`
- `.group-children`:
  - `background`: `rgba(4, 12, 18, 0.3)`
  - Borda superior: `1px solid rgba(0, 229, 255, 0.1)`
  - Padding: `6px 14px 14px 18px`
- `.subgroup-toggle`:
  - `background`: `transparent`
  - Borda: `1px solid rgba(0, 229, 255, 0.15)`
  - `border-radius`: `50px`
  - Cor: `#88a9bc`
  - Tamanho: `14px` | Padding: `8px 16px`
- `.subgroup-children`:
  - Borda lateral esquerda: `2px solid rgba(0, 229, 255, 0.2)`
  - Espaçamento: `margin-left: 14px; padding-left: 14px; margin-top: 6px;`
- `.leaf` (Estado Padrão):
  - `background`: `rgba(12, 30, 44, 0.6)`
  - Borda: `1px solid rgba(0, 229, 255, 0.15)`
  - `border-radius`: `50px`
  - Cor: `#b0d3e5`
  - Tamanho: `14px` | `letter-spacing: 0.02em` | Padding: `9px 16px` | Margem: `4px 0`
- `.leaf-bullet`:
  - Cor padrão: `#00e5ff`
- `footer`:
  - Borda superior: `1px solid rgba(0, 229, 255, 0.15)`
  - Margem superior: `48px` | Padding superior: `20px`
  - Texto (`footer p`): cor `#88a9bc`, tamanho `12px`
  - Lema (`.footer-motto span`): cor `#00e5ff`, `font-weight: bold`, margem `0 4px`

### 3.2. Grade de Colunas e Agrupamento

- O elemento `.topic-columns` deve utilizar CSS Grid com duas colunas de largura igual (`grid-template-columns: repeat(2, minmax(0, 1fr))`), espaçamento `gap: 16px` e alinhamento superior (`align-items: start`) para evitar esticamento vertical desigual entre cards adjacentes.
- Cada coluna (`.column`) empilha seus respectivos cards `.topic-group` com `display: flex; flex-direction: column; gap: 16px`.

### 3.3. Organização Interna do `.topic-group`

Cada card temático (`.topic-group`) organiza-se internamente em duas regiões verticais:

1. **Cabeçalho Acionável (`.group-toggle`)**: Botão de largura total (`min-height: 54px`, `padding: 14px 18px`) alinhado horizontalmente com ícone (`.group-icon`), título do tema (`.group-name`) e seta indicadora (`.chevron` com `margin-left: auto`).
2. **Área de Filhos Expansível (`.group-children`)**: Oculta por padrão (`display: none`) e revelada (`display: block`) quando `.topic-group` recebe a classe `.open`, exibindo diretamente a lista de artigos (`.leaf-list`) e/ou subgrupos recolhíveis (`.subgroup`).

### 3.4. Estado Padrão

- Apenas o Grupo 1 (`"Análise de dados e BI"`) inicia com a classe `.open` e `aria-expanded="true"`, exibindo seus 3 artigos (`Séries temporais`, `Gráficos`, `KPIs`).
- Os Grupos 2 a 13 e todos os 4 subgrupos (`Redes Neurais Recorrentes`, `GCP`, `AWS`, `AZURE`) iniciam recolhidos (`aria-expanded="false"`, `.group-children` e `.subgroup-children` com `display: none`).
- Todos os links `.leaf` iniciam sem a classe `.selected` e sem o elemento `.check-mark`.

### 3.5. Estados Hover, Aberto (`.open`) e Selecionado (`.selected`)

- **Hover no `.topic-group`**: Transição suave de borda (`0.2s ease`) para `border-color: rgba(0, 229, 255, 0.45)`.
- **Estado Aberto (`.topic-group.open`)**:
  - Borda destacada em ciano sólido: `border-color: #00e5ff`.
  - Brilho externo sutil: `box-shadow: 0 0 15px rgba(0, 229, 255, 0.15)`.
  - Rotação do `.chevron` (tanto em `.topic-group.open` quanto em `.subgroup.open`): `transform: rotate(90deg)` e cor `#00e5ff`.
- **Hover no `.subgroup-toggle`**: Fundo `rgba(20, 48, 70, 0.85)`, texto `#e2f1f8` e borda `rgba(0, 229, 255, 0.25)`.
- **Hover no `.leaf`**:
  - Deslocamento horizontal suave: `transform: translateX(3px)`.
  - Fundo: `rgba(20, 50, 72, 0.9)`.
  - Borda: `#00e5ff` | Cor do texto: `#ffffff`.
- **Estado Selecionado (`.leaf.selected`)**:
  - Fundo claro de alto contraste: `#dbeaf0`.
  - Borda: `#ffffff`.
  - Cor do texto e do `.leaf-bullet`: `#091a24` com `font-weight: 700`.
  - Sombra de destaque: `box-shadow: 0 0 12px rgba(255, 255, 255, 0.3)`.
  - Exibição de `<span class="check-mark">✓</span>` alinhado à direita (`margin-left: auto; font-weight: bold`).

### 3.6. Comportamento de Layout e Dimensionamento

- **Contêiner Principal (`.app`)**: Ocupa `width: 100%` até `max-width: 1200px`, centralizado horizontalmente, com `padding: 32px 36px`, `min-height: 100%` (relativo ao `#page-content-host`) e layout flex vertical (`display: flex; flex-direction: column`) para manter o `footer` ancorado na base da área útil.
- **Prevenção de Overflow Horizontal**: Uso de `minmax(0, 1fr)` nas colunas do grid e `box-sizing: border-box` global para impedir estouro lateral de conteúdo.

---

## 4. Responsividade

### 4.1. Breakpoints Principais

- **Desktop / Telas Largas (`> 850px`)**:
  - `.app`: `padding: 32px 36px`.
  - `.topic-columns`: 2 colunas (`repeat(2, minmax(0, 1fr))`), `gap: 16px`.
  - `footer`: Disposição horizontal (`display: flex; justify-content: space-between`).
- **Tablet / Mobile (`<= 850px`)**:
  - `.app`: `padding: 24px 20px`.
  - `.topic-columns`: Coluna única (`grid-template-columns: 1fr`), mantendo `gap: 16px`.
- **Mobile Estreito (`<= 540px`)**:
  - `footer`: Reorganiza-se em coluna vertical (`flex-direction: column; gap: 12px; align-items: flex-start`).

### 4.2. Ajustes Mobile

Para viewports com largura igual ou inferior a `850px` e `540px`:

- Os cards da coluna direita (Grupos 7 a 13) fluem naturalmente abaixo dos cards da coluna esquerda (Grupos 1 a 6) em coluna única.
- Todos os botões de acordeão (`.group-toggle`, `.subgroup-toggle`) e itens `.leaf` mantêm áreas de toque confortáveis sem provocar rolagem horizontal na página.

---

## 5. User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualização do Cabeçalho, Rodapé e Grid de Duas Colunas (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar o cabeçalho da página de artigos ("Artigos técnicos", subtítulo "Seleciona o tema." e linha divisória com gradiente ciano), o grid principal de duas colunas contendo os 13 grupos temáticos e o rodapé institucional.

- **Why this priority**: Estabelece a identidade visual, a estrutura de navegação temática e o enquadramento completo da página na SPA.
- **Independent Test**: Acessar a rota da página "Artigos" na SPA (`#page-content-host`) e verificar se o título "Artigos técnicos", o subtítulo `.intro`, a regra `.rule`, as 2 colunas (`.topic-columns`) com os 13 grupos e o `footer` são renderizados fielmente.

**Acceptance Scenarios**:
1. **Given** que o usuário navega para a página de Artigos na SPA, **When** o fragmento é injetado em `#page-content-host`, **Then** o elemento `#page-content` exibe o cabeçalho com `h1` em fonte `Oswald` (`clamp(28px, 3.5vw, 40px)`, cor `#ffffff`), subtítulo `.intro` (`"Seleciona o tema."`, `#88a9bc`) e linha `.rule` com gradiente ciano.
2. **Given** o layout principal em viewport `> 850px`, **When** renderizado, **Then** `.topic-columns` exibe 2 colunas (`repeat(2, minmax(0, 1fr))`, `gap: 16px`), distribuindo os grupos 1 a 6 na coluna esquerda e os grupos 7 a 13 na coluna direita.
3. **Given** o rodapé da página (`footer`), **When** renderizado, **Then** exibe `"© 2026 — Portfólio de Dados"` e o lema `"ANALISAR / CONSTRUIR / EVOLUIR"` com os caracteres `/` destacados em `#00e5ff`.

### User Story 2 - Interação de Acordeão em Grupos e Subgrupos (Priority: P1)

Como avaliador ou entusiasta de dados, desejo expandir e recolher os cards de grupos de tópicos (`.topic-group`) e seus subgrupos internos (`Redes Neurais Recorrentes`, `GCP`, `AWS`, `AZURE`) por meio de cliques com transição visual suave, atualização de acessibilidade (`aria-expanded`) e rotação do indicador `.chevron`.

- **Why this priority**: Permite explorar uma taxonomia extensa de 42 artigos técnicos de forma limpa, progressiva e organizada.
- **Independent Test**: Carregar a página, confirmar que apenas o Grupo 1 ("Análise de dados e BI") inicia aberto, clicar em outros `.group-toggle` e `.subgroup-toggle` e validar a alternância da classe `.open`, do atributo `aria-expanded` e da rotação de `90deg` do `.chevron`.

**Acceptance Scenarios**:
1. **Given** o carregamento inicial da página, **When** renderizada, **Then** o Grupo 1 (`"Análise de dados e BI"`) inicia com `.topic-group.open` e `aria-expanded="true"`, enquanto os demais 12 grupos e os 4 subgrupos iniciam fechados (`aria-expanded="false"`).
2. **Given** o clique em um `.group-toggle` ou `.subgroup-toggle`, **When** acionado, **Then** o evento não propaga indevidamente (`e.stopPropagation()`), a classe `.open` é alternada no elemento pai (`.topic-group` ou `.subgroup`), `aria-expanded` alterna entre `"true"` e `"false"` e o `.chevron` rotaciona `90deg` assumindo a cor `#00e5ff`.

### User Story 3 - Seleção de Artigos (`.leaf`), Feedback Visual e Navegação (Priority: P2)

Como usuário navegando pelos artigos, desejo clicar em qualquer subitem (`.leaf`) para receber feedback visual imediato de seleção (estado `.selected` em alto contraste e marca `✓`) e ser direcionado para a URL do artigo definida em `data-url`.

- **Why this priority**: Conecta a árvore de navegação temática aos artigos técnicos individuais com retorno visual claro ao usuário.
- **Independent Test**: Clicar em um item `.leaf` (ex.: `Séries temporais`), confirmar que seleções anteriores são limpas, que o item clicado recebe `.selected` e `<span class="check-mark">✓</span>`, e que após `150ms` ocorre o redirecionamento para o valor de `data-url`.

**Acceptance Scenarios**:
1. **Given** os links finais `.leaf`, **When** o cursor passa sobre um item (`:hover`), **Then** o item desliza `3px` à direita (`translateX(3px)`), realça a borda para `#00e5ff` e altera a cor do texto para `#ffffff`.
2. **Given** o clique em um `.leaf`, **When** acionado, **Then** previne a navegação padrão do `href="#"` (`e.preventDefault()`), remove `.selected` e `.check-mark` de qualquer outro item, adiciona `.selected` (fundo `#dbeaf0`, texto `#091a24` em negrito) e `<span class="check-mark">✓</span>` ao item clicado, e navega via roteador SPA para `data-url` após `150ms`, sem recarregar a página.

### User Story 4 - Layout Responsivo para Tablets e Smartphones (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que o layout de artigos se adapte automaticamente para coluna única e ajuste seus espaçamentos internos e o rodapé para telas estreitas.

- **Why this priority**: Assegura legibilidade e usabilidade sem quebras de layout em dispositivos móveis.
- **Independent Test**: Redimensionar a viewport para `<= 850px` e `<= 540px`, verificando a conversão para 1 coluna e o empilhamento do rodapé.

**Acceptance Scenarios**:
1. **Given** viewport com largura `<= 850px`, **When** renderizada, **Then** `.app` ajusta o padding para `24px 20px` e `.topic-columns` reorganiza-se em 1 coluna (`grid-template-columns: 1fr`).
2. **Given** viewport com largura `<= 540px`, **When** renderizada, **Then** `footer` reorganiza seus elementos em coluna (`flex-direction: column; gap: 12px; align-items: flex-start`).

---

## 6. Arquitetura & Estrutura de Arquivos

### 6.1. Integração SPA & Estrutura DOM

- **FR-001**: A página de artigos DEVE ser organizada estritamente na estrutura de arquivos e diretórios do projeto:
  - Página de conteúdo/metadados: `pages/artigos.md`
  - Componente Astro principal e rota SPA: `pages/artigos/artigos.astro` e `pages/spa/artigos.astro` (este último como wrapper fino que importa o CSS no frontmatter e renderiza o componente)
  - Folha de estilos isolada: `pages/artigos/assets/css/artigos.css`
  - Módulo JavaScript client-side: `pages/artigos/assets/js/artigos.js`
  - Diretório de imagens/ícones estáticos: `pages/artigos/assets/images/`
- **FR-002**: A página DEVE ser injetada e renderizada 100% dentro do Main Container (`#page-content-host`) da SPA via History API sem full page reload, expondo no elemento raiz os atributos obrigatórios `id="page-content"`, `class="page-content-wrapper artigos-page"`, `data-page-id="artigos"` e `data-page-title="Artigos técnicos"`.

### 6.2. Lógica de Acordeão, Seleção de Artigos e Ciclo de Vida na SPA

- **FR-003**: O módulo `artigos.js` DEVE implementar a função idempotente `initArtigosPage()` utilizando o marcador `dataset.listenerAttached = 'true'` em todos os controles `.group-toggle`, `.subgroup-toggle` e `.leaf` para evitar duplicação de event listeners durante transições SPA.
- **FR-003.1**: **Ciclo de Vida e Compatibilidade Astro**: O script `artigos.js` DEVE ser entregue ao navegador como `<script is:inline type="module">` dentro de `#page-content` (conteúdo importado via `?raw`, ver §2.2.2) e inicializar tanto no carregamento tradicional do DOM (`DOMContentLoaded` ou execução imediata quando `document.readyState !== 'loading'`) quanto no evento customizado de navegação da SPA (`window.addEventListener('spa:page-loaded', ...)`, registrado uma única vez), além de exportar `export function GET()` retornando JSON `{ module: 'artigos' }` para compatibilidade com o roteamento baseado em arquivos do Astro.
- **FR-003.2**: **Comportamento de Clique nos Artigos (`.leaf`)**: Ao acionar um `.leaf`, o script DEVE limpar a classe `.selected` e remover `.check-mark` de todos os irmãos, aplicar `.selected` ao item clicado, anexar `<span class="check-mark">✓</span>` e, após `150ms` (`setTimeout`), navegar para o valor de `data-url` via roteador SPA — criando uma âncora temporária `<a href="<data-url>">` e acionando `.click()`, interceptada pelo listener delegado global — sem full page reload. Um novo clique em `.leaf` antes do fim dos `150ms` cancela a navegação pendente (`clearTimeout`), de modo que apenas o último artigo selecionado é aberto. Rotas ainda inexistentes exibem o fallback 404 da SPA dentro de `#page-content-host`.
- **FR-003.3**: **Fidelidade ao Catálogo Temático**: A implementação DEVE manter exatamente os 13 grupos temáticos, os 4 subgrupos (`Redes Neurais Recorrentes`, `GCP`, `AWS`, `AZURE`) e os 42 itens `.leaf` com suas respectivas rotas `/spa/artigos/<slug>` conforme especificado na Seção 2.4.

### 6.3. Convenções de Resolução de Assets

- **FR-004**: Ao referenciar imagens ou assets estáticos em páginas dentro de `pages/artigos/`:
  1. **NÃO utilizar caminhos relativos** (como `./assets/...` ou `../artigos/assets/...`), pois falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex.: `/spa/artigos/`).
  2. **Utilizar SEMPRE caminhos absolutos POSIX** iniciados por `/` baseados na raiz do servidor estático do Astro (ex.: `/pages/artigos/assets/images/<arquivo>`).
  3. **Garantir que os arquivos de imagem existam fisicamente** no diretório `pages/artigos/assets/images/`.
  4. **Validar a renderização e o empacotamento** executando `npm run build` ao finalizar.

---

## 7. Success Criteria *(measurable)*

- **SC-001**: **Desempenho SPA**: A página de Artigos é injetada e renderizada no Main Container (`#page-content-host`) em menos de `150ms` sem recarregamento completo do navegador.
- **SC-002**: **Fidelidade Visual e Taxonômica**: 100% dos elementos visuais, tokens de cor/tipografia, 13 grupos temáticos, 4 subgrupos e 42 artigos (`data-url`) especificados na Seção 2.4 são renderizados fielmente, com o Grupo 1 aberto por padrão.
- **SC-003**: **Interatividade Idempotente e Feedback Visual**: 100% dos cliques em `.group-toggle` e `.subgroup-toggle` alternam `.open` e `aria-expanded` sem duplicação de listeners após múltiplas navegações SPA, e 100% dos cliques em `.leaf` exibem `.selected` + `✓` antes do redirecionamento em `150ms`.
- **SC-004**: **Isolamento de Assets, Responsividade & Build**: CSS e JS permanecem estritamente isolados em `pages/artigos/assets/`, os breakpoints de `850px` e `540px` adaptam o layout sem overflow horizontal nenhuma regra CSS afeta elementos fora de `.artigos-page` (sidebar e breadcrumbs inalterados) e `npm run build` compila sem erros.