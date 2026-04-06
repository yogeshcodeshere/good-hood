import { motion } from 'framer-motion';
import { useState } from 'react';

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitLogin = (role) => {
    if (!email || !password) {
      setError('Please enter your credentials to authenticate.');
      return;
    }
    
    // Simple dummy validation
    if (password.length > 3) {
      onLogin(role);
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div style={{
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh',
      position:'relative', zIndex:50, padding: 24
    }}>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{
        background:'rgba(15,23,42,0.6)', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.1)',
        padding:'48px', borderRadius:'24px', width:'100%', maxWidth:'400px', textAlign:'center',
        boxShadow:'0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <div className="heading-font" style={{fontSize:32, fontWeight:700, color:'white', marginBottom:8}}>GoodHood</div>
        <div style={{fontSize:15, color:'var(--text-sec)', marginBottom:32}}>Authenticate below to continue to the portal.</div>

        <div style={{display:'flex', flexDirection:'column', gap:16, marginBottom: 24}}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} onChange={e=>setEmail(e.target.value)}
            style={{
              width:'100%', padding:'14px 16px', background:'rgba(255,255,255,0.05)', color:'white', border:'1px solid var(--border)',
              borderRadius:12, fontSize:15, outline:'none'
            }}
          />
          <input 
            type="password" 
            placeholder="Secure Password" 
            value={password} onChange={e=>setPassword(e.target.value)}
            style={{
              width:'100%', padding:'14px 16px', background:'rgba(255,255,255,0.05)', color:'white', border:'1px solid var(--border)',
              borderRadius:12, fontSize:15, outline:'none'
            }}
          />
          {error && <div style={{fontSize: 13, color: '#EF4444', textAlign:'left'}}>{error}</div>}
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          <button onClick={() => submitLogin('participant')} style={{
            padding:'14px', borderRadius:'12px', background:'var(--primary)', color:'white', border:'none',
            fontSize:15, fontWeight:600, cursor:'pointer', transition:'0.2s', boxShadow:'0 0 20px rgba(59,130,246,0.3)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            Login as Participant
          </button>
          
          <button onClick={() => submitLogin('admin')} style={{
            padding:'14px', borderRadius:'12px', background:'rgba(245,158,11,0.1)', color:'#F59E0B', border:'1px solid rgba(245,158,11,0.3)',
            fontSize:15, fontWeight:600, cursor:'pointer', transition:'0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
          >
            Login as Admin
          </button>
        </div>
      </motion.div>
    </div>
  );
}
