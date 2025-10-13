import React, { useEffect, useState } from 'react'
import ProfileForm from './components/ProfileForm'
import TemplatePicker from './components/TemplatePicker'
import Notification from './components/Notification'
import PreviewModal from './components/PreviewModal'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export default function App(){
  const [templates, setTemplates] = useState([])
  const [selected, setSelected] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: 'info' })
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/templates`)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load templates')
        return r.json()
      })
      .then(setTemplates)
      .catch(err => {
        console.error(err)
        setNotification({ 
          message: 'Failed to load templates. Make sure the server is running.', 
          type: 'error' 
        })
      })
  }, [])

  async function handlePreview(p) {
    setProfile(p)
    setLoading(true)
    setNotification({ message: '', type: 'info' })
    setShowPreview(true)
    setPreviewUrl(null)
    
    try {
      const resp = await fetch(`${API_BASE}/api/generate-preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selected.id, profile: p })
      })
      
      if (!resp.ok) {
        const txt = await resp.text()
        throw new Error(txt || 'Failed to generate preview')
      }
      
      const data = await resp.json()
      setPreviewUrl(`${API_BASE}${data.previewUrl}`)
    } catch (err) {
      console.error(err)
      setShowPreview(false)
      setNotification({ 
        message: `Preview error: ${err.message}`, 
        type: 'error' 
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerate(p) {
    setProfile(p)
    setLoading(true)
    setNotification({ message: '', type: 'info' })
    
    try {
      const resp = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: selected.id, profile: p })
      })
      
      if (!resp.ok) { 
        const txt = await resp.text()
        throw new Error(txt || 'Failed to generate portfolio') 
      }
      
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${(p.name || 'portfolio').replace(/[^a-z0-9.-_]/gi, '_')}.zip`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
      
      setNotification({ 
        message: 'Portfolio generated successfully! Download should start automatically.', 
        type: 'success' 
      })
    } catch (err) {
      console.error(err)
      setNotification({ 
        message: `Error: ${err.message}`, 
        type: 'error' 
      })
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <div className="app">
      <Notification 
        message={notification.message} 
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'info' })}
      />
      
      <PreviewModal 
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false)
          setPreviewUrl(null)
        }}
        previewUrl={previewUrl}
      />
      
      <div className="hero">
        <h1>🎨 Portfolio Builder</h1>
        <p className="subtitle">Create your professional portfolio in minutes</p>
        <div className="features">
          <div className="feature-badge">✨ 6 Templates</div>
          <div className="feature-badge">👁️ Live Preview</div>
          <div className="feature-badge">⚡ Instant Download</div>
        </div>
      </div>
      
      {templates.length === 0 && !notification.message && (
        <div className="loading-state">Loading templates...</div>
      )}
      
      <div className="layout">
        <div className="left">
          <TemplatePicker templates={templates} selected={selected} onSelect={setSelected} />
          {!selected && templates.length > 0 && (
            <div className="hint">👈 Select a template to get started</div>
          )}
        </div>
        <div className="right">
          <ProfileForm 
            onGenerate={handleGenerate} 
            onPreview={handlePreview}
            disabled={!selected || loading} 
          />
          {loading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Generating your portfolio...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
