'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

type ProvidersProps = {
  children: React.ReactNode
}

function Providers({ children }: ProvidersProps) {
  const router = useRouter()
  return (
    <ThemeProvider attribute="class">
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </ThemeProvider>
  )
}

export default Providers
