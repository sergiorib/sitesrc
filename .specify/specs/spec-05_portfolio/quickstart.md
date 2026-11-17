# Quickstart: Portfolio Page Validation Guide

## Prerequisites
- Node.js installed (v18+)
- Repository dependencies installed (`npm install`)

## Build & Run Validation
1. Start the development server or build the static site:
   ```bash
   npm run build
   ```
2. Verify that `portfolio.astro` compiles successfully without errors and assets under `pages/portfolio/assets/` are correctly bundled.
3. Test SPA navigation by opening the application, navigating to the Portfolio page, verifying fixed header category buttons, category anchors scrolling, and clicking project cards to open project subpages within `#page-content-host` without full page reloads.
