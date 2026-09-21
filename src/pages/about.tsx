import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - PetPlaybook.ai</title>
        <meta name="description" content="Learn about PetPlaybook.ai and our mission to help pet owners share everything that matters about their pets." />
        <link rel="canonical" href="https://petplaybook.ai/about" />
      </Helmet>

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              About Us
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Built by a Pet Lover. Inspired by Thousands of Pets.
            </h1>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>PetPlaybook was born from a simple truth:</p>

              <p className="text-foreground font-semibold italic" style={{ fontFamily: 'var(--font-heading)' }}>
                Nobody knows your pet like you do.
              </p>

              <p>
                The routines. The fears. The favorite toy. The words they recognize. The things that comfort them when they're anxious. The little details that make them feel safe, understood, and at home.
              </p>

              <p>Yet most of that information exists nowhere except in the minds of the people who love them.</p>

              <p>
                For more than 15 years, I had the privilege of working alongside thousands of pet owners and veterinary hospitals. During that time, I saw an important gap over and over again.
              </p>

              <p>
                When a pet changes hands&mdash;whether it's a pet sitter, boarding facility, groomer, trainer, veterinary team, friend, or family member&mdash;the information that matters most often gets lost.
              </p>

              <p>Medical records tell part of the story.</p>

              <p>But they rarely tell you that a dog is terrified of thunderstorms.</p>
              <p>That she sleeps best with a blanket over her head.</p>
              <p>That she won't eat from a metal bowl.</p>
              <p>That she needs five quiet minutes before she'll trust someone new.</p>

              <p>Those details matter.</p>

              <p>
                And for many pets, they can make the difference between feeling stressed and feeling safe.
              </p>

              <p>
                When I brought home my puppy, Juno, I experienced this firsthand. Every time someone cared for her, I found myself repeating the same instructions, routines, preferences, and warnings, hoping I hadn't forgotten something important.
              </p>

              <p>That's when everything clicked.</p>

              <p>Pets spend their lives communicating with us.</p>

              <p>They tell us what they love, what scares them, what comforts them, and what they need.</p>

              <p>But when care changes hands, their voice often disappears.</p>

              <p className="text-foreground font-semibold italic" style={{ fontFamily: 'var(--font-heading)' }}>
                PetPlaybook was created to preserve that voice.
              </p>

              <p>Our mission is simple:</p>

              <p className="text-foreground font-medium italic" style={{ fontFamily: 'var(--font-heading)' }}>
                To help every pet be better understood.
              </p>

              <p>
                To capture the knowledge we gain throughout a pet's lifetime and make it easy to share with the people entrusted to care for them.
              </p>

              <p>
                Because when communication improves, everyone benefits&mdash;but most importantly, the pet benefits.
              </p>

              <p>
                Whether you're leaving your pet with a sitter for a weekend, boarding them for a vacation, visiting a new veterinarian, or simply preparing for an emergency, PetPlaybook helps ensure the people caring for your pet have the information they need to make them feel safe, comfortable, and understood.
              </p>

              <div className="border-l-4 border-primary pl-6 py-2 space-y-1">
                <p className="text-foreground font-medium italic" style={{ fontFamily: 'var(--font-heading)' }}>
                  Because they can't tell us themselves.
                </p>
                <p className="text-foreground font-medium italic" style={{ fontFamily: 'var(--font-heading)' }}>
                  But you can.
                </p>
                <p className="text-foreground font-medium">&#9825;</p>
              </div>

              <p>
                Michelle Rosen<br />
                <span className="text-sm">Founder, PetPlaybook</span>
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/#get-started"
                className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity text-sm text-center"
              >
                Get Early Access
              </a>
              <a
                href="/contact"
                className="border border-border text-foreground font-semibold px-8 py-4 rounded-full hover:bg-muted transition-colors text-sm text-center"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
