# Research: Arquitetura Técnica da Página "Formação" (`formacao.astro`)

**Feature**: `04-formacao` (Página "Formação")  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Contexto e Objetivos da Pesquisa

Esta pesquisa estabelece as decisões arquiteturais fundamentadas para implementar a página "Formação" em estrita conformidade com a Constituição v1.0.0:
- **Modularidade e Isolamento**: Código localizado em `pages/formacao/formacao.astro`, com estilos exclusivos em `pages/formacao/assets/css/formacao.css` e assets em `pages/formacao/assets/images/`.
- **Zero Frameworks CSS**: Todas as regras visuais (gradientes, grid responsivo, sombras, badges e logos centralizados) implementadas em CSS3 Puro.
- **Renderização e Injeção SPA**: Compatibilidade total com o roteador dinâmico Vanilla JS da aplicação SPA através do contêiner padrão `#page-content`.

---

## 2. Decisões Técnicas Consolidadas

### Decisão 1: Estrutura de Seções e Layout dos Cards

- **Decisão**: A página é dividida em 3 seções principais (`.section-group`):
  1. **Seção Acadêmica**: Cards de formação superior (Graduação em Ciência de Dados e Análise e Desenvolvimento de Sistemas) dispostos em grid de até 2 colunas no desktop.
  2. **Seção Idiomas**: Cards de proficiência (Inglês e Espanhol) dispostos em grid de até 3 colunas no desktop.
  3. **Seção Treinamentos**: Cards de certificações e treinamentos (ex: Estatística Descritiva e Probabilidade - ENAP) dispostos em grid de até 3 colunas no desktop.
- **Racional**: Garante separação semântica clara e alinhamento visual com os requisitos da especificação.

### Decisão 2: Estilização de Cards e Logos Centralizados

- **Decisão**:
  - Cards com fundo `linear-gradient(to right, #FFF8D6, #FFFFFF)`, borda `1px solid #0381B0`, `border-radius: 10px`, `padding: 20px 16px`, e box-shadow `0px 4px 6px rgba(0,0,0,0.1)`.
  - Logo institucional (`.institution-logo`) centralizada (`margin: 0 auto; display: block; max-height: 60px; object-fit: contain;`).
  - Título do curso (`.course-title`) em `Barlow Condensed`, peso 700 bold, tamanho 24px, cor `#000000`.
  - Badge de período/nível (`.period-badge`) estilizada com gradiente vertical `#FFFFFF` a `#EFEFEF`, borda `1px solid #0381B0`, `border-radius: 20px`, fonte monoespaçada (`Consolas`/`Courier New`), 20px (desktop) / 12px (mobile), uppercase.
- **Racional**: Fidelidade estrita aos padrões estéticos solicitados.

### Decisão 3: Resolução Absoluta de Assets SPA

- **Decisão**: Todos os caminhos de imagens em `formacao.astro` utilizam o formato absoluto baseado no servidor estático do Astro: `/pages/formacao/assets/images/<arquivo>.png`.
- **Racional**: Previne falhas de carregamento quando o roteador injeta o conteúdo HTML via `fetch` em rotas aninhadas `/spa/formacao/`.

---

## 3. Resumo das Decisões

| Dimensão | Decisão Adotada | Justificativa |
|---|---|---|
| Estilização | Folha CSS3 puro isolada em `pages/formacao/assets/css/formacao.css` | Conformidade estrita com a Constituição v1.0.0 |
| Logos | Centralizados via `margin: 0 auto` com `object-fit: contain` | Apresentação institucional limpa e proporcional |
| Badges | Fonte monoespaçada (`Consolas`/`Courier New`) uppercase com pílula arredondada | Estética Dark Tech Dashboard e padrão do portfólio |
| Injeção SPA | Nó `#page-content` com atributos `data-page-*` | Sincronização nativa com o roteador e Breadcrumbs |
