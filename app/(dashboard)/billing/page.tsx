'use client'

const plans = [
  { name:'Starter', price:'$29', color:'#5b8ff9', features:['1 marca','50 posts IA/mes','Calendario básico','Soporte email'], current:false },
  { name:'Pro', price:'$79', color:'#3df5a0', features:['5 marcas','300 posts IA/mes','Agente IA activo','Motor predictivo','Soporte prioritario'], current:true },
  { name:'Agency', price:'$199', color:'#b86bff', features:['Marcas ilimitadas','Posts ilimitados','API access','White-label','Account manager'], current:false },
]

export default function BillingPage() {
  return (
    <div>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', marginBottom:'20px' }}>◈ Billing & Planes</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px', marginBottom:'24px' }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background:'rgba(10,13,26,0.8)', border:`1px solid ${plan.current ? plan.color : 'rgba(91,143,249,0.1)'}`, borderRadius:'16px', padding:'24px', position:'relative', boxShadow: plan.current ? `0 0 40px ${plan.color}22` : 'none' }}>
            {plan.current && <div style={{ position:'absolute', top:'12px', right:'12px', fontSize:'8px', padding:'2px 8px', background:`${plan.color}22`, color:plan.color, borderRadius:'20px', fontWeight:700 }}>PLAN ACTUAL</div>}
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'18px', fontWeight:800, color:'#edf0ff', marginBottom:'4px' }}>{plan.name}</div>
            <div style={{ display:'flex', alignItems:'baseline', gap:'2px', marginBottom:'20px' }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:'32px', fontWeight:800, color:plan.color }}>{plan.price}</span>
              <span style={{ fontSize:'12px', color:'#7880a6' }}>/mes</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'8px', marginBottom:'20px' }}>
              {plan.features.map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color:'#b8bddb' }}>
                  <span style={{ color:plan.color, fontSize:'10px' }}>✓</span> {f}
                </div>
              ))}
            </div>
            <button style={{ width:'100%', padding:'10px', background: plan.current ? `linear-gradient(135deg,${plan.color},${plan.color}99)` : 'rgba(255,255,255,0.04)', border:`1px solid ${plan.current ? plan.color : 'rgba(91,143,249,0.15)'}`, borderRadius:'8px', color: plan.current ? '#030f08' : '#b8bddb', fontSize:'12px', fontWeight: plan.current ? 700 : 500, cursor:'pointer' }}>
              {plan.current ? 'Plan actual' : `Cambiar a ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}