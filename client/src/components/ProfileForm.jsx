import React, { useState } from 'react'
import { validateProfile } from '../utils/validation'

function emptyProfile(){
  return { name:'', role:'', bio:'', skills:[], projects: [], contact: { email:'', linkedin:'' } }
}

export default function ProfileForm({ onGenerate, onPreview, disabled }){
  const [p, setP] = useState(emptyProfile())
  const [skillInput, setSkillInput] = useState('')
  const [projTitle, setProjTitle] = useState('')
  const [projDesc, setProjDesc] = useState('')
  const [projLink, setProjLink] = useState('')
  const [errors, setErrors] = useState({})

  function addSkill(e){ 
    e?.preventDefault()
    if(!skillInput.trim()) return
    setP(s=>({ ...s, skills:[...s.skills, skillInput.trim()] }))
    setSkillInput('')
  }

  function removeSkill(index) {
    setP(s=>({ ...s, skills: s.skills.filter((_, i) => i !== index) }))
  }

  function addProject(e){ 
    e?.preventDefault()
    if(!projTitle.trim()) return
    setP(s=>({ ...s, projects:[...s.projects, { 
      title:projTitle.trim(), 
      description:projDesc.trim(), 
      link:projLink.trim() 
    }] }))
    setProjTitle('')
    setProjDesc('')
    setProjLink('')
  }

  function removeProject(index) {
    setP(s=>({ ...s, projects: s.projects.filter((_, i) => i !== index) }))
  }

  function handleGenerate() {
    const validation = validateProfile(p)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    setErrors({})
    onGenerate(p)
  }

  return (
    <div>
      <h2>Profile</h2>
      
      {Object.keys(errors).length > 0 && (
        <div className="error-message">
          <strong>Please fix the following errors:</strong>
          <ul>
            {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <label>
        Name <span className="required">*</span><br/>
        <input 
          value={p.name} 
          onChange={e=>setP({...p, name:e.target.value})} 
          className={errors.name ? 'input-error' : ''}
          required
        />
      </label>

      <label>
        Role <span className="required">*</span><br/>
        <input 
          value={p.role} 
          onChange={e=>setP({...p, role:e.target.value})} 
          className={errors.role ? 'input-error' : ''}
          required
        />
      </label>

      <label>
        Bio<br/>
        <textarea 
          value={p.bio} 
          onChange={e=>setP({...p, bio:e.target.value})}
          placeholder="Tell us about yourself..."
        ></textarea>
      </label>

      <div>
        <h3>Skills</h3>
        <div style={{display:'flex', gap:8}}>
          <input 
            placeholder="Add skill (e.g., JavaScript, React)" 
            value={skillInput} 
            onChange={e=>setSkillInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addSkill(e)}
            style={{flex:1}}
          />
          <button type="button" onClick={addSkill} className="btn-secondary">Add</button>
        </div>
        <div className="tags-container">
          {p.skills.map((s, i)=> (
            <span key={i} className="tag">
              {s}
              <button 
                type="button" 
                onClick={() => removeSkill(i)} 
                className="tag-remove"
                aria-label="Remove skill"
              >×</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3>Projects</h3>
        <input 
          placeholder="Project title" 
          value={projTitle} 
          onChange={e=>setProjTitle(e.target.value)} 
        />
        <input 
          placeholder="Project link (optional)" 
          value={projLink} 
          onChange={e=>setProjLink(e.target.value)}
          className={errors[`project_${p.projects.length}_link`] ? 'input-error' : ''}
        />
        <textarea 
          placeholder="Short description" 
          value={projDesc} 
          onChange={e=>setProjDesc(e.target.value)}
        ></textarea>
        <button type="button" onClick={addProject} className="btn-secondary">Add project</button>
        
        <div className="projects-list">
          {p.projects.map((pr, idx)=> (
            <div key={idx} className="project-card">
              <div className="project-header">
                <strong>{pr.title}</strong>
                <button 
                  type="button" 
                  onClick={() => removeProject(idx)} 
                  className="btn-remove"
                  aria-label="Remove project"
                >×</button>
              </div>
              {pr.description && <p>{pr.description}</p>}
              {pr.link && <a href={pr.link} target="_blank" rel="noopener noreferrer">{pr.link}</a>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Contact</h3>
        <input 
          placeholder="Email" 
          type="email"
          value={p.contact.email} 
          onChange={e=>setP({...p, contact:{...p.contact, email:e.target.value}})}
          className={errors.email ? 'input-error' : ''}
        />
        <input 
          placeholder="LinkedIn URL" 
          value={p.contact.linkedin} 
          onChange={e=>setP({...p, contact:{...p.contact, linkedin:e.target.value}})}
          className={errors.linkedin ? 'input-error' : ''}
        />
      </div>

      <div style={{marginTop:20, display:'flex', gap:12, flexDirection:'column'}}>
        <button 
          type="button"
          onClick={() => onPreview && onPreview(p)} 
          disabled={disabled} 
          className="btn-secondary"
          style={{width:'100%'}}
        >
          👁️ Preview Portfolio
        </button>
        <button 
          type="button"
          onClick={handleGenerate} 
          disabled={disabled} 
          className="btn-primary"
        >
          {disabled ? 'Generating...' : '⬇️ Download Portfolio'}
        </button>
      </div>
    </div>
  )
}
