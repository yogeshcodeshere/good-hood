import { useState } from 'react';
import { ISearch } from '../components/Icons';
import { EVENTS, CATS, CAT_CFG } from '../data/mockData';
import { EventCard } from '../components/EventCard';
import { motion } from 'framer-motion';

export function HomePage({ onEventClick }) {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const filtered = EVENTS.filter(e => {
    const mc = activeCat === 'all' || e.cat === activeCat;
    const ms = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.loc.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });

  return (
    <motion.div 
      className="page-padding"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
    >
      <div style={{position:'relative', marginBottom:24, zIndex:10}}>
        <span style={{position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', color:'var(--text-sec)', pointerEvents:'none'}}>
          <ISearch/>
        </span>
        <input id="global-search"
          style={{
            width:'100%', padding:'16px 16px 16px 48px', border:'1px solid var(--border)',
            borderRadius:'16px', background:'var(--surface)', color:'white', fontFamily:"'Inter',sans-serif",
            fontSize:'15px', outline:'none', transition:'all 0.3s',
            boxShadow:'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
          placeholder="Search events, locations, causes..."
          value={search} onChange={e=>setSearch(e.target.value)}
          onFocus={e=>{
            e.target.style.borderColor='rgba(59,130,246,0.5)'; 
            e.target.style.background='rgba(255,255,255,0.06)';
            e.target.style.boxShadow='0 0 0 4px rgba(59,130,246,0.1), inset 0 2px 4px rgba(0,0,0,0.1)';
          }}
          onBlur={e=>{
            e.target.style.borderColor='var(--border)'; 
            e.target.style.background='var(--surface)';
            e.target.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.1)';
          }}
        />
      </div>

      <div style={{display:'flex', gap:10, overflowX:'auto', paddingBottom:8, marginBottom:32, scrollbarWidth:'none'}}>
        {CATS.map(cat => {
          const cfg = cat === 'all' ? null : CAT_CFG[cat];
          const isActive = activeCat === cat;
          return (
            <button key={cat} onClick={()=>setActiveCat(cat)} style={{
              flexShrink:0, padding:'10px 20px', borderRadius:'100px',
              border:`1px solid ${isActive ? (cfg ? cfg.color : 'var(--primary)') : 'var(--border)'}`,
              background: isActive ? (cfg ? `${cfg.color}15` : 'rgba(59,130,246,0.15)') : 'var(--surface)',
              color: isActive ? 'white' : 'var(--text-sec)',
              fontSize:'14px', fontWeight:600, cursor:'pointer',
              display:'flex', alignItems:'center', gap:8, transition:'all 0.3s', whiteSpace:'nowrap',
              boxShadow: isActive ? `0 0 20px ${cfg?cfg.color:'var(--primary)'}15` : 'none'
            }}
              onMouseEnter={e=>{if(!isActive) {e.currentTarget.style.background='var(--surface-hover)'; e.currentTarget.style.color='white';}}}
              onMouseLeave={e=>{if(!isActive) {e.currentTarget.style.background='var(--surface)'; e.currentTarget.style.color='var(--text-sec)';}}}
            >
              {cfg && <span style={{width:8, height:8, borderRadius:'50%', background:cfg.color, boxShadow:`0 0 8px ${cfg.color}`}}/>}
              {cat === 'all' ? 'All Events' : cfg.label}
            </button>
          );
        })}
      </div>

      <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:20}}>
        <span className="heading-font" style={{fontSize:'22px', fontWeight:600, color:'white', letterSpacing:'-0.3px'}}>
          {activeCat === 'all' ? 'Featured Events' : CAT_CFG[activeCat]?.label + ' Events'}
          <span style={{fontSize:'14px', fontFamily:"'Inter',sans-serif", color:'var(--text-sec)', marginLeft:12, fontWeight:500, background:'var(--surface)', padding:'2px 8px', borderRadius:'100px'}}>{filtered.length}</span>
        </span>
      </div>

      {filtered.length > 0 ? (
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:24}}>
          {filtered.map((ev,i) => <EventCard key={ev.id} event={ev} delay={i*100} onClick={()=>onEventClick(ev)}/>)}
        </div>
      ) : (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:'center', padding:'80px 24px', background:'var(--surface)', borderRadius:'24px', border:'1px dashed var(--border)'}}>
          <div style={{fontSize:48, marginBottom:16, filter:'grayscale(1) opacity(0.5)'}}>🔍</div>
          <div className="heading-font" style={{fontSize:20, fontWeight:600, color:'white', marginBottom:8}}>No signals found</div>
          <div style={{fontSize:15, color:'var(--text-sec)'}}>Adjust your scanner or try a different frequency.</div>
        </motion.div>
      )}
    </motion.div>
  );
}
