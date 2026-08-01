import React from 'react';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate, onOpenConsultation }) => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'The Vision', target: 'hero' },
    { label: 'The Credentials', target: 'credentials' },
    { label: 'Engineering Capabilities', target: 'capabilities' },
    { label: 'The Journey Framework', target: 'journey' },
    { label: 'Featured Proof', target: 'proof' },
    { label: 'Consultation Portal', target: 'inquire' },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] text-[#f5f5f0] pt-20 pb-12 border-t border-[#1f1f1f] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Left: Brand Identity & Tagline (Cols 1-5) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <a href="#hero" onClick={(e) => { e.preventDefault(); onNavigate('hero'); }} className="inline-block mb-4">
                <span className="font-serif text-3xl tracking-[0.2em] font-light uppercase text-[#f5f5f0]">
                  KILN <span className="text-[#c9a962] font-serif">&amp;</span> VAULT
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#8a8a8a] uppercase mt-1 font-mono">
                  Master Construction &amp; Structural Engineering
                </span>
              </a>

              <p className="text-sm text-[#8a8a8a] font-light max-w-sm leading-relaxed mt-4">
                Constructing landmark civil edifices, luxury private compounds, and resilient commercial superstructures worldwide since 1999.
              </p>
            </div>

            <div className="mt-8">
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#c9a962] uppercase block mb-2">
                ACCIDENTAL SAFETY &amp; QUALITY STANDARDS
              </span>
              <p className="text-xs text-[#8a8a8a] font-mono">
                ISO 9001:2015 • ISO 14001 • BREEAM OUTSTANDING • LEED PLATINUM
              </p>
            </div>
          </div>

          {/* Center: Vertical Navigation Links (Cols 6-8) */}
          <div className="md:col-span-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase block mb-6">
              NAVIGATION
            </span>

            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => onNavigate(link.target)}
                    className="text-sm text-[#b0b0b0] hover:text-[#c9a962] transition-colors hover-underline-gold py-0.5 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Global Offices & Direct Contact (Cols 9-12) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase block mb-6">
                GLOBAL EXECUTIVE OFFICES
              </span>

              <div className="space-y-4 text-xs font-mono text-[#b0b0b0]">
                <div>
                  <span className="text-[#f5f5f0] uppercase tracking-wider block">LONDON</span>
                  <span className="text-[#8a8a8a]">45 Mayfair Square, Mayfair, W1J 8AJ</span>
                </div>
                <div>
                  <span className="text-[#f5f5f0] uppercase tracking-wider block">GENEVA</span>
                  <span className="text-[#8a8a8a]">Rue du Rhône 14, 1204 Genève</span>
                </div>
                <div>
                  <span className="text-[#f5f5f0] uppercase tracking-wider block">NEW YORK</span>
                  <span className="text-[#8a8a8a]">520 Madison Avenue, 32nd Floor, NY 10022</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1f1f1f]">
              <button
                onClick={onOpenConsultation}
                className="text-xs font-mono text-[#c9a962] hover:text-[#f5f5f0] uppercase tracking-[0.15em] cursor-pointer"
              >
                REQUEST CONFIDENTIAL CAD AUDIT →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Gold Line Divider & Text-only Social Links */}
        <div className="border-t border-[#c9a962]/30 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8a8a8a] gap-4">
          <div>
            © {currentYear} KILN &amp; VAULT ENGINEERING LTD. ALL RIGHTS RESERVED.
          </div>

          {/* Text-Only Social Links */}
          <div className="flex items-center gap-6 uppercase tracking-[0.15em]">
            <a href="#hero" className="hover:text-[#c9a962] transition-colors">ARCHDAILY</a>
            <a href="#hero" className="hover:text-[#c9a962] transition-colors">LINKEDIN</a>
            <a href="#hero" className="hover:text-[#c9a962] transition-colors">AWWWARDS</a>
            <a href="#hero" className="hover:text-[#c9a962] transition-colors">DEZEEN</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
