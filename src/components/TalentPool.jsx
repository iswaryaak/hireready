import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ShieldCheck, 
  Eye, 
  MapPin, 
  IndianRupee, 
  Clock, 
  SlidersHorizontal,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import candidatesData from '../data/candidates.json';

export default function TalentPool({ onOpenPassport }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [maxSalary, setMaxSalary] = useState(45000);
  const [minExp, setMinExp] = useState(0);
  const [maxNotice, setMaxNotice] = useState('ALL');
  const [sortField, setSortField] = useState('skillScore');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

  // Extract unique roles and locations for dropdown filters
  const roles = useMemo(() => {
    const set = new Set(candidatesData.map(c => c.role));
    return ['ALL', ...Array.from(set)];
  }, []);

  const locations = useMemo(() => {
    const set = new Set(candidatesData.map(c => c.location.split(',')[0].trim()));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filter & Sort
  const filteredCandidates = useMemo(() => {
    return candidatesData.filter(c => {
      const q = (searchQuery || '').toLowerCase().trim();
      const matchesSearch = !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.id && c.id.toLowerCase().includes(q)) ||
        (Array.isArray(c.skills) && c.skills.some(s => s && s.toLowerCase().includes(q))) ||
        (c.role && c.role.toLowerCase().includes(q));

      const matchesRole = selectedRole === 'ALL' || c.role === selectedRole;
      const matchesLocation = selectedLocation === 'ALL' || c.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesSalary = c.expectedSalary <= maxSalary;
      const matchesExp = c.experience >= minExp;
      const matchesNotice = maxNotice === 'ALL' || c.noticePeriod <= Number(maxNotice);

      return matchesSearch && matchesRole && matchesLocation && matchesSalary && matchesExp && matchesNotice;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [searchQuery, selectedRole, selectedLocation, maxSalary, minExp, maxNotice, sortField, sortOrder]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedRole('ALL');
    setSelectedLocation('ALL');
    setMaxSalary(45000);
    setMinExp(0);
    setMaxNotice('ALL');
    setSortField('skillScore');
    setSortOrder('desc');
  };

  return (
    <section id="talent-pool" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-demo text-[11px]">
                Demo Talent Pool
              </span>
              <span className="badge-verified text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Pre-Audited
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
              Verified Candidate Directory
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Search and filter Coimbatore technical personnel verified across machine proficiency, background credentials, and shift flexibility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-navy-900">{filteredCandidates.length}</strong> of {candidatesData.length} Candidates
            </span>
            <button
              onClick={handleResetFilters}
              className="p-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1 border border-slate-200"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-subtle mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, candidate name, machine skill (Fanuc, CMM, Hydraulics)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-navy-900 placeholder-slate-400 focus:outline-none focus:border-brand-500 shadow-2xs"
              />
            </div>

            {/* Role Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:border-brand-500 shadow-2xs"
              >
                <option value="ALL">All Technical Roles</option>
                {roles.filter(r => r !== 'ALL').map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-navy-900 focus:outline-none focus:border-brand-500 shadow-2xs"
              >
                <option value="ALL">All Coimbatore Zones</option>
                {locations.filter(l => l !== 'ALL').map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Granular Sliders / Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200/80 text-xs">
            {/* Max Salary */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Max Expected Salary</span>
                <span className="text-brand-700 font-bold">₹{maxSalary.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min="18000"
                max="45000"
                step="1000"
                value={maxSalary}
                onChange={(e) => setMaxSalary(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            {/* Min Experience */}
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

            {/* Notice Period */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Notice Period</span>
                <span className="text-brand-700 font-bold">{maxNotice === 'ALL' ? 'Any' : `<= ${maxNotice} Days`}</span>
              </div>
              <select
                value={maxNotice}
                onChange={(e) => setMaxNotice(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-navy-900"
              >
                <option value="ALL">Any Notice Period</option>
                <option value="0">Immediate Only (0 Days)</option>
                <option value="15">Within 15 Days</option>
                <option value="30">Within 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th 
                    onClick={() => handleSort('id')}
                    className="p-3.5 cursor-pointer hover:text-navy-900"
                  >
                    <div className="flex items-center gap-1">
                      <span>Candidate ID</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('role')}
                    className="p-3.5 cursor-pointer hover:text-navy-900"
                  >
                    <div className="flex items-center gap-1">
                      <span>Role & Name</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('experience')}
                    className="p-3.5 cursor-pointer hover:text-navy-900"
                  >
                    <div className="flex items-center gap-1">
                      <span>Experience</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="p-3.5">Location</th>
                  <th 
                    onClick={() => handleSort('expectedSalary')}
                    className="p-3.5 cursor-pointer hover:text-navy-900"
                  >
                    <div className="flex items-center gap-1">
                      <span>Exp. Salary</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('noticePeriod')}
                    className="p-3.5 cursor-pointer hover:text-navy-900"
                  >
                    <div className="flex items-center gap-1">
                      <span>Notice</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('skillScore')}
                    className="p-3.5 cursor-pointer hover:text-navy-900"
                  >
                    <div className="flex items-center gap-1">
                      <span>Skill Score</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="p-3.5">HR Status</th>
                  <th className="p-3.5 text-center">Passport</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500">
                      No candidates match your current filter parameters. Try loosening search terms or salary boundaries.
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <tr 
                      key={candidate.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="p-3.5 font-mono font-bold text-navy-950">
                        {candidate.id}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-navy-900 text-sm">{candidate.name}</div>
                        <div className="text-[11px] text-brand-700 font-semibold">{candidate.role}</div>
                      </td>
                      <td className="p-3.5 font-medium">
                        {candidate.experience} yrs
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{candidate.location.split(',')[0]}</span>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-navy-900">
                        ₹{candidate.expectedSalary.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 font-medium">
                        {candidate.noticePeriod === 0 ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Immediate
                          </span>
                        ) : (
                          `${candidate.noticePeriod} Days`
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-brand-800 text-xs bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                            {candidate.skillScore}/100
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {candidate.hrStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => onOpenPassport(candidate)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-navy-900 bg-slate-100 hover:bg-brand-600 hover:text-white transition-all shadow-2xs border border-slate-200 group-hover:border-brand-400 inline-flex items-center gap-1"
                          title="View complete Candidate Passport"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Passport</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Note:</strong> All profiles in this dashboard represent illustrative mock candidate data for the Coimbatore HR case study.
            </span>
            <span className="font-mono text-[11px]">N = {candidatesData.length} records</span>
          </div>
        </div>
      </div>
    </section>
  );
}
