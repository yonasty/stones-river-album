# Implementation Plan: Stones River Revision

## Overview

This plan converts the existing "Stones River" album promotional website from its current section layout and visual style into the revised design — reordering sections, replacing the visual foundation with a cohesive blue background, adding new interactive components (bio cards with modals, product cards with Shopify scaffolding), and refining the cinematic scroll experience. All changes are additive or refactoring-in-place within the existing React/Vite/TypeScript/Tailwind CSS/shadcn-ui architecture.

## Tasks

- [x] 1. Configuration and data layer setup
  - [x] 1.1 Create site configuration file
    - Create `src/app/config/siteConfig.ts` with `SHOW_LISTEN_NOW: false` as a typed constant object
    - Export as `siteConfig` with `as const` assertion
    - Add code comment explaining the flag's purpose and how to activate it
    - _Requirements: 4.1_

  - [x] 1.2 Create preorder data file
    - Create `src/app/data/preorderData.ts` with `ProductConfig` interface and `preorderProducts` array of 7 tiers
    - Each entry must include: id, shopifyProductId (empty string placeholder), shopifyVariantId (empty string placeholder), cardDescription, fallbackTitle, fallbackPrice, fallbackImage
    - Add `shopifyConfig` object with empty domain and storefrontAccessToken placeholders
    - Add code comments above each placeholder indicating expected value type and source
    - _Requirements: 9.7, 16.2, 16.5_

  - [x] 1.3 Create bios data file
    - Create `src/app/data/biosData.ts` with `BioData` interface and `collaborators` array of 3 entries
    - Entries: Jeremy Kittel, Eric Jacobsen, The Orlando Philharmonic Orchestra
    - Include image paths, alt text, placeholder bio text, and website URLs as specified in design
    - _Requirements: 6.2, 7.3_

- [x] 2. Shared ContentModal component
  - [x] 2.1 Create ContentModal component
    - Create `src/app/components/ContentModal.tsx` wrapping existing shadcn `Dialog`, `DialogContent`, `DialogOverlay` from `ui/dialog.tsx`
    - Accept props: `open`, `onOpenChange`, `children`, optional `className`
    - Apply dark background styling, fade+scale animation (200–300ms via Radix animation classes)
    - Include visible close button in top-right corner
    - Scroll lock, focus return, escape key close, and click-outside close are handled by Radix Dialog
    - Ensure modal content scrolls vertically if it exceeds viewport height
    - _Requirements: 7.1, 7.4, 7.5, 7.7, 7.9, 9.1, 9.3, 16.1_

- [x] 3. Global background replacement
  - [x] 3.1 Apply blue background to App.tsx scroll container
    - Import `Kittel BLUE BG.png` asset
    - Apply as `backgroundImage` on the main scrolling `<div>` in App.tsx with `backgroundSize: cover`, `backgroundPosition: center`, `backgroundAttachment: scroll`
    - Set `backgroundColor: '#0d1b2a'` as CSS fallback for when the image fails to load
    - Add `<link rel="preload">` for the blue background asset in `index.html`
    - _Requirements: 1.1, 1.4_

  - [x] 3.2 Remove per-section background colors
    - Remove inline `backgroundColor` styles from sections that will be rendered (AboutSection, PreOrderSection, InterviewSection, etc.)
    - Add semi-transparent overlay layers where needed for text contrast (WCAG AA 4.5:1)
    - _Requirements: 1.2, 1.3_

- [x] 4. Landing page video background
  - [x] 4.1 Replace LandingPage placeholder with video background
    - Replace the SVG noise/texture placeholder in `LandingPage.tsx` with an HTML5 `<video>` element using `SR PAN2 1080p.mp4`
    - Set video attributes: `autoPlay`, `muted`, `loop`, `playsInline`, `object-fit: cover`, full viewport width/height
    - Add semi-transparent overlay div (opacity 0.4–0.5) between video and button for contrast
    - Change button text from "Experience Stones River" to "Enter"
    - Add `onError`/`onStalled` handler + 10-second timeout to set `videoFailed` state, showing solid `#1a1a2e` fallback background
    - Show fallback background while video is loading (until `onCanPlay` fires)
    - Add fade-out transition (400ms) before `onEnter()` fires on button click
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 5. Image Carousel section
  - [x] 5.1 Create ImageCarouselSection component
    - Create `src/app/components/ImageCarouselSection.tsx` using existing shadcn `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` from `ui/carousel.tsx`
    - Import 5 images statically from `assets/Image Carousel Images/`
    - Add `embla-carousel-autoplay` plugin for 5-second auto-advance with `stopOnInteraction: true`
    - Render dot indicators from Embla API's `scrollSnapList()`
    - Pause auto-advance on hover via mouse event handlers
    - Full viewport width on mobile (<768px), max-w-[1280px] centered on desktop
    - Ensure no horizontal page-level scrolling
    - Support keyboard navigation via left/right arrow keys
    - Add `onError` handler on each `<img>` to show placeholder with border, image icon (lucide-react), and filename text
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 15.1_

