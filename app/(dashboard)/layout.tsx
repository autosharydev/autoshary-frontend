'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { useBrandStore } from '@/store/brandStore'
import api from '@/lib/api'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { setBrands } = useBrandStore()

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!token) { router.push('/login'); return }
    api.get('/brands/').then(res => {
      if (res.data.length > 0) setBrands(res.data)
    }).catch(() => {})
  }, [router, setBrands])

  return (
    <div style={{ background:'#06070e', minHeight:'100vh' }}>
      <Sidebar />
      <Topbar />
      <main style={{ marginLeft:'228px', marginTop:'52px', minHeight:'calc(100vh - 52px)', padding:'20px', fontFamily:"'DM Sans',sans-serif" }}>
        {children}
      </main>
    </div>
  )
}