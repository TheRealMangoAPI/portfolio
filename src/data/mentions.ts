export const Mentions = {
  deadmake: {
    name: 'Deadmake',
    color: '#21044A',
    href: 'https://deadmake.dev/'
  }
} as const

export type AvailableMentions = keyof typeof Mentions
