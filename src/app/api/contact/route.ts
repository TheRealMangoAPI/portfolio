import arcjet, { protectSignup } from '@arcjet/next'
import { NextResponse } from 'next/server'
import env from '@/lib/env'
import { contactFormSchema } from '@/lib/validations'

const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    protectSignup({
      email: {
        mode: 'LIVE',
        block: ['DISPOSABLE', 'NO_MX_RECORDS', 'INVALID'],
      },
      bots: {
        mode: 'LIVE',
        allow: ['CATEGORY:MONITOR'],
      },
      rateLimit: {
        mode: 'LIVE',
        interval: '10m',
        max: 3,
      },
    }),
  ],
})

async function sendToDiscord(name: string, email: string, message: string) {
  try {
    const webhookPayload = {
      embeds: [
        {
          title: 'New Contact Message',
          color: 0x3B82F6,
          fields: [
            {
              name: 'Name',
              value: name,
              inline: true,
            },
            {
              name: 'Email',
              value: email,
              inline: true,
            },
            {
              name: 'Message',
              value: message.length > 1024 ? `${message.substring(0, 1021)}...` : message,
              inline: false,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }

    const response = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`)
    }

    return true
  }
  catch (error) {
    console.error('Failed to send message to Discord:', error)
    return false
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => {
    return NextResponse.json({ error: 'Missing Body' }, { status: 400 })
  })

  const values = contactFormSchema.safeParse(body)

  if (!values.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const decision = await aj.protect(req, {
    email: values.data.email,
  })

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          message: 'Invalid email',
        },
        { status: 400 },
      )
    }
    else if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          message: 'Rate limit exceeded',
        },
        { status: 429 },
      )
    }
    else if (decision.reason.isBot()) {
      return NextResponse.json(
        {
          message: 'Bot detected',
        },
        { status: 403 },
      )
    }
    else {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
  }

  if (decision.ip.hasAsn() && decision.ip.asnType === 'hosting') {
    return NextResponse.json({ message: 'Hosting provider detected' }, { status: 403 })
  }

  if (
    decision.ip.isHosting()
    || decision.ip.isVpn()
    || decision.ip.isProxy()
    || decision.ip.isRelay()
  ) {
    return NextResponse.json({ message: 'Suspicious network detected' }, { status: 403 })
  }

  const sent = await sendToDiscord(values.data.name, values.data.email, values.data.message)

  if (!sent) {
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 },
    )
  }

  return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
}
