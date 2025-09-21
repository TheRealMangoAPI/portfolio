'use client'

import { Button, Divider, Link } from '@heroui/react'
import { Icon } from '@iconify/react'
import { Section } from '@/components/ui/section'
import { SOCIAL_ITEMS } from '@/data/social'

export function HeroSection() {
  return (
    <Section className="flex flex-row space-x-4 h-[100svh]">
      <div className="hidden flex-col items-center justify-center space-y-2 pr-1 md:flex">
        {SOCIAL_ITEMS.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-4xl duration-300 hover:opacity-75"
          >
            <Icon icon={item.icon} width={42} height={42} />
          </a>
        ))}
      </div>
      <Divider className="h-56 w-0.5" orientation="vertical" />
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col items-center justify-center">
          <h1
            className="animate-gradient bg-gradient-to-r from-primary to-secondary bg-300% bg-clip-text text-6xl font-black text-transparent md:text-9xl"
          >
            {'<'}
            MANGOAPI
            {' />'}
          </h1>
          <p className="text-xl md:text-2xl">
            Some guy from Switzerland
          </p>
        </div>
        <div className="flex flex-row space-x-4">
          <Button
            variant="bordered"
            endContent={<Icon icon="mdi:arrow-down" />}
            className="font-semibold"
            as={Link}
            href="#projects"
          >
            Explore Projects
          </Button>
          <Button color="primary" className="font-semibold" as={Link} href="#contact">
            👋 Let&apos;s Connect
          </Button>
        </div>
      </div>
    </Section>
  )
}
