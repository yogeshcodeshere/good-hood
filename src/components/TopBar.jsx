import { useState } from 'react';
import { IMap, ISearch, IBell } from './Icons';

export function TopBar({ title, subtitle, onSearchClick, role, setRole }) {
  const [bellActive, setBellActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [hasNewNotifs, setHasNewNotifs] = useState(true);

  return (
    <>
      <style>{`
        .topbar-wrapper {
          position: sticky; top: 0; z-index: 100;
          padding: 24px 40px 16px;
          background: linear-gradient(to bottom, var(--bg-base) 20%, transparent 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
          display: flex; align-items: center; justify-content: space-between;
        }

        .tb-left { display: flex; align-items: baseline; gap: 16px; }
        .tb-title { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
        .tb-subtitle { font-size: 14px; color: var(--text-sec); font-weight: 500; }

        .tb-right { display: flex; align-items: center; gap: 12px; }

        .loc-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 16px; border-radius: 12px;
          background: var(--surface); border: 1px solid var(--border);
          font-size: 13px; font-weight: 600; color: var(--text-main);
          cursor: pointer; transition: all 0.3s; margin-right: 8px;
        }
        .loc-chip:hover { background: var(--surface-hover); border-color: rgba(255,255,255,0.2); transform: translateY(-1px); }

        .loc-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--plant);
          box-shadow: 0 0 12px var(--plant);
          animation: pulseDot 2s ease-in-out infinite;
        }

        .tb-btn {
          width: 44px; height: 44px; border-radius: 12px;
          border: 1px solid var(--border); background: var(--surface);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--text-sec); transition: all 0.3s;
          position: relative;
        }
        
        .tb-btn:hover { 
          border-color: rgba(255,255,255,0.2); color: white; background: var(--surface-hover);
          transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.2); 
        }
        .tb-btn:active { transform: scale(0.96); }
        .tb-btn.active-state { 
          background: rgba(59,130,246,0.1); color: var(--primary); 
          border-color: rgba(59,130,246,0.3); box-shadow: 0 0 16px rgba(59,130,246,0.2);
        }
        
        .notif-dot {
          position: absolute; top: 10px; right: 10px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #EF4444; border: 2px solid var(--bg-base);
          box-shadow: 0 0 8px #EF4444;
          transition: transform 0.2s;
        }
        .tb-btn:hover .notif-dot { transform: scale(1.2); }

        .notif-popup {
          position: absolute; top: 60px; right: 0;
          background: rgba(15,23,42,0.95); backdrop-filter: blur(16px);
          border: 1px solid var(--border); border-radius: 16px; padding: 20px; 
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1);
          width: 320px; animation: fadeUp 0.3s var(--ease-out-expo);
          transform-origin: top right;
        }

        .notif-item {
          padding: 12px; background: var(--bg-base); border: 1px solid var(--border);
          border-radius: 10px; line-height: 1.5; transition: all 0.2s; cursor: pointer;
        }
        .notif-item:hover { 
          background: var(--surface-hover); transform: translateY(-1px); 
          border-color: rgba(255,255,255,0.1); 
        }
        .notif-item.unread {
          background: rgba(59,130,246,0.1); border-color: rgba(59,130,246,0.3);
        }
        .notif-time { font-size: 11px; color: var(--text-sec); margin-bottom: 4px; }
        .notif-text { font-size: 13px; color: var(--text-main); }
        .notif-bold { color: var(--primary); font-weight: 600; }

        @keyframes pulseDot { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:0.5; transform:scale(0.8)} }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px) scale(0.95); } to { opacity:1; transform:translateY(0) scale(1); } }

        @media (max-width: 768px) {
          .topbar-wrapper { padding: 16px 20px; }
          .tb-title { font-size: 22px; }
          .tb-subtitle, .loc-chip { display: none; }
          .tb-btn { width: 40px; height: 40px; }
          .notif-popup { width: calc(100vw - 40px); right: -20px; }
        }
      `}</style>
      <div className="topbar-wrapper">
        <div className="tb-left">
          <h1 className="tb-title heading-font text-gradient">{title}</h1>
          {subtitle && <span className="tb-subtitle">{subtitle}</span>}
        </div>
        
        <div className="tb-right" style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <div className="loc-chip"><div className="loc-dot"/><IMap size={14}/> Panvel</div>
          
          <button className={`tb-btn ${searchActive ? 'active-state' : ''}`} 
            onClick={() => { setSearchActive(!searchActive); if(onSearchClick) onSearchClick(); }} title="Search">
            <ISearch/>
          </button>
          
          <div style={{position:'relative'}}>
            <button className={`tb-btn ${bellActive ? 'active-state' : ''}`} 
              onClick={() => { setBellActive(!bellActive); if(!bellActive) setHasNewNotifs(false); }} title="Notifications">
              <IBell/>
              {hasNewNotifs && <div className="notif-dot" />}
            </button>
            {bellActive && (
              <div className="notif-popup">
                <div style={{fontSize:'14px', fontWeight:600, marginBottom:'12px', color:'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span>Notifications</span>
                  {hasNewNotifs && <span style={{fontSize:'10px', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold'}}>2 New</span>}
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
                  <div className={`notif-item ${hasNewNotifs ? 'unread' : ''}`}>
                    <div className="notif-time">Just now</div>
                    <div className="notif-text">
                      <span className="notif-bold">Community Garden Setup</span> updated its event timing to 10:00 AM.
                    </div>
                  </div>
                  <div className={`notif-item ${hasNewNotifs ? 'unread' : ''}`}>
                    <div className="notif-time">2 hours ago</div>
                    <div className="notif-text">
                      <span className="notif-bold">Panvel Beach Cleanup</span> is almost full! Complete your registration.
                    </div>
                  </div>
                  <div className="notif-item">
                    <div className="notif-time">Yesterday</div>
                    <div className="notif-text">
                      Your registration for <span className="notif-bold">Food Drive</span> has been confirmed.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
