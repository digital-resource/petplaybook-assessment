import { motion } from 'motion/react';

type Card = {
  emoji: string;
  title: string;
  description: string | string[];
  highlight: string;
};

const cards: Card[] = [
{
  emoji: '🐶',
  title: 'For Your Pet',
  description: ['Less stress during transitions', 'Care that feels familiar', "A voice when they can't speak for themselves"],
  highlight: ''
},
{
  emoji: '🐱',
  title: 'For You',
  description: ['Peace of mind', 'Confidence in every handoff', 'The comfort of knowing your pet is truly understood'],
  highlight: ''
},
{
  emoji: '🏥',
  title: 'For Their Caregiver',
  description: ['Guidance from the person who knows the pet best.', 'Important routines, triggers, preferences, and comfort protocols in one place.', 'Help pets feel more comfortable, settled, and understood in your care.'],
  highlight: ''
}];


export default function WhoItsForSection() {
  return (
    <section id="who-its-for" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="text-center mb-16">
          
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Who It's For
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}>The PetPlaybook App helps everyone


            <span className="block">know your pet's inside story.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The more your house sitters, boarding facilities, dog walkers, groomers, trainers, and even your veterinarian understand your pet, the better they can care for them.

          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) =>
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
            className="relative bg-card rounded-3xl p-8 pb-6 border border-border hover:shadow-lg transition-shadow group">
            
              <div className="text-5xl mb-5">
                {card.emoji === '🐶' ?
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    {/* 4 toe pads */}
                    <ellipse cx="5.5" cy="7" rx="1.3" ry="1.8" />
                    <ellipse cx="9.5" cy="5" rx="1.3" ry="1.8" />
                    <ellipse cx="14.5" cy="5" rx="1.3" ry="1.8" />
                    <ellipse cx="18.5" cy="7" rx="1.3" ry="1.8" />
                    {/* Triangular main pad */}
                    <path d="M12 21c-3.5 0-6-1.8-6-4.5 0-1.5.8-2.8 2-3.5 1-.6 2.5-1 4-1s3 .4 4 1c1.2.7 2 2 2 3.5 0 2.7-2.5 4.5-6 4.5z" />
                  </svg> : card.emoji === '🐱' ?
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg> : card.emoji === '🏥' ?
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    {/* Person 1 */}
                    <circle cx="7" cy="5" r="2" />
                    <path d="M3 14c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                    <line x1="3" y1="14" x2="11" y2="14" />
                    {/* Person 2 */}
                    <circle cx="17" cy="5" r="2" />
                    <path d="M13 14c0-2.2 1.8-4 4-4s4 1.8 4 4" />
                    <line x1="13" y1="14" x2="21" y2="14" />
                  </svg> :
              <span>{card.emoji}</span>
              }
              </div>
              <h3
              className="text-xl font-bold text-foreground mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}>
              
                {card.title}
              </h3>
              {Array.isArray(card.description) ?
            <ul className="space-y-2">
                  {card.description.map((item) =>
              <li key={item} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
              )}
                </ul> :

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{card.description}</p>
            }
              {card.highlight &&
            <div className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold">
                <span>{card.highlight}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            }            </motion.div>
          )}
        </div>
      </div>
    </section>);

}