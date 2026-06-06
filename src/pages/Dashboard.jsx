import { useState, useEffect } from 'react'
import { getBassins } from '../services/api'
import { getAlertes } from '../services/api'
import SynergyCard from '../components/SynergyCard'
import StatCard from '../components/StatCard'
import AlertCard from '../components/AlertCard'

export default function Dashboard() {
  const [bassins, setBassins] = useState([])
  const [alertes, setAlertes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function charger() {
      try {
        const [b, a] = await Promise.all([getBassins(), getAlertes()])
        setBassins(b.data)
        setAlertes(a.data)
      } catch (err) {
        console.error('Erreur chargement:', err.message)
      } finally {
        setLoading(false)
      }
    }
    charger()
  }, [])

  const totalPoissons = bassins.reduce((acc, b) => acc + b.nbPoissons, 0)
  const tempMoy = bassins.length
    ? (bassins.reduce((acc, b) => acc + b.temperature, 0) / bassins.length).toFixed(1)
    : 0
  const synergie = bassins.length
    ? Math.round(bassins.filter(b => b.statut === 'Optimal').length / bassins.length * 100)
    : 78

  if (loading) return (
    <div style={{padding:'40px',textAlign:'center',color:'#6b7280'}}>
      <div style={{fontSize:'32px',marginBottom:'8px'}}>🌱</div>
      <p>Chargement des données...</p>
    </div>
  )

  return (
    <div style={{padding:'16px',maxWidth:'800px',margin:'0 auto'}}>
      <div style={{marginBottom:'12px'}}>
        <h1 style={{fontSize:'22px',fontWeight:'700',color:'#14532d'}}>Bonjour, Marieme 👋</h1>
        <p style={{fontSize:'13px',color:'#6b7280'}}>Ferme de Thiès — données en temps réel</p>
      </div>

      <SynergyCard score={synergie} />

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
        <StatCard label="Bassins actifs" value={bassins.length} color="blue" />
        <StatCard label="Total poissons" value={totalPoissons} color="green" />
        <StatCard label="Temp. moyenne" value={tempMoy} unit="°C" color="amber" />
        <StatCard label="Alertes actives" value={alertes.filter(a => !a.lu).length} color="red" />
      </div>

      <h2 style={{fontSize:'14px',fontWeight:'600',color:'#374151',marginBottom:'8px'}}>
        Alertes IA
        <span style={{marginLeft:'8px',background:'#fef2f2',color:'#dc2626',fontSize:'11px',padding:'2px 8px',borderRadius:'20px'}}>
          {alertes.filter(a => !a.lu).length} nouvelles
        </span>
      </h2>

      {alertes.length === 0 ? (
        <p style={{color:'#9ca3af',fontSize:'13px'}}>Aucune alerte pour le moment.</p>
      ) : (
        alertes.slice(0, 5).map(a => (
          <AlertCard key={a._id} type={a.type} title={a.titre} message={a.message} time={a.source} />
        ))
      )}

      {/* Statut bassins */}
      <h2 style={{fontSize:'14px',fontWeight:'600',color:'#374151',margin:'16px 0 8px'}}>État des bassins</h2>
      {bassins.map(b => (
        <div key={b._id} style={{background:'#fff',borderRadius:'12px',padding:'12px',marginBottom:'8px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{fontWeight:'600',color:'#14532d',fontSize:'14px'}}>{b.nom}</p>
            <p style={{fontSize:'12px',color:'#6b7280',marginTop:'2px'}}>
              🌡️ {b.temperature}°C · ⚗️ pH {b.ph} · 🐠 {b.nbPoissons} poissons
            </p>
          </div>
          <span style={{
            background: b.statut==='Optimal' ? '#dcfce7' : b.statut==='Surveiller' ? '#fef9c3' : '#fef2f2',
            color: b.statut==='Optimal' ? '#15803d' : b.statut==='Surveiller' ? '#854d0e' : '#dc2626',
            padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'600'
          }}>{b.statut}</span>
        </div>
      ))}
    </div>
  )
}
