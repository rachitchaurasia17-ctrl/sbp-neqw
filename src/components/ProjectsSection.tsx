import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1); // 1 = next, -1 = prev
  const navigate = useNavigate();
  const current = PROJECTS[active];
  const touchStart = useRef(0);

  const open = (slug: string) => navigate(`/project/${slug}`);

  const go = (idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };
  const next = () => { setDir(1); setActive((a) => (a + 1) % PROJECTS.length); };
  const prev = () => { setDir(-1); setActive((a) => (a - 1 + PROJECTS.length) % PROJECTS.length); };

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 60) next();
    else if (diff < -60) prev();
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0, scale: 0.92 }),
  };

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #060504 0%, #0c0906 50%, #060504 100%)' }}
    >
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,161,74,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* ── Header ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-12 h-px" style={{ background: '#c9a14a' }} />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: '#c9a14a' }}>
              Featured Portfolio
            </span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] text-white max-w-3xl"
            style={{ letterSpacing: '-0.03em' }}
          >
            Currently shaping the
            <span className="italic" style={{ color: '#c9a14a' }}> Tricity skyline.</span>
          </h2>
        </motion.div>
      </div>

      {/* ── Swipeable Full-Card Carousel ── */}
      <div
        className="relative w-full px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden"
          style={{
            border: '1px solid rgba(201,161,74,0.15)',
            boxShadow: '0 0 80px rgba(201,161,74,0.06), 0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.slug}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex flex-col md:flex-row"
            >
              {/* Image half — tappable on mobile to open project */}
              <div
                className="relative w-full md:w-[55%] lg:w-[60%] h-[55%] sm:h-[50%] md:h-full shrink-0 cursor-pointer md:cursor-default"
                onClick={() => open(current.slug)}
              >
                <img src={current.cover} alt={current.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(8,5,4,1) 100%)' }} />
                <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, transparent 50%, rgba(8,5,4,1) 100%)' }} />
                {/* Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5">
                  <span className="px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium"
                    style={{ background: 'rgba(201,161,74,0.15)', border: '1px solid rgba(201,161,74,0.35)', color: '#c9a14a', backdropFilter: 'blur(12px)' }}
                  >
                    {current.badge}
                  </span>
                </div>
              </div>

              {/* Content half */}
              <div className="relative flex-1 flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-14 -mt-10 sm:-mt-8 md:mt-0 md:-ml-16 lg:-ml-24 z-10">
                {/* Counter */}
                <div className="text-[10px] font-mono tracking-wider mb-4 sm:mb-5" style={{ color: 'rgba(201,161,74,0.5)' }}>
                  {String(active + 1).padStart(2, '0')} — {String(PROJECTS.length).padStart(2, '0')}
                </div>

                {/* City */}
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3 h-3" style={{ color: '#c9a14a' }} />
                  <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase" style={{ color: '#c9a14a' }}>
                    {current.city}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-3"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {current.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm sm:text-base italic mb-5 sm:mb-6 max-w-md" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {current.tagline}
                </p>

                {/* Specs row */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                  {[current.type, current.status, current.priceFrom].filter(Boolean).map((t) => (
                    <span key={t} className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs"
                      style={{ background: 'rgba(201,161,74,0.08)', border: '1px solid rgba(201,161,74,0.2)', color: 'rgba(255,255,255,0.7)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => open(current.slug)}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-500 group/btn w-fit"
                  style={{
                    background: 'linear-gradient(135deg, #c9a14a, #e6c98c)',
                    color: '#0a0806',
                    boxShadow: '0 4px 20px rgba(201,161,74,0.3)',
                  }}
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(201,161,74,0.3)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: '#c9a14a' }} />
          </button>
          <button onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center z-20 transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(201,161,74,0.3)', backdropFilter: 'blur(10px)' }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: '#c9a14a' }} />
          </button>

          {/* Progress */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20" style={{ background: 'rgba(201,161,74,0.1)' }}>
            <motion.div
              key={active}
              className="h-full"
              style={{ background: 'linear-gradient(90deg, #c9a14a, #e6c98c)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* ── Dot Navigation + Project Names ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 max-w-[1400px] mx-auto mt-6 sm:mt-8">
        {/* Dots (mobile) */}
        <div className="flex items-center justify-center gap-2 sm:hidden mb-4">
          {PROJECTS.map((_, i) => (
            <button key={i} onClick={() => go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                background: active === i ? '#c9a14a' : 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Scrollable name pills (tablet+) */}
        <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {PROJECTS.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => go(i)}
              className="shrink-0 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-500 whitespace-nowrap"
              style={{
                background: active === i ? 'rgba(201,161,74,0.15)' : 'rgba(255,255,255,0.03)',
                border: active === i ? '1px solid rgba(201,161,74,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: active === i ? '#c9a14a' : 'rgba(255,255,255,0.4)',
                boxShadow: active === i ? '0 0 15px rgba(201,161,74,0.1)' : 'none',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
