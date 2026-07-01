'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join hundreds of companies already using our AI automation solutions to reduce costs,
            improve efficiency, and accelerate growth. Get started with a free consultation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact">
              <Button size="lg" className="group h-12 px-8 text-base font-semibold">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#industries">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base font-semibold border-primary/30 hover:border-primary/60"
              >
                Explore Solutions
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-16 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left">
            <div>
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="h-12 w-px bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground">Technical Support</div>
            </div>
            <div className="h-12 w-px bg-border hidden sm:block" />
            <div>
              <div className="text-2xl font-bold text-secondary">Zero</div>
              <div className="text-sm text-muted-foreground">Setup Fees</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
