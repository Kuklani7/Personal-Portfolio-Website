# Phase 2: interactive 3D and motion

The Phase 1 palette, page layout, headline, professional summary, section content, navigation, and real contact destinations remain in place. This guide describes the implementation and the checks to try locally.

## Try the features

Start `npm run dev` in the project folder and open the Local URL from the terminal, normally http://127.0.0.1:5173/. Keep the terminal running; saving code updates the browser.

| Feature | How to verify | Expected behavior |
| --- | --- | --- |
| 3D hero | Open the hero on a desktop browser with a mouse and motion enabled. | One blue/cyan torus knot rotates slowly inside the existing developer-interface styling. The camera stays fixed. |
| Pointer response | Move your mouse across the right-hand hero visual, then move outside it. | The knot gently tilts toward the pointer, then its extra tilt eases back to rest while slow rotation continues. No dragging or zooming is needed. |
| Pause/Resume | Click Pause at the top-right of the hero visual, then Resume. | The 3D visual freezes and restarts. Both actions are keyboard accessible. |
| Ambient lighting | Move the mouse across the hero. | A low-opacity radial glow follows smoothly behind the content and returns toward its default position when you leave. |
| Hero entrance | Reload at the top of the page. | Availability, technical label, headline, summary, buttons, and social links enter with a small stagger. No text wording changes or layout shifts. |
| Section headings | Scroll through About, Skills, Experience, Projects, and Contact. | Headings reveal with a short fade and small translation, once per page load. |
| Project tilt | Move a mouse across a project card, then outside it. | A restrained perspective tilt, elevation, and border illumination reset smoothly. Touch input does not tilt cards. Keyboard focus keeps the card level. |
| Skills | Hover over each skill category. | Cards lift slightly and the border, background, and icon respond consistently. |
| Timeline | Scroll down through Experience. | A thin blue/cyan line fills along the existing timeline. Entries reveal once. |
| CTA buttons | Hover over View Projects, Contact Me, or social/resume links; Tab through them. | Small elevation/icon movement and visible focus rings; destinations remain unchanged. |
| Normal scrolling | Use the mouse wheel or trackpad while the pointer is over the 3D area. | The page scrolls normally. The scene has no camera controls and does not capture scrolling. |
| Mobile/touch | Open on a phone or narrow the viewport below 768px. | A lightweight static knot illustration replaces WebGL. No pointer-following glow or card tilt on touch devices. |
| Reduced motion | Enable reduced motion in browser rendering tools or your operating system, then reload. | Content is immediately visible, scrolling is instant, and a static illustration replaces the 3D scene. Tilt, pointer glow, and movement effects are disabled. |
| Fallback | Open with WebGL unavailable. | The static knot illustration appears; the rest of the page and links continue working. |
| Existing navigation | Test mobile menu, Escape, all navigation links, back-to-top, and contact/social links. | Existing behavior is preserved. Email links open your configured email application. |

## Architecture and files

Added:

- `src/components/HeroScene.jsx`: isolated React Three Fiber Canvas, procedural torus-knot geometry, lighting, frame-based rotation/damped pointer response, WebGL context-loss handling.
- `src/components/HeroVisual.jsx`: lazy-load boundary, renderer-failure fallback, pause control, viewport/page-visibility tracking, and developer details.
- `src/components/HeroFallback.jsx` and `public/hero-knot.svg`: reusable, local static vector fallback with no WebGL dependency.
- `src/components/AmbientHero.jsx`: hero-local pointer tracking and spring-smoothed CSS glow.
- `src/components/HeroIntro.jsx`: short staggered entrances using the existing Motion dependency.
- `src/components/SectionHeading.jsx`: reusable heading reveal that respects reduced motion.
- `src/components/TiltCard.jsx`: fine-pointer-only card tilt with spring reset and keyboard-focus protection.
- `src/components/TimelineProgress.jsx`: scroll-linked timeline illumination.
- `src/hooks/useInteractiveMotion.js`: shared live media-query subscription for fine pointer, hover, and motion preferences, with cleanup.
- `PHASE2-REVIEW.md`: this implementation and verification guide.

Modified:

- `src/components/Hero.jsx`: integrates the scene, ambient wrapper, and staggered text while preserving the headline, summary, CTA destinations, and social/resume links.
- `src/components/Reveal.jsx`: bounded stagger delays and immediate reduced-motion reveals.
- `src/components/Projects.jsx`: wraps existing cards with tilt and short entrance staggering; project content and conditional URLs remain unchanged.
- `src/components/Skills.jsx`: shared heading reveal, short card stagger, and consistent hover treatments.
- `src/components/Experience.jsx`: shared heading reveal, short entry stagger, and timeline progress wrapper; all entries retained.
- `src/components/About.jsx` and `src/components/Contact.jsx`: shared heading reveals; existing content and contact functionality retained.
- `src/index.css`: restrained scene presentation, pointer glow, card/button/icon interactions, and timeline progress styling using existing design tokens.
- `package.json` and `package-lock.json`: two requested runtime dependencies and their transitive dependencies.
- `vite.config.js`: ignores the local review scratch folder during development, preventing locked browser-test files from stopping the live preview. Production hosting settings are unchanged.

## Dependencies and performance

- `three` (`^0.186.1`): procedural geometry, materials, lights, and WebGL rendering.
- `@react-three/fiber` (`^9.8.2`): React integration, Canvas lifecycle/resource management, and frame callbacks.
- No Drei, post-processing, HDR environments, textures, camera controls, new animation library, API keys, or environment variables were added.
- Geometry uses 160 tubular segments and 20 radial segments. Device pixel ratio is capped at 1.5. No shadows or post-processing passes are used.
- Animation updates object refs, not React state, each frame. Rendering pauses when offscreen, in a hidden tab, or manually paused. Pointer/media/visibility/context listeners clean up on unmount; declarative Three resources are managed by React Three Fiber.
- The scene is a separate lazy-loaded chunk. Touch, narrow-screen, reduced-motion, and data-saving users use the local fallback rather than loading that chunk.

## Verification results

- `npm run lint`: passed.
- `npm run build`: passed, with the optional 3D chunk-size warning described below.
- `git diff --check`: passed.
- All 39 hidden Chrome checks passed against the production build, including actual WebGL rendering, draw-call verification of Pause, Resume, pointer lighting, mouse-wheel scrolling over the scene, five responsive widths (320–1440px), mobile navigation, project tilt/reset/touch/focus behavior, timeline illumination, preserved links, reduced motion, skipped 3D downloads on mobile/reduced motion, context loss, and unavailable WebGL.
- No browser errors were recorded during normal use. GPU failures were deliberately simulated in the fallback checks.
- These are functional browser checks using software rendering, not hardware FPS or Lighthouse benchmarks. Screenshots and detailed results are available locally under the Git-ignored `.review.local/` folder.

## Remaining warnings

- The optional scene chunk is approximately 917 kB minified / 244 kB gzipped, triggering Vite's 500 kB chunk warning. It is intentionally lazy-loaded rather than added to the initial application bundle. No Lighthouse or FPS scores are claimed.
- `npm audit` reports an existing high-severity `source-map-js@1.2.1` advisory (GHSA-68fv-2mgg-jv7q) through the existing Vite/PostCSS and Tailwind toolchain. This version was already in the Phase 1 lockfile; it was not introduced by the 3D dependencies. The unrelated toolchain was left unchanged.
- Existing draft content, missing project URLs/screenshots, and the resume-request email remain as they were in Phase 1. No project links or achievements were invented.
- Hardware, browser, and power-saving capabilities can affect WebGL availability. Falling back to the static illustration is intentional.
