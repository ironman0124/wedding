// ============================================================
// WEDDING PLANNER — Google Apps Script Web App
// Dharmesh & Nalishka | ironman0124.github.io/wedding
// Deploy as: Execute as ME, Anyone can access
// ============================================================

var SS_ID = '1gHbo28ymRrZighKF6AvjZYNl_3JEX2Ng1AIrFvibvFs';

var SHEETS = {
  pithi:   '🌿 Pithi Guest List',
  saatak:  '👥 Saatak Guest List',
  wedding: '💍Wedding Guest List',
  events:  '📅 Events & Functions',
  tasks:   '✅ To-Do List',
  expenses:'💰 Expenses'
};

// ── CORS helper ──────────────────────────────────────────────
function cors(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ── GET handler ──────────────────────────────────────────────
function doGet(e) {
  var action = e.parameter.action || 'all';
  var ss = SpreadsheetApp.openById(SS_ID);
  var result = {};

  try {
    if (action === 'all' || action === 'guests') {
      result.pithi   = getGuests(ss, SHEETS.pithi);
      result.saatak  = getGuests(ss, SHEETS.saatak);
      result.wedding = getGuests(ss, SHEETS.wedding);
    }
    if (action === 'all' || action === 'events') {
      result.events  = getEvents(ss);
    }
    if (action === 'all' || action === 'tasks') {
      result.tasks   = getTasks(ss);
    }
    if (action === 'all' || action === 'expenses') {
      result.expenses = getExpenses(ss);
    }
    result.status = 'ok';
  } catch(err) {
    result.status = 'error';
    result.message = err.toString();
  }

  return cors(ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON));
}

// ── POST handler ─────────────────────────────────────────────
function doPost(e) {
  var ss = SpreadsheetApp.openById(SS_ID);
  var result = {};

  try {
    var payload = JSON.parse(e.postData.contents);
    var action  = payload.action;

    if (action === 'updateGuestRSVP') {
      updateGuestRSVP(ss, payload.sheet, payload.row, payload.rsvp, payload.invite, payload.table, payload.diet, payload.contact, payload.notes);
      result.status = 'ok';
    } else if (action === 'addGuest') {
      addGuest(ss, payload.sheet, payload.data);
      result.status = 'ok';
    } else if (action === 'addEvent') {
      addEvent(ss, payload.data);
      result.status = 'ok';
    } else if (action === 'updateEvent') {
      updateEvent(ss, payload.row, payload.data);
      result.status = 'ok';
    } else if (action === 'addTask') {
      addTask(ss, payload.data);
      result.status = 'ok';
    } else if (action === 'updateTask') {
      updateTask(ss, payload.row, payload.data);
      result.status = 'ok';
    } else if (action === 'addExpense') {
      addExpense(ss, payload.data);
      result.status = 'ok';
    } else if (action === 'updateExpense') {
      updateExpense(ss, payload.row, payload.data);
      result.status = 'ok';
    } else {
      result.status = 'error';
      result.message = 'Unknown action: ' + action;
    }
  } catch(err) {
    result.status = 'error';
    result.message = err.toString();
  }

  return cors(ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON));
}

// ── Read guests from a sheet ─────────────────────────────────
// Header row = row 2, data starts row 3
// Cols: A=#, B=First Name, C=Surname, D=Group, E=Table No,
//       F=RSVP Status, G=Invite Sent, H=Dietary, I=Contact, J=Notes
function getGuests(ss, sheetName) {
  var ws = ss.getSheetByName(sheetName);
  if (!ws) return [];
  var lastRow = ws.getLastRow();
  if (lastRow < 3) return [];
  var data = ws.getRange(3, 1, lastRow - 2, 10).getValues();
  var guests = [];
  for (var i = 0; i < data.length; i++) {
    var r = data[i];
    if (!r[1] && !r[2]) continue; // skip fully empty rows
    guests.push({
      row:     i + 3,
      no:      r[0],
      name:    r[1],
      surname: r[2],
      group:   r[3],
      table:   r[4],
      rsvp:    r[5] || 'Pending',
      invite:  r[6] || 'No',
      diet:    r[7],
      contact: r[8],
      notes:   r[9]
    });
  }
  return guests;
}

