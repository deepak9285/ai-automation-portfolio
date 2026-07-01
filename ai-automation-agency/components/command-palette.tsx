'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { services as servicesData } from '@/config/services'
import { industries as industriesData } from '@/config/industries'

interface CommandItem {
  id: string
  title: string
  category: string
  description?: string
  href: string
  icon?: string
}

const commands: CommandItem[] = [
  {
    id: 'home',
    title: 'Home',
    category: 'Navigation',
    href: '/',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    category: 'Navigation',
    href: '/pricing',
  },
  {
    id: 'blog',
    title: 'Blog',
    category: 'Navigation',
    href: '/blog',
  },
  {
    id: 'contact',
    title: 'Contact',
    category: 'Navigation',
    href: '/contact',
  },
  {
    id: 'booking',
    title: 'Book Consultation',
    category: 'Navigation',
    href: '/book-consultation',
  },
  ...servicesData.map((service) => ({
    id: `service-${service.slug}`,
    title: service.name,
    category: 'Services',
    description: service.shortDescription,
    href: `/services/${service.slug}`,
  })),
  ...industriesData.map((industry) => ({
    id: `industry-${industry.slug}`,
    title: industry.name,
    category: 'Industries',
    description: industry.description.substring(0, 60) + '...',
    href: `/industries/${industry.slug}`,
  })),
]

export function CommandPalette() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSelect = (href: string) => {
    router.push(href)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <>
      {/* Command Palette Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-sm"
      >
        <Search className="w-4 h-4" />
        <span>Cmd K</span>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-card rounded-2xl border border-border shadow-xl"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search commands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder-muted-foreground"
                />
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No commands found
                  </div>
                ) : (
                  <>
                    {Array.from(new Set(filtered.map((cmd) => cmd.category))).map((category) => (
                      <div key={category}>
                        <div className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {category}
                        </div>
                        {filtered
                          .filter((cmd) => cmd.category === category)
                          .map((cmd) => (
                            <button
                              key={cmd.id}
                              onClick={() => handleSelect(cmd.href)}
                              className="w-full px-6 py-3 flex items-between justify-between hover:bg-muted transition-colors text-left"
                            >
                              <div>
                                <div className="font-medium">{cmd.title}</div>
                                {cmd.description && (
                                  <div className="text-sm text-muted-foreground">{cmd.description}</div>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </button>
                          ))}
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-border text-xs text-muted-foreground">
                <span>Search all pages and services</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
