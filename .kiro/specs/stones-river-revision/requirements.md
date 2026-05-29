# Requirements Document

## Introduction

This document specifies the requirements for revising the existing "Stones River" album promotional website — a single-page parallax scrolling site built with React, Vite, Tailwind CSS, and shadcn/ui components. The site promotes Jeremy Kittel's collaborative album with Eric Jacobsen and the Orlando Philharmonic Orchestra. The revision restructures sections, updates visual backgrounds, adds new interactive components (bio cards, product modals), integrates Shopify for preorders, and refines the overall cinematic experience without rebuilding from scratch.

## Glossary

- **Site**: The existing single-page parallax scrolling React/Vite web application for the "Stones River" album
- **Landing_Page**: The full-screen welcome gate displayed before the user enters the main scrolling experience
- **Image_Carousel**: The section replacing the old Home Section, displaying a rotating set of project images
- **Listen_Now_Section**: The existing DSP links section to be hidden via configuration flag
- **About_Section**: The renamed Album Bio section displaying the album narrative text
- **Bios_Section**: The new "Meet The Makers" section with interactive bio cards and modals
- **PreOrder_Section**: The vertical product-card layout section integrating with Shopify for album preorders
- **Interview_Section**: The renamed "Behind the Magic" section containing only YouTube video embeds
- **Footer**: The bottom footer displaying the Orlando Philharmonic Orchestra logo and copyright text
- **Blue_Background**: The new site-wide background asset (Kittel BLUE BG.png) replacing flat brown/sepia/white/off-white backgrounds
- **Bio_Card**: A clickable card component displaying a collaborator's image and name, opening a modal on click
- **Bio_Modal**: A modal overlay displaying a collaborator's bio text, image, name, and globe icon linking to their website
- **Product_Card**: A clickable card displaying Shopify product image, price, name, and a custom local description
- **Product_Modal**: A modal overlay displaying Shopify product details and a "Purchase Now" button routing to Shopify checkout
- **Shopify_Buy_Button_JS**: Shopify's JavaScript SDK for embedding product purchasing functionality into external websites
- **Configuration_Flag**: A boolean variable in the codebase that controls visibility of a section without deleting it
- **Parallax_Experience**: The scroll-driven motion and depth effects applied to sections using the motion/react library

## Requirements

### Requirement 1: Global Background Replacement

**User Story:** As a site visitor, I want the site to have a cohesive premium blue visual foundation, so that the experience feels cinematic and unified rather than flat and fragmented.

#### Acceptance Criteria

1. WHEN the Site renders any post-entry content section (HomeSection, AlbumBioSection, ListenNowSection, OrchestralTeaserSection, OrchestralLinkOutSection, BehindTheMagicSection, PreorderSection), THE Site SHALL display the Blue_Background asset as a full-bleed background covering the entire viewport width, positioned so that it scrolls with the page and tiles seamlessly between sections, replacing flat brown, sepia, white, or off-white section backgrounds
2. IF text content is displayed over the Blue_Background, THEN THE Site SHALL apply overlays, gradients, or opacity layers sufficient to achieve a minimum WCAG AA contrast ratio of 4.5:1 between text and its immediate background
3. THE Site SHALL preserve the existing scroll-linked parallax motion transforms (scroll-driven vertical translation and opacity transitions on section content) when applying the Blue_Background
4. IF the Blue_Background asset file fails to load or is not present in the project, THEN THE Site SHALL display a solid fallback background color matching the dominant hue of the Blue_Background asset (a dark navy blue) within 500 milliseconds of detecting the load failure

### Requirement 2: Landing Page Video Background

**User Story:** As a site visitor, I want to see an immersive video background on the landing page, so that I am drawn into the cinematic album world before entering the site.

#### Acceptance Criteria

1. WHEN the Landing_Page renders, THE Landing_Page SHALL display the video asset (SR PAN2 1080p.mp4) as a background that covers 100% of the viewport width and height with no visible letterboxing or pillarboxing
2. THE Landing_Page SHALL play the video muted, autoplaying, looping, and inline (playsinline for mobile)
3. THE Landing_Page SHALL display a button with the exact text "Enter"
4. WHEN the visitor clicks the "Enter" button, THE Landing_Page SHALL transition to the main scrolling site experience within a duration of 300 to 600 milliseconds, with the first visible section being the Image_Carousel
5. THE Landing_Page SHALL apply a semi-transparent overlay with an opacity between 0.3 and 0.6 on the video so that the "Enter" button meets a minimum contrast ratio of 4.5:1 against the overlay
6. IF the video asset fails to load within 10 seconds, THEN THE Landing_Page SHALL display a static fallback background using a solid color or gradient consistent with the site's warm-black color palette
7. WHILE the video is loading, THE Landing_Page SHALL display the fallback background until the video is ready to play

