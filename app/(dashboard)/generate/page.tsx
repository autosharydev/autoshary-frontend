'use client'
import { useState } from 'react'
import { useBrandStore } from '@/store/brandStore'
import api from '@/lib/api'

export default function GeneratePage() {
  const { activeBrand } = useBrandStore()
  const [topic, setTopic] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!activeBrand) { setError('Selecciona una marca primero'); return }
    if (!topic.trim()) { setError('Escribe un tema'); return }
    setLoading(true); setError(''); setResult(null)
    try {
      const { data } = await api.post('/content/generate', { brand_id: activeBrand.id, topic })
      setResult(data)
    } catch { setError('Error generando contenido.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ maxWidth:'800px' }}>
      <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'20px', marginBottom:'16px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
          ✦ Generador de Contenido con IA
          {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400 }}>· {activeBrand.name}</span>}
        </div>
        <div style={{ marginBottom:'12px' }}>
          <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'6px' }}>Tema del contenido</label>
          <textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Ej: Tips para el primer enduro: qué llevar y cómo prepararse" rows={3}
            style={{ width:'100%', background:'rgba(8,10,20,0.9)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'8px', padding:'10px 12px', color:'#edf0ff', fontSize:'13px', outline:'none', resize:'vertical', fontFamily:"'DM Sans',sans-serif" }} />
        </div>
        {error && <div style={{ padding:'8px 12px', marginBottom:'12px', background:'rgba(255,107,74,0.08)', border:'1px solid rgba(255,107,74,0.25)', borderRadius:'8px', fontSize:'11px', color:'#ff6b4a' }}>{error}</div>}
        <button onClick={handleGenerate} disabled={loading} style={{ padding:'10px 20px', background:'linear-gradient(135deg,#5b8ff9,#4070e0)', border:'none', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:loading?'not-allowed':'pointer', boxShadow:'0 3px 14px rgba(91,143,249,0.3)' }}>
          {loading ? '✦ Generando...' : '✦ Generar con IA'}
        </button>
      </div>

      {result && (
        <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(61,245,160,0.2)', borderRadius:'14px', padding:'20px' }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'13px', fontWeight:700, color:'#3df5a0', marginBottom:'16px' }}>✦ Contenido generado</div>
          <div style={{ marginBottom:'16px' }}>
            <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'6px' }}>Caption</label>
            <div style={{ background:'rgba(8,10,20,0.6)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'8px', padding:'12px', fontSize:'13px', color:'#edf0ff', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{result.caption}</div>
          </div>
          <div style={{ marginBottom:'16px' }}>
            <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'6px' }}>Hashtags</label>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
              {result.hashtags?.map((h: string) => (
                <span key={h} style={{ padding:'4px 10px', background:'rgba(91,143,249,0.1)', border:'1px solid rgba(91,143,249,0.2)', borderRadius:'20px', fontSize:'11px', color:'#5b8ff9' }}>#{h}</span>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap' }}>
            <div style={{ padding:'8px 14px', background:'rgba(61,245,160,0.08)', border:'1px solid rgba(61,245,160,0.2)', borderRadius:'8px', fontSize:'12px', color:'#3df5a0' }}>Score IA: <strong>{result.score}/100</strong></div>
            {result.suggestions?.map((s: string, i: number) => (
              <div key={i} style={{ fontSize:'11px', color:'#7880a6', padding:'6px 10px', background:'rgba(255,255,255,0.03)', borderRadius:'8px', border:'1px solid rgba(91,143,249,0.08)' }}>💡 {s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}