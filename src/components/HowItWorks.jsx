import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Cpu, 
  Search, 
  Bot, 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function HowItWorks({ onNavigate }) {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: "Employer Submits Vacancy",
      shortDesc: "Submit machine specifications, experience, tooling tolerances, salary band, and shift needs.",
      benefit: "Takes under 2 minutes; captures precise machine shop parameters without generic forms.",
      icon: FileSpreadsheet,
      details: "Unlike traditional agencies that only ask for job titles, HireReady collects controller type (Fanuc, Siemens, Haas), machine axis (3-axis, 4-axis), cycle-time benchmarks, and shift schedule requirements."
    },
    {
      step: 2,
      title: "Job Requirement Analysis",
      shortDesc: "We calibrate market salary benchmarks, skill availability, and technical interview rubrics.",
      benefit: "Realistic expectations set upfront; prevents zero-applicant mandates or salary mismatches.",
      icon: Cpu,
      details: "Our Coimbatore market model checks public benchmarks and SME cluster pay rates. If an employer seeks a 5-year 4-axis programmer at ₹18,000, we immediately counsel them on market rates before sourcing."
    },
    {
      step: 3,
      title: "Targeted Candidate Sourcing",
      shortDesc: "Tapping regional ITI networks, industrial WhatsApp groups, and our active talent pipeline.",
      benefit: "Access to passive operators who don't browse commercial job boards regularly.",
      icon: Search,
      details: "We source operators from Coimbatore's industrial belts (Kurichi, SIDCO, Ganapathy, Peelamedu) and partner with local polytechnic & ITI placement cells for verified tradesmen."
    },
    {
      step: 4,
      title: "AI-Assisted CV Screening",
      shortDesc: "Automated parsing of controller familiarity, notice period, location proximity, and wage alignment.",
      benefit: "Filters out 80% irrelevant applications in seconds, eliminating recruiter manual fatigue.",
      icon: Bot,
      details: "Algorithms score incoming CVs against required machine controls, commute radius, and current compensation, ensuring zero time wasted on misaligned candidates."
    },
    {
      step: 5,
      title: "HR + Skill Verification",
      shortDesc: "Aadhaar authentication, pay slip cross-checks, and a 20-point practical machine rubric test.",
      benefit: "Guarantees the candidate can actually set offsets and operate machines on day one.",
      icon: Award,
      details: "A senior technical evaluator assesses the operator on measuring instruments (Vernier, Micrometer), blue-print reading, tool offsets, and rotational shift readiness."
    },
    {
      step: 6,
      title: "Employer Receives Verified Shortlist",
      shortDesc: "3 to 4 candidates maximum, delivered with comprehensive digital Candidate Passports.",
      benefit: "No resume clutter. Plant head interviews only top-fit, verified performers.",
      icon: CheckCircle,
      details: "Each candidate passport displays practical scores, shift readiness, verified notice period, and transparent evaluator comments. Interviews can be scheduled with 1-click."
    },
    {
      step: 7,
      title: "Joining + Replacement Support",
      shortDesc: "Structured pre-joining engagement, offer acceptance, and a 60-day free replacement guarantee.",
      benefit: "Eliminates no-show risks and shields the employer's capital investment.",
      icon: ShieldCheck,
      details: "We stay in touch with candidates until day 60. If the candidate resigns or fails performance expectations within 60 days, HireReady provides an expedited replacement at no extra charge."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100/70 border border-brand-300 text-brand-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-700" />
            End-To-End Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            How HireReady Works
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            A 7-step technology-assisted, human-verified recruitment pipeline built specifically for precision manufacturing SMEs.
          </p>
        </div>

        {/* 7-Step Interactive Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Step Navigation / Timeline */}
          <div className="lg:col-span-7 space-y-3">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedStep === idx;
              return (
                <div
                  key={item.step}
                  onClick={() => setSelectedStep(idx)}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white border-brand-500 shadow-premium ring-2 ring-brand-500/20'
                      : 'bg-white/60 hover:bg-white border-slate-200/80 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                          Step 0{item.step}
                        </span>
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Active Step
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base font-bold mt-0.5 ${isSelected ? 'text-navy-950' : 'text-slate-800'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {item.shortDesc}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-brand-800">
                        <span className="text-slate-500 font-normal">Employer Benefit:</span>
                        <span>{item.benefit}</span>
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      isSelected ? 'text-brand-600 translate-x-1' : 'text-slate-300'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Step Deep-Dive Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-gradient-to-br from-navy-900 via-navy-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <span className="text-xs font-bold text-brand-300 uppercase tracking-widest">
                  Step Detail Analysis
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-400/30">
                  {selectedStep + 1} of 7
                </span>
              </div>

              <div className="space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-300 border border-brand-400/30 flex items-center justify-center shadow-teal-glow">
                  {React.createElement(steps[selectedStep].icon, { className: 'w-7 h-7' })}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {steps[selectedStep].title}
                  </h3>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                    {steps[selectedStep].details}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <div className="text-xs font-bold text-brand-300 uppercase tracking-wider">
                    Measurable Value to Plant Head
                  </div>
                  <p className="text-xs text-slate-200 font-medium">
                    {steps[selectedStep].benefit}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setSelectedStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-premium flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-navy-900">Ready to post a technical role?</p>
                <p className="text-[11px] text-slate-500">Test our interactive vacancy generator.</p>
              </div>
              <button
                onClick={() => onNavigate('employers')}
                className="px-3.5 py-2 text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-xl border border-brand-200 transition-colors"
              >
                Try Generator
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
