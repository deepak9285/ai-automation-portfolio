'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react'

const availableSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
]

export default function BookConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    date: '',
    time: '',
    message: '',
    website: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.time) {
      setSubmitError('Please select a preferred consultation time.')
      return
    }

    setIsSubmitting(true)
    setSubmitted(false)
    setSubmitError('')

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null)
        const error =
          typeof result === 'object' &&
          result !== null &&
          'error' in result &&
          typeof result.error === 'string'
            ? result.error
            : `The request failed (HTTP ${response.status}). Please try again.`
        setSubmitError(error)
        return
      }

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        date: '',
        time: '',
        message: '',
        website: '',
      })
    } catch {
      setSubmitError('Unable to connect. Please check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Book Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Free Consultation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Meet with our AI automation experts to discuss your business needs and explore how we can
              help transform your operations.
            </p>
          </motion.div>
        </section>

        {/* Booking Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-card rounded-2xl border border-border p-8"
              >
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium mb-2">Interested Service *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select a service</option>
                    <option value="Customer Support">Customer Support Automation</option>
                    <option value="Document">Document Processing</option>
                    <option value="Workflow">Workflow Automation</option>
                    <option value="Analytics">Predictive Analytics</option>
                    <option value="RPA">RPA Solutions</option>
                    <option value="Custom">Custom AI Solutions</option>
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>

                {/* Time */}
                {formData.date && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Time *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, time: slot })}
                          className={`py-2 rounded-lg border transition-all ${
                            formData.time === slot
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-input hover:border-primary/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {!formData.time && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Select a preferred time to continue.
                      </p>
                    )}
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tell us about your needs</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your business challenges..."
                      rows={4}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? 'Sending...'
                    : submitted
                      ? 'Request Sent!'
                      : 'Schedule Consultation'}
                </Button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-sm"
                  >
                    Thank you! We&apos;ll contact you shortly to confirm your consultation.
                  </motion.div>
                )}
                {submitError && (
                  <div
                    role="alert"
                    className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
                  >
                    {submitError}
                  </div>
                )}
              </motion.form>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Duration Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Consultation Duration</h3>
                    <p className="text-sm text-muted-foreground">30 minutes - Free</p>
                  </div>
                </div>
              </motion.div>

              {/* What to Expect */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-semibold mb-4">What to Expect</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Assessment of your current processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Discussion of your automation goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Custom solution recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>ROI potential analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Next steps and implementation timeline</span>
                  </li>
                </ul>
              </motion.div>

              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-6"
              >
                <h3 className="font-semibold mb-4">Prefer to call?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Reach out to our team directly:
                </p>
                <a href="tel:+1234567890" className="text-primary font-semibold hover:underline">
                  +1 (234) 567-8900
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
