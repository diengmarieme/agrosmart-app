import { useState, useEffect } from 'react'
import { getLapins, updateLapin } from '../services/api'
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import AlertCard from '../components/AlertCard'

const croissanceData = [
  { semaine:'S1', poids:0.2 },{ semaine:'S2', poids:0.5 },{ semaine:'S3', poids:0.9 },
  { semaine:'S4', poids:1.2 },{ semaine:'S5', poids:1.6 },{ semaine:'S6', poids:1.9 },
  { semaine:'S7', poids:2.3 },{ semaine:'S8', poids:2.8 },
]

const pieData = [
  { name:'Jardins', value:60, color:'#22c55e' },
  { name:'Bassins', value:25, color:'#3b82f6' },
  { name:'Compost', value:15, color:'#f59e0b' },
]

export default function Cuniculture() {
  const [lapins, setLapins] = useState([])
  const [actif, setActif] = useState(null)
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getLapins().then(res => {
      setLapins(res.data)
      setActif(res.data[0]?._id)
      setLoading(false)
    })
  }, [])

  const groupe = lapins.find(l => l._id === actif)
  const totalLapins = lapins.reduce((a,l) => a+l.nombre, 0)
  const totalFumier = lapins.reduce((a,l) => a+l.fumierJour, 0)

  async function sauvegarder() {
    setSaving(true)
    await updateLapin(actif, form)
    const res = await getLapins()
    setLapins(res.data)
    setEdit(false)
    setSaving(false)
  }

  if (loading) return (
    <div style={{padding:'40px',textAlign:'center',color:'#6b7280'}}>
      <div style={{fontSize:'32px',marginBottom:'8px'}}>🐇</div>
      <p>Chargement des données...</p>
    </div>
  )

  return (
    <div style={{padding:'16px',maxWidth:'800px',margin:'0 auto'}}>
      <div style={{marginBottom:'16px'}}>
        <h1 style={{fontSize:'22px',fontWeight:'700',color:'#14532d'}}>🐇 Cuniculture</h1>
        <p style={{fontSize:'13px',color:'#6b7280'}}>Données réelles depuis MongoDB — {totalLapins} lapins</p>
      </div>

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'16px'}}>
        {[
          { label:'Total lapins', val:totalLapins, color:'#f59e0b' },
          { label:'Groupes', val:lapins.length, color:'#22c55e' },
          { label:'Fumier/jour', val:`${totalFumier}kg`, color:'#8b5cf6' },
          { label:'Prêts récolte', val:lapins.filter(l=>l.statut==='Prêt récolte').length, color:'#3b82f6' },
        ].map((s,i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'12px',borderLeft:`4px solid ${s.color}`,boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <p style={{fontSize:'10px',color:'#9ca3af',textTransform:'uppercase',marginBottom:'3px'}}>{s.label}</p>
            <p style={{fontSize:'20px',fontWeight:'700',color:s.color}}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Sélecteur */}
      <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
        {lapins.map(l => (
          <button key={l._id} onClick={() => { setActif(l._id); setEdit(false) }} style={{
            padding:'7px 16px',borderRadius:'20px',border:'none',cursor:'pointer',fontWeight:'600',fontSize:'12px',
            background: actif===l._id ? '#14532d':'#fff',
            color: actif===l._id ? '#fff':'#374151',
            boxShadow:'0 1px 3px rgba(0,0,0,0.1)'
          }}>{l.groupe}</button>
        ))}
      </div>

      {/* Détail groupe */}
      {groupe && (
        <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
            <h2 style={{fontSize:'16px',fontWeight:'700',color:'#14532d'}}>{groupe.groupe}</h2>
            <button onClick={() => { setEdit(!edit); setForm({nombre:groupe.nombre,poidsMoyen:groupe.poidsMoyen,fumierJour:groupe.fumierJour}) }}
              style={{background:'#f3f4f6',border:'none',borderRadius:'8px',padding:'5px 10px',fontSize:'12px',cursor:'pointer'}}>
              ✏️ Modifier
            </button>
          </div>

          {edit ? (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
                {[
                  { label:'Nombre de lapins', key:'nombre' },
                  { label:'Poids moyen (kg)', key:'poidsMoyen' },
                  { label:'Fumier/jour (kg)', key:'fumierJour' },
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
                { icon:'🐇', label:'Nombre', val:groupe.nombre },
                { icon:'⚖️', label:'Poids moy.', val:`${groupe.poidsMoyen} kg` },
                { icon:'📅', label:'Âge', val:groupe.age },
                { icon:'🌿', label:'Statut', val:groupe.statut },
                { icon:'💩', label:'Fumier/jour', val:`${groupe.fumierJour} kg` },
                { icon:'🥕', label:'Alimentation', val:'Normale' },
              ].map((item,i) => (
                <div key={i} style={{background:'#f9fafb',borderRadius:'10px',padding:'10px',textAlign:'center'}}>
                  <div style={{fontSize:'20px',marginBottom:'4px'}}>{item.icon}</div>
                  <p style={{fontSize:'10px',color:'#9ca3af',marginBottom:'2px'}}>{item.label}</p>
                  <p style={{fontSize:'13px',fontWeight:'700',color:'#14532d'}}>{item.val}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Graphiques */}
      <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
        <h3 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'12px'}}>📈 Courbe de croissance (kg)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={croissanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="semaine" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip />
            <Line type="monotone" dataKey="poids" stroke="#f59e0b" strokeWidth={2.5} dot={{fill:'#f59e0b',r:3}} name="Poids (kg)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Répartition fumier */}
      <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
        <h3 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'4px'}}>♻️ Répartition fumier</h3>
        <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                {pieData.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{flex:1}}>
            {pieData.map((item,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                <div style={{width:'10px',height:'10px',borderRadius:'50%',background:item.color,flexShrink:0}} />
                <span style={{fontSize:'12px',color:'#374151',flex:1}}>{item.name}</span>
                <span style={{fontSize:'13px',fontWeight:'700',color:item.color}}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AlertCard type="warning" title="Surplus fumier détecté"
        message="IA recommande : étendre parcelle 3 de 15m²."
        time="Il y a 30 min · IA Synergie" />
      <AlertCard type="success" title="Groupe C prêt pour récolte"
        message="10 lapins à 3.5 kg — récolte possible cette semaine."
        time="Aujourd'hui" />
    </div>
  )
}
