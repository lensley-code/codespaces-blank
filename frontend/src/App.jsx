import { useState, useCallback, useEffect } from 'react'
import { BookerEmbed } from '@calcom/atoms'
import '@calcom/atoms/globals.min.css'
import { CAL_USERNAME, CAL_EVENT_SLUGS } from './calConfig'
import SocialFeed from './SocialFeed'
import Testimonials from './Testimonials'
import LeadPopup from './LeadPopup'
import './App.css'

const OFFERINGS = [
  {
    id: 'natal-chart-reading',
    name: 'Natal Chart Reading',
    price: '$77',
    description:
      'A one hour session where we take a look at your Natal chart and come to a basic understanding of what is written in the stars when you were born.',
    features: [
      '60-minute live consultation',
      'Areas of challenge & favorable life themes',
      'Past to present life overview',
      'Conversational & faith-rooted approach',
    ],
    icon: 'globe',
    featured: false,
  },
  {
    id: 'biblical-guidance',
    name: 'Chart Reading with Biblical Guidance',
    price: '$99',
    description:
      'An in-depth 90-minute chart reading with Biblical guidance woven throughout, connecting the stars to Scripture.',
    features: [
      '90-minute live consultation',
      'In-depth Biblical integration',
      'Deeper spiritual perspective',
      'Personalized scriptural insights',
    ],
    icon: 'book',
    featured: true,
  },
  {
    id: 'transits-profections',
    name: 'Transits & Profections',
    price: '$99',
    description:
      'A chart reading focused on current transits and profections — understanding what the planets are activating in your life right now.',
    features: [
      '60-minute live consultation',
      'Focus on current planetary transits',
      'Annual profections breakdown',
      'Navigating your present season',
    ],
    icon: 'sun',
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
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <nav className="navbar">
      <a href="#" className="navbar-brand">
        <span className="star">✦</span>
        <span>Luz Astrology</span>
      </a>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#" onClick={closeMenu}>Learn More</a></li>
        <li><a href="#" onClick={closeMenu}>How It Works</a></li>
        <li><a href="#offerings" onClick={closeMenu}>Offerings</a></li>
        <li><a href="#" onClick={closeMenu}>Philosophy</a></li>
        <li><a href="#" onClick={closeMenu}>Readings</a></li>
        <li><a href="#" onClick={closeMenu}>FAQ</a></li>
      </ul>
      <a href="#offerings" className="navbar-cta">Book a Reading →</a>
      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
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

  useEffect(() => {
    if (termsOffering || calendarOffering) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [termsOffering, calendarOffering])

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

      <SocialFeed />

      <Testimonials />

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

      <LeadPopup />
    </>
  )
}

export default App
