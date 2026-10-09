# DBI Leader Dashboard

Bookmark page for a group leader who is already signed in on digitalbibleinstitute.com. The scan walks Prayer, Evangelism, Discipleship, and Revival on that tab. It does not click Send feedback, does not store a password, and does not scan in the background.

The fast baseline is `Downloads/DBI_Leader_Dashboard_Prototype` (version 0.3.45). Match its scan speed with the dashboard clock described below. The same-tab bookmark in commit `9caa011` was fast only because that tab stayed in front.

## Bookmark

The bookmark is a stable `javascript:` loader. On every click it injects:

`https://nelurs.github.io/dbi-leader-dashboard/scan.js?t=` plus the current time.

Leaders do not re-drag the bookmark when `scan.js` changes. The next click loads the latest published scan after GitHub Pages rebuilds (about a minute). Only a change to that loader payload itself would require one new drag. Behavior belongs in `scan.js`, not in the bookmark.

`index.html` builds that loader. `bookmarklet.js` is the same loader written out. Keep them identical.

## Startup

A bookmark click must not start the scan. It opens the dashboard tab and leaves it idle. The leader picks a language and favorites, then clicks **Scan assignments**.

The leader may watch the dashboard tab while the scan runs. That puts the assignments tab in the background, and Chrome then stretches that tab's own timers to about 1 second. The dashboard tab runs the prototype's clock instead, so those waits still finish on time. Do not call `dash.focus()` at scan start.

## Dashboard tab

The dashboard is its own browser tab beside the signed-in leader tab. The scan still runs only on digitalbibleinstitute.com, in the page that is already signed in. `window.open` of the named window `dbi-leader-dashboard` lives in `scan.js` so an old bookmark still opens the tab.

## Language

The language menu matches the extension: Favorites first, then every language, with a search box. The star saves favorites in this browser (`localStorage` key `dbi-leader-pages-scan`, field `langFavorites`). The default favorite list is `DBI_FAVORITES` in `scan.js`.

English must not call Google Translate and must not leave the status on “Translating the dashboard…”. Romanian menus are the hand-written `RO` object. Other languages translate after the leader selects them. `setLanguage` shows the current language immediately, then swaps the pack in when the translation arrives. `withTimeout` gives up after 12 seconds, restores the previous language, and clears the translating line. The language button label must match the language actually shown.

Lesson titles stay in English. When the dashboard is not in English, the translation is added after ` / `. `lessonLabel` must not queue translation while `slot.running` is true. Translate lessons only after the walk, not during it.

## By student and By group

Both panels are dropdowns filled from the scan roster (`dlp-student-pick`, `dlp-group-pick`), plus the tables under them. They are not empty search-only boxes. People come from `latest.roster`. Read map values with `Array.from(map.values())`. `[].slice.call(map.values())` returns an empty array and makes both menus look empty.

## Hero wording

Unsubmitted assignments are a normal result. Never prefix them with “This scan is incomplete, so read this as partial.”

`latest.complete` used to mean “zero warnings.” Any note, including an unknown lesson status, set `complete` false and glued that sentence onto the unsubmitted count. That was wrong.

Mark the scan incomplete only when the walk actually stopped early: `scan.stopped`, or `scan.failedModules` is non-empty (a module could not be read). `scanStopped()` is the check. Show that as its own note (`incompleteTitle` / `incompleteNote`) with the reason. Do not attach it to the unsubmitted sentence.

There are 4 modules: Prayer, Evangelism, Discipleship, Revival. A count like “11 of 108” is student checks (one student in one module), not modules. The side label is `sideCaught`: “student checks with nothing left.”

## Publish

After changing this folder, commit and push to `origin main` so https://nelurs.github.io/dbi-leader-dashboard/ updates. Do not leave dashboard edits only on disk. Never force-push. Never update git config. Never commit secrets.

## Speed secret

Symptom: the scan was fast in the local prototype and slow after the dashboard became a second tab.

The prototype's speed solution is a clock, not a different way of reading a student. `DBI_Leader_Dashboard_Prototype` version 0.3.45 (`manifest.json`) keeps the dashboard as its own page and walks DBI in a separate minimized window. `offscreen.js` sends `{type:'clock'}` every 120ms. `background.js` `pump()` answers by running `window.__dbiTick()` inside the scan page (`chrome.scripting.executeScript`). `scanner.js` `waitFor` puts its check in the `tickers` set, and `__dbiTick` runs that set. `delay`, the 600ms table settle, and the 400ms backup poll therefore move even while the scan window is minimized. Chrome does not slow that clock down, because it lives in the extension's offscreen document, not in the minimized window.

What to copy from `scanner.js`: `expand` clicks the student once, `readyStudent` waits until the open row is not loading and has `p.assignmentDescription` or an empty-submission message, then `delay(350)`, then `collapse`. `stableTable` waits until the same row list has sat still for 600ms (or an empty module for 5000ms). Those waits must be woken by `__dbiTick`. The 3-try loop and the page retry are only for a real failure. Do not bring back a per-student sleep that is measured only by the assignments tab's own `setTimeout`.

What `scan.js` must do: the same walk, with the dashboard tab playing the offscreen clock. `startClock` runs only after Scan assignments is clicked. It uses `slot.dash.Function` so `setInterval(120)` lives on the visible dashboard and calls `opener.__dbiTick()`. `stopClock` runs when the scan ends. A background tab often reports no layout boxes, unlike the prototype's minimized window, which was opened at a real size first. `expanded` therefore also accepts a next row that already contains `div.lesson-item__wrapper` or a spinner, so the 3-try loop does not run on every student. Do not rebuild the dashboard on every student. Do not translate lessons while `slot.running` is true. Do not start the clock on bookmark click.

## If this breaks again

- **The scan is slow while the dashboard tab is in front, or status says “Retrying … (2/3)” on ordinary students.** The dashboard clock is not calling `opener.__dbiTick`, or `waitFor` stopped registering `inspect` on `tickers`. The prototype file to copy is `scanner.js` `waitFor` plus `offscreen.js` (120ms) and `background.js` `pump`. A background tab's own `setInterval` is not that clock. If every row looks closed, `expanded` is requiring `getClientRects()` only; also accept the lesson node in the DOM.
- **Bookmark click starts scanning immediately.** Something calls `scan()` at the bottom of `scan.js` again. Only the Scan assignments button may call `scan()`.
- **“Translating the dashboard…” stays up while the button says English.** `setLanguage` set the status before Google Translate returned, and the request never finished. English must return before any `fetch`. `withTimeout(..., 12000)` must still reject and restore the previous language and status.
- **Lesson titles translate during the walk and the scan slows down.** `lessonLabel` queued Google Translate while `slot.running` was true, or `publishLive` called `render()` on every student. Do not render the full dashboard inside the student loop.
- **By student and By group are empty after a scan that found people.** `rosterPeople` or `leaderBrief` uses `[].slice.call(map.values())`. Use `Array.from`.
- **Hero says the scan is incomplete and then quotes the unsubmitted count.** `out.complete = out.warnings.length === 0` is back, or the hero prefixes `partial` onto `noneWaitingText`. Incomplete belongs only in `scanStopped`. Unsubmitted work uses `noneWaitingText` alone.
- **“108 modules” (or any large module count).** The side label `sideCaught` was applied to roster rows. Those rows are student checks. There are 4 modules.
- **A published scan.js change does not show up.** The bookmark is fine. Wait for GitHub Pages, then click the same bookmark. Replace the bookmark only if the `javascript:` loader in `index.html` changed.
