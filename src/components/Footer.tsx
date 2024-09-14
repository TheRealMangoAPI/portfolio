import React from 'react'
import { SocialItems } from '@/data/socials'
import { Link } from '@nextui-org/link'
import { Button } from '@nextui-org/react'
import { ArrowUpRightIcon } from 'lucide-react'

function Footer() {
  return (
    <footer className="flex w-full items-center justify-center pb-6 pt-36">
      <div className="flex w-full max-w-6xl flex-row items-center justify-between border-t pt-4">
        <p className="mx-auto md:mx-0" id="f">
          &copy; MangoAPI {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className="hidden flex-row items-center md:flex">
          {SocialItems.map((item) => (
            <Button
              variant="light"
              as={Link}
              endContent={<ArrowUpRightIcon />}
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <p>{item.name}</p>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
