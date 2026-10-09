/* DBI leader scan for the assignments page already open in this tab.
   Reads lesson rows only. Does not click Send feedback and does not ask for a password. */
(function () {
  'use strict';
  if (location.hostname !== 'digitalbibleinstitute.com') {
    window.alert('Open digitalbibleinstitute.com first. Sign in as Group leader, open assignments, then click the bookmark.');
    return;
  }

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

  var text = function (el) { return (el && el.innerText || '').trim(); };
  var norm = function (s) {
    return (s || '').trim().toLowerCase().replace(/[’‘ʼ]/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' ');
  };
  var fold = function (s) { return norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); };
  function rowCells(row) { return row ? [].filter.call(row.children, function (el) { return el.tagName === 'TD'; }) : []; }
  function rowButton(row) {
    var cells = rowCells(row);
    if (cells.length < 2 || !cells[0] || !cells[0].querySelector('span.font-weight-bold')) return null;
    var candidates = [];
    cells.forEach(function (td) {
      [].forEach.call(td.querySelectorAll('button'), function (button) {
        if (!button.closest('div.lesson-item__wrapper')) candidates.push(button);
      });
    });
    var byText = candidates.find(function (button) { return text(button).indexOf('Feedback Assignments') !== -1; });
    if (byText) return byText;
    return candidates.length ? candidates[candidates.length - 1] : null;
  }
  function studentRows() {
    return [].filter.call(document.querySelectorAll('table.table > tbody > tr'), rowButton);
  }
  function info(row) {
    var cells = rowCells(row);
    return {
      student: text(cells[0] && cells[0].querySelector('span.font-weight-bold')),
      group: text(cells[1] && cells[1].querySelector('span.font-weight-bold'))
    };
  }
  function tabs() { return [].slice.call(document.querySelectorAll('ul.assignments__module-navigator li')); }
  function moduleName(tab) {
    var list = tabs();
    var label = text(tab);
    var byText = modules.find(function (name) { return norm(label) === norm(name); });
    if (byText) return byText;
    var index = list.indexOf(tab);
    return modules[index] || label || 'Assignments';
  }
  function activeModule() {
    var tab = tabs().find(function (item) { return item.classList.contains('active'); });
    return tab ? moduleName(tab) : (modules[0] || 'Assignments');
  }
  function isModuleSlot(title) {
    var name = fold(title);
    return name.indexOf('module assignment') !== -1 || name.indexOf('review module assignment') !== -1 || name.indexOf('tema pentru modulul') !== -1;
  }
  function lessonKey(title) {
    var name = norm(title);
    return name.indexOf('module assignment') !== -1 || name.indexOf('review module assignment') !== -1 ? 'module assignment' : name;
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
    var rows = lessonAliases[module] || [];
    for (var i = 0; i < rows.length; i++) {
      if (fold(rows[i][0]) === page || rows[i][1].some(function (local) { return fold(local) === page; })) return rows[i][0];
    }
    return null;
  }
  function parse(expanded) {
    return [].map.call(expanded.querySelectorAll('div.lesson-item__wrapper'), function (wrapper) {
      var description = wrapper.querySelector('p.assignmentDescription');
      var icons = description ? [].slice.call(description.querySelectorAll('svg')) : [];
      return {
        title: text(description),
        unknown: !text(description) || !icons.length,
        reviewed: icons.some(function (svg) { return (svg.getAttribute('stroke') || '').toLowerCase() === '#40dd7f'; })
      };
    });
  }
  function explicitEmpty(expanded) {
    var body = text(expanded);
    if (/\b(no assignments|no submissions|no submitted assignments|no assignments submitted|no data available)\b/i.test(body)) return true;
    if (expanded.querySelector('[aria-busy="true"], .spinner-border, .spinner-grow, [role="progressbar"], div.lesson-item__wrapper, table, button')) return false;
    return body.length > 2;
  }
  function expandedRow(row) {
    var next = row.nextElementSibling;
    return next && !rowButton(next) && next.getClientRects().length ? next : null;
  }
  function waitFor(fn, timeout) {
    return new Promise(function (resolve, reject) {
      var start = Date.now();
      var timer = setInterval(function () {
        var value;
        try { value = fn(); } catch (error) { clearInterval(timer); reject(error); return; }
        if (value) { clearInterval(timer); resolve(value); return; }
        if (Date.now() - start >= timeout) { clearInterval(timer); reject(new Error('Timed out waiting for assignments.')); }
      }, 200);
    });
  }
  function delay(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
  async function readRow(row) {
    var opened = false;
    var expanded = expandedRow(row);
    if (!expanded) {
      var button = rowButton(row);
      if (!button || /^send feedback$/i.test(text(button))) throw new Error('Assignments control missing.');
      button.click();
      opened = true;
      expanded = await waitFor(function () {
        var next = expandedRow(row);
        if (!next) return null;
        if (next.querySelector('[aria-busy="true"], .spinner-border, .spinner-grow, [role="progressbar"]')) return null;
        return next.querySelector('div.lesson-item__wrapper p.assignmentDescription') || explicitEmpty(next) ? next : null;
      }, 7000);
      await delay(300);
    }
    var assignments = parse(expanded);
    if (opened) {
      var close = rowButton(row);
      if (close && !/^send feedback$/i.test(text(close))) close.click();
    }
    return { assignments: assignments, empty: !assignments.length && explicitEmpty(expanded) };
  }
  function sortTitles(module, titles) {
    var list = catalog[module] || [];
    return titles.slice().sort(function (a, b) {
      function rank(title) {
        if (isModuleSlot(title)) return 10000;
        var index = list.indexOf(title);
        return index === -1 ? 5000 : index;
      }
      return rank(a) - rank(b);
    });
  }
  function classify(module, assignments) {
    var buckets = { feedback: [], missing: [], reviewed: [], unknown: 0 };
    var covered = {};
    var moduleReviewed = assignments.some(function (item) { return item.reviewed && isModuleSlot(item.title); });
    var slots = {};
    assignments.forEach(function (item) {
      if (item.unknown) { buckets.unknown++; return; }
      var english = catalogLesson(module, item.title) || item.title;
      var slot = english;
      if (!slots[slot]) slots[slot] = { title: english, reviewed: !!item.reviewed, raw: item.title };
      else if (item.reviewed) slots[slot].reviewed = true;
      covered[english] = true;
    });
    Object.keys(slots).forEach(function (slot) {
      var item = slots[slot];
      if (item.reviewed) buckets.reviewed.push(item.title);
      else if (moduleReviewed && isModuleSlot(item.raw)) return;
      else buckets.feedback.push(item.title);
    });
    (catalog[module] || []).forEach(function (title) {
      if (!covered[title]) buckets.missing.push(title);
    });
    buckets.feedback = sortTitles(module, buckets.feedback);
    buckets.missing = sortTitles(module, buckets.missing);
    buckets.reviewed = sortTitles(module, buckets.reviewed);
    return buckets;
  }

  var old = document.getElementById('dbi-leader-scan');
  if (old) old.remove();
  var panel = document.createElement('aside');
  panel.id = 'dbi-leader-scan';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'DBI Leader Dashboard');
  panel.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483646;width:min(28rem,calc(100vw - 24px));max-height:calc(100vh - 24px);overflow:auto;background:#fffdf8;color:#1c2430;border:1px solid #d9d1c3;box-shadow:0 12px 40px rgba(28,36,48,.18);font:15px/1.4 Georgia,serif;padding:0;';
  panel.innerHTML = '<div style="display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 14px;background:#1f4e46;color:#f4efe6"><strong>DBI Leader Dashboard</strong><button type="button" id="dbi-leader-scan-close" style="background:transparent;color:inherit;border:1px solid #d7ebe4;padding:2px 8px;cursor:pointer">Close</button></div><div id="dbi-leader-scan-body" style="padding:12px 14px">Reading the assignments on this page…</div>';
  document.documentElement.appendChild(panel);
  panel.querySelector('#dbi-leader-scan-close').onclick = function () { panel.remove(); };

  function list(title, items) {
    var html = '<h3 style="margin:14px 0 4px;font-size:15px">' + title + '</h3>';
    if (!items.length) return html + '<p style="margin:0;color:#5c6775">None</p>';
    return html + '<ul style="margin:0;padding-left:1.1rem">' + items.map(function (item) {
      return '<li>' + item.replace(/[&<>]/g, function (ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]; }) + '</li>';
    }).join('') + '</ul>';
  }

  async function run() {
    var body = document.getElementById('dbi-leader-scan-body');
    if (!document.querySelector('ul.assignments__module-navigator') || !studentRows().length) {
      body.textContent = 'Open the assignments page while signed in as Group leader, then click the bookmark again. This scan reads only the students already listed on the current page.';
      return;
    }
    var search = document.querySelector('table.table input');
    if (search && search.value && search.value.trim()) {
      body.textContent = 'Clear the student search on this page, then click the bookmark again.';
      return;
    }
    var module = activeModule();
    var rows = studentRows();
    var people = [];
    var warnings = [];
    for (var i = 0; i < rows.length; i++) {
      var who = info(rows[i]);
      body.textContent = 'Reading ' + (i + 1) + ' of ' + rows.length + ' on this page…';
      try {
        var read = await readRow(rows[i]);
        var buckets = classify(module, read.assignments);
        if (!read.assignments.length && !read.empty) warnings.push(who.student + ': assignments did not load.');
        people.push({ student: who.student, group: who.group, buckets: buckets });
      } catch (error) {
        warnings.push(who.student + ': ' + error.message);
      }
    }
    var counts = people.reduce(function (sum, person) {
      sum.feedback += person.buckets.feedback.length;
      sum.missing += person.buckets.missing.length;
      sum.reviewed += person.buckets.reviewed.length;
      return sum;
    }, { feedback: 0, missing: 0, reviewed: 0 });
    var html = '<p style="margin:0 0 8px"><strong>' + module.replace(/[&<>]/g, '') + '</strong> · this page only</p>';
    html += '<p style="margin:0">Needs feedback ' + counts.feedback + ' · Not submitted ' + counts.missing + ' · Reviewed ' + counts.reviewed + '</p>';
    people.forEach(function (person) {
      html += '<section style="margin-top:12px;padding-top:10px;border-top:1px solid #d9d1c3"><h2 style="margin:0;font-size:18px">' + person.student.replace(/[&<>]/g, function (ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]; }) + '</h2>';
      if (person.group) html += '<p style="margin:2px 0 0;color:#5c6775">' + person.group.replace(/[&<>]/g, function (ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]; }) + '</p>';
      html += list('Needs feedback', person.buckets.feedback);
      html += list('Not submitted', person.buckets.missing);
      html += list('Reviewed', person.buckets.reviewed);
      if (person.buckets.unknown) html += '<p style="margin:8px 0 0;color:#5c6775">Unrecognized assignment status: ' + person.buckets.unknown + '</p>';
      html += '</section>';
    });
    if (warnings.length) html += '<p style="margin:12px 0 0;color:#8a4b08">' + warnings.map(function (line) { return line.replace(/[&<>]/g, function (ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]; }); }).join('<br>') + '</p>';
    html += '<p style="margin:12px 0 0;color:#5c6775">Change the module or student page, then click the bookmark again. Nothing is sent from this panel.</p>';
    body.innerHTML = html;
  }

  run().catch(function (error) {
    var body = document.getElementById('dbi-leader-scan-body');
    if (body) body.textContent = error.message || 'Scan failed.';
  });
})();
