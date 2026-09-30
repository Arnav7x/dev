import React, { useState, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Mail,
  Layers,
  Cpu,
  Wrench,
  Radio,
  ChevronRight,
  Award,
  FolderGit2
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { GithubIcon, LinkedinIcon } from './components/Icons';
import { PORTFOLIO_CONFIG } from './portfolioData';
import { audioSynth } from './utils/audioSynth';
import { Navbar } from './components/Navbar';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { OscilloscopeCanvas } from './components/OscilloscopeCanvas';
import { HardwareInspector } from './components/HardwareInspector';
import { ProjectModal } from './components/ProjectModal';
import { EngineeringTerminal } from './components/EngineeringTerminal';

import './App.css';

export function App() {
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [activeTheme, setActiveTheme] = useState('dark'); // 'beige', 'sage', 'monochrome', 'dark'
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  // Sync body class and attributes for themes
  useEffect(() => {
    document.body.setAttribute('data-theme', activeTheme);
    if (isOverclocked) {
      document.body.classList.add('overclock-active');
    } else {
      document.body.classList.remove('overclock-active');
    }
  }, [activeTheme, isOverclocked]);

  // Keyboard shortcut listener (`~` or backtick for Terminal, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        audioSynth.playRelayClick();
        setIsTerminalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setActiveProjectModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Overclock Toggle Handler
  const toggleOverclock = () => {
    const nextState = !isOverclocked;
    setIsOverclocked(nextState);

    if (nextState) {
      audioSynth.playOverclockSurge();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.2 },
        colors: ['#ff0055', '#ffb800', '#ffffff', '#39ff14']
      });
    } else {
      audioSynth.playRelayClick();
    }
  };

  return (
    <div className={`app-root ${isOverclocked ? 'mode-overclocked' : ''}`}>
      {/* Dynamic PCB Circuit Interconnect Canvas */}
      <BackgroundCanvas isOverclocked={isOverclocked} activeTheme={activeTheme} />

      {/* Top HUD Navigation & System Telemetry */}
      <Navbar
        isOverclocked={isOverclocked}
        openTerminal={() => {
          audioSynth.playRelayClick();
          setIsTerminalOpen(true);
        }}
        activeTheme={activeTheme}
        setTheme={setActiveTheme}
      />

      <main className="main-content">
        {/* ====================================================================
            SECTION 01: ME (Identity, Mission, Oscilloscope Telemetry)
            ==================================================================== */}
        <section id="me" className="hero-section">
          <div className="container">
            <div className="hero-grid">
              {/* Left Column: Operator Dossier */}
              <div className="operator-id-card cyber-card">
                <div className="operator-tag-row">
                </div>

                <h1 className="hero-name">{PORTFOLIO_CONFIG.me.name}</h1>
                <div className="hero-focus-banner">
                  <Cpu size={18} />
                  <span>{PORTFOLIO_CONFIG.me.focus}</span>
                </div>

                <div className="hero-location-status">
                  <div><strong>LOCATION:</strong> {PORTFOLIO_CONFIG.me.location}</div>
                  <div><strong>STATUS:</strong> <span className="highlight-cyan">{PORTFOLIO_CONFIG.me.status}</span></div>
                </div>

                <div className="hero-bio-paragraphs">
                  {PORTFOLIO_CONFIG.me.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Primary Action Buttons */}
                <div className="hero-actions-row">
                  <a
                    href="#projects"
                    className="hero-btn-primary"
                    onClick={() => audioSynth.playRelayClick()}
                  >
                    <FolderGit2 size={16} />
                    <span>INSPECT BLUEPRINTS</span>
                  </a>

                  <button
                    className="hero-btn-secondary"
                    onClick={() => {
                      audioSynth.playBlip(900);
                      setIsTerminalOpen(true);
                    }}
                  >
                    <TerminalIcon size={16} />
                    <span>EXECUTE CLI [~]</span>
                  </button>

                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.me.socials.email}`}
                    className="hero-btn-secondary"
                    onClick={() => audioSynth.playRelayClick()}
                  >
                    <Mail size={16} />
                    <span>MAIL ME</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Real-Time Oscilloscope & System Metrics */}
              <div className="hero-scope-col">
                <OscilloscopeCanvas
                  isOverclocked={isOverclocked}
                  colorMode={activeTheme}
                />

                {/* Engineering Telemetry Stats Matrix */}
                <div className="stats-matrix-grid">
                  {PORTFOLIO_CONFIG.me.stats.map((stat, idx) => (
                    <div key={idx} className="stat-cell cyber-card">
                      <span className="stat-cell-label">{stat.label}</span>
                      <span className="stat-cell-value">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 02: PROJECTS (CAD Specifications, Schematics, Code)
            ==================================================================== */}
        <section id="projects" className="section-wrapper">
          <div className="container">
            <h2 className="section-title">
              <span className="section-idx">//</span>PROJECTS
            </h2>

            <div className="projects-grid">
              {PORTFOLIO_CONFIG.projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card cyber-card"
                  onClick={() => {
                    audioSynth.playRelayClick();
                    setActiveProjectModal(project);
                  }}
                >
                  <div className="project-card-header">
                    <span className="prj-code">{project.code}</span>
                    <span className="prj-status">{project.status}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>

                  {/* Key Engineering Specs Matrix */}
                  <div className="project-specs-bar">
                    {project.specs.slice(0, 2).map((sp, sIdx) => (
                      <div key={sIdx} className="prj-spec-item">
                        <span className="prj-spec-key">{sp.key}</span>
                        <span className="prj-spec-val">{sp.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Badges */}
                  <div className="project-tags">
                    {project.techStack.slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} className="tag-pill">{tech}</span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    <span className="view-cad-btn">
                      INSPECT CAD <ChevronRight size={14} />
                    </span>
                    <span className="prj-timeline">{project.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 03: EXPERIENCES (Mission Logs & Deployment Interconnect)
            ==================================================================== */}
        <section id="experiences" className="section-wrapper">
          <div className="container">
            <h2 className="section-title">
              <span className="section-idx">//</span>EXPERIENCE
            </h2>

            <div className="experience-timeline">
              {PORTFOLIO_CONFIG.experiences.map((exp) => (
                <div key={exp.id} className="exp-entry-node">
                  <div className="exp-trace-dot"></div>
                  <div className="exp-card cyber-card">
                    <div className="exp-meta-header">
                      <div>
                        <h3 className="exp-role-title">{exp.role}</h3>
                        <div className="exp-org">{exp.organization} // {exp.location}</div>
                      </div>
                      <span className="exp-period">{exp.period}</span>
                    </div>

                    <div className="exp-highlight-banner">
                      <span>KEY DIRECTIVE: {exp.highlight}</span>
                    </div>

                    <ul className="exp-bullets">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx}>{resp}</li>
                      ))}
                    </ul>

                    <div className="project-tags">
                      {exp.tags.map((t, idx) => (
                        <span key={idx} className="tag-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 04: SKILLS
            ==================================================================== */}
        <section id="skills" className="section-wrapper">
          <div className="container">
            <h2 className="section-title">
              <span className="section-idx">//</span> SKILLS
            </h2>

            <div className="skills-layout">
              {/* Skills Matrix Cards Grid */}
              <div className="skills-matrix-grid">
                {PORTFOLIO_CONFIG.skills.categories.map((category) => (
                  <div key={category.id} className="skill-category-card cyber-card">
                    <div className="cat-header">
                      <div className="cat-icon-wrap">
                        {category.id === 'silicon' && <Cpu size={18} />}
                        {category.id === 'cad' && <Layers size={18} />}
                        {category.id === 'firmware' && <TerminalIcon size={18} />}
                        {category.id === 'protocols' && <Radio size={18} />}
                        {category.id === 'lab' && <Wrench size={18} />}
                      </div>
                      <h4 className="cat-title">{category.name}</h4>
                    </div>

                    <div className="skill-items-list">
                      {category.items.map((skill, sIdx) => (
                        <div key={sIdx} className="skill-meter-row">
                          <div className="skill-labels">
                            <span className="skill-name">{skill.name}</span>
                          </div>
                          <div className="skill-note">{skill.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 05: EDUCATION (Academic Avionics, Rigor & Coursework)
            ==================================================================== */}
        <section id="education" className="section-wrapper">
          <div className="container">
            <h2 className="section-title">
              <span className="section-idx">//</span> EDUCATION
            </h2>

            <div className="education-grid">
              {/* Institution & Honors */}
              <div className="edu-main-card cyber-card">
                <h3 className="edu-institution">{PORTFOLIO_CONFIG.education.institution}</h3>
                <div className="edu-dept">{PORTFOLIO_CONFIG.education.department}</div>

                <div className="edu-degree-banner">
                  <div className="edu-degree-title">{PORTFOLIO_CONFIG.education.degree}</div>
                  <div className="edu-stats-row">
                    <span>GPA: {PORTFOLIO_CONFIG.education.gpa}</span>
                    <span>DURATION: {PORTFOLIO_CONFIG.education.graduation}</span>
                  </div>
                </div>

                <div className="edu-honors-list">
                  {PORTFOLIO_CONFIG.education.honors.map((honor, hIdx) => (
                    <div key={hIdx} className="honor-item">
                      <Award size={16} />
                      <span>{honor}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ====================================================================
            SECTION 06: HARDWARE (Physical Workbench, Tools, Teardowns)
            ==================================================================== */}
        <section id="hardware" className="section-wrapper">
          <div className="container">
            <h2 className="section-title">
              <span className="section-idx">//</span> HARDWARE
            </h2>

            <HardwareInspector isOverclocked={isOverclocked} />
          </div>
        </section>
      </main>

      {/* ====================================================================
          FOOTER / TELEMETRY LINKAGE
          ==================================================================== */}
      <footer className="footer-hud">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-left">
              <div className="footer-brand">
                <span>{PORTFOLIO_CONFIG.me.name}</span>
              </div>
              <div className="footer-legal">
                Engineer, Artist, JLPT Aspirant
              </div>
            </div>

            <div className="footer-links">
              <a
                href={PORTFOLIO_CONFIG.me.socials.github}
                target="_blank"
                rel="noreferrer"
                className="footer-link-item"
                onClick={() => audioSynth.playRelayClick()}
              >
                <GithubIcon size={15} />
                <span>GITHUB</span>
              </a>
              <a
                href={PORTFOLIO_CONFIG.me.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="footer-link-item"
                onClick={() => audioSynth.playRelayClick()}
              >
                <LinkedinIcon size={15} />
                <span>LINKEDIN</span>
              </a>
              <a
                href={`mailto:${PORTFOLIO_CONFIG.me.socials.email}`}
                className="footer-link-item"
                onClick={() => audioSynth.playRelayClick()}
              >
                <Mail size={15} />
                <span>arnav777x@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          INTERACTIVE MODALS & DRAWERS
          ==================================================================== */}
      {/* Project CAD / Deep-Dive Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        isOverclocked={isOverclocked}
      />

      {/* Engineering Diagnostic Terminal [CLI] */}
      <EngineeringTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        isOverclocked={isOverclocked}
        toggleOverclock={toggleOverclock}
      />
    </div>
  );
}

export default App;
