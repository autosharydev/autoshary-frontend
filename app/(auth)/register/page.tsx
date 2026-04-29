'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { setAuth } = useAuthStore()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/auth/register', { email, password, full_name: fullName })
      if (data.access_token) {
        setAuth(data.user, data.access_token)
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    } catch {
      setError('Error al registrar. Intenta con otro email.')
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
          <p style={{ fontSize:'11px', color:'#7880a6' }}>Crea tu cuenta gratis</p>
        </div>
        <form onSubmit={handleRegister}>
          {[
            { label:'Nombre completo', value:fullName, setter:setFullName, type:'text', placeholder:'Tu nombre' },
            { label:'Email', value:email, setter:setEmail, type:'email', placeholder:'tu@email.com' },
            { label:'Contraseña', value:password, setter:setPassword, type:'password', placeholder:'••••••••' },
          ].map(({ label, value, setter, type, placeholder }) => (
            <div key={label} style={{ marginBottom:'14px' }}>
              <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'4px' }}>{label}</label>
              <input type={type} value={value} onChange={e=>setter(e.target.value)} placeholder={placeholder} required style={{ width:'100%', background:'rgba(8,10,20,0.9)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'8px', padding:'9px 12px', color:'#edf0ff', fontSize:'13px', outline:'none', fontFamily:"'DM Sans',sans-serif" }} />
            </div>
          ))}
          {error && <div style={{ padding:'8px 12px', marginBottom:'14px', background:'rgba(255,107,74,0.08)', border:'1px solid rgba(255,107,74,0.25)', borderRadius:'8px', fontSize:'11px', color:'#ff6b4a' }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width:'100%', padding:'10px', background:'linear-gradient(135deg,#3df5a0,#28c87a)', border:'none', borderRadius:'8px', color:'#030f08', fontSize:'13px', fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
            {loading ? 'Creando cuenta...' : '✦ Crear cuenta gratis'}
          </button>
        </form>
        <p style={{ textAlign:'center', fontSize:'12px', color:'#7880a6', marginTop:'20px' }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color:'#5b8ff9', textDecoration:'none' }}>Inicia sesión</a>
        </p>
      </div>
    </div>
  )
}