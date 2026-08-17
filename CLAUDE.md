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
- `src/app/App.tsx` — entry composition, landing page + main sections. `hasEntered` state gates the site behind `LandingPage`.
- `src/app/components/LandingPage.tsx` — full-screen video splash + **pre-launch password gate** (Enter button lifts away to reveal a password prompt; correct password fades into the site)
- `src/app/components/StonesRiverHeader.tsx` — frosted-glass banner + nav (sticky)
- `src/app/components/PreorderSection.tsx` — Kickstarter-style tier rows + product modal + per-item modal
- `src/app/components/CartIcon.tsx` — **NOTE: unused** — cart now lives in the nav. Safe to delete in a cleanup commit.
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
- `VERSION` file in repo root, currently **`2.16.1`**.
- Bump after every meaningful deploy: patch (1.0.X) for fixes/tweaks, minor (1.X.0) for features, major (X.0.0) for overhauls.
- Tell Ben the new version number after deploy.
- **No UI version display.** This is a public-facing marketing site, so it's exempt from the global "show version in a footer/corner" rule (Ben, 2026-06-03). Keep the `VERSION` file and keep bumping it after deploys, but do not surface it in the UI.

## Current State (as of 2026-08-17, v2.16.1)
- **Naming rule — "Orlando Philharmonic Orchestra" takes NO definite article** (Ben, 2026-08-17). Not "The Orlando Philharmonic Orchestra", and not "…and the Orlando Philharmonic Orchestra" mid-sentence either. Applied site-wide in v2.16.0: bio name + alt text, quote-image alt, banner alt, About copy, About-the-Album copy, and the OPO bio's opening sentence. Short informal references that aren't the full name ("the Philharmonic") were left alone. Keep new copy consistent with this.
- **Bio photo credits (v2.16.0):** `BioData` has an optional `photoCredit?: string` (`biosData.ts`) rendered as small dimmed text (`text-white/40 text-xs`) directly under the image in the bio modal — modal only, not on the card. Eric Jacobsen: "Photo: Ben Van Hook". Orlando Philharmonic Orchestra: "Photo courtesy of Orlando Philharmonic". Jeremy Kittel has none.
- **No mentions of The Knights or Brooklyn Rider anywhere on the site** (Ben, 2026-08-17). Two separate removals: the sentence about The Knights / NYC-based chamber orchestra in Eric's bio (`biosData.ts`, v2.16.0), and the "(The Knights, Brooklyn Rider)" parenthetical after Eric's name in the About-the-Album copy (`FullBioSection.tsx`, v2.16.1). Don't reintroduce either.
- **Producers section heading reads "Associate Producers"** (was "Honorary Producers", changed 2026-08-17). **Only the visible heading changed** — the component is still `HonoraryProducers.tsx`, the section `id` is still `honorary-producers`, the local array is still `honoraryProducers`, and the color token is still `--honorary-bg`. Don't be confused by the mismatch; renaming them was deliberately skipped as an unnecessary refactor.
- **Open item:** Ben flagged an "and → &" typo in Preorder Tier 5 copy but tabled it ("ignore for now"). No literal "and &" exists in `preorderData.ts` or in Shopify's Tier 5 description; the likeliest target is the bullet "Exclusive group listening session **and** Q&A with Jeremy…" (which also appears in Tiers 3, 4, and 6). Confirm with Ben before changing.
- **"Jacobsen" is spelled correctly everywhere** — audited the full repo and all six Shopify product descriptions on 2026-08-17. Zero instances of "Jacobson". No action needed if it comes up again.

