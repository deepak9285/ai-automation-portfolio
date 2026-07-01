import { CaseStudy } from '@/types'

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Global Bank Reduces Loan Processing Time by 75%',
    slug: 'global-bank-loan-processing',
    industry: 'financial-services',
    service: 'workflow-automation',
    client: 'TechBank International',
    challenge:
      'Manual loan processing took 10-15 days, causing customer frustration and lost business to competitors.',
    solution:
      'Implemented AI-powered workflow automation to extract documents, verify information, and route applications automatically.',
    results: [
      { metric: 'Processing Time', value: '75% Faster', icon: 'Zap' },
      { metric: 'Customer Approval Rate', value: '+45%', icon: 'TrendingUp' },
      { metric: 'Cost Reduction', value: '$2.3M/year', icon: 'DollarSign' },
    ],
    testimonial: {
      text: "The AI automation solution transformed our lending process. We're now closing loans in 2-3 days instead of 2 weeks, significantly improving customer satisfaction.",
      author: 'Sarah Chen',
      title: 'VP of Operations',
      company: 'TechBank International',
    },
    image: '/case-studies/bank.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Healthcare Provider Cuts Administrative Costs by 60%',
    slug: 'healthcare-admin-costs',
    industry: 'healthcare',
    service: 'document-processing',
    client: 'MediCare Systems',
    challenge:
      'Thousands of patient forms processed manually daily, with errors causing billing delays and regulatory compliance issues.',
    solution:
      'Deployed intelligent OCR and document processing to automatically extract, classify, and validate patient information.',
    results: [
      { metric: 'Processing Error Rate', value: '99% Reduction', icon: 'CheckCircle' },
      { metric: 'Staff Efficiency', value: '+85%', icon: 'Zap' },
      { metric: 'Regulatory Compliance', value: '100%', icon: 'Shield' },
    ],
    testimonial: {
      text: 'This solution was a game-changer for our billing department. We eliminated thousands of manual hours and reduced errors dramatically.',
      author: 'Dr. James Mitchell',
      title: 'Chief Operating Officer',
      company: 'MediCare Systems',
    },
    image: '/case-studies/healthcare.jpg',
    featured: true,
  },
  {
    id: '3',
    title: 'E-commerce Platform Increases Conversion by 40%',
    slug: 'ecommerce-conversion',
    industry: 'ecommerce',
    service: 'ai-customer-support',
    client: 'RetailHub Commerce',
    challenge:
      'High cart abandonment rates and slow customer support response times during peak hours causing revenue loss.',
    solution:
      'Implemented AI chatbots for instant customer support and personalized product recommendations to reduce friction.',
    results: [
      { metric: 'Conversion Rate', value: '+40%', icon: 'TrendingUp' },
      { metric: 'Support Response Time', value: '<30s', icon: 'Zap' },
      { metric: 'Revenue Growth', value: '+$5.2M', icon: 'DollarSign' },
    ],
    testimonial: {
      text: 'The AI customer support system answered 85% of inquiries automatically, and customers loved the instant responses. Our conversion increased significantly.',
      author: 'Alex Rodriguez',
      title: 'Director of E-commerce',
      company: 'RetailHub Commerce',
    },
    image: '/case-studies/ecommerce.jpg',
  },
]
