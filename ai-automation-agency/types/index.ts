export interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  icon: string
  benefits: string[]
  features: string[]
  useCases: string[]
  image: string
  color: string
  details?: {
    overview: string
    process: string[]
    roi: string
  }
}

export interface Industry {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  icon: string
  challenges: string[]
  solutions: string[]
  image: string
  color: string
  caseStudyCount?: number
}

export interface CaseStudy {
  id: string
  title: string
  slug: string
  industry: string
  service: string
  client: string
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    icon: string
  }[]
  testimonial: {
    text: string
    author: string
    title: string
    company: string
    image?: string
  }
  image: string
  featured?: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  readTime: number
  image: string
  tags: string[]
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  billingPeriod: 'monthly' | 'yearly'
  description: string
  features: string[]
  cta: string
  popular?: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  currency: string
  billingPeriod: string
  image: string
  highlights: string[]
  tag?: string
  category?: string
  accent?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string
  social?: {
    twitter?: string
    linkedin?: string
    email?: string
  }
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface SiteConfig {
  siteName: string
  siteDescription: string
  siteUrl: string
  logo: string
  favicon: string
  contactEmail: string
  phone: string
  address: string
  socialLinks: {
    twitter?: string
    linkedin?: string
    facebook?: string
    instagram?: string
    github?: string
  }
}
