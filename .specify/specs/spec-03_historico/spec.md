# Feature Specification: Estrutura da Página "Histórico" (`historico.astro`)

**Feature Branch**: `03-historico`

**Created**: 2026-11-04 (Updated: 2026-11-20 — migração para o modelo em camadas)

**Status**: Em Execução

**Input**: User description: "Implementar a página Histórico Profissional no portfólio pessoal, destinada à apresentação estruturada e detalhada das experiências profissionais do proprietário do site.

A página deverá apresentar cards individuais para cada experiência profissional, contendo identificação da empresa, logotipo, cargo ocupado, período de atuação, duração, modalidade de contratação, área de atuação, descrição das atividades desenvolvidas e respectivas tecnologias e habilidades utilizadas.

A apresentação deverá priorizar a clareza, a organização das informações e a identidade visual do portfólio, permitindo que recrutadores, gestores técnicos e potenciais clientes compreendam rapidamente a trajetória profissional, as responsabilidades assumidas e as competências técnicas do profissional.

A página deverá ser integrada à arquitetura existente da Single Page Application (SPA), sendo carregada dinamicamente no contêiner principal de conteúdo, sem recarregamento completo da aplicação e sem interferir na estrutura permanente de navegação.

O layout deverá ser responsivo, garantindo uma apresentação adequada em desktops, tablets e dispositivos móveis, mantendo a legibilidade e a organização dos cards e de suas informações."

---

## 1. Objetivo

Este documento define de forma unificada a página "Histórico Profissional": o roteamento e a organização de arquivos na SPA, a composição da página (elementos, hierarquia e fontes de dados), os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4. O registro da migração para este modelo está em [migracao.md](migracao.md).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

A página "Histórico" é exibida dentro da área de exibição (`#page-content-host`) ao acessar `/spa/historico`, e mantém o item "Histórico" ativo no menu lateral (mapeamento `ROUTE_PARENT_MAP` em `pages/spa/assets/js/router.js`). O ponto de entrada da SPA é `pages/spa/historico.astro`; `pages/historico/historico.astro` é a cópia da página no diretório da feature. A página não possui subpáginas aninhadas; os recursos exclusivos dela ficam organizados na seguinte estrutura:

### 2.1 Árvore Hierárquica de Páginas da Histórico

```text
pages/historico/
├── historico.astro
├── assets/
│   ├── css/
│   │   └── historico.css
│   └── images/
│       ├── logo_arezzo.png
│       ├── logo_cvc.png
│       ├── logo_frete.png
│       ├── logo_submarino.png
│       └── logo_verity.png
└── data/
    └── historico.json
```

Recursos compartilhados usados pela página (fora de `pages/historico/`):

```text
pages/spa/
├── historico.astro                  ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala
│   └── tokens.css                   ← tokens visuais
└── components/elementos/            ← componentes dos elementos do catálogo
```

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Visualização da Página de Histórico (Priority: P1)

Como recrutador ou visitante do portfólio, desejo visualizar a página de Histórico Profissional com título em destaque, para entender que ela apresenta a trajetória profissional de Sérgio Ribeiro Cerqueira.

**Why this priority**: Estabelece o arranjo estrutural e a identidade da página.

**Independent Test**: Acessar a rota da página "Histórico" na SPA. Verificar se a página corresponde à seção 4 (Estrutura): `[page-root]` e `[container]` com os estilos indicados e o título "Histórico Profissional".

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Histórico na SPA, **When** o conteúdo é carregado em `#page-content-host`, **Then** a área inteira exibe o fundo do estilo do `[page-root]` definido na seção 4.
2. **Given** telas mais largas que o limite do `[container]`, **When** a página é exibida, **Then** o conteúdo fica centralizado com a largura máxima do estilo do `[container]`.
3. **Given** o topo da página, **When** inspecionado, **Then** existe um único `h1.page-title` com o texto "Histórico Profissional", no estilo indicado na seção 4.

---

### 3.2 User Story 2 - Cards de Experiência Profissional (Priority: P1)

Como gestor técnico ou recrutador, desejo ver cada experiência profissional em um card com empresa, cargo, informações do vínculo, descrição das atividades e stack utilizada, para avaliar rapidamente a trajetória e as competências.

**Why this priority**: É o conteúdo central da página.

**Independent Test**: Verificar se a lista exibe um `[card]` para cada item de `@dados.experiencias` (seção 6), na ordem do arquivo, com logo, cargo, selos, descrição e bloco de stack.

**Acceptance Scenarios**:

