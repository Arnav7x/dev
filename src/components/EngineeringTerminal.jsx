import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioData';
import { audioSynth } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

export function EngineeringTerminal({ isOpen, onClose, isOverclocked, toggleOverclock }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'SYNAPSE PROTOCOL BOOT v4.2.0-STABLE' },
    { type: 'sys', text: 'Type "help" to list available subsystem commands. Press [ESC] or [~] to close.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    audioSynth.playRelayClick();

    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'res', text: PORTFOLIO_CONFIG.terminalCommands.help });
        break;

      case 'me':
        newHistory.push({ type: 'res', text: `${PORTFOLIO_CONFIG.terminalCommands.me}\nBIO: ${PORTFOLIO_CONFIG.me.bio[0]}` });
        break;

      case 'projects':
        const prjList = PORTFOLIO_CONFIG.projects.map(p => `• [${p.code}] ${p.title} (${p.category})`).join('\n');
        newHistory.push({ type: 'res', text: `REGISTERED HARDWARE BLUEPRINTS:\n${prjList}` });
        break;

      case 'skills':
        const skillsList = PORTFOLIO_CONFIG.skills.categories.map(c => `• ${c.name}: ${c.items.map(i => i.name).join(', ')}`).join('\n');
        newHistory.push({ type: 'res', text: `REGISTERED TECHNICAL PROFICIENCIES:\n${skillsList}` });
        break;

      case 'exp':
        const expList = PORTFOLIO_CONFIG.experiences.map(e => `• ${e.role} @ ${e.organization} [${e.period}]`).join('\n');
        newHistory.push({ type: 'res', text: `MISSION LOG ARCHIVE:\n${expList}` });
        break;

      case 'edu':
        newHistory.push({ 
          type: 'res', 
          text: `DEGREE: ${PORTFOLIO_CONFIG.education.degree}\nINSTITUTION: ${PORTFOLIO_CONFIG.education.institution}\nGPA: ${PORTFOLIO_CONFIG.education.gpa}\nTIMELINE: ${PORTFOLIO_CONFIG.education.graduation}` 
        });
        break;

      case 'hw':
        const hwList = PORTFOLIO_CONFIG.hardware.map(h => `• ${h.name} [${h.specs}]`).join('\n');
        newHistory.push({ type: 'res', text: `BENCH INSTRUMENTATION INVENTORY:\n${hwList}` });
        break;

      case 'overclock':
        toggleOverclock();
        newHistory.push({ type: 'alert', text: PORTFOLIO_CONFIG.terminalCommands.overclock });
        break;

      case 'coffee':
        newHistory.push({ type: 'res', text: PORTFOLIO_CONFIG.terminalCommands.coffee });
        break;

      case 'fire':
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#ffb800', '#ff0055', '#39ff14']
        });
        audioSynth.playBlip(1200);
        newHistory.push({ type: 'res', text: '⚡ PHOTON BURST EMITTED // PARTICLES ACTIVE' });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'contact':
        newHistory.push({ 
          type: 'res', 
          text: `DIRECT FREQUENCIES:\n• EMAIL: ${PORTFOLIO_CONFIG.me.socials.email}\n• GITHUB: ${PORTFOLIO_CONFIG.me.socials.github}\n• LINKEDIN: ${PORTFOLIO_CONFIG.me.socials.linkedin}` 
        });
        break;

      default:
        newHistory.push({ 
          type: 'error', 
          text: `Command not recognized: "${cmd}". Type "help" for a list of available telemetry routines.` 
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className={`terminal-modal ${isOverclocked ? 'terminal-overclocked' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="terminal-header">
          <div className="terminal-title">
            <TerminalIcon size={16} className="terminal-icon-spin" />
            <span>DIAGNOSTIC TELEMETRY ROOT CONSOLE // BASH 5.2-EMB</span>
          </div>
          <div className="terminal-actions">
            <span className="key-hint">PRESS [ESC] TO CLOSE</span>
            <button className="terminal-close-btn" onClick={onClose} aria-label="Close Terminal">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}

          {/* Active Prompt Input */}
          <div className="term-prompt-row">
            <span className="term-prompt-label">root@delta9:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              className="term-input" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Footer command chips */}
        <div className="terminal-quick-chips">
          <span className="chip-label">QUICK MACROS:</span>
          {['help', 'me', 'projects', 'skills', 'overclock', 'hw', 'fire'].map((macro) => (
            <button 
              key={macro} 
              className="chip-btn"
              onClick={() => {
                setInputVal(macro);
                setTimeout(() => {
                  handleCommand({ key: 'Enter' });
                }, 50);
              }}
            >
              {macro}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
