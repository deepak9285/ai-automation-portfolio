import { z } from 'zod'
import { siteConfig } from '@/config/site'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(150),
  message: z.string().trim().min(1).max(2000),
  website: z.string().max(200),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request. Please try again.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: 'Please enter a valid name, email, and message.' },
      { status: 400 }
    )
  }

  if (parsed.data.website) {
    return Response.json({ error: 'Unable to submit this request.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  if (!apiKey || !from) {
    console.error('Contact email delivery is not configured.')
    return Response.json(
      { error: 'Email is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  const { name, email, company, message } = parsed.data
  const text = [
    'New contact message',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.contactEmail],
        reply_to: email,
        subject: `New contact message from ${name}`,
        text,
      }),
    })

    if (!response.ok) {
      console.error('Contact email provider rejected the request.', {
        status: response.status,
      })
      return Response.json(
        { error: 'We could not send your message. Please try again shortly.' },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('Contact email provider could not be reached.', error)
    return Response.json(
      { error: 'We could not send your message. Please try again shortly.' },
      { status: 502 }
    )
  }

  return Response.json({ success: true })
}
