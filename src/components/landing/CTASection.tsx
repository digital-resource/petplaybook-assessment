import { motion } from 'motion/react';
import { useState } from 'react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('waitlist.submit.failed', error);
    }
  };

  return (
    <section id="get-started" className="py-0 bg-primary relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Be the First to Experience<br />The PetPlaybook App
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Join the pet owners already on the waitlist. Early access members get an exclusive offer to save in the first year.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
              />
              <button
                type="submit"
                className="bg-white text-primary font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
              >
                Get Early Access
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 max-w-md mx-auto"
            >
              <div className="text-3xl mb-2">🎉</div>
              <p className="text-primary-foreground font-bold text-lg">You're on the list!</p>
              <p className="text-primary-foreground/80 text-sm mt-1">We'll be in touch when early access opens.</p>
            </motion.div>
          )}

          <p className="text-primary-foreground/60 text-xs mt-5">
            No spam, ever. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
