# Hugo Custom Theme Development: Agent Guide

## Layout

```text
.
├── assets/           # Source files for Hugo Pipes (SCSS, JS, TS)
├── content/          # Content (.md). Hierarchy defines URLs.
├── data/             # Structural data (YAML/JSON) for non-page UI.
├── layouts/          # Root overrides (takes precedence over theme).
├── static/           # Verbatim files (Favicons, CNAME, static images).

```

## 2. Core Best Practices

- **Template Logic:** Always start with `_default/baseof.html` using `{{ block "main" . }}` to maintain a DRY (Don't Repeat Yourself) skeleton.
- **Asset Processing:** Place CSS/JS in `assets/` (not `static/`). Use Hugo Pipes for minification and fingerprinting:
  `{{ $style := resources.Get "css/main.css" | minify | fingerprint }}`.
- **Context Management:** When calling partials, pass the current context `.` or specific variables: `{{ partial "nav.html" . }}`.
- **Image Processing:** Use `.Resize` or `.Fill` on Page Resources to automate WebP generation and responsive sizes.
- **URL Safety:** Always wrap internal links in `{{ "path/to/page" | relURL }}` or `absURL` to ensure they work in sub-directory deployments.

## 3. Workflow Priorities

1. **Archetypes:** Define `archetypes/default.md` to enforce consistent Front Matter.
2. **Headless Bundles:** Use `headless = true` in Front Matter for content used only as data for other pages.
3. **Lookup Order:** Remember: `layouts/` > `themes/<name>/layouts/`.
