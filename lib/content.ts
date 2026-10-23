// All site copy, numbers and links live here. Components read from this file only.
// Any value starting with "TODO" is a placeholder to be replaced with real data.

import type { SceneName } from "@/lib/scenes";

export const isTodo = (value: string | undefined | null): boolean =>
  !value || value.trim().toUpperCase().startsWith("TODO");

export const site = {
  title: "Washakh Ali | AI/ML Engineer | LLMs, RAG, Agents & Inference",
  description:
    "Washakh Ali is an AI/ML engineer in Islamabad building LLM agents, RAG systems, voice agents and the production inference underneath them. Open to full-time and freelance work.",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM",
    "Voice agents",
    "LLM evals",
    "Generative AI",
    "Inference optimization",
    "Diffusion models",
    "LoRA",
    "RAG",
    "AI agents",
    "MLOps",
    "Freelance ML engineer",
    "Washakh Ali",
  ],
  themeColor: "#07080A",
};

export const person = {
  name: "Washakh Ali",
  logo: "/WA-logo.svg",
  role: "AI/ML Engineer",
  sub: "LLMs · RAG · Agents & Evals · Voice · Inference",
  email: "washakh1@gmail.com",
  linkedin: "https://www.linkedin.com/in/washakh-ali-883a23218",
  github: "https://github.com/WashakhGen",
  cv: "/Washakh_Ali_CV.pdf",
  footerLine: "LLM apps, RAG, agents and the inference underneath: built, measured and kept running.",
};

export const hero = {
  pill: "Washakh · AI/ML Engineer · open to full-time & freelance",
  pillShort: "AI/ML Engineer · open to work",
  headline: ["Build the agents.", "Make them hold up."],
  rotatingPrefix: "I build",
  rotating: [
    "RAG systems.",
    "LLM agents with evals.",
    "voice agents.",
    "diffusion APIs.",
    "AI SaaS products.",
  ],
  paragraph:
    "RAG pipelines, tool-calling agents and voice agents, plus the diffusion APIs and GPU inference underneath. Then I trace every model call and run evals, so you know it's right before your users do.",
  primaryCta: { label: "See what I ship", href: "#services" },
  secondaryCta: { label: "Download CV", href: "/Washakh_Ali_CV.pdf" },
  tools: ["langchain", "claude", "googlegemini", "huggingface", "pytorch", "fastapi", "supabase", "docker"],
  marqueeLabel: "Fits into the stack you already run",
};

/** Presets for the interactive denoise demo in the Diffusion API service card. */
export const diffusionDemo = {
  steps: 8,
  presets: [
    { prompt: "lime-lit server hall, volumetric fog", scene: "server-hall" },
    { prompt: "glass gpu die, iridescent, studio light", scene: "gpu-die" },
    { prompt: "desert observatory, citrus sky", scene: "observatory" },
  ] satisfies { prompt: string; scene: SceneName }[],
};

/** Sections shown in the navbar, in page order. `id` must match a section's DOM id. */
export const navLinks = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export const servicesSection = {
  kicker: "what I do",
  title: [{ text: "AI systems, from first prompt to" }, { text: "on-call.", accent: true }],
  lead: "Things I build, ship and keep running from generative media APIs to voice agents.",
};

export type ServiceVisual = "diffusion" | "inference" | "reliability" | "evals" | "saas" | "voice";

