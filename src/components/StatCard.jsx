const colors = {
  green: { border: '#22c55e', text: '#15803d' },
  blue:  { border: '#3b82f6', text: '#1d4ed8' },
  amber: { border: '#f59e0b', text: '#b45309' },
  red:   { border: '#ef4444', text: '#dc2626' },
}

export default function StatCard({ label, value, unit = '', color = 'green' }) {
  const c = colors[color]
  return (
    <div style={{background:'#fff',borderRadius:'12px',padding:'12px',borderLeft:`4px solid ${c.border}`,boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
      <p style={{fontSize:'11px',color:'#9ca3af',textTransform:'uppercase',marginBottom:'4px'}}>{label}</p>
      <p style={{fontSize:'28px',fontWeight:'700',color:c.text}}>{value}<span style={{fontSize:'13px',fontWeight:'400',marginLeft:'3px'}}>{unit}</span></p>
    </div>
  )
}
