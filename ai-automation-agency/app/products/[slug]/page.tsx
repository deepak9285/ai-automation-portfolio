'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, CircleCheckBig, X } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { products } from '@/config/products'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

const roiProfiles = {
  'speed-to-lead-agent': {
    defaults: { inboundLeads: 350, averageDealValue: 50000, firstResponseTime: 30, missedCalls: 60 },
    multiplier: 1.15,
    hero: {
      title: 'What are slow leads costing you?',
      description:
        'Every minute a hot lead waits, it cools down and your team loses revenue. Enter your numbers to estimate the gap.',
    },
    card: {
      title: 'Speed to Lead AI Agent',
      description:
        'Sub-minute ad lead intake, autonomous lead qualification & calendar booking and sales team alert.',
    },
    labels: {
      inboundLeads: 'Inbound leads',
      averageDealValue: 'Average deal value',
      firstResponseTime: 'Average first response time',
      missedCalls: 'Missed calls (after hours or busy)',
    },
    ranges: {
      inboundLeads: { min: 50, max: 500, step: 10 },
      averageDealValue: { min: 5000, max: 100000, step: 5000 },
      firstResponseTime: { min: 2, max: 180, step: 1 },
      missedCalls: { min: 5, max: 300, step: 5 },
    },
    calculation: [
      'An unresponded lead loses trust quickly as response time rises beyond the first 10–15 minutes.',
      'Slow follow-up reduces conversion, especially for high-intent inbound campaigns and ad traffic.',
      'A fast agent recovers lost backlog by qualifying and booking leads before your team loses momentum.',
    ],
  },
  'whatsapp-ai-sales-support-agent': {
    defaults: { inboundLeads: 420, averageDealValue: 32000, firstResponseTime: 24, missedCalls: 90 },
    multiplier: 1.35,
    hero: {
      title: 'What are slow WhatsApp replies costing you?',
      description:
        'Customers expect replies in minutes, not hours. Delayed WhatsApp responses can quietly drain sales and support revenue every day.',
    },
    card: {
      title: 'WhatsApp AI Sales & Support Agent',
      description:
        '24/7 WhatsApp sales and support coverage with instant qualification, FAQ handling, and lead capture.',
    },
    labels: {
      inboundLeads: 'Qualified WhatsApp conversations',
      averageDealValue: 'Average sale value',
      firstResponseTime: 'Average first reply time',
      missedCalls: 'Missed chat requests',
    },
    ranges: {
      inboundLeads: { min: 50, max: 600, step: 10 },
      averageDealValue: { min: 4000, max: 80000, step: 4000 },
      firstResponseTime: { min: 2, max: 180, step: 1 },
      missedCalls: { min: 5, max: 400, step: 5 },
    },
    calculation: [
      'WhatsApp users expect a reply within minutes, not hours, so delayed answers lower trust and conversion.',
      'Missed chat conversations often become lost sales because buyers quickly move to competitors.',
      'This agent recovers revenue by answering product questions, capturing leads, and routing high-intent chats instantly.',
    ],
  },
  'inbound-ai-voice-agent': {
    defaults: { inboundLeads: 260, averageDealValue: 75000, firstResponseTime: 18, missedCalls: 45 },
    multiplier: 1.5,
    hero: {
      title: 'What are missed inbound calls costing you?',
      description:
        'Every unanswered call is a possible lost customer. Slow phone response times reduce trust and push revenue to your competitors.',
    },
    card: {
      title: 'Inbound AI Voice Agent',
      description:
        '24/7 autonomous receptionist that answers calls, qualifies intent, books appointments, and routes urgent calls.',
    },
    labels: {
      inboundLeads: 'Inbound calls per month',
      averageDealValue: 'Average booked revenue per call',
      firstResponseTime: 'Average call answer time',
      missedCalls: 'Missed inbound calls',
    },
    ranges: {
      inboundLeads: { min: 30, max: 500, step: 10 },
      averageDealValue: { min: 10000, max: 150000, step: 5000 },
      firstResponseTime: { min: 1, max: 120, step: 1 },
      missedCalls: { min: 5, max: 300, step: 5 },
    },
    calculation: [
      'Missed inbound calls often mean lost bookings because calls are the most intimate and urgent sales channel.',
      'Delayed answering increases drop-off, especially for service businesses and appointment-driven funnels.',
      'An AI receptionist converts missed opportunities into booked calls, routed calls, and faster qualification.',
    ],
  },
  'ai-quotation-follow-up-system': {
    defaults: { inboundLeads: 220, averageDealValue: 42000, firstResponseTime: 35, missedCalls: 50 },
    multiplier: 1.2,
    hero: {
      title: 'What are quote delays costing you?',
      description:
        'When quotes sit too long, buyers lose urgency and switch vendors. Delayed follow-up can quietly leave revenue on the table.',
    },
    card: {
      title: 'AI Quotation Follow-Up System',
      description:
        'Multi-stage quote follow-up with AI pricing, timing guidance, and reminder sequences that keep momentum alive.',
    },
    labels: {
      inboundLeads: 'Open quotes',
      averageDealValue: 'Average quote value',
      firstResponseTime: 'Quote response delay',
      missedCalls: 'Quotes left unfollowed',
    },
    ranges: {
      inboundLeads: { min: 20, max: 400, step: 10 },
      averageDealValue: { min: 5000, max: 90000, step: 5000 },
      firstResponseTime: { min: 2, max: 180, step: 1 },
      missedCalls: { min: 5, max: 250, step: 5 },
    },
    calculation: [
      'Delayed quote follow-ups reduce urgency, especially when buyers are comparing multiple vendors.',
      'Unfollowed quotes quietly drain revenue as prospects move to other options or forget the deal.',
      'AI reminders and price nudges recover momentum by re-engaging buyers before the quote gets stale.',
    ],
  },
  'google-review-agent': {
    defaults: { inboundLeads: 180, averageDealValue: 28000, firstResponseTime: 12, missedCalls: 30 },
    multiplier: 0.9,
    hero: {
      title: 'What are missed reviews costing you?',
      description:
        'Every missed review request is a missed trust signal, fewer high-intent leads, and weaker local visibility for your brand.',
    },
    card: {
      title: 'Google Review Agent',
      description:
        'Automated review requests, reminder flows, sentiment tracking, and AI response drafting that lifts local trust.',
    },
    labels: {
      inboundLeads: 'Happy customers',
      averageDealValue: 'Average customer value',
      firstResponseTime: 'Review request delay',
      missedCalls: 'Missed review requests',
    },
    ranges: {
      inboundLeads: { min: 20, max: 400, step: 10 },
      averageDealValue: { min: 3000, max: 60000, step: 3000 },
      firstResponseTime: { min: 1, max: 90, step: 1 },
      missedCalls: { min: 5, max: 200, step: 5 },
    },
    calculation: [
      'Review requests sent late create fewer conversions because customers lose the moment to leave feedback.',
      'Missed review prompts reduce local trust and weaken your ranking signals over time.',
      'A review agent lifts conversion by timing requests correctly, collecting more feedback, and improving social proof.',
    ],
  },
  'reputation-review-agent': {
    defaults: { inboundLeads: 210, averageDealValue: 26000, firstResponseTime: 15, missedCalls: 35 },
    multiplier: 1.0,
    hero: {
      title: 'What is poor review follow-up costing you?',
      description:
        'Slow, inconsistent review activity weakens trust, suppresses repeat bookings, and creates a costly gap in your reputation pipeline.',
    },
    card: {
      title: 'Reputation & Review Agent',
      description:
        'Review request automation, reminder cycles, sentiment tracking, and AI review responses for stronger local reputation growth.',
    },
    labels: {
      inboundLeads: 'Review requests sent',
      averageDealValue: 'Avg. customer lifetime value',
      firstResponseTime: 'Response turnaround',
      missedCalls: 'Missed review prompts',
    },
    ranges: {
      inboundLeads: { min: 30, max: 450, step: 10 },
      averageDealValue: { min: 4000, max: 80000, step: 4000 },
      firstResponseTime: { min: 1, max: 120, step: 1 },
      missedCalls: { min: 5, max: 220, step: 5 },
    },
    calculation: [
      'A slow review cadence reduces trust, weakens reputation signals, and lowers repeat-booking confidence.',
      'Missed follow-up requests quietly shrink your local discovery and customer advocacy momentum.',
      'This flow recovers lost trust by automating review asks, reminders, and customer response workflows.',
    ],
  },
}

