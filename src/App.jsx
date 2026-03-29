import { useState, useEffect } from "react";

/* ─── GOOGLE FONTS ─────────────────────────────────────────── */
const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;0,700;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
);

const ISun    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const IMoon   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = ({ isDark }) => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: #2563EB; --primary-hover: #1D4ED8;
      --bg: ${isDark ? '#0F172A' : '#F5F5F5'};
      --surface: ${isDark ? '#1E293B' : '#FFFFFF'};
      --border: ${isDark ? '#334155' : '#E8E8E8'};
      --text-main: ${isDark ? '#F8FAFC' : '#1a1a1a'};
      --text-sec: ${isDark ? '#94A3B8' : '#9CA3AF'};
      --sidebar-bg: ${isDark ? '#0B0F19' : '#FCFCFC'};
      --black: ${isDark ? '#F8FAFC' : '#0A0A0A'};
      --white: ${isDark ? '#1E293B' : '#fff'};
      --sidebar-w: 240px;
      --blood: #EF4444; --blood-bg: rgba(239,68,68,0.07);
      --plant: #2563EB; --plant-bg: rgba(37,99,235,0.07);
      --clean: #06B6D4; --clean-bg: rgba(6,182,212,0.07);
      --social: #F59E0B; --social-bg: rgba(245,158,11,0.07);
      --aware: #8B5CF6; --aware-bg: rgba(139,92,246,0.07);
    }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text-main); -webkit-font-smoothing: antialiased; transition: background 0.3s, color 0.3s; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn { from { opacity:0; transform:scale(0.93); } to { opacity:1; transform:scale(1); } }
    @keyframes popIn { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.18)} 100%{transform:scale(1);opacity:1} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes floatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
    @keyframes progressFill { from{width:0} to{width:var(--target-w)} }
    @keyframes slideInLeft { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

    .fade-up { animation: fadeUp 0.38s ease both; }
    .fade-in { animation: fadeIn 0.25s ease both; }
    .scale-in { animation: scaleIn 0.32s cubic-bezier(0.34,1.56,0.64,1) both; }

    .page-padding { padding: 24px 28px 40px; max-width: 1100px; margin: 0 auto; }
    .main-content { margin-left: var(--sidebar-w); transition: margin-left 0.25s cubic-bezier(0.4,0,0.2,1); min-height: 100vh; display: flex; flex-direction: column; }
    .main-content.collapsed { margin-left: 72px; }

    @media (max-width: 768px) {
      .page-padding { padding: 16px 16px 24px; }
      .main-content, .main-content.collapsed { margin-left: 0 !important; padding-bottom: 74px; }
    }
  `}</style>
);

/* ─── DATA ──────────────────────────────────────────────────── */
const CAT_CFG = {
  blood:     { color:'var(--blood)', bg:'var(--blood-bg)',   label:'Blood Drive' },
  plantation:{ color:'var(--plant)', bg:'var(--plant-bg)',   label:'Plantation'  },
  cleanup:   { color:'var(--clean)', bg:'var(--clean-bg)',  label:'Cleanup'     },
  social:    { color:'var(--social)', bg:'var(--social-bg)',  label:'Social Help' },
  awareness: { color:'var(--aware)', bg:'var(--aware-bg)', label:'Awareness'   },
};

const EVENTS = [
  { id:1, cat:'blood',      title:'City Blood Drive',        desc:'Help save lives by donating blood at Kharghar hospital\'s quarterly camp. Every drop counts.',    loc:'Kharghar, Navi Mumbai',    date:'Apr 5',  time:'9 AM – 1 PM',  joined:48,  total:100, pts:150, days:7,  organizer:'NSS Cell, NMMC',      reqs:['Age 18–65','Weight > 50 kg','No recent illness','Carry photo ID'] },
  { id:2, cat:'plantation', title:'Green Panvel Drive',      desc:'Plant saplings along the Panvel highway and help restore our urban greenery for future generations.', loc:'Panvel, Maharashtra',     date:'Apr 8',  time:'7 AM – 11 AM', joined:35,  total:60,  pts:100, days:10, organizer:'Panvel Nature Society',reqs:['Comfortable clothing','Bring water bottle','Gloves provided'] },
  { id:3, cat:'cleanup',    title:'Belapur Beach Cleanup',   desc:'Community effort to clean our coastline and protect marine life from plastic waste and debris.',  loc:'Belapur Beach, CBD',       date:'Apr 12', time:'6 AM – 9 AM',  joined:72,  total:120, pts:120, days:14, organizer:'Ocean Warriors NGO',   reqs:['Wear old clothes','Equipment provided','Bring sunscreen'] },
  { id:4, cat:'social',     title:'Clothes Donation Camp',   desc:'Donate unused clothes for underprivileged families in the region before the summer season.',      loc:'Sector 15, Kharghar',      date:'Apr 6',  time:'10 AM – 5 PM', joined:25,  total:50,  pts:80,  days:8,  organizer:'Helping Hands Trust', reqs:['Washed clothing only','Label by size if possible'] },
  { id:5, cat:'awareness',  title:'Cyber Safety Workshop',   desc:'Free workshop on internet safety, phishing awareness, and data protection for all ages.',         loc:'Community Hall, Ulwe',     date:'Apr 15', time:'4 PM – 6 PM',  joined:18,  total:80,  pts:60,  days:17, organizer:'SafeNet India',       reqs:['Register online','Bring your smartphone'] },
  { id:6, cat:'blood',      title:'World Blood Donor Day',   desc:'Special drive in honour of World Blood Donor Day. Multiple donation centres across Navi Mumbai.',  loc:'Multiple Centres, NM',     date:'Jun 14', time:'8 AM – 6 PM',  joined:90,  total:200, pts:200, days:77, organizer:'Red Cross India',      reqs:['Valid ID required','Eat well before coming','Bring emergency contact'] },
  { id:7, cat:'plantation', title:'School Sapling Program',  desc:'Help school children plant their first sapling and nurture it throughout the academic year.',      loc:'DAV School, Panvel',       date:'Apr 20', time:'8 AM – 10 AM', joined:12,  total:40,  pts:90,  days:22, organizer:'GreenFuture NGO',     reqs:['Parents welcome','Tools provided'] },
  { id:8, cat:'cleanup',    title:'Railway Track Cleanup',   desc:'Remove litter from the railway tracks and surrounding areas with the help of volunteers.',        loc:'Panvel Railway Station',   date:'Apr 18', time:'5 AM – 8 AM',  joined:30,  total:75,  pts:110, days:20, organizer:'Clean Rail India',    reqs:['Gloves mandatory','Comfortable shoes','ID card'] },
];

const LEADERBOARD = [
  { id:1, name:'Priya Nair',       pts:1240, events:14, avatar:'PN', color:'#22C55E' },
  { id:2, name:'Arjun Shah',       pts:980,  events:11, avatar:'AS', color:'#3B82F6', you:true },
  { id:3, name:'Meera Joshi',      pts:860,  events:9,  avatar:'MJ', color:'#8B5CF6' },
  { id:4, name:'Rohan Kulkarni',   pts:720,  events:8,  avatar:'RK', color:'#F59E0B' },
  { id:5, name:'Sunita Rao',       pts:680,  events:7,  avatar:'SR', color:'#EF4444' },
  { id:6, name:'Kiran Mehta',      pts:590,  events:6,  avatar:'KM', color:'#22C55E' },
  { id:7, name:'Deepak Sharma',    pts:420,  events:5,  avatar:'DS', color:'#3B82F6' },
];

const CERTS = [
  { id:1, title:'Beach Cleanup Hero', cat:'cleanup',    date:'Mar 2025', emoji:'🌊' },
  { id:2, title:'Green Volunteer',    cat:'plantation', date:'Feb 2025', emoji:'🌿' },
  { id:3, title:'Blood Donor Badge',  cat:'blood',      date:'Jan 2025', emoji:'🩸' },
];

const CATS = ['all','blood','plantation','cleanup','social','awareness'];

/* ─── SCRIBBLES ─────────────────────────────────────────────── */
const ScribbleBlood = () => (
  <svg viewBox="0 0 220 140" fill="none" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <path d="M35 95 C35 95 48 58 60 46 C72 34 84 68 60 80 C36 92 35 95 35 95Z" stroke="#EF4444" strokeWidth="2.5" fill="none"/>
    <path d="M90 82 C90 82 98 60 102 52 C106 44 113 64 104 73 C95 82 90 82 90 82Z" stroke="#EF4444" strokeWidth="1.8" fill="none"/>
    <circle cx="165" cy="45" r="22" stroke="#EF4444" strokeWidth="1.8" fill="none"/>
    <line x1="154" y1="45" x2="176" y2="45" stroke="#EF4444" strokeWidth="1.8"/>
    <line x1="165" y1="34" x2="165" y2="56" stroke="#EF4444" strokeWidth="1.8"/>
    <path d="M170 100 C182 88 200 94 200 106 C200 118 183 124 177 110" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeDasharray="3,3"/>
    <circle cx="52" cy="30" r="4" stroke="#EF4444" strokeWidth="1.5" fill="none"/>
    <circle cx="140" cy="110" r="6" stroke="#EF4444" strokeWidth="1.5" fill="none"/>
  </svg>
);
const ScribblePlant = () => (
  <svg viewBox="0 0 220 140" fill="none" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <path d="M45 110 L45 62 C45 38 22 26 22 26 C22 26 40 44 45 62" stroke="#22C55E" strokeWidth="2.5" fill="none"/>
    <path d="M45 85 C45 85 62 67 74 60 C86 53 80 78 64 84 C53 88 45 85 45 85Z" stroke="#22C55E" strokeWidth="1.8" fill="none"/>
    <path d="M110 110 C110 72 128 34 148 16 C166 34 178 72 178 110" stroke="#22C55E" strokeWidth="2.5" fill="none"/>
    <ellipse cx="146" cy="34" rx="26" ry="21" stroke="#22C55E" strokeWidth="1.8" fill="none" transform="rotate(-12,146,34)"/>
    <path d="M195 95 C200 70 212 58 212 58 C212 58 204 80 200 95" stroke="#22C55E" strokeWidth="1.8" fill="none"/>
    <path d="M200 77 C206 73 216 80 212 89" stroke="#22C55E" strokeWidth="1.8" fill="none"/>
    <circle cx="75" cy="20" r="5" stroke="#22C55E" strokeWidth="1.5" fill="none"/>
  </svg>
);
const ScribbleClean = () => (
  <svg viewBox="0 0 220 140" fill="none" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <path d="M10 100 C32 82 58 108 82 88 C106 68 130 94 154 74 C178 54 200 80 218 68" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M10 114 C32 96 58 122 82 102 C106 82 130 108 154 88 C178 68 200 94 218 82" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    <rect x="90" y="22" width="26" height="34" rx="4" stroke="#3B82F6" strokeWidth="1.8" fill="none"/>
    <path d="M85 28 L121 28" stroke="#3B82F6" strokeWidth="1.8"/>
    <path d="M100 28 L100 18 L106 18 L106 28" stroke="#3B82F6" strokeWidth="1.8" fill="none"/>
    <line x1="97" y1="36" x2="97" y2="48" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="2,2"/>
    <line x1="103" y1="36" x2="103" y2="48" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="2,2"/>
    <line x1="109" y1="36" x2="109" y2="48" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="2,2"/>
  </svg>
);
const ScribbleSocial = () => (
  <svg viewBox="0 0 220 140" fill="none" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <path d="M56 72 C44 60 30 65 28 77 C26 89 38 98 50 92 C57 89 60 83 57 78" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M57 78 L68 90 L103 62 C110 56 115 58 115 68 L92 92 L74 92" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M130 75 C142 63 155 68 153 80 C151 92 140 95 131 87" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M131 87 L119 96 L103 82" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="178" cy="34" r="14" stroke="#F59E0B" strokeWidth="1.8" fill="none"/>
    <path d="M172 28 C172 24 184 24 184 28 C184 32 178 34 178 34 L178 38" stroke="#F59E0B" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <circle cx="178" cy="42" r="2" fill="#F59E0B"/>
  </svg>
);
const ScribbleAware = () => (
  <svg viewBox="0 0 220 140" fill="none" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
    <circle cx="110" cy="70" r="10" stroke="#8B5CF6" strokeWidth="2.5" fill="none"/>
    <circle cx="110" cy="70" r="24" stroke="#8B5CF6" strokeWidth="1.8" fill="none" opacity="0.8"/>
    <circle cx="110" cy="70" r="42" stroke="#8B5CF6" strokeWidth="1.2" fill="none" opacity="0.55"/>
    <circle cx="110" cy="70" r="62" stroke="#8B5CF6" strokeWidth="0.8" fill="none" opacity="0.3"/>
    <path d="M30 28 L40 40 M190 28 L180 40 M30 112 L40 100 M190 112 L180 100" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16 70 L26 70 M194 70 L204 70" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);
const SCRIBBLES = { blood:<ScribbleBlood/>, plantation:<ScribblePlant/>, cleanup:<ScribbleClean/>, social:<ScribbleSocial/>, awareness:<ScribbleAware/> };

/* ─── ICONS ─────────────────────────────────────────────────── */
const ISearch   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
const IBell     = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const IMap      = ({size=12}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const IStar     = ({size=12}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>;
const IBookmark = ({filled}) => <svg width="14" height="14" viewBox="0 0 24 24" fill={filled?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>;
const ICheck    = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>;
const IPlus     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IHome     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ITrophy   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>;
const IUser     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IArrow    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const ICal      = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IClock    = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IUsers    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IDownload = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ISparkle  = () => <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
const ICompass  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
const IMenu     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IClose    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

/* ─── SIDEBAR ────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:'home',        label:'Explore',    icon:<IHome/>  },
  { id:'leaderboard', label:'Leaderboard',icon:<ITrophy/>},
  { id:'profile',     label:'Profile',    icon:<IUser/>  },
];

function Sidebar({ active, onNavigate, onCreateClick, collapsed, onToggle, isDark }) {
  return (
    <>
      <style>{`
        .sidebar {
          position: fixed; top: 0; left: 0; bottom: 0;
          width: ${collapsed ? '72px' : '230px'};
          background: var(--sidebar-bg);
          display: flex; flex-direction: column;
          border-right: 1px solid var(--border);
          transition: width 0.25s cubic-bezier(0.4,0,0.2,1), background 0.3s, border-color 0.3s;
          z-index: 200; overflow: hidden;
        }
        .sb-top {
          padding: ${collapsed ? '20px 0' : '20px 20px'};
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center;
          justify-content: ${collapsed ? 'center' : 'space-between'};
          min-height: 68px; transition: border-color 0.3s;
        }
        .sb-logo {
          font-family: 'Fraunces', serif;
          font-size: 18px; font-weight: 700; color: var(--text-main);
          letter-spacing: -0.4px; white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s, color 0.3s;
          pointer-events: none;
        }
        .sb-logo span { color: var(--primary); }
        .sb-toggle {
          background: var(--surface); border: 1px solid var(--border);
          width: 32px; height: 32px; border-radius: 8px;
          color: var(--text-sec); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; flex-shrink: 0;
        }
        .sb-toggle:hover { color: var(--primary); transform: scale(1.05); border-color: var(--primary); }
        .sb-nav { flex: 1; padding: 14px ${collapsed ? '8px' : '12px'}; display: flex; flex-direction: column; gap: 4px; }
        .sb-item {
          display: flex; align-items: center;
          gap: 12px; padding: ${collapsed ? '11px' : '11px 12px'};
          border-radius: 10px; cursor: pointer; border: none;
          background: transparent; color: var(--text-sec);
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          transition: all 0.2s; width: 100%;
          white-space: nowrap; justify-content: ${collapsed ? 'center' : 'flex-start'};
          position: relative;
        }
        .sb-item:hover { background: var(--surface); color: var(--text-main); transform: translateX(2px); }
        .sb-item.active { background: var(--surface); color: var(--primary); font-weight: 600; }
        .sb-item.active::before {
          content: ''; position: absolute; left: 0; top: 12px; bottom: 12px;
          width: 3px; background: var(--primary); border-radius: 0 3px 3px 0;
        }
        .sb-label { opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; pointer-events: none; }
        .sb-bottom { padding: ${collapsed ? '12px 8px' : '12px'}; border-top: 1px solid var(--border); transition: border-color 0.3s; }
        .sb-create {
          width: 100%; padding: ${collapsed ? '11px' : '11px 14px'};
          background: var(--primary); color: white;
          border: none; border-radius: 10px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; display: flex; align-items: center;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          gap: 8px; transition: all 0.2s;
          white-space: nowrap; box-shadow: 0 4px 12px rgba(59,130,246,0.3);
        }
        .sb-create:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 6px 16px rgba(59,130,246,0.4); }
        .sb-create:active { transform: scale(0.97); }
        .sb-create-label { opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; pointer-events: none; }
        .sb-user {
          display: flex; align-items: center; gap: 10px;
          padding: ${collapsed ? '10px 0' : '10px'};
          margin-bottom: 8px; border-radius: 10px;
          cursor: pointer; transition: background 0.2s;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
        }
        .sb-user:hover { background: var(--surface); }
        .sb-user-av {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--primary), #8B5CF6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif; font-size: 13px; font-weight: 700; color: white;
        }
        .sb-user-info { opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; overflow: hidden; }
        .sb-user-name { font-size: 13px; font-weight: 600; color: var(--text-main); white-space: nowrap; }
        .sb-user-pts { font-size: 11px; color: var(--text-sec); display: flex; align-items: center; gap: 3px; margin-top: 1px; }

        @media (max-width: 768px) {
          .sidebar { 
            top: auto; bottom: 0; width: 100% !important; height: 64px; 
            flex-direction: row; border-right: none; border-top: 1px solid var(--border);
            z-index: 1000;
          }
          .sb-top, .sb-user { display: none; }
          .sb-nav { 
            flex-direction: row; padding: 0; justify-content: space-around; 
            align-items: center; width: 100%; gap: 0;
          }
          .sb-item { flex-direction: column; padding: 6px; width: auto; gap: 4px; }
          .sb-item.active::before { display: none; }
          .sb-label { opacity: 1 !important; font-size: 10px; }
          .sb-bottom { border-top: none; padding: 0 16px 0 0; align-items: center; justify-content: center; }
          .sb-create { width: 44px; height: 44px; padding: 0; justify-content: center; border-radius: 50%; box-shadow: 0 4px 12px rgba(59,130,246,0.4); }
          .sb-create-label { display: none; }
        }
      `}</style>
      <div className="sidebar">
        <div className="sb-top">
          {!collapsed && <div className="sb-logo">Good<span>Hood</span></div>}
          <button className="sb-toggle" onClick={onToggle}>
            {collapsed ? <ICompass/> : <IClose/>}
          </button>
        </div>
        <nav className="sb-nav">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`sb-item ${active === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)} title={collapsed ? item.label : ''}>
              {item.icon}
              <span className="sb-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sb-bottom">
          <div className="sb-user" title={collapsed ? 'Arjun Shah' : ''}>
            <div className="sb-user-av">AS</div>
            <div className="sb-user-info">
              <div className="sb-user-name">Arjun Shah</div>
              <div className="sb-user-pts"><IStar size={10}/> 980 pts · Rank #2</div>
            </div>
          </div>
          <button className="sb-create" onClick={onCreateClick} title={collapsed ? 'Create Event' : ''}>
            <IPlus/>
            <span className="sb-create-label">Create Event</span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── TOP BAR ────────────────────────────────────────────────── */
