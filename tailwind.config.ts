import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'hsl(var(--nextui-default-200) / 1)'
      },
      keyframes: {
        animatedTextGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      backgroundSize: {
        '300%': '300%'
      },
      animation: {
        gradient: 'animatedTextGradient 6s ease infinite alternate'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: '#0A0B0A',
            content1: '#1A1B1A',
            content2: '#2A2B2A',
            content3: '#3A3B3A',
            content4: '#4A4B4A'
          }
        }
      }
    })
  ]
}
export default config
