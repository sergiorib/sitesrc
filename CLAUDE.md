# Constituição Técnica e Fluxo Google Spec Kit (GSK)

## Fonte de Verdade (Single Source of Truth)
Este projeto segue rigorosamente o fluxo **Specification-Driven Development** via Google Spec Kit.
- Antes de escrever ou modificar qualquer código em `src/` ou `pages/`, leia obrigatoriamente:
  1. A constituição do projeto (em `.specify/memory/constitution.md` ou equivalente na raiz).
  2. A especificação específica da página/feature em foco (ex: `specs/.../spec.md`, `plan.md`, `tasks.md`).

## Stack e Regras Arquiteturais
- **Framework:** Astro (arquitetura SPA, componentes `.astro`, estilos isolados `.css`, scripts modulares `.js`).
- **Nomenclatura Estrita:** Respeitar exatamente os identificadores, classes CSS e nomes de componentes definidos nas specs (ex: `selection_button`, `.category-section`, `.filter-pill`). Nunca renomear elementos sem atualizar a spec primeiro.
- **Assets:** Ícones e imagens de páginas devem respeitar os diretórios especificados (ex: `pages/sobre/assets/images/`).

## Protocolo de Execução (Regra de Ouro)
1. **Nunca implementar no escuro:** Se um pedido envolver alteração visual, de layout (ex: grid de colunas) ou comportamento de navegação, verifique primeiro se a `spec.md` já reflete essa mudança.
2. **Sincronização (Converge):** Se houver divergência entre o código atual e a especificação, aponte o conflito antes de alterar arquivos e pergunte se deve atualizar a spec ou o código.
3. **Validação:** Após alterações em arquivos `.astro`, `.js` ou `.css`, execute `npm run build` ou `npx astro check` para garantir integridade antes de concluir.