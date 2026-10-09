/* Checked 2026-10-09 with: curl.exe -sI https://digitalbibleinstitute.com/
   The response had no Content-Security-Policy header, and the HTML has no CSP meta tag.
   script-src and connect-src therefore do not block a script loaded from GitHub Pages.
   This bookmarklet loads scan.js from the Pages origin on each click so a later publish
   updates the scan without a new bookmark. It does not embed leader accounts or passwords. */
javascript:(function(){var host=location.hostname;if(host!=='digitalbibleinstitute.com'){alert('Open digitalbibleinstitute.com first. Sign in as Group leader, open assignments, then click this bookmark.');return;}var s=document.createElement('script');s.src='https://nelurs.github.io/dbi-leader-dashboard/scan.js?t='+Date.now();document.documentElement.appendChild(s);})();
