# MathWorks — Remove “Select a Web Site” Modal (Userscript)

A tiny userscript that automatically removes MathWorks’ “Select a Web Site” modal (and its gray backdrop) so you can browse without interruptions. It also restores page scrolling when the site locks the page behind the overlay.

> Script file: `main.js` (userscript)

## What it does
- Detects and removes the “Select a Web Site” dialog and common modal overlays/backdrops
- Restores scrolling and clears page locks (`overflow`, `inert`, `modal-open`, etc.)
- Runs immediately and continues to watch for late‑injected modals via `MutationObserver`

## How it works (brief)
The userscript looks for likely dialog containers and backdrops using a small set of selectors and heuristics, then:
- Removes any element whose text contains “Select a Web Site”
- Removes common backdrop elements (e.g., `.modal-backdrop`)
- Restores scrolling by clearing `overflow`, `position`, and classes that lock the page
- Keeps running while the DOM changes to catch lazily-injected modals

The script requests no special privileges (`@grant none`).

### Import from file (Tampermonkey/Violentmonkey)
1. Download `main.js` to your computer.
2. Tampermonkey: Dashboard → Utilities → Import from file → select `main.js` → Install
3. Violentmonkey: Dashboard → Settings → Import → select `main.js`

## Usage
- Visit any MathWorks page (e.g., https://www.mathworks.com/).
- If the site tries to show “Select a Web Site,” the overlay will be removed automatically and scrolling will be restored.

If you run into a page that uses a genuine, necessary modal, you can temporarily disable the userscript from your manager’s toolbar for that site, refresh, complete the action, and then re-enable it.

## Configuration
If MathWorks changes class names/markup, you can tweak selectors in `main.js`:
- `SELECTOR_DIALOGS`: elements likely to contain the site-selector modal
- `SELECTOR_BACKDROPS`: common backdrop overlays

Add or adjust entries to keep the script effective over time.


### Code notes
- Uses `MutationObserver` to re-run cleanup when the DOM changes.
- Be cautious: very aggressive selectors could hide legitimate modals. Current defaults are conservative and text-gated to “Select a Web Site.”

## Privacy & Permissions
- No network requests
- No data collection
- `@grant none` — runs in the page context without special privileges


## License
No license has been specified for this repository. If you intend to distribute or modify this code, consider adding a LICENSE file (e.g., MIT) in the repository root.
