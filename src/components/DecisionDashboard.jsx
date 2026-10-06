import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Scale, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  ArrowRight, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export default function DecisionDashboard({ onNavigate }) {
  // Interactive Decision Factors scoring state (1 to 5 scale)
  const [factors, setFactors] = useState([
    {
      id: 'demand',
      name: 'Evidence of Technical Hiring Demand',
      weight: 0.20,
      score: 5,
      observation: 'Over 51% of surveyed SME vacancies are in CNC, machining, and technical maintenance with persistent 45+ day vacancy cycles.'
    },
    {
      id: 'competition',
      name: 'Competitive Intensity & Crowding',
      weight: 0.15,
      score: 3, // moderate crowding in general staffing, low in practical pre-screening
      observation: 'General recruitment is hyper-saturated, but verified practical screening has low saturation (25%), offering clear niche entry.'
    },
    {
      id: 'capital',
      name: 'Adequacy of ₹5 Lakh Capital',
      weight: 0.20,
      score: 4,
      observation: 'Sufficient for 6-month lean permanent recruitment runway; strictly inadequate for payroll-backed contract staffing.'
    },
    {
      id: 'revenueModel',
      name: 'Revenue Model Feasibility (Contingency)',
      weight: 0.15,
      score: 4,
      observation: '8.33% - 10% fee on joining aligns with Coimbatore SME buyer expectations; 15-day payment terms reduce bad debt risk.'
    },
    {
      id: 'workingCapital',
      name: 'Working Capital Risk Profile',
      weight: 0.15,
      score: 4, // 4 for permanent, would be 1 for contract staffing
      observation: 'Permanent model carries zero payroll advance liability. Contract staffing would exhaust ₹5 Lakh in month 1.'
    },
    {
      id: 'differentiation',
      name: 'Practical Skill Rubric Differentiation',
      weight: 0.15,
      score: 5,
      observation: 'Candidate Passport with verified machine tolerances directly addresses Coimbatore plant managers’ top pain point.'
    }
  ]);

  const handleScoreChange = (id, newScore) => {
    setFactors(prev => prev.map(f => f.id === id ? { ...f, score: Number(newScore) } : f));
  };

  // Weighted Score Calculation
  const compositeScore = useMemo(() => {
    const raw = factors.reduce((acc, f) => acc + (f.score * f.weight), 0);
    return parseFloat(raw.toFixed(2));
  }, [factors]);

  // Conditional Decision Status
  const decisionResult = useMemo(() => {
    if (compositeScore >= 4.0) {
      return {
        verdict: 'RECOMMENDED: GO (LEAN LAUNCH)',
        statusClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
        badgeColor: 'text-emerald-400',
        summary: 'Market demand, capital runway, and clear technical differentiation justify entering the market under the Lean Permanent model.'
      };
    } else if (compositeScore >= 3.0) {
      return {
        verdict: 'CONDITIONAL: PILOT ONLY (VALIDATE FURTHER)',
        statusClass: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
        badgeColor: 'text-amber-400',
        summary: 'Proceed strictly with a 30-day customer discovery phase before investing significant capital in job portal credits.'
      };
    } else {
      return {
        verdict: 'NOT RECOMMENDED: NO-GO (HIGH CAPITAL RISK)',
        statusClass: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
        badgeColor: 'text-rose-400',
        summary: 'Under current parameters, competitive crowding or capital depletion risk outweighs expected contingency placement revenue.'
      };
    }
  }, [compositeScore]);

  return (
    <section id="decision" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-demo text-[11px]">
              Strategic Evaluation Matrix
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Multi-Factor MBA Decision Model
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            SHOULD HIREREADY LAUNCH?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Rather than presuming a static "YES", this conditional decision dashboard computes viability dynamically across market demand, capital adequacy, working capital exposure, and competitive intensity.
          </p>
        </div>

        {/* Dynamic Composite Verdict Banner */}
        <div className="bg-navy-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${decisionResult.statusClass}`}>
                  <ShieldCheck className="w-4 h-4" />
                  {decisionResult.verdict}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Composite Index: <strong className="text-white text-sm">{compositeScore} / 5.0</strong>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Strategic Recommendation: Lean Permanent Recruitment
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                {decisionResult.summary}
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex-shrink-0 text-center lg:w-64">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Proposed Initial Niche
              </span>
              <div className="text-base font-extrabold text-brand-300">
                Coimbatore SME Manufacturing
              </div>
              <div className="text-xs text-slate-300 mt-1">
                CNC, Quality, Maintenance & Fitters
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-semibold">
                Contingency on Joining (8.33%)
              </div>
            </div>
          </div>
        </div>

        {/* 6 Interactive Weighted Decision Factors */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-premium mb-12">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-navy-950">
                Decision Factors & Sensitivity Testing
              </h3>
              <p className="text-xs text-slate-500">
                Adjust scores (1 = High Risk/Poor, 5 = Highly Favorable) to test strategic sensitivity.
              </p>
            </div>
            <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
              Interactive Scoring
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factors.map((factor) => (
              <div 
                key={factor.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-navy-950 text-xs sm:text-sm">
                      {factor.name}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Weight: {factor.weight * 100}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {factor.observation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 font-medium">Factor Score:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={factor.score}
                      onChange={(e) => handleScoreChange(factor.id, e.target.value)}
                      className="w-24 accent-brand-600 cursor-pointer"
                    />
                    <span className="w-7 text-center font-bold font-mono text-navy-900 bg-slate-100 py-0.5 rounded border border-slate-200">
                      {factor.score}/5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CRITICAL STRATEGIC COMPARISON: Permanent Recruitment vs Contract Staffing */}
        <div className="border border-slate-200 rounded-3xl p-6 sm:p-8 bg-white shadow-premium">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold text-brand-700 uppercase tracking-widest block mb-1">
              Business Model Selection Rationale
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-navy-950">
              Why Lean Permanent Recruitment Wins for a ₹5 Lakh Capital Base
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Analyzing working capital requirements and insolvency risks between Permanent Hiring and Contract Staffing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RECOMMENDED: Permanent Recruitment */}
            <div className="bg-emerald-50/50 rounded-2xl p-6 border-2 border-emerald-300 relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-bold text-emerald-950">
                    RECOMMENDED: Permanent Recruitment
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Fits ₹5L Capital
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>How it works:</strong> The employer takes the candidate on their direct rolls. HireReady charges an 8.33% placement fee payable 15 days post joining.
                </p>
                <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payroll Funding Required:</span>
                    <strong className="text-emerald-700">₹0 (Zero)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Statutory Risk (PF/ESI/Gratuity):</span>
                    <strong className="text-emerald-700">Borne by Employer</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Gross Margin per Placement:</span>
                    <strong className="text-emerald-700">₹20,000 – ₹35,000</strong>
                  </div>
                </div>
                <p className="text-emerald-900 font-medium">
                  <strong>Strategic Verdict:</strong> Ideal for launching with ₹5 Lakh. Sourcing, assessment tools, and runway are funded without the existential threat of unpaid contractor payrolls.
                </p>
              </div>
            </div>

            {/* AVOID: Contract Staffing */}
            <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-200 relative">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <h4 className="text-base font-bold text-rose-950">
                    AVOID AT LAUNCH: Contract Staffing
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                  Excessive Risk
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>How it works:</strong> The agency puts operators on its own payroll and bills the client on 45–90 day credit terms.
                </p>
                <div className="bg-white p-3 rounded-xl border border-rose-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payroll Working Capital for 20 Ops:</span>
                    <strong className="text-rose-700">₹4.5L – ₹6.0L / Month</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Statutory Liability:</span>
                    <strong className="text-rose-700">100% on Agency (EPFO/ESIC)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Client Payment Delay Risk:</span>
                    <strong className="text-rose-700">Severe / Liquidity Default</strong>
                  </div>
                </div>
                <p className="text-rose-900 font-medium">
                  <strong>Strategic Verdict:</strong> ₹5 Lakh is completely insufficient to absorb client payment lags. Even a single delayed invoice from an SME client would trigger technical insolvency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
