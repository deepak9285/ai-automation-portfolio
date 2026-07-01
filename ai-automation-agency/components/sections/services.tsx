'use client'

import { motion } from 'framer-motion'
import { services } from '@/config/services'
import { Zap, MessageCircle, FileText, TrendingUp, Cpu, Sparkles } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-8 h-8" />,
  FileText: <FileText className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Sparkles: <Sparkles className="w-8 h-8" />,
}

export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our AI Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI automation solutions designed to streamline your business operations
            and drive measurable results.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-6 sm:p-8">
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 text-white transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: service.color }}
                >
                  {iconMap[service.icon] || <Sparkles className="w-8 h-8" />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{service.shortDescription}</p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ backgroundColor: service.color }} />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all group/link"
                >
                  Learn More
                  <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* Bottom border accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
