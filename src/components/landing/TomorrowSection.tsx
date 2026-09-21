import { motion } from 'motion/react';




export default function TomorrowSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="relative">
            
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-video relative">
              <img
                src="/assets/petplaybook-juno.jpg"
                alt="Person enjoying time with their pet outdoors"
                className="w-full h-full object-cover rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-3xl" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}>
            
            
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
              If something happened tomorrow…
              <span className="block italic" style={{ color: "#395b3d" }}>would the people caring for your pet know what you know?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              You can't be with them every moment.<br />
              <strong>But you can leave your caregiver everything that matters.</strong>
            </p>

          </motion.div>
        </div>
      </div>
    </section>);

}