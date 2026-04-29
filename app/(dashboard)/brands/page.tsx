'use client'
import { useState, useEffect } from 'react'
import { useBrandStore, Brand } from '@/store/brandStore'
import api from '@/lib/api'

export default function BrandsPage() {
  const { brands, setBrands, setActiveBrand, activeBrand } = useBrandStore()
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name:'', niche:'', tone:'Profesional', target_audience:'', content_goal:'' })

  useEffect(() => {
    api.get('/brands/').then(r => setBrands(r.data)).catch(() => {})
  }, [setBrands])

  const handleCreate = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/brands/', form)
      setBrands([...brands, data])
      setShowForm(false)
      setForm({ name:'', niche:'', tone:'Profesional', target_audience:'', content_goal:'' })
    } catch {}
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/brands/${id}`)
    setBrands(brands.filter(b => b.id !== id))
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff' }}>⬡ Mis Marcas <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400 }}>({brands.length})</span></div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding:'8px 16px', background:'linear-gradient(135deg,#5b8ff9,#4070e0)', border:'none', borderRadius:'8px', color:'#fff', fontSize:'12px', fontWeight:600, cursor:'pointer' }}>+ Nueva marca</button>
      </div>

      {showForm && (
        <div style={{ background:'rgba(10,13,26,0.9)', border:'1px solid rgba(91,143,249,0.2)', borderRadius:'14px', padding:'20px', marginBottom:'16px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'12px' }}>
            {[
              { label:'Nombre', key:'name', placeholder:'Ej: Enduro Not Pro' },
              { label:'Nicho', key:'niche', placeholder:'Ej: Moto enduro' },
              { label:'Audiencia', key:'target_audience', placeholder:'Ej: Adultos 25-40' },
              { label:'Objetivo', key:'content_goal', placeholder:'Ej: Inspirar' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ display:'block', fontSize:'9.5px', fontWeight:700, color:'#7880a6', letterSpacing:'0.09em', textTransform:'uppercase', marginBottom:'4px' }}>{f.label}</label>
                <input value={(form as any)[f.key]} onChange={e => setForm({...form, [f.key]: e.target.value})} placeholder={f.placeholder}
                  style={{ width:'100%', background:'rgba(8,10,20,0.9)', border:'1px solid rgba(91,143,249,0.15)', borderRadius:'8px', padding:'8px 12px', color:'#edf0ff', fontSize:'12px', outline:'none', fontFamily:"'DM Sans',sans-serif" }} />
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            <button onClick={handleCreate} disabled={loading} style={{ padding:'8px 18px', background:'linear-gradient(135deg,#3df5a0,#28c87a)', border:'none', borderRadius:'8px', color:'#030f08', fontSize:'12px', fontWeight:700, cursor:'pointer' }}>{loading ? 'Creando...' : 'Crear marca'}</button>
            <button onClick={() => setShowForm(false)} style={{ padding:'8px 14px', background:'rgba(255,255,255,0.035)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'8px', color:'#b8bddb', fontSize:'12px', cursor:'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'12px' }}>
        {brands.map((brand, i) => (
          <div key={brand.id} onClick={() => setActiveBrand(brand)} style={{ background:'rgba(10,13,26,0.8)', border:`1px solid ${activeBrand?.id === brand.id ? 'rgba(91,143,249,0.4)' : 'rgba(91,143,249,0.1)'}`, borderRadius:'14px', padding:'16px', cursor:'pointer' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
              <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:`linear-gradient(135deg,${['#5b8ff9,#b86bff','#3df5a0,#28c87a','#ff6b4a,#d04030','#ffd166,#e09c20'][i%4]})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px', fontWeight:700, color:'#fff' }}>{brand.name.charAt(0)}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:'13px', fontWeight:600, color:'#edf0ff' }}>{brand.name}</div>
                <div style={{ fontSize:'10px', color:'#7880a6' }}>{brand.niche || 'Sin nicho'}</div>
              </div>
              {activeBrand?.id === brand.id && <span style={{ fontSize:'8px', padding:'2px 6px', background:'rgba(61,245,160,0.15)', color:'#3df5a0', borderRadius:'20px' }}>Activa</span>}
            </div>
            <button onClick={e=>{ e.stopPropagation(); handleDelete(brand.id) }} style={{ padding:'4px 10px', background:'rgba(255,107,74,0.08)', border:'1px solid rgba(255,107,74,0.2)', borderRadius:'6px', color:'#ff6b4a', fontSize:'10px', cursor:'pointer' }}>Eliminar</button>
          </div>
        ))}
        {brands.length === 0 && <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'40px', color:'#7880a6', fontSize:'13px' }}>No tienes marcas aún. Crea tu primera marca.</div>}
      </div>
    </div>
  )
}