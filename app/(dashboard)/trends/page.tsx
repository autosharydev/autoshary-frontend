'use client'
import { useState } from 'react'
import { useBrandStore } from '@/store/brandStore'

const trends = [
  { topic: '#EnduroLife', category: 'Hashtag', growth: '+234%', volume: '12.4K', momentum: 98, hot: true, platforms: ['Instagram', 'TikTok'] },
  { topic: 'Moto mantenimiento DIY', category: 'Tema', growth: '+87%', volume: '8.2K', momentum: 81, hot: true, platforms: ['YouTube', 'Instagram'] },
  { topic: 'Rutas Colombia enduro', category: 'Tema', growth: '+61%', volume: '5.1K', momentum: 67, hot: false, platforms: ['Instagram', 'Facebook'] },
  { topic: '#MotoLife', category: 'Hashtag', growth: '+54%', volume: '4.8K', momentum: 61, hot: false, platforms: ['Instagram'] },
  { topic: 'Equipo enduro principiantes', category: 'Tema', growth: '+43%', volume: '3.8K', momentum: 52, hot: false, platforms: ['YouTube', 'TikTok'] },
  { topic: 'Enduro vs motocross diferencias', category: 'Tema', growth: '+38%', volume: '2.9K', momentum: 44, hot: false, platforms: ['YouTube'] },
  { topic: '#OffRoadColombia', category: 'Hashtag', growth: '+31%', volume: '2.1K', momentum: 38, hot: false, platforms: ['Instagram', 'Facebook'] },
  { topic: 'Kawasaki KLX review', category: 'Producto', growth: '+28%', volume: '1.8K', momentum: 33, hot: false, platforms: ['YouTube'] },
]

const categories = ['Todos', 'Hashtag', 'Tema', 'Producto']

