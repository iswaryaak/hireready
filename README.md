# HireReady Coimbatore 🏭
> **“Verified Talent. Faster Hiring.”**  
> *A Technology-Enabled Lean Recruitment Model for Coimbatore SMEs (MBA Business Simulation & HR Analytics Case Study)*

---

## 📌 Executive Summary & Case Overview

### The Problem Statement
A former human resources professional seeks to launch an agile recruitment agency in **Coimbatore, Tamil Nadu** with a seed capital base of **₹5,00,000 (₹5 Lakh)**. 

Rather than entering the crowded generalist recruitment space—which is plagued by high friction, unvetted resume spam, candidate no-shows, and pricing commoditization—the entrepreneur evaluates establishing **HireReady Coimbatore**: a lean, technology-assisted recruitment partner focused strictly on **hard-to-fill manufacturing and technical operator roles** for Coimbatore's precision engineering SMEs.

### Core Value Proposition
> **“We don’t sell more CVs. We give employers fewer, verified candidates.”**

### Target Technical Profiles
- **CNC / VMC Operators** (3-Axis, 4-Axis, Fanuc, Siemens, Haas controllers)
- **Machine Operators** (Turners, Machinists, Conventional & Special Purpose Machines)
- **Production Supervisors & Technicians** (OEE, 5S, Line Balancing)
- **Quality Inspectors** (CMM, Vernier, Micrometer, First Article Inspection, GD&T)
- **Maintenance Engineers & Technicians** (Hydraulics, Pneumatics, PLC interlocks)
- **Mechanical Fitters & Assembly Specialists** (Gearbox, Pump & Valve housings)
- **Tool & Die Makers** (Press Tools, Progressive Dies, Injection Moulds)

---

## 🚀 Key Features & Website Architecture

