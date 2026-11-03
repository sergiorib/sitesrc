# Contract: Contratos de Interface e Marcação UI da Página "Sobre mim"

**Feature**: `02-sobre`  
**Spec**: [spec.md](../spec.md)  
**Status**: Concluído

---

## 1. Estrutura Modular dos Componentes Astro (`pages/sobre/`)

```text
pages/sobre/
├── sobre.astro                       # Página principal injetada na SPA
├── components/                       # Componentes modulares
│   ├── AboutPanel.astro              # Painel Superior ("Sobre mim")
│   ├── SkillsPanel.astro             # Painel Inferior ("Habilidades")
│   ├── SkillCard.astro               # Card de categoria de habilidades
│   └── StarRating.astro              # Componente de 5 estrelas
└── assets/
    ├── css/
    │   └── sobre.css                 # Folha de estilo em CSS3 puro isolada
    └── images/                       # Ícones das tecnologias (18x18px)
        ├── icon-tensorflow.png
        ├── icon-pytorch.png
        ├── icon-scikit-learn.png
        ├── icon-xgboost.png
        ├── icon-python.png
        ├── icon-sql.png
        ├── icon-r.png
        ├── icon-dax.png
        └── icon-javascript.png
```

---

## 2. Contrato de Marcação HTML e Classes CSS

### 2.1 Contêiner Raiz da Página (`sobre.astro`)

```html
<div
  id="page-content"
  class="page-content-wrapper sobre-page"
  data-page-id="sobre"
  data-page-title="Sobre"
>
  <AboutPanel />
  <SkillsPanel />
</div>
```

**Regras CSS Contratuais**:
- `.sobre-page`:
  - `background: linear-gradient(to bottom, #16222A 0%, #3A6073 100%);`
  - `min-height: 100%;`
  - `padding: 20px;`
  - `display: flex; flex-direction: column;`

---

### 2.2 Painel Superior (`AboutPanel.astro`)

```html
<section class="info-panel about-panel">
  <h2 class="panel-title">Sobre mim</h2>
  <p class="about-bio-text">
    Cientista de Dados com sólida base em análise de sistemas e programação. Meu foco é traduzir desafios de negócio em soluções analíticas precisas, escaláveis e de alto impacto. A visão de ponta a ponta que adquiri ao longo dos anos me permite atuar com segurança em todas as etapas do ciclo de vida dos dados. Valorizo o aprendizado contínuo e a inteligência coletiva para construir resultados reais. Convido você a explorar os projetos e a trajetória que constroem essa visão.
  </p>
</section>
```

**Regras CSS Contratuais**:
- `.info-panel`:
  - `background: linear-gradient(to bottom, #DAEBF2 0%, #A8CCD9 100%);`
  - `border: 1px solid #0381B0;`
  - `border-radius: 10px;`
  - `box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), inset 0 -2px 4px rgba(0, 0, 0, 0.08);`
  - `padding: 10px;`
  - `margin-bottom: 10px;`
- `.panel-title`:
  - `font-family: 'Barlow Condensed', sans-serif;`
  - `font-weight: 700;`
  - `font-size: 32px;`
  - `color: #000000;`
  - `text-align: left;`
  - `margin-bottom: 10px;`
- `.about-bio-text`:
  - `font-family: 'Consolas', 'Courier New', monospace;`
  - `font-size: 20px;`
  - `color: #4A5B61;`
  - `line-height: 1.5;`
  - `text-align: justify;`

---

### 2.3 Painel Inferior (`SkillsPanel.astro`)

```html
<section class="info-panel skills-panel">
  <h2 class="panel-title">Habilidades</h2>
  <div class="skills-grid">
    <!-- 3 SkillCards em paralelo -->
  </div>
</section>
```

**Regras CSS do Grid**:
- `.skills-grid`:
  - Desktop (≥ 1024px): `display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;`
  - Tablet (768px - 1023px): `grid-template-columns: repeat(2, 1fr); gap: 12px;`
  - Mobile (< 768px): `grid-template-columns: 1fr; gap: 16px;`

---

### 2.4 Card de Categoria (`SkillCard.astro`)

```html
<div class="skill-card">
  <h3 class="category-title">MACHINE LEARNING & DEEP LEARNING</h3>
  <div class="skills-list">
    <div class="skill-row">
      <img src="/pages/sobre/assets/images/icon-tensorflow.png" alt="TensorFlow" class="tech-icon" width="18" height="18" />
      <span class="tech-name">TensorFlow</span>
      <div class="star-rating">
        <!-- 4 estrelas ativas e 1 inativa -->
      </div>
    </div>
  </div>
</div>
```

**Regras CSS Contratuais**:
- `.skill-card`:
  - `background: linear-gradient(to right, #FFEFBA 0%, #FFFFFF 100%);`
  - `border: 1px solid #0381B0;`
  - `border-radius: 10px;`
  - `padding: 16px;`
  - `display: flex; flex-direction: column;`
- `.category-title`:
  - `font-family: 'Barlow Condensed', sans-serif;`
  - `font-weight: 700;`
  - `font-size: 16px;`
  - `color: #386312;`
  - `margin-bottom: 10px;`
- `.skill-row`:
  - `display: flex; align-items: center; margin-bottom: 12px;`
- `.tech-icon`:
  - `width: 18px; height: 18px; object-fit: contain; flex-shrink: 0;`
- `.tech-name`:
  - `font-family: 'Barlow Condensed', sans-serif;`
  - `font-weight: 600;`
  - `font-size: 15px;`
  - `color: #000000;`
  - `margin-left: 8px;`

---

### 2.5 Componente de Avaliação (`StarRating.astro`)

```html
<div class="star-rating-container" aria-label="Avaliação: 4 de 5 estrelas">
  <svg class="star-icon active" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" /></svg>
  <svg class="star-icon active" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" /></svg>
  <svg class="star-icon active" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" /></svg>
  <svg class="star-icon active" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" /></svg>
  <svg class="star-icon inactive" viewBox="0 0 24 24"><polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" /></svg>
</div>
```

**Regras CSS Contratuais**:
- `.star-rating-container`:
  - `margin-left: auto;`
  - `display: inline-flex; align-items: center; gap: 3px;`
- `.star-icon`:
  - `width: 14px; height: 14px;`
- `.star-icon.active polygon`:
  - `fill: #2D4A22; stroke: #2D4A22;`
- `.star-icon.inactive polygon`:
  - `fill: transparent; stroke: #CCCCCC; stroke-width: 1.5;`
