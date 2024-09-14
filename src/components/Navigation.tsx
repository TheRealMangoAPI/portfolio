import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@nextui-org/navbar'
import { Link } from '@nextui-org/link'
import { NavigationItems } from '@/data/navigation'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Button } from '@nextui-org/react'
import { FaGithub } from 'react-icons/fa6'
import { GITHUB_REPO_URL } from '@/data/links'

function Navigation() {
  return (
    <Navbar maxWidth="xl" className="fixed">
      <NavbarBrand as={Link} href="/" className="text-foreground">
        <p className="text-xl">MangoAPI</p>
      </NavbarBrand>
      <NavbarContent justify="center" className="hidden md:flex">
        {NavigationItems.map((item, index) => (
          <NavigationItem key={index} href={item.href}>
            {item.name}
          </NavigationItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          as={Link}
          href={GITHUB_REPO_URL}
          target="_blank"
          variant="bordered"
          isIconOnly
        >
          <FaGithub size={22} />
        </Button>
        <ThemeSwitcher triggerClassName="hidden md:flex" />
        <NavbarMenuToggle className="block md:hidden" />
      </NavbarContent>
      <NavbarMenu>
        {NavigationItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Link color="foreground" href={item.href}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <ThemeSwitcher variant="text" />
      </NavbarMenu>
    </Navbar>
  )
}

type NavigationItemProps = {
  children: React.ReactNode
  href: string
}

function NavigationItem({ children, href }: NavigationItemProps) {
  return (
    <NavbarItem>
      <Link color="foreground" href={href}>
        {children}
      </Link>
    </NavbarItem>
  )
}

export default Navigation