function TopBar({ title, subtitle, isDark, toggleDark, onSearchClick }) {
  const [bellActive, setBellActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  return (
    <>
      <style>{`
        .topbar {
          position: sticky; top: 0; z-index: 1000;
          background: rgba(${isDark ? '30,41,59' : '255,255,255'}, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          height: 68px;
          display: flex; align-items: center;
          padding: 0 28px;
          justify-content: space-between;
          transition: background 0.3s, border-color 0.3s;
        }
        .topbar-left h1 {
          font-family: 'Fraunces', serif;
          font-size: 20px; font-weight: 700;
          color: var(--text-main); letter-spacing: -0.3px;
        }
        .topbar-left p { font-size: 13px; color: var(--text-sec); margin-top: 2px; }
        .topbar-right { display: flex; align-items: center; gap: 8px; }
        .topbar-btn {
          width: 40px; height: 40px; border-radius: 12px;
          border: 1px solid var(--border); background: var(--surface);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--text-sec); transition: all 0.2s;
          position: relative;
        }
        .topbar-btn:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .topbar-btn:active { transform: scale(0.95); }
        .topbar-btn.active-state { background: var(--primary); color: white; border-color: var(--primary); }
        .notif-dot {
          position: absolute; top: 8px; right: 8px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #EF4444; border: 2px solid var(--surface);
          transition: transform 0.2s;
        }
        .topbar-btn:hover .notif-dot { transform: scale(1.2); }
        .loc-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 100px;
          border: 1px solid var(--border); background: var(--surface);
          font-size: 13px; font-weight: 600; color: var(--text-main);
          cursor: pointer; transition: all 0.2s; margin-right: 4px;
        }
        .loc-chip:hover { border-color: var(--primary); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .loc-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--plant);
          box-shadow: 0 0 0 3px var(--plant-bg);
          animation: floatDot 2.5s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .topbar { padding: 0 16px; height: 60px; }
          .topbar-left h1 { font-size: 22px !important; }
          .topbar-left span { display: none; }
          .loc-chip { display: none; }
          .topbar-btn { width: 36px; height: 36px; }
          .notif-popup { width: calc(100vw - 32px) !important; right: -40px !important; }
        }
      `}</style>
      <div className="topbar">
        <div className="topbar-left" style={{display:'flex', alignItems:'baseline', gap:'12px'}}>
          <h1 style={{fontSize:'26px', margin:0}}>{title}</h1>
          {subtitle && <span style={{fontSize:'14px', color:'var(--text-sec)'}}>{subtitle}</span>}
        </div>
        <div className="topbar-right">
          <div className="loc-chip"><div className="loc-dot"/><IMap size={12}/> Panvel</div>
          
          <button className={`topbar-btn ${searchActive ? 'active-state' : ''}`} 
            onClick={() => { setSearchActive(!searchActive); if(onSearchClick) onSearchClick(); }} title="Search">
            <ISearch/>
          </button>
          
          <div style={{position:'relative'}}>
            <button className={`topbar-btn ${bellActive ? 'active-state' : ''}`} 
              onClick={() => setBellActive(!bellActive)} title="Notifications">
              <IBell/>
              <div className="notif-dot" style={{borderColor: bellActive ? 'var(--primary)' : 'var(--surface)'}}/>
            </button>
            {bellActive && (
              <div className="notif-popup" style={{position:'absolute', top:'50px', right:0, background:'var(--surface)',
                border:'1px solid var(--border)', borderRadius:'12px', padding:'16px', boxShadow:'0 10px 30px rgba(0,0,0,0.1)',
                width:'280px', animation:'fadeUp 0.2s ease'}}>
                <div style={{fontSize:'14px', fontWeight:600, marginBottom:'8px'}}>Notifications</div>
                <div style={{fontSize:'13px', color:'var(--text-sec)', padding:'10px', background:'var(--bg)', borderRadius:'8px', lineHeight:1.4}}>
                  <span style={{color:'var(--primary)', fontWeight:600}}>Panvel Beach Cleanup</span> is coming close! Check your requirements.
                </div>
              </div>
            )}
          </div>
          
          <button className="topbar-btn" onClick={toggleDark} title="Toggle Theme">
            {isDark ? <ISun/> : <IMoon/>}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── EVENT CARD ─────────────────────────────────────────────── */
function EventCard({ event, onClick, delay = 0 }) {
  const [bookmarked, setBookmarked] = useState(false);
  const cfg = CAT_CFG[event.cat];
  const pct = Math.round((event.joined / event.total) * 100);

  return (
    <div onClick={onClick} style={{
      background:'var(--surface)', borderRadius:'18px', border:'1px solid var(--border)',
      overflow:'hidden', cursor:'pointer',
      transition:'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s, background 0.3s, border-color 0.3s',
      animation:`fadeUp 0.38s ${delay}ms ease both`,
    }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 14px 36px rgba(0,0,0,0.1)'}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}
    >
      {/* Banner */}
      <div style={{height:118,position:'relative',overflow:'hidden',background:cfg.bg,padding:'13px',transition:'background 0.3s'}}>
        <div style={{position:'absolute',inset:0,opacity:0.09}}>{SCRIBBLES[event.cat]}</div>
        <div style={{position:'relative',zIndex:1,display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div style={{display:'flex',flexDirection:'column',gap:5}}>
            <span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'3px 10px',borderRadius:'100px',
              background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.color}28`,
              fontSize:11,fontWeight:700,letterSpacing:'0.4px',textTransform:'uppercase'}}>
              {cfg.label}
            </span>
            <span style={{fontSize:11,color:'var(--text-main)',fontWeight:500,
              background:'rgba(255,255,255,0.3)',padding:'3px 8px',borderRadius:7,
              backdropFilter:'blur(8px)'}}>
              {event.date} · {event.time}
            </span>
          </div>
          <button onClick={e=>{e.stopPropagation();setBookmarked(b=>!b)}} style={{
            background:'var(--surface)',border:'none',borderRadius:8,
            width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',
            cursor:'pointer',color:bookmarked?cfg.color:'var(--text-sec)',
            transition:'transform 0.15s, color 0.15s'}}
            onMouseEnter={e=>e.currentTarget.style.transform='scale(1.1)'}
            onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
            <IBookmark filled={bookmarked}/>
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:'14px'}}>
        <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,
          color:'var(--text-main)',marginBottom:5,letterSpacing:'-0.2px',lineHeight:1.3}}>
          {event.title}
        </div>
        <div style={{fontSize:12.5,color:'var(--text-sec)',lineHeight:1.55,marginBottom:11,
          display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
          {event.desc}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'var(--text-sec)',marginBottom:12}}>
          <IMap/>{event.loc}
        </div>

        {/* Progress */}
        <div style={{marginBottom:12}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text-sec)',marginBottom:5}}>
            <span style={{display:'flex',alignItems:'center',gap:4}}><IUsers/> {event.joined} joined</span>
            <span>{pct}%</span>
          </div>
          <div style={{height:4,background:'var(--border)',borderRadius:2,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:2,background:cfg.color,
              width:`${pct}%`,transition:'width 0.9s cubic-bezier(0.25,1,0.5,1)'}}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          paddingTop:10,borderTop:'1px solid var(--border)'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:4,fontSize:12,fontWeight:700,color:'var(--social)'}}>
              <IStar/> {event.pts} pts
            </div>
            <div style={{fontSize:11,color:'var(--text-sec)',marginTop:1}}>{event.days}d left</div>
          </div>
          <button style={{
            padding:'7px 14px',borderRadius:8,border:'none',
            background:'var(--primary)',color:'white',
            fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:600,
            cursor:'pointer',transition:'background 0.15s, transform 0.1s, box-shadow 0.15s',
            letterSpacing:'0.2px'
          }}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--primary-hover)';e.currentTarget.style.boxShadow='0 4px 12px rgba(59,130,246,0.3)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='var(--primary)';e.currentTarget.style.boxShadow='none'}}
            onMouseDown={e=>e.currentTarget.style.transform='scale(0.96)'}
            onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
            onClick={e=>{e.stopPropagation();onClick()}}>
            Participate →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────────── */
function HomePage({ onEventClick, onCreateClick, isDark }) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = EVENTS.filter(e => {
    const mc = activeCat === 'all' || e.cat === activeCat;
    const ms = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.loc.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  return (
    <div className="page-padding">
      {/* Search */}
      <div style={{position:'relative',marginBottom:18,animation:'fadeUp 0.3s ease'}}>
        <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'var(--text-sec)',pointerEvents:'none'}}>
          <ISearch/>
        </span>
        <input id="global-search"
          style={{width:'100%',padding:'12px 16px 12px 42px',border:'1.5px solid var(--border)',
            borderRadius:13,background:'var(--surface)',fontFamily:"'DM Sans',sans-serif",
            fontSize:14,color:'var(--text-main)',outline:'none',
            transition:'border-color 0.2s, box-shadow 0.2s'}}
          placeholder="Search events, locations, causes..."
          value={search} onChange={e=>setSearch(e.target.value)}
          onFocus={e=>{e.target.style.borderColor='var(--primary)';e.target.style.boxShadow='0 0 0 4px rgba(59,130,246,0.1)'}}
          onBlur={e=>{e.target.style.borderColor='var(--border)';e.target.style.boxShadow='none'}}
        />
      </div>

      {/* Category Pills */}
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4,paddingTop:2,marginBottom:24,scrollbarWidth:'none',animation:'fadeUp 0.35s ease'}}>
        {CATS.map(cat => {
          const cfg = cat === 'all' ? null : CAT_CFG[cat];
          const isActive = activeCat === cat;
          return (
            <button key={cat} onClick={()=>setActiveCat(cat)} style={{
              flexShrink:0,padding:'7px 16px',borderRadius:'100px',
              border:`1.5px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
              background:isActive ? 'var(--primary)' : 'var(--surface)',
              color:isActive ? 'white' : 'var(--text-sec)',
              fontSize:13,fontWeight:500,cursor:'pointer',
              display:'flex',alignItems:'center',gap:6,
              transition:'all 0.15s',whiteSpace:'nowrap',
              fontFamily:"'DM Sans',sans-serif"
            }}
              onMouseEnter={e=>{if(!isActive){e.currentTarget.style.borderColor='#bbb';e.currentTarget.style.transform='translateY(-1px)'}}}
              onMouseLeave={e=>{if(!isActive){e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)'}}}>
              {cfg && <span style={{width:6,height:6,borderRadius:'50%',background:isActive?'white':cfg.color,flexShrink:0}}/>}
              {cat === 'all' ? 'All Events' : cfg.label}
            </button>
          );
        })}
      </div>

      {/* Section header */}
      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:16}}>
        <span style={{fontFamily:"'Fraunces',serif",fontSize:19,fontWeight:700,color:'var(--black)',letterSpacing:'-0.3px'}}>
          {activeCat === 'all' ? 'Nearby Events' : CAT_CFG[activeCat]?.label + ' Events'}
          <span style={{fontSize:13,fontFamily:"'DM Sans',sans-serif",color:'var(--text-sec)',marginLeft:8,fontWeight:400}}>{filtered.length}</span>
        </span>
        <span style={{fontSize:13,color:'var(--text-sec)',cursor:'pointer'}}
          onMouseEnter={e=>e.target.style.color='var(--black)'}
          onMouseLeave={e=>e.target.style.color='var(--text-sec)'}>
          See all →
        </span>
      </div>

      {filtered.length > 0 ? (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
          {filtered.map((ev,i) => <EventCard key={ev.id} event={ev} delay={i*45} onClick={()=>onEventClick(ev)}/>)}
        </div>
      ) : (
        <div style={{textAlign:'center',padding:'64px 24px',color:'var(--text-sec)'}}>
          <div style={{fontSize:48,marginBottom:12,opacity:.35}}>🔍</div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:600,color:'var(--black)',marginBottom:6}}>No events found</div>
          <div style={{fontSize:14}}>Try adjusting your filters or search term</div>
        </div>
      )}
    </div>
  );
}

