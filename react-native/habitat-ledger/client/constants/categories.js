export const CATEGORIES = [
  { id: 'water', label: 'Water / Plumbing', vectorIcon: 'water', color: '#1565c0', bg: '#E0F2FE' },
  { id: 'electrical', label: 'Electrical', vectorIcon: 'flash', color: '#e65100', bg: '#FEF3C7' },
  { id: 'hvac', label: 'HVAC & Heating', vectorIcon: 'snow', color: '#00695c', bg: '#CCFBF1' },
  { id: 'pest', label: 'Pest & Infestation', vectorIcon: 'bug', color: '#5d4037', bg: '#F3E8FF' },
  { id: 'structural', label: 'Structural & Walls', vectorIcon: 'business', color: '#37474f', bg: '#E2E8F0' },
  { id: 'appliances', label: 'Appliances', vectorIcon: 'hardware-chip', color: '#6a1b9a', bg: '#FCE7F3' },
  { id: 'security', label: 'Security & Locks', vectorIcon: 'lock-closed', color: '#b71c1c', bg: '#FFE4E6' },
  { id: 'maintenance', label: 'General Maintenance', vectorIcon: 'hammer', color: '#2e7d32', bg: '#DCFCE7' },
];

export const SEVERITIES = [
  { id: 'critical', label: 'Critical', color: '#dc2626', bg: '#fee2e2', border: '#fca5a5', hint: 'Immediate safety / habitability emergency' },
  { id: 'high', label: 'High', color: '#ea580c', bg: '#ffedd5', border: '#fdba74', hint: 'Urgent code violation, fix promptly' },
  { id: 'medium', label: 'Medium', color: '#b45309', bg: '#fef3c7', border: '#fcd34d', hint: 'Moderate maintenance priority' },
  { id: 'low', label: 'Low', color: '#15803d', bg: '#dcfce7', border: '#86efac', hint: 'Minor cosmetic or general repair' },
];

export const STATUSES = [
  { id: 'open', label: 'Open', color: '#ea580c', bg: '#ffedd5', vectorIcon: 'alert-circle' },
  { id: 'in_progress', label: 'In Progress', color: '#2563eb', bg: '#dbeafe', vectorIcon: 'sync' },
  { id: 'closed', label: 'Resolved', color: '#16a34a', bg: '#dcfce7', vectorIcon: 'checkmark-circle' },
];

