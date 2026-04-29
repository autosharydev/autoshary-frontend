'use client'
import { useRouter } from 'next/navigation'
import { useBrandStore } from '@/store/brandStore'

export default function DashboardPage() {
  const router = useRouter()
  const { activeBrand } = useBrandStore()

  const stats = [
    { label:'Posts publicados', value:'47', sub:'↑ +12 este mes', color:'#5b8ff9' },
    { label:'Engagement avg', value:'8.4%', sub:'↑ +2.1% vs anterior', color:'#3df5a0' },
    { label:'Programados', value:'3', sub:'próximos 7 días', color:'#ff6b4a' },
    { label:'Respuestas IA', value:'124', sub:'Agente auto · semana', color:'#b86bff' },
    { label:'Tokens IA', value:'142K', sub:'$1.38 USD costo', color:'#00d4ff' },
  ]

  return (
    <div>
      <div onClick={() => router.push('/generate')} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px 18px', marginBottom:'16px', background:'linear-gradient(135deg,rgba(91,143,249,0.08),rgba(184,107,255,0.06))', border:'1px solid rgba(91,143,249,0.2)', borderRadius:'14px', cursor:'pointer' }}>
        <div style={{ fontSize:'24px' }}>⚡</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#edf0ff', marginBottom:'4px' }}>Motor Predictivo activo — Recomendación para hoy</div>
          <div style={{ fontSize:'11px', color:'#b8bddb' }}>Alta probabilidad de engagement para un <strong>Reel educativo</strong> hoy a las <strong>18:00</strong></div>
        </div>
        <button onClick={e=>{ e.stopPropagation(); router.push('/generate') }} style={{ padding:'6px 14px', background:'linear-gradient(135deg,#5b8ff9,#4070e0)', border:'none', borderRadius:'8px', color:'#fff', fontSize:'12px', cursor:'pointer' }}>Crear →</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'10px', marginBottom:'16px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'14px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:s.color, borderRadius:'2px' }} />
            <div style={{ fontSize:'9.5px', color:'#7880a6', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'5px', marginTop:'9px' }}>{s.label}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'24px', fontWeight:800, color:'#edf0ff', lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:'10px', color:'#7880a6', marginTop:'3px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
        <div style={{ background:'rgba(10,13,26,0.75)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'16px' }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'13px', fontWeight:700, color:'#edf0ff', marginBottom:'14px' }}>⚡ Actividad reciente</div>
          {[
            { ico:'📤', t:'Post publicado — Instagram', s:'Enduro Not Pro · hace 2h · 234 likes' },
            { ico:'✦', t:'Contenido generado con IA', s:'3 variaciones · 342 tokens' },
            { ico:'📅', t:'Post programado para mañana', s:'Instagram · 10:00 AM' },
            { ico:'◎', t:'Agente respondió 12 comentarios', s:'Respuesta automática activa' },
          ].map((a,i) => (
            <div key={i} style={{ display:'flex', gap:'8px', padding:'7px 0', borderBottom:'1px solid rgba(91,143,249,0.05)' }}>
              <span style={{ fontSize:'14px' }}>{a.ico}</span>
              <div>
                <div style={{ fontSize:'11px', color:'#b8bddb' }}>{a.t}</div>
                <div style={{ fontSize:'10px', color:'#7880a6' }}>{a.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:'rgba(10,13,26,0.75)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'13px', fontWeight:700, color:'#edf0ff' }}>📅 Posts programados</div>
            <button onClick={() => router.push('/calendar')} style={{ padding:'4px 10px', background:'rgba(255,255,255,0.035)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'8px', color:'#b8bddb', fontSize:'11px', cursor:'pointer' }}>Ver →</button>
          </div>
          {[
            { time:'Mañana 10:00', net:'Instagram', caption:'Tips de mantenimiento para tu moto...' },
            { time:'Miércoles 18:00', net:'Instagram + Facebook', caption:'La importancia del equipo adecuado...' },
            { time:'Viernes 12:00', net:'Instagram', caption:'Ruta del fin de semana: Alto de Minas...' },
          ].map((p,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 0', borderBottom: i<2 ? '1px solid rgba(91,143,249,0.05)' : 'none' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'8px', background:'rgba(91,143,249,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', flexShrink:0 }}>📸</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'11px', color:'#edf0ff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.caption}</div>
                <div style={{ fontSize:'10px', color:'#7880a6' }}>{activeBrand?.name || 'Marca'} · {p.net}</div>
              </div>
              <div style={{ fontSize:'10px', color:'#5b8ff9', flexShrink:0 }}>{p.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}