# Feature Specification: Estrutura da Página "Meus Contatos" (`contatos.astro`)

**Feature Branch**: `07-contatos`

**Created**: 2026-11-03 (Updated: 2026-11-20 — migração para o modelo em camadas)

**Status**: Em Execução

**Input**: Criar a página "Meus Contatos" (`contatos.astro`), apresentando os canais de comunicação e redes profissionais em uma grade responsiva de cartões clicáveis, integrada dinamicamente na SPA.

---

## 1. Objetivo

Este documento define de forma unificada a página "Meus Contatos": o roteamento e a organização de arquivos na SPA, a composição da página (elementos, hierarquia e fontes de dados), os cenários de teste, os requisitos funcionais e os critérios de aceite. O HTML e a aparência de cada elemento não são descritos aqui: vêm do catálogo [elementos.md](../../catalog/elementos.md) e da spec [estilos.md](../../catalog/estilos.md), referenciados na seção 4. O registro da migração para este modelo está em [migracao.md](migracao.md).

---

## 2. Hierarquia de Páginas e Roteamento Aninhado na SPA

A página "Meus Contatos" é exibida dentro da área de exibição (`#page-content-host`) ao acessar `/spa/contatos`, e mantém o item "Contatos" ativo no menu lateral (mapeamento `ROUTE_PARENT_MAP` em `pages/spa/assets/js/router.js`). O ponto de entrada da SPA é `pages/spa/contatos.astro`; `pages/contatos/contatos.astro` é a cópia da página no diretório da feature. A página não possui subpáginas aninhadas; os recursos exclusivos dela ficam organizados na seguinte estrutura:

### 2.1 Árvore Hierárquica de Páginas da Contatos

```text
pages/contatos/
├── contatos.astro
├── assets/
│   ├── css/
│   │   └── contatos.css
│   └── images/
│       ├── github.svg
│       ├── linkedin.svg
│       ├── mail.svg
│       └── phone.svg
└── data/
    └── contatos.json
```

Recursos compartilhados usados pela página (fora de `pages/contatos/`):

```text
pages/spa/
├── contatos.astro                   ← ponto de entrada na SPA
├── assets/css/
│   ├── scale.css                    ← tokens de escala
│   └── tokens.css                   ← tokens visuais
└── components/elementos/            ← componentes dos elementos do catálogo
```

---

## 3. User Scenarios & Testing *(mandatory)*

### 3.1 User Story 1 - Visualização da Página de Contatos (Priority: P1)

Como recrutador, gestor técnico ou visitante do portfólio, desejo visualizar a página de contatos com o título "Meus Contatos", para identificar claramente o propósito da página.

**Why this priority**: Estabelece a identidade e a estrutura principal da seção de comunicação.

**Independent Test**: Acessar a rota `/spa/contatos/`. Verificar se a página corresponde à seção 4 (Estrutura): `[page-root]` com o estilo indicado e o título "Meus Contatos".

**Acceptance Scenarios**:

1. **Given** que o usuário navega para a página de Contatos na SPA, **When** o conteúdo carrega, **Then** a área inteira exibe o fundo do estilo do `[page-root]` definido na seção 4.
2. **Given** o topo da página, **When** inspecionado, **Then** existe um único `h1.page-title` com o texto "Meus Contatos", no estilo indicado na seção 4.

---

### 3.2 User Story 2 - Cartões de Contato (Priority: P1)

Como avaliador ou cliente potencial, desejo ver todos os canais de contato em uma grade de cartões clicáveis, para acessar diretamente o canal que preferir.

**Why this priority**: Garante acesso direto e estruturado a todos os canais de comunicação configurados.

**Independent Test**: Verificar se a grade exibe um `[link-card]` para cada item de `@dados.contatos` (seção 6), com ícone, rótulo, valor, detalhe (quando houver) e seta, e se cada cartão leva ao destino correto.

**Acceptance Scenarios**:

1. **Given** a fonte `@dados.contatos`, **When** a grade é renderizada, **Then** é gerado exatamente um cartão por item, na ordem do arquivo.
2. **Given** um cartão cujo destino é `http(s)`, **When** clicado, **Then** o destino abre em nova aba (`target="_blank"`, `rel="noopener noreferrer"`).
3. **Given** um cartão `tel:` ou `mailto:`, **When** clicado, **Then** o destino abre na mesma aba (discador ou cliente de e-mail).
4. **Given** o ponteiro sobre um cartão, **When** em hover, **Then** o cartão apresenta o comportamento de hover descrito na ficha de `link-card` em [elementos.md](../../catalog/elementos.md).