export const LEGAL_LAWS = [
  {
    id: 'lead',
    iconName: 'home',
    tag: 'Federal · 1992',
    title: 'Residential Lead-Based Paint Hazard Reduction Act (Title X)',
    statute: 'Public Law 102-550 · Section 1018',
    agency: 'U.S. Environmental Protection Agency (EPA)',
    summary:
      'The primary federal disclosure law governing home sales and rentals. Lead-based paint was banned in U.S. homes in 1978, but remains present in millions of older properties.',
    rights: [
      'Sellers and landlords of pre-1978 housing MUST disclose all known lead-based paint hazards before signing a contract or lease.',
      'You must receive the EPA-approved pamphlet "Protect Your Family From Lead In Your Home" before signing.',
      'A "Lead Warning Statement" must be included in the sales contract or lease.',
      'As a tenant/buyer, you have a federally guaranteed 10-day period to conduct a lead inspection.',
      'All disclosure documents must be retained for 3 years after lease completion.',
      'Violations are enforceable by the EPA with civil penalties.',
    ],
    exceptions: [
      'Zero-bedroom units (unless a child under 6 lives there).',
      'Short-term leases of 100 days or less where no renewal occurs.',
      'Housing built after 1977.',
      'Housing tested and certified lead-free by a certified inspector.',
    ],
    source: 'epa.gov',
    sourceUrl: 'https://www.epa.gov/lead/real-estate-disclosures-about-potential-lead-hazards',
  },
  {
    id: 'fha',
    iconName: 'scale',
    tag: 'Federal · 1968',
    title: 'Fair Housing Act (FHA)',
    statute: 'Title VIII of the Civil Rights Act of 1968',
    agency: 'Department of Housing and Urban Development (HUD)',
    summary:
      'The cornerstone of federal housing protection. It is illegal for landlords, sellers, or agents to discriminate based on membership in any of the seven protected classes.',
    rights: [
      'A landlord CANNOT refuse to rent based on race, color, national origin, religion, sex, familial status, or disability.',
      'A landlord CANNOT charge higher security deposits or different lease terms based on a protected class.',
      'Discriminatory advertising is explicitly illegal.',
      'Landlords MUST make reasonable accommodations for tenants with disabilities (including service animals).',
      'You can file a formal complaint with HUD within 1 year of the discriminatory act.',
    ],
    source: 'hud.gov',
    sourceUrl: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_rights_and_obligations',
  },
  {
    id: 'habitability',
    iconName: 'shield-checkmark',
    tag: 'Case Law · 1970',
    title: 'Implied Warranty of Habitability',
    statute: 'Javins v. First National Realty Corp. (D.C. Circuit, 1970)',
    agency: 'Applicable across all U.S. states',
    summary:
      'The foundational legal doctrine establishing that a residential lease is a contract for livable services. Your landlord has an ongoing legal duty to maintain safe, sanitary, and habitable conditions.',
    rights: [
      'Your unit must be weatherproof and structurally sound (no major roof leaks, crumbling walls, broken windows).',
      'Essential utilities (hot/cold water, heat, electricity) must function at all times.',
      'Property must be free from significant pest infestations.',
      'Smoke detectors, carbon monoxide detectors, and working locks are mandatory.',
      'If the landlord breaches this warranty, rent withholding or repair-and-deduct remedies apply in many states.',
    ],
    source: 'USALawExplained.com',
    sourceUrl: 'https://usalawexplained.com/tenant-rights',
  },
  {
    id: 'hmda',
    iconName: 'document-text',
    tag: 'Federal · 1975',
    title: 'Home Mortgage Disclosure Act (HMDA)',
    statute: 'HMDA 1975 · Regulation C · CFPB',
    agency: 'Consumer Financial Protection Bureau (CFPB)',
    summary:
      'Requires financial institutions to collect and report mortgage lending data to detect discriminatory lending patterns and ensure community housing needs are met.',
    rights: [
      'Lenders must publicly disclose mortgage data to illuminate lending patterns.',
      'Used to enforce fair lending laws and detect discriminatory mortgage denials.',
      'CFPB publishes annual public data accessible to all consumers.',
    ],
    source: 'consumerfinance.gov',
    sourceUrl: 'https://www.consumerfinance.gov/data-research/hmda/',
  },
  {
    id: 'magnuson',
    iconName: 'construct',
    tag: 'Federal · 1975',
    title: 'Magnuson-Moss Warranty Act & Implied Warranties',
    statute: '15 U.S.C. §§ 2301–2312 · FTC Enforcement',
    agency: 'Federal Trade Commission (FTC)',
    summary:
      'Governs written and implied warranties on consumer products and home appliances. Sellers cannot eliminate implied warranty protections without explicit disclosure.',
    rights: [
      'Written warranties must be available to read before purchase.',
      '"Warranty of merchantability" automatically guarantees products do what they are designed to do.',
      'If reported during warranty, the seller must correct the defect even if the warranty period subsequently expires.',
    ],
    source: 'consumer.ftc.gov',
    sourceUrl: 'https://consumer.ftc.gov/articles/warranties',
  },
  {
    id: 'privacy',
    iconName: 'key',
    tag: 'Privacy Protection',
    title: 'Right to Quiet Enjoyment & Landlord Entry Restrictions',
    statute: 'State Statutes (CA: Civ. Code §1954 · FL: §83.53 · NY: RPL §235-b)',
    agency: 'Enforced at State Level',
    summary:
      'A covenant implied in every residential lease. Your landlord cannot enter your home without proper advance notice, cannot harass you, and cannot interfere with your normal property use.',
    rights: [
      'California: Landlord must give 24 hours written notice before non-emergency entry.',
      'Florida: Landlord must give 12 hours reasonable notice before entry.',
      'New York: 24 hours reasonable notice standard.',
      'Texas: Reasonable notice required before entering premises.',
      'Repeated entry without notice constitutes illegal harassment.',
    ],
    source: 'USALawExplained.com',
    sourceUrl: 'https://usalawexplained.com/tenant-rights',
  },
  {
    id: 'texas_rcla',
    iconName: 'business',
    tag: 'State Law · Texas',
    title: 'Texas Residential Construction Liability Act (RCLA)',
    statute: 'Texas Property Code, Chapter 27',
    agency: 'Texas Civil Courts',
    summary:
      'Governs construction defect disputes between property owners and builders in Texas. Before any litigation, a mandatory notice and inspection procedure must be followed.',
    rights: [
      'Must provide formal written notice via certified mail describing specific defects.',
      'Contractor has legal right to inspect property up to 3 times within 35 days.',
      'Builder has 60 days to make a written settlement offer to repair or compensate.',
    ],
    source: 'texasinspector.com',
    sourceUrl: 'https://www.texasinspector.com',
  },
  {
    id: 'florida_sb360',
    iconName: 'time',
    tag: 'State Law · Florida · 2023',
    title: 'Florida Senate Bill 360 (SB 360) — Reduced Statute of Repose',
    statute: 'FL SB 360 · 2023 Tort Reform Act',
    agency: 'Florida Legislature — Effective 2023',
    summary:
      'Critical reform that drastically reduced the time Florida property owners have to discover and file claims for hidden construction defects from 10 down to 7 years.',
    rights: [
      'You now have ONLY 7 years to discover and file claims for latent hidden defects.',
      'Slow-acting structural failures (underslab plumbing, degrading waterproofing) take 8-10 years, meaning early inspection documentation is essential.',
      'Action: Schedule independent inspections at years 2, 4, and 6 to lock in evidence.',
    ],
    warning: 'This law strongly favors builders. Legal window to sue for hidden defects is shorter than before.',
    source: 'flsenate.gov',
    sourceUrl: 'https://www.flsenate.gov',
  },
];

