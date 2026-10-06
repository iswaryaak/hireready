import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Employers from './components/Employers';
import Candidates from './components/Candidates';
import TalentPool from './components/TalentPool';
import MarketIntelligence from './components/MarketIntelligence';
import CompetitorLandscape from './components/CompetitorLandscape';
import BusinessModel from './components/BusinessModel';
import DecisionDashboard from './components/DecisionDashboard';
import LaunchPlan from './components/LaunchPlan';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AboutProject from './components/AboutProject';
import Footer from './components/Footer';
import CandidatePassportModal from './components/CandidatePassportModal';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { runDatabaseConnectivityTest } from './lib/dbConnectivityTest';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  // Expose database connectivity test runner to browser console
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__testSupabaseConnection = () => runDatabaseConnectivityTest({ verbose: true });
    }
  }, []);

  // Handle smooth scrolling to target sections
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPassport = (candidate) => {
    setSelectedCandidate(candidate);
    setIsPassportOpen(true);
  };

  const handleClosePassport = () => {
    setIsPassportOpen(false);
  };

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'how-it-works',
        'employers',
        'candidates',
        'talent-pool',
        'market-intel',
        'competitors',
        'business-model',
        'decision',
        'launch-plan',
        'analytics',
        'about'
      ];

      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-navy-900 font-sans antialiased flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <div id="home">
          <Hero onNavigate={handleNavigate} />
        </div>

        <HowItWorks onNavigate={handleNavigate} />

        <Employers onSelectCandidate={handleOpenPassport} />

        <Candidates onOpenPassport={handleOpenPassport} />

        <TalentPool onOpenPassport={handleOpenPassport} />

        <MarketIntelligence />

        <CompetitorLandscape />

        <BusinessModel />

        <DecisionDashboard onNavigate={handleNavigate} />

        <LaunchPlan />

        <AnalyticsDashboard />

        <AboutProject />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Reusable Digital Candidate Passport Modal */}
      <CandidatePassportModal
        candidate={selectedCandidate}
        isOpen={isPassportOpen}
        onClose={handleClosePassport}
      />
    </div>
  );
}
