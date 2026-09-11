import type { ReactNode } from 'react';

// The album title is italicized wherever it appears in site copy (OPO style note).
// "Battle of Stones River" names the 1862 battle, not the album, so it stays roman.
const ALBUM_TITLE = /(?<!Battle of )(Stones River)/g;

export function italicizeAlbumTitle(text: string): ReactNode {
  return text.split(ALBUM_TITLE).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

export function italicizeAlbumTitleHtml(html: string): string {
  return html.replace(ALBUM_TITLE, '<em>$1</em>');
}
