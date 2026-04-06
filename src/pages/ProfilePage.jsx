import { useState } from 'react';
import { IMap, IStar, IDownload, IFire, IHourglass, ITrophy } from '../components/Icons';
import { BADGES, ACTIVITY_TIMELINE, HEATMAP_DATA, CAT_CFG } from '../data/mockData';
import { motion } from 'framer-motion';

export function ProfilePage() {
  const [hoverBadge, setHoverBadge] = useState(null);

  const handleDownloadCert = (eventTitle) => {
    const certWindow = window.open('', '_blank');
    certWindow.document.write(`
      <html>
        <head>
          <title>Certificate of Participation</title>
          <style>
            body { font-family: sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#0f172a; color:white; }
            .cert { border: 10px solid #3B82F6; padding: 60px; text-align: center; background: #1e293b; border-radius: 20px; box-shadow: 0 0 50px rgba(59,130,246,0.3); max-width:800px; }
            h1 { font-size: 48px; color: #3B82F6; margin-bottom: 20px; }
            p { font-size: 24px; margin-bottom: 10px; }
            .name { font-size: 40px; font-weight: bold; color: #F59E0B; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="cert">
             <h1>GoodHood Certificate</h1>
             <p>This is to certify that</p>
             <div class="name">Arjun Shah</div>
             <p>has actively completed <b>${eventTitle}</b> and contributed to the community.</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    certWindow.document.close();
  };

  return (
    <motion.div className="page-padding" style={{maxWidth:960}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {/* Hero */}
      <div style={{ position:'relative', borderRadius:24, overflow:'hidden', marginBottom:24, border:'1px solid rgba(59,130,246,0.3)', boxShadow:'0 20px 40px rgba(0,0,0,0.5)' }}>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(5,5,16,0.9))', zIndex:0}}/>
        <div style={{position:'absolute', top:0, left:0, right:0, height:120, background:'linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899)', opacity:0.15, zIndex:1, filter:'blur(20px)'}}/>
        
        <div className="profile-hero" style={{position:'relative', zIndex:2, padding:'40px 32px', display:'flex', gap:32, alignItems:'center'}}>
          <div style={{
            width:100, height:100, borderRadius:24, background:'linear-gradient(135deg, #3B82F6, #06B6D4)', 
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:36, fontWeight:700, color:'white',
            border:'2px solid rgba(255,255,255,0.2)', boxShadow:'0 0 30px rgba(59,130,246,0.5)', position:'relative'
          }}>
            AS
            <div style={{position:'absolute', bottom:-10, background:'#0F172A', padding:'2px 8px', borderRadius:10, fontSize:11, fontWeight:700, border:'1px solid #3B82F6', color:'#3B82F6'}}>Lvl 7</div>
          </div>
          
          <div style={{flex:1}}>
            <div className="profile-hero-name" style={{display:'flex', alignItems:'center', gap:16, marginBottom:8}}>
              <div className="heading-font" style={{fontSize:32, fontWeight:700, color:'white', letterSpacing:'-0.5px'}}>Arjun Shah</div>
              <div style={{background:'rgba(245,158,11,0.15)', color:'#F59E0B', padding:'4px 12px', borderRadius:100, fontSize:12, fontWeight:700, border:'1px solid rgba(245,158,11,0.3)', display:'flex', alignItems:'center', gap:4}}>
                <IFire/> 12 Day Streak
              </div>
            </div>
            <div className="profile-hero-loc" style={{fontSize:15, color:'var(--text-sec)', display:'flex', alignItems:'center', gap:8, marginBottom:20}}>
              <IMap size={14}/> Panvel, Maharashtra · Member since Jan 2025
            </div>
            
            <div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:13, color:'white', marginBottom:6, fontWeight:600}}>
                <span>Community Champion</span>
                <span style={{color:'var(--primary)'}}>980 / 1200 XP</span>
              </div>
              <div style={{height:6, background:'rgba(255,255,255,0.05)', borderRadius:3, overflow:'hidden', border:'1px solid rgba(255,255,255,0.05)'}}>
                <div style={{height:'100%', background:'linear-gradient(90deg, #3B82F6, #8B5CF6)', width:'81%', boxShadow:'0 0 10px #8B5CF6'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:24, marginBottom:32}}>
        {/* Stats Grid */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          {[ {l:'Events', n:'11', c:'#3B82F6'}, {l:'Certificates', n:'3', c:'#F59E0B'}, {l:'Hours', n:'42', c:'#22C55E'}, {l:'Kudos', n:'128', c:'#EC4899'} ].map((s,i)=> (
            <motion.div key={i} className="glass-panel" style={{padding:20, borderRadius:20}} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: i*0.1}}>
              <div style={{fontSize:12, color:'var(--text-sec)', marginBottom:4, fontWeight:600}}>{s.l}</div>
              <div className="heading-font" style={{fontSize:32, fontWeight:700, color:'white', textShadow:`0 0 20px ${s.c}66`}}>{s.n}</div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <motion.div className="glass-panel" style={{padding:24, borderRadius:24}} initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.3}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
            <div className="heading-font" style={{fontSize:18, fontWeight:600, color:'white'}}>Showcase</div>
            <div style={{fontSize:13, color:'var(--primary)', cursor:'pointer'}}>View all</div>
          </div>
          
          <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16}}>
            {BADGES.map((b) => (
              <div key={b.id} style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}}
                onMouseEnter={()=>setHoverBadge(b.id)} onMouseLeave={()=>setHoverBadge(null)}>
                <div style={{width:56, height:56, borderRadius:'50%', background:`${b.color}22`, border:`1px solid ${b.color}55`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, marginBottom:8, transition:'all 0.2s', transform: hoverBadge===b.id ? 'scale(1.1) translateY(-4px)' : 'none', boxShadow: hoverBadge===b.id ? `0 10px 20px ${b.color}44` : 'none'}}>
                  {b.icon}
                </div>
                {hoverBadge === b.id && (
                  <div style={{position:'absolute', top:-40, background:'var(--bg-top)', padding:'6px 12px', border:`1px solid ${b.color}`, borderRadius:8, fontSize:12, whiteSpace:'nowrap', color:'white', zIndex:10, boxShadow:`0 10px 20px rgba(0,0,0,0.5)`}}>
                    {b.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="event-grid" style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:24}}>
        {/* Left Col - Activity & Heatmap */}
        <div>
          <div className="glass-panel" style={{padding:24, borderRadius:24, marginBottom:24}}>
             <div className="heading-font" style={{fontSize:18, fontWeight:600, color:'white', marginBottom:20}}>Contribution Graph</div>
             <div style={{display:'flex', flexWrap:'wrap', gap:4}}>
               {HEATMAP_DATA.map((val, i) => {
                 let bg = 'rgba(255,255,255,0.05)';
                 if(val===1) bg = 'rgba(59,130,246,0.3)';
                 if(val===2) bg = 'rgba(59,130,246,0.5)';
                 if(val===3) bg = 'rgba(59,130,246,0.8)';
                 if(val===4) bg = 'rgb(59,130,246)';
                 return <div key={i} style={{width:14, height:14, borderRadius:3, background:bg, border:'1px solid rgba(0,0,0,0.2)'}}/>
               })}
             </div>
             <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center', gap:8, marginTop:12, fontSize:11, color:'var(--text-sec)'}}>
               Less <div style={{display:'flex', gap:4}}>
                 <div style={{width:10, height:10, borderRadius:2, background:'rgba(255,255,255,0.05)'}}/>
                 <div style={{width:10, height:10, borderRadius:2, background:'rgba(59,130,246,0.3)'}}/>
                 <div style={{width:10, height:10, borderRadius:2, background:'rgb(59,130,246)'}}/>
               </div> More
             </div>
          </div>

          <div className="glass-panel" style={{padding:24, borderRadius:24}}>
            <div className="heading-font" style={{fontSize:18, fontWeight:600, color:'white', marginBottom:20}}>Recent Commits</div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', left:19, top:10, bottom:10, width:2, background:'rgba(255,255,255,0.05)'}}/>
              {ACTIVITY_TIMELINE.map((item, i) => (
                <div key={item.id} style={{display:'flex', gap:20, marginBottom:i===ACTIVITY_TIMELINE.length-1?0:24, position:'relative'}}>
                  <div style={{width:40, height:40, borderRadius:12, background:`${item.color}22`, border:`1px solid ${item.color}55`, display:'flex', alignItems:'center', justifyContent:'center', color:item.color, zIndex:1, flexShrink:0}}>
                    {item.type==='event' ? <IStar size={16}/> : item.type==='badge' ? <ITrophy/> : <IHourglass/>}
                  </div>
                  <div style={{paddingTop:2, flex:1}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                      <div>
                        <div style={{fontSize:14, color:'white', fontWeight:500, marginBottom:4}}>{item.title}</div>
                        <div style={{fontSize:12, color:'var(--text-sec)'}}>{item.time}</div>
                      </div>
                      {item.type === 'event' && (
                        <button onClick={() => handleDownloadCert(item.title)} style={{
                          padding:'4px 10px', background:`${item.color}22`, color:item.color, border:`1px solid ${item.color}55`, borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer'
                        }}>
                          Get Certificate
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Impact & Goal */}
        <div>
          <div className="glass-panel" style={{padding:24, borderRadius:24, marginBottom:24}}>
            <div className="heading-font" style={{fontSize:18, fontWeight:600, color:'white', marginBottom:20}}>Monthly Objective</div>
            <div style={{textAlign:'center', position:'relative', marginBottom:20}}>
              <svg width="140" height="140" viewBox="0 0 100 100" style={{transform:'rotate(-90deg)'}}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="10" strokeDasharray="251" strokeDashoffset="100" style={{filter:'drop-shadow(0 0 8px rgba(59,130,246,0.6))'}} strokeLinecap="round"/>
              </svg>
              <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <div className="heading-font" style={{fontSize:24, fontWeight:700, color:'white', marginTop:35}}>3 / 5</div>
                <div style={{fontSize:11, color:'var(--text-sec)', textTransform:'uppercase', letterSpacing:'1px'}}>Events</div>
              </div>
            </div>
            <button style={{width:'100%', padding:'12px', background:'transparent', color:'var(--text-sec)', border:'1px solid var(--border)', borderRadius:12, fontSize:13, fontWeight:600, cursor:'pointer', transition:'all 0.2s'}}>Find Next Event</button>
          </div>

          <div className="glass-panel" style={{padding:24, borderRadius:24}}>
            <div className="heading-font" style={{fontSize:18, fontWeight:600, color:'white', marginBottom:20}}>Impact Summary</div>
            {[
              {icon:'🌲', count:12, label:'Saplings Planted', color:CAT_CFG.plantation.color},
              {icon:'🩸', count:2, label:'Units Donated', color:CAT_CFG.blood.color},
              {icon:'🗑️', count:34, label:'kg Waste Cleared', color:CAT_CFG.cleanup.color}
            ].map((imp,i) => (
              <div key={i} style={{background:`rgba(255,255,255,0.02)`, border:'1px solid rgba(255,255,255,0.05)', borderRadius:12, padding:'12px 16px', display:'flex', alignItems:'center', gap:16, marginBottom:12}}>
                <div style={{fontSize:20, width:36, height:36, borderRadius:10, background:`${imp.color}22`, display:'flex', alignItems:'center', justifyContent:'center'}}>{imp.icon}</div>
                <div>
                  <div style={{fontSize:16, fontWeight:700, color:'white'}}>{imp.count}</div>
                  <div style={{fontSize:12, color:'var(--text-sec)'}}>{imp.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
