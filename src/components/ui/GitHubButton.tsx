'use client'
import { Star } from 'lucide-react'
import React, { useState } from 'react'

import { Colors, Liquid } from './LiquidGradient'

const COLORS: Colors = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0'
}
function GitHubButton({ url }: { url: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex justify-center">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="group relative mx-auto inline-block h-[2.7em] w-36 scale-85 rounded-lg border-2 border-black bg-white dark:border-white dark:bg-black"
      >
        <div className="absolute left-1/2 top-[8.57%] h-[128.57%] w-[112.81%] -translate-x-1/2 opacity-70 blur-[19px] filter">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] blur-[6.5px] filter"></span>
          <div className="relative h-full w-full overflow-hidden rounded-lg">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-[112.85%] w-[92.23%] -translate-x-1/2 -translate-y-[40%] rounded-lg bg-[#010128] blur-[7.3px] filter"></div>
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
          <span className="absolute inset-0 rounded-lg bg-black"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`border-gradient-to-b absolute inset-0 rounded-lg border-[3px] border-solid from-transparent to-white mix-blend-overlay filter ${
                i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-[4px]'
              }`}
            ></span>
          ))}
          <span className="absolute left-1/2 top-1/2 h-[42.85%] w-[70.8%] -translate-x-1/2 -translate-y-[40%] rounded-lg bg-[#006] blur-[15px] filter"></span>
          <span className="absolute left-[5%] top-[7%] flex h-[85%] w-[90%] items-center justify-between gap-2 whitespace-nowrap rounded-lg px-4 text-xl font-semibold tracking-wide text-white group-hover:text-yellow-400">
            <Star className="h-6 w-6 flex-shrink-0 fill-white group-hover:fill-yellow-400" />
            Github
          </span>
        </div>
        <button
          className="absolute inset-0 cursor-pointer rounded-lg bg-transparent"
          aria-label="Get Started"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></button>
      </a>
    </div>
  )
}

export default GitHubButton