---

### 3.3 User Story 3 - Integração SPA e Navegação sem Recarregamento (Priority: P2)

Como visitante navegando pela SPA, desejo que a página "Contatos" carregue sem recarregar a estrutura global, atualizando os Breadcrumbs e o estado da Sidebar.

**Why this priority**: Assegura a consistência de navegação Single Page Application.

**Independent Test**: Acionar o link de Contatos na navegação. Verificar a injeção do conteúdo em `#page-content-host` e a atualização dos Breadcrumbs sem recarregar a página.

**Acceptance Scenarios**:

1. **Given** o clique em um link para a rota `/spa/contatos/`, **When** a requisição é interceptada pelo roteador SPA, **Then** o conteúdo de `#page-content` é injetado em `#page-content-host`.
2. **Given** a renderização concluída, **When** inspecionado o topo do Main Container, **Then** o Breadcrumb indica "Meus Contatos" e o item "Contatos" da Sidebar permanece selecionado.

---

### 3.4 User Story 4 - Adaptabilidade Responsiva (Priority: P2)

Como usuário acessando via smartphone ou tablet, desejo que a grade de contatos e a tipografia se ajustem à largura da tela.

**Why this priority**: Garante acessibilidade e usabilidade em qualquer dispositivo.

**Independent Test**: Exibir a página abaixo de 768px e a partir de 768px. Verificar se a grade segue a configuração responsiva da seção 4 e se os textos se ajustam pela escala fluida (`scale.css`).

**Acceptance Scenarios**:

1. **Given** cada faixa de largura (< 768px, ≥ 768px), **When** a página é redimensionada, **Then** a grade assume o número de colunas configurado na seção 4 para aquela faixa.
2. **Given** valores longos (URLs de LinkedIn e GitHub), **When** exibidos em telas estreitas, **Then** quebram dentro do cartão, sem rolagem horizontal.
3. **Given** o navegador em 100% de zoom e o sistema operacional em escala de exibição de 100%, 125% ou 150%, **When** a página é exibida em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, **Then** o título e os cartões apresentam textos e espaçamentos equilibrados, sem rolagem horizontal.
4. **Given** o acesso por celular (largura aproximada de 375 pixels) ou tablet (largura aproximada de 768 pixels), **When** a página é exibida, **Then** os cartões se apresentam adaptados à tela e legíveis, sem rolagem horizontal.
5. **Given** que o usuário aumentou o tamanho de fonte padrão nas preferências do navegador, **When** a página é exibida, **Then** rótulos, valores e detalhes são ampliados proporcionalmente, sem sobreposição ou perda de conteúdo.

---

### 3.5 Edge Cases

- **Contato sem detalhe**: o cartão omite a linha de detalhe, sem deixar espaço vazio.
- **Valores longos sem espaço** (URLs): quebram em qualquer ponto para não transbordar o cartão.
- **Ícone indisponível**: a moldura do ícone mantém o tamanho, sem desalinhar o texto.
- **Injeção repetida no Main Container**: a reinjeção via roteador SPA não duplica estilos.

---

## 4. Estrutura

> Notação: [.specify/catalog/notacao-estrutura.md](../../catalog/notacao-estrutura.md) ·
> Elementos: [.specify/catalog/elementos.md](../../catalog/elementos.md) ·
> Estilos: [.specify/catalog/estilos.md](../../catalog/estilos.md)

```
[page-root:petroleo] contatos
  [page-title:claro] 'Meus Contatos'

  [grid] {colunas: 1 → 2 @768}
    [link-card:ciano] *@dados.contatos
```

## 5. Textos

A página não possui textos longos.

## 6. Fontes de dados

| Referência      | Origem                                | Campos usados                          |
|-----------------|---------------------------------------|----------------------------------------|
| @dados.contatos | pages/contatos/data/contatos.json     | rotulo, valor, detalhe?, href, icone   |

Conteúdo de `@dados.contatos` (ordem de exibição):

| rotulo | valor | detalhe | href |
|---|---|---|---|
| Telefone / WhatsApp | (11) 98368-0639 | — | `tel:+5511983680639` |
| E-mail | Sergio.rib@live.com | — | `mailto:Sergio.rib@live.com` |
| LinkedIn | https://www.linkedin.com/in/sergio-ribeiro-cerqueira | Conecte-se comigo profissionalmente | mesmo do valor |
| GitHub | https://github.com/sergiorib/sergiorib | Veja meus códigos e projetos | mesmo do valor |

---

