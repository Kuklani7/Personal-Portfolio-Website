# Phase 3 review

## Preview

Open `http://127.0.0.1:5174/` while the local Vite server is running. It reflects saved source changes automatically. If the server has stopped, run:

```powershell
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

This phase is local only. No commit, push, or deployment was performed.

## What changed

- Projects now use full-width editorial showcases with a counter, previous/next controls, direct selection, native scroll snap, horizontal gestures, mobile swiping, and keyboard navigation. Vertical wheel scrolling remains normal. There is no automatic rotation.
- Each project has a category, accent color, large title, existing description, engineering focus, technology badges, and an accessible Technical Details disclosure. The reusable presentation supports documented problems, solutions, implementation notes, challenges, outcomes, and real source/demo links when supplied.
- The existing homepage retains its composition, name, introduction, links, and 3D centerpiece. Its ambient lighting now uses the shared pointer utility, with small decorative parallax, one local lighting effect on the surname, and magnetic major actions.
- About uses an editorial introduction and existing highlights. Skills retain all 20 technologies in four readable groups. Experience retains both existing entries in an open vertical timeline. Contact and Footer use simpler layouts and the existing real destinations.
- Pointer lighting is local to each surface, spring-smoothed, and driven by Motion values without React state updates per pointer movement. Paragraphs remain stationary. Magnetic movement is limited to 3px horizontally and 2px vertically. Keyboard focus neutralizes it.
- Touch/coarse input and reduced motion disable pointer effects. Existing reduced-motion entrances, static 3D fallback, pause/resume, offscreen pause, and WebGL failure handling remain available.

## Content limitations

The repository contains three generic draft projects: Analytics Dashboard, Intelligent Data Assistant, and Error Logging System. It does not contain their source URLs, documented architectures, algorithms, technical decisions, or measured outcomes. The existing skill list and experience entries are also drafts.

These entries remain explicitly labeled. No project screenshots, diagrams, metrics, deployments, or source links were invented. The brief's RESQME, Graphics Engine, and AI Traffic Control diagrams are conceptual examples and were not substituted for actual projects. Supply verified information in `src/data/projects.js` before presenting these entries as final engineering case studies. Existing experience details remain in `src/components/Experience.jsx`.

## Try it yourself

| Feature | What to try | Expected behavior |
| --- | --- | --- |
| Projects | Click both arrows and the numbered selectors. | Counter, panel, and selected number update. Controls stop at the ends. |
| Project keyboard access | Tab to the showcase container; use Left/Right, Home, and End. | Projects change; inactive projects are excluded from focus and assistive technology. |
| Technical Details | Activate with a mouse or keyboard, then activate again. | Details expand and close; the control announces expanded/collapsed state. |
| Horizontal gestures | Swipe on a phone or use a horizontal trackpad gesture. | Projects snap into place without locking the page. |
| Vertical scrolling | Scroll vertically over a project or the sculpture. | The page scrolls vertically without forced horizontal navigation. |
| Ambient light and parallax | Move across the homepage, then leave it. | Soft lighting and background accents respond and settle without moving paragraphs. |
| Name | Move over the large name; select its text. | The surname lighting follows subtly; the original selectable name stays readable. |
| Magnetic actions | Move over View Work, Contact Me, Request résumé, project arrows, and selected contact links. | A small positional response returns on leave. Tab focus keeps targets stationary. |
| Panel lighting | Move over a project or skill group, then leave. | A clipped, subtle glow follows and fades. Skill icons and borders respond on hover. |
| Experience | Scroll through the timeline. | Entries reveal once and the progress line fills. |
| Navigation | Test every section anchor, mobile menu, Escape, and Back to top. | Anchors work, current section updates, and Escape closes the menu and restores focus. |
| Contact | Check email, GitHub, LinkedIn, and Request résumé. | Existing destinations remain intact. Email requires a configured mail application. |
| Reduced motion | Enable your operating system/browser reduced-motion preference and reload. | Static sculpture, instant navigation, and no pointer-following effects; project controls still work. |
| Small screens | Try 320px, 375px, tablet, and desktop widths. | Readable content, usable controls, and no horizontal page overflow. |

## Files

Added:

- `src/hooks/usePointerField.js`: reusable local coordinates, spring smoothing, reset, and input/motion gating.
- `src/components/Magnetic.jsx`: restrained CTA/control movement with stable wrapper targets.
- `src/components/Spotlight.jsx`: clipped surface lighting shared by projects and skills.
- `src/components/InteractiveName.jsx`: accessible, selectable cursor-lit name.
- `src/components/ProjectShowcase.jsx`: reusable project presentation and animated disclosure.
- `src/data/projects.js`: existing draft content separated from layout; optional verified case-study fields and URLs.
- `src/styles/refinements.css`: responsive supporting sections and interaction styles.
- `PHASE3-REVIEW.md`: this review guide.

Modified:

- `src/components/Projects.jsx`: native carousel, keyboard behavior, active slide tracking, resize alignment, announcements, and focus protection.
- `src/components/Hero.jsx` and `AmbientHero.jsx`: integrate shared pointer effects and selected magnetic actions.
- `src/components/About.jsx`, `Skills.jsx`, `Experience.jsx`, `Contact.jsx`, and `Footer.jsx`: cohesive supporting-section layouts with existing information and links.
- `src/styles/tokens.css`: reusable muted teal accent tokens for project identity.
- `src/App.jsx`: loads the refinement stylesheet.

No dependencies, routes, additional WebGL scenes, hosting settings, or package files were added or changed.

## Validation

- `npm run lint` and `npm run build` pass. The build retains the existing warning for the optional lazy 3D chunk (approximately 917 kB minified / 244 kB gzip). The main application is approximately 369 kB minified / 118 kB gzip.
- All 63 production-browser checks passed: carousel arrows, boundaries, numbered selection, keyboard navigation, inactive-slide focus protection, disclosure opening/closing, native horizontal gestures and mobile swiping, normal vertical wheel scrolling, pointer response/reset/focus behavior, preserved copy/links/skills, mobile navigation, timeline progress, solid-surface small-text contrast, nine viewport widths from 320–1920px, reduced motion, static mobile fallback, offscreen WebGL pause, context loss, and unavailable WebGL. No browser errors occurred during normal use; GPU failures were then deliberately simulated.
- `git diff --check` passes. The source changes remain uncommitted and no package files changed.
- Functional browser results and screenshots are saved locally under the Git-ignored `.review.local/` directory.
- Browser checks use hidden Chrome with software WebGL. They do not establish hardware frame rates or Lighthouse scores. Screen-reader announcements and physical device/trackpad feel still benefit from manual review.
