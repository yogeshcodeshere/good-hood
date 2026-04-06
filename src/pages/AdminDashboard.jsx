import { motion } from 'framer-motion';
import { EventCard } from '../components/EventCard';

export function AdminDashboard({ onEventClick, events = [] }) {
  const adminEvents = events.filter(e => e.adminOwned);

  return (
    <motion.div className="page-padding" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
      
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32}}>
        <div>
          <div className="heading-font" style={{fontSize:32, fontWeight:700, color:'white', marginBottom:8}}>Admin Dashboard</div>
          <div style={{fontSize:15, color:'var(--text-sec)'}}>Manage your broadcasted missions and participants.</div>
        </div>
        <button style={{
          padding:'12px 24px', background:'var(--primary)', color:'white', border:'none', borderRadius:'12px',
          fontSize:14, fontWeight:600, cursor:'pointer', boxShadow:'0 0 15px rgba(59,130,246,0.3)'
        }}>
          + Broadcast New Event
        </button>
      </div>

      <div className="heading-font" style={{fontSize:20, fontWeight:600, color:'white', marginBottom:20}}>Your Active Broadcasts</div>
      
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:24}}>
        {adminEvents.map((ev, i) => (
          <EventCard key={ev.id} event={ev} onClick={() => onEventClick(ev)} delay={i * 100} />
        ))}
        {adminEvents.length === 0 && <div style={{color:'var(--text-sec)'}}>No broadcasts found.</div>}
      </div>

    </motion.div>
  );
}
