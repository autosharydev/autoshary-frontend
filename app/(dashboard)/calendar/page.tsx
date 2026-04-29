'use client'
import { useState, useEffect } from 'react'
import { useBrandStore } from '@/store/brandStore'
import api from '@/lib/api'

export default function CalendarPage() {
  const { activeBrand } = useBrandStore()
  const [scheduled, setScheduled] = useState<any[]>([])

  useEffect(() => {
    if (!activeBrand) return
    api.get(`/social/scheduled/${activeBrand.id}`).then(r => setScheduled(r.data)).catch(() => {})
  }, [activeBrand])

  return (
    <div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', marginBottom:'20px' }}>
        📅 Calendario de Publicaciones
        {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400, marginLeft:'8px' }}>· {activeBrand.name}</span>}
      </div>
      <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'20px' }}>
        {scheduled.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px', color:'#7880a6', fontSize:'13px' }}>
            No hay posts programados aún.<br/>
            <span style={{ fontSize:'11px' }}>Genera contenido y prográmalo desde Generar.</span>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {scheduled.map((post:any) => (
              <div key={post.id} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'12px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(91,143,249,0.08)', borderRadius:'10px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: post.is_published ? '#3df5a0' : '#ffd166', flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:'12px', color:'#edf0ff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{post.content_text}</div>
                  <div style={{ fontSize:'10px', color:'#7880a6', marginTop:'2px' }}>{new Date(post.scheduled_at).toLocaleString('es-CO')} · {post.is_published ? '✓ Publicado' : '⏳ Programado'}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}