# eduplusapps.com

Parent / family site for **EDU Plus Apps** — software for K-12 educators and staff. Built with Astro + Tailwind CSS, deployed to Cloudflare Workers (Static Assets) on push to `main`.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs to ./dist
npm run preview
```

## Project structure

```
src/
  components/      # Astro components (Hero, Products, About, Contact, Nav, Footer)
  layouts/
    Layout.astro   # Base HTML layout with shared meta, JSON-LD, Nav, Footer
  pages/
    index.astro    # The parent EDU Plus Apps homepage
public/
  privacy/         # Static HTML — Privacy Policy (preserved as-is, see note below)
  support/         # Static HTML — Support page (preserved as-is, see note below)
  tldr/            # Static HTML — MCP TLDR utility page (preserved as-is)
  icon.png         # 1024×1024 EDU Plus Apps icon
  favicon.png      # 256×256 favicon
  og-image.png     # 1200×630 social share image (run scripts/generate-og.mjs)
  robots.txt
  _headers         # Cloudflare security headers
scripts/
  generate-og.mjs  # Regenerate og-image.png after icon/headline changes
```

## Legacy static pages — `/privacy/`, `/support/`, `/tldr/`

The Privacy Policy, Support, and TLDR pages live as **plain static HTML in `public/`** rather than as Astro pages. They were intentionally **not** migrated to the new Astro chrome during the parent-site build to avoid changing user-facing content during the EDU Mileage+ App Store submission window.

**Future migration:** When there's appetite to re-skin them with the parent site's chrome, the work is:

1. Convert each `public/<page>/index.html` to a corresponding `src/pages/<page>.astro` using the shared `Layout.astro`.
2. Move the existing root-level static directories (`/privacy/`, `/support/`, `/tldr/`) and the orphaned redirect `index.html` out of the repo (they're inert today; Cloudflare only serves files from `dist/`).
3. Verify the App Store Connect Support URL (`/support/`) and Privacy Policy URL (`/privacy/`) still return the same content before pushing.

Until then, the static pages are byte-identical to the pre-Astro versions and continue to serve at their original URLs.

## Deployment

Connected to Cloudflare Workers via Git integration on `dreaves-paprika/eduplusapps-site`. Cloudflare auto-builds on push to `main`.

Cloudflare dashboard build settings:

| Field | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npm run build && npx wrangler deploy` |
| Root directory | (default) |

`wrangler.jsonc` declares the static assets directory (`./dist`).
