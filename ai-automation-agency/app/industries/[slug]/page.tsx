'use client'

import React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { industries } from '@/config/industries'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface IndustryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function IndustryPage({ params: paramsPromise }: IndustryPageProps) {
  const params = React.use(paramsPromise)
  const industry = industries.find((ind) => ind.slug === params.slug)

  if (!industry) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"
              style={{ backgroundColor: industry.color }}
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: industry.color }}>
                  ✓
                </div>
                <span className="text-sm font-medium text-primary">{industry.name}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">{industry.description}</h1>

              <p className="text-xl text-muted-foreground mb-8">{industry.shortDescription}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#contact">
                  <Button className="group h-12 px-8 text-base font-semibold">
                    Get Industry Solution
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/#industries">
                  <Button variant="outline" className="h-12 px-8 text-base font-semibold">
                    Back to Industries
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-12">Industry Challenges</h2>

              <div className="space-y-4">
                {industry.challenges.map((challenge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-lg border border-destructive/20 bg-destructive/5 flex gap-4"
                  >
                    <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{challenge}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-12">Our Solutions</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {industry.solutions.map((solution, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-lg border border-primary/20 bg-primary/5 hover:border-primary/50 transition-colors"
                  >
                    <Zap className="w-8 h-8 text-primary mb-4" />
                    <p className="text-foreground font-semibold">{solution}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-12">Key Benefits for {industry.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: industry.color }}>
                    50%+
                  </div>
                  <p className="text-muted-foreground">Cost Reduction</p>
                </div>

                <div className="p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: industry.color }}>
                    80%+
                  </div>
                  <p className="text-muted-foreground">Efficiency Gain</p>
                </div>

                <div className="p-6 rounded-lg border border-border text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: industry.color }}>
                    90%+
                  </div>
                  <p className="text-muted-foreground">Accuracy Rate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-6">Transform {industry.name} Today</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join leading {industry.name} companies leveraging AI automation to drive growth and efficiency.
              </p>

              <Link href="#contact">
                <Button size="lg" className="group h-12 px-8 text-base font-semibold">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
