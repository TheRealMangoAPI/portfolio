import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip
} from '@nextui-org/react'
import { ArrowUpRightIcon, Tag } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@nextui-org/link'
import { ProjectItem } from '@/data/projects'
import IfExists from '@/components/utilities/IfExists'
import { FaDiscord } from 'react-icons/fa6'
import { Mentions } from '@/data/mentions'

function ProjectList({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full max-w-6xl flex-col space-y-24">{children}</div>
}

type ProjectItemProps = {
  idx: number
} & ProjectItem

function Project({
  children,
  title,
  image,
  idx,
  projectLinks,
  imageBorder,
  notice,
  overrides,
  mentions
}: ProjectItemProps) {
  const isReversed = idx % 2 !== 0

  return (
    <div
      className={`flex w-full items-center justify-between ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Card className="border p-8">
        <CardHeader className="flex flex-col items-start justify-between">
          <div className="flex flex-row">
            <h1 className="text-4xl font-semibold">{title}</h1>
            <p className="-mt-0.5 ml-2">{notice}</p>
          </div>
          <div className="flex flex-row space-x-4">
            {mentions && mentions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {mentions.map((mention, index) => {
                  const mentionData = Mentions[mention]
                  return (
                    <Chip
                      key={index}
                      style={{
                        backgroundColor: mentionData.color
                      }}
                      as={Link}
                      href={mentionData.href}
                      target="_blank"
                    >
                      {mentionData.name}
                    </Chip>
                  )
                })}
              </div>
            )}
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="text-foreground-500">{children}</CardBody>
        <CardFooter className="space-x-2">
          <IfExists variable={projectLinks.website}>
            <Button
              color="primary"
              endContent={<ArrowUpRightIcon />}
              className="font-semibold"
              as={Link}
              href={projectLinks.website}
              target="_blank"
            >
              View Project
            </Button>
          </IfExists>
          <IfExists variable={projectLinks.github}>
            <Button
              color="secondary"
              variant="light"
              endContent={<ArrowUpRightIcon />}
              className="font-semibold"
              as={Link}
              href={projectLinks.github}
              target="_blank"
            >
              View Code
            </Button>
          </IfExists>
          <IfExists variable={projectLinks.discord}>
            <Button
              isIconOnly={true}
              variant="light"
              className="font-semibold"
              as={Link}
              href={projectLinks.discord}
              target="_blank"
            >
              <FaDiscord size={24} />
            </Button>
          </IfExists>
        </CardFooter>
      </Card>
      <Image
        src={image}
        alt="project image"
        width={overrides?.imageWidth ?? 240}
        height={overrides?.imageHeight ?? 240}
        className={`hidden rounded-md md:block ${imageBorder && 'border'}`}
      />
    </div>
  )
}

export { Project, ProjectList }
