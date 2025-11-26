import React from 'react'

export default function LandingPage({ onStart }) {
    return (
        <div className="landing-page">
            <div className="hero">
                <h1><span className="logo-icon">✦</span>Portfolio Builder</h1>
                <p className="subtitle">
                    Build a professional portfolio in minutes. Choose from our premium templates,
                    customize your profile, and download your site instantly.
                </p>

                <div className="features" style={{ marginBottom: 40 }}>
                    <div className="feature-badge">✨ 8 Premium Templates</div>
                    <div className="feature-badge">👁️ Live Preview</div>
                    <div className="feature-badge">⚡ Instant Download</div>
                    <div className="feature-badge">📱 Mobile Responsive</div>
                </div>

                <button onClick={onStart} className="btn-primary" style={{ maxWidth: 300, fontSize: '1.2rem', padding: '20px 40px' }}>
                    🚀 Start Building Now
                </button>
            </div>

            <div className="landing-preview">
                {/* Optional: Add a visual preview or screenshot here later */}
            </div>
        </div>
    )
}
