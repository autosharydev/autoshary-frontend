'use client'
import { useState } from 'react'
import { useBrandStore } from '@/store/brandStore'

const recommendations = [
  {
    type: 'Reel educativo',
    confidence: 87,
    time: '18:00 – 19:30',
    day: 'Hoy',
    network: 'Instagram',
    reason: 'Historial muestra +34% engagement en Reels educativos los martes',
    color: '#3df5a0',
  },
  {
    type: 'Carrusel tips',
    confidence: 74,
    time: '10:00 – 11:00',
    day: 'Mañana',
    network: 'Instagram',
    reason: 'Tu audiencia revisa contenido educativo en la mañana',
    color: '#5b8ff9',
  },
  {
    type: 'Story interactiva',
    confidence: 68,
    time: '20:00 – 21:00',
    day: 'Jueves',
    network: 'Instagram',
    reason: 'Stories con encuestas generan 2x más respuestas en tu nicho',
    color: '#b86bff',
  },
  {
    type: 'Post estático',
    confidence: 61,
    time: '12:00 – 13:00',
    day: 'Viernes',
    network: 'Facebook',
    reason: 'Viernes al mediodía tiene alta actividad en tu audiencia objetivo',
    color: '#ffd166',
  },
]

const weekData = [
  { day: 'Lun', score: 42, posts: 1 },
  { day: 'Mar', score: 87, posts: 2, best: true },
  { day: 'Mié', score: 55, posts: 1 },
  { day: 'Jue', score: 71, posts: 2 },
  { day: 'Vie', score: 63, posts: 1 },
  { day: 'Sáb', score: 38, posts: 0 },
  { day: 'Dom', score: 29, posts: 0 },
]

