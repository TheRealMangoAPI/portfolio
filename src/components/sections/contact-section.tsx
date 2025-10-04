'use client'

import type { FormEvent } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input, Textarea } from '@heroui/react'

import { Icon } from '@iconify/react'
import { Section, SectionTitle } from '@/components/ui/section'
import { useContactForm } from '@/hooks/use-contact-form'

export function ContactSection() {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    submitForm,
    resetForm,
    isFormValid,
  } = useContactForm()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await submitForm()
  }

  if (isSubmitted) {
    return (
      <Section className="flex-col pt-36">
        <Card className="p-8 w-full max-w-6xl">
          <CardBody className="flex flex-col items-center justify-center text-center gap-6 py-12">
            <div className="w-32 h-32">
              <Image
                src="/thumbs-up-3d.png"
                alt="Success"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Message has been delivered!</h3>
              <p className="text-foreground-500 max-w-md">
                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
              </p>
            </div>
            <Button
              color="primary"
              variant="light"
              onPress={resetForm}
              startContent={<Icon icon="material-symbols:arrow-back" width={20} height={20} />}
            >
              Send Another Message
            </Button>
          </CardBody>
        </Card>
      </Section>
    )
  }

  return (
    <Section className="flex-col pt-36">
      <Card className="p-8 w-full max-w-6xl">
        <CardHeader className="justify-center">
          <SectionTitle
            title="Contact Me"
            subTitle="CONTACT"
            description="Feel free to reach out for collaborations or just a friendly hello!"
          />
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-row w-full justify-between items-center gap-8">
            <div className="flex flex-col space-y-6 w-full">
              <Input
                type="text"
                label="Name"
                variant="faded"
                value={formData.name}
                onValueChange={value => updateField('name', value)}
                isInvalid={!!errors.name}
                errorMessage={errors.name}
                required
                classNames={{
                  errorMessage: 'text-sm font-medium',
                }}
              />
              <Input
                type="email"
                label="Email"
                variant="faded"
                value={formData.email}
                onValueChange={value => updateField('email', value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                required
                classNames={{
                  errorMessage: 'text-sm font-medium',
                }}
              />
              <Textarea
                label="Message"
                variant="faded"
                value={formData.message}
                onValueChange={value => updateField('message', value)}
                isInvalid={!!errors.message}
                errorMessage={errors.message}
                minRows={3}
                maxRows={8}
                required
                classNames={{
                  errorMessage: 'text-sm font-medium',
                }}
              />
              {errors.general && (
                <div className="text-danger text-sm font-medium bg-danger-50 border border-danger-200 rounded-lg p-3 flex items-center gap-2">
                  <Icon icon="material-symbols:error" width={16} height={16} />
                  {errors.general}
                </div>
              )}
            </div>
          </CardBody>
          <CardFooter className="flex-row items-center gap-4">
            <p className="text-sm text-foreground-500">
              Don't be shy, whether it's a quick question, a big idea, or just saying hi 👋
            </p>
            <Button
              type="submit"
              color="primary"
              endContent={<Icon icon="lets-icons:send-duotone" width={28} height={28} />}
              className="ml-auto font-semibold"
              isLoading={isSubmitting}
              isDisabled={isSubmitting || !isFormValid}
            >
              Send Message
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Section>
  )
}
