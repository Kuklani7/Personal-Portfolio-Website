# Interactive portfolio terminal

## Preview and first steps

Open `http://127.0.0.1:5174/`. The hero's right-side photo collage is replaced with a terminal. Click its input and type `help`, or use one of the suggested-command buttons. Press Enter to run a command.

The large name, typography, technical label, introduction, buttons, résumé PDF, social destinations, ambient lighting, and RK. navigation remain intact. The existing collage files and photographs are preserved, but the Hero no longer imports or renders them.

## Commands

| Command | Behavior |
| --- | --- |
| `help` | Lists all 15 commands and keyboard shortcuts. |
| `whoami` | Name, University at Buffalo student introduction, and engineering interests. |
| `about` | Short introduction using existing portfolio information. |
| `skills` | All current skills grouped using `src/data/skills.js`. |
| `projects` | Current showcase names and categories; draft entries remain labeled. |
| `experience` | Roles, organizations, and dates shared with the professional timeline. |
| `contact` | Current email, GitHub, LinkedIn, and available résumé link. |
| `github` / `linkedin` | Requests the real profile in a new tab with `noopener,noreferrer`; retains a fallback link if popups are blocked. |
| `theme` | Reports the active light/Cosmic Plum theme and points to the navbar switch. |
| `clear` | Clears the transcript while retaining command history and the website's state. |
| `open projects` / `open skills` / `open experience` / `open contact` | Navigates to the existing section, accounts for the sticky navbar, and transfers keyboard focus to its heading. |

Commands are case-insensitive and ignore extra surrounding/internal whitespace. Empty commands do nothing. Unsupported input returns a friendly help message. Only exact predefined commands are recognized: the terminal cannot execute shell commands, JavaScript, or user code, and does not contact a backend.

## Interaction checklist

- **History:** Run several commands, type an unfinished draft, and use Up/Down. Your draft returns when you move past the newest command. Adjacent duplicate commands are omitted. History is limited to 100 commands and stays within this visit.
- **Completion:** Type `who` and press Tab; type `open p` and press Tab. Type `open` and press Tab to see all matching navigation commands. Empty input, an exact completed command, and unknown prefixes allow normal Tab navigation. Shift+Tab always moves focus normally.
- **Scrolling:** Run `help` or `skills`. The transcript scrolls internally to the latest output; the terminal keeps a fixed height. Output remains selectable. At most 60 transcript entries are retained.
- **Welcome:** The initial text has a short staged reveal. The input is immediately usable, receives no automatic page-load focus, and remains ready after ordinary commands. Theme changes preserve input/history and do not replay the welcome.
- **Themes:** Switch with the navbar sun/moon control. The terminal uses the existing semantic palette, with white/navy/cobalt in light mode and plum/lavender/peach in dark mode.
- **Pointer:** A local spring-smoothed glow follows the mouse. Hover slightly enhances the shadow and lifts the panel by 2px. Focus removes the lift and lets the glow fade, keeping typing and selection stable. No perspective tilt is used.
- **Reduced motion:** Enable reduced motion and reload. Welcome text is visible without staged motion, pointer effects are disabled, and navigation is instant. The input retains its browser-native caret.
- **Accessibility:** The input is labeled, command buttons and links are semantic controls, the transcript is keyboard-scrollable, and a separate polite status region announces concise results instead of rereading the entire history.

## Layout

At widths of 1200px and above, the terminal sits beside the existing introduction at approximately 450–520px wide. It uses available right-side space without shrinking or overlapping the large name. Short laptop screens use a higher panel position. On narrower screens, it stacks below the introduction and retains the same controls.

## Files

Added:

- `src/components/InteractiveTerminal.jsx`: terminal window, welcome reveal, input, history, completion, announcements, navigation, and safe external-link actions.
- `src/utils/terminalCommands.js`: centralized command registry, pure allowlist interpreter, normalization, completion, and shared welcome content.
- `src/styles/terminal.css`: terminal appearance, theme colors, fixed-height transcript, focus states, hover, and basic mobile layout.
- `src/data/experience.js`: existing timeline data moved without content changes so both views use one source.
- `TERMINAL-REVIEW.md`: this guide.

Updated:

- `src/components/Hero.jsx`: replaces only the collage import and right-hand component with the terminal.
- `src/styles/home.css`: positions the new right-hand panel and stacks it at narrower widths. Name and left-side typography rules are unchanged.
- `src/components/Experience.jsx`: reads its unchanged content from the shared experience module.

No new dependencies, routes, servers, or animation libraries were added. Existing uncommitted work, résumé/contact updates, and collage source/assets are preserved. Nothing was committed, pushed, or deployed.

## Verification

- `npm run lint` and `npm run build` pass.
- Interpreter checks cover every command, normalization, empty/unsupported input, completion, shared data, and exact preservation of the Hero introduction, typography rules, and experience content (normalizing Windows line endings).
- All 74 production-browser checks pass, covering command behavior, history/draft restoration/deduplication, completion/focus escape, scrollable output, safe markup display, popup-blocked fallback links, navigation/focus/sticky offsets, themes/session preservation, pointer response/reset/focus stability, reduced motion, basic mobile commands, and 12 viewport sizes in both themes (320–1920px). No browser errors were recorded.
- Browser validation uses hidden Chrome. External profile commands were checked by capturing their new-tab requests and URLs while simulating popup blocking; external service availability and screen-reader announcement quality still benefit from manual review.
- Results and screenshots are saved in the Git-ignored `.review.local/terminal-*` files. No performance benchmark scores are claimed.