1. **Given** a fonte `@dados.experiencias`, **When** a lista é renderizada, **Then** é gerado exatamente um card por experiência, na ordem do arquivo (da mais recente para a mais antiga).
2. **Given** um card, **When** renderizado, **Then** exibe, nesta ordem: logo da empresa (`[logo]`), cargo (`[header:card]`, `h3`), selos de período, duração, vínculo, modalidade e setor, descrição das atividades e o bloco "Stack tecnológica…" (`[panel]` com título `h4`).
3. **Given** os selos de informação de uma experiência, **When** exibidos, **Then** aparecem na ordem do arquivo e quebram para a linha seguinte quando falta espaço.
4. **Given** o bloco de stack, **When** exibido, **Then** cada habilidade aparece como selo, na ordem do arquivo, com o estilo `ardosia` quando for hard e `turquesa` quando for soft.

---

### 3.3 User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Histórico" carregue sem recarregar a Sidebar, atualizando os Breadcrumbs para refletir a localização "Histórico".

**Why this priority**: Assegura a consistência de navegação Single Page Application.

**Independent Test**: Navegar para "Histórico" a partir de qualquer outra página da SPA. Verificar se o roteador injeta o conteúdo no `#page-content-host` e atualiza os Breadcrumbs sem recarregar a página.

**Acceptance Scenarios**:

1. **Given** a navegação via clique no menu da Sidebar ou link interno, **When** a rota `/spa/historico/` é requisitada, **Then** o roteador SPA intercepta o evento e injeta o conteúdo de `#page-content` em `#page-content-host`.
2. **Given** a injeção do conteúdo, **When** a renderização se completa, **Then** os Breadcrumbs exibem "Histórico" como ativo e a Sidebar mantém o item "Histórico" selecionado.

---

### 3.4 User Story 4 - Adaptabilidade Responsiva (Priority: P2)

Como usuário acessando por tablet ou smartphone, desejo que os cards e suas informações se ajustem à largura da tela sem perda de legibilidade.

**Why this priority**: Assegura usabilidade em dispositivos móveis e tablets.

**Independent Test**: Exibir a página em larguras de celular, tablet e desktop. Verificar se os textos se ajustam pela escala fluida (`scale.css`) e se os selos quebram linha dentro do card.

**Acceptance Scenarios**:

1. **Given** qualquer largura, **When** a página é exibida, **Then** os cards ocupam a largura do `[container]`, um abaixo do outro, e os selos quebram linha sem transbordar.
2. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a página é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** os cards apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
3. **Given** o acesso por celular (largura aproximada de 375 pixels) ou tablet (largura aproximada de 768 pixels), **When** a página é exibida, **Then** os cards se apresentam adaptados à tela e legíveis, sem rolagem horizontal.
4. **Given** que o usuário aumentou o tamanho de fonte padrão nas preferências do navegador, **When** a página é exibida, **Then** cargos, selos e descrições são ampliados proporcionalmente, sem sobreposição ou perda de conteúdo.

---

### 3.5 Edge Cases

- **Selos longos** (ex.: "e-commerce de turismo"): quebram para a linha seguinte, sem transbordar o card.
- **Stack extensa**: os selos ocupam quantas linhas forem necessárias dentro do bloco.
- **Logos com proporções diferentes**: cada logo é contido na faixa do `[logo]`, sem distorção nem corte.
- **Injeção repetida no Main Container**: a reinjeção via roteador SPA não duplica estilos.

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root:petroleo] historico {titulo: 'Histórico'}
  [container:centralizado]
    [page-title:claro] 'Histórico Profissional'

    [vertical-list:amplo]
      [card:amarelo] *@dados.experiencias
        [logo:faixa] $item.logo
        [header:card] $item.cargo
        [vertical-list:amplo]
          [tag-list]
            [badge:pilula] *$item.badges
          [paragraph:escuro] $item.descricao
          [panel:claro]
            [header:card] 'Stack tecnológica e outras habilidades utilizadas nesta experiencia'
            [tag-list]
              [badge:$item.estilo] *$item.stack
