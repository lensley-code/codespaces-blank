import { useState, useCallback } from 'react'
import { BookerEmbed } from '@calcom/atoms'
import '@calcom/atoms/globals.min.css'
import { CAL_USERNAME, CAL_EVENT_SLUGS } from './calConfig'
import './App.css'

const OFFERINGS = [
  {
    id: 'natal-promise',
    name: 'The Natal Promise',
    price: '$195',
    description:
      'A foundational reading exploring your inherent gifts, struggles, and life purpose as designed by the Creator.',
    features: [
      '75-minute live consultation',
      'Deep dive into core placements',
      'Identification of lifelong themes',
      'Video & Audio recording provided',
    ],
    icon: 'globe',
    featured: false,
  },
  {
    id: 'current-season',
    name: 'Current Season',
    price: '$150',
    description:
      'For returning clients. An analysis of the planetary movements currently activating your chart.',
    features: [
      '60-minute live consultation',
      'Focus on transits & progressions',
      'Navigating immediate life questions',
      'Video & Audio recording provided',
    ],
    icon: 'sun',
    featured: true,
  },
  {
    id: 'written-synthesis',
    name: 'Written Synthesis',
    price: '$250',
    description:
      'A comprehensive, beautifully crafted PDF document detailing your birth chart without a live session.',
    features: [
      '20+ page personalized document',
      'Written from a spiritual perspective',
      'Keepsake for lifelong reference',
      'Delivered within 14 days',
    ],
    icon: 'book',
    featured: false,
  },
]

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

const iconMap = { globe: IconGlobe, sun: IconSun, book: IconBook }

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">
        <span className="star">✦</span>
        <span>Luz Astrology</span>
      </a>
      <ul className="navbar-links">
        <li><a href="#">Learn More</a></li>
        <li><a href="#">How It Works</a></li>
        <li><a href="#">Offerings</a></li>
        <li><a href="#">Philosophy</a></li>
        <li><a href="#">Readings</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
      <a href="#offerings" className="navbar-cta">Book a Reading →</a>
    </nav>
  )
}

function PricingCard({ offering, onBook }) {
  const Icon = iconMap[offering.icon]
  return (
    <div className={`pricing-card${offering.featured ? ' featured' : ''}`}>
      <div className="card-icon">{Icon && <Icon />}</div>
      <h3 className="card-name">{offering.name}</h3>
      <div className="card-price">{offering.price}</div>
      <p className="card-description">{offering.description}</p>
      <ul className="card-features">
        {offering.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <button className="book-btn" onClick={() => onBook(offering)}>
        BOOK NOW
      </button>
    </div>
  )
}

function TermsModal({ offering, onAccept, onClose }) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Terms & Conditions</h2>
          <p>Please review before booking {offering.name}</p>
        </div>

        <div className="modal-body">
          <div className="terms-text">
            <h3>1. Booking & Payment</h3>
            <p>
              Full payment is required at the time of booking to confirm your appointment. All
              prices are listed in USD. Payment is processed securely through our integrated
              payment system at checkout.
            </p>

            <h3>2. Cancellation & Rescheduling</h3>
            <p>
              You may reschedule or cancel your appointment up to <strong>48 hours</strong> before
              your scheduled session at no charge. Cancellations made less than 48 hours in advance
              are non-refundable. No-shows will not be refunded or rescheduled.
            </p>

            <h3>3. Nature of Service</h3>
            <p>
              Astrological readings provided by Luz Astrology are for spiritual guidance and
              personal enrichment purposes only. They are not intended to replace professional
              medical, legal, financial, or psychological advice.
            </p>
            <ul>
              <li>Readings are rooted in faith and guided by astrological principles.</li>
              <li>Results and interpretations are subjective in nature.</li>
              <li>You are encouraged to use your own discernment with all guidance received.</li>
            </ul>

            <h3>4. Recordings & Deliverables</h3>
            <p>
              Live consultation recordings (video & audio) will be provided within 48 hours of your
              session. Written Synthesis documents will be delivered within 14 business days.
              Deliverables are for your personal use only and may not be redistributed.
            </p>

            <h3>5. Confidentiality</h3>
            <p>
              All information shared during your reading is treated as strictly confidential.
              Luz Astrology will never share your personal details or session content with third
              parties without your explicit consent.
            </p>

            <h3>6. Acceptance</h3>
            <p>
              By proceeding to book, you acknowledge that you have read, understood, and agree to
              these Terms & Conditions.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="agree-terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree-terms">
              I have read and agree to the Terms & Conditions
            </label>
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-accept" disabled={!agreed} onClick={onAccept}>
              Continue to Booking →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarModal({ offering, onClose }) {
  const eventSlug = CAL_EVENT_SLUGS[offering.id] || offering.id

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-header">
          <h2>Book {offering.name}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="calendar-body">
          <BookerEmbed
            eventSlug={eventSlug}
            username={CAL_USERNAME}
            view="MONTH_VIEW"
            customClassNames={{
              bookerContainer: 'border-subtle border',
            }}
            onCreateBookingSuccess={() => {
              console.log('Booking created successfully for', offering.name)
            }}
          />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [termsOffering, setTermsOffering] = useState(null)
  const [calendarOffering, setCalendarOffering] = useState(null)

  const handleBook = useCallback((offering) => {
    setTermsOffering(offering)
  }, [])

  const handleAcceptTerms = useCallback(() => {
    const offering = termsOffering
    setTermsOffering(null)
    setCalendarOffering(offering)
  }, [termsOffering])

  const handleCloseTerms = useCallback(() => {
    setTermsOffering(null)
  }, [])

  const handleCloseCalendar = useCallback(() => {
    setCalendarOffering(null)
  }, [])

  return (
    <>
      <Navbar />

      <section className="offerings-section" id="offerings">
        <p className="offerings-label">OFFERINGS</p>
        <h2 className="offerings-title">Guidance for Every Season</h2>
        <p className="offerings-subtitle">
          Each reading is a sacred conversation — rooted in faith, guided by the stars,
          and crafted with care for your unique journey.
        </p>

        <div className="pricing-cards">
          {OFFERINGS.map((o) => (
            <PricingCard key={o.id} offering={o} onBook={handleBook} />
          ))}
        </div>
      </section>

      {termsOffering && (
        <TermsModal
          offering={termsOffering}
          onAccept={handleAcceptTerms}
          onClose={handleCloseTerms}
        />
      )}

      {calendarOffering && (
        <CalendarModal
          offering={calendarOffering}
          onClose={handleCloseCalendar}
        />
      )}
    </>
  )
}

export default App
