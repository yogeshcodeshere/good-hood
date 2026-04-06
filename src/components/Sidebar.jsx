import { IHome, ITrophy, IUser, IPlus, IStar, ICompass, IClose } from './Icons';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Explore', icon: <IHome /> },
  { id: 'leaderboard', label: 'Leaderboard', icon: <ITrophy /> },
  { id: 'profile', label: 'Profile', icon: <IUser /> },
];

export function Sidebar({ active, onNavigate, onCreateClick, collapsed, onToggle }) {
  return (
    <>
      <style>{`
        .sidebar-wrapper {
          position: fixed; top: 24px; left: 24px; bottom: 24px;
          width: ${collapsed ? '72px' : '260px'};
          z-index: 200; overflow: hidden;
          border-radius: 20px;
          transition: width 0.4s var(--ease-spring);
        }
        
        .sidebar {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
        }

        .sb-top {
          padding: ${collapsed ? '24px 0' : '24px 20px'};
          display: flex; align-items: center;
          justify-content: ${collapsed ? 'center' : 'space-between'};
          min-height: 80px;
        }

        .sb-logo {
          font-size: 20px; font-weight: 700;
          letter-spacing: -0.5px; white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.2s;
        }

        .sb-toggle {
          background: rgba(255,255,255,0.05); border: 1px solid var(--border);
          width: 32px; height: 32px; border-radius: 10px;
          color: var(--text-sec); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; flex-shrink: 0;
        }
        .sb-toggle:hover { color: var(--text-main); background: var(--surface-hover); border-color: rgba(255,255,255,0.2); }

        .sb-nav { flex: 1; padding: 0 ${collapsed ? '12px' : '16px'}; display: flex; flex-direction: column; gap: 8px; }
        
        .sb-item {
          display: flex; align-items: center;
          gap: 14px; padding: ${collapsed ? '12px' : '12px 16px'};
          border-radius: 12px; cursor: pointer; border: none;
          background: transparent; color: var(--text-sec);
          font-size: 14px; font-weight: 500;
          transition: all 0.3s; width: 100%;
          white-space: nowrap; justify-content: ${collapsed ? 'center' : 'flex-start'};
          position: relative;
        }
        
        .sb-item:hover { color: var(--text-main); }
        .sb-item.active { color: white; font-weight: 600; }
        
        .active-bg {
          position: absolute; inset: 0;
          background: var(--surface-hover);
          border: 1px solid var(--border-hover);
          border-radius: 12px;
          box-shadow: inset 0 0 12px rgba(255,255,255,0.02);
          z-index: -1;
        }

        .active-beam {
          position: absolute; left: -16px; top: 15%; bottom: 15%;
          width: 3px; background: var(--primary);
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px var(--primary);
        }

        .sb-label { opacity: ${collapsed ? 0 : 1}; transition: opacity 0.2s; }
        
        .sb-bottom { padding: ${collapsed ? '16px 12px' : '16px'}; border-top: 1px solid var(--border); }
        
        .sb-create {
          width: 100%; padding: ${collapsed ? '12px' : '14px 16px'};
          background: linear-gradient(135deg, var(--primary), var(--accent-p));
          color: white; border: none; border-radius: 14px;
          font-size: 14px; font-weight: 600;
          cursor: pointer; display: flex; align-items: center;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          gap: 10px; transition: all 0.3s var(--ease-out-expo);
          white-space: nowrap; 
          box-shadow: 0 8px 20px rgba(99,102,241,0.25), inset 0 1px 1px rgba(255,255,255,0.2);
        }
        .sb-create:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(99,102,241,0.35), inset 0 1px 1px rgba(255,255,255,0.3); filter: brightness(1.1); }
        .sb-create:active { transform: scale(0.96); }
        
        .sb-user {
          display: flex; align-items: center; gap: 12px;
          padding: ${collapsed ? '12px 0' : '12px'};
          margin-bottom: 12px; border-radius: 12px;
          background: rgba(0,0,0,0.2); border: 1px solid var(--border);
          cursor: pointer; transition: all 0.3s;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
        }
        .sb-user:hover { background: rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.1); }
        
        .sb-user-av {
          width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #3B82F6, #06B6D4);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; color: white; position: relative;
        }
        /* Glowing ring for high rank */
        .sb-user-av::after {
          content: ''; position: absolute; inset: -3px;
          border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.4);
          z-index: -1;
        }
        
        .sb-user-info { opacity: ${collapsed ? 0 : 1}; transition: opacity 0.2s; overflow: hidden; width: 100%; }
        .sb-user-name { font-size: 13px; font-weight: 600; color: white; white-space: nowrap; margin-bottom: 4px; }
        .xp-bar-bg { width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
        .xp-bar-fill { width: 81%; height: 100%; background: linear-gradient(90deg, #3B82F6, #8B5CF6); }
        .xp-text { font-size: 10px; color: var(--text-sec); display: flex; justify-content: space-between; margin-top: 4px; }

        @media (max-width: 768px) {
          .sidebar-wrapper { 
            top: auto; left: 0; bottom: 0; width: 100% !important; height: 72px; 
            border-radius: 20px 20px 0 0; border-bottom: none;
          }
          .sb-top, .sb-user { display: none; }
          .sb-nav { flex-direction: row; padding: 0 16px; justify-content: space-between; align-items: center; }
          .sb-item { flex-direction: column; padding: 10px 0; width: 60px; gap: 4px; justify-content: center; border-radius: 12px; }
          .active-beam { display: none; }
          .sb-label { opacity: 1 !important; font-size: 10px; margin-top: 2px; }
          .sb-bottom { padding: 0 16px; border-top: none; display: flex; align-items: center; }
          .sb-create { width: 48px; height: 48px; padding: 0; justify-content: center; border-radius: 14px; }
          .sb-create span { display: none; }
        }
      `}</style>
      <div className="sidebar-wrapper glass-panel">
        <div className="sidebar">
          <div className="sb-top">
            {!collapsed && <div className="sb-logo heading-font text-gradient">Good<span style={{color:'var(--primary)'}}>Hood</span></div>}
            <button className="sb-toggle" onClick={onToggle}>
              {collapsed ? <ICompass /> : <IClose />}
            </button>
          </div>
          
          <nav className="sb-nav">
            {NAV_ITEMS.map(item => {
              const isActive = active === item.id;
              return (
                <button key={item.id} className={`sb-item ${isActive ? 'active' : ''}`}
                  onClick={() => onNavigate(item.id)} title={collapsed ? item.label : ''}>
                  {isActive && <motion.div layoutId="nav-bg" className="active-bg" initial={false} transition={{type:'spring', stiffness:300, damping:30}}/>}
                  {isActive && !collapsed && <motion.div layoutId="nav-beam" className="active-beam" initial={false} transition={{type:'spring', stiffness:300, damping:30}}/>}
                  
                  <div style={{ position: 'relative', zIndex: 1, color: isActive ? 'var(--primary)' : 'inherit', filter: isActive ? 'drop-shadow(0 0 8px rgba(59,130,246,0.5))' : 'none', transition: 'all 0.3s' }}>
                    {item.icon}
                  </div>
                  <span className="sb-label" style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sb-bottom">
            <div className="sb-user" title={collapsed ? 'Arjun Shah · Lvl 7' : ''} onClick={() => onNavigate('profile')}>
              <div className="sb-user-av">AS</div>
              <div className="sb-user-info">
                <div className="sb-user-name">Arjun Shah</div>
                <div className="xp-bar-bg"><div className="xp-bar-fill" /></div>
                <div className="xp-text"><span>Lvl 7</span><span>980 XP</span></div>
              </div>
            </div>
            
            <button className="sb-create" onClick={onCreateClick} title={collapsed ? 'Create Event' : ''}>
              <IPlus />
              <span style={{ opacity: collapsed ? 0 : 1, transition: 'opacity 0.2s' }}>New Event</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
