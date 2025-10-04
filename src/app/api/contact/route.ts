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
    return NextResponse.json({ success: false, message: 'Missing Body' }, { status: 400 })
  })

  const values = contactFormSchema.safeParse(body)

  if (!values.success) {
    return NextResponse.json({ success: false, message: 'Invalid data' }, { status: 400 })
  }

  const decision = await aj.protect(req, {
    email: values.data.email,
  })

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address. Please check and try again.',
        },
        { status: 400 },
      )
    }
    else if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait a few minutes before trying again.',
        },
        { status: 429 },
      )
    }
    else if (decision.reason.isBot()) {
      return NextResponse.json(
        {
          success: false,
          message: 'Automated requests are not allowed. Please try again.',
        },
        { status: 403 },
      )
    }
    else {
      return NextResponse.json({ success: false, message: 'Request forbidden. Please try again later.' }, { status: 403 })
    }
  }

  if (decision.ip.hasAsn() && decision.ip.asnType === 'hosting') {
    return NextResponse.json({ success: false, message: 'Requests from hosting providers are not allowed.' }, { status: 403 })
  }

  if (
    decision.ip.isHosting()
    || decision.ip.isVpn()
    || decision.ip.isProxy()
    || decision.ip.isRelay()
  ) {
    return NextResponse.json({ success: false, message: 'Requests from VPNs, proxies, or suspicious networks are not allowed.' }, { status: 403 })
  }

  const sent = await sendToDiscord(values.data.name, values.data.email, values.data.message)

  if (!sent) {
    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 })
}
