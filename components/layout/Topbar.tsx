'use client'
import { usePathname } from 'next/navigation'
import { useBrandStore } from '@/store/brandStore'

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/generate': 'Generar Contenido',
  '/calendar': 'Calendario',
  '/agent': 'Agente IA',
  '/brands': 'Marcas',
  '/billing': 'Billing',
}

export default function Topbar() {
  const pathname = usePathname()
  const { activeBrand } = useBrandStore()
  const title = titles[pathname] || 'autoshary'

  return (
    <div style={{ position:'fixed', top:0, left:'228px', right:0, height:'52px', background:'rgba(6,7,14,0.85)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(91,143,249,0.1)', display:'flex', alignItems:'center', padding:'0 20px', gap:'12px', zIndex:200, fontFamily:"'DM Sans',sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', gap:'7px', flex:1 }}>
        <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#5b8ff9', boxShadow:'0 0 8px #5b8ff9' }} />
        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'14px', fontWeight:700, color:'#edf0ff' }}>{title}</span>
        {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', marginLeft:'4px' }}>· {activeBrand.name}</span>}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'5px', padding:'3px 9px', background:'rgba(61,245,160,0.07)', border:'1px solid rgba(61,245,160,0.18)', borderRadius:'20px', fontSize:'10px', color:'#3df5a0' }}>
          <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#3df5a0' }} />
          Sistema online
        </div>
      </div>
    </div>
  )
}