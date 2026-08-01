import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STAGES } from '../data/firmData';
import { Compass, PenTool, Cpu, Hammer, Key, ArrowRight, Check } from 'lucide-react';
import { useReducedMotion } from '../App';

export const ProcessSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // GSAP ScrollTrigger timeline sync
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          setProgressPercent(progress * 100);
          
          // Map 0 -> 1 progress to 5 discrete stages
          const numStages = PROCESS_STAGES.length;
          const currentStageIndex = Math.min(
            Math.floor(progress * numStages),
            numStages - 1
          );
          setActiveStageId(PROCESS_STAGES[currentStageIndex].id);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Jump to specific stage
  const handleStageClick = (stageIndex: number) => {
    setActiveStageId(PROCESS_STAGES[stageIndex].id);
    setProgressPercent((stageIndex / (PROCESS_STAGES.length - 1)) * 100);

    if (sectionRef.current && !reducedMotion) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const start = scrollTop + rect.top;
      const totalScrollableHeight = rect.height - window.innerHeight;
      
      if (totalScrollableHeight > 0) {
        const targetY = start + (stageIndex / (PROCESS_STAGES.length - 1)) * totalScrollableHeight;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const getIcon = (iconName: string, active: boolean) => {
    const cls = `w-6 h-6 transition-colors duration-300 ${active ? 'text-[#c9a962]' : 'text-[#8a8a8a]'}`;
    switch (iconName) {
      case 'Compass':
        return <Compass className={cls} />;
      case 'PenTool':
        return <PenTool className={cls} />;
      case 'Cpu':
        return <Cpu className={cls} />;
      case 'Hammer':
        return <Hammer className={cls} />;
      case 'Key':
        return <Key className={cls} />;
      default:
        return <Compass className={cls} />;
    }
  };

  const activeStage = PROCESS_STAGES.find((s) => s.id === activeStageId) || PROCESS_STAGES[0];
  const activeIndex = PROCESS_STAGES.findIndex((s) => s.id === activeStageId);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className={`w-full bg-[#141414] border-b border-[#1f1f1f] relative ${
        reducedMotion ? 'py-24 md:py-36' : 'min-h-[250vh] md:min-h-[300vh]'
      }`}
    >
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-[0.03] pointer-events-none" />

      {/* Sticky Container */}
      <div
        ref={stickyContainerRef}
        className={`${
          reducedMotion ? 'relative' : 'sticky top-0 min-h-screen py-16 md:py-24 flex flex-col justify-center'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          
          {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#c9a962]" />
              <span className="text-[11px] tracking-[0.25em] text-[#c9a962] font-mono uppercase">
                THE JOURNEY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f5f5f0] font-normal tracking-tight">
              5-Stage Execution Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Vertical Timeline Stage Selector (Cols 1-5) */}
            <div className="lg:col-span-5 relative">
              {/* Vertical Progress Line Track */}
              <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-[#1f1f1f]">
                <div
                  className="w-full bg-[#c9a962] transition-all duration-300 origin-top"
                  style={{
                    height: reducedMotion
                      ? `${(activeIndex / (PROCESS_STAGES.length - 1)) * 100}%`
                      : `${progressPercent}%`,
                  }}
                />
              </div>

              <div className="space-y-4 md:space-y-6 relative z-10">
                {PROCESS_STAGES.map((stage, idx) => {
                  const isActive = stage.id === activeStageId;

                  return (
                    <div
                      key={stage.id}
                      onClick={() => handleStageClick(idx)}
                      className={`flex items-start gap-6 p-4 rounded-lg cursor-pointer transition-all duration-500 ${
                        isActive
                          ? 'bg-[#0a0a0a] border border-[#c9a962]/50 shadow-xl shadow-[#c9a962]/5 scale-[1.02]'
                          : 'opacity-40 hover:opacity-80'
                      }`}
                    >
                      {/* Stage Badge Icon */}
                      <div
                        className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isActive ? 'border-[#c9a962] bg-[#c9a962]/10' : 'border-[#1f1f1f] bg-[#0a0a0a]'
                        }`}
                      >
                        {getIcon(stage.iconName, isActive)}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono tracking-[0.2em] text-[#c9a962]">
                            STAGE {stage.stageNumber}
                          </span>
                          <span className="text-xs font-mono text-[#8a8a8a]">•</span>
                          <span className="text-xs font-mono text-[#8a8a8a]">{stage.subtitle}</span>
                        </div>
                        <h3 className={`font-serif text-2xl mt-1 transition-colors duration-300 ${
                          isActive ? 'text-[#f5f5f0]' : 'text-[#8a8a8a]'
                        }`}>
                          {stage.name}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Active Stage Imagery & Blueprint Deliverables (Cols 6-12) */}
            <div className="lg:col-span-7 bg-[#0a0a0a] border border-[#1f1f1f] p-8 md:p-12 relative min-h-[520px] flex flex-col justify-between shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  {/* Stage Header */}
                  <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-6">
                    <div>
                      <span className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase block mb-1">
                        PHASE {activeStage.stageNumber} OF 05
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl text-[#f5f5f0]">
                        {activeStage.name}: {activeStage.subtitle}
                      </h3>
                    </div>
                    <div className="text-right hidden sm:block">
                      <span className="text-[11px] font-mono text-[#8a8a8a] uppercase tracking-[0.15em]">
                        AUDITABLE DELIVERABLE
                      </span>
                    </div>
                  </div>

                  {/* Stage Image with Reveal Effect */}
                  <div className="relative h-60 md:h-72 overflow-hidden border border-[#1f1f1f] group">
                    <img
                      src={activeStage.image}
                      alt={activeStage.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'brightness(0.55) contrast(1.15)' }}
                    />
                    <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
                    
                    {/* Floating Specs Tag */}
                    <div className="absolute bottom-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-md px-4 py-2 border border-[#c9a962]/50 text-[10px] font-mono tracking-[0.15em] text-[#c9a962] uppercase">
                      STAGE SPEC: {activeStage.name.toUpperCase()}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#b0b0b0] text-base leading-relaxed font-light">
                    {activeStage.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="border-t border-[#1f1f1f] pt-6">
                    <h4 className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase mb-4">
                      MANDATORY STAGE DELIVERABLES
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeStage.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs font-mono text-[#f5f5f0]">
                          <div className="w-4 h-4 rounded-full bg-[#c9a962]/20 border border-[#c9a962] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-[#c9a962]" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Stage Navigation Control */}
              <div className="flex items-center justify-between border-t border-[#1f1f1f] pt-6 mt-8">
                <button
                  disabled={activeIndex === 0}
                  onClick={() => handleStageClick(activeIndex - 1)}
                  className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8a8a8a] hover:text-[#c9a962] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  ← PREVIOUS STAGE
                </button>

                <div className="flex items-center gap-2 font-mono text-xs text-[#8a8a8a]">
                  <span className="text-[#c9a962]">0{activeStageId}</span>
                  <span>/</span>
                  <span>05</span>
                </div>

                <button
                  disabled={activeIndex === PROCESS_STAGES.length - 1}
                  onClick={() => handleStageClick(activeIndex + 1)}
                  className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#c9a962] hover:text-[#f5f5f0] disabled:opacity-30 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
                >
                  <span>NEXT STAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
