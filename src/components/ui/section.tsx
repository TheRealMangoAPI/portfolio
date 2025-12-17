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
          'relative flex w-full items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-0',
          className,
        )}
      >
        <div id={id} className="absolute -top-20 sm:-top-24" />
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
    <div className="flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 pb-8 sm:pb-10 lg:pb-12 text-center">
      <p className="animate-gradient bg-gradient-to-r from-primary to-secondary bg-300% bg-clip-text font-bold text-transparent text-xs sm:text-sm">
        {subTitle}
      </p>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">{title}</h2>
      <p className="text-foreground-500 text-sm sm:text-base max-w-md lg:max-w-lg">{description}</p>
    </div>
  )
}
