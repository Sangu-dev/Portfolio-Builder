import React, { useEffect, useState } from 'react'
import ProfileForm from './components/ProfileForm'
import TemplatePicker from './components/TemplatePicker'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function App(){
  const [templates, setTemplates] = useState([])
  const [selected, setSelected] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ fetch(${API_BASE}/api/templates).then(r=>r.json()).then(setTemplates).catch(console.error) },[])

  async function handleGenerate(p) {
    setProfile(p)
    setLoading(true)
    try{
      const resp = await fetch(${API_BASE}/api/generate, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selected.id, profile: p })
      })
      if(!resp.ok){ const txt = await resp.text(); throw new Error(txt || 'generate failed') }
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = ${(p.name||'portfolio').replace(/[^a-z0-9.-_]/gi, '_')}.zip
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    }catch(err){
      alert('Error: '+err.message)
    }finally{ setLoading(false) }
  }

  return (
    <div className="app">
      <h1>Portfolio Builder (MVP)</h1>
      <div className="layout">
        <div className="left">
          <TemplatePicker templates={templates} selected={selected} onSelect={setSelected} />
        </div>
        <div className="right">
          <ProfileForm onGenerate={handleGenerate} disabled={!selected || loading} />
          {loading && <p>Generating your site…</p>}
        </div>
      </div>
    </div>
  )
}