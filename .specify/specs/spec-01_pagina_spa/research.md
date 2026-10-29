# Research: Arquitetura Técnica da Página Principal SPA

**Feature**: `01-pagina-spa` (Estrutura da Página Principal SPA)  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Contexto e Objetivos da Pesquisa

Esta pesquisa estabelece as decisões arquiteturais fundamentadas para implementar a SPA em conformidade estrita com a Constituição v1.0.0 do projeto:
- **Zero Frameworks Client-Side**: Sem React, Vue, Svelte, Angular ou similares.
- **Zero Frameworks CSS**: Sem Tailwind, Bootstrap ou CSS-in-JS.
- **Isolamento Estrutural por Página**: Componentes, CSS e JS contidos em `pages/spa/`.
- **Navegação Contínua e Fluida**: Sem recarregamento de página (*Zero Full Page Reloads*).

---

## 2. Decisões Técnicas Consolidadas

### Decisão 1: Arquitetura do Roteador Vanilla JS (Single Content Target + Event Delegation)

- **Decisão**: Implementar um roteador leve em Vanilla JS (`router.js`) operando por delegação global de eventos no `document`, captura de links internos (`<a>`), requisição assíncrona com `fetch()`, parsing de DOM via `DOMParser()` e injeção no `#main-content`.
- **Racional**:
  - A delegação no `document` elimina a necessidade de registrar listeners a cada novo conteúdo injetado.
  - Links externos (iniciando com `http://`, `https://`, `mailto:`, etc.) e links com atributo `target="_blank"` ou atributo de exclusão `data-native` são ignorados, preservando o comportamento padrão do navegador.
  - A injeção atualiza exclusivamente o nó interno do `#main-content`, garantindo que a Sidebar permaneça intocada e imóvel.
- **Alternativas consideradas**:
  - *Iframe*: Descartado por dificuldades de responsividade, scroll desacoplado e inconsistência com estilização Dark Tech Dashboard.
  - *Templates HTML embutidos inline*: Descartado pois inflaria o tamanho inicial da página `spa.astro` e violaria o princípio de modularidade e descoberta dinâmica de subpáginas.

### Decisão 2: Sincronização de Histórico e Estado do Navegador (History API)

- **Decisão**: Utilizar `window.history.pushState(state, '', url)` para registrar a rota ao navegar, e escutar o evento `window.addEventListener('popstate', onPopState)` para restaurar a navegação quando o usuário acionar os botões "Voltar" ou "Avançar" do navegador.
- **Racional**:
  - Garante uma experiência idêntica à de navegadores nativos para o visitante.
  - O objeto de estado (`state`) salva os metadados da rota (`route`, `parentKey`, `breadcrumbs`), viabilizando a restauração instantânea do estado visual do menu e da trilha hierárquica.
- **Alternativas consideradas**:
  - *Hash-based routing (`/#sobre`)*: Descartado por poluir a URL, dificultar o SEO e destoar das convenções modernas de rotas limpas do Astro.

### Decisão 3: Mecanismo de Descoberta Dinâmica de Subpáginas e Extração de Conteúdo

- **Decisão**: O roteador efetua `fetch(targetUrl)` para qualquer rota interna requisitada. A resposta HTML é parseada via `new DOMParser().parseFromString(html, 'text/html')`. O roteador extrai o contêiner interno da página carregada (`#page-content` ou o nó raiz do body) e substitui o conteúdo do `#main-content`.
- **Racional**:
  - Permite que páginas secundárias ou subpáginas (ex: `pages/portfolio/projeto-01.astro`) sejam desenvolvidas como componentes e páginas Astro normais e independentes, sendo injetadas de forma limpa sem que o roteador precise de um mapa fixo (*hardcoded*).
- **Alternativas consideradas**:
  - *Retorno de JSON com fragmento HTML*: Requereria endpoints de API dedicados para cada página; a abordagem de busca do documento estático com extração de fragmento é nativa do SSG do Astro.

### Decisão 4: Resiliência e Fallback para Erro 404 (`default.astro`)

- **Decisão**: Se a requisição assíncrona falhar (`!response.ok` como 404, 500 ou falha de rede), o roteador intercepta a exceção e carrega o conteúdo estático da rota de fallback (`pages/spa/default.astro` compilada).
- **Racional**:
  - Previne travamentos ou telas em branco no Main Container.
  - Informa claramente ao usuário "Página não encontrada" com link para retornar à tela inicial ("Sobre").
- **Alternativas consideradas**:
  - *Mensagem inline estática em JS*: Menos customizável e fere o princípio de centralização do design em componentes `.astro`.

### Decisão 5: Lógica Hierárquica e Manutenção de Estado do Menu e Breadcrumbs

- **Decisão**: 
  1. O menu lateral possui 6 itens raiz mapeados com chaves primárias (`sobre`, `historico`, `formacao`, `portfolio`, `artigos`, `contatos`).
  2. Ao navegar para qualquer rota, o roteador analisa os segmentos do caminho (ex: `/pages/portfolio/projeto-01`).
  3. O primeiro segmento representativo identifica o item pai na Sidebar, garantindo que o menu "Portfólio" permaneça com a classe `.active` e ícone escuro.
  4. O componente Breadcrumbs decompõe o caminho em nós navegáveis: `Portfólio / projeto-01`, onde o nó pai possui `href` e dispara a transição SPA.
- **Racional**:
  - Totalmente determinístico, dinâmico e extensível a $N$ níveis de profundidade.

### Decisão 6: Organização Modular de Arquivos e Isolamento Estrito

- **Decisão**: Em estrita conformidade com a Constituição v1.0.0 e o direcionamento do usuário:
  - Componentes estruturais: `pages/spa/components/*.astro`
  - Estilos em CSS puro: `pages/spa/assets/css/*.css`
  - Scripts em Vanilla JS: `pages/spa/assets/js/*.js`
  - Imagens e ícones: `pages/spa/assets/images/*.png`
- **Racional**:
  - Total isolamento de dependências e responsabilidades.
  - Zero contaminação global no projeto.

---

## 3. Resumo das Decisões

| Tópico | Opção Escolhida | Justificativa Principal |
|--------|-----------------|-------------------------|
| Roteamento SPA | Vanilla JS + Delegação Global + Fetch | Zero frameworks, zero bloat, total estabilidade da Sidebar |
| Histórico | History API (`pushState` + `popstate`) | Preservação total de UX nativa (botões Voltar/Avançar) |
| Parsing de Conteúdo | `DOMParser` sobre resposta HTML | Desacoplamento entre páginas Astro e o motor de injeção |
| Tratamento de Erros | Carregamento assíncrono de `default.astro` | Fallback robusto e elegante em falhas de rota |
| Breadcrumbs | Algoritmo baseado em hierarquia de segmentos | Atualização automática sem hardcode |
| Estilização | CSS3 Puro em `pages/spa/assets/css/` | Fidelidade rigorosa à Constituição v1.0.0 |
| Interatividade | Vanilla JS em `pages/spa/assets/js/` | Fidelidade rigorosa à Constituição v1.0.0 |
