# Restore point: fast scan, 2026-10-09

This folder is the known-good DBI Leader Dashboard after the leader confirmed speed was back. Copy these files back over the repo root to restore that scan. Do not treat a later `scan.js` as this version.

Files: `scan.js`, `index.html`, `bookmarklet.js`, `FEATURES.md`.

## Why this version is the restore point

The second tab no longer slows the scan. The dashboard tab runs the prototype wake-up clock about 8 times a second (`setInterval` at 120ms, `startClock` / `window.__dbiTick`). The assignments page uses the prototype readiness check: one click, wait until the lesson row is not loading and has `p.assignmentDescription` or an empty-submission message, then `delay(350)`, then collapse. `stableTable` still waits 600ms for a steady row list, or 5000ms to confirm an empty module. Those waits stay short because the clock lives on the visible dashboard, not on the background assignments tab.

Also true of this version:

- The bookmark does not auto-scan. It opens the dashboard and waits for Scan assignments.
- Language menu and favorites work. Romanian menus are hand-written. Lesson translation stays off the scan path.
- By student and By group are dropdowns filled from the roster (`Array.from(map.values())`).
- Unsubmitted work is not called an incomplete scan. Incomplete means the walk stopped early (`scan.stopped` or `failedModules`).
- The good bookmark is a stable loader. It injects `https://nelurs.github.io/dbi-leader-dashboard/scan.js?t=` plus the current time. Leaders do not re-drag it when only `scan.js` changes.

## Symptom → cause → fix

Symptom: the scan was fast in `Downloads/DBI_Leader_Dashboard_Prototype` (0.3.45) and slow after the dashboard became a second tab. Status could say `Retrying Name (2/3)` on ordinary students.

Cause: the leader looks at the dashboard, so the assignments tab is in the background. Chrome stretches that tab's own timers to about 1 second and often reports no layout boxes. The prototype's 350ms pause, 600ms settle, and 400ms poll then become about a second each, hundreds of times.

What the prototype does: `offscreen.js` sends a clock every 120ms. `background.js` `pump()` runs `window.__dbiTick()` in the scan page. `scanner.js` `waitFor` registers its check on `tickers`. The minimized scan window stays fast because that clock is not throttled. `expand` clicks once. `readyStudent` waits for the description or an empty message. Then `delay(350)` and `collapse`.

What this `scan.js` does: the same walk. `startClock` runs only after Scan assignments is clicked, on the dashboard window, and calls `opener.__dbiTick()`. A background tab often has no layout boxes, so `expanded` also accepts a next row that already contains `div.lesson-item__wrapper` or a spinner. That keeps the 3-try loop on the failure path only. The dashboard is not rebuilt on every student. Lessons are not translated while the scan runs. The clock does not start on bookmark click.

If a later edit is slow again, restore this `scan.js`. Check that the dashboard clock still calls `__dbiTick`, and that `expanded` does not require `getClientRects()` alone.