// ── Update a guest row ───────────────────────────────────────
function updateGuestRSVP(ss, sheetKey, row, rsvp, invite, table, diet, contact, notes) {
  var sheetName = SHEETS[sheetKey] || sheetKey;
  var ws = ss.getSheetByName(sheetName);
  if (!ws) throw new Error('Sheet not found: ' + sheetName);
  ws.getRange(row, 5).setValue(table   || '');
  ws.getRange(row, 6).setValue(rsvp    || 'Pending');
  ws.getRange(row, 7).setValue(invite  || 'No');
  ws.getRange(row, 8).setValue(diet    || '');
  ws.getRange(row, 9).setValue(contact || '');
  ws.getRange(row, 10).setValue(notes  || '');
  SpreadsheetApp.flush();
}

// ── Add new guest ────────────────────────────────────────────
function addGuest(ss, sheetKey, data) {
  var sheetName = SHEETS[sheetKey] || sheetKey;
  var ws = ss.getSheetByName(sheetName);
  if (!ws) throw new Error('Sheet not found: ' + sheetName);
  var lastRow = ws.getLastRow() + 1;
  var no = lastRow - 2;
  ws.getRange(lastRow, 1, 1, 10).setValues([[
    no,
    data.name    || '',
    data.surname || '',
    data.group   || 'Family',
    data.table   || '',
    data.rsvp    || 'Pending',
    data.invite  || 'No',
    data.diet    || '',
    data.contact || '',
    data.notes   || ''
  ]]);
  SpreadsheetApp.flush();
}

// ── Read events ──────────────────────────────────────────────
// Header row 2, data from row 3
// Cols: A=#, B=Event Name, C=Date, D=Time, E=Venue, F=Notes, G=Status
function getEvents(ss) {
  var ws = ss.getSheetByName(SHEETS.events);
  if (!ws) return [];
  var lastRow = ws.getLastRow();
  if (lastRow < 3) return [];
  var data = ws.getRange(3, 1, lastRow - 2, 7).getValues();
  var events = [];
  for (var i = 0; i < data.length; i++) {
    var r = data[i];
    if (!r[1]) continue;
    var dateVal = '';
    if (r[2] instanceof Date) {
      dateVal = Utilities.formatDate(r[2], Session.getScriptTimeZone(), 'yyyy-MM-dd');
    } else if (r[2]) {
      dateVal = r[2].toString();
    }
    events.push({
      row:    i + 3,
      no:     r[0],
      name:   r[1],
      date:   dateVal,
      time:   r[3],
      venue:  r[4],
      notes:  r[5],
      status: r[6] || 'Upcoming'
    });
  }
  return events;
}

function addEvent(ss, data) {
  var ws = ss.getSheetByName(SHEETS.events);
  var lastRow = ws.getLastRow() + 1;
  ws.getRange(lastRow, 1, 1, 7).setValues([[
    lastRow - 2, data.name || '', data.date || '',
    data.time || '', data.venue || '', data.notes || '', data.status || 'Upcoming'
  ]]);
  SpreadsheetApp.flush();
}

function updateEvent(ss, row, data) {
  var ws = ss.getSheetByName(SHEETS.events);
  ws.getRange(row, 2).setValue(data.name   || '');
  ws.getRange(row, 3).setValue(data.date   || '');
  ws.getRange(row, 4).setValue(data.time   || '');
  ws.getRange(row, 5).setValue(data.venue  || '');
  ws.getRange(row, 6).setValue(data.notes  || '');
  ws.getRange(row, 7).setValue(data.status || 'Upcoming');
  SpreadsheetApp.flush();
}

