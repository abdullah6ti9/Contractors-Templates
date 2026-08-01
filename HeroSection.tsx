import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { heroImg } from '../data/firmData';
import { useReducedMotion } from '../App';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject, onExploreWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // GSAP Scroll-driven background zoom + grid fade
  useEffect(() => {
    if (reducedMotion || !containerRef.current || !bgRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Background slow zoom on scroll
      gsap.to(bgRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Blueprint grid fade out on scroll
      gsap.to(gridRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Throttled mouse parallax using refs + rAF
  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    const pending = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      pending.x = (e.clientX / width - 0.5) * -25; // inverted for parallax lag
      pending.y = (e.clientY / height - 0.5) * -25;
    };

    const loop = () => {
      // Lerp for smooth lag
      smooth.x += (pending.x - smooth.x) * 0.08;
      smooth.y += (pending.y - smooth.y) * 0.08;

      if (gridRef.current) {
        gridRef.current.style.transform = `translate(${smooth.x}px, ${smooth.y}px)`;
      }

      // Ambient light follows cursor
      const light = containerRef.current?.querySelector('.ambient-light') as HTMLElement | null;
      if (light) {
        const cx = ((smooth.x / -25) + 0.5) * 100;
        const cy = ((smooth.y / -25) + 0.5) * 100;
        light.style.background = `radial-gradient(600px circle at ${cx}% ${cy}%, rgba(201, 169, 98, 0.12), transparent 40%)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  const headlineWords = "We Build What Others Imagine.".split(" ");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center pointer-events-none will-change-transform"
        style={{
          backgroundImage: `url(${heroImg})`,
          filter: 'brightness(0.35) contrast(1.15) saturate(0.75)',
        }}
      />

      {/* Noise Grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] pointer-events-none z-10" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)] pointer-events-none z-10" />

      {/* Blueprint Grid with Mouse Parallax */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-blueprint-grid opacity-[0.06] pointer-events-none z-10 will-change-transform"
        style={{ transform: 'translate(0px, 0px)' }}
      />

      {/* Ambient Cursor Light */}
      <div className="ambient-light absolute inset-0 pointer-events-none z-10 opacity-70 transition-opacity duration-500" />

      {/* CAD Crosshairs */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#1f1f1f] hidden lg:block z-10" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-[#1f1f1f] hidden lg:block z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 md:px-16 flex flex-col justify-center h-full pt-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-[#c9a962]" />
            <span className="text-[11px] md:text-[12px] tracking-[0.25em] text-[#c9a962] font-mono font-medium uppercase">
              CONSTRUCTING THE EXTRAORDINARY
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f5f5f0] font-normal leading-[0.95] tracking-tight mb-8">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-3 md:mr-5">
                <motion.span
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.6 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg md:text-xl text-[#b0b0b0] font-light max-w-2xl leading-relaxed mb-10"
          >
            Award-winning construction and structural engineering for visionary clients.
            We transform audacious architectural sketches into unyielding physical reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              onClick={onStartProject}
              className="btn-gold-fill px-8 py-4 rounded-full border border-[#c9a962] text-[12px] tracking-[0.2em] uppercase font-semibold text-[#c9a962] cursor-pointer shadow-lg shadow-[#c9a962]/5"
            >
              <span>Start Your Project</span>
            </button>

            <button
              onClick={onExploreWork}
              className="group flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase text-[#f5f5f0] hover:text-[#c9a962] transition-colors py-4 px-2 cursor-pointer"
            >
              <span className="font-medium">Explore Our Work</span>
              <ArrowRight className="w-4 h-4 text-[#c9a962] group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-6 md:left-16 right-6 md:right-16 flex items-center justify-between border-t border-[#1f1f1f] pt-4 text-[10px] md:text-[11px] text-[#8a8a8a] font-mono tracking-[0.15em] uppercase"
        >
          <div className="hidden sm:flex items-center gap-6">
            <span>PRECISION GRID: 0.002mm</span>
            <span>ISO 9001 ACCREDITED</span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span>SCROLL TO EXPLORE</span>
            <div className="w-4 h-7 border border-[#8a8a8a]/40 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-1.5 bg-[#c9a962] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
