import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

type Feature = { icon: LucideIcon | null; title: string; description: string };

const features: Feature[] = [
{
  icon: 'bolt-3' as unknown as LucideIcon,
  title: 'What scares them',
  description: "Their fears, triggers, and anxieties - so stress can be prevented before it starts."
},
{
  icon: 'heart-outline' as unknown as LucideIcon,
  title: 'What comforts them',
  description: "The routines, preferences, and familiar details that help them feel safe."
},
{
  icon: 'shield-check' as unknown as LucideIcon,
  title: 'What helps them trust',
  description: "The little things that help new caregivers earn their confidence faster.",
},
{
  icon: 'home-outline' as unknown as LucideIcon,
  title: 'What makes them feel at home',
  description: "The habits and comforts that bring familiarity wherever they go."
}];


export default function FeaturesSection() {
  return (
    <section id="your-pets-story" className="pt-10 md:pt-14 pb-8 md:pb-10 bg-muted/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center mb-16">
          
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Your Pet's Story
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            
            {' '}
            <span className="block">The most important information about your pet...</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            <p className="text-primary font-bold italic text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>lives with you, who knows them best.</p>
            <p className="text-muted-foreground text-lg mt-4">From routines and preferences to fears and comforts, PetPlaybook keeps everyone on the same page.</p>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) =>
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const }}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-md transition-shadow">
            
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                {feature.icon === null ? (
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" />
                    <path d="M12 16s-4-2.5-4-5.5a2.5 2.5 0 0 1 4-2 2.5 2.5 0 0 1 4 2c0 3-4 5.5-4 5.5z" />
                  </svg>
                ) : (feature.icon as unknown as string) === 'bolt-3' ? (
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L4 14h7l-1 8 9-12h-7l2-8z" />
                  </svg>
                ) : (feature.icon as unknown as string) === 'heart-outline' ? (
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ) : (feature.icon as unknown as string) === 'shield-check' ? (
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                ) : (feature.icon as unknown as string) === 'home-outline' ? (
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                ) : (feature.icon as unknown as string) === 'handshake' ? (
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M14 7l-5 5-2-2" />
                    <path d="M5 12H2v7h3" />
                    <path d="M19 12h3v7h-3" />
                    <path d="M5 19h14" />
                    <path d="M8.5 7.5C9.5 6 11 5 12.5 5c1.5 0 3 .5 4 1.5" />
                    <path d="M2 19c0-3.87 3.13-7 7-7h6c3.87 0 7 3.13 7 7" />
                  </svg>
                ) : (
                  <feature.icon className="w-6 h-6 text-primary" />
                )}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}