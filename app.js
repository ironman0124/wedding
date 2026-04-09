/* ══════════════════════════════════════════════
   WEDDING PLANNER — app.js
   Dharmesh & Nalishka
   ironman0124.github.io/wedding
══════════════════════════════════════════════ */

// ── AUTH ──────────────────────────────────────
const CREDENTIALS = { username: 'ironman0124', password: 'Ironman!2401' };

function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  const err = document.getElementById('login-error');
  if (u === CREDENTIALS.username && p === CREDENTIALS.password) {
    sessionStorage.setItem('wpa_auth', '1');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    initApp();
  } else {
    err.textContent = 'Incorrect username or password.';
    document.getElementById('login-pass').value = '';
    setTimeout(() => err.textContent = '', 3000);
  }
}

function doLogout() {
  sessionStorage.removeItem('wpa_auth');
  location.reload();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !document.getElementById('login-screen').style.display) doLogin();
});

// Auto-login if session active
if (sessionStorage.getItem('wpa_auth') === '1') {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
  initApp();
}

// ── DATA ──────────────────────────────────────
const RAW_GUESTS = [
  {no:1,name:'Narendrabhai',surname:'Patel',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:2,name:'Champabhen',surname:'Patel',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:3,name:'Sandip',surname:'Patel',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:4,name:'Ashwinbhai',surname:'Morker',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:5,name:'Riya',surname:'Morker',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:6,name:'Harshil',surname:'Morker',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:7,name:'Bhavika',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:8,name:'Manoj',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:9,name:'Drisha',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:10,name:'Manoj Mom',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:11,name:'Manoj Dad',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:12,name:'Ravin',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:13,name:'Heenabhen',surname:'Parmar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:14,name:'Heenabhen Jiju',surname:'Parmar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:15,name:'Karan',surname:'Parmar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:16,name:'India Foi',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:17,name:'India Fuwa',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:'Peethi – confirm if we send over'},
  {no:18,name:'Bahradfoibhen',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:19,name:'Darshan',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:20,name:'Bhavika',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:21,name:'Darshan Kid',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:22,name:'Darshan Kid 2',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:23,name:'Naleenbhai',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:24,name:'Naleen wife',surname:'Lala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:25,name:'Neetiya',surname:'Lala',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional guest'},
  {no:26,name:'Vidya',surname:'Lala',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional guest'},
  {no:27,name:'Sushilabhen',surname:'Vala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:28,name:'Sureshbhai',surname:'Vala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:29,name:'Omeshabhai',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:30,name:'Sushilafoi Daughter 1',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:31,name:'2nd daughter',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:32,name:'Sushilafoi Daughter 2',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:33,name:'Husband',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:34,name:'2nd daughter',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:35,name:'Meelan',surname:'Vala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:36,name:'Meelan wife',surname:'Vala',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:37,name:'Dharmistabhen',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:38,name:'Dharmista fuwa',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:39,name:'Jignesh',surname:'Patil',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:40,name:'Nikita',surname:'Patil',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:41,name:'Hriti',surname:'Patil',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:42,name:'Tahan',surname:'Patil',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:'Popcorn ritual'},
  {no:43,name:'Menaximasi',surname:'Makan',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:44,name:'Masaji',surname:'Makan',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:45,name:'Neeta',surname:'Makan',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:46,name:'Deepa',surname:'Daya',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:47,name:'Prashil',surname:'Daya',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:48,name:'Rushi',surname:'Pandya',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:49,name:'Neerali',surname:'Pandya',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:50,name:'Kritibhai Guriji',surname:'Pandya',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:51,name:'Smurtimasi',surname:'Pandya',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:52,name:'Neerali Dad',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:53,name:'Neerali Mom',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:54,name:'Neerali sister Diya',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:55,name:'Jeetan',surname:'Morar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:56,name:'Parusha',surname:'Morar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:57,name:'Jeetan dad',surname:'Morar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:58,name:'Jeetan mom',surname:'Morar',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:59,name:'Jayeshkaka',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:60,name:'Reenamasi',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:61,name:'Laxamini',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:62,name:'Krishna',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:63,name:'Harishbhai',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:64,name:'Anitakaki',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:65,name:'Bhartikaki',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:66,name:'Kasheera',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:67,name:'Divina',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:68,name:'Poonamasi',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:69,name:'Baa',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:70,name:'Shina',surname:'Kara',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:71,name:'Hemisha',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:72,name:'Bavik',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:73,name:'Hemaxibhen',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:74,name:'Darmendrabhai',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:75,name:'Shivani',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:76,name:'Nandani',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:77,name:'Neetabhen',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:78,name:'Kundanbhen',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:79,name:'Kamanibhen',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:80,name:"Harish's Mom",surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:81,name:'Heetumasa',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:82,name:'Jasheel mom',surname:'',group:'Family',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:83,name:'Jasheel',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:84,name:'Rushil',surname:'',group:'Family',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:85,name:'Zulfa',surname:'Allie',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:86,name:'Hassan',surname:'Allie',group:'Friends',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:87,name:'Yacoob',surname:'Mohamad',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:88,name:'Sumaya',surname:'Mohamad',group:'Friends',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:89,name:'Nabeelah',surname:'David',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:90,name:'Samantha',surname:'Gouw',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:91,name:'Gavin',surname:'Mandel',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:92,name:'Harley',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:93,name:'Sage',surname:'David',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:94,name:'Nabeelah',surname:'David',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:95,name:'Asher',surname:'David',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:96,name:'Aneri',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:97,name:'Heath',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:98,name:'Tarryn',surname:'',group:'Friends',table:'',rsvp:'Optional',invite:'No',diet:'',contact:'',notes:'Optional'},
  {no:99,name:'Joshy',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:100,name:'Joshy + 1',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:101,name:'Joshy Kid',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:102,name:'Adi',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:103,name:'Adi + 1',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:104,name:'Adi kid',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:105,name:'Habib',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:106,name:'Habib + 1',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:107,name:'Habib kid',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:108,name:'Khaleed',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:109,name:'Khaleed + 1',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
  {no:110,name:'Khaleed Kid',surname:'',group:'Friends',table:'',rsvp:'Pending',invite:'No',diet:'',contact:'',notes:''},
];

const RAW_TASKS = [
  {id:1,text:'Tahan to do the popcorn ritual (2 families become one)',cat:'Ceremony',assign:'Tahan',due:'',done:false},
  {id:2,text:'Prepare money envelopes × shoes – Wedding',cat:'Guest',assign:'Bhavna & Kavi',due:'',done:false},
  {id:3,text:'Prepare money envelopes × shoes – Girls & Boys',cat:'Guest',assign:'Girls & Boys',due:'',done:false},
  {id:4,text:'Prepare money envelopes × home – Durban',cat:'Guest',assign:'Bhavna & Kavi',due:'',done:false},
  {id:5,text:'Prepare money envelopes × home – Cape Town',cat:'Guest',assign:'Bhavi & Riya',due:'',done:false},
  {id:6,text:'Gift Exchange ×5 or ×7 – confirm number',cat:'Ceremony',assign:'',due:'',done:false},
  {id:7,text:'1 tray outfit from the outfit (Panjabi)',cat:'Attire',assign:'',due:'',done:false},
  {id:8,text:'Confirm flight timing after wedding day',cat:'Logistics',assign:'',due:'',done:false},
  {id:9,text:'Arrange Jeet & Jeetani – small gift? Confirm with Darshanbhai',cat:'Ceremony',assign:'',due:'',done:false},
  {id:10,text:'Pawapuja ×2 – Sandip, Jiggy',cat:'Ceremony',assign:'',due:'',done:false},
  {id:11,text:'On-stage arrangement: Harshil (Manoj side)',cat:'Ceremony',assign:'Harshil',due:'',done:false},
  {id:12,text:'Peethi – confirm if we send over (India Foi & Fuwa)',cat:'Ceremony',assign:'',due:'',done:false},
  {id:13,text:'Set up Google Form for RSVPs',cat:'Logistics',assign:'',due:'',done:false},
  {id:14,text:'Send out wedding invitations',cat:'Logistics',assign:'',due:'',done:false},
  {id:15,text:'Book photographer & videographer',cat:'Vendor',assign:'',due:'',done:false},
  {id:16,text:'Confirm caterer – menu & headcount',cat:'Vendor',assign:'',due:'',done:false},
  {id:17,text:'Build table seating plan',cat:'Logistics',assign:'',due:'',done:false},
  {id:18,text:'Order wedding cake',cat:'Vendor',assign:'',due:'',done:false},
  {id:19,name:'Arrange transport / shuttle for guests',cat:'Logistics',assign:'',due:'',done:false},
  {id:20,text:'Book hair & makeup',cat:'Attire',assign:'',due:'',done:false},
];
RAW_TASKS.forEach(t => { if(!t.text && t.name) t.text = t.name; });

const RAW_EVENTS = [
  {id:1,name:'Mehendi / Haldi Ceremony',date:'',time:'',venue:'',notes:'Pre-wedding function'},
  {id:2,name:'Sangeet Night',date:'',time:'',venue:'',notes:'Music & dancing evening'},
  {id:3,name:'Wedding Ceremony',date:'',time:'',venue:'',notes:'Main ceremony – Dharmesh & Nalishka'},
  {id:4,name:'Reception',date:'',time:'',venue:'',notes:'Evening celebration'},
  {id:5,name:'Post-Wedding Brunch',date:'',time:'',venue:'',notes:'Day-after celebration'},
];

const RAW_EXPENSES = [
  {id:1,name:'Venue hire',cat:'Venue',budget:0,actual:0,status:'Pending',notes:''},
  {id:2,name:'Catering',cat:'Catering',budget:0,actual:0,status:'Pending',notes:''},
  {id:3,name:'Bride attire',cat:'Attire – Bride',budget:0,actual:0,status:'Pending',notes:''},
  {id:4,name:'Groom attire',cat:'Attire – Groom',budget:0,actual:0,status:'Pending',notes:''},
  {id:5,name:'Photography',cat:'Photography',budget:0,actual:0,status:'Pending',notes:''},
  {id:6,name:'Videography',cat:'Videography',budget:0,actual:0,status:'Pending',notes:''},
  {id:7,name:'Flowers & Decor',cat:'Flowers / Decor',budget:0,actual:0,status:'Pending',notes:''},
  {id:8,name:'Music / DJ',cat:'Music / DJ',budget:0,actual:0,status:'Pending',notes:''},
  {id:9,name:'Transport',cat:'Transport',budget:0,actual:0,status:'Pending',notes:''},
  {id:10,name:'Invitations',cat:'Invitations',budget:0,actual:0,status:'Pending',notes:''},
];

// ── STATE ─────────────────────────────────────
let guests   = JSON.parse(localStorage.getItem('wpa_guests')   || 'null') || JSON.parse(JSON.stringify(RAW_GUESTS));
let tasks    = JSON.parse(localStorage.getItem('wpa_tasks')    || 'null') || JSON.parse(JSON.stringify(RAW_TASKS));
let events   = JSON.parse(localStorage.getItem('wpa_events')   || 'null') || JSON.parse(JSON.stringify(RAW_EVENTS));
let expenses = JSON.parse(localStorage.getItem('wpa_expenses') || 'null') || JSON.parse(JSON.stringify(RAW_EXPENSES));
let editGuestId = null;
let nextGuestId = Math.max(...guests.map(g=>g.no)) + 1;

function save() {
  localStorage.setItem('wpa_guests',   JSON.stringify(guests));
  localStorage.setItem('wpa_tasks',    JSON.stringify(tasks));
  localStorage.setItem('wpa_events',   JSON.stringify(events));
  localStorage.setItem('wpa_expenses', JSON.stringify(expenses));
}

// ── INIT ──────────────────────────────────────
function initApp() {
  renderDashboard();
  renderGuests();
  renderEvents();
  renderTasks('','');
  renderExpenses();
  populateFamilyFilter();
}

// ── NAV ───────────────────────────────────────
const SECTION_TITLES = {
  dashboard: 'Dashboard',
  guests: 'Guest List',
  events: 'Events & Function Dates',
  tasks: 'To-Do List',
  expenses: 'Expense Tracker',
};

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById('sec-' + id).classList.add('active');
  document.querySelector(`[data-section="${id}"]`).classList.add('active');
  document.getElementById('topbar-title').textContent = SECTION_TITLES[id] || id;
  if (id === 'dashboard') renderDashboard();
  if (window.innerWidth < 768) closeSidebar();
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('open');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
}

// ── HELPERS ───────────────────────────────────
function rsvpBadge(r) {
  const map = { Yes:'badge-yes', No:'badge-no', Pending:'badge-pending', Optional:'badge-optional' };
  return `<span class="badge ${map[r]||'badge-pending'}">${r}</span>`;
}

function fmt(n) { return Number(n||0).toLocaleString('en-ZA'); }

function formatDate(d) {
  if (!d) return 'TBD';
  try { return new Date(d).toLocaleDateString('en-ZA', {weekday:'short',day:'numeric',month:'long',year:'numeric'}); }
  catch(e) { return d; }
}

// ── DASHBOARD ─────────────────────────────────
function renderDashboard() {
  const total    = guests.length;
  const confirmed= guests.filter(g=>g.rsvp==='Yes').length;
  const pending  = guests.filter(g=>g.rsvp==='Pending').length;
  const declined = guests.filter(g=>g.rsvp==='No').length;
  const optional = guests.filter(g=>g.rsvp==='Optional').length;
  const tasksDone= tasks.filter(t=>t.done).length;
  const totalBudget = expenses.reduce((a,e)=>a+Number(e.budget||0),0);

  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card gold"><div class="stat-label">TOTAL GUESTS</div><div class="stat-value">${total}</div></div>
    <div class="stat-card green"><div class="stat-label">CONFIRMED YES</div><div class="stat-value">${confirmed}</div></div>
    <div class="stat-card orange"><div class="stat-label">AWAITING RSVP</div><div class="stat-value">${pending}</div></div>
    <div class="stat-card red"><div class="stat-label">DECLINED</div><div class="stat-value">${declined}</div></div>
    <div class="stat-card gray"><div class="stat-label">OPTIONAL</div><div class="stat-value">${optional}</div></div>
    <div class="stat-card blue"><div class="stat-label">TASKS DONE</div><div class="stat-value">${tasksDone}/${tasks.length}</div></div>
  `;

  // RSVP bars
  const bars = [
    {label:'Confirmed', val:confirmed, color:'#27AE60'},
    {label:'Pending',   val:pending,   color:'#E67E22'},
    {label:'Optional',  val:optional,  color:'#5A5248'},
    {label:'Declined',  val:declined,  color:'#C0392B'},
  ];
  document.getElementById('rsvp-bars').innerHTML = bars.map(b => `
    <div class="rsvp-bar-item">
      <div class="rsvp-bar-label"><span>${b.label}</span><span style="color:${b.color};font-weight:600;">${b.val}</span></div>
      <div class="rsvp-bar-track"><div class="rsvp-bar-fill" style="width:${total?Math.round(b.val/total*100):0}%;background:${b.color};"></div></div>
    </div>`).join('');

  // Upcoming events
  const upcoming = events.filter(e=>e.date).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,3);
  document.getElementById('dash-events').innerHTML = upcoming.length
    ? upcoming.map(e=>`<div class="event-item"><div class="event-item-name">${e.name}</div><div class="event-item-meta">${formatDate(e.date)} ${e.time?'· '+e.time:''} ${e.venue?'· '+e.venue:''}</div></div>`).join('')
    : `<div class="event-item"><div class="event-item-meta">No event dates set yet — add them in Events & Dates</div></div>`;

  // Outstanding tasks
  const pending_tasks = tasks.filter(t=>!t.done).slice(0,5);
  document.getElementById('dash-tasks').innerHTML = pending_tasks.length
    ? pending_tasks.map(t=>`<div class="task-item"><div class="task-check ${t.done?'done':''}" onclick="quickToggleTask(${t.id})">${t.done?'✓':''}</div><div><div class="task-text">${t.text}</div><div class="task-meta">${t.cat}${t.assign?' · '+t.assign:''}</div></div></div>`).join('')
    : `<div class="empty-state">All tasks complete! 🎉</div>`;

  // Budget
  const paid = expenses.filter(e=>e.status==='Paid').reduce((a,e)=>a+Number(e.actual||0),0);
  document.getElementById('dash-budget').innerHTML = `
    <div style="display:grid;gap:0.75rem;">
      <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Total budgeted</span><span style="color:var(--gold);font-weight:600;">R ${fmt(totalBudget)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;"><span style="color:var(--text-muted);">Paid so far</span><span style="color:#27AE60;font-weight:600;">R ${fmt(paid)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;border-top:1px solid var(--border);padding-top:0.75rem;"><span style="color:var(--text-muted);">Outstanding</span><span style="color:#E67E22;font-weight:600;">R ${fmt(totalBudget-paid)}</span></div>
    </div>`;

  // Badges
  document.getElementById('badge-guests').textContent = total;
  const pendingTasks = tasks.filter(t=>!t.done).length;
  const tb = document.getElementById('badge-tasks');
  tb.textContent = pendingTasks;
  tb.style.display = pendingTasks ? 'inline-block' : 'none';
}

function quickToggleTask(id) {
  const t = tasks.find(x=>x.id===id);
  if(t) { t.done = !t.done; save(); renderDashboard(); }
}

// ── GUESTS ────────────────────────────────────
function populateFamilyFilter() {
  const fams = [...new Set(guests.map(g=>g.surname).filter(Boolean))].sort();
  const ff = document.getElementById('fam-filter');
  ff.innerHTML = '<option value="">All families</option>' + fams.map(f=>`<option>${f}</option>`).join('');
}

function renderGuests() {
  const q    = (document.getElementById('guest-search')?.value || '').toLowerCase();
  const fam  = document.getElementById('fam-filter')?.value || '';
  const rsvp = document.getElementById('rsvp-filter')?.value || '';

  let list = guests.filter(g => {
    const nm = (g.name+' '+g.surname).toLowerCase();
    return (!q || nm.includes(q)) && (!fam || g.surname===fam) && (!rsvp || g.rsvp===rsvp);
  });

  document.getElementById('guest-tbody').innerHTML = list.map(g => `
    <tr>
      <td style="color:var(--text-muted);font-size:12px;">${g.no}</td>
      <td><strong>${g.name}</strong> ${g.surname?`<span style="color:var(--text-muted)">${g.surname}</span>`:''}</td>
      <td style="color:var(--text-muted);font-size:12px;">${g.surname||'-'}</td>
      <td style="color:var(--text-muted);">${g.table||'–'}</td>
      <td>${rsvpBadge(g.rsvp)}</td>
      <td><span class="badge ${g.invite==='Yes'?'badge-yes':'badge-no'}">${g.invite||'No'}</span></td>
      <td style="color:var(--text-muted);font-size:12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${g.notes||''}</td>
      <td>
        <button class="btn-icon" onclick="editGuest(${g.no})" title="Edit">✎</button>
        <button class="btn-icon" style="color:var(--red-dark);" onclick="deleteGuest(${g.no})" title="Delete">✕</button>
      </td>
    </tr>`).join('') || `<tr><td colspan="8" class="empty-state">No guests found</td></tr>`;

  document.getElementById('guest-count').textContent = `Showing ${list.length} of ${guests.length} guests`;
}

function clearGuestForm() {
  ['g-name','g-surname','g-table','g-diet','g-contact','g-notes'].forEach(id => {
    const el = document.getElementById(id); if(el) el.value='';
  });
  document.getElementById('g-group').value = 'Family';
  document.getElementById('g-rsvp').value  = 'Pending';
  document.getElementById('g-invite').value= 'No';
}

function editGuest(no) {
  editGuestId = no;
  const g = guests.find(x=>x.no===no);
  if (!g) return;
  document.getElementById('guest-modal-title').textContent = 'Edit Guest';
  document.getElementById('g-name').value    = g.name;
  document.getElementById('g-surname').value = g.surname;
  document.getElementById('g-group').value   = g.group||'Family';
  document.getElementById('g-table').value   = g.table;
  document.getElementById('g-rsvp').value    = g.rsvp;
  document.getElementById('g-invite').value  = g.invite||'No';
  document.getElementById('g-diet').value    = g.diet||'';
  document.getElementById('g-contact').value = g.contact||'';
  document.getElementById('g-notes').value   = g.notes||'';
  openModal('modal-guest');
}

function saveGuest() {
  const name = document.getElementById('g-name').value.trim();
  if (!name) return;
  const data = {
    name, surname: document.getElementById('g-surname').value.trim(),
    group: document.getElementById('g-group').value,
    table: document.getElementById('g-table').value,
    rsvp: document.getElementById('g-rsvp').value,
    invite: document.getElementById('g-invite').value,
    diet: document.getElementById('g-diet').value.trim(),
    contact: document.getElementById('g-contact').value.trim(),
    notes: document.getElementById('g-notes').value.trim(),
  };
  if (editGuestId) {
    const g = guests.find(x=>x.no===editGuestId);
    if(g) Object.assign(g, data);
  } else {
    guests.push({ no: nextGuestId++, ...data });
  }
  save(); closeModal('modal-guest'); renderGuests(); populateFamilyFilter(); renderDashboard();
}

function deleteGuest(no) {
  if (!confirm('Remove this guest?')) return;
  guests = guests.filter(g=>g.no!==no);
  save(); renderGuests(); renderDashboard();
}

// ── EVENTS ────────────────────────────────────
function renderEvents() {
  const sorted = [...events].sort((a,b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });
  document.getElementById('events-list').innerHTML = sorted.map(e => `
    <div class="event-card">
      <div>
        <div class="event-card-name">${e.name}</div>
        <div class="event-card-meta">${formatDate(e.date)}${e.time?' · '+e.time:''}${e.venue?' · '+e.venue:''}</div>
        ${e.notes?`<div class="event-card-meta" style="margin-top:4px;">${e.notes}</div>`:''}
      </div>
      <div style="display:flex;gap:6px;flex-shrink:0;">
        <button class="btn-icon" onclick="editEvent(${e.id})">✎</button>
        <button class="btn-icon" style="color:var(--red-dark);" onclick="deleteEvent(${e.id})">✕</button>
      </div>
    </div>`).join('') || `<div class="empty-state">No events added yet</div>`;
}

function editEvent(id) {
  const e = events.find(x=>x.id===id);
  if(!e) return;
  document.getElementById('ev-name').value  = e.name;
  document.getElementById('ev-date').value  = e.date;
  document.getElementById('ev-time').value  = e.time;
  document.getElementById('ev-venue').value = e.venue;
  document.getElementById('ev-notes').value = e.notes;
  openModal('modal-event');
  window._editEventId = id;
}

function saveEvent() {
  const name = document.getElementById('ev-name').value.trim();
  if (!name) return;
  const data = {
    name, date: document.getElementById('ev-date').value,
    time: document.getElementById('ev-time').value.trim(),
    venue: document.getElementById('ev-venue').value.trim(),
    notes: document.getElementById('ev-notes').value.trim(),
  };
  if (window._editEventId) {
    const e = events.find(x=>x.id===window._editEventId);
    if(e) Object.assign(e, data);
    window._editEventId = null;
  } else {
    events.push({ id: Date.now(), ...data });
  }
  save(); closeModal('modal-event'); renderEvents(); renderDashboard();
}

function deleteEvent(id) {
  if (!confirm('Remove this event?')) return;
  events = events.filter(e=>e.id!==id);
  save(); renderEvents(); renderDashboard();
}

// ── TASKS ─────────────────────────────────────
function renderTasks(statusF, catF) {
  statusF = statusF ?? document.getElementById('task-status-filter')?.value ?? '';
  catF    = catF    ?? document.getElementById('task-cat-filter')?.value ?? '';

  const list = tasks.filter(t =>
    (!statusF || (statusF==='Done'?t.done:!t.done)) &&
    (!catF || t.cat===catF)
  );

  document.getElementById('task-list').innerHTML = list.map(t => `
    <div class="task-item" style="background:var(--dark2);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:0.5rem;padding:0.9rem 1rem;">
      <div class="task-check ${t.done?'done':''}" onclick="toggleTask(${t.id})">${t.done?'✓':''}</div>
      <div style="flex:1;">
        <div class="task-text ${t.done?'done':''}">${t.text}</div>
        <div class="task-meta">${t.cat}${t.assign?' · '+t.assign:''}${t.due?' · Due '+formatDate(t.due):''}</div>
      </div>
      <button class="btn-icon" style="color:var(--red-dark);" onclick="deleteTask(${t.id})">✕</button>
    </div>`).join('') || `<div class="empty-state">No tasks found 🎉</div>`;
}

function toggleTask(id) {
  const t = tasks.find(x=>x.id===id);
  if(t) { t.done=!t.done; save(); renderTasks(); renderDashboard(); }
}

function saveTask() {
  const text = document.getElementById('t-text').value.trim();
  if (!text) return;
  tasks.push({
    id: Date.now(), text,
    cat: document.getElementById('t-cat').value,
    assign: document.getElementById('t-assign').value.trim(),
    due: document.getElementById('t-due').value,
    done: false,
  });
  save(); closeModal('modal-task'); renderTasks(); renderDashboard();
}

function deleteTask(id) {
  tasks = tasks.filter(t=>t.id!==id);
  save(); renderTasks(); renderDashboard();
}

// ── EXPENSES ──────────────────────────────────
function renderExpenses() {
  const totalB = expenses.reduce((a,e)=>a+Number(e.budget||0),0);
  const totalA = expenses.reduce((a,e)=>a+Number(e.actual||0),0);
  const paid   = expenses.filter(e=>e.status==='Paid').reduce((a,e)=>a+Number(e.actual||0),0);

  document.getElementById('expense-stats').innerHTML = `
    <div class="stat-card gold"><div class="stat-label">TOTAL BUDGETED</div><div class="stat-value" style="font-size:1.4rem;">R ${fmt(totalB)}</div></div>
    <div class="stat-card green"><div class="stat-label">TOTAL ACTUAL</div><div class="stat-value" style="font-size:1.4rem;">R ${fmt(totalA)}</div></div>
    <div class="stat-card green"><div class="stat-label">PAID</div><div class="stat-value" style="font-size:1.4rem;">R ${fmt(paid)}</div></div>
    <div class="stat-card orange"><div class="stat-label">OUTSTANDING</div><div class="stat-value" style="font-size:1.4rem;">R ${fmt(totalB-paid)}</div></div>
  `;

  document.getElementById('expense-tbody').innerHTML = expenses.map((e,i) => {
    const diff = Number(e.budget||0) - Number(e.actual||0);
    const diffColor = diff >= 0 ? '#27AE60' : '#C0392B';
    const stBadge = e.status==='Paid'?'badge-paid': e.status==='Deposit Paid'?'badge-deposit':'badge-pending';
    return `<tr>
      <td style="color:var(--text-muted);font-size:12px;">${i+1}</td>
      <td><strong>${e.name}</strong>${e.notes?`<div style="font-size:11px;color:var(--text-muted);">${e.notes}</div>`:''}</td>
      <td style="font-size:12px;color:var(--text-muted);">${e.cat}</td>
      <td style="color:var(--gold);">R ${fmt(e.budget)}</td>
      <td>R ${fmt(e.actual)}</td>
      <td style="color:${diffColor};font-weight:600;">R ${fmt(Math.abs(diff))} ${diff<0?'▲':'▼'}</td>
      <td><span class="badge ${stBadge}">${e.status}</span></td>
      <td>
        <button class="btn-icon" onclick="editExpense(${e.id})">✎</button>
        <button class="btn-icon" style="color:var(--red-dark);" onclick="deleteExpense(${e.id})">✕</button>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="8" class="empty-state">No expenses yet</td></tr>`;
}

function editExpense(id) {
  const e = expenses.find(x=>x.id===id);
  if(!e) return;
  document.getElementById('ex-name').value   = e.name;
  document.getElementById('ex-cat').value    = e.cat;
  document.getElementById('ex-status').value = e.status;
  document.getElementById('ex-budget').value = e.budget;
  document.getElementById('ex-actual').value = e.actual;
  document.getElementById('ex-notes').value  = e.notes||'';
  window._editExpenseId = id;
  openModal('modal-expense');
}

function saveExpense() {
  const name = document.getElementById('ex-name').value.trim();
  if (!name) return;
  const data = {
    name,
    cat:    document.getElementById('ex-cat').value,
    status: document.getElementById('ex-status').value,
    budget: parseFloat(document.getElementById('ex-budget').value) || 0,
    actual: parseFloat(document.getElementById('ex-actual').value) || 0,
    notes:  document.getElementById('ex-notes').value.trim(),
  };
  if (window._editExpenseId) {
    const e = expenses.find(x=>x.id===window._editExpenseId);
    if(e) Object.assign(e, data);
    window._editExpenseId = null;
  } else {
    expenses.push({ id: Date.now(), ...data });
  }
  save(); closeModal('modal-expense'); renderExpenses(); renderDashboard();
}

function deleteExpense(id) {
  if (!confirm('Remove this expense?')) return;
  expenses = expenses.filter(e=>e.id!==id);
  save(); renderExpenses(); renderDashboard();
}

// ── MODALS ────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  window._editEventId = null;
  window._editExpenseId = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});
