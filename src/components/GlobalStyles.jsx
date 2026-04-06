export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=General+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --primary: #3B82F6;
      --primary-hover: #2563EB;
      --accent-p: #8B5CF6;
      --accent-c: #06B6D4;
      --accent-pk: #EC4899;
      --bg-base: #000000;
      --bg-mid: #0A0A0A;
      --bg-top: #111111;
      
      --surface: rgba(255, 255, 255, 0.04);
      --surface-hover: rgba(255, 255, 255, 0.08);
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.15);
      --border-glow: rgba(59, 130, 246, 0.5);
      
      --text-main: #F8FAFC;
      --text-sec: #94A3B8;
      
      --sidebar-w: 240px;
      
      --blood: #EF4444; --blood-bg: rgba(239,68,68,0.15);
      --plant: #22C55E; --plant-bg: rgba(34,197,94,0.15);
      --clean: #06B6D4; --clean-bg: rgba(6,182,212,0.15);
      --social: #F59E0B; --social-bg: rgba(245,158,11,0.15);
      --aware: #EC4899; --aware-bg: rgba(236,72,153,0.15);

      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    body { 
      font-family: 'Inter', sans-serif; 
      background: var(--bg-base); 
      color: var(--text-main); 
      -webkit-font-smoothing: antialiased; 
      min-height: 100vh;
      overflow-x: hidden;
    }

    h1, h2, h3, .heading-font {
      font-family: 'General Sans', sans-serif;
    }
    
    ::-webkit-scrollbar { width: 6px; } 
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--border-hover); }

    /* Particles & Noise */
    .bg-noise {
      position: fixed; inset: 0; z-index: 0;
      opacity: 0.02; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
    .bg-pattern {
      position: fixed; inset: 0; z-index: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
    }

    /* Glass Effect Utility */
    .glass-panel {
      background: var(--surface);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    }

    /* Gradient Text Utility */
    .text-gradient {
      background: linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .text-gradient-accent {
      background: linear-gradient(135deg, var(--primary) 0%, var(--accent-p) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Layout */
    .page-padding { padding: 32px 40px 60px; max-width: 1200px; margin: 0 auto; position: relative; z-index: 10; }
    .main-content { margin-left: 312px; transition: margin-left 0.4s var(--ease-spring); min-height: 100vh; display: flex; flex-direction: column; }
    .main-content.collapsed { margin-left: 116px; }

    /* Animations */
    @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    @keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }

    @media (max-width: 768px) {
      .page-padding { padding: 20px 20px 40px; }
      .main-content, .main-content.collapsed { margin-left: 0 !important; padding-bottom: 90px; }
      
      /* Login Page Overrides */
      .login-container { flex-direction: column !important; }
      .login-left { padding: 40px 20px !important; align-items: center !important; text-align: center !important; }
      .login-left p { text-align: center !important; font-size: 15px !important; }
      .login-left .heading-font { font-size: 36px !important; }
      .login-right { border-left: none !important; border-top: 1px solid rgba(255, 255, 255, 0.05) !important; padding: 40px 20px !important; }

      /* Generic Layout Overrides */
      .event-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
      .ev-title { font-size: 28px !important; }
      .ev-meta { flex-direction: column !important; gap: 8px !important; }
      
      /* Profile Page Overrides */
      .profile-hero { flex-direction: column !important; text-align: center !important; gap: 16px !important; padding: 32px 20px !important; }
      .profile-hero > div:last-child { width: 100% !important; }
      .profile-hero-name { justify-content: center !important; margin-bottom: 12px !important; }
      .profile-hero-loc { justify-content: center !important; }
      
      /* Leaderboard Podium Overrides */
      .podium-container { gap: 8px !important; }
      .podium-item { width: 100px !important; }
      .podium-item > div:first-child { transform: scale(0.85); margin-bottom: 4px !important; }
      .podium-item .heading-font { font-size: 14px !important; }

      /* Create Modal Mobile Fix */
      .create-modal { padding: 20px !important; border-radius: 16px !important; }
    }
  `}</style>
);
