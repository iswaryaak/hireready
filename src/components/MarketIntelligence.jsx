import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  Info, 
  MapPin, 
  DollarSign, 
  Layers, 
  Filter, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import marketData from '../data/marketDemand.json';

export default function MarketIntelligence() {
  const [activeMetric, setActiveMetric] = useState('openings'); // 'openings' | 'avgSalary' | 'difficulty'

  const COLORS = ['#0D9488', '#0EA5E9', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
  const SALARY_COLORS = ['#94A3B8', '#0D9488', '#0284C7', '#4338CA'];

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-navy-950 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
          <p className="font-bold text-sm text-brand-300">{label || data.role || data.band || data.cluster}</p>
          {data.openings !== undefined && (
            <p className="text-slate-200">Sample Openings: <strong className="text-white">{data.openings}</strong> ({data.sharePct}%)</p>
          )}
          {data.avgSalary !== undefined && (
            <p className="text-slate-200">Benchmark Avg Salary: <strong className="text-emerald-400">₹{data.avgSalary.toLocaleString('en-IN')}/mo</strong></p>
          )}
          {data.difficultyIndex !== undefined && (
            <p className="text-slate-200">Sourcing Difficulty Index: <strong className="text-amber-300">{data.difficultyIndex}/10</strong></p>
          )}
          {data.percentage !== undefined && (
            <p className="text-slate-200">Share of Sample: <strong className="text-white">{data.percentage}%</strong> ({data.count} postings)</p>
          )}
          {data.estimatedShare !== undefined && (
            <p className="text-slate-200">Estimated Cluster Share: <strong className="text-white">{data.estimatedShare}%</strong></p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="market-intel" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Secondary Research Badge */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-secondary text-[11px]">
              <Info className="w-3.5 h-3.5" />
              Secondary Research
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sample size N = 620 reviewed public vacancies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Coimbatore Technical Market Intelligence
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Empirical secondary analysis of public job postings across Coimbatore's major precision manufacturing, pump, valve, and foundry industrial clusters.
          </p>
          <div className="mt-2 text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 inline-block">
            * Important Note: Secondary research — selected public vacancy postings. Does not represent total Coimbatore census.
          </div>
        </div>

        {/* Top 3 High-Level Empirical Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Top In-Demand Profile</span>
            <div className="text-2xl font-extrabold text-navy-900 mt-1">CNC / VMC Operators</div>
            <p className="text-xs text-slate-600 mt-1">25.2% of all technical job postings in the examined sample (156 vacancies).</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Dominant Salary Bracket</span>
            <div className="text-2xl font-extrabold text-brand-700 mt-1">₹15,000 – ₹25,000</div>
            <p className="text-xs text-slate-600 mt-1">51.3% of postings fall in this operational band, reflecting high SME volume.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-premium">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Highest Difficulty Index</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">9.1 / 10</div>
            <p className="text-xs text-slate-600 mt-1">Maintenance & Automation Engineers suffer longest vacancy lifespans.</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Chart A: Role Demand Snapshot (Col 7) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-navy-950">
                    Selected Coimbatore Technical Vacancy Snapshot
                  </h3>
                  <span className="text-xs text-slate-500">
                    Secondary research — selected public vacancy postings
                  </span>
                </div>

                {/* Metric Selector Toggle */}
                <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveMetric('openings')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      activeMetric === 'openings' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Openings
                  </button>
                  <button
                    onClick={() => setActiveMetric('avgSalary')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      activeMetric === 'avgSalary' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Avg Salary
                  </button>
                  <button
                    onClick={() => setActiveMetric('difficulty')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      activeMetric === 'difficulty' ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-600 hover:text-navy-900'
                    }`}
                  >
                    Difficulty
                  </button>
                </div>
              </div>

              {/* Bar Chart Container */}
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={marketData.rolesDemand}
                    margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="role" 
                      tick={{ fontSize: 10, fill: '#475569' }} 
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} />
                    <Tooltip content={customTooltip} />
                    <Bar 
                      dataKey={activeMetric === 'openings' ? 'openings' : activeMetric === 'avgSalary' ? 'avgSalary' : 'difficultyIndex'} 
                      radius={[6, 6, 0, 0]}
                    >
                      {marketData.rolesDemand.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Metric shown: <strong className="text-slate-700 capitalize">{activeMetric}</strong></span>
              <span>Sorted by sample vacancy volume</span>
            </div>
          </div>

          {/* Chart B: Salary Bands Distribution (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-premium flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <h3 className="text-base font-bold text-navy-950">
                  Salary Bands in Selected Vacancy Sample
                </h3>
                <span className="text-xs text-slate-500">
                  Percentage distribution across 620 surveyed postings
                </span>
              </div>

              {/* Donut Chart */}
              <div className="h-60 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketData.salaryBands}
                      dataKey="percentage"
                      nameKey="band"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {marketData.salaryBands.map((entry, index) => (
                        <Cell key={`slice-${index}`} fill={SALARY_COLORS[index % SALARY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={customTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs">
                {marketData.salaryBands.map((band, idx) => (
                  <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: SALARY_COLORS[idx] }}></span>
                      <span className="font-semibold text-slate-800">{band.band}</span>
                    </div>
                    <span className="font-bold text-navy-900">{band.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              Highest concentration in ₹15k–₹25k operator wage bracket.
            </div>
          </div>
        </div>

        {/* Industrial Clusters Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-premium mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                Coimbatore Manufacturing Cluster Concentration
              </h3>
              <p className="text-xs text-slate-500">
                Where technical and machine operator demand is geographically centralized
              </p>
            </div>
            <span className="badge-secondary text-[10px]">
              Geographic Sample
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {marketData.industrialClusters.map((cluster, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-extrabold text-navy-900 block text-sm">{cluster.cluster}</span>
                <span className="text-[11px] text-brand-700 font-semibold mt-0.5 block">{cluster.primaryFocus}</span>
                <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-slate-600">
                  <span>Sample Share:</span>
                  <span className="font-bold text-navy-900">{cluster.estimatedShare}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight Panel (Strictly labeled as Secondary Research Insight) */}
        <div className="bg-gradient-to-r from-sky-900 via-navy-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-sky-800/60 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="badge-secondary bg-sky-400/20 text-sky-200 border-sky-400/40 text-[11px]">
                  Secondary Research Insight
                </span>
                <span className="text-xs text-slate-300">
                  Strategic Case Recommendation
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                Demand Validation for Specialized Technical Recruitment Niche
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {marketData.keyInsight.text}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-700/80 text-xs text-sky-200/80">
                <strong>Simulation Takeaway:</strong> Because over 50% of openings are in CNC, machining, and technical maintenance where employers struggle with candidate verification, entering as a generalist recruiter wastes marketing capital against entrenched agencies.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
