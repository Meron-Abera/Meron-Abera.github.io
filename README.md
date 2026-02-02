# Meron-Abera.github.io

Personal profile site – GitHub Pages with semantic release.

## How the automation works

- **Trigger:** Every push to `main` runs the [Release and Deploy](.github/workflows/release.yml) workflow.
- **Semantic Release (job: `release`):** Reads commit history using [Conventional Commits](https://www.conventionalcommits.org/). It computes the next version (no hardcoded versions), updates `CHANGELOG.md`, bumps `package.json` version (without publishing to npm), commits those changes with `[skip ci]`, creates a git tag (e.g. `v1.0.0`), and creates a GitHub Release with notes. Commit types: `feat:` → minor, `fix:` → patch, `feat!:` or `BREAKING CHANGE:` → major; `docs:`, `style:`, `refactor:`, `chore:` do not bump the version.
- **Build (job: `build`):** Checkout and package only site files (`index.html`, `styles.css`, `script.js`, `formal-photo.png`, `Images/`) into a Pages artifact.
- **Deploy (job: `deploy`):** Publishes that artifact to GitHub Pages so the site is live at `https://meron-abera.github.io`. Requires **Settings → Pages → Source: GitHub Actions** and the `github-pages` environment.
- **Pipeline:** Runs without manual versioning or deploy steps; an AI or human can push conventional commits and the pipeline handles release and deployment.
