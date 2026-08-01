import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Building2 } from 'lucide-react';
import { useReducedMotion } from '../App';

interface CTASectionProps {
  onOpenConsultation: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenConsultation }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let pending = { x: 50, y: 50 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      pending = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePos(pending);
          rafId = 0;
        });
      }
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    return () => {
      if (node) node.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <section
      id="inquire"
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-[#0a0a0a] overflow-hidden flex items-center justify-center border-b border-[#1f1f1f]"
    >
      {/* Drifting Abstract Gradient Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c9a962]/10 rounded-full blur-[120px] animate-orb-drift pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8a7340]/10 rounded-full blur-[100px] animate-orb-drift-delayed pointer-events-none" />

      {/* Mouse Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-60 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(201, 169, 98, 0.15), transparent 60%)`,
        }}
      />

      {/* CAD Grid Background */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.04] pointer-events-none" />

      <div className="relative z-20 max-w-[1200px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#c9a962]" />
            <span className="text-[11px] md:text-[12px] tracking-[0.25em] text-[#c9a962] font-mono uppercase">
              YOUR NEXT CHAPTER STARTS HERE
            </span>
            <span className="w-8 h-[1px] bg-[#c9a962]" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f5f5f0] font-normal tracking-tight mb-8 max-w-4xl leading-[0.95]">
            Let’s Build Something Permanent.
          </h2>

          {/* Subhead */}
          <p className="text-lg md:text-xl text-[#b0b0b0] font-light max-w-2xl leading-relaxed mb-12">
            Tell us what you are envisioning. We will bring the structural calculation, material mastery, and unyielding execution.
          </p>

          {/* Magnetic CTA Button */}
          <button
            onClick={onOpenConsultation}
            className="btn-gold-fill px-10 py-5 rounded-full border border-[#c9a962] text-[13px] tracking-[0.25em] uppercase font-semibold text-[#c9a962] flex items-center gap-3 cursor-pointer shadow-2xl shadow-[#c9a962]/10"
          >
            <span>Schedule a Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Contact Direct Line Badges */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-[11px] font-mono text-[#8a8a8a] tracking-[0.15em] uppercase">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#c9a962]" />
              <span>DIRECT EXECUTIVE DESK: +44 20 7946 0912</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#c9a962]" />
              <span>CONFIDENTIAL INQUIRY: PARTNERS@KILNVAULT.COM</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
