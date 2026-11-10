# Quickstart: Validação da Página "Formação" (`formacao.astro`)

**Feature**: `04-formacao` (Página "Formação")  
**Spec**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)  
**Contracts**: [ui-contracts.md](./contracts/ui-contracts.md)  
**Status**: Concluído

---

## 1. Pré-Requisitos

1. Node.js (v18+) e Astro configurados.
2. Aplicação SPA principal operacional em `pages/spa/`.
3. Logos institucionais presentes em `pages/formacao/assets/images/`.

---

## 2. Comandos de Inicialização e Execução

### Executar o Servidor de Desenvolvimento Local

```bash
npm run dev
```

Acessar a URL local `http://localhost:4321/` e navegar para a seção "Formação".

---

## 3. Roteiro de Cenários de Validação End-to-End

### Cenário 1: Renderização do Título e Seções
- **Ação**: Acessar a página de Formação na SPA.
- **Validação Esperada**:
  - O título principal exibe "Formação" em Barlow Condensed Bold 32px (`#ffffff` ou `#000000` conforme contexto especificado).
  - São exibidas as 3 seções: 'Acadêmica', 'Idiomas' e 'Treinamentos', cada uma com seu título correspondente em Barlow Condensed 28px.

### Cenário 2: Exibição dos Cards e Logos Centralizados
- **Ação**: Inspecionar os cards em cada seção.
- **Validação Esperada**:
  - As logos institucionais estão centralizadas no card com `object-fit: contain`.
  - O título do curso/item utiliza Barlow Condensed 24px em negrito.
  - As badges de período/nível utilizam fonte monoespaçada uppercase com pílula arredondada e borda `#0381B0`.

### Cenário 3: Responsividade e Build
- **Ação**: Executar o build de produção:
  ```bash
  npm run build
  ```
- **Validação Esperada**:
  - Build concluído com sucesso sem erros de compilação ou assets ausentes.
