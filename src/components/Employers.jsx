import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  MapPin, 
  IndianRupee, 
  Clock, 
  Award, 
  Sliders, 
  Eye, 
  Users, 
  RefreshCw 
} from 'lucide-react';
import candidatesData from '../data/candidates.json';

export default function Employers({ onSelectCandidate }) {
  // Pre-loaded Demo Example as specified
  const [formData, setFormData] = useState({
    role: 'CNC / VMC Operator',
    experience: '2-4 years',
    location: 'Coimbatore (Kurichi / Peelamedu)',
    salaryMin: 20000,
    salaryMax: 28000,
    shift: 'Rotational (Day / Night)',
    skills: 'Fanuc, CNC Turning, Basic Inspection, Tool Setting',
    joiningTimeline: 'Within 15 days'
  });

  const [generatedCard, setGeneratedCard] = useState(null);
  const [shortlist, setShortlist] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const painPoints = [
    { title: "Irrelevant CV Spams", desc: "Portals flood inboxes with hundreds of unvetted, non-machinist profiles." },
    { title: "Lack of Practical Skills", desc: "Candidates list CNC on CVs but cannot set dial gauges or read blueprints." },
    { title: "Chronic Interview No-Shows", desc: "Over 40% candidates fail to appear for scheduled factory interviews." },
    { title: "Late Salary Mismatch", desc: "Candidates demand 40% pay jumps only after reaching final offer stage." },
    { title: "60-90 Day Notice Trap", desc: "Long notice periods lead to counter-offers and delayed plant commissioning." },
    { title: "Joining Dropouts & Churn", desc: "Candidates quit within 2 weeks if shopfloor shift realities were not verified." }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateRequirement = (e) => {
    e.preventDefault();
    setGeneratedCard({ ...formData, generatedAt: new Date().toLocaleTimeString() });
    setShortlist(null);
  };

  const handleGenerateShortlist = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Filter candidates matching selected role and budget
      const targetRole = (formData.role || '').toLowerCase();
      const matches = candidatesData.filter(c => {
        const cRole = (c.role || '').toLowerCase();
        const roleMatches = cRole.includes(targetRole) || targetRole.includes(cRole) ||
          (targetRole.includes('quality') && cRole.includes('quality')) ||
          (targetRole.includes('maintenance') && cRole.includes('maintenance')) ||
          (targetRole.includes('fitter') && cRole.includes('fitter')) ||
          (targetRole.includes('supervisor') && cRole.includes('supervisor')) ||
          (targetRole.includes('cnc') && cRole.includes('cnc')) ||
          (targetRole.includes('machine') && cRole.includes('machine'));
        return roleMatches && c.expectedSalary <= formData.salaryMax;
      }).slice(0, 3);

      setShortlist(matches.length > 0 ? matches : candidatesData.slice(0, 3));
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section id="employers" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            Employer Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
            Stop screening hundreds of CVs.
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Coimbatore precision engineering SMEs lose an average of 45 days per technical hire. We replace resume spam with rigorously pre-vetted, floor-ready tradesmen.
          </p>
        </div>

        {/* Employer Pain Points Grid */}
        <div className="mb-16">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-6">
            The 6 High-Cost Bottlenecks in Coimbatore Technical Hiring
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {painPoints.map((pain, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100 hover:border-rose-200 transition-all"
              >
                <div className="flex items-center gap-2.5 text-rose-700 font-bold text-sm mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <h4>{pain.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {pain.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* The HireReady Solution: Interactive Requirement Generator */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Job Mandate Calibrator
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Configure Your Vacancy Mandate
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Enter your shopfloor specifications below. HireReady generates an employer requirement profile and pulls an instant verified candidate shortlist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleGenerateRequirement} className="lg:col-span-6 bg-slate-950/70 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Target Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="CNC / VMC Operator">CNC / VMC Operator</option>
                    <option value="Machine Operator">Machine Operator</option>
                    <option value="Quality Inspector">Quality Inspector</option>
                    <option value="Maintenance Technician">Maintenance Technician</option>
                    <option value="Mechanical Fitter">Mechanical Fitter</option>
                    <option value="Technical Supervisor">Technical Supervisor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Experience Range
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="1-2 years">1–2 years (Junior / Trainee)</option>
                    <option value="2-4 years">2–4 years (Skilled Operator)</option>
                    <option value="4-7 years">4–7 years (Senior Technician)</option>
                    <option value="7+ years">7+ years (Supervisor / Lead)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Required Controller / Technical Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g. Fanuc, Haas, VMC 3-Axis, Tool Offset, Vernier"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Salary Range (₹/Month)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleInputChange}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                    <span className="text-slate-400 text-xs">to</span>
                    <input
                      type="number"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleInputChange}
                      className="w-1/2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Factory Location / Zone
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Kurichi / Peelamedu / SIDCO"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Shift Requirement
                  </label>
                  <select
                    name="shift"
                    value={formData.shift}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Rotational (Day / Night)">Rotational (Day / Night)</option>
                    <option value="General Day Shift Only">General Day Shift Only</option>
                    <option value="Fixed Night Shift">Fixed Night Shift</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Target Joining Timeline
                  </label>
                  <select
                    name="joiningTimeline"
                    value={formData.joiningTimeline}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="Immediate (< 7 days)">Immediate (&lt; 7 days)</option>
                    <option value="Within 15 days">Within 15 days</option>
                    <option value="Within 30 days">Within 30 days</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-brand-600 hover:bg-brand-500 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Update Requirement Profile</span>
                </button>
              </div>
            </form>

            {/* Generated Requirement Profile & Action Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-950 border border-brand-500/40 rounded-2xl p-6 shadow-teal-glow">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">
                      Live SME Requirement Profile
                    </span>
                  </div>
                  <span className="badge-demo text-[10px]">Demo Spec</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] text-slate-400">Position Mandate:</span>
                    <h4 className="text-xl font-bold text-white mt-0.5">{formData.role}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Experience</span>
                      <span className="font-semibold text-white">{formData.experience}</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Budget (Monthly)</span>
                      <span className="font-semibold text-emerald-400">
                        ₹{Number(formData.salaryMin).toLocaleString('en-IN')} – ₹{Number(formData.salaryMax).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Factory Cluster</span>
                      <span className="font-semibold text-white">{formData.location}</span>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] uppercase">Shift Flexibility</span>
                      <span className="font-semibold text-white">{formData.shift}</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase mb-1">Key Technical Criteria</span>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.skills.split(',').map((skill, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded text-[11px] bg-brand-500/20 text-brand-300 border border-brand-500/30">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <button
                    onClick={handleGenerateShortlist}
                    disabled={isGenerating}
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-gradient-to-r from-brand-300 to-teal-400 hover:from-brand-200 hover:to-teal-300 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-navy-950" />
                        <span>Matching Verified Talent Pool...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-navy-950" />
                        <span>Generate Verified Shortlist</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Filters through local verified candidate pool and evaluates controller compatibility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Shortlist Output Section */}
          {shortlist && (
            <div className="mt-10 pt-8 border-t border-slate-800 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      <CheckCircle2 className="w-4 h-4" /> 3 Matches Identified
                    </span>
                    <span className="badge-demo text-[10px]">Mock Matching Result</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mt-1">
                    HireReady Verified Shortlist for {formData.role}
                  </h4>
                </div>
                <div className="text-xs text-slate-400">
                  Turnaround time: <span className="text-white font-semibold">Immediate Demo</span>
                </div>
              </div>

              {/* Candidate Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {shortlist.map((candidate) => (
                  <div 
                    key={candidate.id}
                    className="bg-slate-950 rounded-2xl p-5 border border-slate-800 hover:border-brand-500/60 transition-all shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono text-slate-400">ID: {candidate.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {candidate.verificationStatus}
                        </span>
                      </div>

                      <h5 className="text-lg font-bold text-white">{candidate.name}</h5>
                      <p className="text-xs text-brand-300 font-medium mb-3">{candidate.role}</p>

                      <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Experience:</span>
                          <span className="font-semibold text-white">{candidate.experience} yrs</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Expected:</span>
                          <span className="font-semibold text-emerald-400">₹{candidate.expectedSalary.toLocaleString('en-IN')}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Availability:</span>
                          <span className="font-semibold text-white">{candidate.noticePeriod === 0 ? 'Immediate' : `${candidate.noticePeriod} days`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Skill Test Score:</span>
                          <span className="font-semibold text-brand-300">{candidate.skillScore}/100</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {candidate.skills.slice(0, 3).map((sk, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectCandidate(candidate)}
                      className="w-full py-2 rounded-xl text-xs font-bold bg-brand-600/30 hover:bg-brand-600 text-brand-200 hover:text-white border border-brand-500/40 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Candidate Passport</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
