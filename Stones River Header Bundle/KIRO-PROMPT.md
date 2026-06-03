STONES RIVER WEBSITE — add the new banner header with navigation
(If this is not the Stones River / Kittel website project, disregard this message.)

────────────────────────────────────────────────────────

I have a ready-to-integrate website header component in a folder called
"Stones River Header Bundle" (the banner artwork + a frosted-glass navigation bar
overlaid on it, plus the Fira Sans web fonts). Please add it to this site.

WHAT I'M GIVING YOU (in the bundle):
- stones-river-header.css        → the component styles
- assets/stones-river-banner.webp, stones-river-banner-1920.webp, stones-river-banner.jpg
- assets/fonts/FiraSans-Regular.woff2, FiraSans-Medium.woff2, FiraSans-SemiBold.woff2
- index.html                     → a working reference of the exact markup
- README.md                      → full integration notes

PLEASE DO THE FOLLOWING:

1. Copy the assets into this project:
   - stones-river-header.css → wherever global/component CSS lives.
   - the 3 banner images and the 3 fonts → the static/assets folder, preserving the
     relative path assets/fonts/... (or update the url() paths in the CSS and the
     src/srcset paths in the markup to match this project's structure).

2. Load the stylesheet site-wide (in the shared <head> / layout):
   <link rel="stylesheet" href="<correct-path>/stones-river-header.css" />

3. Put the header at the top of the site's shared layout so it appears on every
   page, using the exact markup from index.html / README.md. Wire the six nav
   links to this site's real routes:
     Home        → /
     About       → /about         (use the real route)
     Experience  → /experience
     The Makers  → /makers
     Gallery     → /gallery
     Preorder    → /preorder      (the CTA button)

4. Add the small mobile-menu toggle behavior. Plain-HTML version is in README.md.
   If this site is a framework (React/Next/Vue/etc.), implement the equivalent:
   on hamburger click, toggle the .sr-nav element's data-open attribute between
   "true" and "false" (and mirror it on aria-expanded). The CSS handles the rest.

HARD CONSTRAINTS:
- Do NOT modify, recolor, crop, or regenerate the banner artwork — overlay only.
- Keep the class names exactly as given (sr-header, sr-nav, sr-nav__link,
  sr-nav__cta, sr-nav__toggle, sr-nav__links). They're namespaced to avoid clashes.
- The header is full-bleed (edge-to-edge) by default — keep it that way unless I say
  otherwise. (If a page has a max-width container, the header should sit OUTSIDE it
  so it spans the full window.)
- Keep all colors as the CSS variables already defined in :root — don't hardcode.
- If the banner is ever replaced, also update --sr-banner-ratio in the CSS to the new
  image's width / height.

When done, show me the header rendering on the homepage at desktop and mobile widths.
