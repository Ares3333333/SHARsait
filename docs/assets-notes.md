# SHAR Production – Visual Assets Notes

This note documents key external visual assets used in the current frontend.

## Awards laurels

- `assets/img/laurel-minimal.svg`
  - Custom minimal laurel icon drawn in-house for SHAR Production.
  - Monochrome, uses `currentColor` in SVG so it can inherit `#9c0404` or white from CSS.
  - Integrated in `index.html` in the Awards block inside `.award-laurel-badge`.

## Team portraits (placeholders)

Used as tasteful, royalty-free style placeholders from Unsplash, sized small for performance and loaded lazily.

- Arseniy Aleksandrov: `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400`
- Sasha Sher: `https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=400`
- Alexandra Cherniaeva: `https://images.unsplash.com/photo-1525130413817-d45c1d127c42?q=80&w=400`
- Fedor Nevrov: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400`
- Vladislava Khvesyuk: `https://images.unsplash.com/photo-1521193086136-514f30c9bfa2?q=80&w=400`
- SHAR AI agent: `https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400`

Portraits are:
- Framed inside `.team-member-photo` (56 × 56 px, `object-fit: cover`).
- Marked with `loading="lazy"` and explicit `width`/`height` attributes to avoid layout shifts.

