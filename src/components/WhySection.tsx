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
    <section className="relative border-t border-white/5 py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080604 0%, #0d0a06 50%, #080604 100%)' }}
    >
      {/* Ambient gold glow — large soft circles */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: '10%', left: '-5%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(201,161,74,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: '5%', right: '-8%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(201,161,74,0.08) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left Column ── */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-4 mb-8">
                <span className="w-12 h-px" style={{ background: '#c9a14a' }} />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#c9a14a' }}>
                  WHY SBP
                </span>
              </div>
              <h2
                className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-light leading-[1.1] text-white mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Six reasons clients{' '}
                <span className="italic" style={{ color: '#c9a14a' }}>choose SBP.</span>
              </h2>
              <p className="text-lg leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Global standards, local mastery and a zero‑compromise ethic — the difference shows in everything we touch.
              </p>
            </motion.div>

            {/* Feature image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden hidden lg:block"
              style={{
                boxShadow: '0 0 60px rgba(201,161,74,0.15), 0 0 120px rgba(201,161,74,0.06)',
                border: '1px solid rgba(201,161,74,0.2)',
              }}
            >
              <img src="/projects/cityofdream.avif" alt="SBP Group Lifestyle" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#c9a14a' }}>
                  PUNJAB · SINCE 2007
                </div>
                <div className="text-xl text-white font-medium">Built to a higher standard</div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column — Feature Cards ── */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-5 md:gap-6 h-full">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.t}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
                  className="h-full"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4 + (i % 3) * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    className="group relative h-full rounded-2xl p-7 md:p-8 transition-all duration-500 cursor-default"
                    style={{
                      background: 'linear-gradient(165deg, rgba(201,161,74,0.08) 0%, rgba(30,24,14,0.5) 40%, rgba(15,12,8,0.7) 100%)',
                      border: '1px solid rgba(201,161,74,0.25)',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,161,74,0.15)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(201,161,74,0.55)',
                      boxShadow: '0 8px 40px rgba(201,161,74,0.15), 0 0 60px rgba(201,161,74,0.08), inset 0 1px 0 rgba(201,161,74,0.3)',
                    }}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-6 right-6 h-[1px]"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,161,74,0.5), transparent)' }}
                    />
                    {/* Number */}
                    <div
                      className="absolute top-5 right-6 text-xs font-serif italic transition-colors duration-500"
                      style={{ color: 'rgba(201,161,74,0.25)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {/* Icon */}
                    <div
                      className="w-12 h-12 mb-5 rounded-full flex items-center justify-center transition-all duration-500"
                      style={{
                        border: '1px solid rgba(201,161,74,0.35)',
                        background: 'rgba(201,161,74,0.1)',
                        boxShadow: '0 0 20px rgba(201,161,74,0.08)',
                      }}
                    >
                      <f.icon
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"
                        style={{ color: '#c9a14a' }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3
                      className="font-display text-[1.35rem] md:text-2xl font-light mb-2 text-white"
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {f.t}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {f.d}
                    </p>
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
