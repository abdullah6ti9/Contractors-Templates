import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const london = now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' });
      setCurrentTime(`${london} BST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Vision', target: 'hero' },
    { label: 'Credentials', target: 'credentials' },
    { label: 'Capabilities', target: 'capabilities' },
    { label: 'Journey', target: 'journey' },
    { label: 'Proof', target: 'proof' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md py-4 border-b border-[#1f1f1f]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Mark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 border border-[#c9a962]/60 flex items-center justify-center relative group-hover:border-[#c9a962] transition-colors">
              <div className="w-3 h-3 bg-[#c9a962] group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.2em] font-light text-[#f5f5f0] uppercase leading-none">
                KILN <span className="text-[#c9a962] font-serif">&amp;</span> VAULT
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#8a8a8a] uppercase mt-1">
                Engineering
              </span>
            </div>
          </a>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className="text-[12px] tracking-[0.2em] uppercase text-[#b0b0b0] hover:text-[#c9a962] transition-colors hover-underline-gold py-1 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action & Office Telemetry */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.15em] text-[#8a8a8a] uppercase font-mono border-r border-[#1f1f1f] pr-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a962] animate-pulse" />
              <span>LON {currentTime}</span>
            </div>

            <button
              onClick={onOpenConsultation}
              className="btn-gold-fill px-5 py-2.5 rounded-full border border-[#c9a962] text-[11px] tracking-[0.2em] uppercase font-medium text-[#c9a962] flex items-center gap-2 cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#f5f5f0] hover:text-[#c9a962] focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#0a0a0a] pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden border-b border-[#1f1f1f]"
          >
            <div className="flex flex-col gap-6">
              <p className="text-[11px] tracking-[0.25em] text-[#c9a962] uppercase font-mono">
                NAVIGATION HIERARCHY
              </p>
              {navItems.map((item, idx) => (
                <button
                  key={item.target}
                  onClick={() => handleNavClick(item.target)}
                  className="flex items-center justify-between py-3 border-b border-[#1f1f1f] text-left cursor-pointer group"
                >
                  <span className="font-serif text-2xl text-[#f5f5f0] group-hover:text-[#c9a962] transition-colors">
                    {item.label}
                  </span>
                  <span className="text-[12px] font-mono text-[#8a8a8a]">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full btn-gold-fill py-4 rounded-full border border-[#c9a962] text-[12px] tracking-[0.2em] uppercase text-center text-[#c9a962] font-medium cursor-pointer"
              >
                Start Your Project
              </button>
              <div className="text-center text-[10px] tracking-[0.2em] text-[#8a8a8a] uppercase font-mono">
                MAYFAIR • GENEVA • MADISON AVE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
