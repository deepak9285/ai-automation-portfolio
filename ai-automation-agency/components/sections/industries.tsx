'use client'

import { motion } from 'framer-motion'
import { industries } from '@/config/industries'
import { DollarSign, Heart, ShoppingCart, Factory, Shield, Scale } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  ShoppingCart: <ShoppingCart className="w-8 h-8" />,
  Factory: <Factory className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Scale: <Scale className="w-8 h-8" />,
}

export function IndustriesSection() {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="industries" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI automation solutions tailored to your industry&apos;s unique challenges and opportunities.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={itemVariants}
              className="group relative rounded-lg border border-border overflow-hidden hover:border-accent/50 transition-all duration-300 cursor-pointer"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative p-6">
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 text-white transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: industry.color }}
                >
                  {iconMap[industry.icon] || <DollarSign className="w-8 h-8" />}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {industry.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4">{industry.shortDescription}</p>

                {/* Challenges */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Key Challenges:</p>
                  <ul className="space-y-1">
                    {industry.challenges.slice(0, 2).map((challenge, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                        <span className="mr-2 mt-0.5">•</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Link */}
                <Link
                  href={`/industries/${industry.slug}`}
                  className="inline-flex items-center text-accent font-semibold text-sm hover:gap-2 transition-all group/link"
                >
                  Explore
                  <span className="ml-1 transform group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
