const styles = {
  warning: { bg: '#fffbeb', border: '#f59e0b', dot: '#f59e0b', title: '#92400e' },
  success: { bg: '#f0fdf4', border: '#22c55e', dot: '#22c55e', title: '#14532d' },
  danger:  { bg: '#fef2f2', border: '#ef4444', dot: '#ef4444', title: '#991b1b' },
}

export default function AlertCard({ type = 'warning', title, message, time }) {
  const s = styles[type]
  return (
    <div style={{background:s.bg,borderLeft:`4px solid ${s.border}`,borderRadius:'12px',padding:'12px',marginBottom:'8px',display:'flex',gap:'10px'}}>
      <div style={{width:'8px',height:'8px',borderRadius:'50%',background:s.dot,marginTop:'5px',flexShrink:0}} />
      <div>
        <p style={{fontWeight:'600',fontSize:'13px',color:s.title}}>{title}</p>
        <p style={{fontSize:'12px',color:'#6b7280',marginTop:'2px'}}>{message}</p>
        {time && <p style={{fontSize:'11px',color:'#9ca3af',marginTop:'3px'}}>{time}</p>}
      </div>
    </div>
  )
}
