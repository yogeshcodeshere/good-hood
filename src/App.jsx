import { useState } from 'react';
import { GlobalStyles } from './components/GlobalStyles';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { CreateModal } from './components/CreateModal';
import { AnimatePresence } from 'framer-motion';

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

  return (
    <>
      <GlobalStyles />
      <div className="bg-noise" />

      <Sidebar
        active={page === 'detail' ? 'home' : page}
        onNavigate={p => { setPage(p); setSelectedEvent(null); }}
        onCreateClick={() => setShowCreate(true)}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />

      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <TopBar title={currentMeta.title} subtitle={currentMeta.subtitle} onSearchClick={handleSearchClick} />

        <div style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <AnimatePresence mode="wait">
            {page === 'home' && <HomePage key="home" onEventClick={goToEvent} />}
            {page === 'detail' && selectedEvent && <EventDetailPage key="detail" event={selectedEvent} onBack={goBack} />}
            {page === 'leaderboard' && <LeaderboardPage key="leaderboard" />}
            {page === 'profile' && <ProfilePage key="profile" />}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && <CreateModal key="create" onClose={() => setShowCreate(false)} />}
      </AnimatePresence>
    </>
  );
}
