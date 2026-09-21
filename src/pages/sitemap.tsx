import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';

const pages = [
  { label: 'Home', href: '/', description: 'Welcome to PetPlaybook.ai' },
  { label: 'About Us', href: '/about', description: 'Our founder story and mission' },
  { label: 'Contact', href: '/contact', description: 'Get in touch with the PetPlaybook team' },
  { label: 'Privacy Policy', href: '/privacy', description: 'How we handle your data' },
  { label: 'Terms of Service', href: '/terms', description: 'Rules and guidelines for using our site' },
];

export default function SitemapPage() {
  return (
    <>
      <Helmet>
        <title>Sitemap - PetPlaybook.ai</title>
        <meta name="description" content="All pages on PetPlaybook.ai" />
        <link rel="canonical" href="https://petplaybook.ai/sitemap" />
      </Helmet>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Navigation
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Sitemap
            </h1>
            <p className="text-muted-foreground text-sm mb-10">All pages on PetPlaybook.ai</p>

            <ul className="space-y-4">
              {pages.map((page, i) => (
                <motion.li
                  key={page.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' as const }}
                >
                  <a
                    href={page.href}
                    className="flex items-start gap-4 p-4 rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all group"
                  >
                    <div className="mt-0.5 w-2 h-2 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {page.label}
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">{page.description}</p>
                      <p className="text-xs text-primary/60 mt-1">petplaybook.ai{page.href}</p>
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
