import { useState, useRef, useCallback, useEffect } from 'react'
import { SOCIAL_POSTS, SOCIAL_HANDLE, INSTAGRAM_URL, TIKTOK_URL } from './socialFeedConfig'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="play-icon">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function ArrowIcon({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="social-link-icon">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="social-link-icon">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 4.76 1.51V6.75a4.83 4.83 0 0 1-1-.06z" />
    </svg>
  )
}

function PlatformBadge({ platform }) {
  if (platform === 'tiktok') {
    return (
      <span className="reel-platform-badge reel-platform-tiktok" aria-label="TikTok">
        <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.28 8.28 0 0 0 4.76 1.51V6.75a4.83 4.83 0 0 1-1-.06z" />
        </svg>
      </span>
    )
  }
  return (
    <span className="reel-platform-badge reel-platform-instagram" aria-label="Instagram">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="10" height="10">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
      </svg>
    </span>
  )
}

function ReelCard({ post, onClick }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <button className="reel-card" onClick={() => onClick(post)} aria-label={`Play ${post.caption} on ${post.platform}`}>
      <div className="reel-thumbnail-wrap">
        {!imgLoaded && <div className="reel-skeleton" />}
        <img
          src={post.thumbnail}
          alt={post.caption}
          className={`reel-thumbnail${imgLoaded ? ' loaded' : ''}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="reel-overlay">
          <div className="play-btn-circle">
            <PlayIcon />
          </div>
        </div>
        {post.episode && <span className="reel-episode">{post.episode}</span>}
        <PlatformBadge platform={post.platform} />
      </div>
      <p className="reel-caption">{post.caption}</p>
    </button>
  )
}

function ReelModal({ post, onClose }) {
  const isTikTok = post.platform === 'tiktok'

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay reel-modal-overlay" onClick={onClose}>
      <div className={`reel-modal-content${isTikTok ? ' reel-modal-tiktok' : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn reel-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <div className="reel-embed-wrap">
          <iframe
            src={post.embedUrl}
            title={post.caption}
            frameBorder="0"
            allowFullScreen
            allow="autoplay; encrypted-media"
            className="reel-iframe"
            sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          />
        </div>
        <div className="reel-modal-source">
          {isTikTok ? (
            <span className="reel-source-label reel-source-tiktok">
              <TikTokIcon /> TikTok
            </span>
          ) : (
            <span className="reel-source-label reel-source-instagram">
              <InstagramIcon /> Instagram
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SocialFeed() {
  const [activePost, setActivePost] = useState(null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollRef = useRef(null)

  const visiblePosts = SOCIAL_POSTS.slice(0, visibleCount)
  const hasMore = visibleCount < SOCIAL_POSTS.length

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState, visibleCount])

  const scroll = useCallback((dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('.reel-card')?.offsetWidth || 200
    el.scrollBy({ left: dir * (cardWidth + 16) * 2, behavior: 'smooth' })
  }, [])

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + 6, SOCIAL_POSTS.length))
  }, [])

  return (
    <section className="social-section" id="social">
      <div className="social-header-area">
        <p className="social-label">FOLLOW ALONG</p>
        <h2 className="social-title">From Our Community</h2>
        <p className="social-subtitle">
          Faith, stars, and everyday wisdom — catch the latest from {SOCIAL_HANDLE}
        </p>
      </div>

      <div className="social-carousel-wrapper">
        {canScrollLeft && (
          <button className="carousel-arrow carousel-arrow-left" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ArrowIcon direction="left" />
          </button>
        )}

        <div className="social-carousel" ref={scrollRef}>
          {visiblePosts.map((post) => (
            <ReelCard key={post.id} post={post} onClick={setActivePost} />
          ))}
        </div>

        {canScrollRight && (
          <button className="carousel-arrow carousel-arrow-right" onClick={() => scroll(1)} aria-label="Scroll right">
            <ArrowIcon direction="right" />
          </button>
        )}
      </div>

      <div className="social-actions">
        {hasMore && (
          <button className="social-btn social-btn-load" onClick={loadMore}>
            Load More
          </button>
        )}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn social-btn-follow social-btn-instagram"
        >
          <InstagramIcon />
          Follow on Instagram
        </a>
        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn social-btn-follow social-btn-tiktok"
        >
          <TikTokIcon />
          Follow on TikTok
        </a>
      </div>

      {activePost && (
        <ReelModal post={activePost} onClose={() => setActivePost(null)} />
      )}
    </section>
  )
}
