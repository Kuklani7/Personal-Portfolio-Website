# Advanced motion refinement

## Preview

Open `http://127.0.0.1:5174/` and reload to see the coordinated entrance. No dependencies were added. No commit, push, or deployment was performed. Existing uncommitted changes, résumé/contact updates, terminal functionality, and professional content are preserved.

## What to try

| Effect | How to verify |
| --- | --- |
| Hero name | Reload without reduced motion. RACHIT leads KUKLANI through static masks, with a short overlapping upward reveal. Font, weight, tracking, line height, and final dimensions are preserved. Letters are not split or stretched. |
| Hero composition | The technical label leads the name, followed by the tagline, introduction, actions, and socials. The terminal has its own short window entrance. Focusing an action finishes its reveal immediately so keyboard interaction stays usable. |
| Idle atmosphere | Keep the mouse stationary. The cobalt/lavender and peach fields drift independently on 19s and 23s cycles, with small opacity changes and seamless endpoints. |
| Pointer + drift | Move across the hero, then leave. Outer layers retain spring-smoothed pointer parallax; separate inner layers keep drifting. The transforms do not compete. |
| Pausing | Scroll the hero out of view or hide the page. Nonessential ambient loops pause and resume from their existing phase on return. |
| Terminal boot | Reload. The window enters, the six-character `whoami` command types, then its existing introduction and welcome appear in stages. The boot finishes in roughly 1.4 seconds. |
| Boot interruption | Begin typing immediately after reload. The boot finishes visually at once and preserves your input. Try `clear` during boot: delayed welcome text does not return. There are no JavaScript boot timers or per-character React updates. |
| Terminal regression | Try all 15 commands, Up/Down history, a draft while browsing history, unique/ambiguous Tab completion, and Shift+Tab. Theme switching preserves the session and does not replay boot. |
| Sections | Scroll through About, Skills, Experience, Projects, and Contact. Entrances use small upward movement, natural easing, and short stagger. Visited content stays visible when scrolling back. |
| Skills | Categories reveal in succession, followed by small badge rises. Existing hover illumination and subtle elevation remain, with stronger dark-mode lighting. |
| Projects | Use arrows, numbered selectors, Left/Right/Home/End, and touch swipes. Titles move slightly horizontally, descriptions fade, and badges stagger. Counter and control accents blend toward the active project's color. |
| Project details | Expand Technical Details, change projects, and return. The disclosure remains expanded. The track reserves the tallest panel's height, so navigating does not collapse or jump the layout. Opening/closing details still animates its intentional height change. |
| Experience | Scroll through the timeline. The existing progress line fills; each revealed milestone changes from warm accent to cobalt/lavender with a soft halo. Text does not move continuously. |
| Magnetic actions | Move across View Work, Contact Me, résumé, and project arrows. Targets move at most 5px horizontally and 3px vertically; selected icons shift slightly. Pointer exit resets them, keyboard focus keeps them stationary, and touch/reduced motion disables tracking. |
| Themes | Switch with the celestial toggle. Colors and surfaces use the shared 350ms timing. Existing preference persistence, icon transformation, and semantic colors remain intact. |
| Reduced motion | Enable reduced motion and reload. Names, section content, badges, and terminal welcome are immediately visible; decorative backgrounds are static and navigation remains functional. |

## Implementation

- `src/motion/presets.js` centralizes Motion durations, easing, springs, hero stages, section/badge reveals, and project variants. Matching CSS timing tokens are in `src/styles/tokens.css`.
- `src/hooks/useEntrance.js` provides one-time, progressively enhanced entrances. Normal markup starts visible, animation starts before paint, a missing viewport observer leaves essential content visible, and controls stop on cleanup. Focus finishes an entrance instead of hiding an interactive target.
- `src/motion/RevealContext.js` lets headings share their parent's entrance rather than animating twice.
- `src/hooks/usePageVisible.js` subscribes to document visibility with cleanup. The hero also observes whether it is near the viewport.
- `src/styles/motion.css` holds nested ambient loops, finite CSS terminal typing/reveals, timeline milestones, project accent blending, and selected icon interactions. Only decorative layers loop continuously. The previous large wash blur was removed; gradients supply their own soft falloff.

Updated components:

- `HeroIntro.jsx`, `InteractiveName.jsx`, and `Hero.jsx`: coordinated composition, two line masks, supporting-copy staging, and terminal-window entrance.
- `AmbientHero.jsx`: separate ambient/pointer layers with visibility and viewport pausing.
- `InteractiveTerminal.jsx`: a finite stepped boot sequence and persistent cancellation when typing or executing commands; interpreter/history behavior is unchanged.
- `Reveal.jsx` and `SectionHeading.jsx`: shared entrances, keyboard-safe completion, grouped stagger, and removal of duplicate heading animation.
- `About.jsx`, `Skills.jsx`, and `Contact.jsx`: restrained grouped entrances; skills use staggered badge lists.
- `Projects.jsx` and `ProjectShowcase.jsx`: native-carousel content transitions with persistent disclosure state and active accent blending.
- `TimelineProgress.jsx`: retains the scroll-linked progress line using the shared spring; reveal state controls milestone colors.
- `Magnetic.jsx` and `usePointerField.js`: restrained 5px/3px motion and shared spring constants.
- `ThemeToggle.jsx` and `ThemeProvider.jsx`: shared theme duration while preserving the existing state/storage implementation.
- `App.jsx`, `styles/home.css`, `styles/refinements.css`, `styles/tokens.css`, `styles/theme.css`, and `styles/terminal.css`: stylesheet integration, masking/nested layers, focus behavior, and shared CSS durations.

No portfolio data, dates, accomplishments, project descriptions, skills, contact methods, or URLs were changed for this motion pass. Earlier pending removals of the 3D scene and collage-to-terminal replacement remain as they were; no files were restored or deleted as part of this pass.

## Validation

- `npm run lint`: passes without warnings.
- `npm run build`: passes without warnings.
- Interpreter and preservation checks pass for all 15 commands, safe unsupported-input handling, shared data, hero text/typography rules, and all professional/contact data.
- **58 motion browser checks passed:** sampled hero ordering and constant name/terminal dimensions; cached-load layout-shift observation; boot typing/cancellation/clear/session behavior; independent stationary/pointer motion; simulated document visibility changes and actual offscreen pause/resume; section/badge visibility; milestones/progress; native project arrows/keyboard/touch, retained expanded details and height stability; focus-safe magnetic behavior; light/dark layouts at eight widths from 320–1920px; reduced motion; and unavailable viewport observation.
- **74 terminal/regression browser checks passed:** all commands, input/history/completion, focus escape, safe text rendering, internal transcript scrolling, profile-link requests/fallbacks, navigation and sticky offsets, theme/session behavior, pointer reset, reduced motion, and light/dark layouts across 12 viewport/height combinations.
- No browser errors occurred in either suite. Cached-load sampling recorded no layout-shift entries during the tested hero entrance. This is a scoped browser observation, not a Lighthouse score or a hardware frame-rate benchmark.
- Screenshots and detailed results are in the Git-ignored `.review.local/motion-*` and `.review.local/terminal-*` files. A physical-device and screen-reader review remains useful for subjective timing and announcement quality.
