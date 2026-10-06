import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  Wrench, 
  Cpu, 
  ChevronRight, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles,
  Layers,
  ArrowDown
} from 'lucide-react';

export default function Hero({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('sideBySide'); // 'sideBySide' | 'before' | 'after'

  const kpis = [
    {
      label: 'Verified Candidates',
      value: '25+',
      badge: 'Demo / Target Metric',
      subtext: 'Pre-screened technical talent pool',
      icon: Users
    },
    {
      label: 'Average Shortlist Size',
      value: '3-4',
      badge: 'Demo / Target Metric',
      subtext: 'High-fit candidates per vacancy',
      icon: Layers
    },
    {
      label: 'Technical Target Roles',
      value: '7+',
      badge: 'Focus Profiles',
      subtext: 'CNC, Quality, Maintenance & Fitters',
      icon: Wrench
    },
    {
      label: 'Shortlist Turnaround',
      value: '48-72h',
      badge: 'Demo / Target Metric',
      subtext: 'From job brief to verified profiles',
      icon: Clock
    }
  ];

  const beforeSteps = [
    { title: 'Company receives 100+ unvetted CVs', detail: 'Bulk portal spam with inflated resumes' },
    { title: 'Time-consuming manual screening', detail: 'Plant engineers waste 15+ hrs filtering' },
    { title: 'Unqualified candidates at interview', detail: 'Fails basic machine operating test on floor' },
    { title: 'Severe interview delays & no-shows', detail: 'Candidates ghost or reject rotational shifts' },
    { title: 'Late-stage candidate dropouts', detail: 'Counter-offers or notice period mismatches' },
    { title: 'Long & costly hiring cycle (45+ days)', detail: 'Unproductive idle machinery and lost orders' }
  ];

  const afterSteps = [
    { title: 'Precise SME Job Requirement', detail: 'Detailed machine controller & skill specs captured' },
    { title: 'Targeted Candidate Sourcing', detail: 'Tapped from regional ITI networks & verified talent pool' },
    { title: 'AI-Assisted CV Screening', detail: 'Instant parsing of controller, tooling & salary parameters' },
    { title: 'Human & Background Verification', detail: 'Payslips, past employer tenure & relieving letters verified' },
    { title: 'Technical & Shopfloor Assessment', detail: '20-point practical machine & dimensional accuracy rubric' },
    { title: 'Employer-Ready Verified Shortlist', detail: 'Delivered with standardized digital Candidate Passports' },
    { title: 'Focussed 1-Round Interview', detail: 'Zero guesswork; high selection conversion rate' },
    { title: 'Guaranteed Joining & 60-Day Replacement', detail: 'Peace of mind with continuous onboarding support' }
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] -z-10 pointer-events-none opacity-60">
        <div className="absolute top-10 left-10 w-96 h-96 bg-brand-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl"></div>
        <div className="absolute top-40 left-1/3 w-80 h-80 bg-teal-100/50 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Coimbatore Manufacturing & Engineering HR Tech Simulation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-[1.15]">
            HIREREADY <span className="bg-gradient-to-r from-brand-600 to-teal-500 bg-clip-text text-transparent">COIMBATORE</span>
          </h1>

          <p className="mt-3 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            “Verified Talent. Faster Hiring.”
          </p>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            A technology-enabled recruitment model designed to help Coimbatore SMEs fill difficult technical and operational roles with pre-screened candidates.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('employers')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-navy-900 hover:bg-navy-950 shadow-md hover:shadow-teal-glow transition-all flex items-center gap-2"
            >
              <span>Find Verified Talent</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </button>
            <button
              onClick={() => onNavigate('business-model')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-navy-900 bg-white hover:bg-slate-50 border border-slate-300 shadow-subtle hover:border-slate-400 transition-all flex items-center gap-2"
            >
              <span>Explore the ₹5L Model</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Core Value Proposition Callout */}
          <div className="mt-8 inline-block p-4 rounded-2xl bg-white border border-slate-200 shadow-premium">
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Core Value Proposition:
              <span className="text-brand-700 font-extrabold ml-1.5">
                “We don’t sell more CVs. We give employers fewer, verified candidates.”
              </span>
            </p>
          </div>
        </div>

        {/* KPI / Target Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-premium hover:shadow-elevated transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="badge-demo text-[10px]">
                    {kpi.badge}
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-navy-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-sm font-bold text-slate-700 mt-1">
                  {kpi.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {kpi.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Before vs HireReady: High-Impact Visual Comparison Section */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          {/* Background mesh glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase tracking-wider mb-2">
                Workflow Transformation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Before HireReady vs. After HireReady
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                How our lean pre-screening replaces high-friction, unverified hiring cycles with precision shortlists for Coimbatore manufacturing units.
              </p>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-800 border border-slate-700 sm:self-center">
              <button
                onClick={() => setActiveTab('sideBySide')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'sideBySide' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Side by Side
              </button>
              <button
                onClick={() => setActiveTab('before')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'before' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Traditional
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'after' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                HireReady
              </button>
            </div>
          </div>

          {/* Comparative Flow Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* BEFORE HIREREADY CARD */}
            {(activeTab === 'sideBySide' || activeTab === 'before') && (
              <div className="bg-slate-950/60 rounded-2xl p-6 border border-rose-900/40 relative">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-950">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-rose-300">BEFORE HIREREADY</h3>
                      <p className="text-xs text-rose-400/80">Traditional Consultancy / Direct Job Board Chaos</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    High Friction
                  </span>
                </div>

                <div className="space-y-3">
                  {beforeSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-slate-200">
                          {step.title}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-rose-950 text-xs text-rose-300/80 flex items-center justify-between">
                  <span>Outcome: 45–60 day hiring cycle</span>
                  <span className="font-semibold text-rose-400">High Dropouts</span>
                </div>
              </div>
            )}

            {/* AFTER HIREREADY CARD */}
            {(activeTab === 'sideBySide' || activeTab === 'after') && (
              <div className="bg-gradient-to-br from-brand-950/70 via-slate-900 to-navy-950 rounded-2xl p-6 border border-brand-500/40 relative shadow-teal-glow">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-brand-800/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-300 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-brand-200">AFTER HIREREADY</h3>
                      <p className="text-xs text-brand-300/80">Lean, Verified Technical Pipeline</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    High Conversion
                  </span>
                </div>

                <div className="space-y-2.5">
                  {afterSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2 rounded-xl bg-slate-900/90 border border-brand-900/50 hover:border-brand-600/50 transition-all">
                      <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/40 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                          {step.title}
                          {idx === 5 && (
                            <span className="bg-brand-400/20 text-brand-300 text-[10px] px-1.5 py-0.2 rounded border border-brand-400/40">
                              Core Asset
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-brand-800/60 text-xs text-brand-300 flex items-center justify-between">
                  <span>Outcome: 3-5 days to verified interview</span>
                  <span className="font-semibold text-emerald-400">60-Day Replacement Guarantee</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
