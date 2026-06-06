import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import AlertCard from '../components/AlertCard'

const visites = [
  { id:1, nom:'École primaire de Thiès', date:'08 Juin 2025', nb:25, type:'Scolaire', statut:'Confirmée', montant:50000 },
  { id:2, nom:'Délégation FAO Dakar', date:'15 Juin 2025', nb:8, type:'Institutionnel', statut:'En attente', montant:80000 },
  { id:3, nom:'Groupe touristes européens', date:'22 Juin 2025', nb:12, type:'Tourisme', statut:'Confirmée', montant:120000 },
  { id:4, nom:'Université Gaston Berger', date:'29 Juin 2025', nb:30, type:'Académique', statut:'Confirmée', montant:60000 },
]

const revenusData = [
  { mois:'Jan', revenus:45000 },
  { mois:'Fév', revenus:62000 },
  { mois:'Mar', revenus:55000 },
  { mois:'Avr', revenus:78000 },
  { mois:'Mai', revenus:91000 },
  { mois:'Jun', revenus:135000 },
]

const visitesData = [
  { mois:'Jan', visites:2 },
  { mois:'Fév', visites:3 },
  { mois:'Mar', visites:2 },
  { mois:'Avr', visites:4 },
  { mois:'Mai', visites:5 },
  { mois:'Jun', visites:4 },
]

const activites = [
  { icon:'🐟', titre:'Visite des bassins', duree:'30 min', desc:'Découverte de la pisciculture et des techniques d\'élevage de tilapia' },
  { icon:'🐇', titre:'Élevage de lapins', duree:'20 min', desc:'Présentation de la cuniculture et du cycle de vie des lapins' },
  { icon:'🌿', titre:'Jardins maraîchers', duree:'25 min', desc:'Visite des jardins irrigués par les eaux des bassins' },
  { icon:'🍽️', titre:'Dégustation produits', duree:'45 min', desc:'Repas avec les produits frais de la ferme : poisson, légumes' },
  { icon:'🤖', titre:'Démo application IA', duree:'15 min', desc:'Présentation du système AgroSmart et de l\'algorithme de synergie' },
  { icon:'📦', titre:'Marché fermier', duree:'20 min', desc:'Achat de produits locaux avec traçabilité QR code' },
]

const typeColors = {
  'Scolaire':       { bg:'#dbeafe', color:'#1d4ed8' },
  'Institutionnel': { bg:'#f3e8ff', color:'#7e22ce' },
  'Tourisme':       { bg:'#fef9c3', color:'#854d0e' },
  'Académique':     { bg:'#dcfce7', color:'#15803d' },
}

