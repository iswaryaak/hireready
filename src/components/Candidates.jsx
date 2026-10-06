import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  ArrowRight, 
  Check, 
  UserCheck, 
  FileCheck2, 
  Target, 
  Building,
  HeartHandshake
} from 'lucide-react';
import candidatesData from '../data/candidates.json';

export default function Candidates({ onOpenPassport }) {
  // Candidate C102 as specifically mandated
  const sampleCandidate = candidatesData.find(c => c.id === 'C102') || candidatesData[0];

  const candidateJourney = [
    { step: 1, label: "Digital Profile", desc: "Submit trade certificate, machinery experience & current payslip", icon: UserCheck },
    { step: 2, label: "Skill Assessment", desc: "Complete 20-point practical machining, tooling & measuring test", icon: Award },
    { step: 3, label: "Verification", desc: "Identity, background, and previous employer tenure authenticated", icon: FileCheck2 },
    { step: 4, label: "Algorithmic Match", desc: "Paired with Coimbatore SMEs offering confirmed salary & shift fit", icon: Target },
    { step: 5, label: "Focused Interview", desc: "Single direct interview with plant manager; zero generic rounds", icon: Building },
    { step: 6, label: "Offer & Joining", desc: "Clear appointment letter, verified compensation & onboarding care", icon: HeartHandshake }
  ];

  return (
    <section id="candidates" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/80 border border-brand-300 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            Candidate Career Portal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Don’t just upload a CV. Become HireReady.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Stop waiting for calls from generic job portals. Get verified once, receive a digital Candidate Passport, and get fast-tracked into Coimbatore's leading engineering plants.
          </p>
        </div>

        {/* 6-Stage Candidate Journey Flow */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              The Transparent 6-Stage Candidate Pathway
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {candidateJourney.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-premium flex flex-col justify-between hover:border-brand-400 transition-all text-center relative group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 border border-brand-100 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider block mb-1">
                      Stage 0{stage.step}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-900 mb-1">
                      {stage.label}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* The Digital Candidate Passport Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Explanation */}
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Standardized Proof Of Competency
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight leading-tight">
              The Digital Candidate Passport
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              Every HireReady candidate is verified through a rigorous dual-layer audit: objective HR credential verification plus practical shopfloor skill evaluation.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 font-bold" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-navy-900">Zero Registration Fees:</strong> We never charge jobseekers for verification, profiling, or interviews.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 font-bold" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-navy-900">Guaranteed Salary Honesty:</strong> Exact expected compensation is locked in with employer prior to interview.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 font-bold" />
                </div>
                <div className="text-xs text-slate-700">
                  <strong className="text-navy-900">Shift Transparency:</strong> No surprise 12-hour shifts without prior mutual agreement.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenPassport(sampleCandidate)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-navy-900 hover:bg-navy-800 text-white transition-all shadow-md flex items-center gap-2"
              >
                <span>Open Full Interactive Passport (Modal)</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-400" />
              </button>
            </div>
          </div>

          {/* Right: Live Interactive Sample Card (C102) */}
          <div className="lg:col-span-7">
            <div className="card-premium p-6 sm:p-8 border-2 border-brand-500/30 relative overflow-hidden bg-white shadow-elevated">
              {/* Top Watermark Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="badge-demo text-[11px]">
                    Demo Candidate
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    HireReady Verified
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  PASSPORT ID: <strong className="text-navy-900">C102</strong>
                </span>
              </div>

              {/* Candidate Bio Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                  SK
                </div>
                <div>
                  <h4 className="text-xl font-bold text-navy-950 flex items-center gap-2">
                    Suresh Kumar M.
                  </h4>
                  <p className="text-xs font-semibold text-brand-700 flex items-center gap-2 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" /> CNC Operator
                    <span className="text-slate-400">•</span>
                    <MapPin className="w-3.5 h-3.5" /> Coimbatore (Peelamedu)
                  </p>
                </div>
              </div>

              {/* Core Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Experience</span>
                  <span className="text-sm font-extrabold text-navy-900">3.2 Years</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Expected CTC</span>
                  <span className="text-sm font-extrabold text-navy-900">₹24,000/mo</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Notice Period</span>
                  <span className="text-sm font-extrabold text-navy-900">15 Days</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Availability</span>
                  <span className="text-sm font-extrabold text-brand-700">15 Days</span>
                </div>
              </div>

              {/* Screening & Readiness Verification Bars */}
              <div className="space-y-3 mb-6 bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">HR Screening & Identity:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                    PASSED
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Technical & Machine Assessment:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-[86%] h-full bg-brand-600 rounded-full"></div>
                    </div>
                    <span className="font-bold text-brand-800">86 / 100</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Shift Readiness (Rotational):</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                    YES
                  </span>
                </div>
              </div>

              {/* Verified Skills Tags */}
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-500 block mb-2">
                  Verified Skills On File
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["CNC", "Fanuc", "Basic Inspection", "Tool Setting", "Boring Operations"].map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-brand-600" />
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
