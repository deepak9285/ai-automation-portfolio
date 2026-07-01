'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'TechCorp Inc.',
    role: 'CEO',
    content:
      'Implementing their AI automation solution reduced our customer support response time by 70%. The ROI was immediate and significant.',
    rating: 5,
    image: '👩‍💼',
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'FinanceFlow',
    role: 'Operations Director',
    content:
      'Their document processing solution eliminated 80% of manual data entry work. Our team can now focus on strategic initiatives.',
    rating: 5,
    image: '👨‍💼',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    company: 'HealthTech Solutions',
    role: 'VP Technology',
    content:
      'Exceptional service and support throughout the entire implementation. The predictive analytics have transformed our decision-making process.',
    rating: 5,
    image: '👩‍🔬',
  },
  {
    id: 4,
    name: 'David Patel',
    company: 'RetailMax',
    role: 'General Manager',
    content:
      'Outstanding results! We saw a 60% improvement in operational efficiency. The team was incredibly responsive to our needs.',
    rating: 5,
    image: '👨‍💻',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4" id="testimonials">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            See how businesses across different industries have transformed their operations with our AI automation
            solutions
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-2xl border border-border p-8 hover:border-primary/50 transition-colors group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg mb-6 text-balance leading-relaxed">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-card rounded-2xl border border-border p-8">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              150+
            </p>
            <p className="text-muted-foreground">Active Clients</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              $2.5B+
            </p>
            <p className="text-muted-foreground">Client Value Generated</p>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8">
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              4.9/5
            </p>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
