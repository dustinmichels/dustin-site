# Tasks

Audit findings from codebase review — logic issues and style/content separation violations.

---

## Medium Priority

- [x] **#1 — HTML/Tailwind classes embedded in TOML config**
      `hugo.toml:20-23` — `hero_title`, `hero_subtitle`, and `mission_text` contain raw `<span>` tags with Tailwind classes. Style changes require editing config rather than templates. Move markup to the layout; keep config as plain text.

- [x] **#4 — Hardcoded copy in games layout**
      `layouts/games/list.html:7` — The "under construction" description text is hardcoded in the layout file. Move it to `content/games/_index.md` and render `{{ .Content }}` in the template.

- [x] **#7 — Tailwind loaded via CDN runtime**
      `layouts/partials/head.html:10` — Full Tailwind runtime (~300KB) is fetched from CDN and compiled in-browser. No tree-shaking/purging, external dependency, not suitable for production. Migrate to Tailwind CLI or PostCSS build step.

---

## Low Priority

- [x] **#2 — Duplicate comment blocks in homepage layout**
      `layouts/index.html:42-52, 59-60` — Several comment blocks are copy-pasted twice in a row. Clean up.

- [x] **#3 — JS re-implements Hugo's active nav logic**
      `main.js:144-185` — `updateNavState()` duplicates the server-side active-link logic from `layouts/partials/nav.html:19-26`. The JS version uses fragile `startsWith` string matching. Necessary for Swup transitions, but worth hardening (e.g. compare against known route prefixes explicitly).

- [x] **#5 — Dead lorem ipsum in homepage content**
      `content/_index.md:7-9` — Body content is never rendered (the homepage layout has no `{{ .Content }}` call). Either delete the placeholder text or wire up the template to render it.

- [x] **#8 — taxonomy.html and term.html are unstyled scaffolding**
      Both files are identical bare-bones templates with no styling. If taxonomies are never used, delete them. If they might be used, style them to match the site.

---

## Info

- [ ] **#6 — `_default/list.html` is likely never reached**
      All sections have their own list layouts (`writing`, `portfolio`, `games`). The default list is a generic fallback that won't match the site's design if a new section is added without a custom layout.
