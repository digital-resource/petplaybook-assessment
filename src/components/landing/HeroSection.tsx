import { motion } from 'motion/react';
import { useState } from 'react';

export default function HeroSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error('waitlist.submit.failed', error);
    }
  };

  const emailForm =
  <div className="flex flex-col gap-4">
      {!submitted ?
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className="flex-1 px-5 py-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm" />
      
          <button
        type="submit"
        className="bg-primary text-primary-foreground font-bold px-7 py-4 rounded-full hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
        
            Get Early Access
          </button>
        </form> :

    <p className="text-primary font-semibold text-sm">You're on the list! We'll be in touch soon.</p>
    }
    </div>;


  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-0 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 w-full">

        {/* ── MOBILE layout (flex column) ── */}
        <div className="flex flex-col gap-8 md:hidden">
          {/* 1. Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-4xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>
            
            Nobody knows your pet <span className="text-primary">like you do.</span>
          </motion.h1>

          {/* 2. Body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' as const }}
            className="text-lg text-muted-foreground leading-relaxed">
            
            <p>The routines. The fears. The comforts. The little things that make your pet feel safe.{' '}
            <em className="text-primary font-bold">They live in your head.</em></p>
            <p className="mt-4">The PetPlaybook App helps caregivers understand your pet's routines, preferences, needs, and personality - so every caregiver can provide the care, comfort, and consistency your pet deserves.</p>
          </motion.div>

          {/* 3. Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
            className="relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="/airo-assets/images/components/landing-herosection/happy-pet-owner-cuddling-her-puppy"
                alt="Happy pet owner cuddling her puppy"
                width={800}
                height={1000}
                fetchPriority="high"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>
          </motion.div>

          {/* 4. Email form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' as const }}>
            {emailForm}
          </motion.div>
        </div>

        {/* ── DESKTOP layout (two columns) ── */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
          {/* Left: text + form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}>
            
            <h1
              className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)', color: '#000000' }}>
              Nobody knows your pet <span className="text-primary">like you do.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-lg">
              The routines. The fears. The comforts. The little things that make your pet feel safe.{' '}
              <em className="text-primary font-bold">They live in your head.</em>
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              The PetPlaybook App helps caregivers understand your pet's routines, preferences, needs, and personality - so every caregiver can provide the care, comfort, and consistency your pet deserves.
            </p>
            {emailForm}
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
            className="relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src="/assets/petplaybook-juno-owner.jpg"
                alt="Happy pet owner cuddling her puppy"
                width={800}
                height={1000}
                fetchPriority="high"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>);

}