import React from 'react'

export default function PreviewModal({ isOpen, onClose, previewUrl }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Portfolio Preview</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close preview">
            ×
          </button>
        </div>
        <div className="modal-body">
          {previewUrl ? (
            <iframe 
              src={previewUrl} 
              className="preview-frame"
              title="Portfolio Preview"
            />
          ) : (
            <div className="preview-loading">
              <div className="spinner"></div>
              <p>Generating preview...</p>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Close Preview
          </button>
        </div>
      </div>
    </div>
  )
}
