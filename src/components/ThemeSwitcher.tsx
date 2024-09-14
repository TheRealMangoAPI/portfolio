'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon, MonitorIcon } from 'lucide-react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@nextui-org/react'

type ThemeSwitcherProps = {
  triggerClassName?: string
  variant?: 'icon' | 'text'
}

function ThemeSwitcher({ triggerClassName, variant }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme, themes } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const themeIconMap = {
    dark: <MoonIcon size={24} />,
    light: <SunIcon size={24} />,
    system: <MonitorIcon size={24} />
  }

  return (
    <Dropdown
      classNames={{
        content: 'bg-background border',
        trigger: triggerClassName
      }}
    >
      {variant === 'text' ? (
        <DropdownTrigger>
          {theme && (
            <Button
              startContent={themeIconMap[theme as keyof typeof themeIconMap]}
              variant="bordered"
              className="capitalize"
            >
              {theme}
            </Button>
          )}
        </DropdownTrigger>
      ) : (
        <DropdownTrigger>
          <Button variant="bordered" isIconOnly>
            {themeIconMap[theme as keyof typeof themeIconMap]}
          </Button>
        </DropdownTrigger>
      )}
      <DropdownMenu
        selectionMode="single"
        selectedKeys={[theme as keyof typeof themeIconMap]}
      >
        {themes.map((t) => (
          <DropdownItem
            key={t}
            onClick={() => setTheme(t)}
            startContent={theme && themeIconMap[t as keyof typeof themeIconMap]}
            className="capitalize"
          >
            {t}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default ThemeSwitcher