export default function Agrotourisme() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nom:'', date:'', nb:'', type:'Tourisme' })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit() {
    if (form.nom && form.date && form.nb) {
      setSubmitted(true)
      setShowForm(false)
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <div style={{padding:'16px',maxWidth:'800px',margin:'0 auto'}}>

      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'16px'}}>
        <div>
          <h1 style={{fontSize:'22px',fontWeight:'700',color:'#14532d'}}>🌿 Agrotourisme</h1>
          <p style={{fontSize:'13px',color:'#6b7280'}}>Réservations et visites de la ferme</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          background:'#14532d',color:'#fff',border:'none',borderRadius:'10px',
          padding:'10px 16px',fontSize:'13px',fontWeight:'600',cursor:'pointer'
        }}>+ Réservation</button>
      </div>

      {/* Formulaire réservation */}
      {showForm && (
        <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:'16px',padding:'16px',marginBottom:'16px'}}>
          <h3 style={{fontSize:'15px',fontWeight:'700',color:'#14532d',marginBottom:'12px'}}>📋 Nouvelle réservation</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'10px'}}>
            <div>
              <label style={{fontSize:'12px',color:'#374151',fontWeight:'500'}}>Nom du groupe</label>
              <input value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})}
                placeholder="Ex: École de Thiès"
                style={{width:'100%',marginTop:'4px',padding:'8px',borderRadius:'8px',border:'1px solid #bbf7d0',fontSize:'13px',outline:'none'}} />
            </div>
            <div>
              <label style={{fontSize:'12px',color:'#374151',fontWeight:'500'}}>Date de visite</label>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}
                style={{width:'100%',marginTop:'4px',padding:'8px',borderRadius:'8px',border:'1px solid #bbf7d0',fontSize:'13px',outline:'none'}} />
            </div>
            <div>
              <label style={{fontSize:'12px',color:'#374151',fontWeight:'500'}}>Nombre de visiteurs</label>
              <input type="number" value={form.nb} onChange={e=>setForm({...form,nb:e.target.value})}
                placeholder="Ex: 20"
                style={{width:'100%',marginTop:'4px',padding:'8px',borderRadius:'8px',border:'1px solid #bbf7d0',fontSize:'13px',outline:'none'}} />
            </div>
            <div>
              <label style={{fontSize:'12px',color:'#374151',fontWeight:'500'}}>Type de visite</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}
                style={{width:'100%',marginTop:'4px',padding:'8px',borderRadius:'8px',border:'1px solid #bbf7d0',fontSize:'13px',outline:'none'}}>
                <option>Tourisme</option>
                <option>Scolaire</option>
                <option>Académique</option>
                <option>Institutionnel</option>
              </select>
            </div>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <button onClick={handleSubmit} style={{background:'#14532d',color:'#fff',border:'none',borderRadius:'8px',padding:'9px 20px',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
              Confirmer
            </button>
            <button onClick={() => setShowForm(false)} style={{background:'#fff',color:'#374151',border:'1px solid #d1d5db',borderRadius:'8px',padding:'9px 20px',fontSize:'13px',cursor:'pointer'}}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Confirmation */}
      {submitted && (
        <div style={{background:'#dcfce7',border:'1px solid #22c55e',borderRadius:'12px',padding:'12px',marginBottom:'16px',color:'#15803d',fontWeight:'600',fontSize:'13px'}}>
          ✅ Réservation enregistrée avec succès !
        </div>
      )}

      {/* Stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'16px'}}>
        {[
          { label:'Visites ce mois', val:'4', color:'#22c55e' },
          { label:'Visiteurs total', val:'75', color:'#3b82f6' },
          { label:'Revenus juin', val:'135k', color:'#f59e0b' },
          { label:'Satisfaction', val:'4.8/5', color:'#8b5cf6' },
        ].map((s,i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'12px',borderLeft:`4px solid ${s.color}`,boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <p style={{fontSize:'10px',color:'#9ca3af',textTransform:'uppercase',marginBottom:'3px'}}>{s.label}</p>
            <p style={{fontSize:'20px',fontWeight:'700',color:s.color}}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Liste visites */}
      <h2 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'10px'}}>📅 Prochaines visites</h2>
      {visites.map(v => (
        <div key={v.id} style={{background:'#fff',borderRadius:'14px',padding:'14px',marginBottom:'10px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'8px'}}>
            <div>
              <p style={{fontWeight:'600',fontSize:'14px',color:'#14532d'}}>{v.nom}</p>
              <p style={{fontSize:'12px',color:'#6b7280',marginTop:'2px'}}>📅 {v.date} · 👥 {v.nb} personnes</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'4px',alignItems:'flex-end'}}>
              <span style={{
                background: v.statut==='Confirmée'?'#dcfce7':'#fef9c3',
                color: v.statut==='Confirmée'?'#15803d':'#854d0e',
                padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'
              }}>{v.statut}</span>
              <span style={{
                background: typeColors[v.type]?.bg,
                color: typeColors[v.type]?.color,
                padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'500'
              }}>{v.type}</span>
            </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'8px',borderTop:'1px solid #f3f4f6'}}>
            <span style={{fontSize:'12px',color:'#6b7280'}}>💰 Montant estimé</span>
            <span style={{fontSize:'14px',fontWeight:'700',color:'#14532d'}}>{v.montant.toLocaleString()} FCFA</span>
          </div>
        </div>
      ))}

      {/* Graphiques revenus */}
      <div style={{background:'#fff',borderRadius:'16px',padding:'16px',marginBottom:'16px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
        <h3 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'12px'}}>📈 Revenus agrotourisme (FCFA)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={revenusData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mois" tick={{fontSize:11}} />
            <YAxis tick={{fontSize:11}} />
            <Tooltip formatter={v => `${v.toLocaleString()} FCFA`} />
            <Bar dataKey="revenus" fill="#14532d" radius={[4,4,0,0]} name="Revenus" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activités proposées */}
      <h2 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'10px'}}>🎯 Programme de visite</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px'}}>
        {activites.map((a,i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'12px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontSize:'22px'}}>{a.icon}</span>
              <div>
                <p style={{fontWeight:'600',fontSize:'13px',color:'#14532d'}}>{a.titre}</p>
                <p style={{fontSize:'11px',color:'#9ca3af'}}>⏱ {a.duree}</p>
              </div>
            </div>
            <p style={{fontSize:'11px',color:'#6b7280',lineHeight:'1.4'}}>{a.desc}</p>
          </div>
        ))}
      </div>

      {/* Alertes */}
      <AlertCard type="success" title="Réservation confirmée — Université Gaston Berger"
        message="30 étudiants le 29 juin. Préparer la salle de présentation et la démo IA."
        time="Il y a 2h" />
      <AlertCard type="warning" title="Délégation FAO — En attente de confirmation"
        message="Relancer le contact. Visite prévue le 15 juin dans 10 jours."
        time="Il y a 1 jour" />
    </div>
  )
}