// ── Read tasks ───────────────────────────────────────────────
// Header row 2, data from row 3
// Cols: A=#, B=Task, C=Category, D=Assigned, E=Due, F=Status, G=Notes
function getTasks(ss) {
  var ws = ss.getSheetByName(SHEETS.tasks);
  if (!ws) return [];
  var lastRow = ws.getLastRow();
  if (lastRow < 3) return [];
  var data = ws.getRange(3, 1, lastRow - 2, 7).getValues();
  var tasks = [];
  for (var i = 0; i < data.length; i++) {
    var r = data[i];
    if (!r[1]) continue;
    var dueVal = '';
    if (r[4] instanceof Date) {
      dueVal = Utilities.formatDate(r[4], Session.getScriptTimeZone(), 'yyyy-MM-dd');
    } else if (r[4]) {
      dueVal = r[4].toString();
    }
    tasks.push({
      row:    i + 3,
      no:     r[0],
      text:   r[1],
      cat:    r[2],
      assign: r[3],
      due:    dueVal,
      status: r[5] || 'Pending',
      notes:  r[6],
      done:   (r[5] === 'Done')
    });
  }
  return tasks;
}

function addTask(ss, data) {
  var ws = ss.getSheetByName(SHEETS.tasks);
  var lastRow = ws.getLastRow() + 1;
  ws.getRange(lastRow, 1, 1, 7).setValues([[
    lastRow - 2, data.text || '', data.cat || 'Other',
    data.assign || '', data.due || '', data.status || 'Pending', data.notes || ''
  ]]);
  SpreadsheetApp.flush();
}

function updateTask(ss, row, data) {
  var ws = ss.getSheetByName(SHEETS.tasks);
  ws.getRange(row, 2).setValue(data.text   || '');
  ws.getRange(row, 3).setValue(data.cat    || '');
  ws.getRange(row, 4).setValue(data.assign || '');
  ws.getRange(row, 5).setValue(data.due    || '');
  ws.getRange(row, 6).setValue(data.status || 'Pending');
  ws.getRange(row, 7).setValue(data.notes  || '');
  SpreadsheetApp.flush();
}

// ── Read expenses ────────────────────────────────────────────
// Header row 2, data from row 3
// Cols: A=#, B=Item, C=Category, D=Budgeted, E=Actual, F=Diff, G=Status, H=Notes
function getExpenses(ss) {
  var ws = ss.getSheetByName(SHEETS.expenses);
  if (!ws) return [];
  var lastRow = ws.getLastRow();
  if (lastRow < 3) return [];
  var data = ws.getRange(3, 1, lastRow - 2, 8).getValues();
  var expenses = [];
  for (var i = 0; i < data.length; i++) {
    var r = data[i];
    if (!r[1]) continue;
    expenses.push({
      row:    i + 3,
      no:     r[0],
      name:   r[1],
      cat:    r[2],
      budget: r[3] || 0,
      actual: r[4] || 0,
      diff:   r[5] || 0,
      status: r[6] || 'Pending',
      notes:  r[7]
    });
  }
  return expenses;
}

function addExpense(ss, data) {
  var ws = ss.getSheetByName(SHEETS.expenses);
  var lastRow = ws.getLastRow() + 1;
  var budget = parseFloat(data.budget) || 0;
  var actual = parseFloat(data.actual) || 0;
  ws.getRange(lastRow, 1, 1, 8).setValues([[
    lastRow - 2, data.name || '', data.cat || '',
    budget, actual, budget - actual,
    data.status || 'Pending', data.notes || ''
  ]]);
  SpreadsheetApp.flush();
}

function updateExpense(ss, row, data) {
  var ws = ss.getSheetByName(SHEETS.expenses);
  var budget = parseFloat(data.budget) || 0;
  var actual = parseFloat(data.actual) || 0;
  ws.getRange(row, 2).setValue(data.name   || '');
  ws.getRange(row, 3).setValue(data.cat    || '');
  ws.getRange(row, 4).setValue(budget);
  ws.getRange(row, 5).setValue(actual);
  ws.getRange(row, 6).setValue(budget - actual);
  ws.getRange(row, 7).setValue(data.status || 'Pending');
  ws.getRange(row, 8).setValue(data.notes  || '');
  SpreadsheetApp.flush();
}