export const services: {
  visual: ServiceVisual;
  kicker: string;
  title: string;
  description: string;
}[] = [
  {
    visual: "diffusion",
    kicker: "01 · generative media",
    title: "Diffusion API",
    description:
      "Production APIs for image, video and audio models: model onboarding, LoRA hot-swapping and async GPU execution.",
  },
  {
    visual: "inference",
    kicker: "02 · inference",
    title: "AI & inference engineering",
    description:
      "Faster, cheaper model serving for LLMs and diffusion: batching, caching, precision and warm GPU pools.",
  },
  {
    visual: "reliability",
    kicker: "03 · reliability",
    title: "Production reliability",
    description:
      "Monitoring, tracing and incident response for live AI systems, backed by rotational on-call experience.",
  },
  {
    visual: "evals",
    kicker: "04 · llm & rag",
    title: "LLM & RAG agents, with evals",
    description:
      "Tool-calling agents and RAG pipelines (FastAPI, Gemini/OpenAI, MCP, embeddings), with eval suites that catch regressions first.",
  },
  {
    visual: "saas",
    kicker: "05 · products",
    title: "SaaS & AI applications",
    description:
      "Full-stack AI products: FastAPI backends, React frontends, auth, multi-user data and Postgres.",
  },
  {
    visual: "voice",
    kicker: "06 · voice",
    title: "Voice agents",
    description:
      "Real-time voice agents that listen, reason and reply: speech-to-text, LLM tool calls and text-to-speech.",
  },
];

export const experienceSection = {
  kicker: "experience",
  title: [{ text: "Where I've" }, { text: "worked.", accent: true }],
};

type ExperienceItem = {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  type?: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "AI & Inference Engineer",
    org: "Stealth Mode",
    period: "Aug 2026 → present",
    type: "Self-employed",
    bullets: [
      "Building production-oriented AI systems.",
      "Focus on model serving, inference optimization, scalable APIs and cloud deployment.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    org: "Runware",
    orgUrl: "https://runware.ai",
    period: "Nov 2024 → Aug 2026",
    type: "Freelance",
    bullets: [
      "Built and ran production inference infrastructure for diffusion-based image, video, audio and 3D generation models.",
      "Served 300,000+ generations across concurrent GPU models.",
      "Designed a model onboarding framework that standardized how new models shipped to production.",
      "Built checkpoint and LoRA management with versioning.",
      "Engineered parallel multi-GPU inference with async GPU execution and GPU memory management, cutting latency and compute cost per generation.",
      "Implemented model-layer caching from recent research to accelerate inference pipelines.",
    ],
  },
  {
    role: "Computer Vision Engineer",
    org: "Vision RD",
    orgUrl: "https://visionrdai.com",
    period: "Dec 2023 → Nov 2024",
    bullets: [
      "Built a multi-head deep learning model for automated PCB component inspection, reaching 98.2% accuracy.",
      "Fine-tuned PaddleOCR for PCB value recognition, lifting font-specific accuracy to ~97% for reliable automated inspection.",
      "Developed image-generation APIs on Stable Diffusion with GPU memory optimization.",
      "Implemented multi-GPU inference with layer-caching techniques from recent papers, reducing latency and memory footprint.",
      "Explored video-based generative and vision models for real-time automotive inspection.",
    ],
  },
  {
    role: "Data Analyst",
    org: "Central Power Purchasing Agency",
    orgUrl: "https://www.cppa.gov.pk",
    period: "Jul 2023 → Dec 2023",
    bullets: [
      "Automated data cleaning and ETL pipelines in Python, reducing manual preparation time by 70%.",
      "Delivered high-quality, standardized datasets for reporting.",
      "Developed time-series forecasting models for national power consumption.",
      "More accurate forecasts informed critical energy-sector decisions.",
      "Built a data upload bot that streamlined portal integration and organization-wide reporting.",
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "Technocolabs Softwares",
    orgUrl: "https://www.technocolabs.com",
    period: "Oct 2022 → Dec 2022",
    bullets: [
      "Built and deployed credit risk prediction models for a European fintech platform.",
      "Used classification algorithms, collaborative filtering and neural networks to improve decision accuracy.",
      "Applied deep learning (CNNs) with feature engineering to train and validate models.",
      "Deployed ML pipelines to production, supporting risk mitigation and data-driven lending decisions.",
    ],
  },
];

export type WorkItem = {
  slug: string;
  title: string;
  task: string;
  org?: string;
  summary: string;
  stack: string[];
  links: { github?: string; live?: string };
};

export const workSection = {
  kicker: "work",
  title: [{ text: "Things I've" }, { text: "built.", accent: true }],
  lead: "A few projects across inference, speech, vision, RAG and full-stack apps.",
  more: {
    title: "More on GitHub",
    description: "Experiments, smaller tools and work in progress.",
    href: "https://github.com/WashakhGen",
  },
};

export const work: WorkItem[] = [
  {
    slug: "inference-platform",
    title: "Generative AI inference platform",
    task: "inference",
    org: "Runware",
    summary:
      "Production infrastructure serving image, video, audio, 3D and LLM models: model onboarding framework, versioned checkpoints and LoRAs, async GPU execution and a LoRA fine-tuning platform.",
    stack: ["Python", "PyTorch", "CUDA", "Diffusers", "Docker"],
    links: {},
  },
  {
    slug: "transcription-pipeline",
    title: "Transcription pipeline",
    task: "speech-to-text",
    summary:
      "Async REST API that turns uploaded audio into a timestamped transcript. Uploads get a job ID immediately while faster-whisper transcribes in the background; audio is validated and normalised first.",
    stack: ["Python", "FastAPI", "faster-whisper", "FFmpeg", "Pydantic"],
    links: { github: "https://github.com/WashakhGen/Transcription-Pipeline" },
  },
  {
    slug: "nsfw-classifier",
    title: "NSFW image classifier",
    task: "image-classification",
    summary:
      "FastAPI service that rates images on four NSFW levels with a configurable threshold. Detects CUDA, ROCm, MPS or CPU automatically and guards uploads by size and dimensions.",
    stack: ["Python", "PyTorch", "FastAPI", "Hugging Face"],
    links: { github: "https://github.com/WashakhGen/nsfw-classifier" },
  },
  {
    slug: "sitespend-chatbot",
    title: "SiteSpend: expense chatbot",
    task: "rag · agents",
    summary:
      "Chat assistant that answers natural-language questions about construction expenses, vendors and budgets, grounded in the real database through Gemini function calling. Multi-turn, with a React chat UI.",
    stack: ["FastAPI", "Google Gemini", "Supabase", "React"],
    links: { github: "https://github.com/WashakhGen/SiteSpend-ChatBot" },
  },
  {
    slug: "expense-tracker",
    title: "Construction expense tracker",
    task: "saas",
    summary:
      "Multi-user app for tracking construction project expenses, with JWT auth and project sharing between users. FastAPI and SQLAlchemy on Postgres, with a React frontend.",
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "React"],
    links: { github: "https://github.com/WashakhGen/Expense_Tracker" },
  },
];

