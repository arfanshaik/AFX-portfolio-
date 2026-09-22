export type Project = {
  slug: string; title: string; shortTitle: string; description: string; tags: string[];
  year: number; role: string; status: string;
  visual: "suite" | "review" | "diagnostics" | "resume" | "shield" | "optimizer" | "driver" | "gaming";
  problem: string; approach: string; solution: string; result: string;
  github: string | null; cover: string | null; gallery: string[];
};
export const projects: Project[] = [
  {
    slug: "afx-dev-suite", title: "AFX Dev Suite", shortTitle: "DEV SUITE", visual: "suite",
    description: "A collection of AI and developer-focused tools designed to make development workflows faster and more intelligent.",
    tags: ["AI", "Developer Tools", "Automation"], year: 2026, role: "Product concept · Interface design", status: "In development",
    problem: "Development involves moving between tools, context and repetitive tasks. That fragmentation gets in the way of building.",
    approach: "Bring related developer workflows together under one coherent AFX interface, with clear entry points for each task.",
    solution: "A unified direction for AI-assisted development tools, connecting code review, issue discovery and automation.",
    result: "An ongoing collection of developer tool ideas. The focus is a consistent experience across the suite; production usage is not yet documented.",
    github: null, cover: null, gallery: [],
  },
  {
    slug: "afx-code-reviewer", title: "AFX Code Reviewer", shortTitle: "CODE REVIEWER", visual: "review",
    description: "An AI-assisted code analysis experience designed to help developers review, understand and improve source code.",
    tags: ["AI", "Code Analysis", "Developer Experience"], year: 2026, role: "AI application · Interface design", status: "Portfolio project",
    problem: "Finding an issue is only useful when a developer can understand why it matters and what to do next.",
    approach: "Connect code analysis to readable explanations, keeping source code and review feedback close together.",
    solution: "An AI-assisted review experience centered on understandable feedback and practical improvements to code.",
    result: "A portfolio exploration of AI-assisted review. Suggested changes still need human review and testing; no accuracy benchmark is claimed.",
    github: null, cover: null, gallery: [],
  },
  {
    slug: "afx-bug-detector", title: "AFX Bug Detector", shortTitle: "BUG DETECTOR", visual: "diagnostics",
    description: "A system concept for identifying issues across computer environments and presenting them through an accessible interface.",
    tags: ["Diagnostics", "AI", "UX"], year: 2026, role: "Product concept · UX design", status: "Concept",
    problem: "Technical system issues can be difficult to interpret when the information is scattered or overly complex.",
    approach: "Explore a readable diagnostic experience that helps people move from an issue report to an informed next step.",
    solution: "A concept for organizing system issues in an accessible interface across desktop and mobile experiences.",
    result: "A product concept focused on diagnostic clarity. Hardware coverage and detection performance have not been validated.",
    github: null, cover: null, gallery: [],
  },
  {
    slug: "resumex", title: "ResumeX", shortTitle: "RESUMEX", visual: "resume",
    description: "A resume creation platform designed to help students and professionals build role-specific resumes.",
    tags: ["Web App", "Product Design", "Career Tech"], year: 2026, role: "Product design · Frontend", status: "Portfolio project",
    problem: "Students and professionals need to present their experience differently for different roles, without starting from an empty page.",
    approach: "Structure the experience around relevant skills, education and projects, with a clear path from content to a finished resume.",
    solution: "A role-focused resume builder direction for internship and job applications.",
    result: "An ongoing career-tech project. The aim is a clearer resume creation experience; hiring or screening outcomes are not claimed.",
    github: null, cover: null, gallery: [],
  },
  {
    slug: "scam-shield", title: "Scam Shield", shortTitle: "SCAM SHIELD", visual: "shield",
    description: "A digital safety project focused on helping users identify suspicious or potentially fraudulent online activity.",
    tags: ["Security", "AI", "Awareness"], year: 2026, role: "AI product exploration · UX", status: "Portfolio project",
    problem: "Suspicious online activity can be hard to evaluate, especially when warning signs are subtle or unfamiliar.",
    approach: "Make risk indicators understandable and encourage a thoughtful pause before a user acts on suspicious content.",
    solution: "A digital safety experience focused on awareness, explanation and careful interpretation of warning signs.",
    result: "An exploration of AI-assisted safety awareness. It is not a guarantee of fraud detection or a replacement for independent verification.",
    github: null, cover: null, gallery: [],
  },
  {
    slug: "afx-pc-optimizer", title: "AFX PC Optimizer", shortTitle: "PC OPTIMIZER", visual: "optimizer",
    description: "A Windows-focused performance utility project exploring PC optimization and gaming workflows.",
    tags: ["Windows", "Performance", "Utility"], year: 2026, role: "Python development · Interface", status: "Source available",
    problem: "PC maintenance and performance settings can be scattered across many Windows interfaces.",
    approach: "Explore a focused utility that puts common performance and maintenance workflows in one place.",
    solution: "A Windows utility project with a dedicated optimization workflow and a separate core implementation.",
    result: "Source is available in the linked repository. Actual performance changes depend on the device and workload; no FPS increase is promised.",
    github: "https://github.com/arfanshaik/https-github.com-arfanshaik-AFX-PC-Optimizer", cover: null, gallery: [],
  },
  {
    slug: "afx-driver-checker", title: "AFX Driver Checker", shortTitle: "DRIVER CHECKER", visual: "driver",
    description: "A desktop utility concept for inspecting driver status and helping users identify driver-related issues.",
    tags: ["Windows", "System Tools"], year: 2026, role: "Desktop utility · Interface", status: "Source available",
    problem: "Understanding which driver information matters can be difficult without a clear view of the system.",
    approach: "Make driver inspection easier to read and use, keeping the focus on system visibility.",
    solution: "A desktop utility project organized around inspecting driver status and identifying areas that need attention.",
    result: "Source is available in the linked repository. The project explores driver visibility; compatibility depends on the Windows environment.",
    github: "https://github.com/arfanshaik/AFX-Driver-Checker", cover: null, gallery: [],
  },
  {
    slug: "afx-gaming-mode", title: "AFX Gaming Mode", shortTitle: "GAMING MODE", visual: "gaming",
    description: "A gaming-oriented Windows utility concept focused on creating optimized gaming profiles and streamlined launch workflows.",
    tags: ["Gaming", "Performance", "Windows"], year: 2026, role: "Desktop utility · Product design", status: "Source available",
    problem: "Preparing a PC for a gaming session often involves repeated setup and switching between settings.",
    approach: "Explore gaming profiles and a focused launch workflow to make preparation more consistent.",
    solution: "A Windows utility direction for organizing a gaming session around a chosen profile.",
    result: "Source is available in the linked repository. Gaming performance varies with hardware, software and the game; no universal gain is claimed.",
    github: "https://github.com/arfanshaik/AFX-Gaming-Mode", cover: null, gallery: [],
  },
];
