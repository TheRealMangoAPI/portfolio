'use client'

import React, { useEffect, useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Button, Divider } from '@nextui-org/react'
import { SocialItems } from '@/data/socials'
import { ArrowDownIcon } from 'lucide-react'
import { Link } from '@nextui-org/link'
import gsap from 'gsap'

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        delay: 1,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(buttonsRef.current, {
        y: 20,
        opacity: 0,
        delay: 1.5,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
      })

      gsap.from(socialsRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.5,
        delay: 1.2,
        ease: 'power2.out'
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={heroRef} className="flex h-screen items-center">
      <div className="flex w-fit flex-row items-center space-x-2">
        <div
          ref={socialsRef}
          className="hidden flex-col items-center justify-center space-y-2 pr-1 md:flex"
        >
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
            <h1
              ref={titleRef}
              className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-300% bg-clip-text text-6xl font-black text-transparent md:text-9xl"
            >
              MANGOAPI
            </h1>
            <p ref={subtitleRef} className="text-xl md:text-2xl">
              Some guy from Switzerland
            </p>
          </div>
          <div ref={buttonsRef} className="flex flex-row space-x-4">
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