export const STATE_COMPARISONS = [
  {
    right: 'Security Deposit Limit',
    ca: { text: '2–3 months rent', status: 'standard' },
    tx: { text: 'No state limit', status: 'warning' },
    ny: { text: '1 month rent', status: 'good' },
    fl: { text: 'No state limit', status: 'warning' },
  },
  {
    right: 'Landlord Entry Notice',
    ca: { text: '24 hrs written', status: 'good' },
    tx: { text: '"Reasonable" (undefined)', status: 'warning' },
    ny: { text: '~24 hrs (court)', status: 'good' },
    fl: { text: '12 hours', status: 'standard' },
  },
  {
    right: 'Rent Withholding for Repairs',
    ca: { text: 'Allowed (strict)', status: 'good' },
    tx: { text: 'Allowed (very risky)', status: 'warning' },
    ny: { text: 'Allowed (common)', status: 'good' },
    fl: { text: 'Not allowed', status: 'bad' },
  },
  {
    right: 'Eviction Notice (Non-Payment)',
    ca: { text: '3-Day Notice to Quit', status: 'standard' },
    tx: { text: '3-Day Notice to Vacate', status: 'standard' },
    ny: { text: '14-Day Demand', status: 'good' },
    fl: { text: '3-Day (excl weekends)', status: 'standard' },
  },
  {
    right: 'Tenant Protections Overall',
    ca: { text: 'Very Strong', status: 'good' },
    tx: { text: 'Landlord-Friendly', status: 'bad' },
    ny: { text: 'Strong (NYC stabilized)', status: 'good' },
    fl: { text: 'Strict & time-sensitive', status: 'warning' },
  },
];

