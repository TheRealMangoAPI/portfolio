import arcjet, { tokenBucket, validateEmail } from '@arcjet/next'
import { NextResponse } from 'next/server'
import { contactMessageSchema } from '@/schemas/contact-message'
import webhook from 'webhook-discord'

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    validateEmail({
      mode: 'LIVE',
      block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS']
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 1,
      interval: 60,
      capacity: 4
    })
  ]
})

export async function POST(req: Request) {
  const body = await req.json()
  console.log('Received contact message:', body)
  const values = contactMessageSchema.safeParse(body)

  if (!values.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  console.log('Validated contact message:', values.data)

  const decision = await aj.protect(req, {
    email: values.data.email,
    requested: 1
  })

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          message: 'Invalid email',
          reason: decision.reason
        },
        { status: 400 }
      )
    } else if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          message: 'Rate limit exceeded',
          reason: decision.reason
        },
        { status: 429 }
      )
    } else {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
  }

  const hook = new webhook.Webhook(process.env.DISCORD_WEBHOOK_URL)
  const message = new webhook.MessageBuilder()
    .setName('Contact Form')
    .setTitle('New Contact Message')
    .setDescription(
      `**Name:** ${values.data.name}\n**Email:** ${values.data.email}\n**Message:**\n ${values.data.message}`
    )

  try {
    await hook.send(message)
    return NextResponse.json({ message: 'Contact message sent' })
  } catch (error) {
    console.error('Error sending contact message:', error)
    return NextResponse.json(
      { message: 'Error sending contact message' },
      { status: 500 }
    )
  }
}
