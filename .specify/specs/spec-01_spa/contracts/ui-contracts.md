# Contract: Contratos de Interface e Marcação UI

**Feature**: `01-pagina-spa`  
**Spec**: [spec.md](../spec.md)  
**Status**: Concluído

---

## 1. Contrato Estrutural dos Componentes Astro (`pages/spa/`)

### 1.1 Hierarquia de Componentes

```text
pages/spa/
├── spa.astro                     # Layout mestre SPA (100vw / 100vh)
├── default.astro                 # Página de fallback 404
├── components/
│   ├── IdentityHeader.astro      # Cabeçalho da Sidebar (275px)
│   ├── NavMenu.astro             # Contêiner da lista de navegação
│   ├── NavItem.astro             # Item de menu individual (50px, border-radius: 20px)
│   ├── Breadcrumbs.astro         # Régua horizontal discreta no topo do Main Container
│   └── MainContainer.astro       # Contêiner principal de injeção dinâmica
```

---

## 2. Contrato de Elementos e Atributos DOM

### 2.1 Itens do Menu (`NavItem.astro`)

Cada botão de menu é renderizado com a estrutura semântica:

```html
<a
  href="/pages/sobre"
  class="nav-item active"
  data-menu-id="sobre"
  data-target-file="sobre.astro"
  aria-current="page"
>
  <span class="nav-icon-container">
    <img 
      src="pages/spa/assets/images/icone-sobre-claro.png" 
      class="icon-light" 
      alt="Ícone Sobre Claro" 
    />
    <img 
      src="pages/spa/assets/images/icone-sobre-escuro.png" 
      class="icon-dark" 
      alt="Ícone Sobre Escuro" 
    />
  </span>
  <span class="nav-label">Sobre</span>
</a>
```

**Regras de Estilização por Classe CSS**:
- `.nav-item`:
  - `width: 93%`;
  - `height: 50px`;
  - `margin: 8px auto`;
  - `border-radius: 20px`;
  - `display: flex; align-items: center; padding: 0 16px; text-decoration: none;`
- `.nav-item:not(.active)`:
  - `background-color: #061B2A;`
  - `border: 1px solid #69C4CE;`
  - `color: #EDF2EE;`
  - `.icon-light { display: block; }`
  - `.icon-dark { display: none; }`
- `.nav-item.active`:
  - `background-color: #B3CBDB;`
  - `border: 1px solid #69C4CE;`
  - `color: #061B2A;`
  - `.icon-light { display: none; }`
  - `.icon-dark { display: block; }`

---

### 2.2 Cabeçalho de Identidade (`IdentityHeader.astro`)

```html
<header id="identity-header" class="identity-header">
  <div class="profile-photo-wrapper">
    <img 
      src="pages/spa/assets/images/profile-photo.png" 
      alt="Foto de perfil de Sérgio Ribeiro Cerqueira" 
      class="profile-photo" 
    />
  </div>
  <div class="identity-contrast-strip">
    <h1 class="profile-name">Sérgio Ribeiro Cerqueira</h1>
    <p class="profile-role">Cientista de Dados</p>
  </div>
</header>
```

**Parâmetros CSS Contratuais**:
- Altura do contêiner: `275px` fixos.
- Fundo: `background-image: url('pages/spa/assets/images/profile-bg.png'); background-size: cover; border-bottom: 2px solid #69C4CE;`.
- `.profile-photo`: circular `160px` diâmetro, `object-fit: cover`.
- `.profile-photo-wrapper`: moldura com gradiente `linear-gradient(to bottom, #3893BA, #25797F)`.
- Tipografia: `font-family: 'Barlow Condensed', sans-serif; font-weight: 600;`.
  - Nome: `font-size: 30px; color: #FFFFFF; text-align: center;`
  - Cargo: `font-size: 25px; color: #FFFFFF; text-align: center;`
- `.identity-contrast-strip`: `background-color: rgba(6, 27, 42, 0.75);` (cor `#061B2A`).

---

### 2.3 Régua de Breadcrumbs (`Breadcrumbs.astro`)

```html
<nav id="breadcrumbs" class="breadcrumbs-bar" aria-label="Navegação Estrutural">
  <ol class="breadcrumbs-list">
    <li class="breadcrumb-item">
      <a href="/pages/portfolio" class="breadcrumb-link">Portfólio</a>
    </li>
    <li class="breadcrumb-separator" aria-hidden="true">/</li>
    <li class="breadcrumb-item current" aria-current="page">
      <span class="breadcrumb-current-text">Projeto 01</span>
    </li>
  </ol>
</nav>
```

**Parâmetros Visuais Contratuais**:
- Localização: Topo do Main Container.
- Apresentação: Discreta, tamanho reduzido, alinhamento horizontal em linha única.
- Separador: Barra `/` com opacidade reduzida e cor neutra suave.
- Links ancestrais: Estilizados com cor de realce suave e transição de hover.
- Elemento terminal: Apenas texto, sem link, indicando foco atual.

---

### 2.4 Contêiner Principal (`MainContainer.astro`)

```html
<div id="main-container" class="main-container">
  <Breadcrumbs />
  <section id="page-content-host" class="page-content-host" tabindex="-1">
    <!-- Conteúdo da página ativa é injetado aqui -->
  </section>
</div>
```

**Parâmetros CSS Contratuais**:
- Preenchimento: `flex: 1; height: 100vh; overflow-y: auto; display: flex; flex-direction: column;`.
- Fundo: Dark Tech visual (tons escuros compatíveis com a paleta do portfólio).
- Barra de rolagem interna dedicada quando o conteúdo ultrapassar a altura da viewport.
