import type { ReactNode } from 'react'
import { Card, cn } from '@heroui/react'

export function BentoBox({ children, className }: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('grid gap-4', className)}>{children}</div>
}

export function BentoBoxItem({ children, className }: {
  children: ReactNode
  className?: string
}) {
  return <Card className={cn('p-8', className)}>{children}</Card>
}
