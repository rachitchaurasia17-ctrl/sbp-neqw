import { motion } from 'framer-motion';
import { Shield, Award, Clock, Sparkles, Users, Leaf } from 'lucide-react';

const FEATURES = [
  { icon: Shield, t: 'RERA Certified', d: 'Every project registered, every promise documented.' },
  { icon: Clock, t: 'On-Time Possession', d: 'A delivery record built across 32 completed projects.' },
  { icon: Award, t: 'Award-Winning Designs', d: "Recognised as Punjab's No.1 housing brand for innovation." },
  { icon: Sparkles, t: 'Premium Amenities', d: 'Rooftop pools, sports courts and fitness clubs as standard.' },
  { icon: Users, t: 'Family-First Communities', d: 'Spaces engineered for connection, not just occupancy.' },
  { icon: Leaf, t: 'Green by Default', d: 'Landscaped acres, sustainability woven into the plan.' },
];

export default function WhySection() {
  return (
    <section className="relative bg-[var(--bg-elev)] border-t border-[var(--line)] py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Warm gold accents */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold-soft)]">Why SBP</span>
          </div>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]"
            style={{ letterSpacing: '-0.03em', color: 'var(--ivory)' }}
          >
            Six reasons families have trusted us
            <span className="italic" style={{ color: 'var(--gold-soft)' }}> over 15,000 times.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="h-full"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className="group h-full rounded-2xl p-8 md:p-10 border border-[rgba(201,161,74,0.18)] transition-all duration-500 hover:border-[rgba(201,161,74,0.45)] hover:shadow-[0_15px_30px_-15px_rgba(201,161,74,0.2)]"
                style={{
                  background:
                    'linear-gradient(155deg, rgba(40,29,13,0.55) 0%, rgba(24,18,10,0.6) 55%, rgba(17,12,6,0.65) 100%)',
                }}
              >
                <div className="w-12 h-12 mb-6 rounded-full flex items-center justify-center border border-[rgba(201,161,74,0.3)] bg-[rgba(201,161,74,0.08)]">
                  <f.icon
                    className="w-5 h-5 text-[var(--gold-soft)] group-hover:scale-110 transition-transform duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-2 text-[var(--ivory)]" style={{ letterSpacing: '-0.02em' }}>
                  {f.t}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{f.d}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