/* ─── EVENT DETAIL PAGE ──────────────────────────────────────── */
function EventDetailPage({ event, onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [joined, setJoined] = useState(false);
  const [success, setSuccess] = useState(false);
  const cfg = CAT_CFG[event.cat];
  const pct = Math.round((event.joined / event.total) * 100);

  const handleJoin = () => {
    setSuccess(true);
    setTimeout(() => { setShowModal(false); setSuccess(false); setJoined(true); }, 2600);
  };

  return (
    <div className="page-padding" style={{maxWidth:760,animation:'fadeUp 0.35s ease'}}>
      <button onClick={onBack} style={{
        display:'flex',alignItems:'center',gap:7,
        padding:'8px 0',marginBottom:16,background:'none',border:'none',
        cursor:'pointer',fontFamily:"'DM Sans',sans-serif",
        fontSize:13,fontWeight:500,color:'var(--text-sec)',transition:'color 0.15s'
      }}
        onMouseEnter={e=>e.currentTarget.style.color='var(--text-main)'}
        onMouseLeave={e=>e.currentTarget.style.color='var(--text-sec)'}>
        <IArrow/> Back to events
      </button>

      {/* Hero */}
      <div style={{borderRadius:20,background:cfg.bg,padding:'28px 24px',
        position:'relative',overflow:'hidden',marginBottom:16,transition:'background 0.3s'}}>
        <div style={{position:'absolute',inset:0,opacity:0.08}}>{SCRIBBLES[event.cat]}</div>
        <div style={{position:'relative',zIndex:1}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',
            borderRadius:'100px',background:cfg.bg,color:cfg.color,border:`1px solid ${cfg.color}30`,
            fontSize:11,fontWeight:700,letterSpacing:'0.4px',textTransform:'uppercase',marginBottom:12}}>
            {cfg.label}
          </span>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:28,fontWeight:700,
            color:'var(--text-main)',letterSpacing:'-0.5px',lineHeight:1.2,marginBottom:10}}>
            {event.title}
          </div>
          <div style={{display:'flex',gap:20,fontSize:13,color:'var(--text-sec)'}}>
            <span>{event.date}, 2025 · {event.time}</span>
            <span style={{display:'flex',alignItems:'center',gap:4}}><IMap/> {event.loc}</span>
          </div>
        </div>
      </div>

      {/* About */}
      <Card title="About this event">
        <p style={{fontSize:14,color:'var(--text-sec)',lineHeight:1.75}}>
          {event.desc} This initiative brings together community members of all ages to create a meaningful social impact. Together we can make our neighbourhood a better, healthier, and more connected place to live.
        </p>
      </Card>

      {/* Info */}
      <Card title="Event details">
        {[
          { icon:<ICal/>, label:'Date', value:`${event.date}, 2025` },
          { icon:<IClock/>, label:'Time', value:event.time },
          { icon:<IMap size={15}/>, label:'Location', value:event.loc },
        ].map((row,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,
            padding:'9px 0',borderBottom:i<2?'1px solid var(--border)':'none'}}>
            <div style={{width:34,height:34,borderRadius:10,background:'var(--bg)',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'var(--text-sec)',flexShrink:0,transition:'background 0.3s'}}>{row.icon}</div>
            <div>
              <div style={{fontSize:11,color:'var(--text-sec)'}}>{row.label}</div>
              <div style={{fontSize:14,fontWeight:500,color:'var(--text-main)'}}>{row.value}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Requirements */}
      <Card title="Requirements">
        {event.reqs.map((req,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:10,fontSize:14,
            color:'var(--text-main)',padding:'6px 0'}}>
            <div style={{width:20,height:20,borderRadius:6,flexShrink:0,
              background:'var(--plant-bg)',color:'var(--plant)',
              display:'flex',alignItems:'center',justifyContent:'center'}}>
              <ICheck/>
            </div>
            {req}
          </div>
        ))}
      </Card>

      {/* Progress */}
      <Card title="Participation">
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
          <span style={{fontSize:15,fontWeight:700,color:'var(--text-main)'}}>{event.joined} people joined</span>
          <span style={{fontSize:13,color:'var(--text-sec)'}}>of {event.total}</span>
        </div>
        <div style={{height:8,background:'var(--bg)',borderRadius:4,overflow:'hidden',marginBottom:8}}>
          <div style={{height:'100%',borderRadius:4,background:cfg.color,width:`${pct}%`,
            transition:'width 0.9s cubic-bezier(0.25,1,0.5,1)'}}/>
        </div>
        <div style={{fontSize:12,color:'var(--text-sec)'}}>
          {event.total - event.joined} spots remaining · {event.days} days left
        </div>
      </Card>

      {/* Organizer */}
      <Card title="Organizer">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:44,height:44,borderRadius:13,background:'var(--primary)',
            display:'flex',alignItems:'center',justifyContent:'center',
            color:'white',fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,flexShrink:0}}>
            {event.organizer.charAt(0)}
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-main)'}}>{event.organizer}</div>
            <div style={{fontSize:12,color:'var(--text-sec)'}}>Verified Organizer · Panvel region</div>
          </div>
        </div>
      </Card>

      {/* CTA */}
      {!joined ? (
        <button onClick={()=>setShowModal(true)} style={{
          width:'100%',padding:16,background:'var(--primary)',color:'white',border:'none',
          borderRadius:16,fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,
          cursor:'pointer',letterSpacing:'-0.2px',marginTop:8,
          boxShadow:'0 4px 20px rgba(59,130,246,0.3)',transition:'all 0.15s'
        }}
          onMouseEnter={e=>{e.currentTarget.style.background='var(--primary-hover)';e.currentTarget.style.transform='translateY(-1px)';e.currentTarget.style.boxShadow='0 8px 28px rgba(59,130,246,0.4)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='var(--primary)';e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 20px rgba(59,130,246,0.3)'}}
          onMouseDown={e=>e.currentTarget.style.transform='scale(0.98)'}
          onMouseUp={e=>e.currentTarget.style.transform='translateY(-1px)'}>
          Join this Event · Earn {event.pts} pts →
        </button>
      ) : (
        <button style={{width:'100%',padding:16,background:cfg.color,color:'white',border:'none',
          borderRadius:16,fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:600,cursor:'default',marginTop:8}}>
          ✓ You&apos;ve joined this event!
        </button>
      )}

      {/* Modal */}
      {showModal && (
        <div onClick={()=>!success&&setShowModal(false)} style={{
          position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.42)',
          backdropFilter:'blur(5px)',display:'flex',alignItems:'center',
          justifyContent:'center',padding:24,animation:'fadeIn 0.2s ease'}}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:'var(--surface)',borderRadius:24,width:'100%',maxWidth:440,
            padding:'28px 24px 28px',animation:'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            border:'1px solid var(--border)',transition:'background 0.3s, border-color 0.3s'}}>
            {!success ? (
              <>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,
                  color:'var(--text-main)',marginBottom:6,letterSpacing:'-0.3px'}}>Confirm participation</div>
                <div style={{fontSize:14,color:'var(--text-sec)',marginBottom:20}}>
                  You&apos;re about to join <strong style={{color:'var(--text-main)'}}>{event.title}</strong>. Ensure you meet all requirements.
                </div>
                <div style={{background:'var(--bg)',borderRadius:14,padding:'14px 16px',marginBottom:20,
                  display:'flex',justifyContent:'space-between',alignItems:'center',transition:'background 0.3s'}}>
                  <div>
                    <div style={{fontSize:11,color:'var(--text-sec)',marginBottom:2}}>Points reward</div>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,color:'var(--social)'}}>+{event.pts} pts</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:11,color:'var(--text-sec)',marginBottom:2}}>{event.date}</div>
                    <div style={{fontSize:14,fontWeight:600,color:'var(--text-main)'}}>{event.time}</div>
                  </div>
                </div>
                <div style={{display:'flex',gap:10}}>
                  <button onClick={()=>setShowModal(false)} style={{
                    flex:1,padding:14,border:'1.5px solid var(--border)',borderRadius:12,
                    background:'none',fontFamily:"'DM Sans',sans-serif",color:'var(--text-main)',
                    fontSize:14,fontWeight:500,cursor:'pointer',transition:'border-color 0.15s'}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor='var(--text-sec)'}
                    onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>Cancel</button>
                  <button onClick={handleJoin} style={{
                    flex:1.5,padding:14,border:'none',borderRadius:12,
                    background:'var(--primary)',color:'white',
                    fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,cursor:'pointer',
                    transition:'background 0.15s'}}
                    onMouseEnter={e=>e.currentTarget.style.background='var(--primary-hover)'}
                    onMouseLeave={e=>e.currentTarget.style.background='var(--primary)'}>
                    Confirm & Join →
                  </button>
                </div>
              </>
            ) : (
              <div style={{textAlign:'center',padding:'20px 0'}}>
                <div style={{width:72,height:72,borderRadius:'50%',
                  background:'var(--plant-bg)',display:'flex',alignItems:'center',
                  justifyContent:'center',margin:'0 auto 16px',color:'var(--plant)',
                  animation:'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)'}}>
                  <ISparkle/>
                </div>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:700,
                  color:'var(--text-main)',marginBottom:6}}>You&apos;re in! 🎉</div>
                <div style={{fontSize:14,color:'var(--text-sec)',marginBottom:14}}>
                  Registered for {event.title}
                </div>
                <div style={{display:'inline-flex',alignItems:'center',gap:6,
                  background:'var(--social-bg)',color:'var(--social)',
                  padding:'8px 16px',borderRadius:'100px',fontSize:14,fontWeight:600,
                  animation:'popIn 0.5s 0.2s cubic-bezier(0.34,1.56,0.64,1) both'}}>
                  <IStar/> +{event.pts} points earned
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CARD WRAPPER ───────────────────────────────────────────── */
/* ─── CARD WRAPPER ───────────────────────────────────────────── */
function Card({ title, children }) {
  return (
    <div style={{background:'var(--surface)',borderRadius:16,border:'1px solid var(--border)',
      padding:'18px 20px',marginBottom:12,transition:'background 0.3s, border-color 0.3s'}}>
      <div style={{fontSize:12,fontWeight:700,color:'var(--text-sec)',
        textTransform:'uppercase',letterSpacing:'0.6px',marginBottom:14}}>
        {title}
      </div>
      {children}
    </div>
  );
}

