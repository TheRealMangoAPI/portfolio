'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Button, Card, CardBody, CardHeader, Input, Textarea } from '@nextui-org/react'
import { SendIcon } from 'lucide-react'
import { contactMessageSchema, ContactMessage } from '@/schemas/contact-message'

function ContactSection() {
  const [state, setState] = React.useState<'IDLE' | 'ERROR' | 'SUCCESS' | 'LOADING'>(
    'IDLE'
  )
  const [message, setMessage] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactMessage>({
    resolver: zodResolver(contactMessageSchema)
  })

  const onSubmit = async (data: ContactMessage) => {
    setState('LOADING')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setState('SUCCESS')
        const body = await res.json()
        setMessage(body.message)
        console.table(body)
      } else {
        setState('ERROR')
        const body = await res.json()
        setMessage(body.message)
        console.table(body)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Section className="pt-36" id="contact">
      <Card className="w-full max-w-6xl border p-8">
        <CardHeader className="justify-center">
          <SectionTitle
            subTitle="CONTACT"
            description="Get in touch with me for any queries or collaborations."
          >
            Contact Me
          </SectionTitle>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="Name"
              variant="bordered"
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              required
            />
            <Input
              type="email"
              label="Email"
              variant="bordered"
              {...register('email')}
              isInvalid={!!errors.email}
              color={errors.email ? 'danger' : 'default'}
              errorMessage={errors.email?.message}
              required
            />
            <Textarea
              label="Message"
              placeholder="Enter your message here..."
              variant="bordered"
              {...register('message')}
              isInvalid={!!errors.message}
              errorMessage={errors.message?.message}
              required
            />
            <div className="flex flex-row items-center justify-between">
              {state === 'ERROR' && (
                <p>{message || 'An error occurred while sending the message.'}</p>
              )}
              {state === 'SUCCESS' && <p>{message || 'Message sent successfully.'}</p>}
              <Button
                type="submit"
                color="primary"
                endContent={<SendIcon size={20} />}
                className="ml-auto font-semibold"
                isLoading={state === 'LOADING'}
              >
                Send Message
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </Section>
  )
}

export default ContactSection