### Requirement 3: Image Carousel Section

**User Story:** As a site visitor, I want to browse through curated project images in a carousel, so that I can visually explore the album world.

#### Acceptance Criteria

1. WHEN the visitor enters the site past the Landing_Page, THE Image_Carousel SHALL be the first content section visible in the vertical scroll flow
2. THE Image_Carousel SHALL display a minimum of 3 and a maximum of 10 project images in a horizontally sliding sequence
3. THE Image_Carousel SHALL auto-advance to the next image every 5 seconds and SHALL provide previous/next navigation arrows and dot indicators showing the current slide position
4. WHEN the visitor hovers over or touches the Image_Carousel, THE Image_Carousel SHALL pause auto-advance until the visitor moves away or lifts their finger
5. THE Image_Carousel SHALL preserve image aspect ratios using object-fit contain or cover without letterboxing, and SHALL display each image at full carousel-container width
6. THE Image_Carousel SHALL NOT introduce horizontal page-level scrolling that disrupts the vertical scroll flow
7. THE Image_Carousel SHALL render at full viewport width on viewports below 768px and within a maximum width of 1280px centered on viewports at or above 768px
8. IF carousel image assets are not present, THEN THE Image_Carousel SHALL display placeholder containers showing the text "Image not available" in place of each missing image
9. THE Image_Carousel SHALL support keyboard navigation via left and right arrow keys to move between slides when the carousel has focus

### Requirement 4: Listen Now Section Visibility Control

**User Story:** As a developer, I want the Listen Now section hidden behind a configuration flag, so that it can be easily reactivated when DSP links are ready without code reconstruction.

#### Acceptance Criteria

1. THE Site SHALL include a single Configuration_Flag named `SHOW_LISTEN_NOW` with a boolean value that controls the visibility of the Listen_Now_Section, located in a dedicated configuration file or environment variable changeable without modifying component source code
2. WHILE the Configuration_Flag is set to false, THE Site SHALL NOT render the Listen_Now_Section in the visible page flow
3. WHILE the Configuration_Flag is set to false, THE Site SHALL NOT render any DOM element, margin, or padding in the position where the Listen_Now_Section would appear, resulting in adjacent sections rendering contiguously with no additional spacing
4. THE Site SHALL preserve the Listen_Now_Section component source file and its import references so that setting the Configuration_Flag to true requires no code additions or modifications beyond the flag value change
5. WHILE the Configuration_Flag is set to true, THE Listen_Now_Section SHALL render in its designated position between the Image_Carousel and the About_Section, displaying all DSP platform links and maintaining its full interactive behavior

### Requirement 5: About Stones River Section

**User Story:** As a site visitor, I want to read the album's narrative in an elegant, focused layout, so that I can understand the creative vision behind Stones River.

#### Acceptance Criteria

1. THE About_Section SHALL display the heading with exact text "About Stones River"
2. THE About_Section SHALL NOT display the vinyl record image column from the previous Album Bio layout
3. THE About_Section SHALL display the album bio text in a single horizontally-centered column that spans the full available width up to the maximum reading width, with no adjacent image or sidebar columns
4. THE About_Section SHALL constrain the text column maximum width to between 640px and 720px on viewports wider than 768px to limit line length to approximately 65–80 characters per line
5. THE About_Section SHALL render body text with a line-height of at least 1.7 and vertical paragraph spacing of at least 1.5em between paragraphs
6. WHILE the viewport width is 768px or narrower, THE About_Section SHALL render body text at a minimum font size of 16px and constrain line length to no more than 85 characters per line
7. THE About_Section SHALL preserve and display the existing album bio copy verbatim, beginning with "Welcome to Stones River…" and ending with "With deep gratitude, -Jeremy", with no additions, omissions, or rewording

### Requirement 6: Bios Section Cards

**User Story:** As a site visitor, I want to see the creative collaborators behind the album presented as interactive cards, so that I can learn about each contributor.

#### Acceptance Criteria

