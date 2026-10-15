# Bright visual identity: Phase 1

This pass changes the design foundation, shared styling, and navigation. The existing hero and project layouts, wording, data, links, and interactions remain intact. The 3D renderer, lazy loading, Pause/Resume controls, and mobile/reduced-motion fallbacks are preserved. No dependencies were added and nothing was committed, pushed, or deployed.

## Theme controls

Edit `src/styles/tokens.css` to change the palette, surface colors, text colors, border colors, radii, offset shadows, or transition timings. The main palette follows the proposed cream, white, ink, cobalt, and orange colors. Darker muted/accent variants keep small text readable on tinted surfaces.

Semantic Tailwind utilities (`text-ink`, `text-muted`, `text-accent`, `border-line`, and the shared surface colors) reference those tokens. Shared CSS primitives include `.button`, `.badge`, `.section-label`, `.section-title`, `.container-shell`, `.panel`, `.icon-box`, focus styles, and decorative shapes.

The existing 3D visual keeps an isolated dark palette under the `--scene-*` tokens, ready for adaptation in a later phase. The large-name hero introduction is also reserved for a later phase; navbar branding remains compact.

## Changed files

- `src/styles/tokens.css`: new centralized design tokens and semantic Tailwind color utilities.
- `src/index.css`: light surfaces, solid cobalt emphasis, restrained orange accents, shared typography, outlined controls, offset shadows, navigation states, and accessible focus styles. The existing card layouts and motion policies are retained.
- `src/components/Navbar.jsx`: compact orange/code branding, light navigation, clear active-section styles, and shared CTA/menu styles. Existing anchor destinations and accessible mobile-menu behavior remain intact.
- `src/components/AmbientHero.jsx`: the existing pointer-light color now references the theme token.
- `src/components/About.jsx`, `Skills.jsx`, `Experience.jsx`, `Hero.jsx`, and `Projects.jsx`: replace fixed dark-theme text/border utilities with semantic theme utilities; no section restructuring or content changes.
- `src/components/Contact.jsx` and `Footer.jsx`: apply shared light-theme styles while retaining layout, content, social/email links, and back-to-top behavior.
- `index.html`: set the browser theme color to the light cream background.

## Preview and review

Run `npm run dev`, leave the terminal running, and open the printed Local URL (normally http://127.0.0.1:5173/). Saving files updates the browser.

- Review the cream background, white surfaces, cobalt buttons, orange accents, and consistent section typography.
- Check navigation on desktop and at phone width, including active indication, Escape to close, and links closing the mobile menu.
- Tab through the skip link, navigation, buttons, and contact links to review visible focus states.
- Test the existing 3D Pause/Resume control and mouse response. Mobile and reduced-motion users should still see the static fallback.
- Review the existing hero/project layouts and verify their links still behave as before.
- Resize from 320px through desktop widths and check for horizontal overflow.

The production build still reports the existing large lazy-loaded 3D chunk warning (about 917 kB minified / 244 kB gzipped). The renderer and dependencies were intentionally retained in this phase.

## Verification

Lint and the production build passed. All 41 browser checks passed, covering the light tokens, shared small-text contrast on solid surfaces, valid anchors, five responsive widths (320–1440px), mobile navigation, keyboard focus, reduced motion, preserved contact destinations, 3D rendering and Pause/Resume, card tilt, and WebGL fallbacks. This is functional and sampled contrast verification, not a full accessibility audit or a performance benchmark. Screenshots and detailed results are stored in the Git-ignored `.review.local/` directory.