const defaultRoiProfile = roiProfiles['speed-to-lead-agent']

export default function ProductPage({ params: paramsPromise }: ProductPageProps) {
  const params = React.use(paramsPromise)
  const product = products.find((item) => item.slug === params.slug)
  const roiProfile = product ? roiProfiles[product.slug as keyof typeof roiProfiles] || defaultRoiProfile : defaultRoiProfile

  const [roiInputs, setRoiInputs] = useState({
    ...defaultRoiProfile.defaults,
  })

  useEffect(() => {
    setRoiInputs({ ...roiProfile.defaults })
  }, [roiProfile])

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: product?.currency || 'INR',
      maximumFractionDigits: 0,
    }).format(value)

  const roiStats = useMemo(() => {
    const leads = Math.max(roiInputs.inboundLeads, 1)
    const dealValue = Math.max(roiInputs.averageDealValue, 1)
    const responseTime = Math.max(roiInputs.firstResponseTime, 1)
    const missed = Math.max(roiInputs.missedCalls, 0)
    const multiplier = roiProfile.multiplier

    const responseLeakRate = 0.004 + (responseTime / 180) * 0.008 * multiplier
    const missedLeakRate = (missed / leads) * 0.014 * multiplier
    const leakRate = Math.min(0.12, responseLeakRate + missedLeakRate)
    const revenueLostPerMonth = Math.round(leads * dealValue * (0.006 + leakRate))
    const annualLeak = revenueLostPerMonth * 12
    const lostDealsPerMonth = Math.max(1.2, revenueLostPerMonth / (dealValue * 0.7))
    const paybackDays = Math.max(2, Math.min(12, Math.ceil((product?.price || 1999) / (revenueLostPerMonth / 30))))

    return {
      revenueLostPerMonth,
      annualLeak,
      lostDealsPerMonth,
      paybackDays,
    }
  }, [product?.price, roiInputs, roiProfile.multiplier])

  if (!product) {
    notFound()
  }

  const accent = product.accent || '#2563eb'

  const updateRoiInput = (key: keyof typeof roiInputs, value: number) => {
    setRoiInputs((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-4 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-foreground">
              Catalog
            </Link>
            <span className="mx-2">/</span>
            <span>{product.tag || 'AI Product'}</span>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-sm">
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-8 lg:px-10 lg:py-10">
              <div className="flex flex-col justify-center">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm">
                  <span
                    className="inline-flex h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  {product.tag || product.name}
                </div>

                <h1 className="max-w-xl text-4xl font-black leading-[0.95] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-[4rem]">
                  {product.name}
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">
                    {product.highlights[0]}
                  </span>
                  <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">
                    {product.highlights[1] || 'Smart automation'}
                  </span>
                  <span className="rounded-full border border-border bg-muted/50 px-3 py-1.5">
                    {product.highlights[2] || 'Business growth'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div
                  className="relative w-full max-w-[540px] rounded-[26px] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
                >
                  <div className="rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                    <div className="mb-4 flex items-center justify-between text-sm text-white/90">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                        {product.category || 'AI Product'}
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1.5 font-medium">
                        {product.tag || 'AI Agent'}
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-[20px] bg-white p-4 shadow-xl">
                      <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-100 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-slate-700 shadow-sm">
                          {product.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="h-2.5 w-20 rounded-full bg-slate-200" />
                          <div className="mt-2 h-2 w-14 rounded-full bg-slate-200" />
                        </div>
                        <div className="rounded-full border border-emerald-200 bg-emerald-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-emerald-700">
                          Live
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          'How can I help today?',
                          'I can qualify leads, answer FAQs, and book a call.',
                          'Let me route you to the right team.',
                        ].map((line, index) => (
                          <div
                            key={line}
                            className={`flex ${index === 0 ? 'justify-start' : index === 1 ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                                index === 1
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {line}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 rounded-2xl border border-border bg-muted/50 p-4 md:grid-cols-3">
            <div className="rounded-xl bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Response Time</p>
              <p className="mt-2 text-lg font-semibold text-foreground">Instant 2-second reply</p>
            </div>
            <div className="rounded-xl bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Use Case</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{product.category || 'Sales'}</p>
            </div>
            <div className="rounded-xl bg-white/80 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Retention Potential</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: product.currency,
                  maximumFractionDigits: 0,
                }).format(product.price)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">/ month</span>
              </p>
            </div>
          </div>
        </section>

        <section id="roi-calculator" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-2">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-foreground shadow-sm">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                ROI calculator
              </div>
              <h2 className="max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.07em] text-foreground xl:text-[5rem]">
                {roiProfile.hero.title}
              </h2>
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                {roiProfile.hero.description}
              </p>

              <div className="mt-8 space-y-6 rounded-[24px] border border-border bg-card p-5 sm:p-6">
                {[
                  {
                    label: roiProfile.labels.inboundLeads,
                    key: 'inboundLeads',
                    value: roiInputs.inboundLeads,
                    min: roiProfile.ranges.inboundLeads.min,
                    max: roiProfile.ranges.inboundLeads.max,
                    step: roiProfile.ranges.inboundLeads.step,
                  },
                  {
                    label: roiProfile.labels.averageDealValue,
                    key: 'averageDealValue',
                    value: roiInputs.averageDealValue,
                    min: roiProfile.ranges.averageDealValue.min,
                    max: roiProfile.ranges.averageDealValue.max,
                    step: roiProfile.ranges.averageDealValue.step,
                  },
                  {
                    label: roiProfile.labels.firstResponseTime,
                    key: 'firstResponseTime',
                    value: roiInputs.firstResponseTime,
                    min: roiProfile.ranges.firstResponseTime.min,
                    max: roiProfile.ranges.firstResponseTime.max,
                    step: roiProfile.ranges.firstResponseTime.step,
                  },
                  {
                    label: roiProfile.labels.missedCalls,
                    key: 'missedCalls',
                    value: roiInputs.missedCalls,
                    min: roiProfile.ranges.missedCalls.min,
                    max: roiProfile.ranges.missedCalls.max,
                    step: roiProfile.ranges.missedCalls.step,
                  },
                ].map((slider) => (
                  <div key={slider.key} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm text-foreground">
                      <span>{slider.label}</span>
                      <span className="font-semibold text-foreground">
                        {slider.key === 'averageDealValue'
                          ? formatCurrency(slider.value)
                          : slider.key === 'firstResponseTime'
                            ? `${slider.value} minutes`
                            : `${slider.value}`}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        aria-label={slider.label}
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={slider.value}
                        onChange={(event) => updateRoiInput(slider.key, Number(event.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-500"
                        style={{ accentColor: '#22c55e' }}
                      />
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{slider.min}</span>
                        <span>{slider.max}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[28px] border border-border bg-[#111111] p-5 text-white shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/60">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Estimated revenue leakage
                  </div>
                </div>

                <div className="mb-4 text-5xl font-black tracking-[-0.07em] text-emerald-400">
                  {formatCurrency(roiStats.revenueLostPerMonth)}
                  <span className="ml-2 text-lg font-medium tracking-normal text-white/70">/ month</span>
                </div>

                <p className="mb-6 text-sm text-white/80">
                  About {formatCurrency(roiStats.annualLeak)} a year, or{' '}
                  {formatCurrency(roiStats.revenueLostPerMonth * 1.5)} a month currently leaking.
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm text-white/80">
                  <div>
                    <span className="block text-white/60">Deals lost now</span>
                    <span className="mt-2 block text-2xl font-bold text-white">
                      ~{roiStats.lostDealsPerMonth.toFixed(1)} / month
                    </span>
                  </div>
                  <div>
                    <span className="block text-white/60">Pays for itself in</span>
                    <span className="mt-2 block text-2xl font-bold text-white">
                      {roiStats.paybackDays} days
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-border bg-[#f8f7f2] p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.25)]">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#ff6b57] text-lg font-bold text-white shadow-inner">
                      ✦
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Best match for your biggest lead
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black">
                    4.2
                  </span>
                </div>

                <div className="mb-5 rounded-[18px] bg-[#ff6b57] p-4">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-[#f2d2cb] bg-white/90 shadow-xl">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">00:12</div>
                      <div className="mt-2 h-8 w-8 rounded-full border-2 border-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <p className="text-2xl font-black tracking-[-0.05em] text-foreground">
                    {roiProfile.card.title}
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {roiProfile.card.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="text-3xl font-black tracking-[-0.06em] text-foreground">
                    {formatCurrency(product.price)}
                  </div>
                  <div className="flex gap-2">
                    <Button className="rounded-xl border border-emerald-500 bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600">
                      In your cart
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-border bg-card p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">How this is calculated</h3>
                  <button type="button" className="rounded-full border border-border p-1 text-muted-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                  {roiProfile.calculation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <div className="mb-6 flex flex-wrap gap-2 border-b border-border pb-4 text-sm font-medium text-muted-foreground">
                {['Overview', 'Requirements', 'What’s included', 'Setup', 'FAQ'].map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={`rounded-full px-3 py-2 ${index === 0 ? 'bg-foreground text-background' : 'bg-muted/60'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">Overview</h2>
                  <p className="text-base leading-8 text-muted-foreground">
                    {product.description} Built to help your team respond faster, increase conversion,
                    and turn more inquiries into booked conversations without manual effort.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold">What it does</h3>
                  <ul className="space-y-3">
                    {[
                      'Automates sales and support conversations across WhatsApp, web chat, and email.',
                      'Qualifies leads based on your business rules and route only high-intent prospects.',
                      'Collects data, follows up automatically, and sends real-time alerts to your team.',
                      'Works around the clock to reduce response delay and improve conversion.'
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="rounded-[28px] border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 text-right text-4xl font-black tracking-[-0.06em] text-foreground">
              {formatCurrency(product.price)}
              </div>

              <div className="space-y-3">
                <Button className="h-12 w-full rounded-xl bg-foreground text-background hover:opacity-90">
                  Sign in to buy
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl border-emerald-500 bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Add to cart
                </Button>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                <div className="mb-3 flex items-center justify-between">
                  <span>Version</span>
                  <span className="font-medium text-foreground">v1.0.5</span>
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <span>Updated</span>
                  <span className="font-medium text-foreground">01 Nov 2025</span>
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <span>Delivered</span>
                  <span className="font-medium text-foreground">Setup + training</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Typical client retainer</span>
                  <span className="font-medium text-foreground">{formatCurrency(product.price / 2)} - {formatCurrency(product.price)}</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CircleCheckBig className="h-4 w-4" />
            </span>
            <span>
              Runs in your own accounts. The scenarios run in your Make.com workspace with your own API
              keys. Team members can use your own accounts in your favorite tools.
            </span>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
