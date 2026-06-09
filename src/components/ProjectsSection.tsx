import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const current = PROJECTS[active];

  const open = (slug: string) => navigate(`/project/${slug}`);

  return (
    <section
      id="projects"
      className="relative bg-[var(--bg)] border-t border-[var(--line)] py-20 md:py-28 px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div
        className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,161,74,0.06) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-7xl mx-auto">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-8 h-px bg-[var(--gold)]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold-soft)]">
                Featured Portfolio
              </span>
            </div>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]"
              style={{ letterSpacing: '-0.03em', color: 'var(--ivory)' }}
            >
              Currently shaping the
              <span className="italic" style={{ color: 'var(--gold-soft)' }}> Tricity skyline.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[var(--muted)] max-w-sm leading-relaxed md:text-right">
            Every project is live, RERA-registered and led by a delivery team known for keeping its dates. Tap any to explore.
          </p>
        </motion.div>

        {/* Full-width feature stage */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full aspect-[16/11] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden project-card-shadow group cursor-pointer"
          onClick={() => open(current.slug)}
        >
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.05 }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0"
              style={{ pointerEvents: 'none' }}
            >
              <img src={p.cover} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </motion.div>
          ))}

          {/* Overlay info */}
          <div className="absolute inset-0 p-6 md:p-10 lg:p-12 flex flex-col justify-between pointer-events-none">
            <div className="flex items-start justify-between">
              <span className="liquid-glass px-3 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase text-[var(--gold-soft)]">
                {current.badge}
              </span>
              <span className="liquid-glass px-3 py-1.5 rounded-full text-[10px] tracking-[0.25em] uppercase text-[var(--ivory)]/80">
                {String(active + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
              </span>
            </div>

            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold-soft)] mb-3">
                {current.city}
              </div>
              <h3
                className="font-display text-4xl md:text-6xl lg:text-7xl text-[var(--ivory)] mb-3 leading-none"
                style={{ letterSpacing: '-0.03em' }}
              >
                {current.name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs md:text-sm text-[var(--ivory-dim)] mb-5">
                <span>{current.location}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                <span>{current.type}</span>
                <span className="w-1 h-1 rounded-full bg-[var(--gold)]" />
                <span style={{ color: 'var(--gold-soft)' }}>{current.status}</span>
              </div>
              <span className="btn-gold pointer-events-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide">
                <span>View Project Details</span>
                <span>→</span>
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Horizontal thumbnail strip */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
              All Projects
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] hidden sm:block">
              Hover to preview · Click to open
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x" style={{ scrollbarWidth: 'thin' }}>
            {PROJECTS.map((p, i) => (
              <button
                key={p.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => open(p.slug)}
                className={`group relative shrink-0 snap-start w-[160px] md:w-[200px] aspect-[4/3] rounded-xl overflow-hidden border transition-all duration-500 ${
                  active === i
                    ? 'border-[var(--gold)]'
                    : 'border-[var(--line)] hover:border-white/30'
                }`}
              >
                <img
                  src={p.cover}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    active === i ? 'bg-black/10' : 'bg-black/55 group-hover:bg-black/25'
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2.5 text-left bg-gradient-to-t from-black/80 to-transparent">
                  <div className="text-[11px] font-medium text-[var(--ivory)] leading-tight truncate">
                    {p.name}
                  </div>
                </div>
                {active === i && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--gold)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
