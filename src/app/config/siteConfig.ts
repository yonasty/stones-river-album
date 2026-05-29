/**
 * Site-wide configuration flags.
 *
 * SHOW_LISTEN_NOW — Controls visibility of the Listen Now DSP links section.
 * Set to `true` when streaming platform links (Spotify, Apple Music, etc.) are
 * ready and the album is available on those services. When `false`, the section
 * is completely removed from the DOM with no residual spacing.
 */
export const siteConfig = {
  SHOW_LISTEN_NOW: false,
} as const;