1. THE Bios_Section SHALL display the heading with exact text "Meet The Makers"
2. THE Bios_Section SHALL display exactly three Bio_Cards with names: "Jeremy Kittel", "Eric Jacobsen", and "The Orlando Philharmonic Orchestra"
3. THE Bio_Card SHALL display the collaborator's image with an accessible alt text containing the collaborator's name, and the collaborator's name as visible text below the image
4. WHILE the viewport width is 1024px or greater, THE Bios_Section SHALL arrange the three Bio_Cards in a single horizontal row with equal width
5. WHILE the viewport width is less than 1024px, THE Bios_Section SHALL stack the three Bio_Cards in a single vertical column
6. IF a bio image asset fails to load or is not present, THEN THE Bio_Card SHALL display a placeholder area that includes the text "Image unavailable" and maintains the same dimensions as a successfully loaded image
7. WHEN a site visitor hovers over a Bio_Card on a pointer device, THE Bio_Card SHALL provide a visible change in appearance to indicate interactivity

### Requirement 7: Bios Section Modals

**User Story:** As a site visitor, I want to click a bio card and see detailed information about that collaborator, so that I can learn their background and visit their website.

#### Acceptance Criteria

1. WHEN a visitor clicks a Bio_Card, THE Bios_Section SHALL open a Bio_Modal with a fade-and-scale transition completing within 200 to 300 milliseconds
2. THE Bio_Modal SHALL display the collaborator's name, image, bio text area, and a globe icon
3. THE Bio_Modal SHALL link the globe icon to the collaborator's website opening in a new tab with rel="noopener noreferrer": Jeremy Kittel to https://jeremykittel.com/, Eric Jacobsen to https://www.jacobseneric.com/, The Orlando Philharmonic Orchestra to https://orlandophil.org/
4. THE Bio_Modal SHALL include a visible close button positioned in the top-right corner of the modal
5. WHEN a visitor clicks outside the Bio_Modal content area, THE Bio_Modal SHALL close and return focus to the Bio_Card that triggered it
6. THE Bio_Modal SHALL be usable on both desktop and mobile viewports without content clipping, using vertical scrolling within the modal if content exceeds viewport height
7. WHILE a Bio_Modal is open, THE Site SHALL prevent background scroll interference
8. IF final bio text is not provided, THEN THE Bio_Modal SHALL display clearly labeled placeholder text for each collaborator
9. WHEN a visitor presses the Escape key while a Bio_Modal is open, THE Bio_Modal SHALL close and return focus to the Bio_Card that triggered it

### Requirement 8: Pre-Order Section Layout

**User Story:** As a site visitor, I want to browse preorder tiers in a clean vertical layout, so that I can easily scan all available options without horizontal scrolling disruption.

#### Acceptance Criteria

1. THE PreOrder_Section SHALL display the heading with exact text "Preorder Stones River"
2. THE PreOrder_Section SHALL display subheading text "Available through 06/XX." where XX is replaced with the actual preorder deadline day
3. THE PreOrder_Section SHALL display exactly seven Product_Cards in a single-column vertical layout at all viewport widths
4. THE PreOrder_Section SHALL NOT use horizontal scrolling or a horizontal carousel for product display at any viewport width, including desktop
5. WHEN a Product_Card renders and Shopify data is available, THE Product_Card SHALL display: product image from Shopify, product price from Shopify, product name from Shopify, and a custom local description stored in the application (not the Shopify HTML body)
6. IF Shopify product data is unavailable for a Product_Card, THEN THE Product_Card SHALL display a placeholder image, a placeholder price indicator, the tier name, and a fallback description indicating content is loading or unavailable
7. THE Product_Card SHALL span the full content width of the PreOrder_Section (minus horizontal padding) and maintain a horizontal (landscape) aspect ratio where width exceeds height
8. THE PreOrder_Section SHALL maintain a single-column vertical stack layout on viewports from 320px wide through the maximum supported desktop width, adjusting only padding and font sizes across breakpoints

### Requirement 9: Pre-Order Product Modals and Shopify Integration

**User Story:** As a site visitor, I want to click a product card and see full details with a purchase option, so that I can complete my preorder through Shopify checkout.

#### Acceptance Criteria

