import { useState, useRef } from 'react';
import { IMap, IUsers, IStar, IBookmark } from './Icons';
import { SCRIBBLES } from './Icons';
import { CAT_CFG } from '../data/mockData';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function EventCard({ event, onClick, delay = 0 }) {
  const [bookmarked, setBookmarked] = useState(false);
  const cardRef = useRef(null);
  const [animateRef, isVisible] = useScrollReveal();
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    
    // Tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
  };

  const cfg = CAT_CFG[event.cat] || CAT_CFG.social;
  const pct = Math.round((event.joined / event.total) * 100);
  const isUrgent = pct > 85;

  return (
    <>
      <style>{`
        .ecard {
          background: rgba(15,23,42,0.6);
          border-radius: 20px;
          border: 1px solid var(--border);
          position: relative; overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s var(--ease-out-expo), box-shadow 0.4s, border-color 0.4s;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .ecard.visible {
          opacity: 1; transform: translateY(0);
          transition: opacity 0.6s ease, transform 0.6s var(--ease-out-expo);
        }

        .ecard::before {
          content: ""; position: absolute; inset: 0; z-index: 0;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
        }
        
        .ecard::after {
          content: ""; position: absolute; inset: -1px; z-index: -1;
          background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--card-color-55), transparent 40%);
          opacity: 0; transition: opacity 0.4s; border-radius: 21px;
        }

        .ecard:hover { 
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px var(--card-color-15); 
          border-color: rgba(255,255,255,0.15); z-index: 10;
        }
        .ecard:hover::before, .ecard:hover::after { opacity: 1; }

        .ec-banner {
          height: 120px; position: relative; overflow: hidden;
          background: var(--card-color-15);
          border-bottom: 1px solid var(--border);
        }

        .ec-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 100px;
          background: rgba(0,0,0,0.4); color: var(--card-color);
          border: 1px solid var(--card-color-40); backdrop-filter: blur(8px);
          font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
          box-shadow: 0 0 10px var(--card-color-20);
        }

        .ec-time {
          font-size: 11px; color: white; font-weight: 500;
          background: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 8px;
          backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1);
        }

        .ec-body { padding: 16px 20px 20px; position: relative; z-index: 1; }
        
        .ec-title {
          font-family: 'General Sans', sans-serif; font-size: 18px; font-weight: 600;
          color: white; margin-bottom: 6px; line-height: 1.3;
        }
        
        .ec-desc {
          font-size: 13px; color: var(--text-sec); line-height: 1.6; margin-bottom: 16px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }

        .ec-prog-bg { height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; position: relative; }
        .ec-prog-fill { 
          height: 100%; border-radius: 3px; background: var(--card-color);
          width: ${pct}%; 
          box-shadow: 0 0 10px var(--card-color);
        }
        .ec-prog-glow {
          position: absolute; top: 0; left: 0; height: 100%; width: ${pct}%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          animation: shimmer 2s infinite;
        }

        .ec-avatars { display: flex; margin-right: 8px; }
        .ec-av-circle { 
          width: 24px; height: 24px; border-radius: 50%; border: 2px solid #0F172A;
          background: var(--surface); display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: white; margin-left: -8px;
          background-size: cover;
        }
        .ec-av-circle:first-child { margin-left: 0; }

        .ec-btn {
          padding: 8px 16px; border-radius: 10px; border: none;
          background: rgba(255,255,255,0.05); color: white;
          font-size: 13px; font-weight: 600; cursor: pointer;
          transition: all 0.3s; position: relative; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .ec-btn::before {
          content: ""; position: absolute; inset: 0; 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%); transition: transform 0.5s;
        }
        .ecard:hover .ec-btn { background: var(--card-color); border-color: var(--card-color); box-shadow: 0 0 15px var(--card-color-40); }
        .ecard:hover .ec-btn::before { transform: translateX(100%); }
      `}</style>
      
      <div 
        ref={(el) => { cardRef.current = el; animateRef(el); }}
        className={`ecard ${isVisible ? 'visible' : ''}`}
        style={{ 
          transitionDelay: `${delay}ms`, 
          "--card-color": cfg.color,
          "--card-color-15": `${cfg.color}15`,
          "--card-color-20": `${cfg.color}20`,
          "--card-color-40": `${cfg.color}40`,
          "--card-color-55": `${cfg.color}55`
        }}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <div className="ec-banner">
          <div style={{position:'absolute', inset:0, zIndex:0}}>{SCRIBBLES[event.cat]}</div>
          <div style={{position:'relative', zIndex:1, padding:'16px', display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              <span className="ec-tag">{cfg.label}</span>
              <span className="ec-time">{event.date} · {event.time}</span>
            </div>
            
            <button 
              onClick={(e)=>{e.stopPropagation();setBookmarked(!bookmarked)}} 
              style={{
                width:36, height:36, borderRadius:12, border:'1px solid rgba(255,255,255,0.1)',
                background:'rgba(0,0,0,0.4)', backdropFilter:'blur(8px)', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                color: bookmarked ? cfg.color : 'white', transition:'0.3s'
              }}
            >
              <IBookmark filled={bookmarked}/>
            </button>
          </div>
          
          {isUrgent && (
            <div style={{position:'absolute', bottom:12, right:16, fontSize:11, fontWeight:700, 
              color:'#EF4444', background:'rgba(239,68,68,0.2)', padding:'4px 10px', borderRadius:6,
              border:'1px solid rgba(239,68,68,0.3)', backdropFilter:'blur(4px)'}}>
              🔥 Almost Full
            </div>
          )}
        </div>

        <div className="ec-body">
          <div className="ec-title heading-font">{event.title}</div>
          <div className="ec-desc">{event.desc}</div>
          
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12, color:'var(--text-sec)', marginBottom:16}}>
            <IMap size={14}/> {event.loc}
          </div>

          <div style={{marginBottom:16}}>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--text-main)', marginBottom:8, fontWeight:500}}>
              <span style={{display:'flex', alignItems:'center', gap:6}}>
                <div className="ec-avatars">
                  <div className="ec-av-circle" style={{background:'#EC4899'}}>S</div>
                  <div className="ec-av-circle" style={{background:'#3B82F6'}}>M</div>
                  <div className="ec-av-circle" style={{background:'#F59E0B'}}>A</div>
                </div>
                {event.joined} joined
              </span>
              <span style={{color: cfg.color}}>{pct}%</span>
            </div>
            <div className="ec-prog-bg">
              <div className="ec-prog-fill">
                <div className="ec-prog-glow"/>
              </div>
            </div>
          </div>

          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:16, borderTop:'1px solid var(--border)'}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:4, fontSize:13, fontWeight:700, color:'#F59E0B'}}>
                <IStar size={14}/> +{event.pts} XP
              </div>
            </div>
            <button className="ec-btn" onClick={e=>{e.stopPropagation();onClick()}}>Join Event</button>
          </div>
        </div>
      </div>
    </>
  );
}
