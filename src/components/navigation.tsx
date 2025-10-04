'use client'

import { Button, Card, Link } from '@heroui/react'
import { Icon } from '@iconify/react'
import { LINKS } from '@/data/links'
import { NAVIGATION_ITEMS } from '@/data/navigation'

export function Navigation() {
  return (
    <Card className="flex flex-row justify-between items-center fixed top-8 left-1/2 -translate-x-1/2 p-4 space-x-16 z-20 bg-transparent backdrop-blur-xl">
      <div className="flex flex-row space-x-1.5">
        <p className="scale-125">🥭</p>
        <p className="font-semibold">MangoAPI</p>
      </div>
      <div className="hidden md:flex flex-row justify-between items-center space-x-4">
        {NAVIGATION_ITEMS.map(item => (
          <Link key={item.title} href={item.href} className="text-foreground">{item.title}</Link>
        ))}
      </div>
      <div>
        <Button as={Link} href={LINKS.GITHUB_REPO} target="_blank" variant="bordered">
          <p>Give a Star</p>
          <Icon icon="mdi:github" width={22} height={22} />
        </Button>
      </div>
    </Card>
  )
}
