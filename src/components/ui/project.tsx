'use client'

import type { ReactNode } from 'react'

import { Button, Card, CardBody, CardFooter, CardHeader, Image, Link } from '@heroui/react'
import { Icon } from '@iconify/react'

export function ProjectList({ children }: { children: ReactNode }) {
  return <div className="flex w-full max-w-6xl flex-col space-y-12 sm:space-y-16 lg:space-y-24">{children}</div>
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
      className={`flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-x-8 w-full ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
    >
      <Card className="p-3 sm:p-4 w-full flex flex-col h-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h3>
            <p className="text-xs sm:text-sm text-foreground-500">{notice}</p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-sm sm:text-base text-foreground-600">{description}</p>
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

      <div className="hidden sm:flex items-center justify-center w-full sm:w-auto sm:max-w-[200px] md:max-w-[250px] lg:max-w-xs shrink-0">
        <Image
          src={image}
          alt={`${title} project preview`}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>

      <div className="sm:hidden w-full">
        <Image
          src={image}
          alt={`${title} project preview`}
          className="w-full max-h-48 object-cover rounded-lg"
        />
      </div>
    </div>
  )
}
