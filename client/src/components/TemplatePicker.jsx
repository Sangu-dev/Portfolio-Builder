import React from 'react'

// Template preview placeholders with CSS
const TemplatePlaceholder = ({ templateId, name }) => {
  const previews = {
    'template--simple': {
      icon: '📄',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    'template--modern': {
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    'template--classic': {
      icon: '📰',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    'template--minimalist': {
      icon: '✨',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    'template--dark': {
      icon: '🌙',
      gradient: 'linear-gradient(135deg, #434343 0%, #000000 100%)'
    },
    'template--creative': {
      icon: '🎨',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  }

  const preview = previews[templateId] || { icon: '📋', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }

  return (
    <div className="template-placeholder" style={{ background: preview.gradient }}>
      <div className="template-placeholder-icon">{preview.icon}</div>
      <div className="template-placeholder-pattern"></div>
    </div>
  )
}

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
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(t)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Select ${t.name} template`}
            aria-pressed={selected?.id === t.id}
          >
            <div className="template-image-wrapper">
              <TemplatePlaceholder templateId={t.id} name={t.name} />
              {selected?.id === t.id && (
                <div className="template-checkmark" aria-hidden="true">✓</div>
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
