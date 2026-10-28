// Editable placeholder content. Replace with real company details before launch.
export const COMPANY = {
  phone: "+234 000 000 0000",
  email: "hello@example.com",
  address: "Office address, City, Country",
  hours: "Mon–Fri, 9:00–17:00",
  socials: { linkedin: "#", x: "#", facebook: "#", instagram: "#" },
};

// Placeholder statistics — labelled as such on the page. Replace with verified figures.
export const STATS = [
  { value: "[00]+", label: "Years of experience" },
  { value: "[000]+", label: "Clients served" },
  { value: "[000]+", label: "Candidates placed" },
  { value: "[00]", label: "Industries covered" },
];

export const CORE_SERVICES = [
  { title: "Business Consulting", text: "Strategy, restructuring and growth advisory." },
  { title: "Recruitment & Executive Search", text: "Sourcing and assessing talent at every level." },
  { title: "Staff Outsourcing", text: "Fully managed outsourced teams." },
  { title: "Payroll Administration", text: "Accurate, compliant payroll every cycle." },
  { title: "HR Advisory", text: "Policies, structures and people support." },
  { title: "Training & Development", text: "Programmes that build capable teams." },
  { title: "Company Secretarial & Compliance", text: "Regulatory filings and governance." },
  { title: "Back-office Support", text: "Admin and operations handled for you." },
];

export const WHY_US = [
  { title: "People-first approach", text: "We take time to understand your culture and goals." },
  { title: "Rigorous screening", text: "Structured interviews, assessments and reference checks." },
  { title: "One partner, many services", text: "Consulting, hiring and support under one roof." },
  { title: "Confidential & compliant", text: "Your data and candidates' data handled with care." },
];

export const PROCESS = [
  { title: "Understand", text: "We define the role, skills and culture fit with you." },
  { title: "Source", text: "We search our network and advertise the vacancy." },
  { title: "Assess", text: "Candidates are screened, interviewed and tested." },
  { title: "Shortlist", text: "You receive a shortlist of qualified candidates." },
  { title: "Place & follow up", text: "We support onboarding and check in after placement." },
];

export const INDUSTRIES = ["Banking & Finance", "Oil & Gas", "Telecoms", "Manufacturing", "Healthcare", "Retail & FMCG", "Technology", "Public Sector"];

// Placeholder testimonials — replace with real, permission-granted client quotes.
export const TESTIMONIALS = [
  { quote: "Sample testimonial text. Replace with a real quote from a client.", name: "Client Name", role: "Title, Company" },
  { quote: "Sample testimonial text. Replace with a real quote from a client.", name: "Client Name", role: "Title, Company" },
  { quote: "Sample testimonial text. Replace with a real quote from a client.", name: "Client Name", role: "Title, Company" },
];

export const INSIGHTS = [
  { tag: "Recruitment", title: "How to write a job description that attracts the right candidates", date: "Coming soon" },
  { tag: "Outsourcing", title: "When does outsourcing a function make sense for a growing business?", date: "Coming soon" },
  { tag: "Careers", title: "Preparing your CV: what recruiters look for first", date: "Coming soon" },
];

export const FAQS = [
  { q: "How do I apply for a vacancy?", a: "Create a free account, upload your CV and click Apply on any open role. You can track your application in My Account." },
  { q: "How can my company post a job?", a: "Use the Post a Job button and fill in the vacancy form. Our team will contact you to confirm the details." },
  { q: "Do you charge job seekers?", a: "No. Creating an account and applying for jobs is free for candidates." },
  { q: "Which services can I request?", a: "Consulting, recruitment, outsourcing, payroll, HR, training, compliance and back-office support." },
  { q: "How quickly will you respond?", a: "Our team reviews every request and aims to respond promptly during business hours." },
];

// ============ Company page ============

export const MISSION =
  "To connect capable people with the organisations that need them, and to give growing businesses the advice, teams and support required to run well.";

export const VISION =
  "To be the first partner professionals and organisations think of — for hiring, for advice, and for the everyday functions that keep a business moving.";

export const STORY = [
  "ICL Group works from a simple observation: businesses and job seekers are often stuck on opposite sides of the same problem. Organisations struggle to find and keep capable people, and capable people struggle to find organisations where their skills are genuinely used.",
  "So we built one firm that works with both sides. Recruitment and executive search sit alongside business consulting, staff outsourcing and corporate support — which means the team advising you on structure is the same team that can source, assess and onboard the people to fill it.",
  "We are deliberately practical. Every engagement starts with the constraint you are actually facing — a role that will not fill, a payroll that takes too long, a function that has outgrown the way it is run — and ends with something your team can operate confidently.",
];

// Placeholder leadership profiles. Replace names, roles and photographs before launch.
export const LEADERSHIP = [
  { name: "[Leader name]", role: "[Managing Director]", focus: "Client relationships and consulting engagements" },
  { name: "[Leader name]", role: "[Head of Recruitment]", focus: "Executive search and candidate assessment" },
  { name: "[Leader name]", role: "[Head of Operations]", focus: "Outsourcing, payroll and back-office delivery" },
  { name: "[Leader name]", role: "[Head of Governance]", focus: "Company secretarial, compliance and risk" },
];

