import { useState, useEffect } from 'react'
import { getBassins, updateBassin } from '../services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import AlertCard from '../components/AlertCard'

const tempData = [
  { heure:'06h', A:22, B:24, C:21 },
  { heure:'08h', A:23, B:25, C:22 },
  { heure:'10h', A:24, B:26, C:23 },
  { heure:'12h', A:25, B:27, C:24 },
  { heure:'14h', A:26, B:27, C:25 },
  { heure:'16h', A:25, B:26, C:24 },
  { heure:'18h', A:24, B:26, C:23 },
]

const croissanceData = [
  { mois:'Jan', poids:0.3 },
  { mois:'Fév', poids:0.6 },
  { mois:'Mar', poids:1.0 },
  { mois:'Avr', poids:1.4 },
  { mois:'Mai', poids:1.9 },
  { mois:'Jun', poids:2.4 },
]

export default function Pisciculture() {
  const [bassins, setBassins] = useState([])
  const [bassinActif, setBassinActif] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    getBassins().then(res => {
      setBassins(res.data)
      setBassinActif(res.data[0]?._id)
      setLoading(false)
    })
  }, [])

  const bassin = bassins.find(b => b._id === bassinActif)

  async function sauvegarder() {
    setSaving(true)
    await updateBassin(bassinActif, form)
    const res = await getBassins()
    setBassins(res.data)
    setEdit(false)
    setSaving(false)
  }

  if (loading) return (
    <div style={{padding:'40px',textAlign:'center',color:'#6b7280'}}>
      <div style={{fontSize:'32px',marginBottom:'8px'}}>🐟</div>
      <p>Chargement des bassins...</p>
    </div>
  )

  return (
    <div style={{padding:'16px',maxWidth:'800px',margin:'0 auto'}}>
      <div style={{marginBottom:'16px'}}>
        <h1 style={{fontSize:'22px',fontWeight:'700',color:'#14532d'}}>🐟 Pisciculture</h1>
        <p style={{fontSize:'13px',color:'#6b7280'}}>Données réelles depuis MongoDB</p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'16px'}}>
        {[
          { label:'Bassins', val: bassins.length, color:'#3b82f6' },
          { label:'Total poissons', val: bassins.reduce((a,b)=>a+b.nbPoissons,0), color:'#22c55e' },
          { label:'Temp. moy.', val: bassins.length ? (bassins.reduce((a,b)=>a+b.temperature,0)/bassins.length).toFixed(1)+'°C' : '-', color:'#f59e0b' },
          { label:'Bassins OK', val: bassins.filter(b=>b.statut==='Optimal').length, color:'#8b5cf6' },
        ].map((s,i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'12px',borderLeft:`4px solid ${s.color}`,boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <p style={{fontSize:'10px',color:'#9ca3af',textTransform:'uppercase',marginBottom:'3px'}}>{s.label}</p>
            <p style={{fontSize:'20px',fontWeight:'700',color:s.color}}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Sélecteur */}
      <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
        {bassins.map(b => (
          <button key={b._id} onClick={() => { setBassinActif(b._id); setEdit(false) }} style={{
            padding:'8px 20px',borderRadius:'20px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'13px',
            background: bassinActif===b._id ? '#14532d':'#fff',
            color: bassinActif===b._id ? '#fff':'#374151',
            boxShadow:'0 1px 3px rgba(0,0,0,0.1)'
          }}>{b.nom}</button>
        ))}
      </div>

      {/* Détail bassin */}
      {bassin && (
        <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'700',color:'#14532d'}}>{bassin.nom}</h2>
            <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
              <span style={{
                background: bassin.statut==='Optimal'?'#dcfce7':'#fef9c3',
                color: bassin.statut==='Optimal'?'#15803d':'#854d0e',
                padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'
              }}>{bassin.statut}</span>
              <button onClick={() => { setEdit(!edit); setForm({temperature:bassin.temperature,ph:bassin.ph,oxygene:bassin.oxygene,nbPoissons:bassin.nbPoissons}) }}
                style={{background:'#f3f4f6',border:'none',borderRadius:'8px',padding:'5px 10px',fontSize:'12px',cursor:'pointer'}}>
                ✏️ Modifier
              </button>
            </div>
          </div>

          {edit ? (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
                {[
                  { label:'Température (°C)', key:'temperature' },
                  { label:'pH', key:'ph' },
                  { label:'Oxygène (mg/L)', key:'oxygene' },
                  { label:'Nb. poissons', key:'nbPoissons' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{fontSize:'12px',color:'#374151',fontWeight:'500'}}>{f.label}</label>
                    <input type="number" value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                      style={{width:'100%',marginTop:'4px',padding:'8px',borderRadius:'8px',border:'1px solid #d1d5db',fontSize:'13px',outline:'none'}} />
                  </div>
                ))}
              </div>
              <button onClick={sauvegarder} disabled={saving} style={{background:'#14532d',color:'#fff',border:'none',borderRadius:'8px',padding:'9px 20px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                {saving ? 'Sauvegarde...' : '💾 Sauvegarder'}
              </button>
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
              {[
                { icon:'🌡️', label:'Température', val:`${bassin.temperature}°C` },
                { icon:'⚗️', label:'pH', val:bassin.ph },
                { icon:'💧', label:'Oxygène', val:`${bassin.oxygene} mg/L` },
                { icon:'🐠', label:'Poissons', val:bassin.nbPoissons },
                { icon:'⚖️', label:'Poids moy.', val:`${bassin.poidsMoyen} kg` },
                { icon:'✅', label:'Statut', val:bassin.statut },
              ].map((item,i) => (
                <div key={i} style={{background:'#f9fafb',borderRadius:'10px',padding:'10px',textAlign:'center'}}>
                  <div style={{fontSize:'20px',marginBottom:'4px'}}>{item.icon}</div>
                  <p style={{fontSize:'10px',color:'#9ca3af',marginBottom:'2px'}}>{item.label}</p>
                  <p style={{fontSize:'14px',fontWeight:'700',color:'#14532d'}}>{item.val}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Graphiques */}
      <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
        <h3 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'12px'}}>🌡️ Température aujourd'hui (°C)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="heure" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} domain={[18,30]} />
            <Tooltip />
            <Line type="monotone" dataKey="A" stroke="#22c55e" strokeWidth={2} dot={false} name="Bassin A" />
            <Line type="monotone" dataKey="B" stroke="#f59e0b" strokeWidth={2} dot={false} name="Bassin B" />
            <Line type="monotone" dataKey="C" stroke="#3b82f6" strokeWidth={2} dot={false} name="Bassin C" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
        <h3 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'12px'}}>📈 Croissance moyenne (kg)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={croissanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mois" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip />
            <Bar dataKey="poids" fill="#14532d" radius={[4,4,0,0]} name="Poids (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <AlertCard type="warning" title="Bassin B — Température élevée"
        message="26°C détectés. Recommander : augmenter l'aération."
        time="Il y a 1h · Capteur IoT" />
      <AlertCard type="success" title="Bassins A et C — Conditions optimales"
        message="Température, pH et oxygène dans les normes."
        time="Mis à jour il y a 15 min" />
    </div>
  )
}
