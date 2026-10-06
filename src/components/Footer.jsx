import React from 'react';
import { ShieldCheck, ArrowRight, ArrowUp, Sparkles, Building2, MapPin, GraduationCap } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-slate-800">
      {/* Pre-Footer Action Banner */}
      <div className="border-b border-slate-800/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive MBA Simulation Platform</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            HIREREADY COIMBATORE
          </h2>

          <p className="mt-3 text-xl sm:text-2xl font-bold text-brand-300 tracking-tight">
            “From vacancy to verified talent.”
          </p>

          <p className="mt-4 text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            A technology-enabled recruitment model designed to help Coimbatore SMEs fill difficult technical and operational manufacturing roles with pre-screened candidates.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('business-model')}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-navy-950 bg-gradient-to-r from-brand-300 to-teal-400 hover:from-brand-200 hover:to-teal-300 transition-all shadow-md flex items-center gap-2"
            >
              <span>View Business Model</span>
              <ArrowRight className="w-4 h-4 text-navy-950" />
            </button>
            <button
              onClick={() => onNavigate('talent-pool')}
              className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all shadow-subtle flex items-center gap-2"
            >
              <span>Explore Candidate Pool</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Transparency Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 text-xs">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">HireReady</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Lean, technology-assisted, verified technical talent sourcing for Coimbatore SMEs. Focus on CNC, Quality, and Industrial Maintenance.
            </p>
            <div className="mt-4 flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Quick Chapters */}
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-[11px]">
              Case Study Chapters
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-brand-300 transition-colors">
                  7-Step Verification Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('employers')} className="hover:text-brand-300 transition-colors">
                  Employer Vacancy Calibrator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('candidates')} className="hover:text-brand-300 transition-colors">
                  Digital Candidate Passport
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('talent-pool')} className="hover:text-brand-300 transition-colors">
                  Verified Candidate Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('competitors')} className="hover:text-brand-300 transition-colors">
                  Competitor Saturation Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Business & Financial Modeling */}
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-[11px]">
              Financials & Strategy
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('market-intel')} className="hover:text-brand-300 transition-colors">
                  Secondary Demand Snapshot (N=620)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('business-model')} className="hover:text-brand-300 transition-colors">
                  ₹5 Lakh Feasibility Simulation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('decision')} className="hover:text-brand-300 transition-colors">
                  Launch Decision Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('launch-plan')} className="hover:text-brand-300 transition-colors">
                  90-Day Execution Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analytics')} className="hover:text-brand-300 transition-colors">
                  MBA Analytics Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Transparency */}
          <div>
            <span className="font-bold text-white uppercase tracking-wider block mb-3 text-[11px] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-brand-400" />
              Academic Credentials
            </span>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-white">MBA Business Simulation Project</p>
              <p className="text-brand-300">Specialization: HR & Business Analytics</p>
              <p className="text-slate-400">Setting: Coimbatore MSME Manufacturing Clusters</p>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                All mock figures clearly labelled illustrative for curriculum demonstration.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} HireReady Coimbatore. MBA Business Simulation & HR Case Study Demo.
          </div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5"
            title="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
