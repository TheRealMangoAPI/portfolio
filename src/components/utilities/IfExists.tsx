import React from 'react'

export default function IfExists({
  children,
  variable
}: {
  children: React.ReactNode
  variable: unknown | undefined | null
}) {
  return <>{variable ? children : null}</>
}