export const contact = {
  kicker: "contact",
  title: [{ text: "Let's build something" }, { text: "that ships.", accent: true }],
  lead: "Hiring for an AI engineering role, or need help with an LLM, RAG or inference project? Email is the fastest way to reach me.",
  facts: [
    "Based in Islamabad · PKT (UTC+5) · working remotely",
    "Open to full-time AI Engineer roles and freelance projects",
    "Usually replies by email",
  ],
  emailSubject: "Hello from your portfolio",
  emailBody: "Hi Washakh,\n\nI'd like to talk about...\n",
};

export const certificationsSection = {
  kicker: "certifications",
  title: [{ text: "Courses I've" }, { text: "completed.", accent: true }],
};

/**
 * `icon` is a simple-icons slug (null = generic award icon). `image` is optional: put a file in
 * public/certs/ and set e.g. "/certs/nvidia-diffusion.webp" to show a thumbnail on the card.
 */
export const certifications: {
  title: string;
  issuer: string;
  icon: string | null;
  date?: string;
  credentialUrl?: string;
  image?: string;
}[] = [
  {
    title: "Agentic AI Foundations: Build RAG & MCP Chatbots",
    issuer: "LearnKartS · Coursera",
    icon: "coursera",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/MOFFRSEBO2N3",
  },
  {
    title: "Generative AI with Diffusion Models",
    issuer: "NVIDIA Deep Learning Institute",
    icon: "nvidia",
    credentialUrl: "https://courses.nvidia.com/certificates/869afb0ab3b0474781360389e8a7cd30/",
  },
  {
    title: "Advanced Computer Vision with TensorFlow",
    issuer: "DeepLearning.AI · Coursera",
    icon: "tensorflow",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/2EQRZ3REKGVF",
  },
];
