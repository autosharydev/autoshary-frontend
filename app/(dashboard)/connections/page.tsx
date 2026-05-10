'use client'
import { useState, useEffect } from 'react'
import { useBrandStore } from '@/store/brandStore'
import api from '@/lib/api'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E1306C', desc: 'Publica fotos, Reels y Stories automáticamente' },
  { id: 'facebook', name: 'Facebook', icon: '👥', color: '#1877F2', desc: 'Publica en páginas y grupos de Facebook' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#000000', desc: 'Próximamente disponible', soon: true },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: '#0A66C2', desc: 'Próximamente disponible', soon: true },
]

export default function ConnectionsPage() {
  const { activeBrand } = useBrandStore()
  const [connections, setConnections] = useState<any[]>([])
  const [connecting, setConnecting] = useState<string | null>(null)

  useEffect(() => {
    if (!activeBrand) return
    api.get(`/social/connections/${activeBrand.id}`)
      .then(r => setConnections(r.data))
      .catch(() => {})
  }, [activeBrand])

  const handleConnect = async (platform: string) => {
    if (!activeBrand) return
    setConnecting(platform)
    try {
      const { data } = await api.get(`/social/connect/meta?brand_id=${activeBrand.id}`)
      window.open(data.oauth_url, '_blank', 'width=600,height=700')
    } catch {}
    setConnecting(null)
  }

  const handleMockConnect = async (platform: string) => {
    if (!activeBrand) return
    setConnecting(platform)
    try {
      const { data } = await api.get(`/social/callback?code=mock_${platform}&state=${activeBrand.id}`)
      setConnections(prev => [...prev, data])
    } catch {}
    setConnecting(null)
  }

  const isConnected = (platform: string) =>
    connections.some(c => c.platform === platform && c.is_active)

  const getConnection = (platform: string) =>
    connections.find(c => c.platform === platform && c.is_active)

  return (
    <div>
      <div style={{ marginBottom:'16px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px' }}>
          🔗 Conexiones Sociales
          {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400 }}>· {activeBrand.name}</span>}
        </div>
        <div style={{ fontSize:'11px', color:'#7880a6', marginTop:'2px' }}>Conecta tus redes para publicar automáticamente</div>
      </div>

      {!activeBrand && (
        <div style={{ textAlign:'center', padding:'40px', background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', color:'#7880a6', fontSize:'13px' }}>
          Selecciona una marca primero para conectar tus redes sociales.
        </div>
      )}

      {activeBrand && (
        <>
          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'10px', marginBottom:'16px' }}>
            {[
              { label:'Redes conectadas', value:connections.length.toString(), color:'#3df5a0' },
              { label:'Posts publicados', value:'47', color:'#5b8ff9' },
              { label:'Próximo post', value:'Mañana 10:00', color:'#b86bff' },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'12px', padding:'14px', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:s.color }} />
                <div style={{ fontSize:'9px', color:'#7880a6', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'4px', marginTop:'6px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'20px', fontWeight:800, color:'#edf0ff' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Plataformas */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {platforms.map(p => {
              const connected = isConnected(p.id === 'facebook' ? 'instagram' : p.id)
              const conn = getConnection(p.id === 'facebook' ? 'instagram' : p.id)

              return (
                <div key={p.id} style={{
                  background:'rgba(10,13,26,0.8)',
                  border:`1px solid ${connected ? 'rgba(61,245,160,0.3)' : 'rgba(91,143,249,0.1)'}`,
                  borderRadius:'14px', padding:'20px',
                  opacity: p.soon ? 0.5 : 1,
                  boxShadow: connected ? '0 0 20px rgba(61,245,160,0.08)' : 'none',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:`${p.color}22`, border:`1px solid ${p.color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'22px' }}>
                      {p.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'14px', fontWeight:600, color:'#edf0ff' }}>{p.name}</div>
                      <div style={{ fontSize:'10px', color:'#7880a6' }}>{p.desc}</div>
                    </div>
                    {connected && (
                      <div style={{ display:'flex', alignItems:'center', gap:'4px', padding:'3px 8px', background:'rgba(61,245,160,0.1)', border:'1px solid rgba(61,245,160,0.25)', borderRadius:'20px' }}>
                        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#3df5a0' }} />
                        <span style={{ fontSize:'9px', color:'#3df5a0', fontWeight:600 }}>Conectado</span>
                      </div>
                    )}
                  </div>

                  {connected && conn && (
                    <div style={{ padding:'10px 12px', background:'rgba(61,245,160,0.05)', border:'1px solid rgba(61,245,160,0.1)', borderRadius:'8px', marginBottom:'12px' }}>
                      <div style={{ fontSize:'11px', color:'#edf0ff', fontWeight:500 }}>@{conn.platform_account_name}</div>
                      <div style={{ fontSize:'10px', color:'#7880a6', marginTop:'2px' }}>ID: {conn.platform_account_id}</div>
                    </div>
                  )}

                  {!p.soon && (
                    <button
                      onClick={() => connected ? null : handleMockConnect(p.id)}
                      disabled={!!connecting || connected}
                      style={{
                        width:'100%', padding:'9px',
                        background: connected ? 'rgba(255,107,74,0.08)' : `linear-gradient(135deg,${p.color},${p.color}cc)`,
                        border: connected ? '1px solid rgba(255,107,74,0.2)' : 'none',
                        borderRadius:'8px',
                        color: connected ? '#ff6b4a' : '#fff',
                        fontSize:'12px', fontWeight:600, cursor: connected ? 'pointer' : 'pointer',
                        fontFamily:"'DM Sans',sans-serif",
                      }}
                    >
                      {connecting === p.id ? 'Conectando...' : connected ? 'Desconectar' : `Conectar ${p.name}`}
                    </button>
                  )}

                  {p.soon && (
                    <div style={{ width:'100%', padding:'9px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'8px', color:'#7880a6', fontSize:'12px', textAlign:'center' }}>
                      Próximamente
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Info */}
          <div style={{ marginTop:'16px', padding:'14px 16px', background:'rgba(91,143,249,0.06)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'12px', fontSize:'11px', color:'#7880a6', lineHeight:1.6 }}>
            💡 <strong style={{ color:'#5b8ff9' }}>Modo desarrollo:</strong> Las conexiones usan datos mock. Para conectar cuentas reales de Instagram y Facebook necesitas una app aprobada en Meta for Developers.
          </div>
        </>
      )}
    </div>
  )
}