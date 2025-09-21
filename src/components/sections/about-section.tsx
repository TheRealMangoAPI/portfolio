'use client'

import type { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Icon } from '@iconify/react'
import { BentoBox, BentoBoxItem } from '@/components/ui/bento-box'
import { Section, SectionTitle } from '@/components/ui/section'

export function AboutSection() {
  return (
    <Section className="flex-col pt-36">
      <SectionTitle
        title="A Glimpse Into My World"
        subTitle="ABOUT ME"
        description="Learn more about me, what I do, and what I'm passionate about."
      />
      <BentoBox className="max-w-6xl grid-cols-3">
        <BentoBoxItem className="col-span-3 md:col-span-1">
          <h3 className="text-lg font-semibold">Who Am I?</h3>
          <p className="mt-2 text-sm text-foreground-500">
            I&apos;m a 16-year-old guy from Switzerland who loves to code and build
            things. I&apos;ve been coding for 5 years now and I&apos;m passionate about
            web development, design, and technology.
          </p>
        </BentoBoxItem>
        <BentoBoxItem className="col-span-3 md:col-span-2">
          <h3 className="text-lg font-semibold">My Toolbox</h3>
          <p className="mt-2 text-sm text-foreground-500">
            Explore the technologies I use to build projects and websites.
          </p>
          <div className="flex w-full">
            <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              <ToolboxItem icon={<Icon icon="devicon:nextjs" />}>Next.js</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:tailwindcss" />}>Tailwind</ToolboxItem>
              <ToolboxItem icon={<Icon icon="simple-icons:vercel" />}>Vercel</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:docker" />}>Docker</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:postgresql" />}>PostgreSQL</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:unity" />}>Unity</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:typescript" />}>TypeScript</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:cplusplus" />}>C++</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:csharp" />}>C#</ToolboxItem>
            </ul>
          </div>
        </BentoBoxItem>
        <BentoBoxItem className="col-span-3 md:col-span-2">
          <h3 className="text-lg font-semibold">Beyond the Code</h3>
          <p className="mt-2 text-sm text-foreground-500">
            Explore my interests, hobbies, and what I do when I&apos;m not coding.
          </p>
          <div className="flex w-full">
            <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              <InterestsItem
                icon={<Icon icon="mdi:laptop" />}
                content="I love building and tinkering with computers and other tech."
              >
                Hardware
              </InterestsItem>
              <InterestsItem
                icon={<Icon icon="mdi:gamepad-variant" />}
                content="I enjoy playing video games, especially with friends."
              >
                Gaming
              </InterestsItem>
              <InterestsItem
                icon={<Icon icon="mdi:gym" />}
                content="I like to stay active and go to the gym regularly."
              >
                Fitness
              </InterestsItem>
              <InterestsItem
                icon={<Icon icon="mdi:music" />}
                content="I&apos;m a big fan of music and love discovering new artists and genres."
              >
                Music
              </InterestsItem>
            </ul>
          </div>
        </BentoBoxItem>
        <BentoBoxItem>
          <h3 className="text-lg font-semibold">Currently Learning</h3>
          <p className="mt-2 text-sm text-foreground-500">
            Technologies I’m currently learning
          </p>
          <div className="flex w-full">
            <ul className="mt-4 grid grid-cols-2 gap-4">
              <ToolboxItem icon={<Icon icon="devicon:kubernetes" />}>Kubernetes</ToolboxItem>
              <ToolboxItem icon={<Icon icon="devicon:tauri" />}>Tauri</ToolboxItem>
            </ul>
          </div>
        </BentoBoxItem>
      </BentoBox>
    </Section>
  )
}

function ToolboxItem({
  children,
  icon,
}: {
  children: ReactNode
  icon: ReactNode
}) {
  return (
    <li
      className="flex flex-row items-center rounded-md border border-[#3F3F46] px-2 py-1 text-sm"
    >
      <span className="mr-2">{icon}</span>
      {children}
    </li>
  )
}

function InterestsItem({
  children,
  icon,
  content,
}: {
  children: ReactNode
  icon: ReactNode
  content: string
}) {
  return (
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <li
          className="flex animate-gradient cursor-pointer flex-row items-center rounded-md border border-[#3F3F46] px-2 py-1 text-sm"
        >
          <span className="mr-2">{icon}</span>
          {children}
        </li>
      </PopoverTrigger>
      <PopoverContent>
        <div className="max-w-[225px] break-words px-1 py-2">{content}</div>
      </PopoverContent>
    </Popover>
  )
}
