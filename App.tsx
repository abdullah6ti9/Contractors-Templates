import { useEffect, useState, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoaderSequence } from './components/LoaderSequence';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBarSection } from './components/TrustBarSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CTASection } from './components/CTASection';
import { FooterSection } from './components/FooterSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Project } from './types';

gsap.registerPlugin(ScrollTrigger);

const ReducedMotionContext = createContext(false);
export const useReducedMotion = () => useContext(ReducedMotionContext);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initialize Lenis + GSAP ScrollTrigger sync
  useEffect(() => {
    if (reducedMotion) {
      // Disable smooth scroll for reduced motion users
      document.documentElement.style.scrollBehavior = 'auto';
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    if (reducedMotion) {
      element.scrollIntoView({ behavior: 'auto' });
    } else {
      lenisRef.current?.scrollTo(element, { offset: -80, duration: 1.5 });
    }
  };

  // Lock body scroll when modals are open
  useEffect(() => {
    if (selectedProject || consultationOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
  }, [selectedProject, consultationOpen]);

  return (
    <ReducedMotionContext.Provider value={reducedMotion}>
      <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0] selection:bg-[#c9a962] selection:text-[#0a0a0a] font-sans">
        {loading && <LoaderSequence onComplete={() => setLoading(false)} />}

        <div className={`transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar
            onOpenConsultation={() => setConsultationOpen(true)}
            onNavigate={handleNavigate}
          />

          <HeroSection
            onStartProject={() => setConsultationOpen(true)}
            onExploreWork={() => handleNavigate('proof')}
          />

          <TrustBarSection />
          <ServicesSection onSelectService={() => setConsultationOpen(true)} />
          <ProcessSection />
          <ProjectsSection onSelectProject={setSelectedProject} />
          <TestimonialsSection />
          <CTASection onOpenConsultation={() => setConsultationOpen(true)} />

          <FooterSection
            onNavigate={handleNavigate}
            onOpenConsultation={() => setConsultationOpen(true)}
          />
        </div>

        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenConsultation={() => setConsultationOpen(true)}
        />

        <ConsultationModal
          isOpen={consultationOpen}
          onClose={() => setConsultationOpen(false)}
        />
      </div>
    </ReducedMotionContext.Provider>
  );
}
