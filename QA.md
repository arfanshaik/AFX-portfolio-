# AFX portfolio verification

Verified on 21 September 2026.

Loading-screen and hero interaction revision verified on 22 September 2026.


## Transparent artwork and smoother motion revision

- Replaced blend-only sword rendering with fitted SVG clipping contours around the existing bitmap artwork. The steel, dark handle and scabbard render without a rectangular black canvas in the loader, background, project transitions and sword replay.
- Added a narrow light sweep clipped to the steel, a wider scroll-driven tilt, eased scrubbing and a soft red glow after each project.
- Removed the black letterbox bars and shot backgrounds. Samurai scenes now use feathered edges and soft dissolves; the sixteen practice poses crossfade as the page scrolls.
- The original artwork and personal photos are unchanged. No new generated imagery or dependencies are used.
- Standard Next.js production build, TypeScript validation and generation of all eight project routes passed for this revision.
- Geometry checks sampled 101 scroll positions at seven widths (375 through 2560 px): no sword or cover clipping after vertical centering was corrected.
- Full browser visual verification remains unavailable after the earlier automatic approval review usage block. Source and build checks are recorded below; previous browser observations remain historical.

## Previous cinematic and sword revision

- Added a five-shot selected-work sequence with independent camera moves, diagonal wipes, a foreground blade sweep, letterbox framing and brief clash sparks. The desktop clash view was inspected before browser access became unavailable.
- Added one katana transition after each of the eight projects. Each blade sheaths, holds, and draws as its own project scrolls past.
- Fixed the opaque cover image masking the handle by blending each artwork layer independently. Matched the collar and blade mask to the source image and centered the complete assembly.
- Asset-bound calculations confirmed the sword and cover fit at the fully drawn and fully sheathed positions for all seven listed widths. This is a geometry check, not a browser screenshot check.
- Standard Next.js production compilation, TypeScript checking and generation of all eight project routes passed.
- The final five-scene sequence and all eight project sword transitions could not receive a complete browser interaction check: automatic approval review blocked browser access because of the usage limit. Earlier browser results below describe the previous release.

## Build checks

- TypeScript: passed.
- ESLint: passed.
- Standard Next.js production build: passed; home, metadata routes, custom 404 and all eight project pages generated.
- Hosted Vinext production build: passed. Local fonts and photographs resolve without external asset dependencies.

## Browser checks

- Asset readiness reaches 100% and enables entry; the entrance reveals the portfolio.
- The restored loading screen remains on reload. Sampled progress advanced through 0, 16, 28, 38, 49, 59, 69, 81, 91 and 100; Enter stayed disabled until 100. The loading-screen circle and red punctuation dot are removed.
- Moving the pointer right across the hero image reveals the samurai; moving left restores Arfan. The keyboard right arrow also activates the reveal. A native button provides tap/keyboard toggling.
- The hero portrait and background grid now shift with scroll. The katana also changes rotation. No broken images or horizontal page overflow appeared in the revised desktop view.
- Original samurai artwork, katana, matching scabbard, practice sheet and four duel stills load on desktop and mobile.
- Native scrolling moves the katana from 0% to 100% sheathed and changes its rotation.
- The selected-work sequence advances through all four scenes in order as scroll position increases; the heading stays visible while the background changes.
- Final responsive checks were repeated after the typography reduction and duel scene were added.
- Replay Sword activates the animated sword layer; a crimson slash accompanies the sweep. Black artwork backgrounds blend into the page.
- Only the two latest uploaded personal photographs are referenced by the app. Original photos were resized/compressed, with no facial editing.
- Navigation dialog traps keyboard focus and closes with Escape.
- Skill tabs switch content by click and arrow key.
- Portrait reveal button toggles its visible state and aria-pressed value.
- Process buttons reveal the selected stage.
- Journey tabs switch the selected milestone.
- Neural Core buttons change their selected discipline.
- Project detail content renders, including overview, interface direction, status and next-project link.
- Contact destinations match the supplied email, LinkedIn and GitHub profile.

## Responsive checks

The browser ran the portfolio in same-origin frames at the exact requested viewport dimensions. Document width matched available viewport width at every size, and no image was broken:

| Viewport | Horizontal page overflow | Broken images |
| --- | --- | --- |
| 375 × 812 | None | None |
| 430 × 932 | None | None |
| 768 × 1024 | None | None |
| 1366 × 768 | None | None |
| 1440 × 900 | None | None |
| 1920 × 1080 | None | None |
| 2560 × 1440 | None | None |

The rotated decorative katana deliberately extends outside its fixed backdrop and is clipped. Sprite-sheet and duel artwork are intentionally clipped to their individual frames. It creates no horizontal page scrolling. Desktop scrollbars reduce layout width by 15 px inside the test frames.

The temporary layout harness is retained at `docs/qa-layout.html`, outside public output. To reuse it, temporarily copy it to `public/qa-layout.html` while running the development server, then remove it before publishing.

## Limits

- Exact phone sizes were checked in browser frames, not physical mobile hardware. Touch controls are implemented as ordinary buttons; device-specific performance was not benchmarked.
- Reduced-motion branches are present in CSS and the GSAP/Lenis/Canvas code. Browser preference emulation was unavailable, so this was checked in source, not by toggling the browser's OS preference.
- Project previews are labelled interface concepts because real screenshots were not supplied. No usage metrics, awards or client results are invented.
- External repository availability was not verified. Some browser extension metadata errors were unrelated to the portfolio code.
- No universal frame-rate guarantee is made.

See `docs/duel-scroll-preview.jpg` for the final inspected scrolling scene.
See `docs/loading-screen-preview.jpg` for the restored loading screen.
