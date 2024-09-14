import {
  DISCORD_INVITE_URL,
  GITHUB_PROFILE_URL,
  SPOTIFY_ARTIST_URL,
  YOUTUBE_CHANNEL_URL
} from '@/data/links'
import { FaDiscord, FaGithub, FaSpotify, FaYoutube } from 'react-icons/fa6'
import { IconType } from 'react-icons'

type SocialItem = {
  name: string
  href: string
  icon: IconType
}

const SocialItems: SocialItem[] = [
  {
    name: 'GitHub',
    href: GITHUB_PROFILE_URL,
    icon: FaGithub
  },
  {
    name: 'Discord',
    href: DISCORD_INVITE_URL,
    icon: FaDiscord
  },
  {
    name: 'YouTube',
    href: YOUTUBE_CHANNEL_URL,
    icon: FaYoutube
  },
  {
    name: 'Spotify',
    href: SPOTIFY_ARTIST_URL,
    icon: FaSpotify
  }
]

export { SocialItems }
