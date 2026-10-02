# Lavkush Maurya - Portfolio

A responsive React + TypeScript portfolio with component-scoped CSS Modules, light/dark themes, and accessible motion.

## Development

```sh
npm install
npm run dev
```

## Visitor count

The footer displays a visitor total from the Spring API in `../auth-api`. All portfolio sections also load from that API. In development, Vite proxies `/api` to `http://localhost:8080`; start the API with `cd ../auth-api && .\\mvnw.cmd spring-boot:run`.

Each browser is counted once using local storage. The API saves the running total to `auth-api/data/visitor-count.txt`, so it survives API restarts. For separate frontend/API deployments, set `VITE_VISITOR_API_URL` to the API's full `/api/visitors` URL and set `CORS_ALLOWED_ORIGINS` on the API to the frontend origin.

Portfolio content is served by `GET /api/portfolio` from `auth-api/data/portfolio.json`. Edit that backend file to update the profile, navigation, skills, experience, education, projects, contact copy, and UI labels without rebuilding the React app. For a separate API deployment, set `VITE_PORTFOLIO_API_URL` to its full `/api/portfolio` URL.

## Checks

```sh
npm run build
npm run lint
npm run format:check
```

## Structure

- src/components/: each portfolio section has its own TSX and CSS Module.
- src/components/ui/: reusable buttons, brand, icons, tags, headings, scroll progress, and reveal animation.
- src/hooks/: theme persistence and active-section tracking.
- src/context/PortfolioContext.tsx: API-loaded portfolio content shared by every section.
- src/types/portfolio.ts: TypeScript contract for the API response.
- src/styles/globals.css: reset, theme tokens, base typography, and reduced-motion preferences.
- src/styles/layout.module.css: shared layout and visual utilities.
- public/: profile photograph, resume PDF, and custom favicon.

Edit `../auth-api/data/portfolio.json` to update the website content. The API reads it for each request, so changes are shown after a page refresh without rebuilding the frontend. Keep navigation IDs matched to existing section IDs (home, about, skills, experience, projects, contact), use valid JSON, and keep resume/portrait files in `public/` (or use full HTTPS URLs).

## Motion

Reveal observes each section/card once, with small per-card delays. CSS handles button feedback, card lifts, portrait accents, and mobile menu entry. Scroll progress is updated through requestAnimationFrame. Reduced-motion preferences disable decorative motion and keep all content visible.

## Contact and projects

The contact form opens an email draft; it does not send mail or require a backend. Project illustrations are decorative, not screenshots. Add verified repository/demo links when available.
