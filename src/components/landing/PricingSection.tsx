import { motion } from 'motion/react';

const plans = [
{
  name: "Founding Member",
  badge: "First 500 Only",
  price: "$69",
  period: "",
  description: "Exclusive price for our earliest supporters.",
  features: [
  "Includes Annual Member features",
  "Priority access to new features & tools",
  "Help shape the future of PetPlaybook"],

  highlight: true
},
{
  name: "Annual Member",
  badge: null,
  price: "$99",
  period: "",
  description: "Everything you need to get started.",
  features: [
  "Create your pet's playbook",
  "Share with trusted caregivers",
  "Update anytime",
  "Additional pet: $29/first year",
  "Renewal (first pet): $49/year",
  "Renewal (additional pet): $19/year"],

  highlight: false
},
{
  name: "Lifetime Member",
  badge: null,
  price: "$249",
  period: "",
  description: "Your pet's story, protected for life.",
  features: [
  "Includes Annual Member features",
  "Lifetime access",
  "No additional pet fees",
  "No annual renewal fees"],

  highlight: false
}];


export default function PricingSection() {
  return (
    <section id="pricing" className="bg-background pt-4 pb-20 md:pt-6 md:pb-28">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center mb-16">
          
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Pricing
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>
            
            Simple, honest pricing.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No hidden fees. No complicated tiers. Just everything your pet needs, at a price that makes sense.
          </p>
        </motion.div>

        {/* First 500 banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }}
          className="max-w-5xl mx-auto mb-4">
          
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            First 500 Only
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, i) => {
            const cardStyles = [
            'bg-primary text-primary-foreground border-primary',
            'border-2 border-primary/40 text-foreground bg-[#f2f7f2]',
            'border-2 border-primary/60 text-foreground bg-[#e8f0e9]'];

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                className={`relative rounded-3xl p-8 flex flex-col ${cardStyles[i]}`}>
                
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  
                  {plan.name}
                </h3>

                <div className="flex items-start gap-1 mt-3 mb-2 min-h-[4rem]">
                  <span className="text-4xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {plan.price}
                  </span>
                  {i === 0 ?
                  <span className="text-sm mt-3 opacity-70">First year/one pet</span> :
                  i === 1 ?
                  <span className="text-sm text-muted-foreground leading-tight mt-3">First year/one pet or $9.99/month</span> :

                  <span className="text-sm mt-3 text-muted-foreground">Unlimited years/pets</span>
                  }
                </div>

                <p className={`text-sm leading-relaxed mb-6 min-h-[3rem] ${i === 0 ? 'opacity-80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) =>
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <svg
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${i === 0 ? 'text-white' : 'text-primary'}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                      strokeLinecap="round" strokeLinejoin="round">
                      
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={i === 0 ? 'opacity-90' : ''}>{feature}</span>
                    </li>
                  )}
                </ul>
              </motion.div>);

          })}
        </div>

        {/* Link to full pricing page removed */}

      </div>
    </section>);

}