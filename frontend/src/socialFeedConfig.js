/**
 * Social media feed configuration for Luz Astrology.
 *
 * Add your Instagram/TikTok reels here. Each entry needs:
 * - id: unique identifier
 * - thumbnail: URL to the reel thumbnail image
 * - embedUrl: the Instagram or TikTok embed URL for the reel
 * - platform: 'instagram' or 'tiktok'
 * - caption: short text overlay or description
 * - episode: optional episode label (e.g. "EP 5")
 *
 * To get Instagram embed URLs: go to the post → ··· → Embed → copy the URL
 *   Format: https://www.instagram.com/reel/XXXX/embed/
 *
 * To get TikTok embed URLs:
 *   Format: https://www.tiktok.com/embed/v2/VIDEO_ID
 */

export const SOCIAL_HANDLE = '@luzastrology'
export const INSTAGRAM_URL = 'https://www.instagram.com/luzastrology'

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
    id: 'thank-you',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=600&fit=crop',
    embedUrl: 'https://www.instagram.com/reel/EXAMPLE6/embed/',
    platform: 'instagram',
    caption: 'A Thank You for 10M',
  },
]
