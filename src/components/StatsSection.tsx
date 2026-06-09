import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 18, suffix: '+', label: 'Years of Trust', sub: 'Since 2007' },
  { value: 15000, suffix: '+', label: 'Homes Delivered', sub: 'And counting' },
  { value: 32, suffix: '', label: 'Projects Completed', sub: 'Across the Tricity' },
  { value: 10, suffix: '', label: 'Ongoing Builds', sub: 'In construction now' },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative bg-[var(--bg-elev)] py-16 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.07) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-8 items-end mb-10 md:mb-12"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <span className="w-8 h-px bg-[var(--gold)]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold-soft)]">
                By the Numbers
              </span>
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]"
              style={{ letterSpacing: '-0.03em', color: 'var(--ivory)' }}
            >
              Eighteen years.
              <br />
              <span className="italic" style={{ color: 'var(--gold-soft)' }}>One promise kept.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[var(--ivory-dim)] leading-relaxed max-w-md">
              SBP is on a path to deliver one lakh keys over the next fourteen years.
              Every number below is a family that already counted on us — and we delivered.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="rounded-2xl p-8 md:p-10 border border-[rgba(201,161,74,0.18)] transition-all duration-500 hover:border-[rgba(201,161,74,0.45)] hover:-translate-y-1"
              style={{
                background:
                  'linear-gradient(155deg, rgba(40,29,13,0.5) 0%, rgba(24,18,10,0.55) 55%, rgba(17,12,6,0.6) 100%)',
              }}
            >
              <div
                className="font-display text-5xl md:text-6xl lg:text-7xl text-[var(--gold-soft)] mb-3 leading-none"
                style={{ letterSpacing: '-0.04em' }}
              >
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base text-[var(--ivory)] font-medium">{stat.label}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
