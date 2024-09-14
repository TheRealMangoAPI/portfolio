import { z } from 'zod'

const contactMessageSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500)
})

type ContactMessage = z.infer<typeof contactMessageSchema>

export { contactMessageSchema, type ContactMessage }
