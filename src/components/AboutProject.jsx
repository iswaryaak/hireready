import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  ShieldCheck, 
  BookOpen, 
  Scale, 
  AlertCircle, 
  Info, 
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';

export default function AboutProject() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Academic Project & Case Context
            </span>
            <span className="text-xs text-slate-500 font-medium">
              MBA Business Simulation / HR Analytics
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            About the HireReady Coimbatore Case Study
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            This digital platform serves as the interactive business simulation and analytical demonstration for an entrepreneurial HR case study set in Coimbatore, Tamil Nadu.
          </p>
        </div>

        {/* Case Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Left: Case Scenario */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-premium space-y-4">
            <div className="flex items-center gap-2 text-brand-700 font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>The Entrepreneurial Problem Statement</span>
            </div>

            <h3 className="text-xl font-bold text-navy-950">
              The ₹5 Lakh Capital Entrepreneurship Challenge
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A former corporate HR professional aims to establish a recruitment firm in Coimbatore with a seed capital budget of <strong>₹5,00,000</strong>. Rather than launching a generic consultancies that competes blindly on volume resume forwards, the founder must systematically:
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
              <li>Validate the Coimbatore SME manufacturing talent deficit firsthand.</li>
              <li>Identify specific high-difficulty roles (CNC/VMC, Quality, Maintenance, Fitters).</li>
              <li>Audit regional competitors across service lines, saturation, and pricing norms.</li>
              <li>Formulate a resilient unit economics model that avoids payroll insolvency.</li>
              <li>Determine whether and how to execute a lean go-to-market plan within ₹5 Lakh.</li>
            </ul>

            <div className="mt-4 p-4 rounded-2xl bg-brand-50/70 border border-brand-200 text-xs text-brand-900 leading-relaxed">
              <strong>Core Strategic Decision:</strong> The study explicitly advises launching as a <strong>Lean Permanent Recruitment Partner</strong> (charging an 8.33% contingency placement fee with verified Candidate Passports) and <em>avoiding payroll-heavy Contract Staffing</em> at launch to protect liquidity.
            </div>
          </div>

          {/* Right: Academic Research Framework */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-navy-950 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl">
              <h4 className="text-sm font-bold text-brand-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Academic Integrity Standards
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                This prototype strictly upholds MBA academic research standards by delineating between empirical secondary observations and illustrative demonstration figures.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block">No Fabricated Evidence:</strong>
                  <span className="text-slate-400 text-[11px]">
                    No fictitious corporate logos, falsified candidate testimonials, or invented survey respondent counts are utilized.
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block">Conditional Decision Architecture:</strong>
                  <span className="text-slate-400 text-[11px]">
                    Strategic recommendations adapt dynamically based on sensitivity criteria rather than hardcoded assumptions.
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-navy-950 mb-1">
                <MapPin className="w-4 h-4 text-brand-600" />
                <span>Geographic Setting: Coimbatore, Tamil Nadu</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Known as the "Pump City" and engineering hub of South India, Coimbatore houses over 50,000 MSMEs across pumps, motors, automotive precision job shops, and foundries.
              </p>
            </div>
          </div>
        </div>

        {/* Data Transparency & Source Attribution Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-premium">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-brand-600" />
            <h3 className="text-base font-bold text-navy-950 uppercase tracking-wider">
              Data Sources & Methodology Disclosures
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-navy-950 block mb-1">Primary Research</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                To be validated in subsequent research phases through structured employer interviews, candidate feedback surveys, and local industrial trade associations (CODISSIA, SIEMA).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-navy-950 block mb-1">Secondary Research</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Aggregated from public job listings (N=620 sample size) and public collaterals from 8 recruitment agencies active in the Coimbatore industrial corridor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-navy-950 block mb-1">Model Assumptions</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                8.33% contingency fee, ₹3.0L average annual operator CTC, and ₹20,000 monthly overhead are industry benchmark assumptions provided for academic simulation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
