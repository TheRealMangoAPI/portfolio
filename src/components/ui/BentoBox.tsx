import React from 'react'
import { Card, cn } from '@nextui-org/react'

type BentoBoxProps = {
  children: React.ReactNode
  className?: string
}

function BentoBox({ children, className }: BentoBoxProps) {
  return <div className={cn('grid gap-4', className)}>{children}</div>
}

type BentoBoxItemProps = {
  children: React.ReactNode
  className?: string
}

function BentoBoxItem({ children, className }: BentoBoxItemProps) {
  return <Card className={cn('border p-8', className)}>{children}</Card>
}

export { BentoBox, BentoBoxItem }
