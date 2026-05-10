'use client'
import { useState } from 'react'
import { useBrandStore } from '@/store/brandStore'

const competitors = [
  {
    name: 'EnduroColombia',
    handle: '@enduro_colombia',
    followers: '45.2K',
    engagement: '6.8%',
    posts_week: 5,
    score: 82,
    trend: '+12%',
    color: '#ff6b4a',
    strengths: ['Reels educativos', 'Rutas locales', 'Comunidad activa'],
    weaknesses: ['Sin Stories', 'Poca variedad', 'Sin carruseles'],
  },
  {
    name: 'MotoRutasCO',
    handle: '@motorutas_co',
    followers: '28.7K',
    engagement: '4.2%',
    posts_week: 3,
    score: 61,
    trend: '+5%',
    color: '#5b8ff9',
    strengths: ['Fotografía profesional', 'Partnerships'],
    weaknesses: ['Bajo engagement', 'Posting irregular', 'Sin IA'],
  },
  {
    name: 'TrailRiders',
    handle: '@trailriders_col',
    followers: '19.1K',
    engagement: '8.1%',
    posts_week: 7,
    score: 74,
    trend: '+22%',
    color: '#3df5a0',
    strengths: ['Alto engagement', 'Consistencia', 'Video corto'],
    weaknesses: ['Audiencia pequeña', 'Sin estrategia clara'],
  },
]

const opportunities = [
  { title: 'Jueves sin competencia', desc: 'Ningún competidor publica los jueves — oportunidad de captar atención', impact: 'Alto', color: '#3df5a0' },
  { title: 'Contenido técnico ignorado', desc: 'Solo el 12% del contenido de competidores es técnico/educativo', impact: 'Alto', color: '#3df5a0' },
  { title: 'TikTok sin explotar', desc: 'Ningún competidor tiene presencia en TikTok en tu nicho', impact: 'Medio', color: '#ffd166' },
  { title: 'Carruseles con datos', desc: 'Los infográficos tienen 3x más saves que posts normales en el nicho', impact: 'Medio', color: '#ffd166' },
]

