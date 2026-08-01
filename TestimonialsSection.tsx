import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/firmData';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="w-full bg-[#141414] py-28 md:py-40 border-b border-[#1f1f1f] relative overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.025] pointer-events-none" />

      {/* Massive Quotation Mark Watermark (5% opacity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18rem] md:text-[28rem] font-serif text-[#f5f5f0]/[0.03] select-none pointer-events-none leading-none">
        “
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#c9a962] uppercase mb-12">
            THE VERDICT • EXECUTIVE TESTIMONIALS
          </span>

          {/* Animated Quote Container */}
          <div className="min-h-[220px] md:min-h-[260px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl"
              >
                <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#f5f5f0] italic font-light leading-snug mb-8">
                  “{current.quote}”
                </blockquote>

                <div className="flex flex-col items-center gap-1">
                  <span className="font-serif text-lg md:text-xl text-[#c9a962]">
                    {current.author}
                  </span>
                  <span className="text-xs font-mono tracking-[0.15em] text-[#8a8a8a] uppercase">
                    {current.title}, {current.company}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#c9a962]/70 uppercase mt-2 border border-[#1f1f1f] px-3 py-1 bg-[#0a0a0a]">
                    PROJECT: {current.projectRef.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Thin Gold Arrows Far Left and Right */}
          <div className="flex items-center gap-8 mt-12">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-[#1f1f1f] hover:border-[#c9a962] flex items-center justify-center text-[#8a8a8a] hover:text-[#c9a962] transition-colors cursor-pointer"
              aria-label="Previous quote"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-[#8a8a8a] tracking-[0.2em]">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-[#1f1f1f] hover:border-[#c9a962] flex items-center justify-center text-[#8a8a8a] hover:text-[#c9a962] transition-colors cursor-pointer"
              aria-label="Next quote"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
