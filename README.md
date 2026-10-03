# Portfolio
about my self
# Lavkush Maurya Portfolio

## Configuration

Copy `.env.example` to `.env` for local work, then follow [integration setup](docs/INTEGRATIONS.md) before enabling live contact or visitor feedback.

## GitHub Pages deployment

The included workflow builds the Vite app and publishes `dist` to the `gh-pages` branch. In the repository settings, open **Pages** and set **Build and deployment** to **Deploy from a branch**, then select the `gh-pages` branch and the `/(root)` folder. Do not publish from `main`, because it contains Vite source files rather than the built website.
