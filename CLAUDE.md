# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Kristine Tan's personal portfolio site — a static HTML/CSS/JS site with **no build step, no package manager, and no test suite**. Each page is a single self-contained `.html` file with its own inline `<style>` block (and small inline `<script>` where needed, e.g. the homepage's category filter). She's a Learning Experience Designer / Instructional Designer, so most project pages showcase e-learning work (Articulate Storyline, Canvas modules, corporate LXP courses).

## Commands

There is nothing to install or build. To preview locally, just open the HTML file in a browser or serve the directory statically, e.g.:

```
python -m http.server 8000
```

There is no lint or test command in this repo.

## Deployment

- Remote: `origin` → `https://github.com/KristineTan/portfolio.git`
- Served live via GitHub Pages at `https://kristinetan.github.io/portfolio/`
- Pushing to `main` deploys directly — no CI/build step. GitHub Pages rebuild takes roughly 30–90 seconds after push. Confirm with the user before pushing, since it goes straight to the live public site.

## Architecture

**Every page duplicates its own CSS variables and fonts inline** rather than sharing a stylesheet. `design-tokens.css` exists in the repo root but **is not linked from any page** — treat it as unused/stale, not a source of truth. When editing colors/type, edit the `:root` block inside the specific HTML file, and expect to repeat the change across files if it should apply site-wide.

All pages share the same type pairing: 'Playfair Display' (headings) + 'Inter' (body). Color variable names still differ by page type — this is cosmetic (different token names for the same idea), not a second design system:

- **Homepage (`index.html`)**: `--sage: #3E513E`, `--paper: #FFFFFF`, `--paper-alt: #F6F5F2`, `--ink: #111111`.
- **Individual project pages** (`project-*.html`, `harvard-project.html`, `pharma-meeting.html`, `data-fluency.html`, etc.): `--sage-green: #3E513E`, `--dark-charcoal: #2A2C24`, `--olive-brown: #575A4B`, `--taupe: #816C61`.

**Project page template** — reuse this shape for new project pages rather than inventing a new layout:
- Sticky `nav` (logo "KT", nav links, LinkedIn `connect-btn`)
- `.project-page` main containing:
  - `.back-link` ("← Back to Portfolio", links to `index.html`)
  - `.project-header` (`.project-number`, `h1`, `.project-intro`)
  - `.project-body`: a two-column grid of `.project-content` (case-study prose/sections) and a sticky `.project-sidebar` ("Specifications" card listing My Role / Context / Tools as `.meta-label`/`.meta-value` pairs)

**Homepage project grid**: new projects are added as an `.dg-card` inside the `.dg-feed` grid in the Projects section of `index.html`. Each card needs a `data-category` attribute matching one of the filter tabs wired up via `filterProjects()`: `learning-design`, `data-analysis`, `workflow` (or `all`). A card can be marked `.dg-card-featured` for the large hero-style treatment (see the Meeting-Design Competencies card).

**Work samples**: real, playable e-learning deliverables (Articulate Storyline exports, etc.) live under `work-samples/<project-name>/`, committed to the repo in full (including all generated assets — HTML5 output, slide XML, mobile image fallbacks). Project pages link to `work-samples/<project-name>/story.html` (or equivalent entry file) as a relative in-repo path.

When asked to feature a new local export (e.g. a Storyline export at a `file:///C:/...` path), copy the entire export folder into `work-samples/<project-name>/` and link the relative in-repo path — a `file://` URL only resolves on the author's own machine and is dead for site visitors. These exports are normally self-contained with relative asset paths (no rebuild/re-export needed), but grep the exported HTML for `C:\Users` or `file:///` to confirm before assuming portability.

## Accessibility

Every page (fonts, layout, color, headings, images, links) should meet WCAG AA:

- **Color contrast**: 4.5:1 for body text, 3:1 for large text (≥24px, or ≥19px bold) and headings. Check new color pairs before using them — current palette: `--dark-charcoal`/`--sage-green` pass on white; verify `--taupe`/`--olive-brown` against the specific background before using them for body copy.
- **Headings**: one `<h1>` per page, no skipped levels (don't jump `h2` → `h4`).
- **Images**: every `<img>` gets meaningful `alt` text; use `alt=""` only for purely decorative images.
- **Charts/graphs**: draft alt text describing the data/trend shown (not just "chart of X"), but treat it as a draft — show it to Kristine for review/edit before adding it to the page. Don't publish auto-generated alt text unreviewed.
- **Links**: link text should describe the destination on its own (avoid bare "click here"; if the visible text is generic like "View project", pair it with `aria-label` for more context).
- **Focus states**: interactive elements (`.dg-card`, nav links, buttons) need a visible `:focus` style, not just `:hover`.
- **Font size**: body text no smaller than 16px equivalent.
