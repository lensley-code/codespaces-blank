import { useState, useEffect, useCallback, useRef } from 'react'
import { TESTIMONIALS } from './testimonialsConfig'

function StarRating({ rating }) {
  return (
    <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`star${i <= rating ? ' star-filled' : ''}`}
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.5.91-5.33L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  )
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 32 32" className="testimonial-quote-icon" aria-hidden="true">
      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
    </svg>
  )
}

function TestimonialCard({ testimonial, isActive }) {
  return (
    <div className={`testimonial-card${isActive ? ' active' : ''}`}>
      <QuoteIcon />

      <p className="testimonial-text">{testimonial.text}</p>

      <StarRating rating={testimonial.rating} />

      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <span>{testimonial.initials}</span>
        </div>
        <div className="testimonial-author-info">
          <span className="testimonial-name">{testimonial.name}</span>
          <span className="testimonial-service">{testimonial.service}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(0)
  const carouselRef = useRef(null)
  const count = TESTIMONIALS.length

  const goTo = useCallback((idx) => {
    setActiveIndex(((idx % count) + count) % count)
  }, [count])

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, isPaused])

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
  }, [next, prev])

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header-area">
        <p className="testimonials-label">TESTIMONIALS</p>
        <h2 className="testimonials-title">Words from the Stars</h2>
        <p className="testimonials-subtitle">
          Hear from those who have experienced the light of their chart
        </p>
      </div>

      <div
        className="testimonials-carousel"
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="testimonial-arrow testimonial-arrow-left" onClick={prev} aria-label="Previous testimonial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="testimonials-track">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} isActive={i === activeIndex} />
          ))}
        </div>

        <button className="testimonial-arrow testimonial-arrow-right" onClick={next} aria-label="Next testimonial">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="testimonials-dots">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            className={`testimonial-dot${i === activeIndex ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
