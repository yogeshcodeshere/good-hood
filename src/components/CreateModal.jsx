import { useState } from 'react';
import { ISparkle } from '../components/Icons';
import { CAT_CFG } from '../data/mockData';
import { motion } from 'framer-motion';
import { api } from '../api';

export function CreateModal({ onClose, onCreated }) {
  const [form, setForm] = useState({title:'',cat:'',desc:'',reqs:'',date:'',time:'',loc:''});
  const [done, setDone] = useState(false);

  const upd = (k, v) => setForm(f => ({...f, [k]:v}));
  const submit = async () => { 
    if(!form.title||!form.cat) return; 
    setDone(true);
    try {
      await api.createEvent(form);
      setTimeout(onCreated || onClose, 2200); 
    } catch(err) {
      console.error(err);
      onClose();
    }
  };

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(12px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24
    }}>
      <motion.div onClick={e=>e.stopPropagation()} initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}} className="glass-panel create-modal" style={{
        borderRadius:24, width:'100%', maxWidth:520, maxHeight:'90vh', overflowY:'auto', padding:'32px 28px',
        border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 20px 50px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
      }}>
        {!done ? (
          <>
            <div className="heading-font" style={{fontSize:24, fontWeight:700, color:'white', marginBottom:6, letterSpacing:'-0.5px'}}>Initialise Event Protocol</div>
            <div style={{fontSize:14, color:'var(--text-sec)', marginBottom:28}}>Broadcast a new social impact mission to your area.</div>

            <style>{`
              .f-input {
                width:100%; padding:14px 16px; border:1px solid rgba(255,255,255,0.1); borderRadius:12px;
                background:rgba(0,0,0,0.2); color:white; font-family:'Inter',sans-serif; font-size:14px;
                outline:none; transition:all 0.3s;
              }
              .f-input:focus { border-color:var(--primary); background:rgba(59,130,246,0.05); box-shadow:0 0 0 4px rgba(59,130,246,0.1); }
              .f-label { display:block; font-size:11px; font-weight:700; color:var(--text-sec); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px; }
            `}</style>

            {[{k:'title',label:'Mission Title',ph:"e.g. Sector 12 Cleanup"}, {k:'loc',label:'Coordinates',ph:"e.g. Panvel Lake"}].map(f=>(
              <div key={f.k} style={{marginBottom:20}}>
                <label className="f-label">{f.label}</label>
                <input className="f-input" placeholder={f.ph} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} />
              </div>
            ))}

            <div style={{marginBottom:20}}>
              <label className="f-label">Mission Category</label>
              <select className="f-input" value={form.cat} onChange={e=>upd('cat',e.target.value)}>
                <option value="">Select a frequency...</option>
                {Object.entries(CAT_CFG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            <div style={{marginBottom:20}}>
              <label className="f-label">Briefing Description</label>
              <textarea className="f-input" style={{resize:'vertical', minHeight:100}} placeholder="State the objectives..." value={form.desc} onChange={e=>upd('desc',e.target.value)} />
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20}}>
              {[{k:'date',label:'Date',type:'date'},{k:'time',label:'Time',type:'time'}].map(f=>(
                <div key={f.k}>
                  <label className="f-label">{f.label}</label>
                  <input className="f-input" type={f.type} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} />
                </div>
              ))}
            </div>

            <div style={{display:'flex', gap:12, marginTop:32}}>
              <button onClick={onClose} style={{flex:1, padding:16, border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, background:'rgba(255,255,255,0.05)', color:'white', fontSize:14, fontWeight:600, cursor:'pointer'}}>Abort</button>
              <button onClick={submit} style={{flex:1.5, padding:16, border:'none', borderRadius:14, background:'linear-gradient(135deg, var(--primary), var(--accent-p))', color:'white', fontSize:14, fontWeight:600, cursor:'pointer', boxShadow:'0 10px 20px rgba(99,102,241,0.3)'}}>Broadcast →</button>
            </div>
          </>
        ) : (
          <div style={{textAlign:'center', padding:'40px 0'}}>
            <div style={{width:80, height:80, borderRadius:'50%', background:'rgba(34,197,94,0.15)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', color:'#22C55E', boxShadow:'0 0 40px rgba(34,197,94,0.3)'}}>
              <ISparkle/>
            </div>
            <div className="heading-font" style={{fontSize:24, fontWeight:700, color:'white', marginBottom:8}}>Signal Broadcasted!</div>
            <div style={{fontSize:15, color:'var(--text-sec)', marginBottom:24}}>Your mission is live on the local grid.</div>
            <div style={{display:'inline-flex', padding:'10px 20px', borderRadius:100, background:'rgba(245,158,11,0.15)', color:'#F59E0B', fontWeight:700, border:'1px solid rgba(245,158,11,0.3)'}}>
              +50 Organizer XP
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
