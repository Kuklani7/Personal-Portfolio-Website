# Phase 4 — Cosmic Plum dark mode

## Local preview

Open `http://127.0.0.1:5174/` and use the sun/moon button at the right of the navbar. The same control stays visible on mobile and while scrolling through any section.

If the preview server has stopped:

```powershell
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

No commit, push, or deployment was performed. Existing uncommitted Phase 3 work was preserved. No dependencies were added.

## Implemented behavior

- Cosmic Plum uses `#1C1729` backgrounds, `#2A223D` surfaces, `#FFF7F2` text, `#B5A0FF` lavender, and `#FF9B80` peach, with shared muted text, borders, focus, project, and lighting tokens. Light-mode palette, layout, and content remain intact.
- The 44px celestial button uses one animated SVG: rays retract, the central disc becomes a crescent, and the shape rotates slightly. It has a 360ms transformation, theme-aware hover illumination, click feedback, an action label, and keyboard focus.
- A centralized React provider saves explicit choices under `portfolio-theme` in localStorage. Without a saved choice, it follows system color preference, including live changes. An explicit choice takes precedence. Cross-tab changes synchronize, and unavailable storage does not break switching.
- A small synchronous head script initializes the selected theme before the React application renders. Critical canvas background styling and browser color-scheme/theme-color are set early as well.
- Backgrounds, surfaces, text, borders, and selected effects transition over approximately 350ms. Typed CSS color properties interpolate the atmospheric gradients. No layout dimensions are animated. Reduced motion disables these transitions and icon movement.
- Dark hero lighting layers a stronger lavender inner glow, a wider purple halo, and a peach highlight. Existing small parallax distances are retained. The surname uses its existing single local-lighting effect with brighter lavender colors.
- Project and skill spotlights use stronger lighting in dark mode, with lighter muted text to preserve contrast even beneath the strongest illumination. Project accent identities, badges, arrows, disclosures, and keyboard behavior are retained.
- All supporting sections, navigation, footer, buttons, social links, timeline, and static fallback adapt to the selected theme.
- The existing 3D scene reuses its geometry and renderer with theme-aware material/key/fill/rim colors. Paused rendering uses demand mode so theme changes can repaint without restarting continuous animation. Mobile/reduced-motion fallback remains lightweight and gains a subtle lavender tint in dark mode.
- The interrupted mouse-tracking fix is retained: only keyboard-visible focus suppresses pointer effects. Clicking a control no longer freezes its containing section. Fine mice on hybrid touchscreen laptops are recognized; actual touch movements remain ignored.

## Try it yourself

| Check | Expected result |
| --- | --- |
| Click the navbar sun. | The full page becomes Cosmic Plum; the icon becomes a crescent. Click again to return to light. |
| Tab to the toggle, press Enter or Space. | Theme switches with a visible focus indicator and an updated action label. |
| Select a theme, then refresh/reopen. | Your explicit choice is restored. |
| With no saved `portfolio-theme` entry, change system color preference. | The website follows the system. After manually selecting a theme, system changes do not override it. |
| Move a mouse across the dark hero. | Lavender/peach illumination trails smoothly; organic layers respond slightly. Leaving fades the glow. |
| Move over the large surname. | A restrained local lavender highlight follows without moving or splitting the text. Text remains selectable. |
| Click Pause, then move across the hero. | The sculpture stays paused while ambient tracking still responds to the mouse. |
| Hover a dark project or skill panel, then leave. | Project-colored lighting is clipped inside the panel and fades on leave. Text remains stationary. |
| Navigate projects, expand Technical Details, and use section links. | Existing behavior and draft information are preserved. |
| Switch themes while the sculpture is paused. | Its appearance updates without replacing the canvas or restarting continuous motion. |
| Use mobile navigation and swipe projects. | Controls remain usable, the theme button stays accessible, and the page has no horizontal overflow. |
| Enable reduced motion and reload. | Both themes work with static atmospheric backgrounds, no pointer following, no theme animation, and the static sculpture fallback. |

To test automatic system following after making a manual choice, remove only the `portfolio-theme` localStorage entry in browser developer tools and reload. Preferences belong to the exact origin: `localhost` and `127.0.0.1`, or different ports, have separate storage.

## Files changed for Phase 4

Added:

- `public/theme-init.js`: early preference initialization before React renders.
- `src/theme/ThemeProvider.jsx`, `ThemeContext.js`, and `src/hooks/useTheme.js`: centralized theme selection, persistence, system preference handling, cleanup, and cross-tab synchronization.
- `src/components/ThemeToggle.jsx`: accessible celestial transformation.
- `src/theme/scenePalette.js`: light/dark Three.js material and lighting colors.
- `src/styles/theme.css`: toggle, theme transitions, and small dark-theme adaptations.
- `PHASE4-REVIEW.md`: this guide.

Updated:

- `index.html` and `src/main.jsx`: early initialization, critical background, and theme provider.
- `src/App.jsx` and `src/components/Navbar.jsx`: theme stylesheet and shared navbar control.
- `src/styles/tokens.css` and `home.css`: centralized dark palette, lighting tokens, and typed gradient colors.
- `src/components/AmbientHero.jsx`, `Spotlight.jsx`, and `InteractiveName.jsx`: reuse existing pointer tracking with theme-aware lighting.
- `src/components/HeroScene.jsx`: theme-aware existing scene and demand rendering while paused.

The working tree also contains the previously implemented, uncommitted Phase 3 files. Project data, professional information, existing URLs, package files, and hosting settings were not changed for this phase.

## Verification

- `npm run lint`: passed with no warnings.
- `npm run build`: passed. The existing optional lazy 3D chunk warning remains (approximately 917 kB minified / 244 kB gzip). The main application is approximately 372 kB minified / 119 kB gzip.
- `git diff --check`: passed.
- All 65 production-browser checks passed in hidden Chrome: mouse and native Enter/Space activation, icon transformation, storage persistence, system preference changes and explicit overrides, initialization before app rendering, browser color metadata, interpolated surfaces, pointer response/reset, mouse-focus regression, paused-scene reuse, project disclosures and navigation, contrast on composed surfaces and at maximum project glow, all supporting sections, both themes at seven widths from 320–1920px, mobile navigation, touch swiping, reduced motion, cross-tab synchronization, and unavailable storage.
- No browser errors were recorded. Screenshots and detailed results are in the Git-ignored `.review.local/phase4-*` files.
- These are functional checks with software WebGL, not hardware frame-rate or Lighthouse measurements. A physical device and screen-reader review remain useful for subjective interaction quality and announcement behavior.
