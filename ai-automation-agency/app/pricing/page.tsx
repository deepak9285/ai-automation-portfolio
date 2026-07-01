'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, X } from 'lucide-react'
import { pricingPlans } from '@/config/pricing'
import Link from 'next/link'
import { motion } from 'framer-motion'

const features = [
  'Custom automation workflows',
  'API access',
  'Dedicated support',
  'Monthly strategy calls',
  'Performance analytics',
  'Custom integrations',
  'SLA guarantee',
  'Priority implementation',
  'Team training',
  'Advanced reporting',
  'White-label option',
  'Custom branding',
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Simple, Transparent{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose the perfect plan for your business. Scale as you grow.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:bg-muted'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:bg-muted'
              }`}
            >
              Annual
              <span className="text-sm text-green-400 ml-2">Save 20%</span>
            </button>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-2xl border transition-all ${
                  tier.name === 'Professional'
                    ? 'border-primary bg-gradient-to-br from-primary/10 to-transparent shadow-lg scale-105'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="p-8">
                  {tier.name === 'Professional' && (
                    <div className="mb-4 inline-block bg-gradient-to-r from-primary to-accent px-3 py-1 rounded-full text-sm font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      ${billingPeriod === 'monthly' ? tier.price : Math.floor(tier.price * 12 * 0.8)}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  <Link href="/contact">
                    <Button
                      className="w-full mb-8"
                      variant={tier.name === 'Professional' ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>

                  <div className="space-y-4">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Feature Comparison</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what&apos;s included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  {pricingPlans.map((tier) => (
                    <th key={tier.name} className="text-center py-4 px-4 font-semibold">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature} className="border-b border-border">
                    <td className="py-4 px-4">{feature}</td>
                    {pricingPlans.map((tier) => (
                      <td key={tier.name} className="text-center py-4 px-4">
                        {tier.features.includes(feature) ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Not sure which plan is right for you?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a free consultation with our team to find the perfect solution for your business.
            </p>
            <Link href="/contact">
              <Button size="lg">Schedule Consultation</Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