// Placeholder timeline. Replace each line with a real, verifiable milestone.
export const MILESTONES = [
  { year: "[Year]", title: "[Milestone]", text: "Replace with a real milestone, for example the year the firm was founded." },
  { year: "[Year]", title: "[Milestone]", text: "Replace with a real milestone, for example your first retained client." },
  { year: "[Year]", title: "[Milestone]", text: "Replace with a real milestone, for example opening a second office." },
  { year: "[Year]", title: "[Milestone]", text: "Replace with a real milestone, for example launching an outsourcing practice." },
];

export const VALUES = [
  { title: "Integrity", text: "Confidential, honest advice — including when the recommendation is not to hire, or not to engage us." },
  { title: "Precision", text: "Structured processes and documented evidence behind every search, filing and payroll run." },
  { title: "Partnership", text: "We measure ourselves by your outcomes: the roles that stick, the savings that hold, the risks that never arrive." },
  { title: "Care", text: "Clients and candidates are people. We respond, we explain, and we do not disappear after placement." },
];

// ============ What we do page ============

export const SERVICE_OFFERINGS: Record<string, { includes: string[]; bestFor: string }> = {
  "Business Consulting": {
    includes: ["Strategy and growth planning", "Organisational design and restructuring", "Process and cost improvement", "Market entry and feasibility studies"],
    bestFor: "Leadership teams at a turning point — scaling, restructuring or entering a new market.",
  },
  "Recruitment & Executive Search": {
    includes: ["Confidential executive search", "Mass, graduate and trainee recruitment", "Structured interviews and assessments", "Reference and background checks"],
    bestFor: "Roles you cannot afford to get wrong, or hiring at volume against a deadline.",
  },
  "Staff Outsourcing": {
    includes: ["Fully managed outsourced teams", "Recruitment, contracts and day-one onboarding", "Supervision, performance and monthly reporting", "Replacement cover when someone leaves"],
    bestFor: "Functions you would rather not run yourself — facilities, admin, sales support or customer care.",
  },
  "Payroll Administration": {
    includes: ["Salary, tax and statutory deductions", "Benefits, loans and arrears processing", "Payslips, management reports and audit trail", "Payroll queries answered for your staff"],
    bestFor: "Growing teams where payroll has become too risky or too time-consuming to run in-house.",
  },
  "HR Advisory": {
    includes: ["Employee handbooks and policy drafting", "Discipline, grievance and exit support", "HR health checks and compliance reviews", "Manager coaching and people planning"],
    bestFor: "Businesses without a full-time HR lead who still need expert answers quickly.",
  },
  "Training & Development": {
    includes: ["Skills gap analysis", "Leadership and management programmes", "Technical and soft-skills workshops", "Measuring impact after the training ends"],
    bestFor: "Teams whose capability has not kept pace with the ambition of the business.",
  },
  "Company Secretarial & Compliance": {
    includes: ["Annual returns, filings and statutory records", "Board and shareholder documentation", "Regulatory and licence tracking", "Governance advice and register upkeep"],
    bestFor: "Directors who need filings and governance handled without building an in-house team.",
  },
  "Back-office Support": {
    includes: ["Administrative and clerical support", "Records, filing and data management", "Customer and supplier correspondence", "Routine reporting and daily operations"],
    bestFor: "Founders and small teams spending the week on admin instead of growth.",
  },
};

export const ENGAGEMENT_MODELS = [
  { title: "Project engagement", text: "A defined scope, timeline and fee. Suited to consulting work with a clear beginning and end." },
  { title: "Retained search", text: "We work exclusively on a senior role, with regular updates and a replacement commitment." },
  { title: "Managed outsourcing", text: "We run the function for a monthly fee, with agreed service levels and a named contact." },
  { title: "Advisory retainer", text: "A set number of advisory hours each month, for the questions that arrive between projects." },
];

// ============ Contact page ============

export const CONTACT_PATHS = [
  { title: "I want to hire", text: "Send us the role and we will come back with a plan, a timeline and a fee.", to: "/post-job", cta: "Post a job" },
  { title: "I need advice or support", text: "Tell us the problem you are trying to solve and we will say plainly whether we can help.", to: "/services", cta: "See what we do" },
  { title: "I'm looking for work", text: "Create a free account, upload your CV and apply for open roles online.", to: "/jobs", cta: "Browse vacancies" },
];

export const CONTACT_FAQ = [
  { q: "How quickly will you reply?", a: "Every enquiry is reviewed and answered during business hours. Requests sent at the weekend or on a public holiday are picked up on the next working day." },
  { q: "Is there a charge to speak to you?", a: "No. The first conversation is free and carries no obligation. If we are not the right fit for your need, we will tell you." },
  { q: "Can you sign a non-disclosure agreement?", a: "Yes. Mention it in your message and we will put an NDA in place before you share the details." },
  { q: "Do you work outside your local area?", a: "Yes. We work with clients remotely and on site. Tell us where the work is and we will confirm coverage." },
];
