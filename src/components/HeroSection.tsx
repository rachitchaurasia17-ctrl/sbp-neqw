import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedHeading from './AnimatedHeading';
import FadeIn from './FadeIn';
import MobileMenu from './MobileMenu';

// Anchor links scroll within the home page; route links open category pages.
const ROUTE_LINKS = [
  { label: 'Residential', to: '/residential' },
  { label: 'Commercial', to: '/commercial' },
  { label: 'Industrial', to: '/industrial' },
  { label: 'SBP CSR', to: '/csr' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Mobile gets a dedicated vertical-friendly clip; desktop the wide one.
  const [videoSrc, setVideoSrc] = useState('/backgroundvideo.mp4');
  // Parallax only on larger screens — transforming a playing <video> while
  // scrolling janks/pauses it on mobile GPUs.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const apply = () => {
      setIsMobile(mq.matches);
      setVideoSrc(mq.matches ? '/mobilevideo.mp4' : '/backgroundvideo.mp4');
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Robustly start playback: the video mounts behind the full-screen intro
  // overlay, so browsers often defer autoplay. We retry on every readiness
  // event, on an interval that spans the intro, and on first interaction.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let cancelled = false;
    const tryPlay = () => {
      if (cancelled) return;
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    v.load();
    tryPlay();

    const events = ['loadeddata', 'canplay', 'canplaythrough', 'stalled', 'suspend'];
    events.forEach((e) => v.addEventListener(e, tryPlay));

    // Keep nudging through the ~4s intro until it's actually playing.
    const interval = window.setInterval(() => {
      if (v.paused) tryPlay();
      else window.clearInterval(interval);
    }, 600);
    const stopInterval = window.setTimeout(() => window.clearInterval(interval), 8000);

    const onInteract = () => tryPlay();
    window.addEventListener('pointerdown', onInteract, { once: true });
    window.addEventListener('scroll', onInteract, { passive: true, once: true });
    document.addEventListener('visibilitychange', tryPlay);

    return () => {
      cancelled = true;
      events.forEach((e) => v.removeEventListener(e, tryPlay));
      window.clearInterval(interval);
      window.clearTimeout(stopInterval);
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('scroll', onInteract);
      document.removeEventListener('visibilitychange', tryPlay);
    };
  }, [videoSrc]);

  // Scroll-driven parallax across the first viewport of scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.16]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Background Video — parallax on desktop, static on mobile.
          Always visible (no opacity fade) so it can never get stuck hidden;
          the intro tunnel's own dissolve provides the reveal. */}
      <motion.div
        className={`absolute inset-0 ${isMobile ? '' : 'will-change-transform'}`}
        style={isMobile ? undefined : { y: videoY, scale: videoScale }}
      >
        <video
          ref={videoRef}
          key={videoSrc}
          className="w-full h-full object-cover"
          src={videoSrc}
          poster={videoSrc.includes('mobile') ? '/mobileposter.jpg' : '/heroposter.jpg'}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-expect-error vendor attrs improve mobile autoplay stability
          disableRemotePlayback=""
          x5-playsinline="true"
          webkit-playsinline="true"
        />
      </motion.div>
      {/* Readability scrims — keep hero text high-contrast over any footage */}
      {/* vertical: darken nav top + hero text bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,5,2,0.6) 0%, rgba(7,5,2,0.18) 24%, rgba(7,5,2,0.28) 52%, rgba(7,5,2,0.96) 100%)',
        }}
      />
      {/* horizontal: darken the left column where the headline sits */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(7,5,2,0.65) 0%, rgba(7,5,2,0.2) 42%, rgba(7,5,2,0) 72%)',
        }}
      />
      {/* gentle overall tint for consistent warmth */}
      <div className="absolute inset-0 pointer-events-none bg-black/15" />

      {/* Navbar */}
      <div className="relative z-20 px-6 md:px-12 lg:px-16 pt-6">
        <FadeIn delay={100} duration={800}>
          <nav className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5">
              <span className="font-display text-3xl tracking-tight text-[var(--ivory)]">SBP</span>
              <span className="hidden md:inline text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] border-l border-white/15 pl-2.5">
                Group
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              <a
                href="#projects"
                className="link-underline text-sm tracking-wide text-[var(--ivory)]/85 hover:text-[var(--ivory)] transition-colors"
              >
                Projects
              </a>
              {ROUTE_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="link-underline text-sm tracking-wide text-[var(--ivory)]/85 hover:text-[var(--ivory)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="link-underline text-sm tracking-wide text-[var(--ivory)]/85 hover:text-[var(--ivory)] transition-colors"
              >
                Contact
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex btn-gold px-5 md:px-7 py-2.5 rounded-full text-xs md:text-sm font-medium tracking-wide items-center gap-2"
              >
                <span>Book a Visit</span>
                <span className="text-base leading-none">→</span>
              </a>
              <MobileMenu dark />
            </div>
          </nav>
        </FadeIn>
      </div>

      {/* Hero content */}
      <motion.div
        style={isMobile ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-20"
      >
        <FadeIn delay={300} duration={800}>
          <div className="inline-flex items-center gap-2.5 mb-8">
            <span className="w-8 h-px bg-[var(--gold)]" />
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[var(--gold-soft)]">
              No.1 Housing Company in Punjab
            </span>
          </div>
        </FadeIn>

        <AnimatedHeading
          text={"Homes that\nshape the skyline."}
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-light text-[var(--ivory)] mb-6 leading-[0.95]"
          style={{ letterSpacing: '-0.03em' }}
          initialDelay={400}
          charDelay={28}
        />

        <div className="lg:grid lg:grid-cols-12 lg:items-end gap-8 mt-6">
          <div className="lg:col-span-6">
            <FadeIn delay={1000} duration={1000}>
              <p className="text-base md:text-lg text-[var(--ivory-dim)] leading-relaxed max-w-xl">
                Eighteen years. Thirty-two landmarks. Fifteen thousand keys delivered on time.
                The Tricity's most trusted address — by record.
              </p>
            </FadeIn>

            <FadeIn delay={1300} duration={1000}>
              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href="#projects"
                  className="btn-gold px-7 py-3.5 rounded-full text-sm font-medium tracking-wide inline-flex items-center gap-2"
                >
                  <span>Explore Projects</span>
                  <span>→</span>
                </a>
                <a
                  href="#contact"
                  className="btn-ghost px-7 py-3.5 rounded-full text-sm font-medium tracking-wide inline-flex items-center gap-2 backdrop-blur-sm"
                >
                  Book a Site Visit
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 flex lg:justify-end mt-10 lg:mt-0">
            <FadeIn delay={1500} duration={1000}>
              <div className="grid grid-cols-3 gap-6 md:gap-10">
                {[
                  { n: '18', s: 'Years' },
                  { n: '15K+', s: 'Keys' },
                  { n: '32', s: 'Projects' },
                ].map((s) => (
                  <div key={s.s} className="text-left lg:text-right">
                    <div
                      className="font-display text-4xl md:text-5xl text-[var(--gold-soft)] leading-none"
                      style={{ letterSpacing: '-0.03em' }}
                    >
                      {s.n}
                    </div>
                    <div className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-[var(--muted)] mt-2">
                      {s.s}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2">
        <FadeIn delay={1800} duration={800}>
          <span className="text-[10px] tracking-[0.35em] text-[var(--ivory)]/50 uppercase">Scroll</span>
        </FadeIn>
      </div>
    </section>
  );
}
