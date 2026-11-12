import { z } from 'zod'
import { siteConfig } from '@/config/site'

const consultationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  company: z.string().trim().max(150),
  service: z.enum([
    'Customer Support',
    'Document',
    'Workflow',
    'Analytics',
    'RPA',
    'Custom',
  ]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum([
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
  ]),
  message: z.string().trim().max(2000),
  website: z.string().max(200),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request. Please try again.' }, { status: 400 })
  }

  const parsed = consultationSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: 'Please complete the required fields and try again.' },
      { status: 400 }
    )
  }

  if (parsed.data.website) {
    return Response.json({ error: 'Unable to submit this request.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  if (!apiKey || !from) {
    console.error('Consultation email delivery is not configured.')
    return Response.json(
      { error: 'Email is temporarily unavailable. Please try again later.' },
      { status: 503 }
    )
  }

  const { name, email, phone, company, service, date, time, message } = parsed.data
  const text = [
    'New consultation request',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Company: ${company || 'Not provided'}`,
    `Interested service: ${service}`,
    `Preferred date: ${date}`,
    `Preferred time: ${time}`,
    '',
    'Message:',
    message || 'No message provided',
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
        subject: 'New consultation request',
        text,
      }),
    })

    if (!response.ok) {
      console.error('Consultation email provider rejected the request.', {
        status: response.status,
      })
      return Response.json(
        { error: 'We could not send your request. Please try again shortly.' },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('Consultation email provider could not be reached.', error)
    return Response.json(
      { error: 'We could not send your request. Please try again shortly.' },
      { status: 502 }
    )
  }

  return Response.json({ success: true })
}
