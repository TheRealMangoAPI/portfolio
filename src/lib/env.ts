import { z } from 'zod'

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
})

// eslint-disable-next-line node/prefer-global/process
const { data: env, error } = EnvSchema.safeParse(process.env)

if (error) {
  console.error('❌ Invalid env:')
  console.error(JSON.stringify(error.message, null, 2))
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
}

export default env!
