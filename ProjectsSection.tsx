import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../data/firmData';
import { ArrowUpRight, Layers, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../App';

interface ProjectsSectionProps {
  onSelectProject: (project: any) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [wireframeMode, setWireframeMode] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (reducedMotion) {
      // Un-hide everything for reduced motion users
      sectionRef.current.querySelectorAll('.project-item, .project-text, .project-img').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.clipPath = 'inset(0)';
      });
      return;
    }

    const items = sectionRef.current.querySelectorAll('.project-item');
    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const img = item.querySelector('.project-img');
        const text = item.querySelector('.project-text');

        // Clip-path reveal for images
        gsap.fromTo(
          img,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Parallax on images
        const innerImg = img?.querySelector('img');
        if (innerImg) {
          gsap.to(innerImg, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }

        // Text fade up
        if (text) {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const wireframeFilter = wireframeMode
    ? 'grayscale(100%) brightness(1.5) contrast(1.8)'
    : 'brightness(0.65) contrast(1.15)';

  return (
    <section id="proof" ref={sectionRef} className="w-full bg-[#0a0a0a] py-24 md:py-36 border-b border-[#1f1f1f] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#c9a962]" />
              <span className="text-[11px] tracking-[0.25em] text-[#c9a962] font-mono uppercase">
                THE PROOF
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f5f5f0] font-normal tracking-tight">
              Featured Portfolio
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-[#141414] p-1.5 border border-[#1f1f1f] rounded-full self-start md:self-auto">
            <button
              onClick={() => setWireframeMode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.15em] uppercase transition-all cursor-pointer ${
                !wireframeMode ? 'bg-[#c9a962] text-[#0a0a0a] font-medium' : 'text-[#8a8a8a] hover:text-[#f5f5f0]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>REALITY</span>
            </button>
            <button
              onClick={() => setWireframeMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.15em] uppercase transition-all cursor-pointer ${
                wireframeMode ? 'bg-[#c9a962] text-[#0a0a0a] font-medium' : 'text-[#8a8a8a] hover:text-[#f5f5f0]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>CAD BLUEPRINT</span>
            </button>
          </div>
        </div>

        <div className="space-y-20">
          {/* Project 1 */}
          {PROJECTS[0] && (
            <div
              onClick={() => onSelectProject(PROJECTS[0])}
              className="project-item grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group"
            >
              <div className="lg:col-span-7 relative h-[420px] md:h-[540px] overflow-hidden border border-[#1f1f1f] group-hover:border-[#c9a962] transition-colors duration-500 project-img">
                <img
                  src={PROJECTS[0].image}
                  alt={PROJECTS[0].title}
                  className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  style={{ filter: wireframeFilter, transform: 'translateY(0)' }}
                />
                <div className="absolute inset-0 bg-blueprint-grid opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 border border-[#1f1f1f] text-[10px] font-mono text-[#c9a962] uppercase tracking-[0.2em]">
                  {PROJECTS[0].category}
                </div>
              </div>

              <div className="project-text lg:col-span-5 flex flex-col justify-between h-full py-4 lg:pl-6">
                <div>
                  <div className="text-[11px] font-mono text-[#8a8a8a] uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                    <span className="text-[#c9a962]">{PROJECTS[0].location}</span>
                    <span>•</span>
                    <span>{PROJECTS[0].year}</span>
                    <span>•</span>
                    <span className="text-[#f5f5f0]">{PROJECTS[0].value}</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f5f0] group-hover:text-[#c9a962] transition-colors mb-4 font-normal hover-underline-gold inline-block">
                    {PROJECTS[0].title}
                  </h3>
                  <p className="text-[#b0b0b0] font-light text-base leading-relaxed mb-6">
                    {PROJECTS[0].description}
                  </p>
                </div>
                <div className="border-t border-[#1f1f1f] pt-4 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a8a8a] group-hover:text-[#c9a962] transition-colors">
                  <span>INSPECT ENGINEERING SPECS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          )}

          {/* Project 2 */}
          {PROJECTS[1] && (
            <div
              onClick={() => onSelectProject(PROJECTS[1])}
              className="project-item grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group"
            >
              <div className="project-text lg:col-span-5 flex flex-col justify-between h-full py-4 lg:pr-6 order-2 lg:order-1">
                <div>
                  <div className="text-[11px] font-mono text-[#8a8a8a] uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                    <span className="text-[#c9a962]">{PROJECTS[1].location}</span>
                    <span>•</span>
                    <span>{PROJECTS[1].year}</span>
                    <span>•</span>
                    <span className="text-[#f5f5f0]">{PROJECTS[1].value}</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f5f0] group-hover:text-[#c9a962] transition-colors mb-4 font-normal hover-underline-gold inline-block">
                    {PROJECTS[1].title}
                  </h3>
                  <p className="text-[#b0b0b0] font-light text-base leading-relaxed mb-6">
                    {PROJECTS[1].description}
                  </p>
                </div>
                <div className="border-t border-[#1f1f1f] pt-4 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a8a8a] group-hover:text-[#c9a962] transition-colors">
                  <span>INSPECT ENGINEERING SPECS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              <div className="lg:col-span-7 relative h-[420px] md:h-[540px] overflow-hidden border border-[#1f1f1f] group-hover:border-[#c9a962] transition-colors duration-500 order-1 lg:order-2 project-img">
                <img
                  src={PROJECTS[1].image}
                  alt={PROJECTS[1].title}
                  className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  style={{ filter: wireframeFilter, transform: 'translateY(0)' }}
                />
                <div className="absolute inset-0 bg-blueprint-grid opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute top-4 left-4 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 border border-[#1f1f1f] text-[10px] font-mono text-[#c9a962] uppercase tracking-[0.2em]">
                  {PROJECTS[1].category}
                </div>
              </div>
            </div>
          )}

          {/* Project 3: Full Width */}
          {PROJECTS[2] && (
            <div
              onClick={() => onSelectProject(PROJECTS[2])}
              className="project-item relative h-[380px] md:h-[480px] border border-[#1f1f1f] group-hover:border-[#c9a962] overflow-hidden cursor-pointer group transition-colors duration-500 project-img"
            >
              <img
                src={PROJECTS[2].image}
                alt={PROJECTS[2].title}
                className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                style={{ filter: wireframeFilter, transform: 'translateY(0)' }}
              />
              <div className="absolute inset-0 bg-blueprint-grid opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent p-8 md:p-12 flex flex-col justify-end">
                <div className="max-w-2xl">
                  <div className="text-[10px] font-mono text-[#c9a962] uppercase tracking-[0.25em] mb-2 flex items-center gap-3">
                    <span>{PROJECTS[2].category}</span>
                    <span>•</span>
                    <span>{PROJECTS[2].location}</span>
                    <span>•</span>
                    <span>{PROJECTS[2].value}</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f5f5f0] group-hover:text-[#c9a962] transition-colors mb-3">
                    {PROJECTS[2].title}
                  </h3>
                  <p className="text-[#b0b0b0] font-light text-sm md:text-base line-clamp-2">
                    {PROJECTS[2].description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Project 4 */}
          {PROJECTS[3] && (
            <div
              onClick={() => onSelectProject(PROJECTS[3])}
              className="project-item grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group"
            >
              <div className="lg:col-span-6 relative h-[380px] md:h-[450px] overflow-hidden border border-[#1f1f1f] group-hover:border-[#c9a962] transition-colors duration-500 project-img">
                <img
                  src={PROJECTS[3].image}
                  alt={PROJECTS[3].title}
                  className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  style={{ filter: wireframeFilter, transform: 'translateY(0)' }}
                />
                <div className="absolute inset-0 bg-blueprint-grid opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              </div>

              <div className="project-text lg:col-span-6 flex flex-col justify-center py-4 lg:pl-6">
                <div className="text-[11px] font-mono text-[#8a8a8a] uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                  <span className="text-[#c9a962]">{PROJECTS[3].location}</span>
                  <span>•</span>
                  <span>{PROJECTS[3].year}</span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f5f0] group-hover:text-[#c9a962] transition-colors mb-4 font-normal">
                  {PROJECTS[3].title}
                </h3>
                <p className="text-[#b0b0b0] font-light text-base leading-relaxed mb-6">
                  {PROJECTS[3].description}
                </p>
                <div className="border-t border-[#1f1f1f] pt-4 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a8a8a] group-hover:text-[#c9a962] transition-colors">
                  <span>INSPECT ENGINEERING SPECS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
