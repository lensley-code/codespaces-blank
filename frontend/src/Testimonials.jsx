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

export default function Testimonials() {
  const displayed = TESTIMONIALS.slice(0, 3)

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header-area">
        <p className="testimonials-label">TESTIMONIALS</p>
        <h2 className="testimonials-title">Words from Seekers</h2>
      </div>

      <div className="testimonials-grid">
        {displayed.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>

      <div className="testimonials-cta">
        <a href="#offerings" className="testimonials-cta-btn">
          Book Your Reading →
        </a>
      </div>
    </section>
  )
}
