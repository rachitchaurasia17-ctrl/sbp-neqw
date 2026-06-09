import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const current = PROJECTS[active];
  const stripRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-100, 0, 100], [0.5, 1, 0.5]);

  const open = (slug: string) => navigate(`/project/${slug}`);

  const next = () => setActive((a) => (a + 1) % PROJECTS.length);
  const prev = () => setActive((a) => (a - 1 + PROJECTS.length) % PROJECTS.length);

  // Auto-advance every 5s
  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const el = stripRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 px-0 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060504 0%, #0c0906 50%, #060504 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,161,74,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* ── Header ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1500px] mx-auto mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-12 h-px" style={{ background: '#c9a14a' }} />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#c9a14a' }}>
                Featured Portfolio
              </span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              Currently shaping the
              <span className="italic" style={{ color: '#c9a14a' }}> Tricity skyline.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base max-w-sm leading-relaxed md:text-right" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every project is live, RERA-registered and led by a delivery team known for keeping its dates.
          </p>
        </motion.div>
      </div>

      {/* ── Immersive Hero Stage ── */}
      <div className="relative w-full px-3 sm:px-5 md:px-8 lg:px-12 max-w-[1500px] mx-auto">
        <motion.div
          className="relative w-full aspect-[3/4] sm:aspect-[16/10] lg:aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer"
          style={{
            border: '1px solid rgba(201,161,74,0.15)',
            boxShadow: '0 0 80px rgba(201,161,74,0.08), 0 30px 60px rgba(0,0,0,0.6)',
            opacity: dragOpacity,
          }}
          onClick={() => open(current.slug)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50) next();
            else if (info.offset.x > 50) prev();
          }}
          whileHover={{ boxShadow: '0 0 100px rgba(201,161,74,0.12), 0 30px 60px rgba(0,0,0,0.6)' }}
        >
          {/* Background images */}
          {PROJECTS.map((p, i) => (
            <AnimatePresence key={p.slug}>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0"
                >
                  <img src={p.cover} alt={p.name} className="w-full h-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          ))}

          {/* Cinematic overlays */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.15) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)' }} />
          {/* Gold vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,161,74,0.06) 0%, transparent 60%)' }} />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 md:p-8 flex items-center justify-between">
            <motion.span
              key={current.badge}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 rounded-full text-[10px] tracking-[0.25em] uppercase font-medium"
              style={{ background: 'rgba(201,161,74,0.15)', border: '1px solid rgba(201,161,74,0.3)', color: '#c9a14a', backdropFilter: 'blur(12px)' }}
            >
              {current.badge}
            </motion.span>
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm font-mono">
                {String(active + 1).padStart(2, '0')}
                <span className="text-white/20"> / </span>
                {String(PROJECTS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl"
              >
                {/* City */}
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3 h-3" style={{ color: '#c9a14a' }} />
                  <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase" style={{ color: '#c9a14a' }}>
                    {current.city}
                  </span>
                </div>
                {/* Name */}
                <h3
                  className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2 sm:mb-3 leading-[1]"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {current.name}
                </h3>
                {/* Tagline */}
                <p className="text-sm sm:text-base text-white/60 mb-4 sm:mb-5 italic">
                  {current.tagline}
                </p>
                {/* Meta pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                  {[current.type, current.status, current.priceFrom].filter(Boolean).map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* CTA */}
                <button
                  onClick={(e) => { e.stopPropagation(); open(current.slug); }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-500 group/btn"
                  style={{
                    background: 'linear-gradient(135deg, #c9a14a, #e6c98c)',
                    color: '#0a0806',
                    boxShadow: '0 4px 20px rgba(201,161,74,0.3)',
                  }}
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows (desktop) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-5 hidden sm:block">
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(201,161,74,0.3)', backdropFilter: 'blur(10px)' }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#c9a14a' }} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-5 hidden sm:block">
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(201,161,74,0.3)', backdropFilter: 'blur(10px)' }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#c9a14a' }} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'rgba(201,161,74,0.1)' }}>
            <motion.div
              key={active}
              className="h-full"
              style={{ background: 'linear-gradient(90deg, #c9a14a, #e6c98c)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Thumbnail Strip ── */}
      <div className="px-3 sm:px-5 md:px-8 lg:px-12 max-w-[1500px] mx-auto mt-6 md:mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
            All Projects
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase hidden sm:block" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Tap to preview · Swipe to browse
          </span>
        </div>
        <div ref={stripRef} className="flex gap-3 overflow-x-auto pb-3 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {PROJECTS.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              className="group relative shrink-0 snap-start w-[140px] sm:w-[170px] md:w-[200px] aspect-[4/3] rounded-xl overflow-hidden transition-all duration-500"
              style={{
                border: active === i ? '1.5px solid rgba(201,161,74,0.7)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: active === i ? '0 0 25px rgba(201,161,74,0.15)' : 'none',
              }}
            >
              <img
                src={p.cover}
                alt={p.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: active === i
                    ? 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <div className="text-[10px] sm:text-[11px] font-medium text-white leading-tight truncate">
                  {p.name}
                </div>
                <div className="text-[9px] mt-0.5 truncate" style={{ color: active === i ? '#c9a14a' : 'rgba(255,255,255,0.4)' }}>
                  {p.city}
                </div>
              </div>
              {active === i && (
                <motion.div
                  layoutId="thumb-indicator"
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #c9a14a, transparent)' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