## 7. Requirements *(mandatory)*

### 7.1 Functional Requirements

- **FR-001**: O sistema DEVE fornecer a página `pages/spa/contatos.astro` (e a cópia `pages/contatos/contatos.astro`), com a folha `pages/contatos/assets/css/contatos.css` gerada a partir de [estilos.md](../../catalog/estilos.md) contendo apenas os elementos e estilos usados na página (R-S02), os dados em `pages/contatos/data/contatos.json` e os ícones em `pages/contatos/assets/images/`. Os elementos do catálogo são componentes compartilhados em `pages/spa/components/elementos/`.
- **FR-002**: O elemento raiz DEVE conter `id="page-content"`, `data-page-id="contatos"` e `data-page-title="Meus Contatos"`, e as classes `page-content-wrapper page-root` com a classe do estilo e `contatos-page`.
- **FR-003**: A composição da página DEVE seguir a seção 4 (Estrutura); a aparência de cada elemento é a do estilo indicado, conforme [estilos.md](../../catalog/estilos.md).
- **FR-004**: A página DEVE ser injetada em `#page-content-host` pelo roteador SPA, via History API, sem recarregar a página.
- **FR-005**: A grade DEVE renderizar exatamente um `[link-card]` por item de `@dados.contatos`, na ordem do arquivo.
- **FR-006**: Destinos `http(s)` DEVEM abrir em nova aba com `rel="noopener noreferrer"`; destinos `tel:` e `mailto:` DEVEM abrir na mesma aba.
- **FR-007**: A página DEVE apresentar proporções confortáveis de leitura com o navegador em 100% de zoom, em qualquer escala de exibição do sistema operacional (100%, 125% e 150%).
- **FR-008**: Os tamanhos de texto e os espaçamentos DEVEM se adaptar à largura disponível pela escala fluida (`scale.css`), respeitando limites mínimos e máximos.
- **FR-009**: O aumento do tamanho de fonte configurado nas preferências do navegador DEVE ampliar proporcionalmente os textos da página, sem sobreposição ou perda de conteúdo.

### 7.2 Key Entities

- Os elementos da página (`page-root`, `page-title`, `grid`, `link-card`) estão definidos em [elementos.md](../../catalog/elementos.md).
- **Contato** (dados): `rotulo`, `valor`, `detalhe?`, `href`, `icone` — ver `pages/contatos/data/contatos.json`.

---

## 8. Success Criteria *(mandatory)*

### 8.1 Measurable Outcomes

- **SC-001**: A injeção do conteúdo em `#page-content-host` em navegação SPA ocorre em menos de 150ms.
- **SC-002**: 100% dos elementos da página exibem a aparência do estilo indicado na seção 4, conforme [estilos.md](../../catalog/estilos.md).
- **SC-003**: 100% dos itens de `@dados.contatos` aparecem como cartões, com todos os links funcionais e abrindo no destino correto (FR-006).
- **SC-004**: A grade segue as colunas configuradas na seção 4 (1 → 2 @768), sem transbordamento de texto ou elementos.
- **SC-005**: Em larguras efetivas de 1280, 1366, 1536 e 1920 pixels, com o navegador em 100% de zoom e o sistema operacional em escala de 100%, 125% ou 150%, a página exibe textos e espaçamentos equilibrados, sem rolagem horizontal.
- **SC-006**: Em celular (largura aproximada de 375 pixels) e tablet (largura aproximada de 768 pixels), a página apresenta layout adaptado e legível, sem rolagem horizontal.

---

## 9. Assumptions

- O projeto segue a Constituição v2.0.0: Astro para estruturação estática, CSS3 puro e Vanilla JS.
- As fontes `Barlow` e `Barlow Condensed` são carregadas do Google Fonts (por `tokens.css` e `spa-layout.css`).
- A página não possui JavaScript próprio.

---

## 10. Asset Resolution Convention (SPA Pages)

- **Caminhos Absolutos para Assets Estáticos**: ao adicionar imagens ou ícones em `pages/contatos/`:
  1. **NÃO utilize caminhos relativos** (como `./assets/...` ou `../contatos/assets/...`), pois eles falham ao serem resolvidos dinamicamente pelo roteador SPA em rotas aninhadas (ex: `/spa/contatos/`).
  2. **Utilize SEMPRE o caminho absoluto** (ex: `/pages/contatos/assets/images/<arquivo>`).
  3. **Garanta que o arquivo exista fisicamente** em `pages/contatos/assets/images/`.
  4. **Valide a renderização** executando `npm run build` ao finalizar.
