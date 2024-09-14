import { GITHUB_REPO_URL } from '@/data/links'

type ProjectItem = {
  title: string
  image: string
  description: string
  projectLink: string
  imageBorder?: boolean
}

const ProjectItems: ProjectItem[] = [
  {
    title: 'Fruity Bio',
    image: 'https://zerotwo.lol/Yq2cyx0Z4ZkmXnL54woi.png',
    description:
      'Fruity Bio provides detailed information about various fruits, their nutritional values, and health benefits.',
    projectLink: 'https://fruity.bio'
  },
  {
    title: 'Portfolio Website',
    image: 'https://zerotwo.lol/VyY7V0OwJEKsn7UyCJmx.png',
    description:
      'My personal portfolio website showcasing my skills, projects, and experiences.',
    projectLink: GITHUB_REPO_URL,
    imageBorder: true
  }
]

export { ProjectItems }
