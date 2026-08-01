import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck, FileText, Send, Building2, Calculator } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryCode, setInquiryCode] = useState('');

  // Form State
  const [projectType, setProjectType] = useState('Commercial Headquarters');
  const [scaleSqFt, setScaleSqFt] = useState('50,000 - 150,000 sq ft');
  const [budgetTier, setBudgetTier] = useState('$25M - $50M');
  const [targetLocation, setTargetLocation] = useState('London / Europe');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectBrief, setProjectBrief] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'KV-CAD-' + Math.floor(100000 + Math.random() * 900000);
    setInquiryCode(code);
    setSubmitted(true);
  };

  const projectTypes = [
    { id: 'Commercial Headquarters', label: 'Commercial High-Rise / HQ', desc: '40,000+ sq ft towers & corporate centers' },
    { id: 'Private Estate Compound', label: 'Private Estate / Compound', desc: 'Bespoke residential luxury estates & cliffside compounds' },
    { id: 'Steel & Infrastructure', label: 'Structural Steel & Heavy Civil', desc: 'Long-span structural framing & complex civil engineering' },
    { id: 'Heritage Restoration', label: 'Landmark Historic Restoration', desc: 'Surgical preservation & modern structural underpinning' },
    { id: 'Design-Build Master Plan', label: 'Design-Build Master Plan', desc: 'Unified architectural concept & direct construction' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#141414] border border-[#c9a962]/50 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c9a962] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase">
                EXECUTIVE CONSULTATION &amp; CAD INQUIRY PORTAL
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#8a8a8a] hover:text-[#c9a962] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-6 md:p-10">
              
              {/* Step Indicators */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1f1f1f] text-[10px] font-mono uppercase tracking-[0.2em]">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#c9a962]' : 'text-[#8a8a8a]'}`}>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center border-current">1</span>
                  <span>CLASSIFICATION</span>
                </div>
                <div className={`w-8 h-[1px] ${step >= 2 ? 'bg-[#c9a962]' : 'bg-[#1f1f1f]'}`} />
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#c9a962]' : 'text-[#8a8a8a]'}`}>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center border-current">2</span>
                  <span>SCALE &amp; TIER</span>
                </div>
                <div className={`w-8 h-[1px] ${step >= 3 ? 'bg-[#c9a962]' : 'bg-[#1f1f1f]'}`} />
                <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#c9a962]' : 'text-[#8a8a8a]'}`}>
                  <span className="w-5 h-5 rounded-full border flex items-center justify-center border-current">3</span>
                  <span>EXECUTIVE DOSSIER</span>
                </div>
              </div>

              {/* Step 1: Classification */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#f5f5f0] mb-2 font-normal">
                      Select Project Classification
                    </h3>
                    <p className="text-sm text-[#8a8a8a] font-light">
                      Choose the primary structural domain for your upcoming architectural development.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {projectTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={`p-4 border cursor-pointer transition-all flex items-center justify-between ${
                          projectType === type.id
                            ? 'bg-[#0a0a0a] border-[#c9a962] text-[#f5f5f0]'
                            : 'bg-[#0a0a0a]/50 border-[#1f1f1f] text-[#8a8a8a] hover:border-[#8a8a8a]'
                        }`}
                      >
                        <div>
                          <span className="font-serif text-lg text-[#f5f5f0] block">{type.label}</span>
                          <span className="text-xs text-[#8a8a8a] font-light">{type.desc}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${projectType === type.id ? 'border-[#c9a962] bg-[#c9a962]' : 'border-[#1f1f1f]'}`}>
                          {projectType === type.id && <div className="w-1.5 h-1.5 bg-[#0a0a0a] rounded-full" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="btn-gold-fill px-8 py-3 rounded-full border border-[#c9a962] text-[11px] font-mono tracking-[0.2em] uppercase text-[#c9a962] flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Scale &amp; Budget Tier</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Scale & Budget */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#f5f5f0] mb-2 font-normal">
                      Specify Estimated Scale &amp; Capital Scope
                    </h3>
                    <p className="text-sm text-[#8a8a8a] font-light">
                      KILN &amp; VAULT specializes in capital developments ranging from $10M to $250M+.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-mono text-[#c9a962] uppercase tracking-[0.2em] block mb-2">
                        ESTIMATED BUILDING AREA
                      </label>
                      <select
                        value={scaleSqFt}
                        onChange={(e) => setScaleSqFt(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                      >
                        <option value="Under 20,000 sq ft">Under 20,000 sq ft (Bespoke Residence)</option>
                        <option value="20,000 - 50,000 sq ft">20,000 - 50,000 sq ft (Cultural / Boutique)</option>
                        <option value="50,000 - 150,000 sq ft">50,000 - 150,000 sq ft (Commercial / Estate)</option>
                        <option value="150,000 - 500,000+ sq ft">150,000 - 500,000+ sq ft (Tower / Master Complex)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#c9a962] uppercase tracking-[0.2em] block mb-2">
                        TARGET BUDGET ALLOCATION
                      </label>
                      <select
                        value={budgetTier}
                        onChange={(e) => setBudgetTier(e.target.value)}
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                      >
                        <option value="$10M - $25M">$10M - $25M</option>
                        <option value="$25M - $50M">$25M - $50M</option>
                        <option value="$50M - $100M">$50M - $100M</option>
                        <option value="$100M - $250M+">$100M - $250M+</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#c9a962] uppercase tracking-[0.2em] block mb-2">
                        GEOGRAPHIC JURISDICTION
                      </label>
                      <input
                        type="text"
                        value={targetLocation}
                        onChange={(e) => setTargetLocation(e.target.value)}
                        placeholder="e.g. London, Geneva, New York, Zurich"
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col justify-center bg-[#0a0a0a] p-4 border border-[#1f1f1f]">
                      <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">PRE-ENGINEERING FEASIBILITY</span>
                      <span className="text-xs text-[#c9a962] font-mono mt-1">Includes 3D massing audit &amp; site soil review</span>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 border border-[#1f1f1f] text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a8a8a] hover:text-[#f5f5f0] flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="btn-gold-fill px-8 py-3 rounded-full border border-[#c9a962] text-[11px] font-mono tracking-[0.2em] uppercase text-[#c9a962] flex items-center gap-2 cursor-pointer"
                    >
                      <span>Next: Executive Dossier</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Executive Dossier */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#f5f5f0] mb-2 font-normal">
                      Executive Dossier &amp; Contact Information
                    </h3>
                    <p className="text-sm text-[#8a8a8a] font-light">
                      All communications are protected under strict mutual Non-Disclosure terms.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-[#8a8a8a] uppercase block mb-1">FULL NAME *</label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Lord Marcus Vance"
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#8a8a8a] uppercase block mb-1">CORPORATE / FAMILY ENTITY</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Vance Capital / Private Estate"
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#8a8a8a] uppercase block mb-1">CONFIDENTIAL EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="m.vance@vanceholdings.com"
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-[#8a8a8a] uppercase block mb-1">DIRECT PHONE / SIGNAL *</label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+44 7911 123456"
                        className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#8a8a8a] uppercase block mb-1">PROJECT VISION BRIEF (OPTIONAL)</label>
                    <textarea
                      rows={3}
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      placeholder="Outline any specific architectural aspirations, material preferences, or site constraints..."
                      className="w-full bg-[#0a0a0a] border border-[#1f1f1f] text-[#f5f5f0] p-3 text-sm focus:border-[#c9a962] outline-none resize-none"
                    />
                  </div>

                  <div className="pt-6 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 border border-[#1f1f1f] text-[11px] font-mono tracking-[0.2em] uppercase text-[#8a8a8a] hover:text-[#f5f5f0] flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="btn-gold-fill px-10 py-4 rounded-full border border-[#c9a962] text-[12px] font-mono tracking-[0.2em] uppercase font-semibold text-[#c9a962] flex items-center gap-2 cursor-pointer"
                    >
                      <span>Transmit CAD Inquiry</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

            </form>
          ) : (
            /* Confirmation State */
            <div className="p-8 md:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#c9a962]/10 border border-[#c9a962] flex items-center justify-center mx-auto text-[#c9a962]">
                <CheckCircle className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-mono tracking-[0.25em] text-[#c9a962] uppercase block">
                INQUIRY TRANSMITTED • {inquiryCode}
              </span>

              <h3 className="font-serif text-3xl md:text-4xl text-[#f5f5f0]">
                Proposal Docket Established
              </h3>

              <p className="text-[#b0b0b0] font-light max-w-lg mx-auto text-sm leading-relaxed">
                Thank you, <span className="text-[#f5f5f0] font-medium">{clientName}</span>. Your CAD dossier regarding the <span className="text-[#c9a962] font-medium">{projectType}</span> ({scaleSqFt}) in {targetLocation} has been routed directly to our Senior Managing Principal.
              </p>

              <div className="bg-[#0a0a0a] p-6 border border-[#1f1f1f] max-w-md mx-auto text-left font-mono text-xs space-y-2">
                <div className="flex justify-between border-b border-[#1f1f1f] pb-2">
                  <span className="text-[#8a8a8a]">DOSSIER REF:</span>
                  <span className="text-[#c9a962]">{inquiryCode}</span>
                </div>
                <div className="flex justify-between border-b border-[#1f1f1f] pb-2">
                  <span className="text-[#8a8a8a]">TARGET BUDGET:</span>
                  <span className="text-[#f5f5f0]">{budgetTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8a8a8a]">RESPONSE WINDOW:</span>
                  <span className="text-[#f5f5f0]">Within 12 Business Hours</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onClose}
                  className="btn-gold-fill px-8 py-3 rounded-full border border-[#c9a962] text-[11px] font-mono tracking-[0.2em] uppercase text-[#c9a962] cursor-pointer"
                >
                  Return to Master Site
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
