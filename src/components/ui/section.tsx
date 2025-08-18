import { cn } from '@heroui/react'
import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className, id }: SectionProps, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative flex w-full items-center justify-center px-4 md:px-0',
          className,
        )}
      >
        <div id={id} className="absolute -top-24"></div>
        {children}
      </section>
    )
  },
)

Section.displayName = 'Section'

interface SectionTitleProps {
  title: string
  subTitle: string
  description: string
}

function SectionTitle({ title, subTitle, description }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 pb-12">
      <p className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-300% bg-clip-text font-bold text-transparent">
        {subTitle}
      </p>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-foreground-500">{description}</p>
    </div>
  )
}

export { Section, SectionTitle }
