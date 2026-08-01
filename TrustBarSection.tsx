import React, { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import gsap from 'gsap';
import { FIRM_DETAILS } from '../data/firmData';
import { useReducedMotion } from '../App';

export const TrustBarSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !countRef.current || reducedMotion) return;

    const end = FIRM_DETAILS.stats.projectsCompleted;
    const obj = { val: 0 };

    gsap.to(obj, {
      val: end,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.textContent = Math.floor(obj.val).toString();
        }
      },
    });
  }, [isInView, reducedMotion]);

  const metrics = [
    { value: `${FIRM_DETAILS.stats.yearsExperience} Years`, label: 'Engineering Excellence' },
    { value: FIRM_DETAILS.stats.isoRating.split('&')[0].trim(), label: 'Quality Standard' },
    { value: FIRM_DETAILS.stats.portfolioValue, label: 'Capital Handled' },
    { value: FIRM_DETAILS.stats.clientRating, label: 'Client Trust Index' },
    { value: 'LEED Platinum', label: 'Sustainability Standard' },
  ];

  return (
    <section
      id="credentials"
      ref={sectionRef}
      className="relative w-full bg-[#141414] py-20 md:py-28 border-y border-[#1f1f1f] overflow-hidden"
    >
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Counter */}
          <div className="lg:col-span-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#1f1f1f] pb-10 lg:pb-0 lg:pr-12">
            <span className="text-[11px] tracking-[0.25em] text-[#c9a962] font-mono uppercase mb-3">
              THE CREDENTIALS
            </span>
            
            <div className="flex items-baseline">
              <span
                ref={countRef}
                className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#c9a962] font-normal leading-none tracking-tight"
              >
                {reducedMotion ? FIRM_DETAILS.stats.projectsCompleted : '0'}
              </span>
              <span className="font-serif text-5xl md:text-6xl text-[#c9a962] ml-1">+</span>
            </div>

            <p className="text-xl md:text-2xl font-serif text-[#f5f5f0] mt-4 font-light tracking-wide">
              Major Projects Delivered Worldwide
            </p>
            <p className="text-sm text-[#8a8a8a] mt-2 font-light">
              Zero structural failures across 25 years of heavy civil & luxury architectural construction.
            </p>
          </div>

          {/* Metrics */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 relative">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col relative pt-4 opacity-0 translate-y-4 metric-item"
                style={{
                  opacity: reducedMotion ? 1 : undefined,
                  transform: reducedMotion ? 'none' : undefined,
                  animation: reducedMotion
                    ? 'none'
                    : isInView
                    ? `fadeUp 0.6s ${0.2 + idx * 0.1}s cubic-bezier(0.16, 1, 0.3, 1) forwards`
                    : 'none',
                }}
              >
                <div
                  className="absolute top-0 left-0 w-[1px] h-full bg-[#c9a962]/30 origin-top"
                  style={{
                    transform: isInView ? 'scaleY(1)' : 'scaleY(0)',
                    transition: `transform 0.8s ${0.3 + idx * 0.1}s cubic-bezier(0.16, 1, 0.3, 1)`,
                  }}
                />
                <div className="pl-4">
                  <span className="font-serif text-xl sm:text-2xl text-[#f5f5f0] font-medium tracking-tight block">
                    {metric.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#8a8a8a] uppercase tracking-[0.15em] mt-2 block leading-snug">
                    {metric.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
