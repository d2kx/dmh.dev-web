# dmh.dev-web

A modern, fast, and accessible developer portfolio and blog built using **Angular v22**, featuring Server-Side Rendering (SSR) and Static Site Generation (SSG / Prerendering).

---

## Technical Stack & Features

1.  **Framework:** Angular v22, using modern standalone components and signals-based reactivity.
2.  **Rendering:** Server-Side Rendering (SSR) with Hydration enabled. Dynamic routes are pre-rendered at build time (Static Site Generation) using the Angular route parameters provider.
3.  **Markdown Blog:** Blog posts are written in Markdown and stored in `content/blog/`. A custom Node.js script parses frontmatter metadata and copies body contents during the build step.
4.  **Translation (ngx-translate):** High-performance static translations (English/German) for legally required views (Legal Notice and Privacy Policy) to avoid SSR/hydration flicker.
5.  **Aesthetics:** Sleek light mode (default) and dark mode toggling (persisted via LocalStorage and applied in `index.html` header to prevent flickering). Responsive grid layout with sticky sidebar and mobile hamburger navigation. Styled with custom scrollbars, skeleton loaders, and interactive rainbow gradient hover states.
6.  **Typography:** Locally embedded **Outfit** font via Fontsource for self-hosting compliance.
7.  **Testing:** Configured with Vitest for fast unit test execution.

---

## Getting Started

### Installation
Install project dependencies:
```bash
npm install
```

### Development Server
Start the local development server:
```bash
npm run start
```
*This will automatically run the blog metadata compilation script (`scripts/generate-blog-metadata.js`) before launching `ng serve`.*

Navigate to `http://localhost:4200/`. The app will reload automatically when source files change.

### Production Build
Build the application and prerender static HTML routes:
```bash
npm run build
```
*Compiled HTML output is stored under `dist/dmh.dev-web/browser/`.*

### Running Unit Tests
Execute unit tests via Vitest with the Angular CLI builder:
```bash
npm run test
```

---

## Directory Structure

*   `content/blog/` — Raw Markdown posts (`.md`) with YAML-like frontmatter.
*   `scripts/` — Node.js prebuild scripts (e.g., Markdown metadata compiler).
*   `public/` — Static assets copied directly to the browser output root (e.g., blog metadata, clean markdown bodies).
*   `src/app/components/` — Standalone UI components (Home, About, Blog Post, Legal Notice, Privacy Policy).
*   `src/app/services/` — Core Signal-driven services (Theme, Blog, SEO).
*   `src/app/i18n/` — Static English and German localization files.
