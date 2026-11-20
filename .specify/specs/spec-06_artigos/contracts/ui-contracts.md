> **Substituído.** A marcação da página Artigos agora é definida pela seção 4 (Estrutura) de
> [spec.md](../spec.md), pelo catálogo [elementos.md](../../../catalog/elementos.md) e pelos estilos
> [estilos.md](../../../catalog/estilos.md). Este contrato descreve a implementação anterior
> (`.topic-group`, `.group-toggle`, `.subgroup`, `.leaf`, `footer`) e é mantido apenas como histórico.

# UI Contract: Página "Artigos" (`artigos.astro`)

**Feature**: `06-artigos` (Página "Artigos")  
**Spec**: [spec.md](../spec.md)  
**Status**: Atualizado (2026-11-17 — sincronizado com spec.md)

---

## 1. Contrato de Estrutura HTML e IDs Obrigatórios

O componente Astro principal (`pages/artigos/artigos.astro`) DEVE expor exatamente a seguinte estrutura (catálogo completo na §2.4 da spec: 13 grupos, 4 subgrupos, 42 `.leaf`):

```html
<div id="page-content" class="page-content-wrapper artigos-page"
     data-page-id="artigos" data-page-title="Artigos técnicos">
  <div class="app">
    <header>
      <h1 class="page-title">Artigos técnicos</h1>
      <p class="intro">Seleciona o tema.</p>
      <div class="rule"></div>
    </header>

    <main class="workspace">
      <div class="topic-columns">
        <!-- Coluna Esquerda: Grupos 1 a 6 -->
        <div class="vertical-list column">
          <div class="topic-group open">
            <button type="button" class="group-toggle" aria-expanded="true" aria-controls="artigos-group-1">
              <span class="group-icon" aria-hidden="true">▥</span>
              <span class="group-name">Análise de dados e BI</span>
              <span class="chevron" aria-hidden="true">›</span>
            </button>
            <div class="group-children" id="artigos-group-1">
              <div class="vertical-list leaf-list">
                <a href="#" class="leaf" data-url="/spa/artigos/series_temporais"><span class="leaf-bullet">•</span>Séries temporais</a>
                <!-- ... -->
              </div>
              <!-- Opcional, após a .leaf-list: -->
              <div class="subgroup">
                <button type="button" class="subgroup-toggle" aria-expanded="false" aria-controls="artigos-sub-4-1">
                  <span class="subgroup-marker">›</span>
                  <span class="subgroup-name">Redes Neurais Recorrentes</span>
                  <span class="chevron" aria-hidden="true">›</span>
                </button>
                <div class="subgroup-children" id="artigos-sub-4-1">
                  <div class="vertical-list leaf-list"><!-- .leaf ... --></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Grupos 2 a 6 -->
        </div>
        <!-- Coluna Direita: Grupos 7 a 13 -->
        <div class="vertical-list column"><!-- ... --></div>
      </div>
    </main>

    <footer>
      <p>© 2026 — Portfólio de Dados</p>
      <p class="footer-motto">ANALISAR <span>/</span> CONSTRUIR <span>/</span> EVOLUIR</p>
    </footer>
  </div>

  <script is:inline type="module" set:html={artigosScript}></script>
</div>
```

---

## 2. Contrato de Classes CSS (`pages/artigos/assets/css/artigos.css`)

Todas as regras DEVEM ser prefixadas por `.artigos-page`. É proibido estilizar `body`, `html` ou elementos soltos (`header`, `footer`, `h1`) sem o prefixo de escopo.

| Seletor | Função / Regras-chave |
|---|---|
| `.artigos-page` | Fundo `radial-gradient(circle at 50% 20%, #102636 0%, #070e14 100%)`, `'Roboto Condensed'` 15px/1.5, cor `#e2f1f8`. |
| `.app` | `max-width: 1200px`, centralizado, `padding: 32px 36px`, `min-height: 100%`, flex vertical. |
| `h1.page-title` / `.intro` / `.rule` | Título Oswald 600 `clamp(28px, 3.5vw, 40px)`; subtítulo `#88a9bc`; linha 1px com gradiente ciano. |
| `.workspace` | `flex: 1`. |
| `.topic-columns` | Grid `repeat(2, minmax(0, 1fr))`, `gap: 16px`, `align-items: start`; `1fr` em `<= 850px`. |
| `.column` | Flex vertical, `gap: 16px`. |
| `.topic-group` | Fundo `rgba(10, 25, 38, 0.75)`, `backdrop-filter: blur(8px)`, borda `1px solid rgba(0, 229, 255, 0.25)`, `border-radius: 18px`. `.open` → borda `#00e5ff` + glow. |
| `.group-toggle` | Botão de largura total, `min-height: 54px`, ícone + nome + `.chevron` (`margin-left: auto`). |
| `.group-children` / `.subgroup-children` | `display: none`; visíveis apenas com `.topic-group.open > ` / `.subgroup.open > `. |
| `.chevron` | Rotaciona `90deg` e fica `#00e5ff` apenas no toggle filho direto do grupo/subgrupo aberto. |
| `.subgroup-toggle` | Pílula (`border-radius: 50px`), borda `rgba(0, 229, 255, 0.15)`, cor `#88a9bc`. |
| `.leaf` | Pílula com `data-url`; hover `translateX(3px)`; `.selected` → fundo `#dbeaf0`, borda `#ffffff`, cor `#091a24`, negrito, `✓` (`.check-mark`). |
| `footer` / `.footer-motto span` | Borda superior ciano sutil; texto `#88a9bc` 12px; separadores `/` em `#00e5ff`; empilha em `<= 540px`. |

---

## 3. Contrato de Comportamento (`pages/artigos/assets/js/artigos.js`)

1. **Entrega**: código-fonte em `assets/js/artigos.js`, emitido no fragmento como `<script is:inline type="module">` (import `?raw`). Exporta `GET()` (`{ module: 'artigos' }`).
2. **Inicialização**: `initArtigosPage()` em `DOMContentLoaded` (ou imediata) e em `spa:page-loaded` (listener registrado uma única vez). Retorna cedo se `.artigos-page` não existir.
3. **Idempotência**: `dataset.listenerAttached = 'true'` em cada `.group-toggle`, `.subgroup-toggle` e `.leaf`.
4. **Acordeão**: clique → `e.stopPropagation()`, alterna `.open` no elemento pai e sincroniza `aria-expanded`.
5. **Seleção de artigo**: clique em `.leaf` → `e.preventDefault()`, limpa `.selected`/`.check-mark` dos demais, aplica `.selected` + `<span class="check-mark">✓</span>` e, após `150ms`, navega para `data-url` pelo roteador SPA (âncora temporária + `.click()`), sem full page reload. Cliques sucessivos cancelam a navegação pendente: só o último artigo selecionado é aberto.
