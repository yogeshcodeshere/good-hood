import { useState, useEffect } from 'react';
import { GlobalStyles } from './components/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CreateModal } from './components/CreateModal';
import { AnimatePresence } from 'framer-motion';
import { api } from './api';

const PAGE_META = {
  home: { title: 'Explore', subtitle: 'Discover social signals in your sector' },
  leaderboard: { title: 'Leaderboard', subtitle: 'Global hierarchy and rankings' },
  profile: { title: 'Agent Profile', subtitle: 'Arjun Shah · Lvl 7' }
};

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (e) {
      console.error("Failed to fetch events", e);
    }
  };

  useEffect(() => {
    if (role) {
      fetchEvents();
    }
  }, [role]);

  const goToEvent = (ev) => { setSelectedEvent(ev); setPage('detail'); };
  const goBack = () => { setSelectedEvent(null); setPage('home'); };

  const handleSearchClick = () => {
    setPage('home');
    setSelectedEvent(null);
    setTimeout(() => { document.getElementById('global-search')?.focus() }, 50);
  };

  const currentMeta = page === 'detail'
    ? { title: selectedEvent?.title, subtitle: `${selectedEvent.loc} · ${selectedEvent.date}` }
    : PAGE_META[page] || PAGE_META.home;

  if (!role) {
    return (
      <>
        <GlobalStyles />
        <div className="bg-noise" />
        <div className="bg-pattern" />
        <LoginPage onLogin={(r) => { setRole(r); setPage('home'); }} />
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div className="bg-noise" />
      <div className="bg-pattern" />

      <Sidebar
        active={page === 'detail' ? 'home' : page}
        onNavigate={p => { setPage(p); setSelectedEvent(null); }}
        onCreateClick={() => setShowCreate(true)}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        role={role}
        onLogout={() => { setRole(null); setPage('home'); }}
      />

      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <TopBar title={currentMeta.title} subtitle={currentMeta.subtitle} onSearchClick={handleSearchClick} role={role} />

        <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <AnimatePresence mode="wait">
            {role === 'admin' && page === 'home' && <AdminDashboard key="adminHome" onEventClick={goToEvent} events={events} onCreateClick={() => setShowCreate(true)} />}
            {role === 'participant' && page === 'home' && <HomePage key="partHome" onEventClick={goToEvent} events={events} />}
            {page === 'detail' && selectedEvent && <EventDetailPage key="detail" event={selectedEvent} onBack={goBack} role={role} onRefresh={fetchEvents} />}
            {page === 'leaderboard' && role === 'participant' && <LeaderboardPage key="leaderboard" />}
            {page === 'profile' && role === 'participant' && <ProfilePage key="profile" />}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && <CreateModal key="create" onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); fetchEvents(); }} />}
      </AnimatePresence>
    </>
  );
}
