import { Link, useLocation } from 'react-router-dom'

const links = [
  { path: '/', label: '🏠 Accueil' },
  { path: '/pisciculture', label: '🐟 Pisciculture' },
  { path: '/cuniculture', label: '🐇 Cuniculture' },
  { path: '/agrotourisme', label: '🌿 Tourisme' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav style={{background:'#14532d',color:'#fff',padding:'12px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <span style={{fontWeight:'700',fontSize:'18px'}}>🌱 AgroSmart</span>
      <div style={{display:'flex',gap:'8px'}}>
        {links.map(l => (
          <Link key={l.path} to={l.path} style={{
            padding:'6px 12px',borderRadius:'8px',fontSize:'13px',textDecoration:'none',
            background: pathname === l.path ? '#16a34a' : 'transparent',
            color: pathname === l.path ? '#fff' : '#bbf7d0'
          }}>{l.label}</Link>
        ))}
      </div>
    </nav>
  )
}