1. WHEN a visitor clicks a Product_Card, THE PreOrder_Section SHALL open a Product_Modal displaying the selected product's details
2. THE Product_Modal SHALL display: product image, product name, product price, the actual Shopify product description, and a "Purchase Now" button
3. WHEN the visitor clicks the modal close control or clicks outside the modal area, THE Product_Modal SHALL close and return the visitor to the PreOrder_Section without navigating away from the page
4. WHEN the visitor clicks "Purchase Now", THE Product_Modal SHALL open the Shopify checkout in a new browser tab with the corresponding product/variant added to the cart
5. IF the Shopify checkout URL cannot be generated or the Shopify_Buy_Button_JS fails to initialize, THEN THE Product_Modal SHALL display an error message indicating the purchase is temporarily unavailable and the "Purchase Now" button SHALL be disabled
6. THE PreOrder_Section SHALL use Shopify_Buy_Button_JS as the integration path for product data retrieval and checkout routing
7. THE PreOrder_Section SHALL separate product configuration into a local data structure containing: Shopify product ID, Shopify variant ID, custom card description, fallback title, fallback price, and fallback image for each product (maximum 7 products)
8. IF Shopify credentials or product IDs are not available, THEN THE PreOrder_Section SHALL display fallback product data from the local data structure and render a visible inline note identifying the fields required for live integration
9. THE PreOrder_Section SHALL NOT hardcode fake production Shopify credentials or invent real product/variant IDs

### Requirement 10: Interview Snippet Section

**User Story:** As a site visitor, I want to watch interview videos without distracting header text, so that the video content speaks for itself within the scrolling experience.

#### Acceptance Criteria

1. THE Interview_Section SHALL NOT display the previous "Behind the Magic" heading text
2. THE Interview_Section SHALL display exactly two YouTube video embed containers, each rendered at a 16:9 aspect ratio
3. WHILE the viewport width is at least 1024px, THE Interview_Section SHALL arrange the two video embeds in a staggered diagonal layout with one embed positioned in the upper-left area and the other in the lower-right area of the section
4. WHILE the viewport width is less than 1024px, THE Interview_Section SHALL stack the two video embeds vertically with consistent spacing between them
5. THE Interview_Section SHALL NOT leave empty vertical space where the removed heading text previously appeared, maintaining continuous visual flow between adjacent content
6. IF YouTube URLs are not provided, THEN THE Interview_Section SHALL display placeholder containers that each include a video icon and a text label identifying the video number (e.g., "Interview Video 1", "Interview Video 2")

### Requirement 11: Bottom Footer

**User Story:** As a site visitor, I want to see proper attribution and branding at the bottom of the page, so that I know who produced the album and the site feels complete.

#### Acceptance Criteria

1. THE Footer SHALL appear after the Interview_Section as the final element on the page, with no other content or visible gap between the Interview_Section and the Footer
2. THE Footer SHALL display the Orlando Philharmonic Orchestra logo at a maximum height of 48px, preserving the original aspect ratio without distortion
3. THE Footer SHALL display the exact text "Nethermead Records © & ® 2025 The Orlando Philharmonic Orchestra. All Rights Reserved."
4. WHILE the viewport width is 768px or greater, THE Footer SHALL arrange the logo and text horizontally in a single row, center-aligned
5. WHILE the viewport width is less than 768px, THE Footer SHALL stack the logo above the text vertically, center-aligned
6. THE Footer SHALL use the site's Blue_Background, with text rendered in a color that achieves a minimum contrast ratio of 4.5:1 against the background, and vertical padding between 32px and 48px
7. IF the Orlando Philharmonic Orchestra logo asset is not present, THEN THE Footer SHALL display a placeholder element of the same dimensions with the visible text "Orlando Philharmonic Orchestra" in place of the image

### Requirement 12: Section Order

**User Story:** As a site visitor, I want to experience the album story in a deliberate narrative sequence, so that the site feels like a curated journey through the album world.

#### Acceptance Criteria

1. THE Site SHALL render sections in the following DOM order after the Landing_Page: Image_Carousel, Listen_Now_Section (when Configuration_Flag is true), About_Section, Bios_Section, PreOrder_Section, Interview_Section, Footer
2. THE Site SHALL NOT use CSS reordering (such as flexbox order or grid placement) to alter the visual sequence from the DOM order specified in criterion 1
3. THE Site SHALL NOT display a navigation bar, hamburger menu, tab navigation, or in-page anchor links that allow skipping ahead to a later section
4. THE Site SHALL maintain a single continuous vertical scroll experience without separate routes or pages
5. IF a section component fails to render, THEN THE Site SHALL preserve the specified order of the remaining sections without introducing blank gaps or layout shifts

### Requirement 13: Responsive Design

