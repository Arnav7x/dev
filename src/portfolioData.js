// ==============================================================================
// ARNAV THAKUR // PORTFOLIO DATA CONFIGURATION
// Tailored directly from official resume: B.Tech Computer Science & Engineering
// ==============================================================================

export const PORTFOLIO_CONFIG = {
  // Identity & Telemetry
  me: {
    name: "Arnav Thakur",
    title: "Computer Science & Engineering Student",
    focus: "Full-Stack Development // Distributed Backend // Real-Time Systems",
    location: "Faridabad, Haryana | Open to relocate",
    status: "OPEN FOR SOFTWARE ROLES",
    avatarTag: "SOFTWARE ARCHITECT",
    bio: [
      "Computer Science & Engineering student passionate about distributed backend architecture, real-time collaboration platforms, and scalable cloud systems. Experienced in architecting production-grade full-stack systems, concurrent API pipelines, and interactive analytics dashboards.",
      "Proven track record through software engineering internships at Xebia and HCLTech, building scalable backend services handling concurrent traffic, distributed background worker queues with Redis, and low-latency WebSocket collaborative engines."
    ],
    stats: [
      { label: "Core Stack", value: "React, Next.js, NodeJS" },
      { label: "Real-Time WebSocket Sync", value: "< 15ms Latency" },
      { label: "Databases Architected", value: "Postgres / Mongo / Redis" },
      { label: "Distributed Pipelines", value: "Redis Worker Queues" },
      { label: "Cloud Platforms", value: "Azure & Docker" },
      { label: "Graduation Target", value: "June 2027" }
    ],
    socials: {
      github: "https://github.com/Arnav7x",
      linkedin: "https://linkedin.com/in/arnavthakur7/",
      email: "arnav777x@gmail.com",
      phone: "+91 88003 70448",
      resumePdf: "#download-resume"
    },
  },

  // Projects Matrix (from Resume)
  projects: [
    {
      id: "codeatlas",
      code: "PRJ-01",
      title: "CodeAtlas // GitHub Engineering Intelligence Platform",
      category: "Analytics & Distributed Systems",
      timeline: "Jun 2026 – July 2026",
      status: "PRODUCTION ACTIVE",
      summary: "Full-stack GitHub analytics platform processing repository activity, contributor ownership, code hotspot heatmaps, and engineering velocity metrics.",
      specs: [
        { key: "Queues", val: "Redis Worker Pipelines" },
        { key: "Database", val: "PostgreSQL & GitHub REST/GraphQL" },
        { key: "Analytics", val: "Hotspots & Contributor Metrics" },
        { key: "Architecture", val: "Event-Driven Background Workers" }
      ],
      techStack: ["TypeScript", "Next.js", "Redis", "PostgreSQL", "Docker", "Node.js", "Tailwind CSS"],
      details: "Engineered scalable background processing pipelines using Redis queues and worker tasks to asynchronously aggregate commit history, pull request frequencies, and file-churn velocity. Designed interactive analytics dashboards visualizing code ownership patterns, developer throughput, and team productivity trends.",
      github: "https://github.com/Arnav7x",
      linkText: "Inspect Architecture & Repository",
      schematic: `
  [GitHub API / Webhooks] ──► [Fast Ingestion Gateway]
                                    │
                                    ▼ (Job Dispatch)
                           [Redis Worker Queue]
                       ┌────────────┼────────────┐
                       ▼            ▼            ▼
                  [Worker 1]   [Worker 2]   [Worker 3] (Code Hotspot & Ownership Calc)
                       └────────────┬────────────┘
                                    ▼
                         [PostgreSQL Data Store]
                                    │
                                    ▼
                   [Next.js Interactive Analytics UI]
      `
    },
    {
      id: "synapse-ide",
      code: "PRJ-02",
      title: "Synapse // Real-Time Collaborative Cloud IDE",
      category: "Full-Stack & Real-Time WebSockets",
      timeline: "March 2026 – April 2026",
      status: "DEPLOYED & LIVE",
      summary: "Full-stack cloud IDE enabling concurrent multi-user code editing, real-time presence indicators, file locking, Judge0 multi-language execution, and Groq-powered AI debugging.",
      specs: [
        { key: "Sync Latency", val: "< 15 ms via WebSockets" },
        { key: "Code Execution", val: "Judge0 Multi-Language API" },
        { key: "AI Engine", val: "Groq LLM Low-Latency API" },
        { key: "Security", val: "JWT, OTP & Role-Based Auth" }
      ],
      techStack: ["React", "Node.js", "WebSockets", "MongoDB", "Judge0", "Groq AI", "Express"],
      details: "Architected a conflict-aware operational transformation / event-driven synchronization engine over WebSockets for simultaneous multi-cursor editing. Integrated secure session management and authentication with MongoDB, JWT tokens, and OTP verification. Connected Judge0 sandboxed execution container and Groq AI assistants for real-time code generation and error explanation.",
      github: "https://github.com/Arnav7x",
      linkText: "View Live IDE & Code",
      schematic: `
  [Client 1: Editor] ◄──┐
  [Client 2: Editor] ◄──┼──► [WebSocket Gateway: Sync Engine & Presence]
  [Client 3: Editor] ◄──┘            │
                                     ├──► [MongoDB: User State & Project Tree]
                                     ├──► [Judge0: Sandboxed Code Execution]
                                     └──► [Groq AI: Low-Latency Assistance API]
      `
    }
  ],

  // Experience (from Resume)
  experiences: [
    {
      id: "exp-1",
      role: "Full Stack Development Intern",
      organization: "Xebia",
      period: "Jun 2026 – July 2026",
      location: "Gurgaon (Remote)",
      status: "CURRENT ROLE",
      highlight: "LMS Platform Architecture & Azure Cloud Integration",
      responsibilities: [
        "Built a full-stack replica of Xebia’s LMS platform, implementing core learning workflows and content management features.",
        "Developed a capstone project assigned by the engineering team, applying modern full-stack development patterns and cloud infrastructure practices.",
        "Completed multiple hands-on projects involving Azure cloud services, cloud networking, distributed storage, and identity management."
      ],
      tags: ["Full Stack Development", "Git"]
    },
    {
      id: "exp-2",
      role: "Software Engineering Intern",
      organization: "HCLTech",
      period: "Jun 2025 – Aug 2025",
      location: "Noida (Hybrid)",
      status: "COMPLETED",
      highlight: "High-Concurrency Backend Services & System Reliability",
      responsibilities: [
        "Designed and implemented scalable backend and distributed systems services, improving overall API reliability and reducing response failure rates.",
        "Contributed to core backend features handling high volumes of concurrent requests and improving end-to-end API responsiveness.",
        "Implemented resilient backend services handling concurrent API requests and improving response reliability under heavy load."
      ],
      tags: ["Google Cloud Platform (GCP)", "Generative AI"]
    },
    {
      id: "exp-3",
      role: "Creative Director Intern",
      organization: "CreativeCap.co",
      period: "July 2025 – Nov 2025",
      location: "Bangalore (Remote)",
      status: "COMPLETED",
      highlight: "Creative Concept Development & Analytics-Driven Growth",
      responsibilities: [
        "Delivered 20+ video concepts monthly while collaborating directly with the founder to craft high-impact digital media narratives.",
        "Leveraged content analytics, market trend research, and competitor analysis to optimize engagement, audience retention, and user growth."
      ],
      tags: ["Growth Optimization", "User Engagement"]
    }
  ],

  // Skills (from Resume)
  skills: {
    categories: [
      {
        id: "languages",
        name: "Programming Languages",
        icon: "Cpu",
        items: [
          { name: "TypeScript / JavaScript", note: "Modern ESNext, Type Safety, Async/Await" },
          { name: "C & C++", note: "Data Structures, Systems Programming, Algorithms" },
          { name: "Python", note: "FastAPI, Automation, Data Processing" },
          { name: "HTML5 & CSS3", note: "Semantic Structure, Responsive Design, CSS Grid/Flex" }
        ]
      },
      {
        id: "web",
        name: "Web & Frameworks",
        icon: "Layers",
        items: [
          { name: "React & Next.js", note: "Server Components, Hooks, State Management" },
          { name: "Node.js & Express", note: "RESTful APIs, Middleware, Microservices" },
          { name: "FastAPI", note: "Async Python APIs, Pydantic validation" },
          { name: "WebSockets & Real-Time", note: "Bi-directional Event Streaming, Multi-User Sync" }
        ]
      },
      {
        id: "databases",
        name: "Databases & Caching",
        icon: "Terminal",
        items: [
          { name: "PostgreSQL", note: "Relational Modeling, Indexing, Complex Queries" },
          { name: "MongoDB", note: "Document Stores, Aggregations, Mongoose" },
          { name: "Redis", note: "In-Memory Caching, Pub/Sub, Worker Queues" }
        ]
      },
      {
        id: "devops",
        name: "Tools, Cloud & DevOps",
        icon: "Radio",
        items: [
          { name: "Docker", note: "Containerization, Multi-Stage Builds, Compose" },
          { name: "Microsoft Azure", note: "Cloud Infrastructure, Storage, Networking, Identity" },
          { name: "GitHub Actions", note: "CI/CD Automated Pipelines, Testing" },
          { name: "Vercel & Render", note: "Edge Deployment, Serverless Functions, Live Hosting" }
        ]
      }
    ],

  },

  // Education (from Resume)
  education: {
    institution: "Sharda University",
    department: "School of Computer Science & Engineering",
    degree: "Bachelor of Technology (B. Tech) in Computer Science and Engineering",
    minors: "Distributed Systems & Cloud Computing",
    graduation: "August 2023 – June 2027",
    gpa: "7.5",
    honors: [
      "Core CS Fundamentals",
      "Full-Stack Development Specialization",
      "Relevant Coursework: Objet-Oriented Programming, Database Management Systems, Computer Networks, Operating Systems",
      "Project Lead Experience in Hackathons"
    ],
  },

  // HARDWARE (Tailored for CS / Software Engineer Setup)
  hardware: [
    {
      id: "hw-1",
      name: "2020 M1 MacBook Air",
      category: "Primary Compute",
      badge: "CORE WORKHORSE",
      icon: "Server",
      specs: "Apple M1, 8-core CPU, 7-core GPU, macOS, Retina display",
      commentary: "My primary development machine for building, testing, and shipping software projects.",
      rating: "10/10 ESSENTIAL",
      tag: "COMPUTE"
    }
  ],

  // Terminal Responses customized for Arnav Thakur
  terminalCommands: {
    help: "AVAILABLE COMMANDS:\n - me        : Print operator credentials, focus & status\n - projects  : Query software blueprints (CodeAtlas, Synapse, Xebia LMS)\n - skills    : Dump technical proficiencies (Languages, Web, Databases, Cloud)\n - exp       : Query internship logs (Xebia, HCLTech, CreativeCap.co)\n - edu       : Print academic credentials (Sharda University, B.Tech CSE)\n - hw        : List developer workbench & infrastructure tools\n - overclock : Toggle system turbo mode & spike reactor clock\n - coffee    : Check caffeine saturation in developer bloodstream\n - fire      : Launch celebratory photon confetti burst\n - clear     : Purge terminal display buffer",
    me: "DEVELOPER: Arnav Thakur // DEGREE: B.Tech Computer Science & Engineering (2023-2027)\nFOCUS: Full-Stack Development // Distributed Backend // Real-Time WebSockets\nEMAIL: arnav777x@gmail.com // GITHUB: github.com/Arnav7x // LINKEDIN: arnavthakur7",
    coffee: "CAFFEINE TELEMETRY: 96.2% SATURATION. Current heart rate: 78 BPM. Code compiling cleanly across all Docker containers.",
    overclock: "OVERCLOCK PROTOCOL ENGAGED: Next.js edge runtime spooled up. Redis worker concurrency set to MAXIMUM!"
  }
};
