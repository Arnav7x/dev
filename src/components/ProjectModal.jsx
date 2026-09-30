import React from 'react';
import { X, ExternalLink, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';
import { audioSynth } from '../utils/audioSynth';

export function ProjectModal({ project, onClose, isOverclocked }) {
  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div 
        className={`project-modal-card ${isOverclocked ? 'overclocked-modal' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="modal-header">
          <div className="modal-code-badge">
            <span className="code-pill">{project.code}</span>
            <span className="cat-pill">{project.category}</span>
            <span className="status-pill">{project.status}</span>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={() => {
              audioSynth.playRelayClick();
              onClose();
            }}
            aria-label="Close Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="modal-body">
          <h2 className="modal-project-title">{project.title}</h2>
          <p className="modal-summary">{project.summary}</p>

          {/* Specs Grid */}
          <div className="modal-specs-grid">
            {project.specs.map((s, idx) => (
              <div key={idx} className="spec-metric-card">
                <span className="spec-metric-key">{s.key}</span>
                <span className="spec-metric-val">{s.val}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="modal-tech-stack">
            <span className="tech-stack-title">ENGINEERING TOOLCHAIN & STACK:</span>
            <div className="tech-pills">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-pill-item">
                  <span className="dot"></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Block Diagram / Schematic */}
          <div className="modal-schematic-section">
            <div className="schematic-header">
              <Cpu size={15} />
              <span>SYSTEM ARCHITECTURE & BUS TOPOLOGY</span>
            </div>
            <pre className="schematic-code-block">{project.schematic}</pre>
          </div>

          {/* Engineering Narrative */}
          <div className="modal-deep-dive-text">
            <h3>DESIGN CHALLENGES & IMPLEMENTATION NOTES</h3>
            <p>{project.details}</p>
          </div>

          {/* Action Links */}
          <div className="modal-actions-bar">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer" 
              className="modal-link-btn primary"
              onClick={() => audioSynth.playRelayClick()}
            >
              <GithubIcon size={16} />
              <span>INSPECT REPO / CAD REPOSITORY</span>
              <ExternalLink size={14} />
            </a>

            <button 
              className="modal-link-btn secondary"
              onClick={() => {
                audioSynth.playBlip(750);
                alert(`Exporting BOM & Gerbers for ${project.code}...`);
              }}
            >
              <Layers size={16} />
              <span>EXPORT GERBERS & BOM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
