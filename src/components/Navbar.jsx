import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Compass, 
  GraduationCap, 
  Wrench, 
  FolderGit2,
  Activity,
  Radio,
  Moon,
  Sun
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioData';
import { audioSynth } from '../utils/audioSynth';

export function Navbar({ 
  isOverclocked, 
  openTerminal, 
  activeTheme, 
  setTheme 
}) {
  const [timeStr, setTimeStr] = useState('');
  const [activeSection, setActiveSection] = useState('me');
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0] + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 30);

      const sections = ['me', 'projects', 'experiences', 'skills', 'education', 'hardware'];
      const scrollPos = window.scrollY + 180;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'me', label: 'Me', icon: Activity },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experiences', label: 'Experience', icon: Compass },
    { id: 'skills', label: 'Skills', icon: Radio },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'hardware', label: 'Hardware', icon: Wrench },
  ];

  const handleNavClick = (id) => {
    audioSynth.playRelayClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`hud-navbar ${navScrolled ? 'scrolled' : ''} ${isOverclocked ? 'overclocked-nav' : ''}`}>
      {/* Top Precision Readout */}
      <div className="nav-top-telemetry">
        <div className="telemetry-item telemetry-time hide-mobile">
          <span className="t-key">TIME:</span>
          <span className="t-val font-mono">{timeStr}</span>
        </div>
      </div>

      {/* Main Minimalist Bar */}
      <div className="nav-main-bar">
        <div className="nav-brand" onClick={() => handleNavClick('me')}>
          <div className="brand-hex">
            <Cpu size={16} />
          </div>
          <div className="brand-texts">
            <span className="brand-title">{PORTFOLIO_CONFIG.me.name}</span>
            <span className="brand-subtitle">ENGINEERING PORTFOLIO</span>
          </div>
        </div>

        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span>{item.label}</span>
                {isActive && <span className="active-pip"></span>}
              </button>
            );
          })}
        </nav>

        <div className="nav-controls">
          <button
            className={`hud-icon-btn theme-toggle-btn ${activeTheme === 'dark' ? 'active' : ''}`}
            onClick={() => {
              audioSynth.playRelayClick();
              setTheme(activeTheme === 'dark' ? 'beige' : 'dark');
            }}
            title={activeTheme === 'dark' ? 'Use light theme' : 'Use dark theme'}
            aria-label={activeTheme === 'dark' ? 'Use light theme' : 'Use dark theme'}
          >
            {activeTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <button 
            className="hud-cli-btn"
            onClick={openTerminal}
            title="Launch Terminal (Press ~)"
          >
            <Terminal size={14} />
            <span className="hide-mobile">CLI [~]</span>
          </button>

        </div>
      </div>
    </header>
  );
}
