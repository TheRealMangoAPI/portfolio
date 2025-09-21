import { isSpoofedBot } from '@arcjet/inspect'
import arcjet, { detectBot, shield, tokenBucket } from '@arcjet/next'
import { NextResponse } from 'next/server'
import env from '@/lib/env'
import { contactFormSchema } from '@/lib/validations'

const aj = arcjet({
  key: env.ARCJET_KEY!,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({
      mode: 'LIVE',
      allow: [
        'CATEGORY:MONITOR',
      ],
    }),
    tokenBucket({
      mode: 'LIVE',
      refillRate: 1,
      interval: 60,
      capacity: 4,
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
  try {
    const decision = await aj.protect(req, { requested: 1 })

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          { success: false, error: 'Too many requests. Please try again later.', message: '' },
          { status: 429 },
        )
      }
      else if (decision.reason.isBot()) {
        return NextResponse.json(
          { success: false, error: 'Bot detected', message: '' },
          { status: 403 },
        )
      }
      else {
        return NextResponse.json(
          { success: false, error: 'Request blocked', message: '' },
          { status: 403 },
        )
      }
    }

    if (decision.ip.isHosting()) {
      return NextResponse.json(
        { success: false, error: 'Hosting IP detected', message: '' },
        { status: 403 },
      )
    }

    if (decision.results.some(isSpoofedBot)) {
      return NextResponse.json(
        { success: false, error: 'Spoofed bot detected', message: '' },
        { status: 403 },
      )
    }

    console.warn(decision)

    const body = await req.json()
    const validatedData = contactFormSchema.parse(body)

    const discordSuccess = await sendToDiscord(
      validatedData.name,
      validatedData.email,
      validatedData.message,
    )

    if (!discordSuccess) {
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again later.', message: '' },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      error: undefined,
    })
  }
  catch (error: any) {
    console.error('Contact form error:', error)

    if (error.errors) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check your input and try again.',
          message: '',
          validationErrors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.', message: '' },
      { status: 500 },
    )
  }
}
