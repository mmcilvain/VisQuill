# VisQuill Gallery Recreation

A high-fidelity recreation of the [VisQuill Gallery](https://visquill.com/gallery) experience, built as a Vite + TypeScript + React application. It does not include VisQuill's proprietary source code or compiled application assets. The project has permission to bundle the reference gallery thumbnails and quill logo locally for visual parity.

> **The goal is reconstruction, not reinterpretation. When implementation choices conflict with visual fidelity, favor fidelity unless doing so creates a significant technical, accessibility, security, or licensing problem.**

## Run locally

```bash
npm install
npm run dev
```

Build a production bundle with `npm run build`.

## Architecture

```text
src/
  app/             Route selection and application shell
  components/      Header, footer, and gallery cards
  data/            Gallery metadata and visualization descriptions
  gallery/         Gallery and detail page composition
  visualizations/  Reusable SVG thumbnail and interactive visualization modules
  styles/          Global tokens and reference-matched layout rules
  utils/           Pointer and geometry helpers
```

The visualization layer is deliberately modular: visual components own their data, geometry, pointer behaviour, and responsive sizing. The first implemented module, `DemographicProfile`, supports country selection, timeline stepping, hover values, and animated geometry changes.

## Current parity status

Implemented for this milestone:

- Fixed header, desktop navigation, developer submenu, mobile menu, and fixed footer.
- Desktop gallery width, five-column grid behavior, card proportions, type hierarchy, spacing, labels, and hover treatment.
- Responsive grid and a mobile-specific visualization handoff state.
- Detail-page shell, overlay controls, article layout, and a live interactive demographic profile module.
- Vercel SPA fallback configuration.

Known differences:

- The full third-party MapLibre/WebGL demographic map is intentionally not embedded. The corresponding SVG visualization is independent and interaction-complete for the first milestone.
- Mobile layout has been derived from the public responsive rules and inspected behavior; direct automated mobile viewport capture is a remaining QA gap.

See `design-qa.md` for the current visual comparison record.

## Licensing boundary

The public VisQuill Lab repository is MIT-licensed, while the VisQuill GDK has separate non-commercial and attribution terms. This project does not depend on, bundle, or modify the GDK. If future work intentionally incorporates MIT-licensed Lab code, retain its license and attribution notices.

## Next steps

1. Continue comparison passes for desktop, tablet, and mobile.
2. Add each original interactive visualization module one at a time.
3. Extend each visualization page with route-specific controls and data.
4. Close remaining interactive-viewer and mobile-parity gaps.