| Page / Section | Core Functionality | Academic & Analytical Significance |
| :--- | :--- | :--- |
| **1. Home & Hero** | Value proposition, Target Metric KPI cards, and **Before vs. HireReady** interactive workflow transformation. | Highlights operational cycle reduction from 45 days down to 3–5 days. |
| **2. How It Works** | 7-stage interactive pipeline with icons, employer benefits, and stage deep-dives. | Demonstrates end-to-end recruitment process engineering. |
| **3. Employers** | Pain point audit + **Interactive Vacancy Calibrator** + **"Generate Verified Shortlist"** engine. | Simulates candidate-to-mandate matching based on machine controllers and budget. |
| **4. Candidates** | 6-stage candidate journey + interactive **Digital Candidate Passport (C102 showcase)**. | Replaces unverified CVs with authenticated machine test scores and verification badges. |
| **5. Verified Talent Pool** | Searchable & filterable directory with multi-field sliders, column sorting, and passport modals. | Powered by modular JSON (`src/data/candidates.json`) with zero external API dependencies. |
| **6. Market Intelligence** | Recharts visualizations of public vacancy snapshot ($N=620$), salary bands, and industrial clusters. | Demonstrates empirical secondary research and regional demand concentration. |
| **7. Competitor Landscape** | Competitor Service Heatmap Matrix ($1/0$ public presence), saturation bar chart, and **Market Gap Analysis**. | Identifies the low-saturation niche in practical pre-screening ($25\%$). |
| **8. ₹5 Lakh Business Model** | **Interactive Editable Budget** (10 items totaling ₹5,00,000), donut chart, and **Placement Revenue Simulator**. | Evaluates financial viability, monthly runway, and break-even thresholds. |
| **9. Launch Decision Dashboard** | **Dynamic Multi-Factor Decision Matrix** (6 weighted sensitivity criteria) + **Permanent vs. Contract Staffing** risk comparison. | Justifies why Lean Permanent model succeeds within ₹5L while Contract Staffing causes insolvency. |
| **10. 90-Day Launch Roadmap** | 3-phase milestone timeline (Days 1–30, 31–60, 61–90) with interactive task checklist. | De-risks market entry through phased milestone execution. |
| **11. MBA Analytics Dashboard** | Cross-filtering analytics view combining demand, salary, candidate distribution, and revenue curves. | Equips students and faculty with presentation-ready quantitative tools. |
| **12. About Project & Trust** | Academic disclaimers, data source attributions, and industrial cluster context. | Rigorous separation of secondary research, demo data, and model assumptions. |

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom brand colors, modern typography, glassmorphism, responsive grid)
- **Charts & Data Visualization**: [Recharts](https://recharts.org/) (Bar charts, Donut charts, Area charts, tooltips, responsive containers)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Plus Jakarta Sans & JetBrains Mono (via Google Fonts)
- **Data Persistence**: Local JSON files (no paid or proprietary backend required)

---

## 📂 Project Directory Structure

```text
hireready-coimbatore/
├── index.html                   # HTML entry point with Google Fonts & SEO meta tags
├── package.json                 # Project dependencies & scripts
├── vite.config.js               # Vite bundler configuration
├── tailwind.config.js           # Tailwind theme design tokens & colors
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main page layout & navigation coordinator
│   ├── index.css                # Tailwind directives & design system utilities
│   ├── data/                    # Modular JSON Datasets (easily customizable)
│   │   ├── candidates.json      # Mock verified candidate profiles & passport details
│   │   ├── marketDemand.json    # Secondary market vacancy data (N=620 listings)
│   │   ├── competitors.json     # Regional competitor service matrix & saturation
│   │   ├── budget.json          # ₹5,00,000 launch budget items & scenario settings
│   │   └── launchPlan.json      # 90-day execution milestones & task checklist
│   └── components/              # Modular UI & Dashboard Components
│       ├── Navbar.jsx           # Sticky navigation header with mobile drawer & CTAs
│       ├── Hero.jsx             # Hero section & Before vs. After comparison
│       ├── HowItWorks.jsx       # 7-step interactive workflow
│       ├── Employers.jsx        # Vacancy calibrator & mock shortlist generator
│       ├── Candidates.jsx       # Candidate journey & C102 passport showcase
│       ├── TalentPool.jsx       # Filterable candidate directory & table
│       ├── MarketIntelligence.jsx# Secondary demand & salary distribution charts
│       ├── CompetitorLandscape.jsx# Competitor heatmap matrix & gap analysis
│       ├── BusinessModel.jsx    # ₹5 Lakh editable budget & revenue simulator
│       ├── DecisionDashboard.jsx# Multi-factor launch decision model
│       ├── LaunchPlan.jsx       # Interactive 90-day timeline & checklist
│       ├── AnalyticsDashboard.jsx# MBA Business Analytics multi-filter dashboard
│       ├── AboutProject.jsx     # Case narrative & academic methodology disclosures
│       ├── Footer.jsx           # Final CTAs, chapter directory, and credits
│       └── CandidatePassportModal.jsx # High-fidelity digital passport popup
```

---

## ⚡ How to Run Locally

### Prerequisites
Make sure **Node.js** (v18 or higher) and **npm** are installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 3. Build for Production
To create a production-ready build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🔄 How to Customize or Replace Mock Data

All data is separated into standalone, typed JSON files inside `src/data/`:
1. **Candidate Records**: Update or add candidate objects in `src/data/candidates.json`.
2. **Market Demand Data**: Update vacancy counts, salary bands, and clusters in `src/data/marketDemand.json`.
3. **Competitor Matrix**: Modify evaluated competitors or service columns in `src/data/competitors.json`.
4. **Launch Budget Items**: Adjust baseline cost allocations in `src/data/budget.json`.
5. **Launch Plan Tasks**: Modify weekly deliverables in `src/data/launchPlan.json`.

---

## 🛡️ Academic Trust & Data Transparency Policy

As an academic business simulation for presentation to business school faculty:
- **Secondary Research**: All job demand metrics and agency comparisons are derived from reviewed public listings and recruitment agency websites.
- **Illustrative Figures**: Candidate profiles, test scores, and revenue projections are explicitly flagged with badges (`Demo Candidate`, `Demo / Target Metric`, `Illustrative Simulation`).
- **No Fictitious Evidence**: No false client logos, fabricated interview quotes, or artificial customer reviews are used.
- **Strategic Recommendation**: Lean Permanent Recruitment is recommended over Contract Staffing because ₹5 Lakh cannot absorb working-capital payroll lags.

---

## 📤 Pushing to GitHub

To publish this project to your GitHub account:

```bash
git init
git add .
git commit -m "Initial commit: HireReady Coimbatore MBA Business Simulation platform"
git branch -M main
git remote add origin https://github.com/<your-username>/hireready-coimbatore.git
git push -u origin main
```
