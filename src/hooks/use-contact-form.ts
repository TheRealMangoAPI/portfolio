import type { ContactApiResponse, ContactFormData } from '@/lib/validations'
import { useCallback, useMemo, useState } from 'react'
import { contactFormSchema } from '@/lib/validations'

interface FormErrors {
  name?: string
  email?: string
  message?: string
  general?: string
}

interface UseContactFormReturn {
  formData: ContactFormData
  errors: FormErrors
  isSubmitting: boolean
  isSubmitted: boolean
  updateField: (field: keyof ContactFormData, value: string) => void
  submitForm: () => Promise<void>
  resetForm: () => void
  isFormValid: boolean
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  message: '',
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Set<keyof ContactFormData>>(new Set())

  const validateField = useCallback((field: keyof ContactFormData, value: string, showError = false) => {
    try {
      const fieldSchema = contactFormSchema.pick({ [field]: true })
      fieldSchema.parse({ [field]: value })

      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
      return true
    }
    catch (error: any) {
      const zodError = error.errors?.[0]
      if (zodError && (showError || touchedFields.has(field))) {
        setErrors(prev => ({
          ...prev,
          [field]: zodError.message,
        }))
      }
      return false
    }
  }, [touchedFields])

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    setTouchedFields(prev => new Set(prev).add(field))

    if (field === 'message' && touchedFields.has(field)) {
      if (value.trim().length > 0 && value.trim().length < 10) {
        setErrors(prev => ({
          ...prev,
          message: `Message must be at least 10 characters (${value.trim().length}/10)`,
        }))
      }
      else if (value.trim().length >= 10) {
        validateField(field, value, true)
      }
    }
    else if (value.trim() || touchedFields.has(field)) {
      validateField(field, value, true)
    }
  }, [validateField, touchedFields])

  const isFormValid = useMemo(() => {
    const { name, email, message } = formData

    if (!name.trim() || !email.trim() || !message.trim()) {
      return false
    }

    try {
      contactFormSchema.parse(formData)
      return true
    }
    catch {
      return false
    }
  }, [formData])

  const submitForm = useCallback(async () => {
    try {
      setIsSubmitting(true)
      setErrors({})

      setTouchedFields(new Set(['name', 'email', 'message']))

      const nameValid = validateField('name', formData.name, true)
      const emailValid = validateField('email', formData.email, true)
      const messageValid = validateField('message', formData.message, true)

      if (!nameValid || !emailValid || !messageValid) {
        return
      }

      const validatedData = contactFormSchema.parse(formData)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      const result: ContactApiResponse = await response.json()

      if (!response.ok) {
        setErrors({ general: result.message || 'Failed to send message' })
        return
      }

      if (result.success) {
        setIsSubmitted(true)
        setFormData(initialFormData)
        setTouchedFields(new Set())
      }
      else {
        setErrors({ general: result.message || 'Failed to send message' })
      }
    }
    catch (error: any) {
      if (error.errors) {
        const fieldErrors: FormErrors = {}
        error.errors.forEach((err: any) => {
          const field = err.path[0] as keyof ContactFormData
          fieldErrors[field] = err.message
        })
        setErrors(fieldErrors)
      }
      else {
        setErrors({ general: error.message || 'An unexpected error occurred' })
      }
    }
    finally {
      setIsSubmitting(false)
    }
  }, [formData, validateField])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
    setIsSubmitted(false)
    setIsSubmitting(false)
    setTouchedFields(new Set())
  }, [])

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateField,
    submitForm,
    resetForm,
    isFormValid,
  }
}
