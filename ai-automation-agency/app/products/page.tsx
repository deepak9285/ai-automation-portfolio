import Link from 'next/link'
import { ArrowRight, MessageSquareText, Phone, Quote, Sparkles, CheckCircle2 } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { products } from '@/config/products'

export const metadata = {
  title: 'AI Products | AI Automation Agency',
  description:
    'Explore AI agents for lead response, WhatsApp, follow-up, Google reviews, and voice calls.',
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

const iconMap = [MessageSquareText, Phone, Quote, Sparkles]

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Catalog / AI Products
              </p>
              <h1 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                AI Products
              </h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => {
                const Icon = iconMap[index % iconMap.length]
                const accent = product.accent || '#2bb673'

                return (
                  <article
                    id={product.slug}
                    key={product.id}
                    className="scroll-mt-24 overflow-hidden rounded-[28px] border border-border bg-card"
                    style={{ boxShadow: '0 16px 40px -24px rgba(0,0,0,0.18)' }}
                  >
                    <div className="p-5" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}>
                      <div className="mb-5 flex items-center justify-between text-[11px] font-medium text-white/90">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1.5 backdrop-blur-sm">
                          <span className="inline-block h-2 w-2 rounded-full bg-white" />
                          {product.tag || 'AI Product'}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-1 backdrop-blur-sm">
                          {product.category || 'Automation'}
                        </span>
                      </div>

                      <div className="rounded-[22px] bg-white/10 p-4 backdrop-blur-sm">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-inner">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90">
                            {product.billingPeriod}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {product.highlights.slice(0, 3).map((highlight, idx) => (
                            <div key={highlight} className="flex items-center gap-2 text-sm text-white/90">
                              <span
                                className={`h-2.5 w-2.5 rounded-full ${idx % 2 === 0 ? 'bg-white' : 'bg-white/70'}`}
                              />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <h2 className="text-2xl font-black tracking-[-0.05em] text-foreground">
                            {product.name}
                          </h2>
                          <p className="mt-2 text-sm text-muted-foreground">{product.tag || 'AI Agent'}</p>
                        </div>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      </div>

                      <p className="mb-4 text-sm leading-6 text-muted-foreground">{product.description}</p>

                      <div className="mb-5 flex items-end gap-2">
                        <span className="text-3xl font-black tracking-[-0.06em] text-foreground">
                          {formatPrice(product.price, product.currency)}
                        </span>
                        <span className="pb-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          / month
                        </span>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                        >
                          View details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                          href="/book-consultation"
                          className="inline-flex items-center justify-center rounded-xl border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/80"
                        >
                          Add to cart
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
