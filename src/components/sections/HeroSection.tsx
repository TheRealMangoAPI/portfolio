import React from 'react'
import { Section } from '@/components/ui/Section'
import { Button, Divider } from '@nextui-org/react'
import { SocialItems } from '@/data/socials'
import { ArrowDownIcon } from 'lucide-react'
import { Link } from '@nextui-org/link'

function HeroSection() {
  return (
    <Section className="flex h-screen items-center">
      <div className="flex w-fit flex-row items-center space-x-2">
        <div className="hidden flex-col items-center justify-center space-y-2 pr-1 md:flex">
          {SocialItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl duration-300 hover:opacity-75"
            >
              <item.icon className="h-6 w-6 md:h-10 md:w-10" />
            </a>
          ))}
        </div>
        <Divider
          className="hidden h-56 w-0.5 bg-foreground md:flex"
          orientation="vertical"
        />
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center justify-center">
            <h1 className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-300% bg-clip-text text-6xl font-black text-transparent md:text-9xl">
              MANGOAPI
            </h1>
            <p className="text-xl md:text-2xl">Some guy from Switzerland</p>
          </div>
          <div className="flex flex-row space-x-4">
            <Button
              variant="bordered"
              endContent={<ArrowDownIcon />}
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
      </div>
    </Section>
  )
}

export default HeroSection
