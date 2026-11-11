# Quickstart Validation Guide: Página "Meus Contatos" (`contatos.astro`)

**Branch**: `07-contatos` | **Date**: 2026-11-11 | **Spec**: [spec.md](./spec.md)

## 1. Prerequisites
- Node.js instalado (v18+ recomendado).
- Repositório clonado e dependências instaladas (`npm install`).

## 2. Running Development Server
```bash
npm run dev
```
Acesse `http://localhost:4321/spa/` no navegador.

## 3. Validation Scenarios (End-to-End)

### Scenario 1: SPA Navigation to Contatos
1. Navegue para a aplicação SPA (`/spa/`).
2. Clique no item de menu **Contatos** na Sidebar.
3. **Expected Outcome**: A rota atualiza para `/spa/contatos/`, o container `#page-content` recebe o conteúdo gerado com `data-page-id="contatos"`, o Breadcrumb exibe "Contatos", e a Sidebar mantém o item ativo selecionado.

### Scenario 2: Visual and Responsive Validation
1. Verifique se o painel `.contacts-page` exibe o gradiente de fundo esperado e o título "Meus Contatos" em `Barlow Condensed` 32px.
2. Verifique se os 4 cards de contato estão dispostos em grade de 2 colunas em desktop (≥ 720px) e 1 coluna em mobile (< 720px).
3. Passe o mouse sobre um card (`.contact-card`) e confirme a transição de elevação (`transform: translateY(-3px)`) e realce da borda em ciano (`#19c6e6`).

### Scenario 3: Build Verification
Execute o comando de build estático do Astro para garantir que não há erros de compilação ou falhas de resolução de assets:
```bash
npm run build
```
**Expected Outcome**: Build concluído com sucesso (`0 errors`).
