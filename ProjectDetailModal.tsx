import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, Check, Shield, Layers, Calendar, DollarSign, MapPin, Building, ArrowRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'cad' | 'materials'>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10">
        
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#141414] border border-[#c9a962]/40 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f] bg-[#0a0a0a]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#c9a962] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase">
                CAD SPEC SHEET • {project.id.toUpperCase()}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#8a8a8a] hover:text-[#c9a962] hover:bg-[#1f1f1f] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Banner Image */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden border-b border-[#1f1f1f]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.6) contrast(1.15)' }}
            />
            <div className="absolute inset-0 bg-blueprint-grid opacity-30 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#c9a962] uppercase bg-[#0a0a0a]/90 px-3 py-1 border border-[#c9a962]/40 inline-block mb-2">
                  {project.category} ARCHITECTURE
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#f5f5f0] font-normal">
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#f5f5f0] bg-[#0a0a0a]/90 p-3 border border-[#1f1f1f]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a962]" />
                  <span>{project.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#c9a962]" />
                  <span>{project.value}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#1f1f1f] bg-[#0a0a0a]">
            {[
              { id: 'overview', label: 'STRUCTURAL OVERVIEW' },
              { id: 'cad', label: 'CAD & MATERIAL SPECS' },
              { id: 'materials', label: 'SPECIALIZED FEATURES' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 text-[11px] font-mono tracking-[0.15em] uppercase border-r border-[#1f1f1f] transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#141414] text-[#c9a962] border-b-2 border-b-[#c9a962] font-medium'
                    : 'text-[#8a8a8a] hover:text-[#f5f5f0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8 space-y-8 max-h-[50vh] overflow-y-auto">
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase mb-2">
                    ARCHITECTURAL &amp; ENGINEERING BRIEF
                  </h3>
                  <p className="text-base text-[#b0b0b0] font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#1f1f1f]">
                  <div className="bg-[#0a0a0a] p-4 border border-[#1f1f1f]">
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">TOTAL AREA</span>
                    <span className="font-serif text-xl text-[#f5f5f0]">{project.specs.sqft}</span>
                  </div>
                  <div className="bg-[#0a0a0a] p-4 border border-[#1f1f1f]">
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">ARCHITECT OF RECORD</span>
                    <span className="font-serif text-lg text-[#f5f5f0]">{project.architect}</span>
                  </div>
                  <div className="bg-[#0a0a0a] p-4 border border-[#1f1f1f]">
                    <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">EXECUTION TIMELINE</span>
                    <span className="font-serif text-xl text-[#c9a962]">{project.specs.completionDuration}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cad' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#0a0a0a] p-5 border border-[#1f1f1f] space-y-2">
                  <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">CONCRETE GRADE &amp; FORM</span>
                  <span className="font-serif text-lg text-[#f5f5f0] block">{project.specs.concreteGrade}</span>
                  <p className="text-xs text-[#8a8a8a] font-light">Laboratory slump-tested with non-destructive radar validation.</p>
                </div>

                <div className="bg-[#0a0a0a] p-5 border border-[#1f1f1f] space-y-2">
                  <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">STRUCTURAL STEEL TONNAGE</span>
                  <span className="font-serif text-lg text-[#f5f5f0] block">{project.specs.steelTonnage}</span>
                  <p className="text-xs text-[#8a8a8a] font-light">High-yield EN 1090-1 Execution Class 4 structural framing.</p>
                </div>

                <div className="bg-[#0a0a0a] p-5 border border-[#1f1f1f] space-y-2">
                  <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">SUSTAINABILITY RATING</span>
                  <span className="font-serif text-lg text-[#c9a962] block">{project.specs.leedStatus}</span>
                  <p className="text-xs text-[#8a8a8a] font-light">Zero site waste diverted to landfill during civil construction.</p>
                </div>

                <div className="bg-[#0a0a0a] p-5 border border-[#1f1f1f] space-y-2">
                  <span className="text-[10px] font-mono text-[#8a8a8a] uppercase block">STRUCTURAL GRID GEOMETRY</span>
                  <span className="font-serif text-lg text-[#f5f5f0] block">{project.specs.structuralGrid}</span>
                  <p className="text-xs text-[#8a8a8a] font-light">BIM Level 3 digital twin integrated coordinate system.</p>
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-4">
                <h3 className="text-[11px] font-mono tracking-[0.2em] text-[#c9a962] uppercase mb-4">
                  SPECIALIZED ARCHITECTURAL FEATURES
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-[#0a0a0a] border border-[#1f1f1f]">
                      <div className="w-5 h-5 rounded-full bg-[#c9a962]/20 border border-[#c9a962] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#c9a962]" />
                      </div>
                      <span className="text-xs font-mono text-[#f5f5f0] leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#0a0a0a] border-t border-[#1f1f1f] gap-4">
            <div className="text-xs font-mono text-[#8a8a8a]">
              CONFIDENTIAL CAD SPEC SHEET • CERTIFIED BY KILN &amp; VAULT
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto btn-gold-fill px-6 py-3 rounded-full border border-[#c9a962] text-[11px] tracking-[0.2em] uppercase font-semibold text-[#c9a962] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Commission Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
