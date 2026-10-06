import React from 'react';
import { X, CheckCircle2, ShieldCheck, Award, MapPin, Briefcase, IndianRupee, Clock, FileText, Check, AlertCircle } from 'lucide-react';

export default function CandidatePassportModal({ candidate, isOpen, onClose }) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient & badges */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 p-6 text-white rounded-t-2xl relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close Passport"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="badge-demo bg-amber-400/20 text-amber-200 border-amber-400/40 text-[11px]">
              Demo Candidate
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              <ShieldCheck className="w-3.5 h-3.5" /> HireReady Verified
            </span>
            <span className="text-xs text-slate-300 ml-auto font-mono">
              ID: {candidate.id}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {candidate.name}
              </h3>
              <p className="text-brand-300 font-medium text-sm flex items-center gap-2 mt-0.5">
                <Briefcase className="w-4 h-4" /> {candidate.role}
                <span className="text-slate-400">•</span>
                <MapPin className="w-4 h-4" /> {candidate.location}
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 uppercase">Experience</span>
              <p className="text-lg font-bold text-navy-900 mt-0.5">{candidate.experience} Years</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 uppercase">Exp. Salary</span>
              <p className="text-lg font-bold text-navy-900 mt-0.5">₹{candidate.expectedSalary.toLocaleString('en-IN')}/mo</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 uppercase">Notice Period</span>
              <p className="text-lg font-bold text-navy-900 mt-0.5">{candidate.noticePeriod === 0 ? 'Immediate' : `${candidate.noticePeriod} Days`}</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <span className="text-xs font-medium text-emerald-700 uppercase">Skill Score</span>
              <p className="text-lg font-bold text-emerald-800 mt-0.5">{candidate.skillScore}/100</p>
            </div>
          </div>

          {/* Verification Status Matrix */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-600" />
              HireReady Multi-Point Verification Status
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">HR Background & Identity</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3 h-3" /> {candidate.hrStatus}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Shift & Overtime Readiness</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3 h-3" /> {candidate.shiftReadiness}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Education Credential</span>
                <span className="text-slate-800 text-xs font-semibold">{candidate.education}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Practical Machine Test</span>
                <span className="text-xs text-brand-700 font-semibold">{candidate.practicalTest || 'Score Verified'}</span>
              </div>
            </div>
          </div>

          {/* Verified Skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Verified Technical Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-200/80 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-brand-600" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Documents Verified Checklist */}
          {candidate.documentsVerified && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                Physical Documents Checked
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {candidate.documentsVerified.map((doc, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> {doc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technical Evaluator Notes */}
          {candidate.notes && (
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-amber-900 text-xs leading-relaxed">
              <span className="font-bold flex items-center gap-1 mb-1 text-amber-800">
                <AlertCircle className="w-3.5 h-3.5" /> Technical Assessor Field Observation:
              </span>
              {candidate.notes}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 rounded-b-2xl">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">HireReady Guarantee:</span> 60-day free candidate replacement support included.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm font-semibold bg-navy-900 text-white hover:bg-navy-800 transition-colors shadow-sm ml-auto"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
}
