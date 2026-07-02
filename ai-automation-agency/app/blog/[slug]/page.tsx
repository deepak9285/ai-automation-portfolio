'use client'

import React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { blogPosts } from '@/config/blog'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils-custom'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogPostPage({ params: paramsPromise }: BlogPostPageProps) {
  const params = React.use(paramsPromise)
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        {/* Article Header */}
        <article className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              {/* Back Link */}
              <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Category & Meta */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 pb-8 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime} min read</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6 mb-12">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none mb-16">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Share Section */}
              <div className="border-t border-b border-border py-6 mb-16">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-semibold">Share this article</span>
                  <div className="flex items-center gap-4">
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Share2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="p-6 rounded-lg bg-card/50 border border-border mb-16">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">
                      Expert in AI automation and business transformation with years of experience helping enterprises
                      streamline operations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold mb-12">Related Articles</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group p-6 rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <span className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Learn how our AI automation solutions can drive similar results for your organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#contact"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all inline-block"
                >
                  Get Started
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-3 border border-primary/30 text-primary rounded-lg font-semibold hover:border-primary/60 transition-all inline-block"
                >
                  Read More Articles
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
