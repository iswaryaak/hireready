import React, { useState } from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Square, 
  Clock, 
  TrendingUp, 
  Award, 
  ChevronRight, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import launchPlanData from '../data/launchPlan.json';

export default function LaunchPlan() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [checkedTasks, setCheckedTasks] = useState({
    't1_1': true,
    't1_2': true,
    't1_3': true,
    't2_1': false
  });

  const toggleTask = (taskId) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const currentPhase = launchPlanData[activePhaseIndex];

  return (
    <section id="launch-plan" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="badge-demo text-[11px]">
              Execution Roadmap
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Structured 90-Day Go-To-Market Plan
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            The 90-Day Lean Launch Roadmap
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            A milestone-driven execution cadence designed to de-risk market assumptions, launch with minimal overhead, and reach cash-flow stabilization within ₹5 Lakh.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {launchPlanData.map((phase, idx) => {
            const isActive = activePhaseIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all border ${
                  isActive
                    ? 'bg-navy-900 text-white border-navy-800 shadow-premium ring-2 ring-brand-500/20'
                    : 'bg-white text-navy-900 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold uppercase ${isActive ? 'text-brand-300' : 'text-brand-700'}`}>
                    {phase.days}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-brand-500/20 text-brand-200 border border-brand-400/30' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {phase.badge}
                  </span>
                </div>
                <h3 className={`text-base font-bold ${isActive ? 'text-white' : 'text-navy-950'}`}>
                  {phase.title}
                </h3>
                <p className={`text-xs mt-1 line-clamp-2 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {phase.goal}
                </p>
              </button>
            );
          })}
        </div>

        {/* Phase Detailed Deep Dive Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-premium">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-200">
                  {currentPhase.phase} • {currentPhase.days}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Milestone Focus: {currentPhase.status}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-navy-950 mt-2">
                {currentPhase.title}
              </h3>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                {currentPhase.goal}
              </p>
            </div>

            {/* Target Metrics Strip */}
            <div className="flex flex-wrap items-center gap-3">
              {currentPhase.keyMetrics.map((km, kIdx) => (
                <div key={kIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center min-w-[110px]">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">{km.label}</span>
                  <span className="text-sm font-extrabold text-navy-900 font-mono mt-0.5 block">{km.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Action Checklist */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-brand-600" />
                Operational Deliverables & Task Checklist
              </h4>
              <span className="text-xs text-slate-400">
                Click task checkbox to simulate milestone completion
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPhase.tasks.map((task) => {
                const isChecked = !!checkedTasks[task.id];
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-200/90 text-navy-950 shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0 text-brand-600">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[10px] font-bold text-brand-800 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {task.category}
                        </span>
                        {isChecked && (
                          <span className="text-[10px] font-semibold text-emerald-700">Verified</span>
                        )}
                      </div>
                      <p className={`text-xs leading-relaxed ${isChecked ? 'font-medium text-slate-900' : 'text-slate-600'}`}>
                        {task.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Metric Deliverables for Day 61-90 */}
          {activePhaseIndex === 2 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wider mb-3">
                Core Operational KPIs to Track Post-Launch (MBA Review Rubric)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Time to Shortlist</span>
                  <span className="font-extrabold text-navy-950 text-sm mt-0.5 block">&lt; 72 Hours</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Interview-to-Selection</span>
                  <span className="font-extrabold text-brand-700 text-sm mt-0.5 block">1 in 2 Candidates</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Offer-to-Join Ratio</span>
                  <span className="font-extrabold text-navy-950 text-sm mt-0.5 block">&gt; 85% Rate</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">60-Day Replacement</span>
                  <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">&lt; 8% Invocations</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
