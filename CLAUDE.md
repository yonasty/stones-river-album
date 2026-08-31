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
- `src/app/components/HonoraryProducers.tsx` / `AssociateProducers.tsx` — the two stacked producer credit sections (near-duplicates; see Current State)
- `src/app/data/biosData.ts` — The Artists cards + modal content; array order IS the display order
- `public/assets/Individual Item Images/` — preorder item thumbnails; `Jeremy_Kittel.jpg` is the stand-in for intangible items
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
- `VERSION` file in repo root, currently **`2.17.6`**.
- Bump after every meaningful deploy: patch (1.0.X) for fixes/tweaks, minor (1.X.0) for features, major (X.0.0) for overhauls.
- Tell Ben the new version number after deploy.
- **No UI version display.** This is a public-facing marketing site, so it's exempt from the global "show version in a footer/corner" rule (Ben, 2026-06-03). Keep the `VERSION` file and keep bumping it after deploys, but do not surface it in the UI.

## Current State (as of 2026-08-19, v2.17.6)
- **Naming rule — "Orlando Philharmonic Orchestra" takes NO definite article** (Ben, 2026-08-17). Not "The Orlando Philharmonic Orchestra", and not "…and the Orlando Philharmonic Orchestra" mid-sentence either. Applied site-wide in v2.16.0: bio name + alt text, quote-image alt, banner alt, About copy, About-the-Album copy, and the OPO bio's opening sentence. Short informal references that aren't the full name ("the Philharmonic") were left alone. Keep new copy consistent with this.
- **Bio photo credits (v2.16.0):** `BioData` has an optional `photoCredit?: string` (`biosData.ts`) rendered as small dimmed text (`text-white/40 text-xs`) directly under the image in the bio modal — modal only, not on the card. Eric Jacobsen: "Photo: Ben Van Hook". Orlando Philharmonic Orchestra: "Photo courtesy of Orlando Philharmonic". Jeremy Kittel has none.
- **No mentions of The Knights or Brooklyn Rider anywhere on the site** (Ben, 2026-08-17). Two separate removals: the sentence about The Knights / NYC-based chamber orchestra in Eric's bio (`biosData.ts`, v2.16.0), and the "(The Knights, Brooklyn Rider)" parenthetical after Eric's name in the About-the-Album copy (`FullBioSection.tsx`, v2.16.1). Don't reintroduce either.
- **Two producer sections, stacked (v2.17.0):** `HonoraryProducers.tsx` (18 names, `--honorary-bg` #988780) followed by `AssociateProducers.tsx` (`--associate-bg` #8A7A74). Order in `App.tsx`: Preorder → Honorary → Associate → FullBio → Footer. The two files are intentional near-duplicates — Ben asked for a duplicated section, and copying ~20 lines beat parameterizing a shared component for a one-off marketing site. **If you edit the shared markup, edit both.**
  - **`AssociateProducers` has an EMPTY name array** — Ben's call (2026-08-17): better a bare heading than 18 duplicated names on the live site. **Ben still owes the Associate roster.** Drop the names into `associateProducers` in `AssociateProducers.tsx` when they arrive.
  - Brief history so nobody "fixes" this: on 2026-08-17 Ben first asked to rename Honorary → Associate (v2.16.0), then reverted it and asked for both sections (v2.17.0). Honorary is correct as-is.
  - **Background browns run light→dark down the page:** honorary #988780 → associate #8A7A74 → full-bio #7D6E69 → footer #625652. Keep that descent if you add another band.
- **Tier 5 "&amp;" typo — fixed in the site, still wrong in Shopify (v2.17.1).** Shopify's Tier 5 `descriptionHtml` stores `&amp;amp;` (someone typed `&amp;` into the rich-text editor and it was escaped a second time on save), which rendered on screen as the literal text `&amp;`. `PreorderSection.tsx` now runs `fixDoubleEscapedEntities()` over the description at the fetch boundary, collapsing one layer of escaping. **The underlying Shopify data is still wrong** — fixing it there needs an Admin API token for `jeremykittel.myshopify.com`, which this repo does not have (the token in `shopify-dev` is for the Max Gomez store). The code fix becomes a harmless no-op if the data is ever corrected. Audited 2026-08-18: Tier 5 was the only product affected.
- **Tier 6 is called "Associate Producer" (v2.17.3)** — renamed from "Stones River Experience". Shopify was already correct on both title and description; the stale name survived only in `preorderData.ts` (`fallbackTitle` and one sentence of `tierDescription`, reworded to "The Associate Producer tier is limited to just 10 patrons"). **Note the site uses the LOCAL `fallbackTitle` for tier titles, not Shopify's `title`** — `displayTitle = product.fallbackTitle` in `PreorderSection.tsx`. Shopify's title is fetched but never displayed, so renaming a tier in Shopify alone will not change the site. Tier *descriptions* are the opposite: the modal prefers Shopify's `descriptionHtml` and only falls back to `tierDescription`, while the card always uses `tierDescription`.
- **The Artists order is Jeremy → Eric → Orlando Philharmonic (v2.17.2)** — set purely by array order in `biosData.ts`; the cards and the modal both read from it.
- **Tier 6 has 11 items (v2.17.5–2.17.6).** An 11th entry, "Acknowledgement as an Associate Producer on the album website", leads both `tierIncludes` and `includedItems` — first because the tier is named for it. The card's "N items included" line is derived from `includedItems.length`, so there is no separate count to keep in sync, and **the two lists must stay the same length**. Its image is `Associate Producer Acknowledgement.png`, a 1200×1200 tile generated from the site's own ingredients (ITC Garamond Std Condensed Light from `public/fonts/`, `--associate-bg` #8A7A74, `--parchment` #F4F1EA) to match Ben's 295px screenshot of the Associate Producers section — regenerated rather than used as-is because the item modal renders up to 520px tall and is click-to-zoom.
- **"Jacobsen" is spelled correctly everywhere** — audited the full repo and all six Shopify product descriptions on 2026-08-17. Zero instances of "Jacobson". No action needed if it comes up again.

## In Flight / Blocked on Ben (as of 2026-08-19)
- **Banner header spacing — designed and previewed, NOT built.** Jeremy flagged that the vertical divider in the banner has more space below than above. Two causes: the art is off by 19px (divider spans y122–650 of the 2880×792 banner → 122 above, 141 below), and — far bigger — `.sr-nav` carries `margin-bottom: -64px` so the menu sits *inside* the gap above the line. Clear space is 17px above vs 95px below at 1920px, and **at 1440px and 1280px the nav actually overlaps the line**. Agreed fix: drop the negative margin so the nav gets its own 64px band, fill that band with sky mirrored from the top of the banner (a strip asset with `background-size: cover; background-position: bottom`, whose bottom row is banner row 0, so the join is seamless), and trim 19px off the banner bottom. That makes the balance viewport-independent (61/61 at 1440, 81/82 at 1920) because the nav leaves the line's gap entirely. **Ben has not yet chosen navy band vs sky band** — nothing in the repo was touched.
- **Associate Producers roster** — `associateProducers` in `AssociateProducers.tsx` is deliberately empty pending names from Ben.
- **Shopify Tier 5 still stores `&amp;amp;`** — the site renders it correctly now, but the source data is still wrong. Needs an Admin API token this repo does not have.

## Dead Ends — Do Not Retry (2026-08-19)
- **Hunting the Tier 5 "&amp;" typo in this repo is a waste of time.** It is not here. Grepping for `and &`, `ampersand`, or `&amp` in `src/` finds nothing relevant, and the Storefront API's plain-text `description` field **masks it** — a first pass over `description` reported all six products "clean". The typo lives in Shopify's `descriptionHtml` as `&amp;amp;`. To audit: query `descriptionHtml` and grep for `&amp;(amp|lt|gt|quot);`.
- **There is no Shopify Admin API token for `jeremykittel.myshopify.com` anywhere on this machine.** `shopify-dev` holds credentials for the *Max Gomez* store, a different shop. Don't re-search; ask Ben.
- **`gcloud builds list --limit=1` is NOT a valid deploy check.** It returns the most recent build project-wide, which right after a push is still the *previous* commit's build — its SUCCESS was misread as "deployed" once this session and a stale bundle got verified. Always resolve the build by SHORT_SHA first: `gcloud builds list --limit=6 --format='value(id,substitutions.SHORT_SHA)' | awk '$2=="<sha>"{print $1}'`, then poll `gcloud builds describe <id>`. Note `describe` needs the **full UUID** — the 8-char prefix returns empty. Also `builds list` is project-wide, so other apps' builds interleave with this one's.
- **`npx tsc --noEmit` just prints the compiler help** — there is no `tsconfig.json` in this repo. `npm run build` (vite) is the only build/type gate.
- **Publishing an Artifact to the same scratchpad file path can silently fail to register.** Three publishes returned success and the same URL, but the artifact never appeared under `action: "list"` and the watch reported "no such artifact for this account". Republishing under a **new file path** produced a working, listed URL. If an artifact link looks dead, re-publish to a new filename and confirm with `action: "list"` before handing Ben the link.
- **macOS screenshot filenames contain U+202F (narrow no-break space) before AM/PM.** A normal space in a shell path fails with "No such file or directory" even though the file exists. Resolve with a Python `glob` instead of typing the path.

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