- [x] 6. Listen Now section conditional rendering
  - [x] 6.1 Wire SHOW_LISTEN_NOW config flag in App.tsx
    - Import `siteConfig` from `src/app/config/siteConfig.ts`
    - Conditionally render `ListenNowSection` only when `siteConfig.SHOW_LISTEN_NOW` is true
    - Ensure no DOM element, margin, or padding remains when flag is false
    - Preserve the component file and import so toggling the flag requires only changing the boolean value
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. About section refactoring
  - [x] 7.1 Create AboutSection from AlbumBioSection
    - Create `src/app/components/AboutSection.tsx` (or rename/refactor AlbumBioSection)
    - Remove the 2-column grid layout and image column (remove `recordsImage` import)
    - Single centered text column: `max-w-[680px] mx-auto`
    - Change heading to "About Stones River"
    - Preserve all existing bio copy verbatim (from "Welcome to Stones River…" to "With deep gratitude, -Jeremy")
    - Set line-height `leading-[1.8]`, paragraph spacing `space-y-6`
    - Ensure body text minimum 16px on mobile, line length ≤85 chars on mobile, 65–80 chars on desktop
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [x] 8. Bios section with cards and modals
  - [x] 8.1 Create BiosSection component
    - Create `src/app/components/BiosSection.tsx`
    - Display heading "Meet The Makers"
    - Import `collaborators` from `src/app/data/biosData.ts`
    - Render 3 BioCard components in responsive grid: `grid-cols-1 lg:grid-cols-3`
    - Each card: image with accessible alt text containing collaborator name, name as visible text below image
    - Hover effect: visible scale/shadow change to indicate interactivity
    - On image load error: show placeholder with "Image unavailable" text at same dimensions
    - On card click: open ContentModal with bio content (name, image, bio text, globe icon linking to website in new tab with `rel="noopener noreferrer"`)
    - Manage selected bio state to pass correct data to ContentModal
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 7.1, 7.2, 7.3, 7.5, 7.6, 7.8_

- [x] 9. Checkpoint - Verify core sections render
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. PreOrder section vertical layout + Shopify scaffolding
  - [x] 10.1 Refactor PreOrderSection to vertical layout with Shopify integration
    - Refactor `src/app/components/PreorderSection.tsx` (or create new `PreOrderSection.tsx`)
    - Remove horizontal scroll layout entirely
    - Import `preorderProducts` and `shopifyConfig` from `src/app/data/preorderData.ts`
    - Render 7 ProductCards in single-column vertical stack at all viewports
    - Each ProductCard: full-width, landscape aspect ratio (flex row: image left, details right)
    - Display: product image, price, name from Shopify (or fallback), and custom local `cardDescription`
    - On card click: open ContentModal with full product details + "Purchase Now" button
    - Shopify Buy Button JS loaded via `useEffect` script injection on mount with `try/catch` and 15-second timeout
    - "Purchase Now" generates checkout URL via Shopify SDK, opens in new tab
    - Fallback rendering when Shopify SDK unavailable: show local fallback data + inline note identifying required fields
    - Error state: "Purchase temporarily unavailable" message + disabled button when checkout URL fails
    - Heading: "Preorder Stones River", subheading: "Available through 06/XX."
    - Do NOT hardcode fake Shopify credentials or invent real product/variant IDs
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9_

- [x] 11. Interview section refactoring
  - [x] 11.1 Refactor BehindTheMagicSection into InterviewSection
    - Create `src/app/components/InterviewSection.tsx` (or rename/refactor BehindTheMagicSection)
    - Remove "Behind the magic" heading text entirely (both desktop and mobile)
    - Remove the `minHeight: 800px` constraint on desktop
    - Preserve staggered diagonal layout on desktop (≥1024px): one embed upper-left, one lower-right
    - Preserve vertical stack on mobile (<1024px) with consistent spacing
    - Preserve parallax transforms on video containers (`video1Y`, `video2Y`)
    - YouTube embed containers remain as placeholders with video icon + label ("Interview Video 1", "Interview Video 2")
    - Ensure no empty vertical space where heading was removed
    - Add code comments above YouTube URL placeholders indicating expected value source
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 16.5_

