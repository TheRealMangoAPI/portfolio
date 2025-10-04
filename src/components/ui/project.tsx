'use client'

import type { ReactNode } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from '@heroui/react'
import { Icon } from '@iconify/react'

export function ProjectList({ children }: { children: ReactNode }) {
  return <div className="flex w-full max-w-6xl flex-col space-y-24">{children}</div>
}

export function Project({
  title,
  notice,
  description,
  projectLink,
  srcLink,
  image,
  idx,
}: {
  title: string
  notice: string
  description: string
  projectLink: string
  srcLink?: string
  image: string
  idx: number
}) {
  return (
    <div
      className={`flex items-center justify-center gap-x-8 w-full ${idx % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Card className="p-4 w-full flex flex-col h-full">
        <CardHeader>
          <div className="flex flex-row">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="-mt-0.5 ml-2">{notice}</p>
          </div>
        </CardHeader>
        <CardBody>
          <p>{description}</p>
        </CardBody>
        <CardFooter className="flex flex-row items-center space-x-2">
          <Button
            as={Link}
            href={projectLink}
            color="primary"
            className="font-semibold"
            endContent={<Icon icon="solar:arrow-right-up-bold-duotone" width={18} height={18} />}
          >
            View Project
          </Button>
          {srcLink && (
            <Button as={Link} href={srcLink} isIconOnly>
              <Icon icon="mdi:github" width={24} height={24} />
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="hidden md:flex items-stretch max-w-xs">
        <Image
          src={image}
          alt="project-image"
          className="max-h-full w-auto object-contain"
        />
      </div>
    </div>
  )
}
