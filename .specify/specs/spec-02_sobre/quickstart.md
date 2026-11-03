# Quickstart: Validação da Página "Sobre mim" (`sobre.astro`)

**Feature**: `02-sobre` (Página "Sobre mim")  
**Spec**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)  
**Contracts**: [ui-contracts.md](./contracts/ui-contracts.md)  
**Status**: Concluído

---

## 1. Pré-Requisitos

1. Node.js (v18+) e Astro configurados.
2. Aplicação SPA principal operacional em `pages/spa/`.
3. Ícones das tecnologias presentes em `pages/sobre/assets/images/`.

---

## 2. Comandos de Inicialização e Execução

### Executar o Servidor de Desenvolvimento Local

```bash
npm run dev
```

Acessar a URL local `http://localhost:4321/` e verificar o carregamento inicial da seção "Sobre" ou navegar via menu lateral.

---

## 3. Roteiro de Cenários de Validação End-to-End

### Cenário 1: Renderização dos Painéis com Cores e Efeito Encastrado (SC-002)
- **Ação**: Acessar a página "Sobre mim" dentro do Main Container da SPA.
- **Validação Esperada**:
  - O contêiner ocupa 100% da largura e altura visíveis no `#main-content`.
  - O fundo global exibe gradiente vertical suave de `#16222A` (topo) até `#3A6073` (base).
  - Ambos os painéis ("Sobre mim" e "Habilidades") exibem fundo gradiente `#DAEBF2` a `#A8CCD9`, borda `#0381B0`, cantos de 10px e efeito de sombra interna suave.
  - O título "Sobre mim" é renderizado em Barlow Condensed Bold 32px (`#000000`).
  - O texto biográfico oficial é renderizado em fonte monoespaçada 20px na cor `#4A5B61`, line-height 1.5 e alinhamento justificado.

### Cenário 2: Exibição das Habilidades e Avaliação por Estrelas (SC-003)
- **Ação**: Inspecionar o Painel "Habilidades".
- **Validação Esperada**:
  - Os cards de habilidades possuem gradiente horizontal `#FFEFBA` a `#FFFFFF`, borda `#0381B0` e títulos de categoria em verde `#386312`.
  - Cada ferramenta possui ícone de 18x18px e rótulo com espaçamento de 8px.
  - O bloco de 5 estrelas está alinhado rigorosamente à extremidade direita via `margin-left: auto`.
  - As estrelas ativas são renderizadas na cor verde-escura militar (`#2D4A22`) e as inativas com contorno cinza claro (`#CCCCCC`).
  - A contagem de estrelas confere perfeitamente com a especificação (TensorFlow 4/1, PyTorch 3/2, Scikit-Learn 5/0, XGBoost 3/2, Python 5/0, SQL 5/0, R 3/2, DAX 3/2, JavaScript 2/3).
  - O Card 3 é exibido como espaço reservado preservando o grid de 3 colunas.

### Cenário 3: Responsividade Desktop, Tablet e Mobile (SC-004)
- **Ação**: Redimensionar a janela do navegador em diferentes larguras:
  - Desktop (≥ 1024px): 3 colunas paralelas lado a lado com `gap: 10px`.
  - Tablet (768px a 1023px): 2 colunas fluidas.
  - Mobile (< 768px): Colapso para 1 única coluna empilhada verticalmente com `gap: 16px`.
- **Validação Esperada**:
  - Em nenhuma resolução ocorre vazamento horizontal (*horizontal overflow*).
  - As 5 estrelas permanecem encostadas à borda direita em todas as resoluções.
  - Em mobile, o texto biográfico ajusta o tamanho para 15px.

### Cenário 4: Transição SPA e Régua de Breadcrumbs (SC-001 / SC-005)
- **Ação**: Clicar no botão "Sobre" na Sidebar a partir de qualquer outra rota da SPA.
- **Validação Esperada**:
  - O conteúdo é injetado no `#page-content-host` em menos de 150ms sem recarregar a Sidebar.
  - A régua de Breadcrumbs no topo exibe `Sobre` como página ativa.
  - O botão "Sobre" da Sidebar adquire a classe `.active` com fundo `#B3CBDB` e ícone escuro.
