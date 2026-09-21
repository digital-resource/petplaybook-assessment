import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: "Create Your Pet's Profile",
    description:
      "Answer simple questions about your pet - their routines, fears, comforts, quirks, and everything in between. The PetPlaybook App uses our proprietary AI Agent to guide you through capturing what matters most.",
  },
  {
    number: '02',
    title: 'Build Their Playbook',
    description:
      "Your answers are organized into a clear, easy-to-read playbook that anyone caring for your pet can understand at a glance - no guesswork, no starting from zero.",
  },
  {
    number: '03',
    title: 'Share With Caregivers',
    description:
      "Send your pet's playbook to sitters, boarders, vets, groomers, family members, or anyone caring for your pet. Caregivers can access your pet's information instantly - no login, no account, and never a fee.",
  },
  {
    number: '04',
    title: 'Update Anytime',
    description:
      "Pets change as they grow, age, and experience life - and their playbook should too. Update your pet's profile whenever routines, health needs, preferences, or behaviors evolve. Because better understanding leads to better care.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-background py-20 md:pt-28 md:pb-10">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            How It Works
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Simple steps to give your pet a voice.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            The PetPlaybook App makes it easy to capture what you know about your pet — and share it with anyone who cares for them.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              className="flex gap-8 items-start"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.number}
                </span>
              </div>
              <div className="pt-2">
                <h3
                  className="text-xl font-bold text-foreground mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
