-- ==============================================================================
-- HIREREADY COIMBATORE: Supabase Database Schema
-- Run this script in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. CANDIDATES TABLE (Verified Talent Pool & Digital Passports)
CREATE TABLE IF NOT EXISTS public.candidates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    experience_years NUMERIC(4,1) NOT NULL DEFAULT 0.0,
    location TEXT NOT NULL DEFAULT 'Coimbatore',
    current_salary INTEGER,
    expected_salary INTEGER NOT NULL,
    notice_period_days INTEGER NOT NULL DEFAULT 15,
    skills TEXT[] NOT NULL DEFAULT '{}',
    skill_score INTEGER NOT NULL CHECK (skill_score BETWEEN 0 AND 100),
    hr_status TEXT NOT NULL DEFAULT 'PASSED',
    verification_status TEXT NOT NULL DEFAULT 'HireReady Verified',
    shift_readiness TEXT NOT NULL DEFAULT 'YES (Rotational)',
    education TEXT,
    practical_test TEXT,
    documents_verified TEXT[] DEFAULT '{}',
    evaluator_notes TEXT,
    is_demo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Candidate Directory filtering
CREATE INDEX IF NOT EXISTS idx_candidates_role ON public.candidates(role);
CREATE INDEX IF NOT EXISTS idx_candidates_expected_salary ON public.candidates(expected_salary);
CREATE INDEX IF NOT EXISTS idx_candidates_skills ON public.candidates USING GIN(skills);


-- 2. EMPLOYER VACANCIES TABLE (Job Mandates from Vacancy Calibrator)
CREATE TABLE IF NOT EXISTS public.employer_vacancies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role TEXT NOT NULL,
    experience_range TEXT NOT NULL DEFAULT '2-4 years',
    location TEXT NOT NULL DEFAULT 'Coimbatore',
    salary_min INTEGER NOT NULL DEFAULT 20000,
    salary_max INTEGER NOT NULL DEFAULT 28000,
    shift_requirement TEXT NOT NULL DEFAULT 'Rotational (Day / Night)',
    required_skills TEXT NOT NULL,
    joining_timeline TEXT NOT NULL DEFAULT 'Within 15 days',
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vacancies_role_salary ON public.employer_vacancies(role, salary_max);


-- 3. VACANCY SHORTLISTS (Junction connecting Vacancies to Shortlisted Candidates)
CREATE TABLE IF NOT EXISTS public.vacancy_shortlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vacancy_id UUID NOT NULL REFERENCES public.employer_vacancies(id) ON DELETE CASCADE,
    candidate_id TEXT NOT NULL REFERENCES public.candidates(id) ON DELETE RESTRICT,
    match_score NUMERIC(5,2),
    shortlisted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(vacancy_id, candidate_id)
);

CREATE INDEX IF NOT EXISTS idx_shortlists_vacancy ON public.vacancy_shortlists(vacancy_id);
CREATE INDEX IF NOT EXISTS idx_shortlists_candidate ON public.vacancy_shortlists(candidate_id);


