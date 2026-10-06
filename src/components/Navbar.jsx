import React, { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, ArrowRight, BarChart3, Users, Building2, Calculator, Sparkles } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'employers', label: 'Employers' },
    { id: 'candidates', label: 'Candidates' },
    { id: 'talent-pool', label: 'Talent Pool' },
    { id: 'market-intel', label: 'Market Intel' },
    { id: 'competitors', label: 'Competitors' },
    { id: 'business-model', label: '₹5L Feasibility' },
    { id: 'decision', label: 'Launch Decision' },
    { id: 'launch-plan', label: '90-Day Plan' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'about', label: 'About Project' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Academic Banner */}
      <div className="bg-navy-950 text-slate-300 text-xs py-1.5 px-4 border-b border-navy-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">MBA BUSINESS SIMULATION</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 hidden sm:inline">HR & Business Analytics Case Study — Coimbatore SMEs</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 border border-slate-700">
              Illustrative Demo Data
            </span>
            <span className="hidden md:inline">Secondary Market Research</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-premium border-b border-slate-200/80 py-2.5' 
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-brand-600 flex items-center justify-center text-white shadow-md group-hover:shadow-teal-glow transition-all">
                <ShieldCheck className="w-6 h-6 text-brand-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold text-navy-900 tracking-tight">HireReady</span>
                  <span className="text-xs font-semibold uppercase text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                    CBE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium tracking-tight -mt-0.5">
                  Verified Talent. Faster Hiring.
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 text-[13px] font-medium text-slate-600">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'text-brand-700 bg-brand-50/80 font-bold shadow-xs'
                      : 'hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
              <button
                onClick={() => handleNavClick('market-intel')}
                className="px-3.5 py-2 text-xs font-semibold text-navy-800 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all border border-slate-200/80 flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5 text-brand-700" />
                View Market Intel
              </button>
              
              <button
                onClick={() => handleNavClick('employers')}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-navy-900 via-brand-700 to-brand-600 hover:from-navy-950 hover:to-brand-700 rounded-xl shadow-md hover:shadow-teal-glow transition-all flex items-center gap-1.5"
              >
                <span>Find Verified Talent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('employers')}
                className="sm:inline-flex hidden px-3 py-1.5 text-xs font-bold text-white bg-brand-700 rounded-lg shadow-sm"
              >
                Find Talent
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 max-h-[85vh] overflow-y-auto animate-fadeIn">
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-brand-50 text-brand-800 font-bold border border-brand-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => handleNavClick('employers')}
                className="w-full py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Find Verified Talent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNavClick('market-intel')}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-900 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-200"
              >
                <BarChart3 className="w-4 h-4 text-brand-700" />
                <span>View Market Intelligence</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
