# Quickstart: Validação da Página Principal SPA

**Feature**: `01-pagina-spa` (Estrutura da Página Principal SPA)  
**Spec**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)  
**Contracts**: [router-contract.md](./contracts/router-contract.md) | [ui-contracts.md](./contracts/ui-contracts.md)  
**Status**: Concluído

---

## 1. Pré-Requisitos

1. Node.js (v18+) instalado no ambiente.
2. Projeto com as dependências do Astro configuradas (`astro`).
3. Assets visuais presentes em `pages/spa/assets/images/`:
   - `profile-bg.png`
   - `profile-photo.png`
   - `menu-bg.png`
   - Pares de ícones claros e escuros (`icone-[item]-claro.png`, `icone-[item]-escuro.png`).

---

## 2. Comandos de Inicialização e Execução

### Executar o Servidor de Desenvolvimento Local

```bash
npm run dev
# ou
npx astro dev
```

Acessar a URL local fornecida pelo Astro (geralmente `http://localhost:4321/spa` ou `http://localhost:4321/pages/spa/spa`).

---

## 3. Roteiro de Cenários de Validação End-to-End

### Cenário 1: Layout Base e Identidade Visual (SC-001 / SC-006)
- **Ação**: Acessar a aplicação no navegador em tela cheia (desktop).
- **Validação Esperada**:
  - A viewport é 100% preenchida sem barras de rolagem globais indesejadas na janela (100vw / 100vh).
  - A Sidebar à esquerda possui exatamente 300px de largura fixa.
  - O cabeçalho da Sidebar possui 275px de altura com a foto circular centralizada (160px), borda em gradiente, nome "Sérgio Ribeiro Cerqueira" e profissão "Cientista de Dados" legíveis sobre faixa de contraste.
  - O item "Sobre" aparece selecionado com fundo `#B3CBDB`, texto `#061B2A` e ícone escuro.
  - O Main Container à direita exibe o conteúdo inicial da página "Sobre".

### Cenário 2: Transição SPA Fluida entre Menus Primários (SC-002 / SC-003)
- **Ação**: Clicar sucessivamente em cada um dos itens de menu ("Histórico", "Formação", "Portfólio", "Artigos", "Contatos", "Sobre").
- **Validação Esperada**:
  - A Sidebar não pisca nem recarrega (zero *full page reloads*).
  - O botão clicado adquire imediatamente o estado ativo (`.active`) e o anterior retorna ao estado escuro padrão.
  - O conteúdo da seção correspondente é injetado no Main Container em menos de 300ms.
  - A URL na barra de endereços do navegador é atualizada via History API.

### Cenário 3: Navegação por Breadcrumbs e Subpáginas (SC-003 / SC-005)
- **Ação**: Acessar um link para uma subpágina aninhada (ex: `pages/portfolio/projeto-01`).
- **Validação Esperada**:
  - A Sidebar mantém visualmente ativo o menu primário pai ("Portfólio").
  - A régua de Breadcrumbs no topo do Main Container exibe `Portfólio / projeto-01`.
  - Ao clicar no link `Portfólio` na régua de Breadcrumbs, o Main Container retorna para a página principal de portfólio sem recarregamento.

### Cenário 4: Navegação pelo Histórico do Navegador (SC-005)
- **Ação**: Clicar no botão "Voltar" (Back) do navegador e em seguida no botão "Avançar" (Forward).
- **Validação Esperada**:
  - O evento `popstate` é capturado pelo `router.js`.
  - O conteúdo anterior é restaurado no Main Container.
  - O item correspondente na Sidebar e a régua de Breadcrumbs sincronizam seus estados visuais automaticamente.

### Cenário 5: Tratamento de Rota Inexistente / Fallback 404 (SC-004)
- **Ação**: Acionar um link direcionado a uma rota inexistente (ex: `/pages/rota-inexistente`).
- **Validação Esperada**:
  - O roteador intercepta a resposta de erro e carrega o conteúdo de `pages/spa/default.astro`.
  - A mensagem "Página não encontrada" é exibida com elegância no Main Container.
  - A aplicação e a Sidebar permanecem totalmente estáveis e funcionais.
