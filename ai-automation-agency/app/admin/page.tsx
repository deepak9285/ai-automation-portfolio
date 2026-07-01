'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { motion } from 'framer-motion'
import { BarChart, BookOpen, Award, Edit, Trash2 } from 'lucide-react'
import { caseStudies } from '@/config/case-studies'
import { blogPosts } from '@/config/blog'

export default function AdminPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Admin Dashboard
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">Manage your content and track performance metrics.</p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-border bg-background"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Case Studies</p>
                    <p className="text-3xl font-bold text-primary">{caseStudies.length}</p>
                  </div>
                  <Award className="w-12 h-12 text-primary/20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-border bg-background"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Blog Posts</p>
                    <p className="text-3xl font-bold text-accent">{blogPosts.length}</p>
                  </div>
                  <BookOpen className="w-12 h-12 text-accent/20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-border bg-background"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">Total Content</p>
                    <p className="text-3xl font-bold text-secondary">{caseStudies.length + blogPosts.length}</p>
                  </div>
                  <BarChart className="w-12 h-12 text-secondary/20" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-8">Case Studies</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Industry</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Client</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseStudies.map((caseStudy) => (
                      <motion.tr
                        key={caseStudy.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-foreground">{caseStudy.title}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{caseStudy.industry.replace('-', ' ')}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{caseStudy.client}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Author</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        viewport={{ once: true }}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-foreground">{post.title}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{post.category}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{post.author}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{post.date}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
