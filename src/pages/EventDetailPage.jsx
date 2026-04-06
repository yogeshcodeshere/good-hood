import { useState } from 'react';
import { IArrow, IMap, ICal, IClock, ICheck, IStar, ISparkle } from '../components/Icons';
import { SCRIBBLES } from '../components/Icons';
import { CAT_CFG } from '../data/mockData';
import { motion } from 'framer-motion';

function Card({ title, children }) {
  return (
    <div className="glass-panel" style={{ borderRadius:16, padding:'24px', marginBottom:16 }}>
      <div style={{fontSize:12, fontWeight:700, color:'var(--text-sec)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:16}}>
        {title}
      </div>
      {children}
    </div>
  );
}

export function EventDetailPage({ event, onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [joined, setJoined] = useState(false);
  const [success, setSuccess] = useState(false);
  const cfg = CAT_CFG[event.cat];
  const pct = Math.round((event.joined / event.total) * 100);

  const handleJoin = () => {
    setSuccess(true);
    setTimeout(() => { setShowModal(false); setSuccess(false); setJoined(true); }, 2200);
  };

  return (
    <motion.div className="page-padding" style={{maxWidth:800}} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
      <button onClick={onBack} style={{
        display:'flex', alignItems:'center', gap:8, padding:'8px 0', marginBottom:20, 
        background:'none', border:'none', cursor:'pointer', fontFamily:"'Inter',sans-serif",
        fontSize:14, fontWeight:500, color:'var(--text-sec)', transition:'color 0.2s'
      }} onMouseEnter={e=>e.target.style.color='white'} onMouseLeave={e=>e.target.style.color='var(--text-sec)'}>
        <IArrow/> Back
      </button>

      {/* Hero */}
      <div style={{
        borderRadius:24, background:`linear-gradient(135deg, ${cfg.color}22, rgba(15,23,42,0.8))`, 
        border:`1px solid ${cfg.color}44`, padding:'40px 32px', position:'relative', overflow:'hidden', marginBottom:20,
        boxShadow:`0 20px 40px rgba(0,0,0,0.4), inset 0 0 40px ${cfg.color}11`
      }}>
        <div style={{position:'absolute', inset:0, zIndex:0, opacity:0.3}}>{SCRIBBLES[event.cat]}</div>
        
        <div style={{position:'relative', zIndex:1}}>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:'100px',
            background:`${cfg.color}22`, color:cfg.color, border:`1px solid ${cfg.color}66`,
            fontSize:12, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', marginBottom:20,
            backdropFilter:'blur(10px)', boxShadow:`0 0 20px ${cfg.color}33`
          }}>
            {cfg.label}
          </span>
          <div className="heading-font" style={{fontSize:36, fontWeight:700, color:'white', letterSpacing:'-1px', lineHeight:1.2, marginBottom:16}}>
            {event.title}
          </div>
          <div style={{display:'flex', gap:24, fontSize:15, color:'rgba(255,255,255,0.8)', fontWeight:500}}>
            <span>{event.date}, 2025 · {event.time}</span>
            <span style={{display:'flex', alignItems:'center', gap:6}}><IMap size={16}/> {event.loc}</span>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:16}}>
        <div>
          <Card title="Mission Brief">
            <p style={{fontSize:15, color:'var(--text-main)', lineHeight:1.8}}>{event.desc}</p>
          </Card>
          
          <Card title="Logistics">
            {[ { icon:<ICal/>, label:'Date', value:`${event.date}, 2025` },
               { icon:<IClock/>, label:'Time', value:event.time },
               { icon:<IMap size={15}/>, label:'Location', value:event.loc } ].map((row,i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:16, padding:'12px 0', borderBottom:i<2?'1px solid var(--border)':'none'}}>
                <div style={{width:40, height:40, borderRadius:12, background:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', color:cfg.color, border:`1px solid ${cfg.color}33` }}>{row.icon}</div>
                <div>
                  <div style={{fontSize:12, color:'var(--text-sec)', marginBottom:2}}>{row.label}</div>
                  <div style={{fontSize:15, fontWeight:500, color:'white'}}>{row.value}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>

        <div>
          <Card title="Rewards">
            <div style={{background:`${cfg.color}15`, border:`1px solid ${cfg.color}40`, borderRadius:12, padding:16, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:12, color:'var(--text-sec)', marginBottom:4}}>XP Gain</div>
                <div className="heading-font" style={{fontSize:24, fontWeight:700, color:cfg.color}}>+{event.pts}</div>
              </div>
              <div style={{color:cfg.color}}><IStar size={24}/></div>
            </div>
          </Card>

          <Card title="Status">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}>
              <span style={{fontSize:15, fontWeight:600, color:'white'}}>{event.joined} / {event.total}</span>
              <span style={{fontSize:13, color:cfg.color}}>{pct}%</span>
            </div>
            <div style={{height:8, background:'var(--surface)', borderRadius:4, overflow:'hidden', marginBottom:12, border:'1px solid var(--border)'}}>
              <div style={{height:'100%', borderRadius:4, background:cfg.color, width:`${pct}%`, boxShadow:`0 0 10px ${cfg.color}`}}/>
            </div>
          </Card>

          {!joined ? (
            <button onClick={()=>setShowModal(true)} style={{
              width:'100%', padding:'18px', background:cfg.color, color:'white', border:'none', borderRadius:16,
              fontFamily:"'General Sans',sans-serif", fontSize:16, fontWeight:600, cursor:'pointer',
              boxShadow:`0 10px 24px ${cfg.color}66`, transition:'transform 0.2s', marginTop:8
            }}
             onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
             onMouseDown={e=>e.currentTarget.style.transform='scale(0.97)'}>
              Deploy & Join
            </button>
          ) : (
            <button style={{width:'100%', padding:'18px', background:'var(--surface)', color:cfg.color, border:`1px solid ${cfg.color}55`, borderRadius:16, fontFamily:"'General Sans',sans-serif", fontSize:16, fontWeight:600, cursor:'default', marginTop:8}}>✓ Confirmed for Deployment</button>
          )}
        </div>
      </div>

      {showModal && (
        <div onClick={()=>!success&&setShowModal(false)} style={{position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24}}>
          <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} onClick={e=>e.stopPropagation()} className="glass-panel" style={{borderRadius:24, width:'100%', maxWidth:440, padding:'32px 24px', textAlign:success?'center':'left'}}>
            {!success ? (
              <>
                <div className="heading-font" style={{fontSize:24, fontWeight:700, color:'white', marginBottom:8}}>Initialize Sequence</div>
                <div style={{fontSize:14, color:'var(--text-sec)', marginBottom:24}}>You're committing to <span style={{color:'white'}}>{event.title}</span>. Acknowledge requirements to proceed.</div>
                
                <div style={{marginBottom:24}}>
                  {event.reqs.map((req,i) => (
                    <div key={i} style={{display:'flex', alignItems:'center', gap:10, fontSize:14, color:'white', padding:'8px 0'}}>
                      <div style={{width:20, height:20, borderRadius:6, background:`${cfg.color}33`, color:cfg.color, display:'flex', alignItems:'center', justifyContent:'center'}}><ICheck/></div>
                      {req}
                    </div>
                  ))}
                </div>

                <div style={{display:'flex', gap:12}}>
                  <button onClick={()=>setShowModal(false)} style={{flex:1, padding:14, border:'1px solid var(--border)', borderRadius:12, background:'var(--surface)', color:'white', fontWeight:600, cursor:'pointer'}}>Abort</button>
                  <button onClick={handleJoin} style={{flex:1.5, padding:14, border:'none', borderRadius:12, background:cfg.color, color:'white', fontWeight:600, cursor:'pointer', boxShadow:`0 0 20px ${cfg.color}66`}}>Confirm</button>
                </div>
              </>
            ) : (
              <div style={{textAlign:'center'}}>
                <div style={{width:80, height:80, borderRadius:'50%', background:`${cfg.color}22`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:cfg.color, boxShadow:`0 0 40px ${cfg.color}44`}}><ISparkle/></div>
                <div className="heading-font" style={{fontSize:24, fontWeight:700, color:'white', marginBottom:8}}>Target Locked</div>
                <div style={{fontSize:14, color:'var(--text-sec)', marginBottom:20}}>Briefing documents dispatched. Standby for deployment.</div>
                <div style={{display:'inline-block', padding:'8px 16px', borderRadius:20, background:`${cfg.color}22`, color:cfg.color, fontWeight:700, border:`1px solid ${cfg.color}55`}}>+{event.pts} XP Anticipated</div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
