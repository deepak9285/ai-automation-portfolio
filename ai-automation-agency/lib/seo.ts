import { Metadata } from 'next'

const baseUrl = 'https://ai-automation.agency'
const siteName = 'AI Automation Agency'

export function generateMetadata(
  title: string,
  description: string,
  path: string = '',
  ogImage?: string
): Metadata {
  const url = `${baseUrl}${path}`

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: [
      'AI automation',
      'RPA',
      'workflow automation',
      'AI solutions',
      'enterprise automation',
      title.toLowerCase(),
    ],
    authors: [{ name: 'AI Automation Agency' }],
    creator: 'AI Automation Agency',
    publisher: 'AI Automation Agency',
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: `${title} | ${siteName}`,
      description,
      siteName,
      images: [
        {
          url: ogImage || `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteName}`,
      description,
      images: [ogImage || `${baseUrl}/og-image.png`],
    },
  }
}

export function generateStructuredData(data: Record<string, any>) {
  return {
    '@context': 'https://schema.org',
    ...data,
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AI Automation Agency',
    url: baseUrl,
    description: 'Enterprise AI automation solutions for customer support, document processing, and workflow automation',
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/aiautomation',
      'https://linkedin.com/company/ai-automation',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-234-567-8900',
      contactType: 'Sales',
    },
  }
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AI Automation Agency',
    image: `${baseUrl}/logo.png`,
    description: 'Enterprise AI automation solutions',
    url: baseUrl,
    telephone: '+1-234-567-8900',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Tech Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
  }
}

export function generateServiceSchema(
  name: string,
  description: string,
  price?: string
) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'AI Automation Agency',
      url: baseUrl,
    },
    ...(price && { priceRange: price }),
  }
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
