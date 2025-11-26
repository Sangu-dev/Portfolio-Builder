import React from 'react'

// Template preview placeholders with CSS
const TemplatePlaceholder = ({ templateId, name }) => {
  const previews = {
    'template--simple': {
      icon: '✨',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
    },
    'template--modern': {
      icon: '🚀',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    },
    'template--classic': {
      icon: '💎',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
    },
    'template--minimalist': {
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
    },
    'template--dark': {
      icon: '🌙',
      gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
    },
    'template--creative': {
      icon: '🎨',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)'
    },
    'template--tech': {
      icon: '👨‍💻',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)'
    },
    'template--elegant': {
      icon: '✒️',
      gradient: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)'
    }
  }

  const preview = previews[templateId] || { icon: '📋', gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }

  return (
    <div className="template-placeholder" style={{ background: preview.gradient }}>
      <div className="template-placeholder-icon">{preview.icon}</div>
    </div>
  )
}

export default function TemplatePicker({ templates = [], selected, onSelect }) {
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
