import React, { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data/firmData';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../App';

interface ServicesSectionProps {
  onSelectService: (service: any) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="capabilities" ref={sectionRef} className="w-full bg-[#0a0a0a] py-24 md:py-36 relative border-b border-[#1f1f1f]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#c9a962]" />
              <span className="text-[11px] tracking-[0.25em] text-[#c9a962] font-mono uppercase">
                THE CAPABILITY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f5f5f0] font-normal tracking-tight">
              Master Engineering Disciplines
            </h2>
          </div>
          <p className="text-[#8a8a8a] text-sm md:text-base max-w-md font-light leading-relaxed">
            Architectural panels representing our core engineering capabilities. Hover to inspect physical execution.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectService(service)}
                className={`service-card relative group bg-[#141414] border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[440px] p-8 ${reducedMotion ? 'opacity-100' : 'opacity-0'} ${
                  isHovered ? 'border-[#c9a962] shadow-2xl shadow-[#c9a962]/10' : 'border-[#1f1f1f]'
                }`}
              >
                {/* Background Image Crossfade */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none ${
                    isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                  style={{
                    backgroundImage: `url(${service.image})`,
                    filter: 'brightness(0.35) contrast(1.2)',
                  }}
                />

                {/* Blueprint Overlay */}
                <div
                  className={`absolute inset-0 bg-blueprint-grid-dense transition-opacity duration-500 pointer-events-none ${
                    isHovered ? 'opacity-10' : 'opacity-40'
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 flex items-start justify-between">
                  <span
                    className="font-serif text-6xl font-light tracking-tighter select-none transition-colors duration-500"
                    style={{
                      WebkitTextStroke: isHovered ? '1px #c9a962' : '1px #8a8a8a',
                      color: 'transparent',
                    }}
                  >
                    {service.number}
                  </span>

                  <div
                    className={`w-12 h-12 border flex items-center justify-center transition-colors duration-500 ${
                      isHovered ? 'border-[#c9a962] bg-[#c9a962]/10 text-[#c9a962]' : 'border-[#1f1f1f] text-[#8a8a8a]'
                    }`}
                  >
                    <svg className="w-6 h-6 stroke-current fill-none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d={service.svgIcon} />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 my-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#f5f5f0] mb-3 font-normal group-hover:text-[#c9a962] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#b0b0b0] font-light line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div
                    className={`mt-4 space-y-2 transition-all duration-500 ${
                      isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
                    {service.technicalCapabilities.slice(0, 2).map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#f5f5f0]/90 font-mono">
                        <CheckCircle2 className="w-3 h-3 text-[#c9a962] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 border-t border-[#1f1f1f] group-hover:border-[#c9a962]/40 pt-4 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-mono text-[#8a8a8a] group-hover:text-[#c9a962] transition-colors">
                  <span>SPECS & CAPACITY</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
