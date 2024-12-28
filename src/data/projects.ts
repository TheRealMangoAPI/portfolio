import { GITHUB_REPO_URL } from '@/data/links'
import React from 'react'

export type ProjectItem = {
  title: string
  image: string
  children: React.ReactNode
  projectLink: string
  notice?: string
  imageBorder?: boolean
  overrides?: {
    imageWidth?: number
    imageHeight?: number
  }
}

const ProjectItems: ProjectItem[] = [
  {
    title: 'Fruity Bot',
    image: 'https://zerotwo.lol/6hU7UwTaq3SWKdwoUShn.png',
    children: 'A Discord bot that provides various utilities and fun commands for users.',
    projectLink: 'https://fruity.bot',
    notice: '[Closed Beta]'
  },
  {
    title: 'Fruity Bio',
    image: 'https://zerotwo.lol/Yq2cyx0Z4ZkmXnL54woi.png',
    children:
      'Fruity Bio provides customized biography pages for your social media profiles.',
    projectLink: 'https://fruity.bio',
    notice: '[Under Development]'
  },
  {
    title: 'Portfolio Website',
    image: 'https://zerotwo.lol/VyY7V0OwJEKsn7UyCJmx.png',
    children:
      'My personal portfolio website showcasing my skills, projects, and experiences.',
    projectLink: GITHUB_REPO_URL,
    imageBorder: true,
    overrides: {
      imageWidth: 400
    }
  }
]

export { ProjectItems }
