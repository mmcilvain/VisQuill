# Design QA — Foundation Milestone

## Comparison target

- **Source visual truth:** browser-rendered [VisQuill Gallery](https://visquill.com/gallery/) at `1363 × 936` CSS pixels, device scale factor `1`, desktop gallery default state.
- **Implementation:** browser-rendered `http://terminal.local:4173/gallery` at `1363 × 936` CSS pixels, device scale factor `1`, desktop gallery default state.
- **Capture note:** the cloud-browser transport rendered both screenshots in the QA session but does not expose a writable screenshot export in this workspace. The browser-rendered captures were compared in the same QA message; no density normalization was needed.
- **Detail-page source:** [Demographic Profiles](https://visquill.com/gallery/world-demographics/) and its embedded viewer were inspected. The source viewer could not render in this cloud browser because WebGL is disabled, so its map-level visual appearance is not used as final comparison evidence.

## Full-view comparison evidence

The desktop gallery frame now has close geometric parity:

| Surface | Reference | Implementation | Result |
| --- | ---: | ---: | --- |
| Header height | 90 px | 90 px | Match |
| Main content width | 1,200 px | 1,200 px | Match |
| Heading bounds | x 106, y 116, w 1,136, h 70 px | x 106, y 116, w 1,136, h 70 px | Match |
| First card bounds | x 106, y 220, w 214.39, h 307.91 px | x 106, y 220, w 214.39, h 307.89 px | Match |
| First artwork bounds | x 138, y 252, w 150.39, h 195 px | x 138, y 252, w 150.39, h 195.5 px | Match |
| Grid | five cards, 16 px gaps | five cards, 16 px gaps | Match |
| Footer | fixed, 40 px, right-aligned links | fixed, 40 px, right-aligned links | Match |

Focused comparison centered on the first row and header. It was needed because the reference is intentionally sparse and small differences in grid/card geometry are highly visible.

## Primary interactions checked

- Selected the first gallery card with the browser DOM control and verified route change to `/gallery/world-demographics`.
- Selected Japan in the demographic country controls and verified the profile changed to `Japan`.
- Stepped the timeline backwards and verified the selected year changed from `2023` to `2013`.
- Opened the `About this visual` panel and verified the panel rendered.
- Confirmed the build has no application console error. The only recorded console error is from the cloud-browser extension, not the implementation.

## Required fidelity surfaces

### Fonts and typography

The system-ui stack, heading scale, heading bounds, compact 16 px card labels, and 14.4 px call-to-action match the observed desktop reference geometry. The source serves Lato on some page loads while this implementation uses the inspected computed system-ui stack; this is a small optical difference, not yet blocking the foundation.

### Spacing and layout rhythm

Desktop content width, left/right inset, heading location, first-row card bounds, image bounds, card gap, fixed header, and fixed footer were measured and matched. The detail-page shell follows the reference's 90 px top offset, full-height embed region, 760 px article column, overlay control position, and fixed footer.

### Colors and visual tokens

The implementation maps the reference's visible `#213547` ink, `#f8f8f8` chrome, `#ccc` dividers, gold `#c7a86e`, and translucent black CTA treatment to named CSS tokens. The gallery page has no invented card surface treatment.

### Image quality and asset fidelity

**[P1] Original gallery thumbnail media has not been reproduced.**

Location: every `.thumbnail-art` instance in `src/visualizations/GalleryThumbnail.tsx`.

Evidence: the reference uses gallery-specific raster screenshots. The implementation uses original SVG visualization previews so it does not copy media without explicit reuse permission.

Impact: the structural gallery is close, but side-by-side card imagery is visibly different.

Fix: obtain explicit asset permission or create independently licensed thumbnail artwork with closer compositional studies for each visual. Do not copy source thumbnails until that boundary is resolved.

**[P2] Header mark differs from the original VisQuill logo.**

Location: `public/assets/quill-mark.png`.

Evidence: the reference uses its own quill logo; the implementation uses a newly generated, independent feather mark.

Impact: a noticeable but localized brand-asset mismatch.

Fix: use the original only if permission is granted; otherwise continue refining an independently created mark at the observed 50 px footprint.

### Copy and content

Gallery titles and CTA copy match the reference. The Demographic Profiles description and metric copy follow the observed detail page. The local module clearly labels its illustrative data so it does not misrepresent it as the reference data.

### States and interactions

The card, country selection, timeline, tooltip hooks, about panel, scroll control, submenu, and mobile menu are implemented. The full third-party MapLibre/WebGL reference visual was unavailable for behavioral comparison because the cloud browser has WebGL disabled.

### Responsiveness and accessibility

The responsive CSS reproduces the public breakpoint behavior: the top navigation turns into a full-screen menu below 768 px; the gallery auto-fits from five columns down; individual visualization embeds switch to a desktop/tablet handoff below 640 px. Controls are semantic buttons/range inputs with labels, focus states, disabled states, and keyboard country selection.

**[P1] Browser-rendered tablet and mobile comparison is still unavailable.**

Evidence: this cloud-browser integration provides a fixed desktop viewport and no permitted viewport-emulation control. Mobile behavior was derived from the public reference CSS and implemented, but cannot be visually certified with the available browser surface.

Impact: tablet/mobile visual parity cannot yet be declared.

Fix: run the existing responsive test matrix in a browser surface that permits `390 × 844` and tablet viewport captures, then update this report with paired screenshots and any layout fixes.

## Comparison history

### Iteration 1 — desktop gallery

- Finding: implementation cards were 319.52 px tall versus the reference's 307.91 px.
- Fix: made artwork non-shrinking, made the title row 48 px, and fixed desktop card height to 307.9 px.
- Post-fix evidence: implementation card measured `214.39 × 307.89 px`; reference measured `214.39 × 307.91 px`.

### Iteration 2 — interaction pass

- Finding: country selection was difficult to validate through the browser's SVG coordinate surface.
- Fix: added compact, accessible country controls while retaining map markers, then validated selection through the DOM browser controls.
- Post-fix evidence: `Japan` selection, timeline transition to `2013`, and the details panel all changed state successfully.

## Open questions

- Can original gallery thumbnail assets and logo be used in this project? The current implementation intentionally assumes no.
- Should the next visual recreation focus on matching one thumbnail/visualization perfectly (recommended) or on building the remaining modules broadly?

## Implementation checklist

- [x] Match desktop shell and five-column gallery geometry.
- [x] Implement responsive header/grid rules and mobile visual handoff.
- [x] Create a reusable SVG visualization architecture.
- [x] Implement one real interactive visualization.
- [x] Validate build, navigation, country selection, timeline, and panel behavior.
- [ ] Capture and compare tablet and mobile in an emulatable browser.
- [ ] Resolve asset rights or independently reproduce thumbnail compositions more closely.
- [ ] Build the next full interactive visualization.

## Follow-up polish

- Align the independent feather mark's optical width and shaft angle more tightly to the reference at 50 px.
- Refine per-card independent preview compositions once the asset-rights direction is known.

final result: blocked