export default function PredictivePage() {
  const { activeBrand } = useBrandStore()
  const [activeTab, setActiveTab] = useState('recomendaciones')

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px' }}>
            ⚡ Motor Predictivo
            <span style={{ fontSize:'9px', padding:'2px 7px', background:'rgba(61,245,160,0.15)', color:'#3df5a0', borderRadius:'20px', border:'1px solid rgba(61,245,160,0.25)', fontWeight:600 }}>NUEVO</span>
          </div>
          {activeBrand && <div style={{ fontSize:'11px', color:'#7880a6', marginTop:'2px' }}>Análisis para {activeBrand.name}</div>}
        </div>
        <div style={{ display:'flex', gap:'6px' }}>
          {['recomendaciones', 'horarios', 'tendencias'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:'5px 12px', borderRadius:'20px', border:'1px solid',
              borderColor: activeTab === tab ? '#5b8ff9' : 'rgba(91,143,249,0.2)',
              background: activeTab === tab ? '#5b8ff9' : 'transparent',
              color: activeTab === tab ? '#fff' : '#7880a6',
              fontSize:'11px', cursor:'pointer', textTransform:'capitalize',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      {/* Banner principal */}
      <div style={{ padding:'16px 20px', marginBottom:'16px', background:'linear-gradient(135deg,rgba(61,245,160,0.08),rgba(91,143,249,0.06))', border:'1px solid rgba(61,245,160,0.2)', borderRadius:'14px', display:'flex', alignItems:'center', gap:'16px' }}>
        <div style={{ width:'48px', height:'48px', borderRadius:'12px', background:'linear-gradient(135deg,rgba(61,245,160,0.2),rgba(91,143,249,0.15))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px', flexShrink:0 }}>⚡</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:'13px', fontWeight:600, color:'#edf0ff', marginBottom:'4px' }}>Mejor momento para publicar HOY</div>
          <div style={{ fontSize:'12px', color:'#b8bddb', marginBottom:'8px' }}>Reel educativo · Instagram · <strong style={{ color:'#3df5a0' }}>18:00 – 19:30</strong> · Confianza 87%</div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            {['📊 Conf. 87%', '⏰ 18:00–19:30', '🎯 Instagram', '🌤 Clima despejado Medellín'].map(m => (
              <span key={m} style={{ fontSize:'10px', color:'#7880a6' }}>{m}</span>
            ))}
          </div>
        </div>
        <button style={{ padding:'8px 16px', background:'linear-gradient(135deg,#3df5a0,#28c87a)', border:'none', borderRadius:'8px', color:'#030f08', fontSize:'12px', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
          Crear ahora →
        </button>
      </div>

      {activeTab === 'recomendaciones' && (
        <div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px' }}>
            {recommendations.map((r, i) => (
              <div key={i} style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'16px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:r.color, borderRadius:'2px' }} />
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px', marginTop:'6px' }}>
                  <div style={{ fontSize:'12px', fontWeight:600, color:'#edf0ff' }}>{r.type}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'4px', padding:'3px 8px', background:`${r.color}18`, border:`1px solid ${r.color}33`, borderRadius:'20px' }}>
                    <span style={{ fontSize:'10px', color:r.color, fontWeight:700 }}>{r.confidence}%</span>
                  </div>
                </div>
                <div style={{ display:'flex', gap:'8px', marginBottom:'10px', flexWrap:'wrap' }}>
                  <span style={{ fontSize:'10px', color:'#7880a6' }}>📅 {r.day}</span>
                  <span style={{ fontSize:'10px', color:'#7880a6' }}>⏰ {r.time}</span>
                  <span style={{ fontSize:'10px', color:'#7880a6' }}>📱 {r.network}</span>
                </div>
                <div style={{ fontSize:'10px', color:'#7880a6', lineHeight:1.5, marginBottom:'12px' }}>💡 {r.reason}</div>
                <div style={{ height:'3px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', marginBottom:'12px' }}>
                  <div style={{ height:'3px', width:`${r.confidence}%`, background:r.color, borderRadius:'2px' }} />
                </div>
                <button style={{ width:'100%', padding:'6px', background:`${r.color}15`, border:`1px solid ${r.color}33`, borderRadius:'8px', color:r.color, fontSize:'11px', fontWeight:600, cursor:'pointer' }}>
                  Crear contenido para este slot →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'horarios' && (
        <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'20px' }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'13px', fontWeight:700, color:'#edf0ff', marginBottom:'16px' }}>📊 Mejor horario por día de la semana</div>
          <div style={{ display:'flex', gap:'8px', alignItems:'flex-end', height:'120px', marginBottom:'16px' }}>
            {weekData.map((d, i) => (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
                <div style={{ fontSize:'9px', color: d.best ? '#3df5a0' : '#7880a6', fontWeight: d.best ? 700 : 400 }}>{d.score}%</div>
                <div style={{
                  width:'100%', height:`${d.score * 1.1}px`,
                  background: d.best ? 'linear-gradient(180deg,rgba(61,245,160,0.6),rgba(61,245,160,0.15))' : 'linear-gradient(180deg,rgba(91,143,249,0.4),rgba(91,143,249,0.1))',
                  borderRadius:'4px 4px 0 0',
                  border:`1px solid ${d.best ? 'rgba(61,245,160,0.3)' : 'rgba(91,143,249,0.2)'}`,
                }} />
                <span style={{ fontSize:'9px', color: d.best ? '#3df5a0' : '#7880a6', fontWeight: d.best ? 700 : 400 }}>{d.day}</span>
                {d.best && <span style={{ fontSize:'8px', color:'#3df5a0' }}>★ Mejor</span>}
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px' }}>
            {[
              { label:'Mejor día', value:'Martes', sub:'87% engagement promedio', color:'#3df5a0' },
              { label:'Mejor hora', value:'18:00', sub:'Pico de audiencia activa', color:'#5b8ff9' },
              { label:'Posts/semana', value:'7', sub:'Óptimo para tu nicho', color:'#b86bff' },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'10px', padding:'12px', textAlign:'center' }}>
                <div style={{ fontSize:'9px', color:'#7880a6', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'4px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'20px', fontWeight:800, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:'10px', color:'#7880a6', marginTop:'2px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tendencias' && (
        <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'20px' }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'13px', fontWeight:700, color:'#edf0ff', marginBottom:'16px' }}>🔥 Tendencias detectadas en tu nicho</div>
          {[
            { topic:'#EnduroLife', growth:'+234%', posts:'12.4K', hot:true },
            { topic:'Moto mantenimiento DIY', growth:'+87%', posts:'8.2K', hot:true },
            { topic:'Rutas Colombia enduro', growth:'+61%', posts:'5.1K', hot:false },
            { topic:'Equipo enduro principiantes', growth:'+43%', posts:'3.8K', hot:false },
            { topic:'Enduro vs motocross', growth:'+28%', posts:'2.1K', hot:false },
          ].map((t, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'12px', padding:'10px 0', borderBottom: i < 4 ? '1px solid rgba(91,143,249,0.05)' : 'none' }}>
              <div style={{ width:'28px', height:'28px', borderRadius:'50%', background: t.hot ? 'rgba(255,107,74,0.15)' : 'rgba(91,143,249,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', flexShrink:0 }}>
                {t.hot ? '🔥' : '📈'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'12px', color:'#edf0ff', fontWeight:500 }}>{t.topic}</div>
                <div style={{ fontSize:'10px', color:'#7880a6' }}>{t.posts} posts esta semana</div>
              </div>
              <div style={{ fontSize:'12px', fontWeight:700, color: t.hot ? '#ff6b4a' : '#3df5a0' }}>{t.growth}</div>
              <button style={{ padding:'4px 10px', background:'rgba(91,143,249,0.1)', border:'1px solid rgba(91,143,249,0.2)', borderRadius:'6px', color:'#5b8ff9', fontSize:'10px', cursor:'pointer' }}>
                Crear →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}