```

## 5. Textos

As descrições das experiências fazem parte dos dados (`descricao` em `@dados.experiencias`); a página não possui outros textos longos.

## 6. Fontes de dados

| Referência             | Origem                                | Campos usados |
|------------------------|---------------------------------------|---------------|
| @dados.experiencias    | pages/historico/data/historico.json   | logo (src, alt), cargo, badges[], descricao, stack[] (nome, estilo: `ardosia` = hard · `turquesa` = soft) |

Experiências (ordem de exibição; logos em `/pages/historico/assets/images/`; textos completos no arquivo):

| # | Empresa (logo) | Cargo | Selos | Stack |
|---|---|---|---|---|
| 1 | Frete.com (`logo_frete.png`) | Analista de BI | maio 2025 a março 2026 · 10 meses · PJ · Remoto · Logística | 12 hard |
| 2 | Verity Consultoria em Tecnologia (`logo_verity.png`) | Analista de BI | março 2023 a março 2025 · 2 anos · CLT · Remoto · Seguros | 11 hard · 2 soft |
| 3 | Arezzo&Co (`logo_arezzo.png`) | Analista de dados | janeiro 2021 a outubro 2022 · 1 ano e 6 meses · PJ · Remoto · Varejo | 8 hard |
| 4 | CVC Viagens e Turismo (`logo_cvc.png`) | Especialista em TI | janeiro 2018 a janeiro 2021 · 3 anos · CLT · Presencial · e-commerce de turismo | 5 hard |
| 5 | Submarino e B2W Digital (`logo_submarino.png`) | Analista de dados | janeiro 2015 a dezembro 2017 · 3 anos · PJ · Presencial · ecommerce | 8 hard |

### 6.1 Pendências de revisão de conteúdo

O conteúdo acima é o que a página exibe hoje. Os pontos abaixo divergem da versão anterior desta spec e serão tratados na revisão geral de conteúdo das páginas:
- Stack da CVC: a versão anterior listava Oracle EBS, SQL, Excel, Grafana, Zabbix, Python, AWS CloudWatch, Power BI, PowerPoint, Jira e Scrum.
- Stack da Submarino: a versão anterior listava SQL Server, Oracle, Excel e C#; hoje repete a da Arezzo.
- Descrição da Submarino: repete o texto da Arezzo.
- `logo_frete.jpg` existe na pasta de imagens, mas não é usado.

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `pages/spa/historico.astro` (e a cópia `pages/historico/historico.astro`), com a folha `pages/historico/assets/css/historico.css` gerada a partir de [estilos.md](../../catalog/estilos.md) contendo apenas os elementos e estilos usados na página (R-S02), os dados em `pages/historico/data/historico.json` e os logos em `pages/historico/assets/images/`. Os elementos do catálogo são componentes compartilhados em `pages/spa/components/elementos/`.
- **FR-002**: A página DEVE ser injetada em `#page-content-host` pelo roteador SPA, via History API, sem recarregar a página.
- **FR-003**: A composição da página DEVE seguir a seção 4 (Estrutura); a aparência de cada elemento é a do estilo indicado, conforme [estilos.md](../../catalog/estilos.md).
- **FR-004**: A lista DEVE renderizar exatamente um card por item de `@dados.experiencias`, na ordem do arquivo, com selos e stack também na ordem do arquivo.
- **FR-005**: Cada habilidade da stack DEVE usar o estilo indicado no próprio dado (`ardosia` para hard, `turquesa` para soft).
- **FR-006**: O elemento raiz DEVE conter `id="page-content"`, `data-page-id="historico"` e `data-page-title="Histórico"`.
- **FR-007**: A página DEVE apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-008**: Os tamanhos de texto e os espaçamentos DEVEM se adaptar à largura disponível pela escala fluida (`scale.css`), respeitando limites mínimos e máximos.
- **FR-009**: O aumento do tamanho de fonte configurado nas preferências do navegador DEVE ampliar proporcionalmente os textos da página, sem sobreposição ou perda de conteúdo.

### 7.2 Key Entities

- Os elementos da página (`page-root`, `container`, `page-title`, `vertical-list`, `card`, `logo`, `header`, `tag-list`, `badge`, `paragraph`, `panel`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Experiência** (dados): `logo` (`src`, `alt`), `cargo`, `badges[]`, `descricao`, `stack[]` (`nome`, `estilo`) — ver `pages/historico/data/historico.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: O tempo de renderização da página no Main Container é inferior a 150ms.
- **SC-002**: 100% dos elementos da página exibem a aparência do estilo indicado na seção 4, conforme [estilos.md](../../catalog/estilos.md).
- **SC-003**: 100% das experiências, selos e habilidades de `@dados.experiencias` aparecem na página, na ordem do arquivo, com hard e soft distinguíveis.
- **SC-004**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a página exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-005**: Em celular (largura aproximada de 375 pixels) e tablet (largura aproximada de 768 pixels), a página apresenta layout adaptado e legível, sem rolagem horizontal.

---

## 9. Assumptions

- O projeto segue a Constituição v2.0.0: Astro para estruturação estática, CSS3 puro e Vanilla JS.
- As fontes `Barlow Condensed` e `Barlow` são carregadas do Google Fonts (por `spa-layout.css` e `tokens.css`); a fonte monoespaçada de sistema (`Consolas`, `Courier New`, `monospace`) usada nos selos está disponível no navegador.
- A página não possui JavaScript próprio.

---

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: ao adicionar imagens ou logos em `pages/historico/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../historico/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/historico/`).
  2. **Utilize SEMPRE o caminho absoluto** (ex: `/pages/historico/assets/images/<arquivo>`).
  3. **Garanta que o arquivo exista fisicamente** em `pages/historico/assets/images/`.
  4. **Valide a renderização** executando `npm run build` ao finalizar.
