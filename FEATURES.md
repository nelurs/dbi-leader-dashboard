# DBI Leader Dashboard

Bookmark page for a group leader who is already signed in on digitalbibleinstitute.com. The scan walks Prayer, Evangelism, Discipleship, and Revival on that tab. It does not click Send feedback, does not store a password, and does not scan in the background.

The fast baselines are the bookmark in commit `9caa011` (same-tab scan, no extra waits) and the local extension folder `Downloads/DBI_Leader_Dashboard_0.3.41`. Match that speed. Do not add waits on the student walk.

## Bookmark

The bookmark is a stable `javascript:` loader. On every click it injects:

`https://nelurs.github.io/dbi-leader-dashboard/scan.js?t=` plus the current time.

Leaders do not re-drag the bookmark when `scan.js` changes. The next click loads the latest published scan after GitHub Pages rebuilds (about a minute). Only a change to that loader payload itself would require one new drag. Behavior belongs in `scan.js`, not in the bookmark.

`index.html` builds that loader. `bookmarklet.js` is the same loader written out. Keep them identical.

## Startup

A bookmark click must not start the scan. It opens the dashboard tab and leaves it idle. The leader picks a language and favorites, then clicks **Scan assignments**.

The leader may watch the dashboard tab while the scan runs. Chrome then treats the assignments tab as a background tab and stretches every `setTimeout` and `setInterval` to about 1 second. The walk must not depend on those timers. `focusLeader()` still tries to return focus to the signed-in tab, and the scan must stay fast even when that focus does not stick. Do not call `dash.focus()` at scan start.

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

Symptom: the scan was fast as a same-tab bookmark (`9caa011`) and in the extension, then became slow only after the dashboard opened as a second tab. Status could show `Retrying Name (2/3)` while the hero still said to run a scan.

Cause: the leader looks at the dashboard, so the assignments tab is in the background. Chrome clamps `setTimeout` and `setInterval` there to about 1000ms and reports no layout (`getClientRects()` is empty). The extension’s `delay(350)` after each student, `stableTable`’s 600ms settle, `waitFor`’s 400ms poll, and the collapse wait were small on a foreground tab. In the background each one becomes a full second, and hundreds of students times several timers is the slowdown. A failed expand used to add a 7-second retry, up to 3 times.

What the extension does: `scanner.js` clicks a student, polls until the lesson row is ready, then sleeps 350ms. That sleep is safe only because the extension’s scan window is the foreground scan context. It is not safe once this dashboard tab backgrounds the assignments page.

What `scan.js` must do: never wait with `setTimeout` between students. Drive “row is open”, “content is ready”, and “page changed” from `MutationObserver` (observers still run in a background tab). One click per student. No 3-try retry loop and no collapse wait. Treat the next row as open when it is in the DOM and is not another student row, not when `getClientRects()` is non-zero. Do not keep `delay(350)` or a 600ms settle on the success path. A single deadline `setTimeout` may bound a failed wait. An empty module may still confirm for 5 seconds so a loading flash is not skipped; that timer is not between students. `progress()` writes the status line and the hero title on the open dashboard window. Do not rebuild the dashboard DOM on every student. Do not translate lessons while `slot.running` is true.

## If this breaks again

- **The scan is slow while the dashboard tab is in front, or status says “Retrying … (2/3)”.** A `setTimeout` or `setInterval` is back on the student walk (`delay(350)`, a 600ms settle, a 400ms poll, or a collapse wait). Background Chrome stretches each of those to about 1 second. Readiness belongs on `MutationObserver`. `expanded()` must not require `getClientRects()`. One click per student, no retry loop.
- **Bookmark click starts scanning immediately.** Something calls `scan()` at the bottom of `scan.js` again. Only the Scan assignments button may call `scan()`.
- **“Translating the dashboard…” stays up while the button says English.** `setLanguage` set the status before Google Translate returned, and the request never finished. English must return before any `fetch`. `withTimeout(..., 12000)` must still reject and restore the previous language and status.
- **Lesson titles translate during the walk and the scan slows down.** `lessonLabel` queued Google Translate while `slot.running` was true, or `publishLive` called `render()` on every student. Do not render the full dashboard inside the student loop.
- **By student and By group are empty after a scan that found people.** `rosterPeople` or `leaderBrief` uses `[].slice.call(map.values())`. Use `Array.from`.
- **Hero says the scan is incomplete and then quotes the unsubmitted count.** `out.complete = out.warnings.length === 0` is back, or the hero prefixes `partial` onto `noneWaitingText`. Incomplete belongs only in `scanStopped`. Unsubmitted work uses `noneWaitingText` alone.
- **“108 modules” (or any large module count).** The side label `sideCaught` was applied to roster rows. Those rows are student checks. There are 4 modules.
- **A published scan.js change does not show up.** The bookmark is fine. Wait for GitHub Pages, then click the same bookmark. Replace the bookmark only if the `javascript:` loader in `index.html` changed.