export default function CompetitivePage() {
  const { activeBrand } = useBrandStore()
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:'16px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px' }}>
          🎯 Radar Competitivo
          {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400 }}>· {activeBrand.name}</span>}
        </div>
        <div style={{ fontSize:'11px', color:'#7880a6', marginTop:'2px' }}>Análisis de competidores en tu nicho · Actualizado hace 1h</div>
      </div>

      {/* Oportunidades */}
      <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(61,245,160,0.2)', borderRadius:'14px', padding:'16px', marginBottom:'16px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'13px', fontWeight:700, color:'#3df5a0', marginBottom:'12px', display:'flex', alignItems:'center', gap:'6px' }}>
          💡 Oportunidades detectadas
          <span style={{ fontSize:'9px', padding:'2px 6px', background:'rgba(61,245,160,0.15)', color:'#3df5a0', borderRadius:'20px' }}>{opportunities.length} gaps</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
          {opportunities.map((o, i) => (
            <div key={i} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.02)', border:`1px solid ${o.color}22`, borderRadius:'10px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'4px' }}>
                <div style={{ fontSize:'11px', fontWeight:600, color:'#edf0ff' }}>{o.title}</div>
                <span style={{ fontSize:'9px', padding:'1px 6px', background:`${o.color}18`, color:o.color, borderRadius:'20px' }}>{o.impact}</span>
              </div>
              <div style={{ fontSize:'10px', color:'#7880a6', lineHeight:1.5 }}>{o.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Competidores */}
      <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:'12px' }}>
        {/* Lista */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          {competitors.map((c, i) => (
            <div key={i} onClick={() => setSelected(i)} style={{
              background:'rgba(10,13,26,0.8)',
              border:`1px solid ${selected === i ? c.color : 'rgba(91,143,249,0.1)'}`,
              borderRadius:'12px', padding:'12px', cursor:'pointer',
              boxShadow: selected === i ? `0 0 20px ${c.color}18` : 'none',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:`linear-gradient(135deg,${c.color},${c.color}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:700, color:'#fff', flexShrink:0 }}>
                  {c.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize:'12px', fontWeight:600, color:'#edf0ff' }}>{c.name}</div>
                  <div style={{ fontSize:'10px', color:'#7880a6' }}>{c.handle}</div>
                </div>
                <div style={{ marginLeft:'auto', fontSize:'11px', fontWeight:700, color:'#3df5a0' }}>{c.trend}</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'4px' }}>
                {[
                  { label:'Seguidores', value:c.followers },
                  { label:'Engagement', value:c.engagement },
                  { label:'Posts/sem', value:c.posts_week },
                ].map(s => (
                  <div key={s.label} style={{ textAlign:'center' }}>
                    <div style={{ fontSize:'11px', fontWeight:600, color:'#edf0ff' }}>{s.value}</div>
                    <div style={{ fontSize:'9px', color:'#7880a6' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'8px', height:'3px', background:'rgba(255,255,255,0.05)', borderRadius:'2px' }}>
                <div style={{ height:'3px', width:`${competitors[i].score}%`, background:c.color, borderRadius:'2px' }} />
              </div>
              <div style={{ fontSize:'9px', color:'#7880a6', marginTop:'2px', textAlign:'right' }}>Score {c.score}/100</div>
            </div>
          ))}
        </div>

        {/* Detalle */}
        <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
            <div style={{ width:'48px', height:'48px', borderRadius:'50%', background:`linear-gradient(135deg,${competitors[selected].color},${competitors[selected].color}88)`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', fontWeight:700, color:'#fff' }}>
              {competitors[selected].name.charAt(0)}
            </div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'16px', fontWeight:700, color:'#edf0ff' }}>{competitors[selected].name}</div>
              <div style={{ fontSize:'11px', color:'#7880a6' }}>{competitors[selected].handle}</div>
            </div>
            <div style={{ marginLeft:'auto', textAlign:'center' }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'28px', fontWeight:800, color:competitors[selected].color }}>{competitors[selected].score}</div>
              <div style={{ fontSize:'9px', color:'#7880a6' }}>Score total</div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px' }}>
            <div style={{ padding:'12px', background:'rgba(61,245,160,0.06)', border:'1px solid rgba(61,245,160,0.15)', borderRadius:'10px' }}>
              <div style={{ fontSize:'10px', fontWeight:700, color:'#3df5a0', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.1em' }}>✓ Fortalezas</div>
              {competitors[selected].strengths.map((s, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', color:'#b8bddb', marginBottom:'4px' }}>
                  <span style={{ color:'#3df5a0', fontSize:'9px' }}>✓</span> {s}
                </div>
              ))}
            </div>
            <div style={{ padding:'12px', background:'rgba(255,107,74,0.06)', border:'1px solid rgba(255,107,74,0.15)', borderRadius:'10px' }}>
              <div style={{ fontSize:'10px', fontWeight:700, color:'#ff6b4a', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.1em' }}>✗ Debilidades</div>
              {competitors[selected].weaknesses.map((w, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', color:'#b8bddb', marginBottom:'4px' }}>
                  <span style={{ color:'#ff6b4a', fontSize:'9px' }}>✗</span> {w}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding:'12px', background:'rgba(91,143,249,0.06)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'10px' }}>
            <div style={{ fontSize:'10px', fontWeight:700, color:'#5b8ff9', marginBottom:'8px', textTransform:'uppercase', letterSpacing:'0.1em' }}>💡 Cómo superarlo</div>
            <div style={{ fontSize:'11px', color:'#b8bddb', lineHeight:1.6 }}>
              Publica los jueves cuando {competitors[selected].name} no está activo. Enfócate en contenido técnico y educativo que ellos ignoran. Usa carruseles con datos para maximizar saves.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}