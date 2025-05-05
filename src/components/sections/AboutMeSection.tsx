'use client'

import React, { useEffect, useRef } from 'react'
import { Section, SectionTitle } from '@/components/ui/Section'
import { BentoBox, BentoBoxItem } from '@/components/ui/BentoBox'
import { RiNextjsFill, RiTailwindCssFill } from 'react-icons/ri'
import {
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiTypescript,
  SiVercel
} from 'react-icons/si'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { CpuArchitecture } from '@/components/ui/CpuArch'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import '@/styles/cpu.css'

gsap.registerPlugin(ScrollTrigger)

function ToolboxItem({
  children,
  icon
}: {
  children: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <li className="toolbox-item flex flex-row items-center rounded-md border px-2 py-1 text-sm text-foreground-500">
      <span className="mr-2">{icon}</span>
      {children}
    </li>
  )
}

function InterestsItem({
  children,
  icon,
  content
}: {
  children: React.ReactNode
  icon: React.ReactNode
  content: string
}) {
  return (
    <Popover placement="bottom" showArrow>
      <PopoverTrigger>
        <li className="interests-item flex animate-gradient cursor-pointer flex-row items-center rounded-md border bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-300% bg-clip-text px-2 py-1 text-sm font-bold text-foreground-500 text-transparent">
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

function AboutMeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.bento-box-item').forEach((item, idx) => {
        gsap.from(item as HTMLElement, {
          x: idx % 2 === 0 ? -80 : 80,
          y: idx % 2 !== 0 ? -40 : 40,
          opacity: 0,
          duration: 1,
          delay: idx % 2 !== 0 ? idx * 0.2 : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        })
      })

      gsap.utils.toArray('.toolbox-item').forEach((item, idx) => {
        gsap.from(item as HTMLElement, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          delay: idx * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        })
      })

      gsap.utils.toArray('.interests-item').forEach((item, idx) => {
        gsap.from(item as HTMLElement, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          delay: idx * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} className="flex-col pt-36" id="about">
      <SectionTitle
        subTitle="ABOUT ME"
        description="Learn more about me, what I do, and what I'm passionate about."
      >
        A Glimpse Into My World
      </SectionTitle>
      <BentoBox className="max-w-6xl grid-cols-3">
        <BentoBoxItem className="bento-box-item col-span-3 md:col-span-1">
          <h3 className="text-lg font-semibold">Who Am I?</h3>
          <p className="mt-2 text-sm text-foreground-500">
            I&apos;m a 16-year-old guy from Switzerland who loves to code and build
            things. I&apos;ve been coding for 5 years now and I&apos;m passionate about
            web development, design, and technology.
          </p>
        </BentoBoxItem>
        <BentoBoxItem className="bento-box-item col-span-3 md:col-span-2">
          <h3 className="text-lg font-semibold">My Toolbox</h3>
          <p className="mt-2 text-sm text-foreground-500">
            Explore the technologies I use to build projects and websites.
          </p>
          <div className="flex w-full">
            <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              <ToolboxItem icon={<RiNextjsFill />}>Next.js</ToolboxItem>
              <ToolboxItem icon={<RiTailwindCssFill />}>Tailwind</ToolboxItem>
              <ToolboxItem icon={<SiVercel />}>Vercel</ToolboxItem>
              <ToolboxItem icon={<SiTypescript />}>TypeScript</ToolboxItem>
              <ToolboxItem icon={<SiDocker />}>Docker</ToolboxItem>
              <ToolboxItem icon={<SiPostgresql />}>Postgresql</ToolboxItem>
              <ToolboxItem icon={<SiKubernetes />}>Kubernetes</ToolboxItem>
            </ul>
          </div>
        </BentoBoxItem>
        <BentoBoxItem className="bento-box-item col-span-3 md:col-span-2">
          <h3 className="text-lg font-semibold">Beyond the Code</h3>
          <p className="mt-2 text-sm text-foreground-500">
            Explore my interests, hobbies, and what I do when I&apos;m not coding.
          </p>
          <div className="flex w-full">
            <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
              <InterestsItem
                icon="🎧"
                content="I like making music and listening to different genres."
              >
                Music
              </InterestsItem>
              <InterestsItem
                icon="🎮"
                content="I play video games and stream on Twitch occasionally."
              >
                Gaming
              </InterestsItem>
              <InterestsItem
                icon="💻"
                content="I love learning new technologies and improving my skills."
              >
                Technology
              </InterestsItem>
            </ul>
          </div>
        </BentoBoxItem>
        <BentoBoxItem className="bento-box-item hidden items-center md:flex">
          <CpuArchitecture className="scale-125" />
        </BentoBoxItem>
      </BentoBox>
    </Section>
  )
}

export default AboutMeSection
