import React, { useState, useMemo } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';
import { 
  Calculator, 
  DollarSign, 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Edit3, 
  RotateCcw, 
  Sparkles,
  PieChart as PieIcon,
  Layers,
  ArrowRight
} from 'lucide-react';
import budgetData from '../data/budget.json';

export default function BusinessModel() {
  // Editable Budget Items State
  const [budgetItems, setBudgetItems] = useState(budgetData.items);
  const [selectedFee, setSelectedFee] = useState(8.33); // 8.33% | 10% | 12.5%
  const [avgCTC, setAvgCTC] = useState(300000); // ₹3,00,000 annual
  const [placementsCount, setPlacementsCount] = useState(12);
  const [monthlyOpCost, setMonthlyOpCost] = useState(20000); // ₹20k monthly burn
  const [simulatedMonths, setSimulatedMonths] = useState(6);

  // Colors for donut chart
  const BUDGET_COLORS = [
    '#0D9488', '#0284C7', '#6366F1', '#8B5CF6', 
    '#EC4899', '#F59E0B', '#10B981', '#14B8A6', 
    '#64748B', '#0F172A'
  ];

  // Dynamic calculations
  const totalAllocated = useMemo(() => {
    return budgetItems.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  }, [budgetItems]);

  const handleBudgetItemChange = (id, newAmount) => {
    const parsed = Math.max(0, parseInt(newAmount, 10) || 0);
    setBudgetItems(prev => prev.map(item => item.id === id ? { ...item, amount: parsed } : item));
  };

  const handleResetBudget = () => {
    setBudgetItems(budgetData.items);
    setSelectedFee(8.33);
    setAvgCTC(300000);
    setPlacementsCount(12);
    setMonthlyOpCost(20000);
  };

  // Scenario Simulator Math
  const feePerPlacement = useMemo(() => {
    return (avgCTC * (selectedFee / 100));
  }, [avgCTC, selectedFee]);

  const totalGrossRevenue = useMemo(() => {
    return Math.round(feePerPlacement * placementsCount);
  }, [feePerPlacement, placementsCount]);

  const totalOperatingExpenditure = useMemo(() => {
    // Initial capital setup items (all items except working capital reserve)
    const fixedSetupExpenses = budgetItems
      .filter(i => i.id !== 'reserve')
      .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const ongoingRunway = monthlyOpCost * simulatedMonths;
    return fixedSetupExpenses + ongoingRunway;
  }, [budgetItems, monthlyOpCost, simulatedMonths]);

  // Break-even Placements Needed
  const breakEvenPlacements = useMemo(() => {
    if (feePerPlacement <= 0) return 0;
    // To cover the total launch setup budget of ₹5 Lakh
    return Math.ceil(500000 / feePerPlacement);
  }, [feePerPlacement]);

  // Net Cash Balance
  const netRemainingCapital = useMemo(() => {
    // Starting ₹5L + Revenue - (Total Allocated Budget spent)
    return 500000 + totalGrossRevenue - totalAllocated;
  }, [totalGrossRevenue, totalAllocated]);

  // 4 Placement Tiers comparison table
  const placementTiersData = useMemo(() => {
    return [5, 10, 15, 20].map(count => {
      const rev = Math.round(count * feePerPlacement);
      const net = 500000 + rev - totalAllocated;
      return {
        count: `${count} Placements`,
        placements: count,
        revenue: rev,
        netCash: net,
        status: net >= 500000 ? 'Profitable' : net >= 250000 ? 'Sustainable' : 'High Burn'
      };
    });
  }, [feePerPlacement, totalAllocated]);

  const customDonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const pct = ((data.amount / totalAllocated) * 100).toFixed(1);
      return (
        <div className="bg-navy-950 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
          <p className="font-bold text-brand-300">{data.category}</p>
          <p className="text-emerald-400 font-extrabold text-sm mt-0.5">₹{data.amount.toLocaleString('en-IN')}</p>
          <p className="text-slate-300 text-[11px]">{pct}% of budget</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="business-model" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-demo text-[11px]">
              Financial Feasibility Simulation
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Seed Capital: ₹5,00,000 (INR)
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Can the business operate within ₹5 lakh?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Detailed capital allocation, sensitivity stress-testing, and break-even simulations for launching a lean permanent recruitment practice in Coimbatore.
          </p>
          <div className="mt-3 text-xs font-semibold text-slate-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 inline-block">
            * {budgetData.disclaimer}
          </div>
        </div>

        {/* SECTION 1: Interactive Lean Budget Allocation (Editable) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-premium mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-navy-950">
                  Proposed Lean Launch Budget (Interactive Table)
                </h3>
                <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                  Editable Fields
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Edit any cell amount to adjust capital sizing in real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-medium text-slate-500 uppercase block">Total Capital Allocated</span>
                <span className={`text-2xl font-extrabold font-mono ${
                  totalAllocated === 500000 
                    ? 'text-emerald-700' 
                    : totalAllocated > 500000 
                    ? 'text-rose-600' 
                    : 'text-brand-700'
                }`}>
                  ₹{totalAllocated.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={handleResetBudget}
                className="p-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors border border-slate-200"
                title="Reset Budget to Baseline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Donut Chart Visualization (Col 5) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                Capital Sizing Distribution
              </span>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetItems}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                    >
                      {budgetItems.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BUDGET_COLORS[index % BUDGET_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={customDonutTooltip} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[11px] text-slate-500 text-center mt-2">
                Largest allocation: <strong className="text-navy-900">Working Capital Reserve (₹1,00,000 / 20%)</strong> ensuring resilience.
              </div>
            </div>

            {/* Editable Budget Items List (Col 7) */}
            <div className="lg:col-span-7 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {budgetItems.map((item, idx) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: BUDGET_COLORS[idx % BUDGET_COLORS.length] }}
                    ></span>
                    <div className="truncate">
                      <span className="font-bold text-slate-900 block truncate">{item.category}</span>
                      <span className="text-[11px] text-slate-500 block truncate">{item.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0 font-mono">
                    <span className="text-slate-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleBudgetItemChange(item.id, e.target.value)}
                      className="w-24 text-right px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-navy-950 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 2: Interactive Scenario Calculator & Placement Simulator */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 mb-12 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5" />
              Dynamic Placement Revenue Simulator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Revenue & Break-Even Scenario Modeling
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Test how placement volumes, pricing fees (8.33%, 10%, 12.5%), and average technical candidate CTC impact monthly runway and capital survival.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            {/* Input Controls (Col 5) */}
            <div className="lg:col-span-5 bg-slate-950/70 p-6 rounded-2xl border border-slate-800 space-y-5">
              <h4 className="text-xs font-bold text-brand-300 uppercase tracking-wider">
                Simulation Input Parameters
              </h4>

              {/* Fee Percentage Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Recruitment Fee % (CTC)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[8.33, 10.0, 12.5].map((fee) => (
                    <button
                      key={fee}
                      type="button"
                      onClick={() => setSelectedFee(fee)}
                      className={`py-2 text-xs font-bold rounded-xl transition-all border ${
                        selectedFee === fee
                          ? 'bg-brand-600 text-white border-brand-500 shadow-teal-glow'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {fee}% {fee === 8.33 && '(1 Mo)'}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  * 8.33% = 1 month gross salary (Standard Coimbatore contingency rate)
                </span>
              </div>

              {/* Average Annual CTC */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Avg Annual Candidate CTC</span>
                  <span className="text-brand-300 font-bold font-mono">₹{avgCTC.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="500000"
                  step="10000"
                  value={avgCTC}
                  onChange={(e) => setAvgCTC(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                  <span>₹2.0L (Junior Op)</span>
                  <span>₹3.0L (Mid)</span>
                  <span>₹5.0L (Lead/Eng)</span>
                </div>
              </div>

              {/* Placements Target Count */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Number of Placements Achieved</span>
                  <span className="text-emerald-400 font-bold font-mono">{placementsCount} Hires</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={placementsCount}
                  onChange={(e) => setPlacementsCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Monthly Operating Expense */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Monthly Operating Overhead</span>
                  <span className="text-slate-200 font-bold font-mono">₹{monthlyOpCost.toLocaleString('en-IN')}/mo</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="40000"
                  step="2000"
                  value={monthlyOpCost}
                  onChange={(e) => setMonthlyOpCost(Number(e.target.value))}
                  className="w-full accent-brand-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Simulation Outputs Grid (Col 7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Fee Per Placement
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1">
                    ₹{Math.round(feePerPlacement).toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-brand-300">
                    At {selectedFee}% of ₹{(avgCTC/100000).toFixed(1)}L CTC
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Gross Placement Revenue
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono mt-1">
                    ₹{totalGrossRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-emerald-300/80">
                    From {placementsCount} successful hires
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Break-Even Placements
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono mt-1">
                    {breakEvenPlacements} Placements
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Recovers ₹5L total initial launch capital
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Net Capital Position
                  </span>
                  <div className={`text-xl sm:text-2xl font-extrabold font-mono mt-1 ${
                    netRemainingCapital >= 500000 ? 'text-emerald-400' : 'text-slate-200'
                  }`}>
                    ₹{netRemainingCapital.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {netRemainingCapital >= 500000 ? 'Net positive accretion' : 'Operating within seed runway'}
                  </span>
                </div>
              </div>

              {/* Sensitivity Verdict Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-950 to-slate-900 border border-brand-500/40 text-xs">
                <span className="font-bold text-brand-300 uppercase tracking-wider block mb-1">
                  Feasibility Assessment Takeaway:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  With a permanent placement contingency model (8.33%), the business requires approximately <strong className="text-white">{breakEvenPlacements} successful placements</strong> at ₹{avgCTC.toLocaleString('en-IN')} CTC to fully recoup ₹5 Lakh initial setup and portal fees. In Coimbatore's dense SME manufacturing cluster, reaching 2 to 3 placements per month achieves stability within 6 months while preserving the ₹1,00,000 cash reserve.
                </p>
              </div>
            </div>
          </div>

          {/* Placement Volume Simulator Matrix (5, 10, 15, 20 Placements) */}
          <div>
            <h4 className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-3">
              Placement Velocity Benchmark Matrix (Illustrative Projections)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {placementTiersData.map((tier, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-sm">{tier.count}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tier.status === 'Profitable' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {tier.status}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] mb-2">
                      Est. Placement Revenue:
                    </div>
                    <div className="text-lg font-extrabold text-emerald-400 font-mono">
                      ₹{tier.revenue.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                    <span>Net Fund Position:</span>
                    <span className="font-bold text-white font-mono">₹{tier.netCash.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
