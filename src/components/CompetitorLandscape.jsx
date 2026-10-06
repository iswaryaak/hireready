import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { 
  Building2, 
  ShieldAlert, 
  Check, 
  Minus, 
  Info, 
  Sparkles, 
  Target, 
  HelpCircle,
  TrendingDown,
  Layers
} from 'lucide-react';
import competitorData from '../data/competitors.json';

export default function CompetitorLandscape() {
  const [filterTier, setFilterTier] = useState('ALL');

  const filteredCompetitors = filterTier === 'ALL'
    ? competitorData.competitors
    : competitorData.competitors.filter(c => c.tier === filterTier);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-navy-950 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
          <p className="font-bold text-brand-300">{data.service}</p>
          <p className="text-slate-200 mt-0.5">Saturation: <strong className="text-white">{data.saturationPct}%</strong> ({data.offeredByCount} / {competitorData.competitors.length} agencies)</p>
          <p className="text-slate-300 text-[11px] mt-0.5">Competitive Intensity: {data.intensity}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="competitors" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-secondary text-[11px]">
              <Info className="w-3.5 h-3.5" />
              Secondary Competitor Landscape Review
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sample size N = 8 regional/national recruitment agencies in Coimbatore
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Competitor Service Heatmap & Market Saturation
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Evaluation of publicly identified service lines across recruitment agencies operating in the Coimbatore manufacturing & industrial corridor.
          </p>
        </div>

        {/* Legend Callout Box (Strict adherence to requirement) */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 text-xs leading-relaxed mb-8 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-amber-900 block mb-0.5">
              Source Attribution & Reading Legend:
            </strong>
            <span>{competitorData.legend}</span>
          </div>
        </div>

        {/* Competitor Service Heatmap Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-premium overflow-hidden mb-12">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                A. Competitive Service Matrix (Public Identification)
              </h3>
              <span className="text-xs text-slate-500">
                1 = Service identified on public source; 0 = Not identified
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Filter Segment:</span>
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-navy-900 focus:outline-none focus:border-brand-500"
              >
                <option value="ALL">All Segments</option>
                <option value="National Corporate">National Corporate</option>
                <option value="Regional Agency">Regional Agency</option>
                <option value="Local Boutique">Local Boutique</option>
                <option value="Specialist Agency">Specialist Agency</option>
                <option value="Lean Tech-Enabled Niche">HireReady (Proposed)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <th className="p-3.5">Agency Name / Entity</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Permanent Recruitment</th>
                  <th className="p-3.5 text-center">Contract Staffing</th>
                  <th className="p-3.5 text-center">Bulk Hiring</th>
                  <th className="p-3.5 text-center">RPO</th>
                  <th className="p-3.5 text-center bg-brand-50/60 text-brand-900 border-x border-brand-200">Practical Screening</th>
                  <th className="p-3.5 text-center">Payroll Services</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCompetitors.map((comp, idx) => {
                  const isHireReady = comp.name.includes('HireReady');
                  return (
                    <tr 
                      key={idx}
                      className={isHireReady ? 'bg-brand-50/40 font-semibold' : 'hover:bg-slate-50/80 transition-colors'}
                    >
                      <td className="p-3.5 font-bold text-navy-950 flex items-center gap-2">
                        {isHireReady && <Sparkles className="w-3.5 h-3.5 text-brand-600" />}
                        <span>{comp.name}</span>
                        {isHireReady && (
                          <span className="badge-demo text-[10px]">Proposed Model</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                          {comp.tier}
                        </span>
                      </td>
                      
                      {/* Permanent */}
                      <td className="p-3.5 text-center font-mono">
                        {comp.permanent === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">1</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-bold text-xs">0</span>
                        )}
                      </td>

                      {/* Contract */}
                      <td className="p-3.5 text-center font-mono">
                        {comp.contractStaffing === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">1</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-bold text-xs">0</span>
                        )}
                      </td>

                      {/* Bulk Hiring */}
                      <td className="p-3.5 text-center font-mono">
                        {comp.bulkHiring === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">1</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-bold text-xs">0</span>
                        )}
                      </td>

                      {/* RPO */}
                      <td className="p-3.5 text-center font-mono">
                        {comp.rpo === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">1</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-bold text-xs">0</span>
                        )}
                      </td>

                      {/* Technical Screening (Key Differentiator column) */}
                      <td className="p-3.5 text-center font-mono bg-brand-50/30 border-x border-brand-200">
                        {comp.technicalScreening === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-brand-600 text-white font-bold text-xs shadow-xs">1</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-bold text-xs">0</span>
                        )}
                      </td>

                      {/* Payroll Services */}
                      <td className="p-3.5 text-center font-mono">
                        {comp.payrollServices === 1 ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">1</span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-400 font-bold text-xs">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Horizontal Bar Chart: Services Most Commonly Offered */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-premium">
            <div className="mb-4">
              <h3 className="text-base font-bold text-navy-950">
                B. Services Most Commonly Offered (% Saturation)
              </h3>
              <p className="text-xs text-slate-500">
                Secondary review of 8 competitor entities in Coimbatore
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={competitorData.servicesSaturation}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} unit="%" />
                  <YAxis type="category" dataKey="service" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip content={customTooltip} />
                  <Bar dataKey="saturationPct" radius={[0, 6, 6, 0]}>
                    {competitorData.servicesSaturation.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.service.includes('Screening') ? '#0D9488' : '#334155'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Notice: <strong className="text-brand-800">Practical Technical Pre-Screening</strong> has lowest saturation (25%), revealing clear room for a specialized value proposition.
            </div>
          </div>

          {/* Pricing & Positioning Area for Future Field Data */}
          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-premium">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-navy-950">
                  C. Pricing & Commercial Structure Sandbox
                </h3>
                <span className="badge-demo text-[10px]">Benchmarked Baseline</span>
              </div>
              <p className="text-xs text-slate-500">
                Fee structures identified from public quotes and HR field norms
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-navy-950 mb-1">
                  <span>National Corporate Agencies</span>
                  <span className="text-brand-700">8.33% – 12.5% CTC</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Requires annual minimum retainer agreements; slow to service one-off SME operator mandates.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="flex justify-between font-bold text-navy-950 mb-1">
                  <span>Local Blue-Collar Consultancies</span>
                  <span className="text-brand-700">₹1,500 – ₹5,000 / head</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Unvetted volume forwards; zero technical screening; candidate fees frequently charged (unethical).
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex justify-between font-bold text-emerald-950 mb-1">
                  <span>HireReady Proposed Pricing</span>
                  <span className="text-emerald-700 font-extrabold">8.33% (Contingency on Joining)</span>
                </div>
                <p className="text-emerald-800 text-[11px]">
                  Standard 1 month equivalent (8.33% of annual CTC) payable within 15 days of joining, accompanied by 60-day free replacement guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Market Gap Section (Strict adherence to requirement) */}
        <div className="border border-slate-200 rounded-3xl p-6 sm:p-8 bg-slate-50/50">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700 block mb-1">
              Strategic Landscape Synthesis
            </span>
            <h3 className="text-2xl font-extrabold text-navy-950">
              Market Gap & Proposed Positioning
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Why HireReady chooses not to contest generic staffing or volume brokerage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitorData.marketGaps.map((gap, idx) => {
              const isProposed = gap.competitionLevel === 'PROPOSED DIFFERENTIATOR';
              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isProposed 
                      ? 'bg-brand-900 text-white border-brand-700 shadow-teal-glow'
                      : 'bg-white text-navy-900 border-slate-200 shadow-xs'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border mb-3 inline-block ${
                      isProposed 
                        ? 'bg-brand-500/20 text-brand-200 border-brand-400/40'
                        : gap.competitionLevel === 'HIGH COMPETITION'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {gap.competitionLevel}
                    </span>

                    <h4 className={`text-base font-bold mb-2 ${isProposed ? 'text-white' : 'text-navy-950'}`}>
                      {gap.segment}
                    </h4>

                    <p className={`text-xs leading-relaxed mb-3 ${isProposed ? 'text-slate-300' : 'text-slate-600'}`}>
                      {gap.observation}
                    </p>
                  </div>

                  <div className={`pt-3 border-t text-[11px] font-medium ${
                    isProposed ? 'border-brand-800 text-brand-200' : 'border-slate-100 text-slate-500'
                  }`}>
                    {gap.risk}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 text-[11px] text-slate-500 text-center">
            * Note: Do not falsely claim no competitor offers this. Labelled as <strong>Proposed Positioning</strong> for academic business simulation.
          </div>
        </div>
      </div>
    </section>
  );
}
