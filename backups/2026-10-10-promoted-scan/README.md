# Restore point: promoted scan, 2026-10-10

This folder is the restore point after the Promote tested scan workflow succeeded (about 19:01 UTC on 9 October 2026) and copied the tested scan onto production `scan.js`. The good bookmark loads `https://nelurs.github.io/dbi-leader-dashboard/scan.js`. In this copy, `DBI_SCAN_CHANNEL` is `'good'`, so the good bookmark does not show the TEST banner, Push update, or Run workflow.

Files: `scan.js`, `scan-test.js`, `index.html`, `bookmarklet.js`, `FEATURES.md`, and `.github/workflows/promote-scan.yml`.

The older restore point `backups/2026-10-09-fast-scan/` is the fast scan from before the review confirmation and the instant feedback update. Use this folder when you want the promoted production scan.

## What leaders get

- Review confirmation in the selected language. Romanian uses the hand-written sentence. Other languages use the same translation path as the menus. Changing language rewrites the sentence. Lesson titles stay English, with the translation after a slash. Revival uses the Romanian module label when the UI is Romanian.
- After Send feedback, that assignment leaves Waiting on you immediately. The dashboard updates the counts without a new scan. The scan does not click Send feedback.
- The speed wake-up clock: the visible dashboard calls `__dbiTick` every 120ms so a background assignments tab stays fast.
- Language menu and favorites. Romanian menus are hand-written.
- By student and By group dropdowns.

## How to restore

Copy this folder's `scan.js` back over the repo `scan.js`. Push only when the user asks. Do not copy `scan-test.js` over `scan.js` unless you also set `DBI_SCAN_CHANNEL` to `'good'`. This backup has no secrets.
