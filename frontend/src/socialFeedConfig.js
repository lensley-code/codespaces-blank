/**
 * Social media feed configuration for Luz Astrology.
 *
 * Add your Instagram and TikTok reels here. Each entry needs:
 * - id: unique identifier
 * - thumbnail: URL to the reel thumbnail image
 * - embedUrl: the platform embed URL for the reel
 * - platform: 'instagram' or 'tiktok'
 * - caption: short text overlay or description
 * - episode: optional episode label (e.g. "EP 5")
 *
 * INSTAGRAM embed URLs:
 *   Go to the post → ··· → Embed → copy the URL
 *   Format: https://www.instagram.com/reel/XXXX/embed/
 *
 * TIKTOK embed URLs:
 *   Go to the video → Share → Embed → copy the src from the iframe
 *   Format: https://www.tiktok.com/embed/v2/VIDEO_ID
 *   (VIDEO_ID is the long number in the TikTok URL)
 */

export const SOCIAL_HANDLE = '@luzastrology'
export const INSTAGRAM_URL = 'https://www.instagram.com/luzastrology'
export const TIKTOK_URL = 'https://www.tiktok.com/@luzastrology'

export const SOCIAL_POSTS = [
  {
    id: 'ep5',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE1/embed/',
    platform: 'instagram',
    caption: 'Time Blocking',
    episode: 'EP 5',
  },
  {
    id: 'tiktok-1',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    embedUrl: 'https://www.tiktok.com/embed/v2/7000000000000000000',
    platform: 'tiktok',
    caption: 'Mercury Retrograde Survival Guide',
  },
  {
    id: 'ep4',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE2/embed/',
    platform: 'instagram',
    caption: 'Shift Your Beliefs Around Discomfort',
    episode: 'EP 4',
  },
  {
    id: 'stop-distraction',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE3/embed/',
    platform: 'instagram',
    caption: 'Stop Distraction',
  },
  {
    id: 'tiktok-2',
    thumbnail: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop',
    embedUrl: 'https://www.tiktok.com/embed/v2/7000000000000000001',
    platform: 'tiktok',
    caption: 'Your Venus Sign Explained',
  },
  {
    id: 'ep3',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE4/embed/',
    platform: 'instagram',
    caption: 'So Distracted',
    episode: 'EP 3',
  },
  {
    id: 'procrastinating',
    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE5/embed/',
    platform: 'instagram',
    caption: 'How to Stop Procrastinating',
    episode: 'EP 1',
  },
  {
    id: 'tiktok-3',
    thumbnail: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop',
    embedUrl: 'https://www.tiktok.com/embed/v2/7000000000000000002',
    platform: 'tiktok',
    caption: 'Full Moon Rituals for Every Sign',
  },
  {
    id: 'thank-you',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE6/embed/',
    platform: 'instagram',
    caption: 'A Thank You for 10M',
  },
]
