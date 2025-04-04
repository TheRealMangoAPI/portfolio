import { GITHUB_REPO_URL } from '@/data/links'
import React from 'react'
import { Link } from '@nextui-org/link'
import { AvailableMentions } from '@/data/mentions'

export type ProjectItem = {
  title: string
  image: string
  children: React.ReactNode
  projectLinks: {
    github?: string
    website?: string
    discord?: string
  }
  notice?: string
  imageBorder?: boolean
  overrides?: {
    imageWidth?: number
    imageHeight?: number
  }
  mentions?: AvailableMentions[]
}

export const ProjectItems: ProjectItem[] = [
  {
    title: 'Fruity Services',
    image: '/fruity-services.png',
    children: (
      <span>
        A collection of all services that Fruity provides. Primarily{' '}
        <Link target="_blank" href="https://fruity.bio/">
          Fruity Bio
        </Link>
        ,{' '}
        <Link target="_blank" href="https://fruity.bot/">
          Fruity Bot
        </Link>
        , and{' '}
        <Link target="_blank" href="https://fruity.dev/">
          Fruity Dev
        </Link>
        .
      </span>
    ),
    projectLinks: {
      website: 'https://fruity.gg/',
      discord: 'https://discord.gg/vhtrThCT4Y'
    },
    notice: '[Under Development]',
    mentions: ['deadmake']
  },
  {
    title: 'Portfolio Website',
    image: '/portfolio.png',
    notice: '[Open Source]',
    children:
      'My personal portfolio website showcasing my skills, projects, and experiences.',
    projectLinks: {
      website: 'https://mangoapi.dev/',
      github: GITHUB_REPO_URL
    },
    imageBorder: true,
    overrides: {
      imageWidth: 400
    }
  }
]
