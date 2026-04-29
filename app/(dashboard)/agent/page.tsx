'use client'
import { useState } from 'react'
import { useBrandStore } from '@/store/brandStore'
import api from '@/lib/api'

export default function AgentPage() {
  const { activeBrand } = useBrandStore()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([{ role:'agent', text:'¡Hola! Soy tu Agente IA. Puedo ayudarte con estrategia de contenido, horarios óptimos y análisis de competencia. ¿En qué te ayudo?' }])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!message.trim() || !activeBrand) return
    const userMsg = message
    setMessages(prev => [...prev, { role:'user', text:userMsg }])
    setMessage('')
    setLoading(true)
    try {
      const { data } = await api.post(`/agent/chat/${activeBrand.id}?message=${encodeURIComponent(userMsg)}`)
      setMessages(prev => [...prev, { role:'agent', text:data.response }])
    } catch {
      setMessages(prev => [...prev, { role:'agent', text:'Error conectando. Intenta de nuevo.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth:'760px', display:'flex', flexDirection:'column', height:'calc(100vh - 120px)' }}>
      <div style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'16px', marginBottom:'12px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px' }}>
          ◎ Agente IA
          <span style={{ fontSize:'9px', padding:'2px 6px', background:'rgba(61,245,160,0.15)', color:'#3df5a0', borderRadius:'20px' }}>Online</span>
          {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400 }}>· {activeBrand.name}</span>}
        </div>
      </div>
      <div style={{ flex:1, background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', padding:'16px', overflowY:'auto', marginBottom:'12px', display:'flex', flexDirection:'column', gap:'12px' }}>
        {messages.map((m,i) => (
          <div key={i} style={{ display:'flex', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth:'80%', padding:'10px 14px', borderRadius: m.role==='user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.role==='user' ? 'linear-gradient(135deg,#5b8ff9,#4070e0)' : 'rgba(255,255,255,0.04)', border: m.role==='user' ? 'none' : '1px solid rgba(91,143,249,0.1)', color:'#edf0ff', fontSize:'13px', lineHeight:1.5 }}>
              {m.role==='agent' && <div style={{ fontSize:'10px', color:'#5b8ff9', fontWeight:600, marginBottom:'4px' }}>◎ Agente IA</div>}
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div style={{ display:'flex', justifyContent:'flex-start' }}><div style={{ padding:'10px 14px', borderRadius:'14px 14px 14px 4px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(91,143,249,0.1)', color:'#7880a6', fontSize:'13px' }}>◎ Pensando...</div></div>}
      </div>
      <div style={{ display:'flex', gap:'8px' }}>
        <input value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder={activeBrand ? 'Pregunta al agente...' : 'Selecciona una marca primero'} disabled={!activeBrand}
          style={{ flex:1, background:'rgba(8,10,20,0.9)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'10px', padding:'10px 14px', color:'#edf0ff', fontSize:'13px', outline:'none', fontFamily:"'DM Sans',sans-serif" }} />
        <button onClick={sendMessage} disabled={!activeBrand||loading} style={{ padding:'10px 18px', background:'linear-gradient(135deg,#5b8ff9,#4070e0)', border:'none', borderRadius:'10px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:'pointer' }}>Enviar</button>
      </div>
    </div>
  )
}