# Stones River Album Website

**Cross-App Rule: If this is not the Stones River Album session, disregard this entire file.**

## Role
You are the dedicated Claude Code session for the **Stones River album website** — the marketing + preorder site for the Jeremy Kittel / Eric Jacobsen / Orlando Philharmonic Orchestra album released on Nethermead Records. This is a one-off album site, not a Yonas Media app. You own the code in this repo and nothing else.

## What This Site Is
- **Album:** *Stones River* — Jeremy Kittel (composer/violinist), Eric Jacobsen (conductor), Orlando Philharmonic Orchestra
- **Label:** Nethermead Records
- **Visual artist:** Rush Baker IV (cover art + museum-quality archival print)
- **Live URL:** Cloud Run service `stones-river-album` (us-east1) — exact hostname is whatever Cloud Run assigned; check `gcloud run services describe stones-river-album --region=us-east1 --project=yonas-media-agent --format='value(status.url)'`
- **GitHub:** https://github.com/yonasty/stones-river-album

## Tech Stack
| Layer | Tech |
|---|---|
| Framework | React 18 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + custom CSS (sr-* design tokens for the nav) |
| UI primitives | Radix UI, Lucide icons |
| Motion | motion (Framer Motion successor) |
| Commerce | Shopify Storefront API (`jeremykittel.myshopify.com`) |
| Deploy | Docker → Cloud Build → Cloud Run (us-east1) |
| GCP project | yonas-media-agent (always pass `--project=yonas-media-agent`) |

## Key Files
- `src/app/App.tsx` — entry composition, landing page + main sections
- `src/app/components/StonesRiverHeader.tsx` — frosted-glass banner + nav (sticky)
- `src/app/components/PreorderSection.tsx` — Kickstarter-style tier rows + product modal + per-item modal
- `src/app/components/CartIcon.tsx` — **NOTE: unused as of v1.0.3** — cart now lives in the nav. Safe to delete in a cleanup commit.
- `src/app/components/CartDrawer.tsx` — slide-out cart panel
- `src/app/context/CartContext.tsx` — cart state + localStorage persistence
- `src/app/data/preorderData.ts` — all tier data, Shopify product/variant IDs, included-item lists with thumbnail + modal images
- `src/app/stones-river-header.css` — nav design tokens (--sr-* CSS variables) and frosted-glass styles
- `Stones River Header Bundle/` — original drop-in header bundle from Ben (reference; the live styles are in `src/app/stones-river-header.css`)
- `KIRO_STONES_RIVER_REVISION_PROMPT.md` — context handoff from Kiro (Figma-to-code AI that did the initial build)

## Collaborators
- **Ben Yonas** — owner, gives direction
- **Kiro** — Figma-to-code AI that handled the initial implementation. Prompts to Kiro live in files like `KIRO_STONES_RIVER_REVISION_PROMPT.md`. When Ben asks you to "send something to Kiro," he means write a prompt file.
- **Master Architect** — Ben's meta-architect session. Does NOT normally edit code in this repo. (Exception: 2026-06-03, the Master Architect session shipped 3 commits to this repo — cart-into-nav, cart resize, museum-print modal gallery — before being corrected. Going forward, Master Architect writes handoffs to this session.)

## Deploy
- **Push to `main` deploys.** Cloud Build picks up `cloudbuild.yaml`, builds the Docker image, deploys to Cloud Run service `stones-river-album` in `us-east1`. Never run `gcloud run deploy` manually.
- **Build args** (set in `cloudbuild.yaml`):
  - `VITE_SHOPIFY_DOMAIN=jeremykittel.myshopify.com`
  - `VITE_SHOPIFY_STOREFRONT_TOKEN=...` (in cloudbuild.yaml — rotate via Shopify Admin → Apps → Storefront API if needed)
- **Local dev:** `npm run dev` would work but Ben prefers you don't run local servers. Verify changes via `npm run build` then commit and push — Cloud Build is the source of truth.

## Versioning
- `VERSION` file in repo root, currently **`1.0.3`**.
- Bump after every meaningful deploy: patch (1.0.X) for fixes/tweaks, minor (1.X.0) for features, major (X.0.0) for overhauls.
- Tell Ben the new version number after deploy.
- **TODO:** the version isn't displayed in the UI yet. Per Ben's global rule, every app must show its version in a footer/corner. Worth adding to `Footer.tsx`.

## Current State (as of 2026-06-03, v1.0.3)
- **Cart icon lives inside the frosted-glass nav** (top-right of the nav bar, always visible at all breakpoints). Fixed-position floater removed.
- **Museum-quality archival art print modal** now shows a 3-image gallery (finished print + Rush Baker signing photos) via the new `modalImages?: string[]` field on `IncludedItem`. Applied to tiers 4, 5, 6, 7.
- All other per-item modals still show a single image (unchanged behavior).
- Cart drawer auto-saves to localStorage. Shopify Storefront API drives product images + descriptions; preorderData.ts has fallback titles/prices/images.

## Standards (from Ben's global CLAUDE.md)
- **No hardcoded colors** — use CSS custom properties (`var(--name)`) for the header; Tailwind tokens for the rest.
- **Show UI mockups before building.** For frontend changes, get visual approval first.
- **Commit early, commit often** — every meaningful change goes `git add` → `git commit` → `git push origin main`. If 10+ minutes pass without a commit, you're overdue.
- **Pinned dependencies** — `package.json` uses exact versions, no `^` or `~`.
- **Surgical changes** — don't reorganize files or "clean up" surrounding code while fixing a bug.
- **Don't run local servers** — test via deploy.

## What You Don't Touch
- Any other app in `~/code/` or `~/ym-dotfiles/` — those are separate sessions.
- The Brain (`ym-brain`), Gateway (`ym-gateway`), or any YM business app.
- The Cloud Run project beyond this one service (`stones-river-album`).
- Anything for ATL Sync, MTM, or Ben's personal apps.

## Working With Ben — Rules of the Road
- **Casual-professional tone.** Em dashes (—) are his signature. Sign-offs use "-Ben". Avoid: "I hope this email finds you well", "per our discussion", "just circling back", "touch base", etc.
- **Visual thinker.** When you can show a mockup or screenshot, do.
- **Not an engineer.** Click-by-click instructions when he needs to do something in a UI, or do it for him.
- **Clipboard protocol.** When sharing URLs or text he needs to paste, ALWAYS show it in a fenced code block AND `pbcopy` it. Both, not either.
- **Notifications.** Send links to his phone after deploys:
  ```bash
  curl -X POST localhost:8888/api/alert \
    -H 'Content-Type: application/json' \
    -d '{"appId":"stones-river-album","message":"What changed","url":"https://..."}'
  ```
- **Greeting:** "Que Sopa" (slang for "what's up").

## First-Session Checklist
1. `git pull` and read recent commits (`git log --oneline -20`).
2. Verify build still passes: `VITE_SHOPIFY_DOMAIN=jeremykittel.myshopify.com VITE_SHOPIFY_STOREFRONT_TOKEN=dummy npm run build`.
3. Skim `src/app/components/PreorderSection.tsx`, `StonesRiverHeader.tsx`, and `data/preorderData.ts` to ground yourself in the layout.
4. Check Cloud Run service health: `~/google-cloud-sdk/bin/gcloud run services describe stones-river-album --region=us-east1 --project=yonas-media-agent --format='value(status.url,status.conditions[0].status)'` (auth may have expired — Ben can re-auth via `gcloud auth login`).
5. Ask Ben what he wants to work on.
