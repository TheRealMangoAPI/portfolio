import React from 'react'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../styles/globals.css'
import Providers from '@/components/Providers'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "MangoAPI's Portfolio",
  description: "MangoAPI's Portfolio website"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
