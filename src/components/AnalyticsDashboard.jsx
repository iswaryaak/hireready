import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid, 
  Legend,
  ComposedChart,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  SlidersHorizontal, 
  Filter, 
  Sparkles, 
  DollarSign, 
  Users, 
  Target, 
  ArrowUpRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import candidatesData from '../data/candidates.json';
import marketData from '../data/marketDemand.json';
import competitorData from '../data/competitors.json';

export default function AnalyticsDashboard() {
  const [filterRole, setFilterRole] = useState('ALL');
  const [filterLocation, setFilterLocation] = useState('ALL');
  const [maxSalary, setMaxSalary] = useState(40000);
  const [minExp, setMinExp] = useState(0);

  // Dynamic filtered candidates
  const filteredCandidates = useMemo(() => {
    return candidatesData.filter(c => {
      const matchRole = filterRole === 'ALL' || c.role === filterRole;
      const matchLoc = filterLocation === 'ALL' || c.location.toLowerCase().includes(filterLocation.toLowerCase());
      const matchSal = c.expectedSalary <= maxSalary;
      const matchExp = c.experience >= minExp;
      return matchRole && matchLoc && matchSal && matchExp;
    });
  }, [filterRole, filterLocation, maxSalary, minExp]);

  // Aggregate Metrics
  const avgCandidateScore = useMemo(() => {
    if (!filteredCandidates.length) return 0;
    const total = filteredCandidates.reduce((acc, c) => acc + c.skillScore, 0);
    return Math.round(total / filteredCandidates.length);
  }, [filteredCandidates]);

  const avgExpectedSalary = useMemo(() => {
    if (!filteredCandidates.length) return 0;
    const total = filteredCandidates.reduce((acc, c) => acc + c.expectedSalary, 0);
    return Math.round(total / filteredCandidates.length);
  }, [filteredCandidates]);

  // Location Distribution
  const locationStats = useMemo(() => {
    const counts = {};
    filteredCandidates.forEach(c => {
      const loc = c.location.split(',')[0].trim();
      counts[loc] = (counts[loc] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      location: key,
      candidates: counts[key]
    })).sort((a, b) => b.candidates - a.candidates);
  }, [filteredCandidates]);

  // Supply vs Demand Comparison
  const supplyVsDemand = useMemo(() => {
    return marketData.rolesDemand.map(r => {
      const availableCount = candidatesData.filter(c => c.role.toLowerCase() === r.role.toLowerCase()).length;
      return {
        role: r.role.split('/')[0].trim(),
        fullRole: r.role,
        demandOpenings: r.openings,
        talentPoolSupply: availableCount,
        avgSalary: r.avgSalary
      };
    });
  }, []);

  // Revenue Sensitivity Curve (5 to 30 placements)
  const sensitivityCurve = useMemo(() => {
    const feePct = 0.0833;
    const annualCTC = avgExpectedSalary * 12 || 300000;
    const feePerHire = annualCTC * feePct;
    const baseFixedBudget = 400000; // Setup without reserve

    return [2, 5, 8, 12, 16, 20, 25, 30].map(vol => {
      const grossRev = Math.round(vol * feePerHire);
      const netGain = grossRev - baseFixedBudget;
      return {
        volume: `${vol}`,
        revenue: grossRev,
        netCashFlow: netGain,
        breakEvenLine: 0
      };
    });
  }, [avgExpectedSalary]);

  const handleResetFilters = () => {
    setFilterRole('ALL');
    setFilterLocation('ALL');
    setMaxSalary(40000);
    setMinExp(0);
  };

  const customAnalyticsTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-950 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
          <p className="font-bold text-brand-300 text-sm">{label}</p>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex justify-between gap-4 text-slate-200">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <strong className="text-white">
                {typeof entry.value === 'number' && entry.value > 1000 
                  ? `₹${entry.value.toLocaleString('en-IN')}` 
                  : entry.value}
              </strong>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="analytics" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-demo text-[11px]">
              MBA Capstone Analytics View
            </span>
            <span className="text-xs text-slate-500 font-medium">
              HR Metrics & Econometric Sensitivity
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Business Analytics & Strategic Intelligence
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Multi-dimensional quantitative synthesis combining secondary job demand data, talent pool skill scores, geographic availability, and placement revenue modeling.
          </p>
        </div>

        {/* Top Filter Toolbar */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-subtle mb-10">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 text-xs">
            <span className="font-bold text-navy-950 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              Dynamic Dashboard Filters
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">
                Filtered Sample: <strong className="text-navy-900">{filteredCandidates.length}</strong> profiles
              </span>
              <button
                onClick={handleResetFilters}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Role Filter */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-navy-900 focus:outline-none focus:border-brand-500"
              >
                <option value="ALL">All Roles</option>
                <option value="CNC / VMC Operator">CNC / VMC Operator</option>
                <option value="Machine Operator">Machine Operator</option>
                <option value="Quality Inspector">Quality Inspector</option>
                <option value="Maintenance Technician">Maintenance Technician</option>
                <option value="Mechanical Fitter">Mechanical Fitter</option>
                <option value="Technical Supervisor">Technical Supervisor</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Coimbatore Cluster</label>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-navy-900 focus:outline-none focus:border-brand-500"
              >
                <option value="ALL">All Zones</option>
                <option value="Kurichi">Kurichi Industrial</option>
                <option value="Peelamedu">Peelamedu</option>
                <option value="SIDCO">SIDCO / Malumichampatti</option>
                <option value="Ganapathy">Ganapathy</option>
                <option value="Eachanari">Eachanari</option>
                <option value="Singanallur">Singanallur</option>
              </select>
            </div>

            {/* Salary Ceiling Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Max Salary</span>
                <span className="text-brand-700 font-bold">₹{maxSalary.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="45000"
                step="1000"
                value={maxSalary}
                onChange={(e) => setMaxSalary(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            {/* Experience Floor */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Min Experience</span>
                <span className="text-brand-700 font-bold">{minExp}+ Years</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="0.5"
                value={minExp}
                onChange={(e) => setMinExp(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 4 Quantitative Scorecards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Filtered Talent Mean Score
            </span>
            <div className="text-3xl font-extrabold text-navy-950 font-mono mt-1">
              {avgCandidateScore} <span className="text-sm text-slate-400 font-normal">/ 100</span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
              Practical machining benchmark
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Average Expected Pay
            </span>
            <div className="text-3xl font-extrabold text-brand-700 font-mono mt-1">
              ₹{avgExpectedSalary.toLocaleString('en-IN')} <span className="text-sm text-slate-400 font-normal">/mo</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Annualized: ₹{((avgExpectedSalary * 12)/100000).toFixed(2)}L CTC
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Est. Fee per Placement (8.33%)
            </span>
            <div className="text-3xl font-extrabold text-navy-950 font-mono mt-1">
              ₹{Math.round(avgExpectedSalary * 12 * 0.0833).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Standard 1 month placement fee
            </span>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Estimated Break-Even Hires
            </span>
            <div className="text-3xl font-extrabold text-amber-600 font-mono mt-1">
              {Math.ceil(500000 / (avgExpectedSalary * 12 * 0.0833 || 25000))} Hires
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Recovers full ₹5 Lakh outlay
            </span>
          </div>
        </div>

        {/* Charts Row 1: Supply vs Demand & Revenue Curve */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Chart 1: Market Demand (Sample N=620) by Role */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-premium">
            <div className="mb-4">
              <h3 className="text-base font-bold text-navy-950">
                Secondary Hiring Demand vs Sample Supply
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of public vacancy postings (N=620) against target profiles
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={supplyVsDemand}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="role" 
                    tick={{ fontSize: 10 }} 
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={customAnalyticsTooltip} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="demandOpenings" name="Secondary Demand Openings" fill="#0D9488" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="talentPoolSupply" name="Demo Talent Pool Supply" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              High deficit in CNC / VMC machinists verifies high urgency for pre-vetted sourcing.
            </div>
          </div>

          {/* Chart 2: Net Cash Flow Sensitivity vs Placement Volume */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-premium">
            <div className="mb-4">
              <h3 className="text-base font-bold text-navy-950">
                Net Cumulative Cash Flow Sensitivity (Volume Curve)
              </h3>
              <p className="text-xs text-slate-500">
                Gross placement revenue vs ₹4.0 Lakh initial setup base expenditure
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={sensitivityCurve}
                  margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="volume" 
                    tick={{ fontSize: 10 }} 
                    label={{ value: 'Successful Placements', position: 'insideBottom', offset: -10, fontSize: 11 }}
                  />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip content={customAnalyticsTooltip} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    name="Gross Placement Revenue (₹)" 
                    stroke="#0D9488" 
                    fill="#CCFBF1" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netCashFlow" 
                    name="Net Cash Gain / Loss (₹)" 
                    stroke="#0F172A" 
                    strokeWidth={2} 
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 text-[11px] text-slate-500">
              Crossing into positive cash flow at 14–16 cumulative placements.
            </div>
          </div>
        </div>

        {/* Geographic Candidate Concentration */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                Candidate Geographic Distribution Across Coimbatore
              </h3>
              <span className="text-xs text-slate-500">
                Based on active verified profiles in the filtered candidate subset
              </span>
            </div>
            <span className="badge-demo text-[10px]">Mock Data</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {locationStats.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <span className="text-slate-500 block text-[10px] truncate">{item.location}</span>
                <span className="text-xl font-extrabold text-navy-900 font-mono mt-1 block">{item.candidates}</span>
                <span className="text-[10px] text-brand-700 font-semibold">Candidates</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
