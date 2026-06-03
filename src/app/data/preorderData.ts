export interface IncludedItem {
  name: string;
  quantity: number;
  /** Path to item thumbnail — used in the tier card */
  image: string;
  /** Optional larger image for the item detail modal (single-image) */
  modalImage?: string;
  /** Optional gallery for the item detail modal — takes precedence over modalImage when set */
  modalImages?: string[];
}

export interface ProductConfig {
  id: string;
  /** Shopify product ID — replace with actual ID from Shopify admin */
  shopifyProductId: string;
  /** Shopify variant ID — replace with actual variant ID from Shopify admin */
  shopifyVariantId: string;
  /** Custom description shown on the product card (not Shopify HTML body) */
  cardDescription: string;
  /** Detailed list of items included in this tier, shown in the modal */
  tierIncludes: string[];
  /** Structured included items for the Kickstarter-style card layout */
  includedItems: IncludedItem[];
  /** Custom tier description shown in the middle column (not from Shopify) */
  tierDescription: string;
  fallbackTitle: string;
  fallbackPrice: string;
  /** Path to fallback image asset when Shopify data is unavailable */
  fallbackImage: string;
}

export const preorderProducts: ProductConfig[] = [
  {
    id: 'tier-1',
    shopifyProductId: 'gid://shopify/Product/9280271876334',
    shopifyVariantId: 'gid://shopify/ProductVariant/48034965389550',
    cardDescription: 'Signed CD, 2 unreleased tracks, and early access to exclusive live performance video.',
    tierIncludes: [
      'Signed CD of Stones River with deluxe artwork',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
    ],
    includedItems: [
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Individual Item Images/Signed CD.png', modalImages: ['/assets/Individual Item Images/Signed CD.png', '/assets/Individual Item Images/Signed CD - Disc.png'] },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
    ],
    tierDescription: 'By pre-ordering this CD, you help fund the collaborative efforts behind the creation of Stones River.',
    fallbackTitle: 'Tier 1 — Prelude Patron',
    fallbackPrice: '$40.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
  {
    id: 'tier-2',
    shopifyProductId: 'gid://shopify/Product/9280275906798',
    shopifyVariantId: 'gid://shopify/ProductVariant/48034976989422',
    cardDescription: 'Signed black vinyl in deluxe packaging, 2 unreleased tracks, and early access to exclusive live performance video.',
    tierIncludes: [
      'Signed black vinyl of Stones River in deluxe packaging',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
    ],
    includedItems: [
      { name: 'Signed black vinyl of Stones River in deluxe packaging', quantity: 1, image: '/assets/Individual Item Images/Black Vinyl Cover.png', modalImages: ['/assets/Individual Item Images/Black Vinyl Cover.png', '/assets/Individual Item Images/Black Vinyl - Side B.png', '/assets/Individual Item Images/Black Vinyl - Deluxe Packaging.png'] },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
    ],
    tierDescription: 'Step up your support and experience the rich soundscape of the album on black vinyl with the Stones River Essentials tier.',
    fallbackTitle: 'Tier 2 — Stones River Essentials',
    fallbackPrice: '$60.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
  {
    id: 'tier-3',
    shopifyProductId: 'gid://shopify/Product/9280282067182',
    shopifyVariantId: 'gid://shopify/ProductVariant/48034992128238',
    cardDescription: 'Exclusive listening session & Q&A, signed vinyl + CD, unreleased tracks, and early access video content.',
    tierIncludes: [
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Signed black vinyl of Stones River in deluxe packaging',
      'Signed CD of Stones River with deluxe artwork',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Signed black vinyl of Stones River in deluxe packaging', quantity: 1, image: '/assets/Individual Item Images/Black Vinyl Cover.png', modalImages: ['/assets/Individual Item Images/Black Vinyl Cover.png', '/assets/Individual Item Images/Black Vinyl - Side B.png', '/assets/Individual Item Images/Black Vinyl - Deluxe Packaging.png'] },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Individual Item Images/Signed CD.png', modalImages: ['/assets/Individual Item Images/Signed CD.png', '/assets/Individual Item Images/Signed CD - Disc.png'] },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Individual Item Images/Interview Footage Early Access (cropped).png', modalImage: '/assets/Individual Item Images/Interview Footage Early Access (Modal).png' },
    ],
    tierDescription: 'Why choose one format when you can have both? The Stones River Collector bundle is designed for the engaged fan who wants the most comprehensive media collection and a personal connection to the creators.',
    fallbackTitle: 'Tier 3 — Stones River Collector',
    fallbackPrice: '$75.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
  {
    id: 'tier-4',
    shopifyProductId: 'gid://shopify/Product/9280283803886',
    shopifyVariantId: 'gid://shopify/ProductVariant/48034995601646',
    cardDescription: 'Museum-quality signed art print, signed CD, exclusive listening session & Q&A, and early access content.',
    tierIncludes: [
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV', quantity: 1, image: '/assets/Individual Item Images/Museum Print - Stones River Print.png', modalImages: ['/assets/Individual Item Images/Museum Print - Stones River Print.png', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 1.jpg', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 2.jpg'] },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Individual Item Images/Signed CD.png', modalImages: ['/assets/Individual Item Images/Signed CD.png', '/assets/Individual Item Images/Signed CD - Disc.png'] },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Individual Item Images/Interview Footage Early Access (cropped).png', modalImage: '/assets/Individual Item Images/Interview Footage Early Access (Modal).png' },
    ],
    tierDescription: 'Ideal for fans valuing visual art and music equally. In addition to the signed CD and digital assets, this tier includes a museum-quality archival art print signed by Rush Baker IV and exclusive access to the composer.',
    fallbackTitle: 'Tier 4 — Gallery Patron',
    fallbackPrice: '$200.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
  {
    id: 'tier-5',
    shopifyProductId: 'gid://shopify/Product/9280285671662',
    shopifyVariantId: 'gid://shopify/ProductVariant/48035003531502',
    cardDescription: 'Signed art print, limited-edition blue vinyl (only 200 pressed), signed CD, listening session, and early access content.',
    tierIncludes: [
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV',
      'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV', quantity: 1, image: '/assets/Individual Item Images/Museum Print - Stones River Print.png', modalImages: ['/assets/Individual Item Images/Museum Print - Stones River Print.png', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 1.jpg', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 2.jpg'] },
      { name: 'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)', quantity: 1, image: '/assets/Individual Item Images/Blue Vinyl.png', modalImages: ['/assets/Individual Item Images/Blue Vinyl.png', '/assets/Individual Item Images/Blue Vinyl - Cover and Disc.jpg'] },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Individual Item Images/Signed CD.png', modalImages: ['/assets/Individual Item Images/Signed CD.png', '/assets/Individual Item Images/Signed CD - Disc.png'] },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Individual Item Images/Interview Footage Early Access (cropped).png', modalImage: '/assets/Individual Item Images/Interview Footage Early Access (Modal).png' },
    ],
    tierDescription: 'This is the ultimate bundle for the die-hard collector who seeks rarity and exclusivity. You will own the extremely limited-edition signed blue vinyl (only 200 pressed) and the stunning archival art print signed by Rush Baker IV.',
    fallbackTitle: 'Tier 5 — Harmony & Ink',
    fallbackPrice: '$250.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
  {
    id: 'tier-6',
    shopifyProductId: 'gid://shopify/Product/9280289472750',
    shopifyVariantId: 'gid://shopify/ProductVariant/48035009233134',
    cardDescription: 'Digital orchestral score, signed art print, limited-edition blue vinyl, signed CD, listening session, and early access content.',
    tierIncludes: [
      'Digital orchestral score of Stones River',
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV',
      'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Digital orchestral score of Stones River', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV', quantity: 1, image: '/assets/Individual Item Images/Museum Print - Stones River Print.png', modalImages: ['/assets/Individual Item Images/Museum Print - Stones River Print.png', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 1.jpg', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 2.jpg'] },
      { name: 'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)', quantity: 1, image: '/assets/Individual Item Images/Blue Vinyl.png', modalImages: ['/assets/Individual Item Images/Blue Vinyl.png', '/assets/Individual Item Images/Blue Vinyl - Cover and Disc.jpg'] },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Individual Item Images/Signed CD.png', modalImages: ['/assets/Individual Item Images/Signed CD.png', '/assets/Individual Item Images/Signed CD - Disc.png'] },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Individual Item Images/Interview Footage Early Access (cropped).png', modalImage: '/assets/Individual Item Images/Interview Footage Early Access (Modal).png' },
    ],
    tierDescription: "Join the Composer's Circle—the perfect tier for the musician, composer, or serious music student who wants to delve into the technical brilliance of Stones River. This bundle includes the full digital orchestral score, the limited-edition blue vinyl, and the archival art print.",
    fallbackTitle: "Tier 6 — Composer's Circle",
    fallbackPrice: '$500.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
  {
    id: 'tier-7',
    shopifyProductId: 'gid://shopify/Product/9280290259182',
    shopifyVariantId: 'gid://shopify/ProductVariant/48035010773230',
    cardDescription: 'The ultimate experience (limited to 10): handwritten letter, exclusive test pressing, orchestral score, art print, blue vinyl, CD, and all access.',
    tierIncludes: [
      'Handwritten personal letter from Jeremy on the creative journey behind Stones River',
      'Exclusive signed test pressing of Stones River (only 10 made!)',
      'Digital orchestral score of Stones River',
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV',
      'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Handwritten personal letter from Jeremy on the creative journey behind Stones River', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Exclusive signed test pressing of Stones River (only 10 made!)', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Digital orchestral score of Stones River', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker IV', quantity: 1, image: '/assets/Individual Item Images/Museum Print - Stones River Print.png', modalImages: ['/assets/Individual Item Images/Museum Print - Stones River Print.png', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 1.jpg', '/assets/Individual Item Images/Museum Print - Rush Baker Signing 2.jpg'] },
      { name: 'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)', quantity: 1, image: '/assets/Individual Item Images/Blue Vinyl.png', modalImages: ['/assets/Individual Item Images/Blue Vinyl.png', '/assets/Individual Item Images/Blue Vinyl - Cover and Disc.jpg'] },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Individual Item Images/Signed CD.png', modalImages: ['/assets/Individual Item Images/Signed CD.png', '/assets/Individual Item Images/Signed CD - Disc.png'] },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Individual Item Images/Jeremy_Kittel.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Individual Item Images/Access to 2 unreleased tracks.png' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Individual Item Images/Exclusive live performance.jpeg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Individual Item Images/Interview Footage Early Access (cropped).png', modalImage: '/assets/Individual Item Images/Interview Footage Early Access (Modal).png' },
    ],
    tierDescription: 'This is the pinnacle of support, designed for the maximum benefactor who deserves the rarest and most personal items. The Stones River Experience is limited to just 10 patrons. You receive an exclusive, signed test pressing (only 10 made), a personal handwritten letter from Jeremy, and your name listed on the album website.',
    fallbackTitle: 'Tier 7 — Stones River Experience',
    fallbackPrice: '$1,500.00',
    fallbackImage: '/assets/Vinyl_Front_And_Back.jpg',
  },
];

/**
 * Shopify storefront configuration.
 * Replace these values with credentials from your Shopify store admin panel.
 */
export interface ShopifyConfig {
  /** Shopify store domain — source: Shopify Admin > Settings > Domains (e.g., 'your-store.myshopify.com') */
  domain: string;
  /** Shopify Storefront Access Token — source: Shopify Admin > Apps > Manage private apps > Storefront API */
  storefrontAccessToken: string;
}

// Shopify store domain — source: Shopify Admin > Settings > Domains
// Storefront access token — source: Shopify Admin > Apps > Manage private apps > Storefront API credentials
export const shopifyConfig: ShopifyConfig = {
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || '',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '',
};
