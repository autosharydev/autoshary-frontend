'use client'
import { useState, useEffect, useRef } from 'react'
import { useBrandStore } from '@/store/brandStore'
import api from '@/lib/api'

export default function MediaPage() {
  const { activeBrand } = useBrandStore()
  const [files, setFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [filter, setFilter] = useState('all')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!activeBrand) return
    api.get(`/media/brand/${activeBrand.id}`)
      .then(r => setFiles(r.data))
      .catch(() => {})
  }, [activeBrand])

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList || !activeBrand) return
    setUploading(true)
    for (const file of Array.from(fileList)) {
      const form = new FormData()
      form.append('brand_id', activeBrand.id)
      form.append('file', file)
      try {
        const { data } = await api.post('/media/upload', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        setFiles(prev => [data, ...prev])
      } catch {}
    }
    setUploading(false)
  }

  const handleDelete = async (id: string) => {
    await api.delete(`/media/${id}`)
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const filtered = filter === 'all' ? files : files.filter(f => f.file_type === filter)

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'15px', fontWeight:700, color:'#edf0ff', display:'flex', alignItems:'center', gap:'8px' }}>
            🖼️ Media Library
            {activeBrand && <span style={{ fontSize:'11px', color:'#7880a6', fontWeight:400 }}>· {activeBrand.name}</span>}
          </div>
          <div style={{ fontSize:'11px', color:'#7880a6', marginTop:'2px' }}>Sube imágenes y videos para que la IA los use al generar contenido</div>
        </div>
        <button onClick={() => fileRef.current?.click()} disabled={!activeBrand || uploading} style={{
          padding:'8px 16px', background:'linear-gradient(135deg,#5b8ff9,#4070e0)',
          border:'none', borderRadius:'8px', color:'#fff', fontSize:'12px',
          fontWeight:600, cursor:'pointer',
        }}>
          {uploading ? 'Subiendo...' : '+ Subir archivo'}
        </button>
        <input ref={fileRef} type="file" multiple accept="image/*,video/*" style={{ display:'none' }}
          onChange={e => handleUpload(e.target.files)} />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleUpload(e.dataTransfer.files) }}
        style={{
          border:`2px dashed ${dragOver ? '#5b8ff9' : 'rgba(91,143,249,0.2)'}`,
          borderRadius:'14px', padding:'32px', textAlign:'center',
          marginBottom:'16px', cursor:'pointer',
          background: dragOver ? 'rgba(91,143,249,0.05)' : 'transparent',
          transition:'all 0.18s ease',
        }}
        onClick={() => fileRef.current?.click()}
      >
        <div style={{ fontSize:'32px', marginBottom:'8px' }}>📁</div>
        <div style={{ fontSize:'13px', color:'#b8bddb', marginBottom:'4px' }}>
          {uploading ? 'Subiendo archivos...' : 'Arrastra imágenes o videos aquí'}
        </div>
        <div style={{ fontSize:'11px', color:'#7880a6' }}>JPG, PNG, MP4, MOV — hasta 50MB por archivo</div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'6px', marginBottom:'14px' }}>
        {['all', 'image', 'video'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding:'5px 12px', borderRadius:'20px', border:'1px solid',
            borderColor: filter === f ? '#5b8ff9' : 'rgba(91,143,249,0.2)',
            background: filter === f ? '#5b8ff9' : 'transparent',
            color: filter === f ? '#fff' : '#7880a6',
            fontSize:'11px', cursor:'pointer',
          }}>
            {f === 'all' ? 'Todos' : f === 'image' ? '🖼️ Imágenes' : '🎬 Videos'}
            {f !== 'all' && <span style={{ marginLeft:'4px', opacity:0.7 }}>({files.filter(x => x.file_type === f).length})</span>}
            {f === 'all' && <span style={{ marginLeft:'4px', opacity:0.7 }}>({files.length})</span>}
          </button>
        ))}
      </div>

      {/* Grid */}
      {!activeBrand && (
        <div style={{ textAlign:'center', padding:'40px', color:'#7880a6', fontSize:'13px' }}>
          Selecciona una marca para ver y subir archivos.
        </div>
      )}

      {activeBrand && filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'40px', background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)', borderRadius:'14px', color:'#7880a6', fontSize:'13px' }}>
          No hay archivos aún. Sube imágenes o videos para que la IA los use como referencia.
        </div>
      )}

      {filtered.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'10px' }}>
          {filtered.map((f, i) => (
            <div key={f.id} style={{
              background:'rgba(10,13,26,0.8)', border:'1px solid rgba(91,143,249,0.1)',
              borderRadius:'12px', overflow:'hidden', position:'relative',
              transition:'all 0.18s ease',
            }}>
              {/* Preview */}
              <div style={{ height:'140px', background:'rgba(255,255,255,0.03)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                {f.file_type === 'image' ? (
                  <img src={f.file_url} alt={f.original_name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                ) : (
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:'32px', marginBottom:'4px' }}>🎬</div>
                    <div style={{ fontSize:'10px', color:'#7880a6' }}>Video</div>
                  </div>
                )}
                <div style={{
                  position:'absolute', top:'6px', right:'6px',
                  padding:'2px 6px', borderRadius:'10px', fontSize:'9px', fontWeight:600,
                  background: f.file_type === 'image' ? 'rgba(91,143,249,0.8)' : 'rgba(184,107,255,0.8)',
                  color:'#fff',
                }}>
                  {f.file_type === 'image' ? '🖼️' : '🎬'}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding:'10px' }}>
                <div style={{ fontSize:'11px', color:'#edf0ff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginBottom:'4px' }}>
                  {f.original_name}
                </div>
                <div style={{ fontSize:'10px', color:'#7880a6', marginBottom:'8px' }}>
                  {f.file_size ? `${(f.file_size / 1024).toFixed(1)} KB` : ''} · {new Date(f.created_at).toLocaleDateString('es-CO')}
                </div>
                <div style={{ display:'flex', gap:'4px' }}>
                  <button onClick={() => window.open(f.file_url, '_blank')} style={{
                    flex:1, padding:'4px', background:'rgba(91,143,249,0.1)',
                    border:'1px solid rgba(91,143,249,0.2)', borderRadius:'6px',
                    color:'#5b8ff9', fontSize:'10px', cursor:'pointer',
                  }}>Ver</button>
                  <button onClick={() => handleDelete(f.id)} style={{
                    flex:1, padding:'4px', background:'rgba(255,107,74,0.08)',
                    border:'1px solid rgba(255,107,74,0.2)', borderRadius:'6px',
                    color:'#ff6b4a', fontSize:'10px', cursor:'pointer',
                  }}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}