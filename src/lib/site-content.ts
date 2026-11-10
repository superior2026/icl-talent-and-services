export const COMPANY = {
  phone: "+234-817 073 2700",
  email: "infossl@iclgroupng.com",
  address: "26B, Oyedele Ogunniyi Street, By Prince of Anthony Hotel, Anthony Village, Lagos, Nigeria.",
  hours: "10:00 - 17:00",
  socials: { linkedin: "#", x: "#", facebook: "#", instagram: "#" },
};

// Placeholder statistics — labelled as such on the page. Replace with verified figures.
export const STATS = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 200, suffix: "+", label: "Clients served" },
  { value: 500, suffix: "+", label: "Candidates placed" },
  { value: 8, suffix: "", label: "Industries covered" },
];

export const CORE_SERVICES = [
  {
    slug: "recruitment-outsourcing",
    title: "Recruitment & Outsourcing",
    text: "Sourcing talent and managing outsourced teams under one accountable process.",
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    text: "Practical advice on strategy, structure and growth for leadership teams.",
  },
  {
    slug: "background-checks",
    title: "Background Checks",
    text: "Thorough verification of identity, history and references before you hire.",
  },
  {
    slug: "proof-of-funds",
    title: "Proof of Funds",
    text: "Credible documentation and verification support for funding and compliance needs.",
  },
  {
    slug: "candidate-assessment-testing",
    title: "Candidate Assessment and Testing",
    text: "Structured assessments that show capability, fit and readiness for the role.",
  },
  {
    slug: "training-service",
    title: "Training Service",
    text: "Targeted programmes that build skills, leadership and team performance.",
  },
  {
    slug: "payroll-accounting-management",
    title: "Payroll & Accounting Management",
    text: "Accurate payroll and accounting support that keeps your operations compliant.",
  },
  {
    slug: "security-services",
    title: "Security Services",
    text: "Reliable security staffing and support tailored to your site and risk profile.",
  },
] as const;

export const SERVICE_NAV = CORE_SERVICES.map((s) => ({
  to: "/services" as const,
  hash: s.slug,
  label: s.title,
}));

export const WHY_US = [
  { title: "Quality Candidates", text: "We consistently attract and interact with the very best candidates." },
  { title: "Prompt Service", text: "Staffing needs are always urgent and important. We respond accordingly." },
  { title: "Extensive Search", text: "We source via social media, job boards, targeted search & recommendations." },
  { title: "Cost Effective", text: "No ‘hidden costs’, we use a flexible cost model that is tailored to your needs." },
];

export const PROCESS = [
  { title: "Understand", text: "We define the role, skills and culture fit with you." },
  { title: "Source", text: "We search our network and advertise the vacancy." },
  { title: "Assess", text: "Candidates are screened, interviewed and tested." },
  { title: "Shortlist", text: "You receive a shortlist of qualified candidates." },
  { title: "Place & follow up", text: "We support onboarding and check in after placement." },
];

export const INDUSTRIES = ["Banking & Finance", "Oil & Gas", "Telecoms", "Manufacturing", "Healthcare", "Retail & FMCG", "Technology", "Public Sector"];

const TESTIMONIAL_QUOTE =
  "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway.";

export const TESTIMONIALS = [
  { quote: TESTIMONIAL_QUOTE, name: "Monty Moni", role: "CEO, Keen IT Solution", rating: 5 },
  { quote: TESTIMONIAL_QUOTE, name: "Mike Hotten", role: "CEO, Brick Consulting", rating: 5 },
  { quote: TESTIMONIAL_QUOTE, name: "John Bhai", role: "CEO, Brick Consulting", rating: 5 },
  { quote: TESTIMONIAL_QUOTE, name: "Jorina Bibi", role: "CEO, Brick Consulting", rating: 5 },
  { quote: TESTIMONIAL_QUOTE, name: "Delu Beta", role: "CEO, Brick Consulting", rating: 5 },
];

export const FAQS = [
  { q: "How do I apply for a vacancy?", a: "Create a free account, upload your CV and click Apply on any open role. You can track your application in My Account." },
  { q: "How can my company post a job?", a: "Use the Post a Job button and fill in the vacancy form. Our team will contact you to confirm the details." },
  { q: "Do you charge job seekers?", a: "No. Creating an account and applying for jobs is free for candidates." },
  { q: "Which services can I request?", a: "Recruitment & outsourcing, business advisory, background checks, proof of funds, candidate assessment and testing, training, payroll & accounting management, and security services." },
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
  "Recruitment & Outsourcing": {
    includes: [
      "Permanent and contract recruitment",
      "Executive and volume hiring",
      "Managed outsourced teams",
      "Onboarding, supervision and replacement cover",
    ],
    bestFor: "Organisations that need both strong hiring and reliable outsourced delivery.",
  },
  "Business Advisory": {
    includes: [
      "Strategy and growth planning",
      "Organisational design and restructuring",
      "Process and cost improvement",
      "Leadership decision support",
    ],
    bestFor: "Leadership teams who need clear advice before they invest time or money.",
  },
  "Background Checks": {
    includes: [
      "Identity and address verification",
      "Employment and education checks",
      "Criminal and reference screening",
      "Clear reporting before offer stage",
    ],
    bestFor: "Roles where trust, compliance and risk control matter from day one.",
  },
  "Proof of Funds": {
    includes: [
      "Document review and verification support",
      "Source-of-funds guidance",
      "Compliance-ready evidence packs",
      "Confidential handling of sensitive records",
    ],
    bestFor: "Clients who need credible proof of funds for transactions, partners or regulators.",
  },
  "Candidate Assessment and Testing": {
    includes: [
      "Competency and aptitude testing",
      "Role-specific skills assessments",
      "Structured interview support",
      "Shortlist scoring and recommendations",
    ],
    bestFor: "Hiring managers who want evidence of ability before the final decision.",
  },
  "Training Service": {
    includes: [
      "Skills gap analysis",
      "Leadership and soft-skills programmes",
      "Technical workshops",
      "Post-training impact review",
    ],
    bestFor: "Teams that need practical capability building, not generic classroom sessions.",
  },
  "Payroll & Accounting Management": {
    includes: [
      "Salary, tax and statutory processing",
      "Payslips and audit-ready records",
      "Bookkeeping and monthly reporting",
      "Staff and management query handling",
    ],
    bestFor: "Businesses that want payroll and accounting run accurately without building a large in-house team.",
  },
  "Security Services": {
    includes: [
      "Trained security personnel",
      "Site and access control support",
      "Shift coverage and supervision",
      "Incident reporting and escalation",
    ],
    bestFor: "Sites and organisations that need dependable people-focused security cover.",
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
