export default function SynergyCard({ score }) {
  const color = score >= 75 ? 'bg-green-400' : score >= 50 ? 'bg-yellow-400' : 'bg-red-400'
  return (
    <div className="bg-green-900 text-white rounded-2xl p-5 mb-4">
      <p className="text-green-300 text-xs uppercase tracking-widest mb-1">Synergie écologique IA</p>
      <p className="text-5xl font-bold mb-1">{score}<span className="text-2xl font-normal"> %</span></p>
      <p className="text-green-400 text-sm mb-3">Équilibre optimal des 3 systèmes</p>
      <div className="bg-white/20 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <div className="flex gap-2 mt-3">
        <span className="bg-white/10 text-green-300 text-xs px-3 py-1 rounded-full">🐟 Poissons OK</span>
        <span className="bg-white/10 text-yellow-300 text-xs px-3 py-1 rounded-full">🌿 Jardin moyen</span>
        <span className="bg-white/10 text-green-300 text-xs px-3 py-1 rounded-full">🐇 Lapins OK</span>
      </div>
    </div>
  )
}