## Earlier State (v2.15.0)
- **Pre-launch password gate (`LandingPage.tsx`, v2.15.0):** on the landing splash, clicking **Enter** lifts the button up and fades it out while a password prompt rises into the same spot (shared relative anchor; button animates `y: -90`, form animates in with a 0.18s delay). Correct password runs the existing fade-out → `onEnter()` into the site; wrong password shakes the input row (`useAnimationControls`) and shows a "Incorrect password" line. **Password is `EJO`, checked case-insensitively** (`GATE_PASSWORD = 'ejo'`, compared against `.trim().toLowerCase()` — changed from `Nethermead` on 2026-06-30, v2.15.1). This is a **soft gate** — the password lives in the frontend bundle, so it keeps casual visitors out pre-launch but is not real security. **When the album goes public, remove the gate** (drop the password state/prompt in `LandingPage.tsx` so Enter goes straight into the site). No persistence — it prompts on every visit (Ben's call, 2026-06-30). Gate text uses the site heading face (`.font-garamond` / ITC Garamond Std Condensed Light).
- **Cart icon lives inside the frosted-glass nav** (top-right of the nav bar, always visible at all breakpoints). Fixed-position floater removed.
- **Nav scroll behavior:** transparent bar overlays the banner top (banner pulled up via negative `--sr-nav-h` margin). Once the banner scrolls fully out of view the nav becomes "stuck" → a bolder light-teal frosted navbar (`.sr-nav--stuck`, 0.92 opacity). Stuck detection uses an **IntersectionObserver on the banner** (the page scrolls inside `<body>`, so a `window` scroll listener never fired — don't reintroduce one).
- **Per-item modals support multi-image galleries** via the `modalImages?: string[]` field on `IncludedItem` (`preorderData.ts`). Signed CD, black vinyl, blue vinyl, and the museum print all carry multi-image galleries across the relevant tiers; back-cover/tracklist images are appended to the vinyl galleries. Items without `modalImages` still show their single `image`.
- **Preorder tiers: 6 tiers (v2.12.0)** — restructured from 7: dropped the old $200 Gallery Patron; "Harmony & Ink" renamed to "Composer's Circle" (art print swapped for a digital score); the old Composer's Circle became the new $500 Gallery Patron; Experience is tier 6. All tier/variant data in `preorderData.ts`.
- **Preorder included items show thumbnail + name only** — the per-item "Qty: 1" line was removed (always 1, added noise). The `quantity` field stays in `preorderData.ts` because it drives the actual Shopify cart line items.
- **Item copy:** the two-tracks bullet reads "Instant access to two tracks from the album" (was "...to 2 unreleased tracks..."). The included-item image filename on disk still says `Access to 2 unreleased tracks.png` — filename only, not displayed.
- **Museum-quality archival art print** uses the real signed/numbered Rush Baker IV print as thumbnail + first modal image.
- **Item-modal images open a full-screen zoom lightbox** on click (magnifying-glass affordance).
- **Video:** sizzle reel re-encoded to ~29MB to stay under Cloud Run's ~32MiB response cap. If you swap the video, keep it under that ceiling or it 500s. The preview is sized `max-w-6xl` with trimmed gutters (`VideoSection.tsx`) so it fills more of the blue texture band while leaving top/bottom margin.
- **Quote section (`QuoteSection.tsx`):** one continuous centered quote (no ellipses) — "When an orchestra moves intuitively as one, it's utter magic, and Stones River captures that magic" — with "— Jeremy Kittel" directly beneath it, over a single centered, enlarged orchestra image (`max-w-6xl`). The Jeremy/Eric **duo photo was cut**; `quote-duo.jpg` remains in the repo but is unused.
- **Full-bio section (`FullBioSection.tsx`, v2.14.0):** an "About the Album" section between Honorary Producers and the footer — Garamond body, `max-w-4xl`, on a warm-brown background (`--full-bio-bg` #7D6E69, the midpoint of the honorary/footer browns) with raised text opacity for legibility (v2.14.1).
- **Typography:** ITC Garamond Std Condensed Light (`public/fonts/ITCGaramondStd-LtCond.otf`, registered as `@font-face` + `.font-garamond` utility in `global.css`; `@font-face` weight range widened to 100–900 to avoid faux bold). **As of v2.13.0 it is the site heading face** via `--font-heading` (Xanh Mono removed), and also drives the About-section bio body, the artist names in The Artists section (`BiosSection.tsx` card + modal `<h3>`), and the pre-launch gate text. Body default remains Fira Sans.
- Cart drawer auto-saves to localStorage. Shopify Storefront API drives product images + descriptions; `preorderData.ts` has fallback titles/prices/images.

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
