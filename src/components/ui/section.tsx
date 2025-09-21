import { cn } from '@heroui/react'
import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
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

export function SectionTitle({
  title,
  subTitle,
  description,
}: {
  title: string
  subTitle: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 pb-12">
      <p
        className="animate-gradient bg-gradient-to-r from-primary to-secondary bg-300% bg-clip-text font-bold text-transparent"
      >
        {subTitle}
      </p>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-foreground-500">{description}</p>
    </div>
  )
}
