> **Substituído.** A marcação da página Portfólio agora é definida pela seção 4 (Estrutura) de
> [spec.md](../spec.md), pelo catálogo [elementos.md](../../../catalog/elementos.md) e pelos estilos
> [estilos.md](../../../catalog/estilos.md). Este contrato descreve a implementação anterior
> (`.portfolio-header`, `.selection-button`, `.category-section`, `.project-card`, `.hability-tag-*`) e é mantido apenas como histórico.

# UI Contract: Página "Portfólio" (`portfolio.astro`)

**Feature**: `05-portfolio`  
**Spec**: [spec.md](../spec.md)  
**Status**: Atualizado (2026-11-17 — sincronizado com spec.md)

---

## 1. Visão Geral do Contrato de Interface

Este contrato define os seletores DOM, atributos de dados (`data-*`), eventos interativos e regras de renderização exigidos para a página de Portfólio, garantindo interoperabilidade com o roteador SPA e consistência visual sob a arquitetura do projeto.

---

## 2. Seletores DOM Obrigatórios

Qualquer implementação da página de portfólio DEVE expor exatamente os seguintes seletores no HTML gerado:

| Seletor DOM / Atributo | Tipo de Elemento | Função Obrigatória |
|---|---|---|
| `#page-content` | `div` | Elemento raiz com `class="page-content-wrapper portfolio-page-wrapper"`, `data-page-id="portfolio"` e `data-page-title="Portfólio de Projetos"` (o roteador/breadcrumbs leem `data-page-title`). |
| `.portfolio-page-wrapper` | `div` | Classe escopo raiz para estilização da página com gradiente `#DAEBF2` a `#A8CCD9`, renderizada de forma segura dentro do `#page-content-host`. |
| `.portfolio-header` | `header` | Cabeçalho fixo (`top: 0`, `position: sticky`, `z-index: 100`) contendo o título e a barra de seleção de categorias, sem sobreposição com o menu/sidebar ou breadcrumbs da SPA. |
| `.page-title` | `h1` | Título principal ("Portfólio de Projetos") em Barlow Condensed 700 (36px, `#000000`). |
| `.category-selection` | `nav` | Painel de navegação flexível contendo os botões `.selection-button`. |
| `.selection-button` | `a` | Botão interativo de seleção de categoria contendo `href="#section-<categoria>"`. |
| `.selection-button.active` | `a` | Estado ativo do botão com fundo `#22d3ee33`, borda `#22D3EE` e texto `#22d3ee` (16px). |
| `.portfolio-body` | `main` | Corpo principal scrollável contendo as seções de categoria. |
| `.category-section` | `section` | Seção que agrupa projetos por área com ID âncora correspondente e `scroll-margin-top: 185px` para desobstrução do título. |
| `.category-section-title` | `h2` | Título da categoria em Barlow Condensed 700 (24px, `#1E333D`). |
| `.project-grid` | `div` | Grade CSS responsiva (2 colunas em desktop/tablet `>= 768px`, 1 em mobile) gerada apenas nas categorias da Seção 2.4. |
| `.project-card` | `article` | Card individual de projeto com gradiente `#FFEFBA` a `#FFFFFF`, borda `#0381B0` e raio de 12px (não é `<a>`, para evitar links aninhados). |
| `.project-image-wrap` | `a` | Link da capa com proporção 16:9 (`aspect-ratio: 16/9`), `cursor: pointer`; link externo (`https://`) recebe `target="_blank" rel="noopener noreferrer"`. |
| `.project-image` | `img` | Imagem de capa utilizando caminho absoluto (`/pages/portfolio/assets/images/...`). |
| `.project-content` | `div` | Corpo do card contendo título (`.project-name`) e resumo (`.project-resume`). |
| `.project-name` | `h3` | Nome do projeto em Barlow Condensed 700 (18px, preto). |
| `.project-link` | `a` | Link do título do projeto (mesmo `href` e regra de `target` da capa). |
| `.project-resume` | `p` | Resumo do projeto em Inter 400 (14px, `#333333`). |
| `.habilities-list` | `div` | Rodapé do card contendo as tags de habilidades. |
| `.hability-tag-HS` | `span` | Badge de hard skill com fundo `#E2F0D9` e borda/texto `#386312`. |
| `.hability-tag-SS` | `span` | Badge de soft skill com fundo `#E2F0D9` e borda/texto `#4B7725`. |

---

## 3. Contrato de Comportamento de Navegação por Categorias (`portfolio.js` / `<script is:inline>`)

O comportamento da navegação por categorias deve seguir as seguintes regras determinísticas:

1. **Apresentação no Limite Superior sem Gap**:
   - O `.portfolio-header` deve ser posicionado com `top: 0` encostado no topo da viewport ou do `#page-content-host` sem qualquer gap visual.
2. **Escuta e Idempotência**:
   - Registrar listener de `click` em todos os elementos `.selection-button`.
   - Utilizar atributo marcador (`dataset.listenerAttached = 'true'`) para garantir idempotência em re-renderizações e injeções SPA.
   - Responder aos eventos nativos (`DOMContentLoaded`, `pageshow`) e ao evento do roteador SPA (`spa:page-loaded`).
3. **Interceptação de Clique e Rolagem Suave com Desobstrução do Título**:
   - Interceptar a ação padrão com `e.preventDefault()`.
   - Atribuir a classe `.active` ao botão clicado e removê-la dos demais.
   - Sincronizar o hash da URL via History API (`history.pushState(null, '', targetId)`).
   - Acionar a rolagem suave dentro de `#page-content-host` (ou janela) compensando dinamicamente a altura total do cabeçalho sticky acrescida de folga visual (`header.offsetHeight + 35px`, em conjunto com `scroll-margin-top: 185px` nas seções), assegurando que o `.category-section-title` permaneça 100% visível e nunca seja encoberto pelo header.
4. **Observador de Interseção (`IntersectionObserver`)**:
   - Atualizar a classe `.active` no `.selection-button` correspondente conforme o usuário rola o contêiner e diferentes `.category-section` entram no viewport (ajustado com `rootMargin: -160px 0px -40% 0px`, complementado por listener de `scroll` com `requestAnimationFrame`). A seção ativa é a última cujo topo alcançou a linha `header + 35px`. Após um clique, a seleção fica travada (mín. ~600ms) até a próxima interação de rolagem do usuário (FR-003.4).
5. **Estabilidade de Histórico no Roteador SPA**:
   - Navegações por fragmento/hash dentro da mesma rota (`pathname`) NÃO devem provocar nova requisição de rota nem resetar `scrollTop = 0` no roteador da SPA.
6. **Entrega do Script**:
   - Código-fonte em `pages/portfolio/assets/js/portfolio.js` (exporta também `GET()` por ser arquivo sob `pages/`).
   - Emitido no fragmento como `<script is:inline type="module" set:html={portfolioScript} />` (import `?raw`), para ser re-executado por `router.executeIncomingScripts()`.

---

## 4. Contrato de Ativos Estáticos (Assets)

- **Caminhos Absolutos**: Nenhuma imagem de capa ou ícone pode utilizar caminhos relativos (`./` ou `../`). Todos devem seguir o padrão absoluto POSIX baseado na raiz estática:
  `/pages/portfolio/assets/images/<filename>`
- **Existência Física**: Todos os arquivos de imagem referenciados nos cards de projeto devem existir fisicamente no diretório `pages/portfolio/assets/images/`.
