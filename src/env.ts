import { z } from 'zod'

const envVariables = z.object({
  ARCJET_KEY: z.string(),
  DISCORD_WEBHOOK_URL: z.string()
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