**User Story:** As a site visitor on any device, I want the site to adapt gracefully to my screen size, so that the experience remains polished whether I am on desktop or mobile.

#### Acceptance Criteria

1. THE Site SHALL render all sections without visual overflow or overlapping content across desktop (1024px and above), tablet (768px to 1023px), and mobile (320px to 767px) viewports
2. THE Site SHALL NOT produce horizontal page-level scrolling on any viewport width from 320px to 2560px
3. WHEN the viewport width is below 768px, THE Site SHALL stack multi-column layouts (including bio grids, card rows, and side-by-side content sections) into a single vertical column
4. WHILE the viewport width is below 768px, THE Site SHALL display body text at a minimum of 16px font-size and heading text at a minimum of 20px font-size so that content is legible without pinch-to-zoom
5. THE Site SHALL render all interactive elements (buttons, cards, modals, and links) with a minimum tap target size of 44×44 CSS pixels on viewports below 768px
6. WHEN the viewport is resized between breakpoints, THE Site SHALL reflow content without requiring a page reload

### Requirement 14: Parallax and Motion Preservation

**User Story:** As a site visitor, I want the scrolling experience to feel cinematic and layered, so that moving through the site feels like exploring chapters of the album world.

#### Acceptance Criteria

1. THE Site SHALL preserve the existing motion-library-based parallax scroll effects (useScroll/useTransform) across all sections that currently implement them, including HomeSection, AlbumBioSection, ListenNowSection, PreorderSection, BehindTheMagicSection, OrchestralLinkOutSection, and OrchestralTeaserSection
2. THE Site SHALL apply parallax motion with a maximum vertical displacement no greater than 120px in either direction, using scroll-linked transforms (translateY) that do not override native scroll behavior or intercept scroll events
3. THE Site SHALL render all scroll-linked animations at 60 frames per second or higher on desktop viewports, with no individual frame exceeding 16ms of main-thread work
4. WHILE on viewports narrower than 768px, THE Site SHALL reduce parallax displacement values to no more than 50% of their desktop values or disable them entirely to maintain a frame rate of at least 30 frames per second
5. THE Site SHALL NOT introduce animations that cause Cumulative Layout Shift greater than 0.1 or drop the scrolling frame rate below 30 frames per second on any supported viewport

### Requirement 15: Asset Placeholder Strategy

**User Story:** As a developer, I want missing assets handled with clear placeholders, so that I can easily identify and replace them when final assets become available.

#### Acceptance Criteria

1. IF any required media asset is not present in the project or fails to load, THEN THE Site SHALL display a placeholder container that has a visible border or background color distinct from the page background, a generic image icon, and a text label displaying the expected filename of the missing asset
2. IF a placeholder is displayed, THEN THE Site SHALL render the placeholder container at the same dimensions (width and height) that the final asset would occupy in the layout, preventing layout shift when the asset is later provided
3. THE Site SHALL NOT distort, recolor, regenerate, or destructively edit any provided media assets
4. THE Site SHALL preserve aspect ratios for all media assets using appropriate object-fit strategies (contain for logos, portraits, product images; cover only for background-style treatments)
5. THE Site SHALL organize all referenced asset paths under a single top-level assets directory with sub-folders grouped by usage category, so that replacing an asset requires updating only the file in that known location without changing source code

### Requirement 16: Code Maintainability

**User Story:** As a developer, I want the revised codebase to remain clean and modular, so that future changes can be made without untangling complex or duplicated code.

#### Acceptance Criteria

1. THE Site SHALL use a single shared modal component, accepting content via props, for all overlay dialogs including bio expansions and product detail views, rather than defining separate modal markup in each consuming component
2. THE Site SHALL separate preorder product configuration data (tier identifiers, Shopify product IDs, display titles, and price placeholders) into a dedicated data file or named constant array that is imported by the PreorderSection component rather than defined inline within the rendering logic
3. THE Site SHALL preserve the existing component-per-section architecture where each full-page section (Home, AlbumBio, ListenNow, OrchestralTeaser, OrchestralLinkOut, BehindTheMagic, Preorder) is exported from its own file and composed in App.tsx
4. THE Site SHALL NOT add any runtime dependency to package.json that is not already listed in the project's existing dependencies or devDependencies
5. THE Site SHALL include a code comment immediately above each placeholder value for Shopify product IDs, YouTube embed URLs, and final asset file paths, indicating the expected value type and where the production value will be sourced from
