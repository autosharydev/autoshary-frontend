'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useBrandStore } from '@/store/brandStore'
import { useAuthStore } from '@/store/authStore'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞', path: '/dashboard' },
  { id: 'generate', label: 'Generar contenido', icon: '✦', path: '/generate', badge: 'IA' },
  { id: 'drafts', label: 'Borradores', icon: '📝', path: '/drafts' },
  { id: 'calendar', label: 'Calendario', icon: '📅', path: '/calendar' },
  { id: 'agent', label: 'Agente IA', icon: '◎', path: '/agent', badge: 'NEW' },
  { id: 'brands', label: 'Marcas', icon: '⬡', path: '/brands' },
  { id: 'media', label: 'Media Library', icon: '🖼️', path: '/media' },
  { id: 'billing', label: 'Billing', icon: '◈', path: '/billing' },
  { id: 'predictive', label: 'Motor Predictivo', icon: '⚡', path: '/predictive', badge: 'NEW' },
  { id: 'trends', label: 'Trend Radar', icon: '📡', path: '/trends', badge: 'LIVE' },
  { id: 'competitive', label: 'Radar Competitivo', icon: '🎯', path: '/competitive' },
  { id: 'connections', label: 'Conexiones', icon: '🔗', path: '/connections' },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { activeBrand } = useBrandStore()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div style={{ position:'fixed', left:0, top:0, width:'228px', height:'100vh', background:'rgba(8,10,20,0.92)', borderRight:'1px solid rgba(91,143,249,0.1)', backdropFilter:'blur(28px)', display:'flex', flexDirection:'column', zIndex:300, fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ padding:'18px 16px 14px', borderBottom:'1px solid rgba(91,143,249,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
          <div style={{ width:'30px', height:'30px', borderRadius:'9px', background:'linear-gradient(135deg,#5b8ff9,#b86bff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px' }}>✦</div>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'17px', fontWeight:800, letterSpacing:'-0.03em', color:'#edf0ff' }}>auto<span style={{ color:'#5b8ff9' }}>shary</span></div>
            <div style={{ fontSize:'8.5px', color:'#7880a6', letterSpacing:'0.16em', textTransform:'uppercase' }}>AI Platform</div>
          </div>
        </div>
      </div>

      <div style={{ margin:'10px', padding:'9px 11px', background:'rgba(255,255,255,0.035)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'12px', cursor:'pointer' }} onClick={() => router.push('/brands')}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'24px', height:'24px', borderRadius:'7px', background:'linear-gradient(135deg,#5b8ff9,#b86bff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:700, color:'#fff' }}>
            {activeBrand?.name?.charAt(0) || 'A'}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'11.5px', fontWeight:600, color:'#edf0ff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{activeBrand?.name || 'Seleccionar marca'}</div>
            <div style={{ fontSize:'9px', color:'#7880a6' }}>cambiar marca ›</div>
          </div>
        </div>
      </div>

      <nav style={{ flex:1, overflowY:'auto', padding:'4px 0 8px' }}>
        {navItems.map(item => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
          return (
            <div key={item.id} onClick={() => router.push(item.path)} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'7px 16px', cursor:'pointer', borderLeft: isActive ? '2px solid #5b8ff9' : '2px solid transparent', background: isActive ? 'rgba(91,143,249,0.07)' : 'transparent', color: isActive ? '#5b8ff9' : '#7880a6', fontSize:'12px', fontWeight: isActive ? 500 : 400, transition:'all 0.18s ease' }}>
              <span style={{ width:'14px', textAlign:'center', fontSize:'13px' }}>{item.icon}</span>
              <span style={{ flex:1 }}>{item.label}</span>
              {item.badge === 'IA' && <span style={{ fontSize:'8px', background:'rgba(184,107,255,0.15)', color:'#b86bff', padding:'1px 5px', borderRadius:'20px' }}>IA</span>}
              {item.badge === 'NEW' && <span style={{ fontSize:'8px', background:'rgba(61,245,160,0.15)', color:'#3df5a0', padding:'1px 5px', borderRadius:'20px' }}>NEW</span>}
              {item.badge === 'LIVE' && <span style={{ fontSize:'8px', background:'rgba(255,107,74,0.15)', color:'#ff6b4a', padding:'1px 5px', borderRadius:'20px' }}>LIVE</span>}
            </div>
          )
        })}
      </nav>

      <div style={{ padding:'12px 14px', borderTop:'1px solid rgba(91,143,249,0.1)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'linear-gradient(135deg,#5b8ff9,#b86bff)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700, color:'#fff' }}>
            {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'11.5px', fontWeight:600, color:'#edf0ff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.full_name || user?.email || 'Usuario'}</div>
            <div style={{ fontSize:'9px', color:'#7880a6' }}>Pro Plan</div>
          </div>
          <div style={{ fontSize:'9px', color:'#3df5a0', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px' }} onClick={handleLogout}>
            <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#3df5a0' }} />Live
          </div>
        </div>
      </div>
    </div>
  )
}