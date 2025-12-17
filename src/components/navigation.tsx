'use client'

import { Button, Card, Link } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

import { LINKS } from '@/data/links'
import { NAVIGATION_ITEMS } from '@/data/navigation'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Card className="hidden sm:flex flex-row justify-between items-center fixed top-4 lg:top-8 left-1/2 -translate-x-1/2 p-3 lg:p-4 space-x-4 sm:space-x-8 lg:space-x-16 z-20 bg-transparent backdrop-blur-xl">
        <div className="flex flex-row space-x-1.5 shrink-0">
          <p className="scale-125">🥭</p>
          <p className="font-semibold">MangoAPI</p>
        </div>
        <div className="hidden md:flex flex-row justify-between items-center space-x-2 lg:space-x-4">
          {NAVIGATION_ITEMS.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className="text-foreground text-sm lg:text-base whitespace-nowrap"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="shrink-0">
          <Button
            as={Link}
            href={LINKS.GITHUB_REPO}
            target="_blank"
            variant="bordered"
          >
            <p>Give a Star</p>
            <Icon icon="mdi:github" width={22} height={22} />
          </Button>
        </div>
      </Card>

      <div className="sm:hidden fixed top-4 left-4 right-4 z-20">
        <Card className="flex flex-row justify-between items-center p-3 bg-transparent backdrop-blur-xl">
          <div className="flex flex-row space-x-1.5">
            <p className="scale-125">🥭</p>
            <p className="font-semibold">MangoAPI</p>
          </div>
          <Button
            isIconOnly
            variant="light"
            aria-label="Toggle menu"
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon
              icon={isMenuOpen ? 'mdi:close' : 'mdi:menu'}
              width={24}
              height={24}
            />
          </Button>
        </Card>

        {isMenuOpen && (
          <Card className="mt-2 p-4 bg-black/90 backdrop-blur-xl">
            <nav className="flex flex-col space-y-4">
              {NAVIGATION_ITEMS.map(item => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-foreground text-lg py-2 border-b border-foreground-200/20"
                  onPress={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              <Button
                as={Link}
                href={LINKS.GITHUB_REPO}
                target="_blank"
                variant="bordered"
                className="mt-2"
              >
                Give a Star
                <Icon icon="mdi:github" width={22} height={22} />
              </Button>
            </nav>
          </Card>
        )}
      </div>
    </>
  )
}
