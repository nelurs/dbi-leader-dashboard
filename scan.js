/* Full DBI leader scan for the assignments tab already signed in.
   Walks Prayer, Evangelism, Discipleship, and Revival. Does not click Send feedback
   and does not ask for or store a password. There is no background scan and no Chrome notification. */
(function () {
  'use strict';
  if (location.hostname !== 'digitalbibleinstitute.com') {
    window.alert('Open digitalbibleinstitute.com first. Sign in as Group leader, open assignments, then click this bookmark.');
    return;
  }
  var slot = window.__dbiLeaderPages || (window.__dbiLeaderPages = {});
  if (slot.running) {
    if (slot.panel) slot.panel.hidden = false;
    return;
  }
  slot.running = true;
  slot.cancelled = false;

  var STR = {
    subtitle: 'Make disciples of all the nations',
    lede: 'Menus are translated but assignment titles stay in the original language.',
    scan: 'Scan assignments',
    cancel: 'Cancel',
    clear: 'Clear results',
    kicker: 'Your next step',
    heroEmptyTitle: 'See who needs you',
    heroEmptyText: 'Run a scan to see who is waiting on your feedback, and who still needs to submit work.',
    caughtTitle: 'You are caught up',
    caughtText: 'Every inspected row is submitted and reviewed.',
    noneWaitingTitle: 'Nothing is waiting on your review',
    noneWaitingText: '%%n1%% still need to be submitted by students.',
    readyTitle: '%%s1%% is waiting for your feedback',
    firstTitle: 'Review %%s1%% first',
    manyText: '%%c1%% are waiting for your feedback, across %%p1%%. %%s1%% has %%r1%% for you to review%%g1%%.',
    groupIn: ' in %%g1%%',
    missingGroup: '%%g1%% has the most unsubmitted work (%%n1%%). That follow-up sits with the students.',
    missingNoGroup: '%%n1%% unsubmitted assignments have no group name. That follow-up sits with the students.',
    partial: 'This scan is incomplete, so read this as partial. ',
    sideMissing: 'assignments students have not submitted',
    sideCaught: 'modules with nothing left',
    caughtOf: '%%k1%% of %%t1%%',
    cardFeedback: 'Waiting on you',
    cardFeedbackNote: 'students already submitted these',
    cardMissing: 'Not submitted',
    cardMissingNote: 'students still need to turn these in',
    cardGroups: 'Groups with open work',
    cardCaught: 'Fully complete',
    cardCaughtNote: 'of %%n1%% student checks',
    cardCaughtEmpty: 'after a scan',
    moduleEmpty: 'Module balance appears after a scan.',
    moduleNote: '%%f1%% waiting on you · %%m1%% not submitted by students',
    noGroup: 'No group listed',
    reviewNow: 'Review now',
    openReview: 'Open review',
    opened: 'Opened',
    notSubmittedBtn: 'Not submitted',
    statusFeedback: 'Waiting on you',
    statusMissing: 'Not submitted by the student',
    statusReviewed: 'Reviewed',
    search: 'Search student, group, or assignment',
    allStatuses: 'All statuses',
    allModules: 'All modules',
    allGroups: 'All groups',
    export: 'Export CSV',
    exportStudent: 'Export this student',
    panelModules: 'Module balance',
    panelWork: 'Work list',
    panelGroup: 'By group',
    panelStudent: 'By student',
    panelNotes: 'Scan notes',
    thStudent: 'Student',
    thGroup: 'Group',
    thModule: 'Module',
    thAssignment: 'Assignment',
    thStatus: 'Status',
    thAction: 'Action',
    thRows: 'Student rows',
    thCaught: 'Caught up',
    thTotal: 'Total',
    warningsNone: 'None yet.',
    fine: 'Nothing is submitted for you.',
    exportData: 'Export saved data',
    importData: 'Import saved data',
    exportDone: 'Saved a copy of this browser\'s dashboard data.',
    importBad: 'That file is not a dashboard copy.',
    importDone: 'Restored the saved copy.',
    panelReminder: 'Scan reminder',
    reminderNote: 'A reminder to scan by hand. Add this calendar file yourself. It does not connect a Google account, and it does not scan in the background.',
    downloadIcs: 'Download calendar reminder',
    notifyTime: 'Time of day',
    notifyHour: 'Hour',
    notifyMinute: 'Minute',
    daySun: 'Sunday',
    dayMon: 'Monday',
    dayTue: 'Tuesday',
    dayWed: 'Wednesday',
    dayThu: 'Thursday',
    dayFri: 'Friday',
    daySat: 'Saturday',
    scanComplete: 'Scan complete.',
    scanIncomplete: 'Scan incomplete: do not treat an empty work list as all caught up.',
    scanningNotes: 'Scanning…',
    cleared: 'Results cleared.',
    coverage: '%%z1%% scan • %%u1%% student rows inspected • %%v1%% already reviewed • %%w1%% unknown items • %%h1%%%%a1%%',
    stateComplete: 'Complete',
    statePartial: 'Partial / incomplete',
    accountBit: ' • Account %%a1%%',
    assignOne: '%%n1%% assignment',
    assignMany: '%%n1%% assignments',
    submittedOne: '%%n1%% submitted assignment',
    submittedMany: '%%n1%% submitted assignments',
    peopleOne: '%%n1%% student',
    peopleMany: '%%n1%% students',
    modPrayer: 'Prayer',
    modEvangelism: 'Evangelism',
    modDiscipleship: 'Discipleship',
    modRevival: 'Revival',
    thStudents: 'Students',
    thBehind: 'Furthest behind',
    studentSearch: 'Search a student',
    studentPick: 'Type a student name to see their lessons.',
    studentNone: 'No student matches that name.',
    studentSubmitted: 'Submitted',
    studentLeft: 'Still to submit',
    studentWaiting: 'Waiting on you',
    studentDone: 'Lessons done',
    studentNotYet: 'Not yet submitted',
    studentNext: 'Next lesson',
    moduleCaught: 'Caught up in this module.',
    lessonNamesNote: 'Lesson names are shown in English and automatically translated.'
  };
  var RO = {
    subtitle: 'Faceți ucenici din toate neamurile',
    lede: 'Meniurile sunt traduse, dar titlurile temelor rămân în limba originală.',
    scan: 'Scanează temele',
    cancel: 'Anulează',
    clear: 'Șterge rezultatele',
    kicker: 'Următorul tău pas',
    heroEmptyTitle: 'Vezi cine așteaptă evaluarea ta',
    heroEmptyText: 'Rulează o scanare ca să vezi cine așteaptă feedbackul tău și cine nu a trimis încă.',
    caughtTitle: 'Ești la zi',
    caughtText: 'Toate rândurile verificate sunt trimise și evaluate.',
    noneWaitingTitle: 'Nimic nu așteaptă evaluarea ta',
    noneWaitingText: '%%n1%% încă nu au fost trimise de studenți.',
    readyTitle: '%%s1%% așteaptă evaluarea ta',
    firstTitle: 'Evaluează mai întâi: %%s1%%',
    manyText: '%%c1%% așteaptă feedbackul tău, la %%p1%%. %%s1%% are %%r1%% de evaluat%%g1%%.',
    groupIn: ' în %%g1%%',
    missingGroup: '%%g1%% are cele mai multe teme netrimise (%%n1%%). Studenții trebuie să le trimită.',
    missingNoGroup: '%%n1%% teme netrimise nu au grup. Studenții trebuie să le trimită.',
    partial: 'Scanarea este incompletă, deci privește rezultatul ca parțial. ',
    sideMissing: 'teme netrimise de studenți',
    sideCaught: 'module fără teme rămase',
    caughtOf: '%%k1%% din %%t1%%',
    cardFeedback: 'Așteaptă evaluarea ta',
    cardFeedbackNote: 'studenții au trimis deja',
    cardMissing: 'Netrimise',
    cardMissingNote: 'studenții trebuie să trimită',
    cardGroups: 'Grupuri cu teme trimise',
    cardCaught: 'Complete',
    cardCaughtNote: 'din %%n1%% verificări',
    cardCaughtEmpty: 'după o scanare',
    moduleEmpty: 'Balanța modulelor apare după scanare.',
    moduleNote: '%%f1%% așteaptă evaluarea ta · %%m1%% netrimise de studenți',
    noGroup: 'Fără grup',
    reviewNow: 'Evaluează acum',
    openReview: 'Deschide evaluarea',
    opened: 'Deschis',
    notSubmittedBtn: 'Netrimisă',
    statusFeedback: 'Așteaptă evaluarea ta',
    statusMissing: 'Netrimisă de student',
    statusReviewed: 'Deja evaluate',
    search: 'Caută student, grup sau temă',
    allStatuses: 'Toate stările',
    allModules: 'Toate modulele',
    allGroups: 'Toate grupurile',
    export: 'Exportă CSV',
    exportStudent: 'Exportă acest student',
    panelModules: 'Balanța modulelor',
    panelWork: 'Lista de lucru',
    panelGroup: 'Pe grup',
    panelStudent: 'Pe student',
    panelNotes: 'Note de scanare',
    thStudent: 'Student',
    thGroup: 'Grup',
    thModule: 'Modul',
    thAssignment: 'Temă',
    thStatus: 'Stare',
    thAction: 'Acțiune',
    thRows: 'Rânduri de studenți',
    thCaught: 'Complete',
    thTotal: 'Total',
    warningsNone: 'Nimic încă.',
    fine: 'Nu se trimite nimic în locul tău.',
    exportData: 'Exportă datele salvate',
    importData: 'Importă datele salvate',
    exportDone: 'S-a salvat o copie a datelor din acest browser.',
    importBad: 'Fișierul nu este o copie a tabloului.',
    importDone: 'Copia salvată a fost restaurată.',
    panelReminder: 'Memento de scanare',
    reminderNote: 'Un memento să scanezi manual. Adaugă singur fișierul de calendar. Nu se conectează un cont Google și nu scanează în fundal.',
    downloadIcs: 'Descarcă memento de calendar',
    notifyTime: 'Ora din zi',
    notifyHour: 'Oră',
    notifyMinute: 'Minut',
    daySun: 'Duminică',
    dayMon: 'Luni',
    dayTue: 'Marți',
    dayWed: 'Miercuri',
    dayThu: 'Joi',
    dayFri: 'Vineri',
    daySat: 'Sâmbătă',
    scanComplete: 'Scanare completă.',
    scanIncomplete: 'Scanare incompletă: o listă goală nu înseamnă că ești la zi.',
    scanningNotes: 'Se scanează…',
    cleared: 'Rezultate șterse.',
    coverage: 'Scanare %%z1%% • %%u1%% rânduri de studenți verificate • %%v1%% deja evaluate • %%w1%% necunoscute • %%h1%%%%a1%%',
    stateComplete: 'completă',
    statePartial: 'parțială / incompletă',
    accountBit: ' • Cont %%a1%%',
    assignOne: '%%n1%% temă',
    assignMany: '%%n1%% teme',
    submittedOne: '%%n1%% temă trimisă',
    submittedMany: '%%n1%% teme trimise',
    peopleOne: '%%n1%% student',
    peopleMany: '%%n1%% studenți',
    modPrayer: 'Rugăciune',
    modEvangelism: 'Evanghelizare',
    modDiscipleship: 'Ucenicie',
    modRevival: 'Trezire Spirituală',
    thStudents: 'Studenți',
    thBehind: 'Cel mai rămas în urmă',
    studentSearch: 'Caută un student',
    studentPick: 'Scrie numele unui student ca să vezi temele.',
    studentNone: 'Niciun student nu se potrivește.',
    studentSubmitted: 'Trimise',
    studentLeft: 'De trimis',
    studentWaiting: 'Așteaptă evaluarea ta',
    studentDone: 'Teme făcute',
    studentNotYet: 'Încă netrimise',
    studentNext: 'Următoarea temă',
    moduleCaught: 'E la zi la acest modul.',
    lessonNamesNote: 'Numele temelor sunt afișate în engleză și traduse automat.'
  };

  var modules = ['Prayer', 'Evangelism', 'Discipleship', 'Revival'];
  var catalog = {
    Prayer: ["Praying With Others", "Listening Prayer", "Praying the Scripture", "Prayer and Spiritual Warfare", "Prayer and God's Leadership", "Supplication", "Kingdom Praying", "Forgiveness", "Worship", "The Meeting Place", "The Death of Jesus and Its Role in Prayer", "Prayer - the communication part of our relationship with God", "Prayer flows from a personal relationship with God", "Prayer - Module Assignment"],
    Evangelism: ["Relationships that Help New Believers", "Revival & Evangelism", "Good News (part 2)", "The Good News", "Who is Jesus?", "Engaging People with the Gospel", "How to Share Your Testimony", "The Holy Spirit Prepares", "The Empowering of the Holy Spirit in Evangelism", "Partners in Evangelism", "Sending Laborers into the Harvest", "Intercessory Prayer and Evangelism", "A Commitment to Share the Gospel", "Evangelism - Module Assignment"],
    Discipleship: ["Multiplying Disciples", "Making Disciples", "The Church of Disciples", "Multiplying Evangelism through Discipleship", "Discerning False Prophets", "Walking in the Spirit", "Confession of Sin", "Applying the Word of God", "Studying the Word of God", "Holiness: How to Become Like Jesus", "Humility", "Being a Lifelong Learner of Jesus", "Discipleship Evangelism", "Discipleship - Module Assignment"],
    Revival: ["The Kingdom, Power, and Glory of God", "Joy in Revival", "Testimonies of Persecution and Revival", "United Prayer", "Extraordinary Prayer", "Personal Revival", "How Revival Transforms Churches", "Revival in 1970", "Prayer and Revival, Part 2", "Prayer and Revival, Part 1", "What Happens When God Sends Revival?; Part 2", "What Happens When God Sends Revival?; Part 1", "What is Revival?", "Revival - Module Assignment"]
  };
  var lessonAliases = {
    Prayer: [
      ['Praying With Others', ['Rugându-te cu ceilalți']],
      ['Listening Prayer', ['Ascultând în rugăciune']],
      ['Praying the Scripture', ['Rugându-te Scriptura']],
      ['Prayer and Spiritual Warfare', ['Războiul spiritual']],
      ['Prayer and God\'s Leadership', ['Rugăciunea și călăuzirea lui Dumnezeu']],
      ['Supplication', ['Cerere']],
      ['Kingdom Praying', ['Vie Împărăția Ta']],
      ['Forgiveness', ['Iertare și rugăciune']],
      ['Worship', ['Lauda și închinarea']],
      ['The Meeting Place', ['Un loc de întâlnire']],
      ['The Death of Jesus and Its Role in Prayer', ['Moartea lui Hristos și rugăciunea']],
      ['Prayer - the communication part of our relationship with God', ['Ce este rugăciunea?']],
      ['Prayer flows from a personal relationship with God', ['Introducere la Modulul 1 - Rugăciune']],
      ['Prayer - Module Assignment', ['Temă pentru Modulul RUGĂCIUNE']]
    ],
    Evangelism: [
      ['Intercessory Prayer and Evangelism', ['Rugăciunea de mijlocire și evanghelizarea']],
      ['A Commitment to Share the Gospel', ['Un angajament de a împărtăși Evanghelia']]
    ],
    Discipleship: [
      ['Studying the Word of God', ['Studierea Cuvântului lui Dumnezeu']],
      ['Holiness: How to Become Like Jesus', ['Sfințenie: Cum să devenim ca Isus']],
      ['Humility', ['Smerenie']],
      ['Being a Lifelong Learner of Jesus', ['A-L cunoaște pe Cristos pe parcursul întregii vieți']],
      ['Discipleship Evangelism', ['Evanghelizarea cu scopul ucenicizări']]
    ],
    Revival: [
      ['What Happens When God Sends Revival?; Part 1', ['Ce se întâmplă atunci când Dumnezeu trimite o trezire spirituală? - Partea 1']],
      ['What Happens When God Sends Revival?; Part 2', ['Ce se întâmplă atunci când Dumnezeu trimite o trezire spirituală? - Partea a 2-a']],
      ['What is Revival?', ['Ce este trezirea spirituală?']]
    ]
  };

  var lang = 'en';
  var pack = STR;
  var items = [];
  var latest = null;
  var busy = false;
  var openedKeys = new Set();
  var groupFocus = '';
  var result = null;

  var text = function (el) { return (el && (el.innerText || '') || '').trim(); };
  var norm = function (s) { return (s || '').trim().toLowerCase().replace(/[’‘ʼ]/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' '); };
  function fold(s) { return norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function t(key) { var value = pack[key]; return value == null || value === '' ? STR[key] : value; }
  var TOKEN = { student: 's1', group: 'g1', n: 'n1', count: 'c1', people: 'p1', ready: 'r1', caught: 'k1', total: 't1', feedback: 'f1', missing: 'm1', state: 'z1', students: 'u1', reviewed: 'v1', unknown: 'w1', when: 'h1', account: 'a1' };
  function fill(key, vars) {
    var token = function (name) { return '%%' + (TOKEN[name] || name) + '%%'; };
    var s = t(key);
    if (Object.keys(vars).some(function (k) { return s.indexOf(token(k)) === -1; })) s = STR[key];
    Object.keys(vars).forEach(function (k) { s = s.split(token(k)).join(String(vars[k] == null ? '' : vars[k])); });
    return s;
  }
  function countPhrase(n, oneKey, manyKey) { return fill(n === 1 ? oneKey : manyKey, { n: n }); }
  function rowCells(row) { return row ? [].filter.call(row.children, function (el) { return el.tagName === 'TD'; }) : []; }
  function rowButton(row) {
    if (!row) return null;
    var cells = rowCells(row);
    if (cells.length < 2 || !cells[0] || !cells[0].querySelector('span.font-weight-bold')) return null;
    var candidates = [];
    cells.forEach(function (td) {
      [].forEach.call(td.querySelectorAll('button'), function (button) {
        if (!button.closest('div.lesson-item__wrapper')) candidates.push(button);
      });
    });
    var byText = null;
    candidates.forEach(function (button) { if (!byText && text(button).indexOf('Feedback Assignments') !== -1) byText = button; });
    if (byText) return byText;
    return candidates.length ? candidates[candidates.length - 1] : null;
  }
  var rows = function () { return [].filter.call(document.querySelectorAll('table.table > tbody > tr'), rowButton); };
  var tabs = function () { return [].slice.call(document.querySelectorAll('ul.assignments__module-navigator li')); };
  function moduleName(tab) {
    var list = tabs();
    var label = text(tab);
    var byText = modules.filter(function (name) { return norm(label) === norm(name); })[0];
    if (byText) return byText;
    var index = list.indexOf(tab);
    return modules[index] || label;
  }
  function activeModule() {
    var tab = tabs().filter(function (item) { return item.classList.contains('active'); })[0];
    return tab ? moduleName(tab) : '';
  }
  function tabFor(module) {
    var list = tabs();
    return list.filter(function (item) { return norm(text(item)) === norm(module); })[0] || list[modules.indexOf(module)] || null;
  }
  function searchInput() {
    var table = document.querySelector('table.table');
    if (!table) return null;
    return table.querySelector('input[placeholder="Search name..."]') || table.querySelector('input[type="search"]') || [].filter.call(table.querySelectorAll('input'), function (el) { return el.type !== 'checkbox' && el.type !== 'radio' && el.type !== 'hidden'; })[0] || null;
  }
  function info(row) {
    var cells = rowCells(row);
    return { student: text(cells[0] && cells[0].querySelector('span.font-weight-bold')), group: text(cells[1] && cells[1].querySelector('span.font-weight-bold')) };
  }
  var key = function (s) { return JSON.stringify([s.student, s.group]); };
  function find(s) {
    var matches = rows().filter(function (row) { return key(info(row)) === key(s); });
    if (matches.length !== 1) throw Error('Student missing or ambiguous: ' + s.student);
    return matches[0];
  }
  function check() {
    if (slot.cancelled) throw Error('Scan cancelled.');
    if (/\/login|\/signin/.test(location.pathname)) throw Error('DBI session expired; sign in again.');
  }
  function account() {
    var nodes = [].slice.call(document.querySelectorAll('header a, header span, nav a, nav span, .navbar a, .navbar span'));
    for (var i = 0; i < nodes.length; i++) {
      var value = text(nodes[i]);
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return value;
    }
    return '';
  }
  function lessonKey(title) {
    var name = norm(title);
    return name.indexOf('module assignment') !== -1 || name.indexOf('review module assignment') !== -1 ? 'module assignment' : name;
  }
  function isModuleSlot(title) {
    var name = fold(title);
    return name.indexOf('module assignment') !== -1 || name.indexOf('review module assignment') !== -1 || name.indexOf('tema pentru modulul') !== -1;
  }
  function titlesClose(pageTitle, catalogTitle) {
    if (isModuleSlot(pageTitle) && isModuleSlot(catalogTitle)) return true;
    var page = lessonKey(pageTitle);
    var lesson = lessonKey(catalogTitle);
    if (page === 'module assignment' && lesson === 'module assignment') return true;
    if (page === lesson) return true;
    if (lesson.length >= 6 && page.indexOf(lesson) !== -1) return true;
    if (page.length >= 12 && lesson.indexOf(page) !== -1 && page.length >= lesson.length * 0.85) return true;
    return false;
  }
  function catalogLesson(module, pageTitle) {
    var list = catalog[module] || [];
    if (isModuleSlot(pageTitle)) return list.filter(isModuleSlot)[0] || null;
    var direct = list.filter(function (title) { return titlesClose(pageTitle, title); })[0];
    if (direct) return direct;
    var page = fold(pageTitle);
    var aliasRows = lessonAliases[module] || [];
    for (var i = 0; i < aliasRows.length; i++) {
      if (fold(aliasRows[i][0]) === page || aliasRows[i][1].some(function (local) { return fold(local) === page; })) return aliasRows[i][0];
    }
    return null;
  }
  function missingTitles(module, assignments) {
    var known = assignments.filter(function (item) { return !item.unknown; });
    var covered = {};
    known.forEach(function (item) {
      var title = catalogLesson(module, item.title);
      if (title) covered[title] = true;
    });
    return (catalog[module] || []).filter(function (title) { return !covered[title]; });
  }
  function progress(message) {
    var counts = result ? ' • ' + result.items.length + ' found so far • ' + result.students + ' rows checked' : '';
    var node = document.getElementById('dlp-progress');
    if (node) node.textContent = message + counts;
  }
  function waitFor(fn, timeout) {
    timeout = timeout || 15000;
    return new Promise(function (resolve, reject) {
      var done = false;
      var started = Date.now();
      var observer;
      var backup;
      function finish(error, value) {
        if (done) return;
        done = true;
        if (observer) observer.disconnect();
        clearInterval(backup);
        error ? reject(error) : resolve(value);
      }
      function inspect() {
        try {
          check();
          if (Date.now() - started >= timeout) { finish(Error('Timed out waiting for DBI content.')); return; }
          var value = fn();
          if (value) finish(null, value);
        } catch (error) { finish(error); }
      }
      observer = new MutationObserver(inspect);
      observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
      backup = setInterval(inspect, 400);
      inspect();
    });
  }
  function delay(ms) {
    var start = Date.now();
    return waitFor(function () { return Date.now() - start >= ms; }, ms + 8000);
  }
  function loading(root) { return !!(root && root.querySelector('[aria-busy="true"],.spinner-border,.spinner-grow,[role="progressbar"]')); }
  function next() {
    var byLabel = [].filter.call(document.querySelectorAll('ul.react-paginate a'), function (a) {
      return a.getAttribute('aria-label') === 'Next page' && a.getAttribute('aria-disabled') !== 'true' && !(a.closest('li') && a.closest('li').classList.contains('disabled'));
    })[0];
    if (byLabel) return byLabel;
    var structural = document.querySelector('ul.react-paginate li.next-item:not(.disabled) a, ul.react-paginate li.next:not(.disabled) a');
    return structural && structural.getAttribute('aria-disabled') !== 'true' ? structural : null;
  }
  function page() { return Number(text(document.querySelector('ul.react-paginate li.active a'))) || 1; }
  function signature() { return activeModule() + '#' + page() + '#' + rows().map(function (row) { return key(info(row)); }).join('|'); }
  function emptyModule() {
    var table = document.querySelector('table.table');
    var body = table ? [].filter.call(table.children, function (el) { return el.tagName === 'TBODY'; })[0] : null;
    var search = searchInput();
    var pagination = document.querySelector('ul.react-paginate');
    var nextLi = pagination && pagination.querySelector('li.next-item, li.next');
    var prevLi = pagination && pagination.querySelector('li.prev-item, li.previous, li.prev');
    var searchClear = !search || search.value.trim() === '';
    return !!(body && body.children.length === 0 && searchClear && page() === 1 && nextLi && nextLi.classList.contains('disabled') && prevLi && prevLi.classList.contains('disabled') && !loading(document));
  }
  function stableTable(expected) {
    var last = null;
    var since = Date.now();
    return waitFor(function () {
      if (activeModule() !== expected) { last = null; since = Date.now(); return false; }
      var table = document.querySelector('table.table');
      if (!table || loading(document)) { last = null; since = Date.now(); return false; }
      var fingerprint = signature();
      if (fingerprint !== last) { last = fingerprint; since = Date.now(); }
      var elapsed = Date.now() - since;
      if (rows().length && elapsed >= 600) return 'rows';
      if (emptyModule() && elapsed >= 5000) return 'empty';
      return false;
    }, 25000);
  }
  function firstControl() {
    var byLabel = [].filter.call(document.querySelectorAll('ul.react-paginate a[aria-label]'), function (a) { return /^Page 1(?:\s|$)/.test(a.getAttribute('aria-label') || ''); })[0];
    if (byLabel) return byLabel;
    return [].filter.call(document.querySelectorAll('ul.react-paginate li a'), function (a) { return text(a) === '1'; })[0] || null;
  }
  function move(getControl, changed, label, module) {
    var attempt = 1;
    function once() {
      return Promise.resolve().then(function () {
        check();
        progress(label + (attempt > 1 ? ' — retry ' + attempt : ''));
        var control = getControl();
        if (!control) throw Error(label + ': control unavailable.');
        control.scrollIntoView({ block: 'center' });
        control.click();
        return waitFor(changed, 10000).then(function () { return stableTable(module); });
      }).catch(function (error) {
        if (slot.cancelled || attempt === 2) throw error;
        attempt += 1;
        return once();
      });
    }
    return once();
  }
  function firstPage(module) {
    if (page() === 1) return stableTable(module);
    if (!firstControl()) throw Error('Page 1 control unavailable.');
    return move(firstControl, function () { return page() === 1; }, 'Returning to page 1', module);
  }
  function selectModule(module) {
    var get = function () { return tabFor(module); };
    if (!get()) throw Error('Module unavailable: ' + module);
    var ready = activeModule() !== module
      ? move(get, function () { return activeModule() === module; }, 'Loading ' + module, module)
      : (progress('Checking ' + module), stableTable(module));
    return Promise.resolve(ready).then(function () { return firstPage(module); });
  }
  function expanded(s) {
    var row = find(s);
    var nextRow = row.nextElementSibling;
    return nextRow && !rowButton(nextRow) && nextRow.getClientRects().length ? nextRow : null;
  }
  function explicitEmpty(el) {
    var body = text(el);
    if (/\b(no assignments|no submissions|no submitted assignments|no assignments submitted|no data available)\b/i.test(body)) return true;
    if (loading(el) || el.querySelector('div.lesson-item__wrapper, table, button')) return false;
    return body.length > 2;
  }
  function readyStudent(s) {
    var el = expanded(s);
    if (!el || loading(el)) return null;
    return el.querySelector('div.lesson-item__wrapper p.assignmentDescription') || explicitEmpty(el) ? el : null;
  }
  function expand(s) {
    var attempt = 1;
    function once() {
      return Promise.resolve().then(function () {
        check();
        var ready = readyStudent(s);
        if (ready) return ready;
        if (!expanded(s)) {
          var button = rowButton(find(s));
          button.scrollIntoView({ block: 'center' });
          button.click();
        }
        return waitFor(function () { return readyStudent(s); }, 7000).then(function () { return delay(350); }).then(function () {
          var el = readyStudent(s);
          if (el) return el;
          throw Error('Student content disappeared.');
        });
      }).catch(function (error) {
        if (slot.cancelled || attempt === 3) throw error;
        progress('Retrying ' + s.student + ' (' + (attempt + 1) + '/3)');
        attempt += 1;
        if (expanded(s)) rowButton(find(s)).click();
        return waitFor(function () { return !expanded(s); }, 2500).catch(function () {}).then(function () { return delay(250); }).then(once);
      });
    }
    return once();
  }
  function collapse(s) {
    try {
      if (expanded(s)) {
        var button = rowButton(find(s));
        if (button) button.click();
        return waitFor(function () { return !expanded(s); }, 2500);
      }
    } catch (error) { check(); }
    return Promise.resolve();
  }
  function parse(el) {
    return [].map.call(el.querySelectorAll('div.lesson-item__wrapper'), function (wrapper) {
      var description = wrapper.querySelector('p.assignmentDescription');
      var icons = description ? [].slice.call(description.querySelectorAll('svg')) : [];
      return {
        wrapper: wrapper,
        title: text(description),
        unknown: !text(description) || !icons.length,
        reviewed: icons.some(function (svg) { return (svg.getAttribute('stroke') || '').toLowerCase() === '#40dd7f'; })
      };
    });
  }
  function advance(module) {
    if (!next()) return Promise.resolve(false);
    var before = signature();
    var previousPage = page();
    return move(next, function () { return page() > previousPage || signature() !== before; }, 'Loading next student page', module).then(function () { return true; });
  }
  function readStudent(module, s, logicalPage, out, dedup) {
    return expand(s).then(function (el) {
      var assignments = parse(el);
      if (!assignments.length && !explicitEmpty(el)) throw Error('No recognized assignments or empty-submission message.');
      out.students++;
      var moduleReviewed = assignments.some(function (item) { return item.reviewed && isModuleSlot(item.title); });
      var slots = new Map();
      assignments.forEach(function (item, index) {
        if (item.unknown) {
          out.unknown++;
          out.warnings.push(module + ' / ' + s.student + ': unknown assignment status.');
          return;
        }
        var english = catalogLesson(module, item.title);
        var slotKey = english || ('raw:' + norm(item.title));
        var prev = slots.get(slotKey);
        if (!prev) slots.set(slotKey, { en: english || item.title, local: item.title, reviewed: !!item.reviewed, raw: item, order: index });
        else if (item.reviewed) prev.reviewed = true;
      });
      var feedbackN = 0;
      var reviewedN = 0;
      var submittedLessons = [];
      var feedbackTitles = [];
      slots.forEach(function (slotInfo) {
        submittedLessons.push({ en: slotInfo.en, local: fold(slotInfo.local) === fold(slotInfo.en) ? '' : slotInfo.local, order: slotInfo.order, reviewed: !!slotInfo.reviewed });
        if (slotInfo.reviewed) { out.reviewed++; reviewedN++; return; }
        if (moduleReviewed && isModuleSlot(slotInfo.raw.title)) return;
        var titleKey = lessonKey(slotInfo.en);
        var itemKey = JSON.stringify([module, s.student, s.group, titleKey, 'Needs feedback']);
        if (dedup.has(itemKey)) return;
        dedup.add(itemKey);
        feedbackN++;
        feedbackTitles.push(slotInfo.raw.title);
        out.items.push({ student: s.student, group: s.group, module: module, title: slotInfo.raw.title, page: logicalPage, status: 'Needs feedback' });
      });
      var missingList = missingTitles(module, assignments);
      missingList.forEach(function (lesson) {
        var itemKey = JSON.stringify([module, s.student, s.group, lessonKey(lesson), 'Missing - not submitted']);
        if (dedup.has(itemKey)) return;
        dedup.add(itemKey);
        out.missing++;
        out.items.push({ student: s.student, group: s.group, module: module, title: lesson, page: logicalPage, status: 'Missing - not submitted' });
      });
      out.roster.push({
        student: s.student, group: s.group, module: module, page: logicalPage,
        feedback: feedbackN, missing: missingList.length, reviewed: reviewedN,
        submitted: submittedLessons.map(function (row) { return row.en; }),
        submittedLessons: submittedLessons,
        missingTitles: missingList.slice(),
        feedbackTitles: feedbackTitles
      });
    });
  }
  function scanModule(module, out, dedup) {
    return selectModule(module).then(function (state) {
      if (state === 'empty') {
        out.emptyModules.push(module);
        progress(module + ': empty table confirmed; continuing');
        return;
      }
      var visited = new Set();
      var logicalPage = page();
      function pageLoop() {
        check();
        if (activeModule() !== module) throw Error('Module changed during scan.');
        var sig = signature();
        if (visited.has(sig)) throw Error('Repeated page detected.');
        visited.add(sig);
        var students = rows().map(info);
        if (!students.length) throw Error('Student rows disappeared during scanning.');
        var counts = new Map();
        students.forEach(function (s) { counts.set(key(s), (counts.get(key(s)) || 0) + 1); });
        var index = 0;
        function studentLoop() {
          if (index >= students.length) {
            return advance(module).then(function (moved) {
              if (!moved) return;
              logicalPage = page();
              if (visited.size >= 1000) throw Error('Page safety limit reached.');
              return pageLoop();
            });
          }
          check();
          var s = students[index];
          var at = index;
          progress(module + ' • page ' + logicalPage + ' • ' + (at + 1) + '/' + students.length + ': ' + s.student);
          var job = Promise.resolve();
          if (counts.get(key(s)) !== 1) out.warnings.push(module + ': ambiguous student ' + s.student + '; skipped.');
          else {
            job = readStudent(module, s, logicalPage, out, dedup).catch(function (error) {
              check();
              out.warnings.push(module + ' / ' + s.student + ': ' + error.message);
            }).then(function () { return collapse(s); });
          }
          return job.then(function () {
            progress(module + ' • page ' + logicalPage + ' • checked ' + (at + 1) + '/' + students.length);
            index += 1;
            return studentLoop();
          });
        }
        return studentLoop();
      }
      return pageLoop();
    }).catch(function (error) {
      check();
      out.warnings.push(module + ': ' + error.message);
    });
  }
  function scan() {
    busy = true;
    slot.cancelled = false;
    result = { items: [], warnings: [], students: 0, reviewed: 0, unknown: 0, missing: 0, complete: false, emptyModules: [], account: '', roster: [] };
    var out = result;
    var dedup = new Set();
    var opened = document.querySelector('ul.assignments__module-navigator')
      ? Promise.resolve()
      : Promise.resolve().then(function () {
          var link = [].filter.call(document.querySelectorAll('a[href]'), function (a) {
            var href = a.getAttribute('href') || '';
            return href === '/assignments' || /\/assignments\/?$/.test(href);
          })[0];
          if (!link) throw Error('Open the assignments page, then click the bookmark again.');
          link.click();
        });
    return opened.then(function () {
      return waitFor(function () { return tabs().length && document.querySelector('table.table tbody'); }, 25000);
    }).then(function () {
      out.account = account();
      var search = searchInput();
      if (search && search.value.trim()) throw Error('Clear the student search in the scan tab before scanning.');
      var chain = Promise.resolve();
      modules.forEach(function (module) { chain = chain.then(function () { check(); return scanModule(module, out, dedup); }); });
      return chain;
    }).then(function () {
      out.complete = out.warnings.length === 0;
    }).catch(function (error) {
      out.warnings.push(error.message);
    }).then(function () {
      busy = false;
      slot.running = false;
      result = null;
      items = out.items;
      latest = out;
      saveLocal();
      render();
      var progressNode = document.getElementById('dlp-progress');
      if (progressNode) progressNode.textContent = out.complete ? t('scanComplete') : t('scanIncomplete');
    });
  }

  function canonicalModule(name) {
    var raw = String(name == null ? '' : name).trim();
    var keys = { Prayer: 1, Evangelism: 1, Discipleship: 1, Revival: 1 };
    if (keys[raw]) return raw;
    var folded = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    var aliases = { prayer: 'Prayer', rugaciune: 'Prayer', evangelism: 'Evangelism', evanghelizare: 'Evangelism', discipleship: 'Discipleship', ucenicie: 'Discipleship', revival: 'Revival', trezi: 'Revival', 'trezire spirituala': 'Revival' };
    return aliases[folded] || raw;
  }
  function moduleLabel(name) {
    var keyName = canonicalModule(name);
    var map = { Prayer: 'modPrayer', Evangelism: 'modEvangelism', Discipleship: 'modDiscipleship', Revival: 'modRevival' };
    return map[keyName] ? t(map[keyName]) : name;
  }
  function englishFor(module, title) {
    var raw = String(title || '');
    var folded = fold(raw);
    var aliasRows = lessonAliases[canonicalModule(module)] || [];
    for (var i = 0; i < aliasRows.length; i++) {
      if (fold(aliasRows[i][0]) === folded || aliasRows[i][1].some(function (local) { return fold(local) === folded; })) return aliasRows[i][0];
    }
    return raw;
  }
  function isCatalogName(module, title) {
    var folded = fold(title);
    return (catalog[canonicalModule(module)] || []).some(function (name) { return fold(name) === folded; });
  }
  function lessonEnglish(module, title, seen) {
    var candidates = [title, seen].filter(Boolean);
    for (var i = 0; i < candidates.length; i++) {
      var english = englishFor(module, candidates[i]);
      if (isCatalogName(module, english)) return english;
    }
    return englishFor(module, title) || String(title || '');
  }
  function lessonLabel(module, title, seen) { return lessonEnglish(module, title, seen); }
  function curriculumOrder(module) {
    var lessons = [];
    var slots = [];
    (catalog[canonicalModule(module)] || []).forEach(function (name) {
      if (fold(name).indexOf('module assignment') !== -1) slots.push(name);
      else lessons.push(name);
    });
    lessons.reverse();
    return lessons.concat(slots);
  }
  function moduleLessons(mod) {
    var module = canonicalModule(mod.module);
    var curriculum = curriculumOrder(module);
    var covered = {};
    var unmatched = [];
    var source = (mod.submittedLessons && mod.submittedLessons.length) ? mod.submittedLessons : (mod.submitted || []).map(function (name) { return { en: name, local: '' }; });
    source.forEach(function (row) {
      var english = lessonEnglish(module, row.en || '', row.local || '');
      var id = fold(english);
      if (!english || covered[id]) return;
      covered[id] = true;
      if (!isCatalogName(module, english)) unmatched.push(english);
    });
    (mod.feedbackTitles || []).forEach(function (name) {
      var english = lessonEnglish(module, name);
      var id = fold(english);
      if (!english || covered[id]) return;
      covered[id] = true;
      if (!isCatalogName(module, english)) unmatched.push(english);
    });
    return {
      done: curriculum.filter(function (name) { return covered[fold(name)]; }).concat(unmatched),
      missing: curriculum.filter(function (name) { return !covered[fold(name)]; })
    };
  }
  function coveredLessons() {
    var set = new Set();
    ((latest && latest.roster) || []).forEach(function (row) {
      moduleLessons(row).done.forEach(function (name) {
        if (!isCatalogName(row.module, name)) return;
        set.add(row.student + '|' + row.group + '|' + canonicalModule(row.module) + '|' + fold(name));
      });
    });
    return set;
  }
  function shownItems() {
    var covered = coveredLessons();
    return items.filter(function (x) {
      if (x.status === 'Needs feedback') return true;
      var english = lessonEnglish(x.module, x.title);
      return !covered.has(x.student + '|' + x.group + '|' + canonicalModule(x.module) + '|' + fold(english));
    });
  }
  function statusLabel(status) {
    if (status === 'Needs feedback') return t('statusFeedback');
    if (status === 'Missing - not submitted') return t('statusMissing');
    if (status === 'Reviewed') return t('statusReviewed');
    return status;
  }
  function itemKey(x) { return JSON.stringify([x.student, x.group, x.module, x.title, x.page, x.status]); }
  function namedGroup(group) {
    var value = String(group || '').trim();
    if (!value || /^[-—–.]+$/.test(value)) return '';
    return value;
  }
  function groupLabel(group) { return namedGroup(group) || t('noGroup'); }
  function studyIndex(module, title) {
    var english = lessonEnglish(module, title);
    var order = curriculumOrder(module);
    var at = -1;
    order.forEach(function (name, index) { if (at < 0 && fold(name) === fold(english)) at = index; });
    return at < 0 ? order.length : at;
  }
  function sortWork(list) {
    var groups = new Map();
    list.forEach(function (x) {
      var id = x.student + '|' + x.group + '|' + canonicalModule(x.module);
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(x);
    });
    var out = [];
    groups.forEach(function (rowsInGroup) {
      rowsInGroup.sort(function (a, b) { return studyIndex(a.module, a.title) - studyIndex(b.module, b.title); });
      out.push.apply(out, rowsInGroup);
    });
    return out;
  }
  function reviewedRows() {
    var waiting = new Set();
    items.forEach(function (x) {
      if (x.status !== 'Needs feedback') return;
      waiting.add(x.student + '|' + x.group + '|' + canonicalModule(x.module) + '|' + fold(lessonEnglish(x.module, x.title)));
    });
    var out = [];
    ((latest && latest.roster) || []).forEach(function (row) {
      var source = (row.submittedLessons && row.submittedLessons.length) ? row.submittedLessons : (row.submitted || []).map(function (name) { return { en: name, local: '' }; });
      var feedback = new Set((row.feedbackTitles || []).map(function (title) { return fold(lessonEnglish(row.module, title)); }));
      var seen = new Set();
      source.forEach(function (lesson) {
        var english = lessonEnglish(row.module, lesson.en || '', lesson.local || '');
        if (!english) return;
        var id = row.student + '|' + row.group + '|' + canonicalModule(row.module) + '|' + fold(english);
        if (seen.has(id) || waiting.has(id) || feedback.has(fold(english))) return;
        seen.add(id);
        out.push({ student: row.student, group: row.group, module: row.module, title: english, page: row.page || 0, status: 'Reviewed' });
      });
    });
    return out;
  }
  function filtered() {
    var q = (document.getElementById('dlp-search').value || '').toLowerCase();
    var status = document.getElementById('dlp-status').value;
    var moduleValue = document.getElementById('dlp-module').value;
    var groupValue = document.getElementById('dlp-group').value;
    var source = status === 'Reviewed' ? reviewedRows() : (status ? shownItems() : shownItems().concat(reviewedRows()));
    return sortWork(source.filter(function (x) {
      return (!status || x.status === status) &&
        (!moduleValue || canonicalModule(x.module) === moduleValue) &&
        (!groupValue || x.group === groupValue) &&
        (x.student + ' ' + x.title + ' ' + lessonLabel(x.module, x.title) + ' ' + x.group + ' ' + x.module + ' ' + moduleLabel(x.module)).toLowerCase().indexOf(q) !== -1;
    }));
  }
  function rosterPeople() {
    var map = new Map();
    ((latest && latest.roster) || []).forEach(function (row) {
      var id = row.student + '|' + row.group;
      if (!map.has(id)) map.set(id, { student: row.student, group: row.group, feedback: 0, missing: 0, reviewed: 0, modules: [] });
      var person = map.get(id);
      person.feedback += row.feedback || 0;
      person.missing += moduleLessons(row).missing.length;
      person.reviewed += row.reviewed || 0;
      person.modules.push(row);
    });
    if (map.size) return [].slice.call(map.values());
    var fallback = new Map();
    items.forEach(function (x) {
      var id = x.student + '|' + x.group;
      if (!fallback.has(id)) fallback.set(id, { student: x.student, group: x.group, feedback: 0, missing: 0, reviewed: 0, modules: [] });
      if (x.status === 'Needs feedback') fallback.get(id).feedback++;
      else fallback.get(id).missing++;
    });
    return [].slice.call(fallback.values());
  }
  function chosenStudents(people, qStudent) {
    if (!qStudent) return [];
    var matches = people.filter(function (s) { return (!groupFocus || s.group === groupFocus) && s.student.toLowerCase().indexOf(qStudent) !== -1; });
    if (!matches.length) return [];
    var exact = matches.filter(function (s) { return s.student.toLowerCase() === qStudent; });
    if (exact.length) return exact;
    return matches.length === 1 ? matches : [];
  }
  function lessonWorkRow(person, mod, name, status) {
    var id = fold(lessonEnglish(mod.module, name));
    var hit = null;
    items.forEach(function (x) {
      if (hit) return;
      if (x.student === person.student && x.group === person.group && canonicalModule(x.module) === canonicalModule(mod.module) && x.status === status && fold(lessonEnglish(x.module, x.title)) === id) hit = x;
    });
    if (hit) return hit;
    return { student: person.student, group: person.group, module: mod.module, title: name, page: mod.page || 0, status: status };
  }
  function studentViewRows(person) {
    var out = [];
    var mods = person.modules.slice().sort(function (a, b) { return modules.indexOf(canonicalModule(a.module)) - modules.indexOf(canonicalModule(b.module)); });
    mods.forEach(function (mod) {
      var lessons = moduleLessons(mod);
      if (!lessons.missing.length && !(mod.feedback || 0)) return;
      var feedback = new Set((mod.feedbackTitles || []).map(function (title) { return fold(lessonEnglish(mod.module, title)); }));
      lessons.done.forEach(function (name) {
        var status = feedback.has(fold(lessonEnglish(mod.module, name))) ? 'Needs feedback' : 'Reviewed';
        out.push(lessonWorkRow(person, mod, name, status));
      });
      lessons.missing.forEach(function (name) { out.push(lessonWorkRow(person, mod, name, 'Missing - not submitted')); });
    });
    return out;
  }
  function downloadCsv(rowsToSave, filename) {
    var quote = function (value) { return '"' + String(value).replace(/"/g, '""') + '"'; };
    var safe = function (value) { return /^[=+@\-\t\r]/.test(String(value)) ? "'" + value : value; };
    var lines = [[t('thStudent'), t('thGroup'), t('thModule'), t('thAssignment'), t('thStatus'), 'Page']].concat(rowsToSave.map(function (x) {
      return [x.student, x.group, x.module, lessonLabel(x.module, x.title), x.status, x.page];
    }));
    var blob = new Blob(['\ufeff' + lines.map(function (line) { return line.map(function (value) { return quote(safe(value)); }).join(','); }).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function openReview(item) {
    if (slot.running) return Promise.resolve({ ok: false, message: 'Wait for the scan to finish.' });
    if (!item || !item.title || !item.module) return Promise.resolve({ ok: false, message: 'Assignment identity is missing.' });
    if (item.status !== 'Needs feedback') return Promise.resolve({ ok: false, message: 'This assignment was not submitted, so there is no review to open.' });
    if (!document.querySelector('ul.assignments__module-navigator')) return Promise.resolve({ ok: false, message: 'Assignments page is not open.' });
    slot.cancelled = false;
    return selectModule(item.module).then(function (state) {
      if (state === 'empty') throw Error('Module now has an empty table; run a new scan.');
      var guard = 0;
      function toPage() {
        if (page() >= Number(item.page || 1)) {
          if (page() !== Number(item.page || 1)) throw Error('Student page changed; run a new scan.');
          return expand(item);
        }
        return advance(item.module).then(function (moved) {
          if (!moved) throw Error('Student page changed; run a new scan.');
          guard += 1;
          if (guard > Number(item.page) + 2) throw Error('Student page changed; run a new scan.');
          return toPage();
        });
      }
      return toPage();
    }).then(function (el) {
      var matches = parse(el).filter(function (assignment) { return norm(assignment.title) === norm(item.title); });
      var assignment = matches.filter(function (row) { return !row.reviewed; })[0] || matches[0];
      if (!assignment) throw Error('Assignment changed; run a new scan.');
      var control = assignment.wrapper.querySelector('div.reviewAssignmentButton');
      if (!control) throw Error('Review control missing.');
      control.scrollIntoView({ block: 'center' });
      control.click();
      return waitFor(function () {
        var areas = [].filter.call(document.querySelectorAll('textarea'), function (area) {
          var box = area.getBoundingClientRect();
          return box.width > 80 && box.height > 40;
        });
        return areas.length ? areas[0] : null;
      }, 15000);
    }).then(function () {
      return { ok: true };
    }).catch(function (error) {
      return { ok: false, message: error.message };
    });
  }

  var old = document.getElementById('dbi-leader-dash');
  if (old) old.remove();
  var panel = document.createElement('aside');
  panel.id = 'dbi-leader-dash';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'DBI Leader Dashboard');
  slot.panel = panel;
  var style = document.createElement('style');
  style.textContent = '#dbi-leader-dash{position:fixed;inset:12px;z-index:2147483646;overflow:auto;background:#eef3f8;color:#17304b;border-radius:16px;box-shadow:0 18px 50px rgba(16,40,63,.28);font:15px/1.45 "Segoe UI",system-ui,sans-serif;padding:18px 20px 28px}#dbi-leader-dash.tucked{inset:auto 12px 12px 12px;max-height:4.6rem;overflow:hidden}#dbi-leader-dash h1{margin:0;font-size:1.6rem}#dbi-leader-dash h2{margin:0;font-size:1.35rem}#dbi-leader-dash button,#dbi-leader-dash input,#dbi-leader-dash select{font:inherit;padding:8px 10px;margin:4px;border:1px solid #c5d3e0;border-radius:8px;background:#fff;color:#17304b}#dbi-leader-dash button{background:#174c78;color:#fff;cursor:pointer;border-color:#174c78;font-weight:650}#dbi-leader-dash button.ghost{background:#fff;color:#174c78}#dbi-leader-dash button:disabled{opacity:.5}#dbi-leader-dash .top{display:flex;justify-content:space-between;gap:16px;align-items:flex-end}#dbi-leader-dash .lede,#dbi-leader-dash .fine{color:#5c7286}#dbi-leader-dash .hero{display:grid;grid-template-columns:1.5fr .7fr;gap:18px;background:linear-gradient(145deg,#10283f,#1a5278 70%,#2a6f73);color:#fff;border-radius:16px;padding:20px;margin:10px 0}#dbi-leader-dash .hero .eyebrow{color:#b7d4ea;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}#dbi-leader-dash .hero-count{font-size:3rem;font-weight:720;line-height:.9;margin:4px 0}#dbi-leader-dash #dlp-brief{color:#d5e6f2}#dbi-leader-dash #dlp-side p{margin:0 0 8px;background:rgba(255,255,255,.12);border-radius:12px;padding:12px}#dbi-leader-dash .next-card{display:flex;justify-content:space-between;gap:12px;background:#fff;color:#17304b;border-radius:12px;padding:12px;margin-top:8px}#dbi-leader-dash #dlp-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}#dbi-leader-dash #dlp-cards article{background:#fff;border-radius:12px;padding:12px}#dbi-leader-dash #dlp-cards strong{display:block;font-size:1.4rem}#dbi-leader-dash details{background:#fff;border-radius:12px;margin:10px 0}#dbi-leader-dash summary{cursor:pointer;padding:12px 14px;font-weight:700}#dbi-leader-dash .body{padding:0 14px 14px}#dbi-leader-dash table{width:100%;border-collapse:collapse}#dbi-leader-dash td,#dbi-leader-dash th{padding:8px;text-align:left;border-bottom:1px solid #e4ebf2;vertical-align:top}#dbi-leader-dash th{font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;color:#5c7286}#dbi-leader-dash .bar{display:flex;height:12px;background:#e6eef5;border-radius:7px;overflow:hidden;margin:6px 0}#dbi-leader-dash .you{background:#174c78;height:100%}#dbi-leader-dash .them{background:#d08a2e;height:100%}#dbi-leader-dash .pill{float:right;background:#e7eef5;color:#174c78;border-radius:999px;padding:2px 8px}#dbi-leader-dash .lang button.on{background:#e7eef5;color:#174c78}@media(max-width:800px){#dbi-leader-dash .hero,#dbi-leader-dash .top{display:block}#dbi-leader-dash #dlp-cards{grid-template-columns:1fr 1fr}}';
  panel.appendChild(style);
  panel.insertAdjacentHTML('beforeend', '<div class="top"><div><h1>DBI Leader Dashboard</h1><p id="dlp-subtitle"></p><p class="lede" id="dlp-lede"></p></div><div class="lang"><button type="button" id="dlp-en" class="ghost">English</button><button type="button" id="dlp-ro" class="ghost">Română</button><button type="button" id="dlp-scan"></button><button type="button" id="dlp-cancel" class="ghost" disabled></button><button type="button" id="dlp-clear" class="ghost"></button><button type="button" id="dlp-close" class="ghost">Close</button></div></div><p id="dlp-progress" role="status"></p><section class="hero"><div><p class="eyebrow" id="dlp-kicker"></p><p class="hero-count" id="dlp-count"></p><h2 id="dlp-hero-title"></h2><p id="dlp-brief"></p><div id="dlp-next"></div></div><aside id="dlp-side"></aside></section><div id="dlp-cards"></div><details open><summary><span id="dlp-label-modules"></span> <span class="pill" id="dlp-module-count">0</span></summary><div class="body" id="dlp-modules"></div></details><details open><summary><span id="dlp-label-work"></span> <span class="pill" id="dlp-work-count">0</span></summary><div class="body"><p><input id="dlp-search"><select id="dlp-status"></select><select id="dlp-module"></select><select id="dlp-group"></select><button type="button" id="dlp-export" class="ghost"></button></p><p id="dlp-coverage" class="fine"></p><table><thead><tr><th id="dlp-th-student"></th><th id="dlp-th-group"></th><th id="dlp-th-module"></th><th id="dlp-th-assignment"></th><th id="dlp-th-status"></th><th id="dlp-th-action"></th></tr></thead><tbody id="dlp-rows"></tbody></table></div></details><details><summary><span id="dlp-label-groups"></span> <span class="pill" id="dlp-group-count">0</span></summary><div class="body"><table><thead><tr><th id="dlp-th-group2"></th><th id="dlp-th-rows"></th><th id="dlp-th-feedback"></th><th id="dlp-th-missing"></th><th id="dlp-th-caught"></th><th id="dlp-th-behind"></th></tr></thead><tbody id="dlp-groups"></tbody></table></div></details><details open><summary><span id="dlp-label-students"></span> <span class="pill" id="dlp-student-count">0</span></summary><div class="body"><p><input id="dlp-student-search"><button type="button" id="dlp-export-student" class="ghost" disabled></button></p><div id="dlp-student-detail"></div><table><thead><tr><th id="dlp-th-student2"></th><th id="dlp-th-group3"></th><th id="dlp-th-feedback2"></th><th id="dlp-th-missing2"></th><th id="dlp-th-total"></th></tr></thead><tbody id="dlp-students"></tbody></table></div></details><details><summary><span id="dlp-label-reminder"></span></summary><div class="body"><p class="fine" id="dlp-reminder-note"></p><p id="dlp-days"><label><input type="checkbox" data-day="0" checked> <span id="dlp-day-0"></span></label> <label><input type="checkbox" data-day="1" checked> <span id="dlp-day-1"></span></label> <label><input type="checkbox" data-day="2" checked> <span id="dlp-day-2"></span></label> <label><input type="checkbox" data-day="3" checked> <span id="dlp-day-3"></span></label> <label><input type="checkbox" data-day="4" checked> <span id="dlp-day-4"></span></label> <label><input type="checkbox" data-day="5" checked> <span id="dlp-day-5"></span></label> <label><input type="checkbox" data-day="6" checked> <span id="dlp-day-6"></span></label></p><p><span id="dlp-time-label"></span> <input id="dlp-hour" type="number" min="0" max="23" value="10"> <span id="dlp-hour-label"></span> <input id="dlp-minute" type="number" min="0" max="59" value="0"> <span id="dlp-minute-label"></span> <button type="button" id="dlp-ics" class="ghost"></button></p></div></details><details><summary><span id="dlp-label-notes"></span> <span class="pill" id="dlp-warn-count">0</span></summary><div class="body"><pre id="dlp-warnings"></pre><p class="fine" id="dlp-fine"></p><p><button type="button" id="dlp-export-json" class="ghost"></button> <button type="button" id="dlp-import-json" class="ghost"></button><input id="dlp-import-file" type="file" accept="application/json,.json" hidden></p></div></details>');
  document.documentElement.appendChild(panel);

  function byId(id) { return document.getElementById(id); }
  function setText(id, value) { var node = byId(id); if (node) node.textContent = value; }
  function option(select, value, label) {
    var node = document.createElement('option');
    node.value = value;
    node.textContent = label;
    select.appendChild(node);
  }
  function leaderBrief(list, roster) {
    var feedback = list.filter(function (x) { return x.status === 'Needs feedback'; });
    var missing = list.filter(function (x) { return x.status !== 'Needs feedback'; });
    var rowsInRoster = roster || [];
    var caught = rowsInRoster.filter(function (row) { return !row.feedback && !moduleLessons(row).missing.length; }).length;
    var byPerson = new Map();
    feedback.forEach(function (x) {
      var id = x.student + '|' + x.group;
      if (!byPerson.has(id)) byPerson.set(id, { student: x.student, group: x.group, n: 0, first: x });
      byPerson.get(id).n++;
    });
    var people = [].slice.call(byPerson.values()).sort(function (a, b) { return b.n - a.n || a.student.localeCompare(b.student); });
    var side = [];
    if (latest) {
      side.push({ value: String(missing.length), label: t('sideMissing') });
      if (rowsInRoster.length) side.push({ value: fill('caughtOf', { caught: caught, total: rowsInRoster.length }), label: t('sideCaught') });
    }
    if (!latest) return { count: '', title: t('heroEmptyTitle'), text: t('heroEmptyText'), next: [], side: side };
    var count = String(feedback.length);
    var title = t('caughtTitle');
    var body = t('caughtText');
    if (!feedback.length && missing.length) {
      title = t('noneWaitingTitle');
      body = fill('noneWaitingText', { n: countPhrase(missing.length, 'assignOne', 'assignMany') });
    } else if (feedback.length) {
      var person = people[0];
      var g = namedGroup(person.group);
      var waiting = feedback.filter(function (x) { return x.student === person.student && x.group === person.group; }).sort(function (a, b) { return a.module.localeCompare(b.module) || a.title.localeCompare(b.title) || (a.page || 0) - (b.page || 0); });
      person.waiting = waiting;
      title = fill(waiting.length > 1 ? 'firstTitle' : 'readyTitle', { student: person.student });
      body = waiting.length === 1
        ? moduleLabel(person.first.module) + ' · ' + lessonLabel(person.first.module, person.first.title) + (g ? ' · ' + g : '')
        : fill('manyText', { count: countPhrase(feedback.length, 'submittedOne', 'submittedMany'), people: countPhrase(people.length, 'peopleOne', 'peopleMany'), student: person.student, ready: countPhrase(waiting.length, 'assignOne', 'assignMany'), group: g ? fill('groupIn', { group: g }) : '' });
    }
    if (missing.length && feedback.length) {
      var byGroup = new Map();
      missing.forEach(function (x) { var name = namedGroup(x.group); byGroup.set(name, (byGroup.get(name) || 0) + 1); });
      var top = [].slice.call(byGroup.entries()).sort(function (a, b) { return b[1] - a[1]; })[0];
      body += ' ' + (top[0] ? fill('missingGroup', { group: top[0], n: top[1] }) : fill('missingNoGroup', { n: top[1] }));
    }
    if (latest && !latest.complete) body = t('partial') + body;
    return { count: count, title: title, text: body, next: (people[0] && people[0].waiting) || (people[0] ? [people[0].first] : []), side: side };
  }
  function openItem(x) {
    if (busy || slot.running) return;
    busy = true;
    render();
    panel.classList.add('tucked');
    openReview(x).then(function (response) {
      busy = false;
      if (response.ok) openedKeys.add(itemKey(x));
      else {
        panel.classList.remove('tucked');
        byId('dlp-progress').textContent = response.message;
      }
      render();
    });
  }
  function render() {
    pack = lang === 'ro' ? RO : STR;
    byId('dlp-en').classList.toggle('on', lang === 'en');
    byId('dlp-ro').classList.toggle('on', lang === 'ro');
    setText('dlp-subtitle', t('subtitle'));
    setText('dlp-lede', t('lede'));
    setText('dlp-scan', t('scan'));
    setText('dlp-cancel', t('cancel'));
    setText('dlp-clear', t('clear'));
    setText('dlp-kicker', t('kicker'));
    setText('dlp-fine', t('fine'));
    setText('dlp-label-modules', t('panelModules'));
    setText('dlp-label-work', t('panelWork'));
    setText('dlp-label-groups', t('panelGroup'));
    setText('dlp-label-students', t('panelStudent'));
    setText('dlp-label-notes', t('panelNotes'));
    setText('dlp-label-reminder', t('panelReminder'));
    setText('dlp-reminder-note', t('reminderNote'));
    setText('dlp-time-label', t('notifyTime'));
    setText('dlp-hour-label', t('notifyHour'));
    setText('dlp-minute-label', t('notifyMinute'));
    setText('dlp-ics', t('downloadIcs'));
    setText('dlp-export-json', t('exportData'));
    setText('dlp-import-json', t('importData'));
    ['daySun', 'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri', 'daySat'].forEach(function (key, index) { setText('dlp-day-' + index, t(key)); });
    setText('dlp-th-student', t('thStudent'));
    setText('dlp-th-group', t('thGroup'));
    setText('dlp-th-module', t('thModule'));
    setText('dlp-th-assignment', t('thAssignment'));
    setText('dlp-th-status', t('thStatus'));
    setText('dlp-th-action', t('thAction'));
    setText('dlp-th-group2', t('thGroup'));
    setText('dlp-th-rows', t('thStudents'));
    setText('dlp-th-feedback', t('statusFeedback'));
    setText('dlp-th-missing', t('statusMissing'));
    setText('dlp-th-caught', t('thCaught'));
    setText('dlp-th-behind', t('thBehind'));
    setText('dlp-th-student2', t('thStudent'));
    setText('dlp-th-group3', t('thGroup'));
    setText('dlp-th-feedback2', t('statusFeedback'));
    setText('dlp-th-missing2', t('statusMissing'));
    setText('dlp-th-total', t('thTotal'));
    byId('dlp-search').placeholder = t('search');
    byId('dlp-student-search').placeholder = t('studentSearch');
    setText('dlp-export', t('export'));
    setText('dlp-export-student', t('exportStudent'));
    byId('dlp-scan').disabled = slot.running;
    byId('dlp-cancel').disabled = !slot.running;
    var status = byId('dlp-status');
    var statusValue = status.value;
    status.replaceChildren();
    option(status, '', t('allStatuses'));
    option(status, 'Needs feedback', t('statusFeedback'));
    option(status, 'Missing - not submitted', t('statusMissing'));
    option(status, 'Reviewed', t('statusReviewed'));
    status.value = statusValue;
    var moduleSelect = byId('dlp-module');
    var moduleValue = moduleSelect.value;
    moduleSelect.replaceChildren();
    option(moduleSelect, '', t('allModules'));
    modules.forEach(function (name) { option(moduleSelect, name, moduleLabel(name)); });
    moduleSelect.value = moduleValue;
    var groups = [];
    items.concat(reviewedRows()).forEach(function (x) { if (groups.indexOf(x.group) === -1) groups.push(x.group); });
    var groupSelect = byId('dlp-group');
    var groupValue = groupSelect.value;
    groupSelect.replaceChildren();
    option(groupSelect, '', t('allGroups'));
    groups.forEach(function (name) { option(groupSelect, name, groupLabel(name)); });
    if ([].some.call(groupSelect.options, function (node) { return node.value === groupValue; })) groupSelect.value = groupValue;

    var view = latest || items.length ? filtered() : [];
    var body = byId('dlp-rows');
    body.replaceChildren();
    view.forEach(function (x) {
      var tr = document.createElement('tr');
      [x.student, groupLabel(x.group), moduleLabel(x.module), lessonLabel(x.module, x.title), statusLabel(x.status)].forEach(function (value) {
        var td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      var td = document.createElement('td');
      var button = document.createElement('button');
      var canReview = x.status === 'Needs feedback';
      button.textContent = x.status === 'Reviewed' ? t('statusReviewed') : (!canReview ? t('notSubmittedBtn') : (openedKeys.has(itemKey(x)) ? t('opened') : t('openReview')));
      button.disabled = busy || slot.running || !canReview;
      button.onclick = function () { openItem(x); };
      td.appendChild(button);
      tr.appendChild(td);
      body.appendChild(tr);
    });
    setText('dlp-work-count', String(view.length));

    var shown = shownItems();
    var brief = leaderBrief(shown, (latest && latest.roster) || []);
    setText('dlp-count', brief.count);
    setText('dlp-hero-title', brief.title);
    setText('dlp-brief', brief.text);
    var side = byId('dlp-side');
    side.replaceChildren();
    brief.side.forEach(function (bit) {
      var p = document.createElement('p');
      var strong = document.createElement('strong');
      strong.textContent = bit.value;
      p.appendChild(strong);
      p.appendChild(document.createTextNode(' ' + bit.label));
      side.appendChild(p);
    });
    var nextBox = byId('dlp-next');
    nextBox.replaceChildren();
    brief.next.forEach(function (x) {
      var row = document.createElement('div');
      row.className = 'next-card';
      var copy = document.createElement('div');
      var who = document.createElement('strong');
      who.textContent = x.student;
      var meta = document.createElement('div');
      meta.textContent = moduleLabel(x.module) + ' · ' + lessonLabel(x.module, x.title) + (namedGroup(x.group) ? ' · ' + namedGroup(x.group) : '');
      copy.appendChild(who);
      copy.appendChild(meta);
      var button = document.createElement('button');
      button.textContent = openedKeys.has(itemKey(x)) ? t('opened') : t('reviewNow');
      button.disabled = busy || slot.running;
      button.onclick = function () { openItem(x); };
      row.appendChild(copy);
      row.appendChild(button);
      nextBox.appendChild(row);
    });

    var feedback = shown.filter(function (x) { return x.status === 'Needs feedback'; });
    var missing = shown.filter(function (x) { return x.status !== 'Needs feedback'; });
    var roster = (latest && latest.roster) || [];
    var caught = roster.filter(function (row) { return !row.feedback && !moduleLessons(row).missing.length; }).length;
    var cardHost = byId('dlp-cards');
    cardHost.replaceChildren();
    [[t('cardFeedback'), feedback.length, t('cardFeedbackNote')], [t('cardMissing'), missing.length, t('cardMissingNote')], [t('cardGroups'), new Set(shown.map(function (x) { return x.group; })).size, ''], [t('cardCaught'), roster.length ? caught : '—', roster.length ? fill('cardCaughtNote', { n: roster.length }) : t('cardCaughtEmpty')]].forEach(function (card) {
      var article = document.createElement('article');
      var strong = document.createElement('strong');
      strong.textContent = String(card[1]);
      var span = document.createElement('span');
      span.textContent = card[2] ? card[0] + ' · ' + card[2] : card[0];
      article.appendChild(strong);
      article.appendChild(span);
      cardHost.appendChild(article);
    });

    var moduleHost = byId('dlp-modules');
    moduleHost.replaceChildren();
    var totals = modules.map(function (name) { return shown.filter(function (x) { return canonicalModule(x.module) === name && (x.status === 'Needs feedback' || x.status === 'Missing - not submitted'); }).length; });
    var max = Math.max.apply(null, [1].concat(totals));
    modules.forEach(function (name) {
      var feedbackCount = shown.filter(function (x) { return canonicalModule(x.module) === name && x.status === 'Needs feedback'; }).length;
      var missingCount = shown.filter(function (x) { return canonicalModule(x.module) === name && x.status === 'Missing - not submitted'; }).length;
      var row = document.createElement('div');
      var label = document.createElement('b');
      label.textContent = moduleLabel(name);
      var bar = document.createElement('div');
      bar.className = 'bar';
      var you = document.createElement('i');
      you.className = 'you';
      you.style.width = ((feedbackCount / max) * 100) + '%';
      var them = document.createElement('i');
      them.className = 'them';
      them.style.width = ((missingCount / max) * 100) + '%';
      bar.appendChild(you);
      bar.appendChild(them);
      var note = document.createElement('div');
      note.textContent = fill('moduleNote', { feedback: feedbackCount, missing: missingCount });
      row.appendChild(label);
      row.appendChild(bar);
      row.appendChild(note);
      moduleHost.appendChild(row);
    });
    setText('dlp-module-count', String(modules.length));

    var people = rosterPeople();
    var qStudent = byId('dlp-student-search').value.trim().toLowerCase();
    var studentRows = people.filter(function (s) { return (!groupFocus || s.group === groupFocus) && (!qStudent || s.student.toLowerCase().indexOf(qStudent) !== -1); }).sort(function (a, b) { return (b.feedback - a.feedback) || (b.missing - a.missing) || a.student.localeCompare(b.student); });
    var studentBody = byId('dlp-students');
    studentBody.replaceChildren();
    studentRows.forEach(function (s) {
      var tr = document.createElement('tr');
      [s.student, groupLabel(s.group), s.feedback, s.missing, s.feedback + s.missing].forEach(function (value) {
        var td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      tr.style.cursor = 'pointer';
      tr.onclick = function () { byId('dlp-student-search').value = s.student; render(); };
      studentBody.appendChild(tr);
    });
    setText('dlp-student-count', String(studentRows.length));
    var detail = byId('dlp-student-detail');
    detail.replaceChildren();
    if (!qStudent) {
      var pick = document.createElement('p');
      pick.className = 'fine';
      pick.textContent = t('studentPick');
      detail.appendChild(pick);
    } else {
      var matches = people.filter(function (s) { return (!groupFocus || s.group === groupFocus) && s.student.toLowerCase().indexOf(qStudent) !== -1; });
      var chosen = chosenStudents(people, qStudent);
      if (!matches.length) {
        var none = document.createElement('p');
        none.textContent = t('studentNone');
        detail.appendChild(none);
      } else if (!chosen.length) {
        matches.forEach(function (s) {
          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'ghost';
          button.textContent = s.student + (namedGroup(s.group) ? ' · ' + namedGroup(s.group) : '');
          button.onclick = function () { byId('dlp-student-search').value = s.student; render(); };
          detail.appendChild(button);
        });
      } else {
        chosen.forEach(function (person) {
          var head = document.createElement('h3');
          head.textContent = person.student + (namedGroup(person.group) ? ' · ' + namedGroup(person.group) : '');
          var stats = document.createElement('p');
          stats.textContent = t('studentSubmitted') + ': ' + (person.reviewed + person.feedback) + ' · ' + t('studentLeft') + ': ' + person.missing + ' · ' + t('studentWaiting') + ': ' + person.feedback;
          var note = document.createElement('p');
          note.className = 'fine';
          note.textContent = t('lessonNamesNote');
          detail.appendChild(head);
          detail.appendChild(stats);
          if (lang !== 'en') detail.appendChild(note);
          person.modules.slice().sort(function (a, b) { return modules.indexOf(canonicalModule(a.module)) - modules.indexOf(canonicalModule(b.module)); }).forEach(function (mod) {
            var block = document.createElement('div');
            var title = document.createElement('b');
            title.textContent = moduleLabel(mod.module);
            block.appendChild(title);
            var lessons = moduleLessons(mod);
            if (!lessons.missing.length && !(mod.feedback || 0)) {
              var caughtLine = document.createElement('p');
              caughtLine.textContent = t('moduleCaught');
              block.appendChild(caughtLine);
            } else {
              var done = lessons.done.map(function (name) { return lessonLabel(mod.module, name); });
              var left = lessons.missing.map(function (name) { return lessonLabel(mod.module, name); });
              [t('studentDone') + ' (' + done.length + ')', t('studentNotYet') + ' (' + left.length + ')'].forEach(function (heading, index) {
                var names = index === 0 ? done : left;
                var label = document.createElement('div');
                label.textContent = heading;
                var ul = document.createElement('ul');
                (names.length ? names : ['—']).forEach(function (name) {
                  var li = document.createElement('li');
                  li.textContent = name;
                  ul.appendChild(li);
                });
                block.appendChild(label);
                block.appendChild(ul);
              });
              var nextLesson = document.createElement('p');
              nextLesson.textContent = t('studentNext') + ': ' + (left[0] || '—');
              block.appendChild(nextLesson);
            }
            detail.appendChild(block);
          });
        });
      }
    }
    byId('dlp-export-student').disabled = !chosenStudents(people, qStudent).length;

    var groupMap = new Map();
    people.forEach(function (person) {
      if (!groupMap.has(person.group)) groupMap.set(person.group, { group: person.group, students: 0, feedback: 0, missing: 0, caught: 0, behind: null });
      var g = groupMap.get(person.group);
      g.students++;
      g.feedback += person.feedback;
      g.missing += person.missing;
      if (!person.feedback && !person.missing) g.caught++;
      if (person.missing && (!g.behind || person.missing > g.behind.missing)) g.behind = person;
    });
    var groupRows = [].slice.call(groupMap.values()).sort(function (a, b) { return (b.feedback - a.feedback) || (b.missing - a.missing) || String(a.group).localeCompare(String(b.group)); });
    var groupBody = byId('dlp-groups');
    groupBody.replaceChildren();
    groupRows.forEach(function (g) {
      var tr = document.createElement('tr');
      var behind = g.behind ? g.behind.student + ' (' + g.behind.missing + ')' : '—';
      [groupLabel(g.group), g.students, g.feedback, g.missing, g.caught, behind].forEach(function (value) {
        var td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
      });
      tr.style.cursor = 'pointer';
      tr.onclick = function () { groupFocus = groupFocus === g.group ? '' : g.group; render(); };
      groupBody.appendChild(tr);
    });
    setText('dlp-group-count', String(groupRows.length));
    var warnings = (latest && latest.warnings) || [];
    setText('dlp-warnings', warnings.length ? warnings.join('\n') : t('warningsNone'));
    setText('dlp-warn-count', String(warnings.length));
    if (latest) {
      var when = latest.complete ? new Date().toLocaleString() : '';
      setText('dlp-coverage', fill('coverage', {
        state: latest.complete ? t('stateComplete') : t('statePartial'),
        students: latest.students,
        reviewed: latest.reviewed,
        unknown: latest.unknown,
        when: when ? when + ' • ' : '',
        account: latest.account ? fill('accountBit', { account: latest.account }) : ''
      }));
    }
  }

  byId('dlp-en').onclick = function () { lang = 'en'; saveLocal(); render(); };
  byId('dlp-ro').onclick = function () { lang = 'ro'; saveLocal(); render(); };
  byId('dlp-cancel').onclick = function () { slot.cancelled = true; };
  byId('dlp-close').onclick = function () {
    if (panel.classList.contains('tucked')) { panel.classList.remove('tucked'); return; }
    slot.cancelled = true;
    panel.remove();
  };
  byId('dlp-clear').onclick = function () {
    if (slot.running) return;
    items = [];
    latest = null;
    groupFocus = '';
    openedKeys.clear();
    saveLocal();
    render();
    setText('dlp-coverage', '');
    setText('dlp-warnings', t('cleared'));
    setText('dlp-progress', t('cleared'));
  };
  byId('dlp-scan').onclick = function () { if (!slot.running) { slot.running = true; scan(); } };
  ['dlp-search', 'dlp-status', 'dlp-module', 'dlp-group', 'dlp-student-search'].forEach(function (id) { byId(id).oninput = render; });
  function saveLocal() {
    try {
      var copy = latest ? JSON.parse(JSON.stringify(latest)) : null;
      if (copy) delete copy.account;
      localStorage.setItem('dbi-leader-pages-scan', JSON.stringify({ lang: lang, items: items, latest: copy }));
    } catch (error) {}
  }
  function downloadIcs() {
    var boxes = [].slice.call(document.querySelectorAll('#dlp-days input'));
    var days = boxes.filter(function (el) { return el.checked; }).map(function (el) { return Number(el.getAttribute('data-day')); });
    if (!days.length) days = [0, 1, 2, 3, 4, 5, 6];
    days.sort(function (a, b) { return a - b; });
    var by = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    var hh = Math.min(23, Math.max(0, Number(byId('dlp-hour').value) || 0));
    var mm = Math.min(59, Math.max(0, Number(byId('dlp-minute').value) || 0));
    var start = new Date();
    start.setHours(hh, mm, 0, 0);
    var want = {};
    days.forEach(function (day) { want[day] = true; });
    for (var i = 0; i < 8 && !(want[start.getDay()] && start.getTime() >= Date.now() - 60000); i++) {
      start.setDate(start.getDate() + 1);
      start.setHours(hh, mm, 0, 0);
    }
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var stamp = start.getFullYear() + pad(start.getMonth() + 1) + pad(start.getDate()) + 'T' + pad(start.getHours()) + pad(start.getMinutes()) + '00';
    var dtstamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DBI Leader Dashboard//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:dbi-scan-assignments@dbi-leader-dashboard',
      'DTSTAMP:' + dtstamp,
      'DTSTART:' + stamp,
      'RRULE:FREQ=WEEKLY;BYDAY=' + days.map(function (d) { return by[d]; }).join(','),
      'SUMMARY:DBI reminder to scan assignments by hand',
      'DESCRIPTION:Open digitalbibleinstitute.com, sign in as Group leader, and click the DBI Leader Scan bookmark.',
      'END:VEVENT',
      'END:VCALENDAR',
      ''
    ].join('\r\n');
    var blob = new Blob([ics], { type: 'text/calendar' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'dbi-scan-assignments.ics';
    link.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  byId('dlp-export').onclick = function () { downloadCsv(filtered(), 'dbi-leader-report.csv'); };
  byId('dlp-export-student').onclick = function () {
    var chosen = chosenStudents(rosterPeople(), byId('dlp-student-search').value.trim().toLowerCase());
    if (!chosen.length) return;
    var name = String(chosen[0].student).replace(/[\\/:*?"<>|]/g, ' ').replace(/\s+/g, ' ').trim() || 'student';
    downloadCsv(chosen.reduce(function (all, person) { return all.concat(studentViewRows(person)); }, []), name + '.csv');
  };
  byId('dlp-ics').onclick = downloadIcs;
  byId('dlp-export-json').onclick = function () {
    var copy = latest ? JSON.parse(JSON.stringify(latest)) : null;
    if (copy) delete copy.account;
    var blob = new Blob([JSON.stringify({ lang: lang, items: items, latest: copy }, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'dbi-leader-backup.json';
    link.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    setText('dlp-progress', t('exportDone'));
  };
  byId('dlp-import-json').onclick = function () { byId('dlp-import-file').click(); };
  byId('dlp-import-file').onchange = function () {
    var file = byId('dlp-import-file').files && byId('dlp-import-file').files[0];
    byId('dlp-import-file').value = '';
    if (!file) return;
    file.text().then(function (raw) {
      var data;
      try { data = JSON.parse(raw); } catch (error) { setText('dlp-progress', t('importBad')); return; }
      if (!data || typeof data !== 'object' || !Array.isArray(data.items)) { setText('dlp-progress', t('importBad')); return; }
      items = data.items;
      latest = data.latest && typeof data.latest === 'object' ? data.latest : null;
      if (latest) delete latest.account;
      if (data.lang === 'ro' || data.lang === 'en') lang = data.lang;
      saveLocal();
      render();
      setText('dlp-progress', t('importDone'));
    }).catch(function () { setText('dlp-progress', t('importBad')); });
  };
  render();
  setText('dlp-progress', t('scanningNotes'));
  scan().catch(function (error) {
    slot.running = false;
    busy = false;
    setText('dlp-progress', error.message || 'Scan failed.');
  });
})();
