'use client'

import type { ReactNode } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <ThemeProvider attribute="class">
      <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
    </ThemeProvider>
  )
}
