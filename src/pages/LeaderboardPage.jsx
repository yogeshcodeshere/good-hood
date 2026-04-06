import { useState } from 'react';
import { IStar, ICompass } from '../components/Icons';
import { CAT_CFG } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { api } from '../api';

export function LeaderboardPage() {
  const [filter, setFilter] = useState('all-time');
  const [expandedId, setExpandedId] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    api.getLeaderboard().then(setLeaderboard);
  }, []);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3, 12);
  const podiumOrder = top3.length === 3 ? [top3[1], top3[0], top3[2]] : [];

  const tFilters = [
    {id:'weekly', label:'This Week'},
    {id:'monthly', label:'This Month'},
    {id:'all-time', label:'All Time'}
  ];

  return (
    <motion.div className="page-padding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Your Status Banner */}
      <div className="glass-panel" style={{borderRadius:20, padding:20, marginBottom:32, display:'flex', alignItems:'center', justifyContent:'space-between', borderLeft:'4px solid var(--primary)'}}>
        <div style={{display:'flex', alignItems:'center', gap:16}}>
          <div style={{width:48, height:48, borderRadius:16, background:'linear-gradient(135deg, var(--primary), var(--accent-p))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700, color:'white', boxShadow:'0 0 20px rgba(99,102,241,0.4)'}}>AS</div>
          <div>
            <div style={{fontSize:14, color:'var(--text-sec)', marginBottom:4}}>Your Current Standing</div>
            <div className="heading-font" style={{fontSize:20, fontWeight:700, color:'white'}}>Rank #2 — 980 XP</div>
          </div>
        </div>
        <div style={{background:'rgba(34,197,94,0.15)', color:'#22C55E', padding:'6px 12px', borderRadius:8, fontSize:13, fontWeight:600, border:'1px solid rgba(34,197,94,0.3)'}}>
          ↑ 2 places this week
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'center', gap:8, marginBottom:40}}>
        <div className="glass-panel" style={{display:'inline-flex', padding:4, borderRadius:12}}>
          {tFilters.map(f => (
            <button key={f.id} onClick={()=>setFilter(f.id)} style={{
              padding:'8px 16px', borderRadius:8, border:'none', background:filter===f.id?'rgba(255,255,255,0.1)':'transparent',
              color:filter===f.id?'white':'var(--text-sec)', fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s',
              boxShadow:filter===f.id?'0 2px 10px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)':'none'
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="podium-container" style={{display:'flex', alignItems:'flex-end', justifyContent:'center', gap:16, marginBottom:48, paddingTop:20}}>
        {podiumOrder.map((u, i) => {
          if(!u) return null;
          const rank = leaderboard.indexOf(u) + 1;
          const glows = ['rgba(148,163,184,0.5)', 'rgba(251,191,36,0.6)', 'rgba(180,83,9,0.5)'];
          const colors = ['#94A3B8', '#FBBF24', '#B45309'];
          const heights = [160, 200, 140];
          
          return (
            <motion.div key={u.id} className="podium-item" initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: i*0.1+0.2, type:'spring'}} style={{
              width:120, position:'relative', display:'flex', flexDirection:'column', alignItems:'center'
            }}>
              <div style={{marginBottom:16, position:'relative'}}>
                <div style={{width:64, height:64, borderRadius:20, background:u.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, fontWeight:700, color:'white', boxShadow:`0 0 30px ${u.color}66`, border:`2px solid ${colors[i]}`, position:'relative', zIndex:2}}>{u.avatar}</div>
                {rank === 1 && <div style={{position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)', fontSize:28, zIndex:3, filter:'drop-shadow(0 0 10px rgba(251,191,36,0.8))'}}>👑</div>}
              </div>
              
              <div style={{
                height:heights[i], width:'100%', background:`linear-gradient(to top, rgba(255,255,255,0.03), ${glows[i]})`,
                borderRadius:'20px 20px 0 0', border:`1px solid ${colors[i]}`, borderBottom:'none',
                display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 10px',
                position:'relative', overflow:'hidden', boxShadow:`inset 0 20px 40px -20px ${colors[i]}`, backdropFilter:'blur(12px)'
              }}>
                <div className="heading-font" style={{fontSize:16, fontWeight:700, color:'white', marginBottom:4, textAlign:'center'}}>{u.name.split(' ')[0]}</div>
                <div style={{fontSize:13, color:colors[i], fontWeight:700, display:'flex', alignItems:'center', gap:4}}><IStar size={12}/>{u.pts}</div>
                <div style={{fontSize:48, fontWeight:800, color:'rgba(0,0,0,0.3)', position:'absolute', bottom:10, WebkitTextStroke:`1px ${colors[i]}`, opacity:0.5}}>{rank}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="heading-font" style={{fontSize:20, fontWeight:700, color:'white', marginBottom:16, letterSpacing:'-0.5px'}}>Global Rankings</div>

      <div style={{display:'flex', flexDirection:'column', gap:8}}>
        {rest.map((u, i) => (
          <motion.div key={u.id} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:i*0.05 + 0.4}}>
            <div onClick={()=>setExpandedId(expandedId===u.id?null:u.id)} className="glass-panel" style={{
              padding:'16px 20px', borderRadius:16, display:'flex', alignItems:'center', gap:16, cursor:'pointer',
              border: u.you ? '1px solid rgba(59,130,246,0.5)' : '1px solid var(--border)',
              background: u.you ? 'rgba(59,130,246,0.1)' : 'var(--surface)', transition:'all 0.2s'
            }}>
              <div className="heading-font" style={{fontSize:16, fontWeight:700, color:'var(--text-sec)', width:30, textAlign:'center'}}>#{i+4}</div>
              
              <div style={{width:44, height:44, borderRadius:14, background:`${u.color}33`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:700, color:u.color, border:`1px solid ${u.color}66`}}>{u.avatar}</div>
              
              <div style={{flex:1}}>
                <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:4}}>
                  <span style={{fontSize:15, fontWeight:600, color:'white'}}>{u.name}</span>
                  {u.you && <span style={{background:'var(--primary)', color:'white', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:100, letterSpacing:'0.5px'}}>YOU</span>}
                </div>
                <div style={{display:'flex', gap:16, fontSize:12, color:'var(--text-sec)'}}>
                  <span style={{color:CAT_CFG[u.cat].color}}>{u.streak} 🔥 streak</span>
                  <span>{u.events} events</span>
                  <span>{u.badges} badges</span>
                </div>
              </div>

              <div className="heading-font" style={{fontSize:20, fontWeight:700, color:'white', display:'flex', alignItems:'center', gap:6}}>
                {u.pts} <span style={{color:'var(--social)', opacity:0.8}}><IStar size={16}/></span>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === u.id && (
                <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} style={{overflow:'hidden'}}>
                  <div style={{padding:'16px 20px 24px 80px', borderLeft:`2px solid ${u.color}55`, marginLeft:30}}>
                    <div style={{fontSize:12, fontWeight:600, color:'var(--text-sec)', marginBottom:12, textTransform:'uppercase'}}>Focus Area</div>
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <div style={{width:'100%', height:6, background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden', display:'flex'}}>
                        <div style={{width:'50%', background:CAT_CFG[u.cat].color}} title={CAT_CFG[u.cat].label}/>
                        <div style={{width:'30%', background:CAT_CFG.social.color}}/>
                        <div style={{width:'20%', background:CAT_CFG.awareness.color}}/>
                      </div>
                      <div style={{fontSize:13, color:CAT_CFG[u.cat].color, fontWeight:600, whiteSpace:'nowrap'}}>{CAT_CFG[u.cat].label} Main</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
