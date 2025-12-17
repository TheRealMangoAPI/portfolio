'use client'

import { Button, Divider, Link } from '@heroui/react'
import { Icon } from '@iconify/react'

import { Section } from '@/components/ui/section'
import { SOCIAL_ITEMS } from '@/data/social'

export function HeroSection() {
  return (
    <Section className="flex flex-row space-x-2 sm:space-x-4 h-[100svh]">
      <div className="hidden sm:flex flex-col items-center justify-center space-y-2 pr-1">
        {SOCIAL_ITEMS.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl sm:text-3xl lg:text-4xl duration-300 hover:opacity-75"
          >
            <Icon
              icon={item.icon}
              width={32}
              height={32}
              className="sm:w-9 sm:h-9 lg:w-[42px] lg:h-[42px]"
            />
          </a>
        ))}
      </div>

      <Divider
        className="hidden sm:flex h-40 sm:h-48 lg:h-56 w-0.5"
        orientation="vertical"
      />

      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="animate-gradient bg-gradient-to-r from-primary to-secondary bg-300% bg-clip-text text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent leading-tight">
            {'<'}
            MANGOAPI
            {' />'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground-500 mt-2">
            Some guy from Switzerland
          </p>
        </div>

        <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
          <Button
            variant="bordered"
            endContent={<Icon icon="mdi:arrow-down" />}
            className="font-semibold text-sm sm:text-base"
            as={Link}
            href="#projects"
          >
            Explore Projects
          </Button>
          <Button
            color="primary"
            className="font-semibold text-sm sm:text-base"
            as={Link}
            href="#contact"
          >
            👋 Let&apos;s Connect
          </Button>
        </div>

        <div className="flex sm:hidden flex-row items-center justify-center space-x-4 pt-4">
          {SOCIAL_ITEMS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="duration-300 hover:opacity-75"
            >
              <Icon icon={item.icon} width={28} height={28} />
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}
