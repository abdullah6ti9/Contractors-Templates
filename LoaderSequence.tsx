import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderSequenceProps {
  onComplete: () => void;
}

export const LoaderSequence: React.FC<LoaderSequenceProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 2.2s total duration sequence
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400); // allow fade out transition
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

          <div className="relative flex flex-col items-center max-w-xl w-full px-8">
            {/* Horizontal Gold Line Drawing Animation */}
            <svg className="w-full h-1 overflow-visible mb-8" viewBox="0 0 400 2">
              <motion.line
                x1="0"
                y1="1"
                x2="400"
                y2="1"
                stroke="#c9a962"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </svg>

            {/* Firm Name with letter-spacing collapsing from 0.5em to 0.1em */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.6em', y: 10 }}
              animate={{ opacity: 1, letterSpacing: '0.25em', y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="font-serif text-3xl md:text-5xl tracking-[0.25em] text-[#f5f5f0] font-light uppercase">
                KILN <span className="text-[#c9a962] font-serif">&amp;</span> VAULT
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-[11px] tracking-[0.3em] text-[#8a8a8a] uppercase mt-3 font-medium"
              >
                Architectural Engineering &amp; Construction
              </motion.p>
            </motion.div>

            {/* Framing bottom subtle line */}
            <svg className="w-full h-1 overflow-visible mt-8" viewBox="0 0 400 2">
              <motion.line
                x1="200"
                y1="1"
                x2="200"
                y2="1"
                stroke="#c9a962"
                strokeWidth="1"
                animate={{ x1: 0, x2: 400 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
