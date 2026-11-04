# Implementation Plan: Estrutura e Estilização da Página "Artigos" (`artigos.astro`)

**Branch**: `06-artigos` | **Date**: 2026-11-04 | **Spec**: [.specify/specs/spec-06_artigos.md](../spec-06_artigos.md)

**Input**: Feature specification from `.specify/specs/spec-06_artigos/spec.md`

## Summary

Implement the technical articles page (`artigos.astro`) based on `exemplo_06_pagina_artigos.html`, featuring a 2-column grid of 13 interactive topic groups (accordions, subgroups, leaf items with selection and redirect), header with gradient rule, responsive layout for tablet/mobile, and strict separation of CSS (`artigos.css`), JS (`artigos.js`), and images into dedicated directories (`pages/artigos/assets/`).

## Technical Context

**Language/Version**: Astro 4.x / HTML5 / CSS3 / Vanilla JavaScript (ES6+)
**Primary Dependencies**: Astro, SPA router integration (`router.js`)
**Storage**: N/A (Static Astro pages with dynamic SPA injection)
**Testing**: Visual and functional validation against reference HTML design
**Target Platform**: Modern web browsers (Desktop, Tablet, Mobile)
**Project Type**: Web portfolio SPA component page

## Project Structure

```text
pages/
├── artigos.md
├── artigos/
│   ├── artigos.astro
│   └── assets/
│       ├── css/
│       │   └── artigos.css
│       ├── js/
│       │   └── artigos.js
│       └── images/
└── spa/
    └── artigos.astro
```

**Structure Decision**: Fully adheres to the established project architecture where each page has its own dedicated directory under `pages/` containing `.astro`, `.md`, and an `assets/` subfolder with `css/`, `js/`, and `images/`, plus SPA wrapper registration in `pages/spa/`.
