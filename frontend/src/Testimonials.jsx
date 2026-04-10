import { useState, useCallback, useMemo, useEffect } from 'react'
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

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card-inner">
        <StarRating rating={testimonial.rating} />
        <p className="testimonial-text">"{testimonial.text}"</p>
        <span className="testimonial-name">{testimonial.name}</span>
      </div>
      <div className="testimonial-glow" />
    </div>
  )
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function usePerPage() {
  const getPerPage = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth >= 600) return 3
    return 1
  }

  const [perPage, setPerPage] = useState(getPerPage)

  useEffect(() => {
    const onResize = () => setPerPage(getPerPage())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return perPage
}

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const perPage = usePerPage()

  const totalPages = useMemo(
    () => Math.ceil(TESTIMONIALS.length / perPage),
    [perPage]
  )

  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1))
  }, [totalPages, page])

  const displayed = useMemo(
    () => TESTIMONIALS.slice(page * perPage, page * perPage + perPage),
    [page, perPage]
  )

  const hasMultiplePages = totalPages > 1
  const canPrev = page > 0
  const canNext = page < totalPages - 1

  const goPrev = useCallback(() => setPage((p) => Math.max(0, p - 1)), [])
  const goNext = useCallback(() => setPage((p) => Math.min(totalPages - 1, p + 1)), [totalPages])

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header-area">
        <p className="testimonials-label">TESTIMONIALS</p>
        <h2 className="testimonials-title">Words from Seekers</h2>
      </div>

      <div className="testimonials-carousel-wrap">
        {hasMultiplePages && (
          <button
            className={`tm-arrow tm-arrow-left${canPrev ? '' : ' tm-arrow-disabled'}`}
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Previous testimonials"
          >
            <ArrowLeft />
          </button>
        )}

        <div className="testimonials-grid" key={page}>
          {displayed.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

        {hasMultiplePages && (
          <button
            className={`tm-arrow tm-arrow-right${canNext ? '' : ' tm-arrow-disabled'}`}
            onClick={goNext}
            disabled={!canNext}
            aria-label="Next testimonials"
          >
            <ArrowRight />
          </button>
        )}
      </div>

      {hasMultiplePages && (
        <div className="tm-dots">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`tm-dot${i === page ? ' active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="testimonials-cta">
        <a href="#offerings" className="testimonials-cta-btn">
          Book Your Reading →
        </a>
      </div>
    </section>
  )
}
