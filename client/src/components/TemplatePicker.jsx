import React from 'react'

export default function TemplatePicker({ templates = [], selected, onSelect }){
  return (
    <div>
      <h2>Choose template</h2>
      <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
        {templates.map(t => (
          <div key={t.id} style={{border:selected&&selected.id===t.id? '2px solid #333':'1px solid #eee', padding:8, width:200, cursor:'pointer'}} onClick={()=>onSelect(t)}>
            <img src={t.thumbnail || `/templates/${t.id}/thumbnail.png`} alt={t.name} style={{width:'100%', height:120, objectFit:'cover'}} />
            <strong>{t.name}</strong>
            <p style={{fontSize:12,color:'#666'}}>{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}