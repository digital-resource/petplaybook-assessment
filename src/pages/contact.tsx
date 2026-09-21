import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - PetPlaybook.ai</title>
        <meta name="description" content="Get in touch with the PetPlaybook.ai team." />
      </Helmet>

      <section className="min-h-[80vh] bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              Contact Us
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              We'd love to hear from you.
            </h1>
            <p className="text-muted-foreground text-lg mb-10">
              PetPlaybook was created to help the people who care for pets stay connected through the information that matters most&mdash;because every pet deserves to be understood.
              <br /><br />
              Whether you have a question, idea, feedback, or partnership opportunity, we&apos;d love to hear from you. Every conversation helps us create a future where pets receive more consistent, personalized care.
              <br /><br />
              Send us a message&mdash;we&apos;d love to connect.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="w-full px-5 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full px-5 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind…"
                    className="w-full px-5 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
                  />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 rounded-2xl px-8 py-10 text-center"
              >
                <p className="text-2xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Message sent! ♡</p>
                <p className="text-muted-foreground text-sm">Thanks for reaching out. We'll get back to you soon.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