export const AWARENESS_PROBLEMS = [
  {
    iconName: 'time',
    title: 'Compressed Timelines & Curing',
    severity: 'critical',
    detail:
      'Builders erect framing in 4 days or less under quota pressure. Foundations are poured and built on before concrete reaches compressive curing strength, causing settling cracks and long-term structural failure.',
  },
  {
    iconName: 'cash',
    title: 'Cosmetics Over Structure',
    severity: 'high',
    detail:
      'Developers spend budget on visible finishes (quartz counters, paint) rather than paying for superior HVAC, wall insulation, or engineered foundations. Beautiful surfaces hide substandard skeletal framing.',
  },
  {
    iconName: 'search',
    title: 'Inspection Obstruction',
    severity: 'critical',
    detail:
      'Builders systematically deny Phase 1 (pre-pour) and Phase 2 (pre-drywall) independent inspections citing OSHA safety rules. Once drywall is installed, crushed plumbing, missing insulation, and faulty wiring are sealed.',
  },
  {
    iconName: 'shield',
    title: 'Regulatory Capture (Private Providers)',
    severity: 'high',
    detail:
      'State laws allow developers to hire their own private inspectors for code compliance. Inspectors are paid directly by the developers whose work they evaluate, creating direct conflict of interest.',
  },
  {
    iconName: 'videocam',
    title: 'Virtual Inspection Loopholes',
    severity: 'high',
    detail:
      'State regulations permit asynchronous video submissions in place of physical in-person inspections. Contractors control camera angles and lighting, keeping structural flaws off-screen.',
  },
  {
    iconName: 'trending-down',
    title: 'Mortgage Rate Buydown Illusion',
    severity: 'high',
    detail:
      'Builders offer temporary 2-1 buydowns (e.g. 0.99% intro rate) to sustain demand without dropping list prices. When buydowns expire, payments spike on homes whose construction quality fails.',
  },
  {
    iconName: 'alert-circle',
    title: 'Post-Sale Abandonment',
    severity: 'critical',
    detail:
      'Buyers report catastrophic slab leaks ($40,000+) within 2.5 years — only to find plumbing warranties expired at 24 months. Builders redirect repair crews to new profitable units while ignoring warranty punch lists.',
  },
  {
    iconName: 'business',
    title: 'Foundation & Structural Failures',
    severity: 'critical',
    detail:
      'Poured concrete without proper vibration causes internal gravelly voids (honeycombing). Moisture corrodes internal rebar, expanding and shattering concrete (spalling). Remediation costs exceed $70,000.',
  },
  {
    iconName: 'water',
    title: 'Water Infiltration Failures',
    severity: 'high',
    detail:
      'Missing vapor barriers between slab and wood framing draw moisture into interior walls. Improper roof and window flashing produces toxic black mold colonies and wood rot.',
  },
  {
    iconName: 'flash',
    title: 'MEP (Mechanical, Electrical, Plumbing) Defects',
    severity: 'critical',
    detail:
      'Undersized electrical cabling melts insulation under load. Missing GFCI in wet areas violates building code. Bent HVAC flexible ducts bottleneck airflow and drive up electricity bills.',
  },
];

export const REMEDIATION_COSTS = [
  { category: 'Foundation & Structural', signs: 'Bouncing floors, diagonal wall cracks, sticking doors', cost: '$10,000 – $70,000+' },
  { category: 'Water Infiltration', signs: 'Sagging ceilings, efflorescence salt, hidden mold', cost: '$500 – $24,000+' },
  { category: 'Plumbing & HVAC', signs: 'Gurgling drains, slab leaks, uneven room temperatures', cost: '$500 – $30,000+' },
  { category: 'Electrical Systems', signs: 'Flickering lights, tripping breakers, missing GFCI', cost: '$500 – $30,000+' },
  { category: 'Cosmetics & Finishing', signs: 'Uneven tiles (lippage), peeling paint, misaligned trim', cost: 'Varies by scope' },
];