export default function TrendsPage() {
  const { activeBrand } = useBrandStore()
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [view, setView] = useState<'list' | 'grid'>('list')

  const filtered = selectedCategory === 'Todos' ? trends : trends.filter(t => t.category === selectedCategory)

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px' }}>
            📡 Trend Radar
            <span style={{ fontSize:'9px', padding:'2px 7px', background:'rgba(255,107,74,0.15)', color:'#ff6b4a', borderRadius:'20px', border:'1px solid rgba(255,107,74,0.25)', fontWeight:600 }}>LIVE</span>
          </div>
          {activeBrand && <div style={{ fontSize:'11px', color:'#7880a6', marginTop:'2px' }}>Tendencias para {activeBrand.name}</div>}
        </div>
        <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
          <div style={{ display:'flex', gap:'4px' }}>
            {['list', 'grid'].map(v => (
              <button key={v} onClick={() => setView(v as any)} style={{
                width:'28px', height:'28px', borderRadius:'6px',
                background: view === v ? 'rgba(91,143,249,0.2)' : 'rgba(255,255,255,0.03)',
                border:`1px solid ${view === v ? 'rgba(91,143,249,0.4)' : 'rgba(91,143,249,0.1)'}`,
                color: view === v ? '#5b8ff9' : '#7880a6',
                cursor:'pointer', fontSize:'12px',
              }}>{v === 'list' ? '☰' : '⊞'}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats top */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'10px', marginBottom:'16px' }}>
        {[
          { label:'Tendencias detectadas', value:'47', sub:'en tu nicho hoy', color:'#5b8ff9' },
          { label:'Oportunidades clave', value:'8', sub:'para crear contenido', color:'#3df5a0' },
          { label:'Tendencia más caliente', value:'#EnduroLife', sub:'+234% esta semana', color:'#ff6b4a' },
          { label:'Mejor plataforma', value:'Instagram', sub:'mayor volumen hoy', color:'#b86bff' },
        ].map(s => (
          <div key={s.label} style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'12px', padding:'12px', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:s.color }} />
            <div style={{ fontSize:'9px', color:'#7880a6', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'4px', marginTop:'6px' }}>{s.label}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'18px', fontWeight:800, color:'#edf0ff', lineHeight:1 }}>{s.value}</div>
            <div style={{ fontSize:'10px', color:'#7880a6', marginTop:'2px' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'6px', marginBottom:'14px', flexWrap:'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
            padding:'5px 12px', borderRadius:'20px', border:'1px solid',
            borderColor: selectedCategory === cat ? '#5b8ff9' : 'rgba(91,143,249,0.2)',
            background: selectedCategory === cat ? '#5b8ff9' : 'transparent',
            color: selectedCategory === cat ? '#fff' : '#7880a6',
            fontSize:'11px', cursor:'pointer',
          }}>{cat}</button>
        ))}
        <div style={{ marginLeft:'auto', fontSize:'10px', color:'#7880a6', alignSelf:'center' }}>
          Actualizado hace 5 min · <span style={{ color:'#3df5a0' }}>●</span> Live
        </div>
      </div>

      {/* Trends list */}
      {view === 'list' ? (
        <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', overflow:'hidden' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 120px', padding:'10px 16px', borderBottom:'1px solid rgba(91,143,249,0.1)', fontSize:'9px', color:'#7880a6', textTransform:'uppercase', letterSpacing:'0.1em' }}>
            <span>Tendencia</span><span>Categoría</span><span>Crecimiento</span><span>Volumen</span><span>Momentum</span><span></span>
          </div>
          {filtered.map((t, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr 120px', padding:'12px 16px', borderBottom: i < filtered.length-1 ? '1px solid rgba(91,143,249,0.05)' : 'none', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ fontSize:'16px' }}>{t.hot ? '🔥' : '📈'}</span>
                <div>
                  <div style={{ fontSize:'12px', color:'#edf0ff', fontWeight:500 }}>{t.topic}</div>
                  <div style={{ display:'flex', gap:'4px', marginTop:'2px' }}>
                    {t.platforms.map(p => (
                      <span key={p} style={{ fontSize:'9px', padding:'1px 5px', background:'rgba(91,143,249,0.1)', color:'#5b8ff9', borderRadius:'10px' }}>{p}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ fontSize:'10px', padding:'2px 8px', background:'rgba(184,107,255,0.1)', color:'#b86bff', borderRadius:'20px', width:'fit-content' }}>{t.category}</span>
              <span style={{ fontSize:'12px', fontWeight:700, color: t.hot ? '#ff6b4a' : '#3df5a0' }}>{t.growth}</span>
              <span style={{ fontSize:'11px', color:'#b8bddb' }}>{t.volume}</span>
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <div style={{ flex:1, height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px' }}>
                  <div style={{ height:'4px', width:`${t.momentum}%`, background: t.momentum > 80 ? '#ff6b4a' : t.momentum > 60 ? '#3df5a0' : '#5b8ff9', borderRadius:'2px' }} />
                </div>
                <span style={{ fontSize:'10px', color:'#7880a6', width:'24px' }}>{t.momentum}</span>
              </div>
              <button style={{ padding:'5px 10px', background:'rgba(91,143,249,0.1)', border:'1px solid rgba(91,143,249,0.2)', borderRadius:'6px', color:'#5b8ff9', fontSize:'10px', cursor:'pointer', whiteSpace:'nowrap' }}>
                Crear post →
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'10px' }}>
          {filtered.map((t, i) => (
            <div key={i} style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'16px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'10px' }}>
                <span style={{ fontSize:'20px' }}>{t.hot ? '🔥' : '📈'}</span>
                <span style={{ fontSize:'12px', fontWeight:700, color: t.hot ? '#ff6b4a' : '#3df5a0' }}>{t.growth}</span>
              </div>
              <div style={{ fontSize:'13px', fontWeight:600, color:'#edf0ff', marginBottom:'4px' }}>{t.topic}</div>
              <div style={{ fontSize:'10px', color:'#7880a6', marginBottom:'10px' }}>{t.volume} posts · {t.category}</div>
              <div style={{ height:'4px', background:'rgba(255,255,255,0.05)', borderRadius:'2px', marginBottom:'12px' }}>
                <div style={{ height:'4px', width:`${t.momentum}%`, background: t.momentum > 80 ? '#ff6b4a' : '#5b8ff9', borderRadius:'2px' }} />
              </div>
              <button style={{ width:'100%', padding:'6px', background:'rgba(91,143,249,0.1)', border:'1px solid rgba(91,143,249,0.2)', borderRadius:'8px', color:'#5b8ff9', fontSize:'11px', cursor:'pointer' }}>
                Crear post →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}