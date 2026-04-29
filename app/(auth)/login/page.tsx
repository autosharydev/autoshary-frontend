'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setAuth(data.user, data.access_token)
      router.push('/dashboard')
    } catch {
      setError('Credenciales inválidas.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'#06070e', display:'flex', alignItems:'center', justifyContent:'center', padding:'16px', fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ width:'100%', maxWidth:'400px', background:'rgba(10,13,26,0.9)', border:'1px solid rgba(91,143,249,0.18)', borderRadius:'20px', padding:'36px 32px', backdropFilter:'blur(20px)' }}>
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
            <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:'linear-gradient(135deg,#5b8ff9,#b86bff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>✦</div>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'22px', fontWeight:800, color:'#edf0ff', letterSpacing:'-0.03em' }}>auto<span style={{ color:'#5b8ff9' }}>shary</span></span>
          </div>
          <p style={{ fontSize:'11px', color:'#7880a6', letterSpacing:'0.1em', textTransform:'uppercase' }}>AI Social Intelligence Platform</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom:'14px' }}>
            <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'4px' }}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com" required style={{ width:'100%', background:'rgba(8,10,20,0.9)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'8px', padding:'9px 12px', color:'#edf0ff', fontSize:'13px', outline:'none', fontFamily:"'DM Sans',sans-serif" }} />
          </div>
          <div style={{ marginBottom:'20px' }}>
            <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'4px' }}>Contraseña</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required style={{ width:'100%', background:'rgba(8,10,20,0.9)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'8px', padding:'9px 12px', color:'#edf0ff', fontSize:'13px', outline:'none', fontFamily:"'DM Sans',sans-serif" }} />
          </div>
          {error && <div style={{ padding:'8px 12px', marginBottom:'14px', background:'rgba(255,107,74,0.08)', border:'1px solid rgba(255,107,74,0.25)', borderRadius:'8px', fontSize:'11px', color:'#ff6b4a' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width:'100%', padding:'10px', background:'linear-gradient(135deg,#5b8ff9,#4070e0)', border:'none', borderRadius:'8px', color:'#fff', fontSize:'13px', fontWeight:600, cursor:loading?'not-allowed':'pointer', fontFamily:"'DM Sans',sans-serif", boxShadow:'0 3px 14px rgba(91,143,249,0.3)' }}>
            {loading ? 'Iniciando sesión...' : '✦ Iniciar sesión'}
          </button>
        </form>
        <p style={{ textAlign:'center', fontSize:'12px', color:'#7880a6', marginTop:'20px' }}>
          ¿No tienes cuenta? <a href="/register" style={{ color:'#5b8ff9', textDecoration:'none' }}>Regístrate</a>
        </p>
      </div>
    </div>
  )
}