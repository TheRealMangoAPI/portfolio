import React from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from '@nextui-org/react'
import { ArrowUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@nextui-org/link'
import { ProjectItem } from '@/data/projects'

type ProjectListProps = {
  children: React.ReactNode
}

function ProjectList({ children }: ProjectListProps) {
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
  projectLink,
  imageBorder,
  notice,
  overrides
}: ProjectItemProps) {
  const isReversed = idx % 2 !== 0

  return (
    <div
      className={`flex w-full items-center justify-between ${isReversed ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <Card className="border p-8">
        <CardHeader>
          <h1 className="text-4xl font-semibold">{title}</h1>
          <p className="-mt-2.5 ml-2">{notice}</p>
        </CardHeader>
        <Divider />
        <CardBody className="text-foreground-500">{children}</CardBody>
        <CardFooter>
          <Button
            color="primary"
            endContent={<ArrowUpRightIcon />}
            className="font-semibold"
            as={Link}
            href={projectLink}
          >
            View Project
          </Button>
        </CardFooter>
      </Card>
      <Image
        src={image}
        alt="Project Image"
        width={overrides?.imageWidth ?? 240}
        height={overrides?.imageHeight ?? 240}
        className={`hidden rounded-md md:block ${imageBorder && 'border'}`}
      />
    </div>
  )
}

export { Project, ProjectList }
