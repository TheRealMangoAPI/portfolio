'use client'

import { Button, Link } from '@heroui/react'
import { Icon } from '@iconify/react'

import { SOCIAL_ITEMS } from '@/data/social'

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center pb-4 sm:pb-6 pt-16 sm:pt-24 lg:pt-36 px-4 sm:px-6 lg:px-8 xl:px-0">
      <div className="flex w-full max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 border-t pt-4 sm:pt-6">
        <p className="text-xs sm:text-sm text-foreground-500 text-center sm:text-left z-20">
          &copy; MangoAPI
          {' '}
          {new Date().getFullYear()}
          . All rights reserved.
        </p>

        <div className="flex flex-row items-center flex-wrap justify-center gap-1 sm:gap-2">
          {SOCIAL_ITEMS.map(item => (
            <Button
              variant="light"
              as={Link}
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-3"
            >
              <span className="hidden xs:inline">{item.name}</span>
              <Icon icon={item.icon} width={18} height={18} className="xs:hidden" />
              <Icon icon="solar:arrow-right-up-bold-duotone" width={14} height={14} className="hidden xs:block" />
            </Button>
          ))}
        </div>
      </div>
    </footer>
  )
}
