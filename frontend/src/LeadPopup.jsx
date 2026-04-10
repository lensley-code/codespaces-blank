import { useState, useEffect, useCallback } from 'react'

const POPUP_DELAY_MS = 30000
const STORAGE_KEY = 'luz_popup_dismissed'

export default function LeadPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setVisible(true), POPUP_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (visible) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [visible])

  const dismiss = useCallback(() => {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }, [email])

  if (!visible) return null

  return (
    <div className="lead-overlay" onClick={dismiss}>
      <div className="lead-popup" onClick={(e) => e.stopPropagation()}>
        <button className="lead-close" onClick={dismiss} aria-label="Close">✕</button>

        {/* Left: zodiac image panel */}
        <div className="lead-image-panel">
          {/*
            Replace the src below with your actual zodiac wheel image.
            Save your image as /public/zodiac-wheel.jpg and use src="/zodiac-wheel.jpg"
          */}
          <div className="lead-zodiac-art">
            <div className="zodiac-ring zodiac-ring-outer" />
            <div className="zodiac-ring zodiac-ring-inner" />
            <div className="zodiac-center-star">✦</div>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="zodiac-line"
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </div>
          <div className="lead-image-stars" />
        </div>

        {/* Right: content panel */}
        <div className="lead-content-panel">
          <div className="lead-stars-row">★★★★★</div>

          <h2 className="lead-title">
            Receive Your Free Spiritual Guide
          </h2>

          <p className="lead-description">
            Enter your email below to unlock your personalized astrological chart reading
            and our 2024 celestial handbook.
          </p>

          {!submitted ? (
            <form className="lead-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="lead-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button type="submit" className="lead-submit">
                Get My Free Book
              </button>
              <p className="lead-disclaimer">
                By signing up, you agree to receive spiritual insights and updates.
                You can unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="lead-success">
              <div className="lead-success-icon">✦</div>
              <p className="lead-success-text">
                Thank you! Check your inbox for your free spiritual guide.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