/* ─── LEADERBOARD ────────────────────────────────────────────── */
/* ─── LEADERBOARD ────────────────────────────────────────────── */
function LeaderboardPage() {
  const top3 = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]];

  return (
    <div className="page-padding" style={{maxWidth:700}}>
      {/* Podium */}
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'center',
        gap:10,marginBottom:28,paddingTop:8}}>
        {podiumOrder.map((u, i) => {
          if(!u) return null;
          const rank = LEADERBOARD.indexOf(u) + 1;
          const rankEmoji = ['🥈','🥇','🥉'][i];
          const isFirst = rank === 1;
          return (
            <div key={u.id} style={{
              background:isFirst?'var(--primary)':'var(--surface)',
              borderRadius:20,padding:'16px 14px',textAlign:'center',flex:1,maxWidth:150,
              border:`1px solid ${isFirst?'var(--primary)':'var(--border)'}`,
              transform:isFirst?'translateY(-10px)':'none',
              boxShadow:isFirst?'0 10px 28px rgba(37,99,235,0.2)':'none',
              animation:`fadeUp 0.4s ${i*80}ms ease both`,
              transition:'background 0.3s, border-color 0.3s'
            }}>
              <div style={{fontSize:24,marginBottom:6}}>{rankEmoji}</div>
              <div style={{
                width:44,height:44,borderRadius:14,margin:'0 auto 8px',
                background:isFirst?'rgba(255,255,255,0.2)':u.color+'22',
                color:isFirst?'white':u.color,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700}}>
                {u.avatar}
              </div>
              <div style={{fontSize:13,fontWeight:600,color:isFirst?'white':'var(--text-main)',marginBottom:2}}>
                {u.name.split(' ')[0]}
              </div>
              <div style={{fontSize:12,color:isFirst?'rgba(255,255,255,0.7)':'var(--text-sec)'}}>
                {u.pts} pts
              </div>
            </div>
          );
        })}
      </div>

      <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,
        color:'var(--text-main)',marginBottom:12,letterSpacing:'-0.2px'}}>All Rankings</div>

      {rest.map((u, i) => (
        <div key={u.id} style={{
          background:'var(--surface)',border:`1px solid ${u.you?'var(--primary)':'var(--border)'}`,
          boxShadow:u.you?'0 0 0 1px var(--primary)':'none',
          borderRadius:14,padding:'14px 16px',
          display:'flex',alignItems:'center',gap:12,marginBottom:8,
          animation:`fadeUp 0.35s ${i*50}ms ease both`,
          transition:'background 0.3s, border-color 0.3s'}}>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:15,fontWeight:700,
            color:'var(--text-sec)',width:28,textAlign:'center',flexShrink:0}}>#{i+4}</div>
          <div style={{width:38,height:38,borderRadius:12,flexShrink:0,
            background:u.color+'22',color:u.color,
            display:'flex',alignItems:'center',justifyContent:'center',
            fontWeight:700,fontSize:14}}>{u.avatar}</div>
          <div style={{flex:1,fontSize:14,fontWeight:600,color:'var(--text-main)'}}>
            {u.name}
            {u.you && <span style={{
              background:'var(--primary)',color:'white',
              fontSize:10,fontWeight:600,padding:'2px 8px',borderRadius:100,
              marginLeft:8,letterSpacing:'0.3px'}}>YOU</span>}
          </div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:700,color:'var(--text-main)'}}>{u.pts}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── PROFILE PAGE ───────────────────────────────────────────── */
