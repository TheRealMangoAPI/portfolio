'use client'

import { Button, Link } from '@heroui/react'
import { Icon } from '@iconify/react'
import { SOCIAL_ITEMS } from '@/data/social'

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center pb-6 pt-36">
      <div className="flex w-full max-w-6xl flex-row items-center justify-between border-t pt-4">
        <p className="mx-auto md:mx-0 z-20">
          &copy; MangoAPI
          {' '}
          {new Date().getFullYear()}
          . All rights reserved.
        </p>
        <div className="hidden flex-row items-center md:flex">
          {SOCIAL_ITEMS.map(item => (
            <Button
              variant="light"
              as={Link}
              endContent={<Icon icon="solar:arrow-right-up-bold-duotone" />}
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <p>{item.name}</p>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  )
}
