import arcjet, { protectSignup } from '@arcjet/next'
import { NextResponse } from 'next/server'
import { contactMessageSchema } from '@/schemas/contact-message'
import webhook from 'webhook-discord'
import env from '@/env'

const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    protectSignup({
      email: {
        mode: 'LIVE',
        block: ['DISPOSABLE', 'NO_MX_RECORDS', 'INVALID']
      },
      bots: {
        mode: 'LIVE'
      },
      rateLimit: {
        mode: 'LIVE',
        interval: '10m',
        max: 3
      }
    })
  ]
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => {
    return NextResponse.json({ error: 'Missing Body' }, { status: 400 })
  })

  const values = contactMessageSchema.safeParse(body)

  if (!values.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const decision = await aj.protect(req, {
    email: values.data.email
  })

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          message: 'Invalid email'
        },
        { status: 400 }
      )
    } else if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          message: 'Rate limit exceeded'
        },
        { status: 429 }
      )
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        {
          message: 'Bot detected'
        },
        { status: 403 }
      )
    } else {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
  }

  if (decision.ip.hasASN() && decision.ip.asnType == 'hosting') {
    return NextResponse.json({ message: 'Hosting provider detected' }, { status: 403 })
  }

  if (
    decision.ip.isHosting() ||
    decision.ip.isVpn() ||
    decision.ip.isProxy() ||
    decision.ip.isRelay()
  ) {
    return NextResponse.json({ message: 'Suspicious network detected' }, { status: 403 })
  }

  const hook = new webhook.Webhook(env.DISCORD_WEBHOOK_URL)
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
