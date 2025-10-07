import React, { useState } from 'react'

function emptyProfile(){
  return { name:'', role:'', bio:'', skills:[], projects: [], contact: { email:'', linkedin:'' } }
}

export default function ProfileForm({ onGenerate, disabled }){
  const [p, setP] = useState(emptyProfile())
  const [skillInput, setSkillInput] = useState('')
  const [projTitle, setProjTitle] = useState('')
  const [projDesc, setProjDesc] = useState('')
  const [projLink, setProjLink] = useState('')

  function addSkill(){ if(!skillInput) return; setP(s=>({ ...s, skills:[...s.skills, skillInput] })); setSkillInput('') }
  function addProject(){ if(!projTitle) return; setP(s=>({ ...s, projects:[...s.projects, { title:projTitle, description:projDesc, link:projLink }] })); setProjTitle(''); setProjDesc(''); setProjLink('') }

  return (
    <div>
      <h2>Profile</h2>
      <label>Name<br/><input value={p.name} onChange={e=>setP({...p, name:e.target.value})} /></label>
      <label>Role<br/><input value={p.role} onChange={e=>setP({...p, role:e.target.value})} /></label>
      <label>Bio<br/><textarea value={p.bio} onChange={e=>setP({...p, bio:e.target.value})}></textarea></label>

      <div>
        <h3>Skills</h3>
        <input placeholder="Add skill" value={skillInput} onChange={e=>setSkillInput(e.target.value)} />
        <button type="button" onClick={addSkill}>Add</button>
        <div style={{display:'flex', gap:8, marginTop:8}}>{p.skills.map((s, i)=> <span key={i} style={{background:'#eee',padding:'4px 8px',borderRadius:6}}>{s}</span>)}</div>
      </div>

      <div>
        <h3>Projects</h3>
        <input placeholder="Project title" value={projTitle} onChange={e=>setProjTitle(e.target.value)} />
        <input placeholder="Project link" value={projLink} onChange={e=>setProjLink(e.target.value)} />
        <textarea placeholder="Short description" value={projDesc} onChange={e=>setProjDesc(e.target.value)}></textarea>
        <button type="button" onClick={addProject}>Add project</button>
        <div>{p.projects.map((pr, idx)=> (
          <div key={idx} style={{border:'1px solid #eee', padding:8, marginTop:8}}>
            <strong>{pr.title}</strong>
            <p>{pr.description}</p>
            <a href={pr.link}>{pr.link}</a>
          </div>
        ))}</div>
      </div>

      <div>
        <h3>Contact</h3>
        <input placeholder="Email" value={p.contact.email} onChange={e=>setP({...p, contact:{...p.contact, email:e.target.value}})} />
        <input placeholder="LinkedIn url" value={p.contact.linkedin} onChange={e=>setP({...p, contact:{...p.contact, linkedin:e.target.value}})} />
      </div>

      <div style={{marginTop:12}}>
        <button onClick={()=>onGenerate(p)} disabled={disabled}>Generate portfolio</button>
      </div>
    </div>
  )
}