function ProfilePage({ onEventClick }) {
  return (
    <div className="page-padding" style={{maxWidth:700}}>
      {/* Hero Card */}
      <div style={{background:'var(--primary)',borderRadius:20,padding:'24px',
        marginBottom:16,position:'relative',overflow:'hidden',animation:'fadeUp 0.3s ease',transition:'background 0.3s'}}>
        <div style={{position:'absolute',inset:0,opacity:0.1}}><ScribbleAware/></div>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{width:64,height:64,borderRadius:18,
            background:'linear-gradient(135deg,var(--primary),#8B5CF6)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:"'Fraunces',serif",fontSize:24,fontWeight:700,color:'white',
            border:'2px solid rgba(255,255,255,0.2)',
            marginBottom:12}}>A</div>
          <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,
            color:'white',letterSpacing:'-0.3px'}}>Arjun Shah</div>
          <div style={{fontSize:13,color:'rgba(255,255,255,0.7)',
            display:'flex',alignItems:'center',gap:4,marginTop:3}}>
            <IMap/> Panvel, Maharashtra
          </div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,
            background:'rgba(255,255,255,0.15)',color:'white',
            padding:'6px 12px',borderRadius:100,fontSize:13,fontWeight:600,marginTop:12}}>
            <IStar size={11}/> 980 points · Rank #2
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16,animation:'fadeUp 0.35s ease'}}>
        {[{num:'11',label:'Events Joined'},{num:'3',label:'Certificates'}].map((s,i) => (
          <div key={i} style={{background:'var(--surface)',border:'1px solid var(--border)',
            borderRadius:16,padding:20,textAlign:'center',transition:'background 0.3s, border-color 0.3s'}}>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:36,fontWeight:700,
              color:'var(--text-main)',letterSpacing:'-1.5px'}}>{s.num}</div>
            <div style={{fontSize:12,color:'var(--text-sec)',marginTop:3}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,
        color:'var(--text-main)',marginBottom:10,letterSpacing:'-0.2px'}}>Certificates</div>

      {CERTS.map((c, i) => (
        <div key={c.id} style={{
          background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,
          padding:'14px 16px',display:'flex',alignItems:'center',gap:12,marginBottom:8,
          cursor:'pointer',transition:'transform 0.15s, background 0.3s, border-color 0.3s',
          animation:`fadeUp 0.35s ${i*60}ms ease both`}}
          onMouseEnter={e=>e.currentTarget.style.transform='translateX(3px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateX(0)'}>
          <div style={{width:40,height:40,borderRadius:10,flexShrink:0,
            background:CAT_CFG[c.cat].bg,color:CAT_CFG[c.cat].color,
            display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>
            {c.emoji}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text-main)'}}>{c.title}</div>
            <div style={{fontSize:12,color:'var(--text-sec)'}}>{c.date}</div>
          </div>
          <button style={{
            padding:'6px 12px',border:'1.5px solid var(--border)',borderRadius:8,
            background:'var(--bg)',fontSize:12,fontWeight:500,cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif",color:'var(--text-main)',
            display:'flex',alignItems:'center',gap:5,transition:'border-color 0.15s, background 0.3s'}}
            onMouseEnter={e=>e.currentTarget.style.borderColor='var(--primary)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            <IDownload/> Download
          </button>
        </div>
      ))}

      <div style={{fontFamily:"'Fraunces',serif",fontSize:16,fontWeight:700,
        color:'var(--text-main)',marginBottom:10,marginTop:20,letterSpacing:'-0.2px'}}>Saved Events</div>

      {EVENTS.slice(0,3).map((ev,i) => (
        <div key={ev.id} onClick={()=>onEventClick(ev)} style={{
          background:'var(--surface)',border:'1px solid var(--border)',borderRadius:14,
          padding:'14px 16px',display:'flex',alignItems:'center',gap:12,marginBottom:8,
          cursor:'pointer',transition:'transform 0.15s, background 0.3s, border-color 0.3s',
          animation:`fadeUp 0.35s ${(i+3)*60}ms ease both`}}
          onMouseEnter={e=>e.currentTarget.style.transform='translateX(3px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateX(0)'}>
          <div style={{width:9,height:9,borderRadius:'50%',background:CAT_CFG[ev.cat].color,flexShrink:0}}/>
          <div style={{flex:1,fontSize:14,fontWeight:600,color:'var(--text-main)'}}>{ev.title}</div>
          <div style={{fontSize:12,color:'var(--text-sec)'}}>{ev.date}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── CREATE EVENT MODAL ─────────────────────────────────────── */
function CreateModal({ onClose }) {
  const [form, setForm] = useState({title:'',cat:'',desc:'',reqs:'',date:'',time:'',loc:''});
  const [done, setDone] = useState(false);

  const upd = (k, v) => setForm(f => ({...f, [k]:v}));
  const submit = () => { if(!form.title||!form.cat) return; setDone(true); setTimeout(onClose,2200); };

  const inputStyle = {
    width:'100%',padding:'11px 14px',border:'1.5px solid var(--border)',borderRadius:12,
    background:'var(--surface)',color:'var(--text-main)',fontFamily:"'DM Sans',sans-serif",
    fontSize:14,outline:'none',transition:'border-color 0.2s, box-shadow 0.2s, background 0.3s, color 0.3s'
  };
  const focusStyle = e => { e.target.style.borderColor='var(--primary)'; e.target.style.boxShadow='0 0 0 4px rgba(37,99,235,0.1)'; };
  const blurStyle  = e => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none'; };

  return (
    <div onClick={onClose} style={{
      position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.42)',
      backdropFilter:'blur(5px)',display:'flex',alignItems:'center',
      justifyContent:'center',padding:24,animation:'fadeIn 0.2s ease'}}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:'var(--surface)',borderRadius:24,width:'100%',maxWidth:520,
        maxHeight:'88vh',overflowY:'auto',padding:'28px 24px',
        animation:'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)', border:'1px solid var(--border)', transition:'background 0.3s, border-color 0.3s'}}>
        {!done ? (
          <>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,
              color:'var(--text-main)',marginBottom:4,letterSpacing:'-0.3px'}}>Create Event</div>
            <div style={{fontSize:14,color:'var(--text-sec)',marginBottom:22}}>Organise a community event in your hood</div>

            {[{k:'title',label:'Event Title',ph:"e.g. Panvel Beach Cleanup 2025"},
              {k:'loc',label:'Location',ph:"e.g. Sector 12, Panvel"}].map(f=>(
              <div key={f.k} style={{marginBottom:14}}>
                <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--text-sec)',
                  textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>{f.label}</label>
                <input style={inputStyle} placeholder={f.ph}
                  value={form[f.k]} onChange={e=>upd(f.k,e.target.value)}
                  onFocus={focusStyle} onBlur={blurStyle}/>
              </div>
            ))}

            <div style={{marginBottom:14}}>
              <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--text-sec)',
                textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>Category</label>
              <select style={inputStyle} value={form.cat} onChange={e=>upd('cat',e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle}>
                <option value="">Select a category...</option>
                {Object.entries(CAT_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            <div style={{marginBottom:14}}>
              <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--text-sec)',
                textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>Description</label>
              <textarea style={{...inputStyle,resize:'vertical',minHeight:80}} placeholder="What's this event about?"
                value={form.desc} onChange={e=>upd('desc',e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle}/>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:14}}>
              {[{k:'date',label:'Date',type:'date'},{k:'time',label:'Time',type:'time'}].map(f=>(
                <div key={f.k}>
                  <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--text-sec)',
                    textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>{f.label}</label>
                  <input style={inputStyle} type={f.type} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)}
                    onFocus={focusStyle} onBlur={blurStyle}/>
                </div>
              ))}
            </div>

            <div style={{marginBottom:20}}>
              <label style={{display:'block',fontSize:11,fontWeight:700,color:'var(--text-sec)',
                textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:6}}>Requirements</label>
              <textarea style={{...inputStyle,resize:'vertical',minHeight:70}}
                placeholder={"e.g. Bring water bottle\nComfortable clothing"}
                value={form.reqs} onChange={e=>upd('reqs',e.target.value)}
                onFocus={focusStyle} onBlur={blurStyle}/>
            </div>

            <div style={{display:'flex',gap:10}}>
              <button onClick={onClose} style={{
                flex:1,padding:14,border:'1.5px solid var(--border)',borderRadius:12,
                background:'none',fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,cursor:'pointer',color:'var(--text-main)',transition:'border-color 0.15s'}}
                onMouseEnter={e=>e.currentTarget.style.borderColor='var(--text-sec)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                Cancel
              </button>
              <button onClick={submit} style={{
                flex:1.5,padding:14,border:'none',borderRadius:12,
                background:'var(--primary)',color:'white',
                fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:600,cursor:'pointer',boxShadow:'0 4px 12px rgba(37,99,235,0.25)',transition:'all 0.15s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='var(--primary-hover)';e.currentTarget.style.transform='translateY(-1px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='var(--primary)';e.currentTarget.style.transform='translateY(0)'}}>
                Publish Event →
              </button>
            </div>
          </>
        ) : (
          <div style={{textAlign:'center',padding:'28px 0'}}>
            <div style={{width:72,height:72,borderRadius:'50%',
              background:'var(--plant-bg)',display:'flex',alignItems:'center',
              justifyContent:'center',margin:'0 auto 16px',color:'var(--plant)',
              animation:'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)'}}>
              <ISparkle/>
            </div>
            <div style={{fontFamily:"'Fraunces',serif",fontSize:22,fontWeight:700,marginBottom:6,color:'var(--text-main)'}}>Event Published!</div>
            <div style={{fontSize:14,color:'var(--text-sec)',marginBottom:14}}>Your event is now live in the community feed.</div>
            <div style={{display:'inline-flex',alignItems:'center',gap:6,
              background:'var(--social-bg)',color:'var(--social)',
              padding:'8px 16px',borderRadius:'100px',fontSize:14,fontWeight:600}}>
              <IStar/> +50 organiser points
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── PAGE META ──────────────────────────────────────────────── */
const PAGE_META = {
  home:        { title:'Explore',      subtitle:'Discover events in your neighbourhood' },
  leaderboard: { title:'Leaderboard',  subtitle:'Top contributors in Panvel region'     },
  profile:     { title:'Your Profile', subtitle:'Arjun Shah · 980 pts · Rank #2'        },
};

/* ─── APP ROOT ───────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const sidebarW = collapsed ? 72 : 230;

  const goToEvent = (ev) => { setSelectedEvent(ev); setPage('detail'); };
  const goBack    = ()    => { setSelectedEvent(null); setPage('home'); };
  
  const handleSearchClick = () => {
    setPage('home');
    setSelectedEvent(null);
    setTimeout(() => { document.getElementById('global-search')?.focus() }, 50);
  };

  const currentMeta = page === 'detail'
    ? { title: selectedEvent?.title, subtitle: selectedEvent ? `${selectedEvent.loc} · ${selectedEvent.date}` : '' }
    : PAGE_META[page] || PAGE_META.home;

  useEffect(() => { document.body.style.background = isDark ? '#0F172A' : '#F5F5F5'; }, [isDark]);

  return (
    <div style={{minHeight:'100vh',background:'var(--bg)', color:'var(--text-main)', transition:'background 0.3s, color 0.3s'}}>
      <FontLink/>
      <GlobalStyles isDark={isDark} />

      <Sidebar
        active={page === 'detail' ? 'home' : page}
        onNavigate={p => { setPage(p); setSelectedEvent(null); }}
        onCreateClick={() => setShowCreate(true)}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        isDark={isDark}
      />

      {/* Main content area */}
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <TopBar title={currentMeta.title} subtitle={currentMeta.subtitle} isDark={isDark} toggleDark={() => setIsDark(!isDark)} onSearchClick={handleSearchClick} />

        <div style={{flex:1, position: 'relative', zIndex: 1}}>
          {page === 'home'        && <HomePage onEventClick={goToEvent} onCreateClick={()=>setShowCreate(true)} isDark={isDark}/>}
          {page === 'detail' && selectedEvent && <EventDetailPage event={selectedEvent} onBack={goBack} isDark={isDark}/>}
          {page === 'leaderboard' && <LeaderboardPage isDark={isDark}/>}
          {page === 'profile'     && <ProfilePage onEventClick={goToEvent} isDark={isDark}/>}
        </div>
      </div>

      {showCreate && <CreateModal onClose={()=>setShowCreate(false)} isDark={isDark}/>}
    </div>
  );
}
