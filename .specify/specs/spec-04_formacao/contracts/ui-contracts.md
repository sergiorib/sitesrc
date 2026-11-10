# UI Contracts: Página "Formação" (`formacao.astro`)

**Feature**: `04-formacao` (Página "Formação")  
**Spec**: [spec.md](./spec.md)  
**Status**: Concluído

---

## 1. Contrato de Roteamento e DOM SPA

- **Container Raiz**: A página deve expor um elemento `#page-content` com atributos:
  - `data-page-id="formacao"`
  - `data-page-title="Formação"`
- **Régua de Breadcrumbs**: O roteador atualiza automaticamente o breadcrumb para refletir `Formação`.

---

## 2. Contrato de Estilização e Design System

- **Fundo Global**: `linear-gradient(to bottom, #16222A, #3A6073)`
- **Título da Página**: `Barlow Condensed`, 700 bold, 32px
- **Título da Seção**: `Barlow Condensed`, 700 bold, 28px, `#ffffff`
- **Cards**: Gradiente `linear-gradient(to right, #FFF8D6, #FFFFFF)`, borda `1px solid #0381B0`, `border-radius: 10px`
- **Badges**: Fonte monoespaçada (`Consolas`/`Courier New`), uppercase, border-radius `20px`, borda `1px solid #0381B0`
