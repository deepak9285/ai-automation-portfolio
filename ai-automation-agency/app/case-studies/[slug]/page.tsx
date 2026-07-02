'use client'

import React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { caseStudies } from '@/config/case-studies'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  DollarSign: <DollarSign className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  CheckCircle: <Zap className="w-8 h-8" />,
  Shield: <Zap className="w-8 h-8" />,
}

export default function CaseStudyPage({ params: paramsPromise }: CaseStudyPageProps) {
  const params = React.use(paramsPromise)
  const caseStudy = caseStudies.find((cs) => cs.slug === params.slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-xs font-semibold text-primary uppercase">Case Study</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">{caseStudy.title}</h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">{caseStudy.challenge}</p>

              <Link href="#results">
                <Button className="group h-12 px-8 text-base font-semibold">
                  View Results
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-12">Measurable Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {caseStudy.results.map((result, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-lg border border-primary/20 bg-primary/5 text-center hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{result.value}</div>
                    <p className="text-muted-foreground">{result.metric}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Challenge & Solution Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Challenge */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold mb-6">The Challenge</h3>
                <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
              </motion.div>

              {/* Solution */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-bold mb-6">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <div className="p-8 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <div className="mb-6 text-4xl">{"'"}</div>
                <p className="text-lg text-foreground mb-8 leading-relaxed italic">{caseStudy.testimonial.text}</p>

                <div className="flex items-center gap-4 pt-6 border-t border-primary/10">
                  <div>
                    <div className="font-semibold text-foreground">{caseStudy.testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{caseStudy.testimonial.title}</div>
                    <div className="text-sm text-muted-foreground font-medium">{caseStudy.testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-6">Ready for Similar Results?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover how we can deliver similar transformations for your organization.
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
