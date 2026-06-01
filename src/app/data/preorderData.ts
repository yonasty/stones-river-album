export interface IncludedItem {
  name: string;
  quantity: number;
  /** Path to item thumbnail — use placeholder for now */
  image: string;
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
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
      { name: 'Signed black vinyl of Stones River in deluxe packaging', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Signed black vinyl of Stones River in deluxe packaging', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker',
      'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker',
      'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Digital orchestral score of Stones River', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
      'Museum-quality archival art print, hand-numbered and signed by Rush Baker',
      'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)',
      'Signed CD of Stones River with deluxe artwork',
      'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process',
      'Instant access to 2 unreleased tracks from the album',
      'Early access to exclusive live performance video',
      'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel',
    ],
    includedItems: [
      { name: 'Handwritten personal letter from Jeremy on the creative journey behind Stones River', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Exclusive signed test pressing of Stones River (only 10 made!)', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Digital orchestral score of Stones River', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Museum-quality archival art print, hand-numbered and signed by Rush Baker', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Limited-edition signed blue vinyl of Stones River in deluxe packaging (only 200 pressed)', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Signed CD of Stones River with deluxe artwork', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Exclusive group listening session and Q&A with Jeremy discussing the piece\u2019s story, composition, and recording process', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Instant access to 2 unreleased tracks from the album', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to exclusive live performance video', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
      { name: 'Early access to interview footage with Jody Elff, Eric Jacobsen, & Jeremy Kittel', quantity: 1, image: '/assets/Vinyl_Front_And_Back.jpg' },
    ],
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
