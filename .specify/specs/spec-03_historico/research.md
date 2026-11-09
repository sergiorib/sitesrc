# Research: Arquitetura Técnica da Página "Histórico" (`historico.astro`)

**Feature**: `03-historico` (Página "Histórico Profissional")  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Contexto e Objetivos da Pesquisa

Esta pesquisa estabelece as decisões arquiteturais fundamentadas para implementar e atualizar a página "Histórico" em estrita conformidade com a Constituição v1.0.0:
- **Modularidade e Isolamento**: Código localizado em `pages/historico/` e `pages/spa/historico.astro`, com estilos exclusivos em `pages/historico/assets/css/historico.css`.
- **Zero Frameworks CSS**: Todas as regras visuais (gradientes, border-radius de 16px, cards de experiência, escudos de stack tecnológica) implementadas em CSS3 Puro.
- **Renderização e Injeção SPA**: Compatibilidade total com o roteador dinâmico Vanilla JS da aplicação SPA através do contêiner padrão `#page-content`.

---

## 2. Decisões Técnicas Consolidadas

### Decisão 1: Arquitetura e Separação de Preocupações

- **Decisão**: Criar/atualizar a página em `pages/spa/historico.astro` e garantir a estrutura de assets em `pages/historico/assets/css/historico.css` e `pages/historico/assets/images/`.
- **Racional**:
  - Segue o padrão estabelecido pelas demais páginas (`sobre`, `formacao`, `portfolio`, `artigos`, `contatos`).
  - Importação de estilos no frontmatter Astro (`import '../historico/assets/css/historico.css'`) assegura processamento via Vite.

### Decisão 2: Especificações Visuais e Tipográficas da Página de Histórico

- **Decisão**: 
  - Título Principal (`.page-title`): `Barlow Condensed`, peso 700 bold, tamanho 32px, cor `#ffffff`, margem inferior 16px.
  - Cards de Experiência (`.experience-card`): Gradiente vertical de `#DAEBF2` a `#A8CCD9`, borda `1px solid #0381B0`, `border-radius: 12px`, `box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15)`, `padding: 20px 24px`.
  - Logo da Empresa (`.company-logo`): Altura de 100px mantendo proporção para a Experiência 1, centralizada.
  - Título do Cargo (`.job-title`): `Barlow Condensed`, peso 700 bold, tamanho 28px, cor `#000000`.
  - Badges Informativas (`.info-badges` e `.badge`): Gradiente `#FFFDEB` a `#FFF9D2`, tamanho 20px, bordas arredondadas.
  - Descrição da Atividade (`.job-description`): Fonte monoespaçada (`Courier New`/`Consolas`), tamanho 22px, peso 800, cor `#0a0c0c`, `line-height: 1.5`, justificado.
  - Bloco de Stack Tecnológica (`.tech-stack-block`): Título em monoespaçada verde (22px), `border-radius: 16px`, listagem de escudos (shields) tecnológicos.
- **Racional**:
  - Fidelidade rigorosa aos requisitos da especificação (`spec-03_historico.md`).

### Decisão 3: Adaptabilidade Responsiva

- **Decisão**: 
  - Tablet (768px a 1023px): Badges organizadas em 2 colunas.
  - Mobile (< 767px): Título principal reduz para 24px, card padding para 12px, logo da Experiência 1 ajusta para 80px proporcional, badges em grade de 2 colunas (`repeat(2, 1fr)`).

---

## 3. Resumo das Decisões

| Dimensão | Decisão Adotada | Justificativa |
|---|---|---|
| Estilização | Folha CSS3 puro isolada em `pages/historico/assets/css/historico.css` | Conformidade com a Constituição v1.0.0 |
| Tipografia | Barlow Condensed 32px (título), 28px (cargo), 22px (descrição/tech), 20px (badge) | Fidelidade visual exata |
| Geometria & Cards | Border-radius de 16px no tech stack block e 12px nos cards | Padrão estético Dark Tech Dashboard |
| Injeção SPA | Contêiner `#page-content` em `pages/spa/historico.astro` | Integração perfeita com o roteador SPA |
