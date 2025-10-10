import React from 'react'

export default function TemplatePicker({ templates = [], selected, onSelect }){
  return (
    <div>
      <h2>Choose Template</h2>
      <div className="templates-grid">
        {templates.map(t => (
          <div 
            key={t.id} 
            className={`template-card ${selected?.id === t.id ? 'template-selected' : ''}`}
            onClick={() => onSelect(t)}
          >
            <div className="template-image-wrapper">
              <img 
                src={t.thumbnail || `/templates/${t.id}/thumbnail.png`} 
                alt={t.name} 
                className="template-image"
              />
              {selected?.id === t.id && (
                <div className="template-checkmark">✓</div>
              )}
            </div>
            <div className="template-info">
              <strong className="template-name">{t.name}</strong>
              <p className="template-description">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
