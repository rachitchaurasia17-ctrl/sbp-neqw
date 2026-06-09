import { motion } from 'framer-motion';
import { Shield, Award, Clock, Sparkles, Users, Leaf } from 'lucide-react';

const FEATURES = [
  { icon: Shield, t: 'RERA Compliant', d: 'Every engagement registered, every promise documented.' },
  { icon: Clock, t: 'On-Time Delivery', d: 'Disciplined execution and transparent timelines — no surprises.' },
  { icon: Award, t: 'Global Standards', d: 'Luxury expertise drawn from Miami, Kuala Lumpur and Frankfurt.' },
  { icon: Sparkles, t: 'Premium by Design', d: 'Considered finishes, amenities and craftsmanship as standard.' },
  { icon: Users, t: 'Client-First, Always', d: 'Tailored solutions and lasting, impactful relationships.' },
  { icon: Leaf, t: 'Research-Driven', d: 'Every decision backed by deep, current market insight.' },
];

export default function WhySection() {
  return (
    <section className="relative bg-[#0a0a0a] border-t border-white/5 py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden">
      {/* Warm gold accents */}
      <div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-[var(--gold)]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--gold)]">
                  WHY SBP
                </span>
              </div>
              <h2
                className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Six reasons clients <br/>
                <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-[var(--gold)] to-[var(--gold-soft)]">choose SBP.</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed max-w-md">
                Global standards, local mastery and a zero-compromise ethic — the difference shows in everything we touch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden hidden lg:block"
            >
              <img src="/projects/cityofdream.avif" alt="Building" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                 <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">PUNJAB · SINCE 2007</div>
                 <div className="text-xl text-white font-medium">Built to a higher standard</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Grid) */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 h-full">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.t}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.1 }}
                  className="h-full"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="group relative h-full rounded-2xl p-8 border border-[var(--gold)]/20 bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-[var(--gold)]/50 hover:bg-[var(--gold)]/5"
                  >
                    <div className="absolute top-6 right-6 text-xs font-serif italic text-white/20 group-hover:text-[var(--gold)]/40 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="w-12 h-12 mb-6 rounded-full flex items-center justify-center border border-[var(--gold)]/30 bg-[var(--gold)]/10 group-hover:bg-[var(--gold)]/20 transition-colors">
                      <f.icon
                        className="w-5 h-5 text-[var(--gold)] group-hover:scale-110 transition-transform duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="font-display text-2xl font-light mb-3 text-white" style={{ letterSpacing: '-0.02em' }}>
                      {f.t}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{f.d}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