- [x] 12. Footer component
  - [x] 12.1 Create Footer component
    - Create `src/app/components/Footer.tsx`
    - Display OPO logo at `max-h-[48px]` with preserved aspect ratio
    - Display exact text: "Nethermead Records © & ® 2025 The Orlando Philharmonic Orchestra. All Rights Reserved."
    - Responsive layout: horizontal row on ≥768px, vertical stack on <768px, center-aligned
    - Inherits Blue_Background from page, text in light color for contrast (4.5:1 minimum)
    - Padding: `py-10` (40px)
    - On logo load error: show placeholder element with text "Orlando Philharmonic Orchestra" at same dimensions
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [x] 13. App.tsx section reordering and wiring
  - [x] 13.1 Update App.tsx with new section order and imports
    - Import new/renamed components: ImageCarouselSection, AboutSection, BiosSection, PreOrderSection, InterviewSection, Footer
    - Import `siteConfig` for conditional rendering
    - Render sections in order: ImageCarouselSection → (ListenNowSection if SHOW_LISTEN_NOW) → AboutSection → BiosSection → PreOrderSection → InterviewSection → Footer
    - Remove OrchestralTeaserSection and OrchestralLinkOutSection from render (preserve files)
    - Remove HomeSection from render (preserve file)
    - Ensure no CSS reordering (flexbox order, grid placement) alters visual sequence from DOM order
    - No navigation bar, hamburger menu, or anchor links
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 14. Checkpoint - Full page integration verification
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Responsive and parallax QA pass
  - [x] 15.1 Responsive layout verification and parallax preservation
    - Verify no horizontal overflow at any viewport from 320px to 2560px
    - Verify multi-column layouts stack to single column below 768px (bios grid, product cards)
    - Verify minimum body text 16px and heading text 20px on mobile
    - Verify minimum tap target 44×44px on mobile for buttons, cards, links
    - Verify parallax transforms preserved on sections that had them (using motion/react useScroll/useTransform)
    - Reduce parallax displacement to ≤50% of desktop values on viewports <768px
    - Ensure max vertical displacement ≤120px in either direction
    - Verify content reflows on resize without page reload
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 14.1, 14.2, 14.4_

- [ ] 16. Property-based tests and unit tests
  - [ ]* 16.1 Write property test for bio modal field completeness
    - **Property 1: Bio modal renders all required fields**
    - Generate random valid BioData objects with fast-check; render bio modal; assert DOM contains name, image with correct src/alt, bio text, and globe icon link to websiteUrl
    - **Validates: Requirements 7.2**

  - [ ]* 16.2 Write property test for product card field rendering
    - **Property 2: Product card renders required Shopify data**
    - Generate random valid ProductConfig with mock Shopify response; render product card; assert DOM contains product image, price, name, and local cardDescription
    - **Validates: Requirements 8.5**

  - [ ]* 16.3 Write property test for product modal field rendering
    - **Property 3: Product modal renders all required fields**
    - Generate random valid ProductConfig with mock Shopify data; render product modal; assert DOM contains image, name, price, Shopify description, and "Purchase Now" button
    - **Validates: Requirements 9.2**

  - [ ]* 16.4 Write property test for product configuration data completeness
    - **Property 4: Product configuration data structure completeness**
    - Validate all entries in preorderProducts array have non-empty id, cardDescription, fallbackTitle, fallbackPrice, fallbackImage, and defined shopifyProductId/shopifyVariantId strings
    - **Validates: Requirements 9.7**

  - [ ]* 16.5 Write property test for section render order invariant
    - **Property 5: Section render order invariant**
    - Generate random boolean values for SHOW_LISTEN_NOW; render App; assert section DOM order matches specification (ImageCarousel first, Footer last, ListenNow only when flag true, no duplicates)
    - **Validates: Requirements 12.1**

  - [ ]* 16.6 Write property test for asset placeholder rendering
    - **Property 6: Asset placeholder rendering**
    - Generate random asset paths that fail to load; trigger onError; assert placeholder contains visible border/background, image icon, and text label with expected filename
    - **Validates: Requirements 15.1**

- [x] 17. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- This is a revision of an existing site — preserve files that are removed from render order (HomeSection, OrchestralTeaserSection, OrchestralLinkOutSection)
- No new runtime dependencies allowed — use only libraries already in package.json
- Shopify credentials are intentionally left as empty placeholders; do NOT invent fake IDs
- The `embla-carousel-autoplay` plugin is available through the existing `embla-carousel-react` dependency

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "3.1"] },
    { "id": 2, "tasks": ["3.2", "4.1", "5.1", "6.1", "7.1"] },
    { "id": 3, "tasks": ["8.1", "10.1", "11.1", "12.1"] },
    { "id": 4, "tasks": ["13.1"] },
    { "id": 5, "tasks": ["15.1"] },
    { "id": 6, "tasks": ["16.1", "16.2", "16.3", "16.4", "16.5", "16.6"] }
  ]
}
```