-- 4. MARKET ROLE DEMAND TABLE (Secondary Research Vacancy Snapshot)
CREATE TABLE IF NOT EXISTS public.market_role_demand (
    id SERIAL PRIMARY KEY,
    role_name TEXT UNIQUE NOT NULL,
    openings_count INTEGER NOT NULL DEFAULT 0,
    share_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    avg_salary INTEGER NOT NULL DEFAULT 0,
    difficulty_index NUMERIC(3,1) NOT NULL DEFAULT 5.0,
    typical_notice_days INTEGER NOT NULL DEFAULT 15,
    source_label TEXT NOT NULL DEFAULT 'Secondary Research',
    sample_size INTEGER DEFAULT 620,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- 5. COMPETITOR MATRIX TABLE (Competitive Landscape Review)
CREATE TABLE IF NOT EXISTS public.competitor_matrix (
    id SERIAL PRIMARY KEY,
    agency_name TEXT UNIQUE NOT NULL,
    tier TEXT NOT NULL DEFAULT 'Local Agency',
    has_permanent SMALLINT NOT NULL DEFAULT 1,
    has_contract_staffing SMALLINT NOT NULL DEFAULT 0,
    has_bulk_hiring SMALLINT NOT NULL DEFAULT 0,
    has_rpo SMALLINT NOT NULL DEFAULT 0,
    has_technical_screening SMALLINT NOT NULL DEFAULT 0,
    has_payroll_services SMALLINT NOT NULL DEFAULT 0,
    primary_target TEXT,
    pricing_model TEXT,
    display_order INTEGER NOT NULL DEFAULT 1
);


-- 6. BUDGET ALLOCATIONS TABLE (₹5 Lakh Feasibility Line Items)
CREATE TABLE IF NOT EXISTS public.budget_allocations (
    item_key TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    is_reserve BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 1
);


-- 7. LAUNCH PLAN TASKS TABLE (90-Day Execution Milestones)
CREATE TABLE IF NOT EXISTS public.launch_plan_tasks (
    task_id TEXT PRIMARY KEY,
    phase_number INTEGER NOT NULL DEFAULT 1,
    phase_title TEXT NOT NULL,
    task_text TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Operations',
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 1
);


-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vacancy_shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_role_demand ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.launch_plan_tasks ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous reads for demonstration/faculty presentation
CREATE POLICY "Public read candidates" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Public read vacancies" ON public.employer_vacancies FOR SELECT USING (true);
CREATE POLICY "Public insert vacancies" ON public.employer_vacancies FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read shortlists" ON public.vacancy_shortlists FOR SELECT USING (true);
CREATE POLICY "Public insert shortlists" ON public.vacancy_shortlists FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read market_role_demand" ON public.market_role_demand FOR SELECT USING (true);
CREATE POLICY "Public read competitor_matrix" ON public.competitor_matrix FOR SELECT USING (true);
CREATE POLICY "Public read budget_allocations" ON public.budget_allocations FOR SELECT USING (true);
CREATE POLICY "Public update budget_allocations" ON public.budget_allocations FOR UPDATE USING (true);
CREATE POLICY "Public read launch_plan_tasks" ON public.launch_plan_tasks FOR SELECT USING (true);
CREATE POLICY "Public update launch_plan_tasks" ON public.launch_plan_tasks FOR UPDATE USING (true);

-- ==============================================================================
-- INITIAL SEED DATA (COIMBATORE CANDIDATES & RESEARCH BENCHMARKS)
-- ==============================================================================

-- Seed Candidates
INSERT INTO public.candidates (id, name, role, experience_years, location, current_salary, expected_salary, notice_period_days, skills, skill_score, hr_status, verification_status, shift_readiness, education, practical_test, documents_verified, evaluator_notes, is_demo)
VALUES 
('C101', 'Karthik R.', 'CNC / VMC Operator', 3.5, 'Kurichi, Coimbatore', 21000, 26000, 15, ARRAY['Fanuc Control', 'CNC Turning', 'G/M Codes', 'Vernier Caliper', 'Micrometer'], 88, 'PASSED', 'HireReady Verified', 'YES (Rotational)', 'Diploma in Mechanical Engineering', 'Pass (Dimensional tolerance ±0.02mm)', ARRAY['Aadhaar', 'Diploma Certificate', 'Last 3 Months Payslips', 'Relieving Letter'], 'Experienced with 3-axis CNC turning and Fanuc Oi-TF controllers.', TRUE),
('C102', 'Suresh Kumar M.', 'CNC / VMC Operator', 3.2, 'Peelamedu, Coimbatore', 19500, 24000, 15, ARRAY['Fanuc', 'VMC 3-Axis', 'Basic Inspection', 'Tool Setting', 'Boring Operations'], 86, 'PASSED', 'HireReady Verified', 'YES (Rotational)', 'ITI Machinist', 'Pass (Surface finish Ra 0.8 achieved)', ARRAY['Aadhaar', 'ITI Certificate', 'Experience Letter', 'Bank Statements'], 'Solid track record in automotive component machining.', TRUE),
('C103', 'Manojkumar P.', 'Quality Inspector', 4.0, 'SIDCO Industrial Estate, Coimbatore', 23000, 28000, 30, ARRAY['CMM Operation', 'Vernier Height Gauge', 'Profile Projector', 'GD&T', 'First Article Inspection'], 92, 'PASSED', 'HireReady Verified', 'YES (Day/Night)', 'DME (Diploma in Mechanical)', 'Pass (CMM program alignment test 95%)', ARRAY['Aadhaar', 'Educational Transcripts', 'Salary Slips', 'Form 16'], 'Skilled in GD&T symbols and Zeiss CMM inspection.', TRUE),
('C104', 'Vigneshwaran S.', 'Maintenance Technician', 5.2, 'Ganapathy, Coimbatore', 26000, 32000, 15, ARRAY['Hydraulics', 'Pneumatics', 'PLC Troubleshooting', 'Preventive Maintenance', 'Motor Rewinding'], 89, 'PASSED', 'HireReady Verified', 'YES (On-call & Shifts)', 'Diploma in Electrical & Electronics (DEEE)', 'Pass (Hydraulic valve circuit fault tracing)', ARRAY['Aadhaar', 'Electrical Wireman License', 'Service Certificates', 'Payslips'], '5+ years in high-volume foundry and precision machining lines.', TRUE),
('C105', 'Praveen V.', 'Mechanical Fitter', 2.8, 'Eachanari, Coimbatore', 17000, 21000, 7, ARRAY['Bench Fitting', 'Tapping & Reaming', 'Assembly Drawings', 'Torque Tightening', 'Bearing Pressing'], 84, 'PASSED', 'HireReady Verified', 'YES (Rotational)', 'ITI Fitter', 'Pass (Gearbox sub-assembly within 45 mins)', ARRAY['Aadhaar', 'ITI National Trade Certificate', 'Relieving Letter'], 'Expert in gearbox and pump housing assembly.', TRUE),
('C106', 'Arun Prasad B.', 'Production Supervisor', 6.0, 'Singanallur, Coimbatore', 30000, 36000, 30, ARRAY['OEE Improvement', '5S & Kaizen', 'Shift Allocation', 'Line Balancing', 'Material Requisition'], 91, 'PASSED', 'HireReady Verified', 'YES (Rotational)', 'B.E. Mechanical Engineering', 'Pass (OEE calculation & root cause case test)', ARRAY['Aadhaar', 'Degree Certificate', '6 Months Payslips', 'PF Statement'], 'Supervised team of 24 operators across two shifts.', TRUE),
('C107', 'Dinesh Babu G.', 'Machine Operator', 2.2, 'Thudiyalur, Coimbatore', 16500, 20000, 0, ARRAY['Conventional Lathe', 'Drilling', 'Facing & Centering', 'Deburring', 'Basic Gauging'], 81, 'PASSED', 'HireReady Verified', 'YES (Rotational)', '12th Standard + ITI Turner', 'Pass (Shaft step turning test)', ARRAY['Aadhaar', 'ITI Certificate', 'Previous Employer ID Card'], 'Immediate joiner (0 notice period). Reliable attendance record.', TRUE),
('C108', 'Saravanan T.', 'CNC / VMC Operator', 4.5, 'Kurichi, Coimbatore', 23500, 28000, 15, ARRAY['Siemens 828D', 'VMC 4-Axis', 'Fixture Alignment', 'Dial Indicator', 'Macro Programming'], 94, 'PASSED', 'HireReady Verified', 'YES (Rotational)', 'Diploma in Tool & Die Making', 'Pass (4th axis indexing setup and trial cut)', ARRAY['Aadhaar', 'Diploma Marksheets', 'Salary Slips', 'Relieving Letter'], 'High proficiency on Siemens controllers and 4th-axis rotary tables.', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Seed Market Role Demand
INSERT INTO public.market_role_demand (role_name, openings_count, share_pct, avg_salary, difficulty_index, typical_notice_days, source_label, sample_size)
VALUES
('CNC / VMC Operator', 156, 25.20, 23500, 8.8, 15, 'Secondary Research', 620),
('Machine Operator', 114, 18.40, 18500, 6.9, 10, 'Secondary Research', 620),
('Production Technician / Supervisor', 98, 15.80, 31000, 7.5, 30, 'Secondary Research', 620),
('Quality Inspector & CMM', 82, 13.20, 26500, 8.4, 20, 'Secondary Research', 620),
('Mechanical Fitter & Assembly', 76, 12.30, 20500, 7.1, 15, 'Secondary Research', 620),
('Maintenance & Automation', 54, 8.70, 33500, 9.1, 30, 'Secondary Research', 620),
('Setter / Tool & Die', 40, 6.40, 29000, 8.9, 20, 'Secondary Research', 620)
ON CONFLICT (role_name) DO NOTHING;

-- Seed Competitor Matrix
INSERT INTO public.competitor_matrix (agency_name, tier, has_permanent, has_contract_staffing, has_bulk_hiring, has_rpo, has_technical_screening, has_payroll_services, primary_target, pricing_model, display_order)
VALUES
('National Staffing Giant A', 'National Corporate', 1, 1, 1, 1, 0, 1, 'IT, Banking, Large Enterprise Manufacturing', '8.33% - 12.5% CTC', 1),
('Regional Industrial Staffing B', 'Regional Agency', 1, 1, 1, 0, 0, 1, 'Textile Mills, General Foundry Blue-collar', 'Volume fee per headcount', 2),
('Local Consultancy C (Gandhipuram)', 'Local Boutique', 1, 0, 1, 0, 0, 0, 'Office Admin, Sales, Entry Accounts', '15 days - 1 month salary flat', 3),
('Engineering Placement Cell D', 'Specialist Agency', 1, 0, 0, 0, 1, 0, 'Fresher Engineers, Graduate Trainees', '8.33% placement fee', 4),
('HireReady Coimbatore (Proposed)', 'Lean Tech-Enabled Niche', 1, 0, 0, 0, 1, 0, 'SME Manufacturing (CNC, Quality, Maintenance)', '8.33% - 10% on joining + 60-day replacement', 5)
ON CONFLICT (agency_name) DO NOTHING;

-- Seed Budget Allocations
INSERT INTO public.budget_allocations (item_key, category, amount, description, is_reserve, display_order)
VALUES
('ats_crm', 'Recruitment ATS & CRM Software', 50000, 'Cloud candidate tracker, WhatsApp API integration', FALSE, 1),
('hardware', 'Laptop & IT Hardware', 60000, 'High-reliability laptop, backup SSD, peripheral headsets', FALSE, 2),
('web_brand', 'Website, Domain & Brand Collaterals', 25000, 'Domain, fast hosting, employer brochures, digital passport templates', FALSE, 3),
('sourcing', 'Job Portals & Database Sourcing', 90000, 'Regional portal access credits for 6 months', FALSE, 4),
('assessment', 'Candidate Screening & Skill Testing Kits', 25000, 'Technical rubric licenses, partner workshop machining test stipend', FALSE, 5),
('marketing', 'Digital Marketing & SME Client Acquisition', 40000, 'LinkedIn outreach tools, targeted Google Local ads in Coimbatore', FALSE, 6),
('travel', 'Local Travel & Client Plant Visits', 25000, 'Fuel & local transit across Kurichi, SIDCO, Peelamedu & Ganapathy', FALSE, 7),
('legal', 'Legal, GST Registration & Accounting', 25000, 'Firm incorporation, MSME Udyam, GST filing, contract drafting', FALSE, 8),
('operating', 'Office / Co-working & Utilities (6 Mos)', 60000, 'Co-working flexi-desk + mobile/broadband + basic office supplies', FALSE, 9),
('reserve', 'Working Capital Cash Reserve', 100000, 'Emergency cash cushion ensuring 4-5 months operational runway', TRUE, 10)
ON CONFLICT (item_key) DO NOTHING;

-- Seed Launch Plan Tasks (90-Day Execution Roadmap)
INSERT INTO public.launch_plan_tasks (task_id, phase_number, phase_title, task_text, category, is_completed, display_order)
VALUES
('t1_1', 1, 'Market Validation & Rubric Construction', 'Conduct 20 structured interviews with Coimbatore SME plant managers & HR heads (Kurichi, SIDCO, Peelamedu)', 'Primary Research', TRUE, 1),
('t1_2', 1, 'Market Validation & Rubric Construction', 'Audit 5 local competitor pricing proposals and contract terms for technical operator roles', 'Competitor Intelligence', TRUE, 2),
('t1_3', 1, 'Market Validation & Rubric Construction', 'Draft HireReady CNC/VMC, Quality, and Maintenance 20-point practical assessment rubrics', 'Product Development', TRUE, 3),
('t1_4', 1, 'Market Validation & Rubric Construction', 'Secure access to a partner machine shop or ITI training center for in-person practical tests', 'Infrastructure', FALSE, 4),
('t1_5', 1, 'Market Validation & Rubric Construction', 'Prototype digital Candidate Passport template with verified verification badges', 'Branding & Tech', FALSE, 5),
('t1_6', 1, 'Market Validation & Rubric Construction', 'Incorporate Sole Proprietorship / LLP, obtain MSME Udyam and GST certificates', 'Legal & Compliance', FALSE, 6),
('t2_1', 2, 'Lean Pilot Launch & First Placements', 'Sign contingency recruitment agreements with 4–6 Coimbatore engineering SMEs (at 8.33% CTC)', 'Client Acquisition', FALSE, 7),
('t2_2', 2, 'Lean Pilot Launch & First Placements', 'Source 80+ technician resumes via regional portals, WhatsApp trade groups, and ITI alumni networks', 'Talent Sourcing', FALSE, 8),
('t2_3', 2, 'Lean Pilot Launch & First Placements', 'Screen candidates through phone interview + practical workshop test, certifying 25 HireReady profiles', 'Screening & Verification', FALSE, 9),
('t2_4', 2, 'Lean Pilot Launch & First Placements', 'Deliver 3-candidate verified shortlists to employers within 72 hours of receiving mandate', 'Fulfillment', FALSE, 10),
('t2_5', 2, 'Lean Pilot Launch & First Placements', 'Coordinate employer interviews, track attendance, and facilitate offer rollout', 'Operations', FALSE, 11),
('t2_6', 2, 'Lean Pilot Launch & First Placements', 'Achieve first 3-5 confirmed candidate joinings with replacement guarantee terms', 'Revenue Milestones', FALSE, 12),
('t3_1', 3, 'Measurement, Unit Economics & Scaling', 'Analyze conversion funnel: Shortlist-to-Interview, Interview-to-Offer, Offer-to-Join ratios', 'Analytics', FALSE, 13),
('t3_2', 3, 'Measurement, Unit Economics & Scaling', 'Audit candidate 30-day and 60-day retention rates at client machine shops', 'Quality Assurance', FALSE, 14),
('t3_3', 3, 'Measurement, Unit Economics & Scaling', 'Collect Net Promoter Score (NPS) and structured feedback from both plant heads and placed candidates', 'Client Feedback', FALSE, 15),
('t3_4', 3, 'Measurement, Unit Economics & Scaling', 'Test premium pricing tier (10% CTC for urgent CNC programmer/supervisor roles)', 'Pricing Strategy', FALSE, 16),
('t3_5', 3, 'Measurement, Unit Economics & Scaling', 'Calculate Net Cash Flow vs ₹5 Lakh budget and project month 4–12 runway', 'Financial Management', FALSE, 17),
('t3_6', 3, 'Measurement, Unit Economics & Scaling', 'Make Go / No-Go decision on expanding into Tirupur / Erode or hiring a full-time recruiter', 'Strategic Growth', FALSE, 18)
ON CONFLICT (task_id) DO NOTHING;

