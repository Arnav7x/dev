import React, { useState } from 'react';
import { 
  Activity, 
  Binary, 
  Flame, 
  Box, 
  Ruler, 
  Server, 
  Cpu, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioData';
import { audioSynth } from '../utils/audioSynth';

export function HardwareInspector({ isOverclocked }) {
  const [selectedHw, setSelectedHw] = useState(PORTFOLIO_CONFIG.hardware[0]);

  const iconMap = {
    Activity: Activity,
    Binary: Binary,
    Flame: Flame,
    Box: Box,
    Ruler: Ruler,
    Server: Server,
    Cpu: Cpu,
    Zap: Zap
  };

  const handleSelect = (item) => {
    audioSynth.playRelayClick();
    setSelectedHw(item);
  };

  const SelectedIcon = iconMap[selectedHw.icon] || Activity;

  return (
    <div className={`hardware-section-container ${isOverclocked ? 'overclocked' : ''}`}>
      <div className="hw-workbench-layout">
        {/* Left Side: Hardware Items Grid */}
        <div className="hw-cards-grid">
          {PORTFOLIO_CONFIG.hardware.map((item) => {
            const IconComp = iconMap[item.icon] || Activity;
            const isSelected = selectedHw.id === item.id;

            return (
              <div
                key={item.id}
                className={`hw-spec-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(item)}
              >
                <div className="hw-card-top">
                  <div className="hw-icon-wrapper">
                    <IconComp size={18} />
                  </div>
                  <span className="hw-badge">{item.badge}</span>
                </div>

                <h4 className="hw-item-name">{item.name}</h4>
                <p className="hw-item-specs">{item.specs}</p>

                <div className="hw-card-footer">
                  <span className="hw-tag">{item.tag}</span>
                  <span className="inspect-btn">
                    INSPECT <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Deep Teardown / Bench Inspector Panel */}
        <div className="hw-detail-panel">
          <div className="panel-bezel">
            <div className="panel-status-header">
              <span className="status-indicator"></span>
              <span className="panel-title">BENCH INSTRUMENT SPECIFICATION SHEET</span>
              <span className="panel-id">REF: {selectedHw.id.toUpperCase()}</span>
            </div>

            <div className="panel-core-content">
              <div className="panel-hero-row">
                <div className="hero-icon-box">
                  <SelectedIcon size={32} />
                </div>
                <div>
                  <h3 className="panel-hero-name">{selectedHw.name}</h3>
                  <span className="panel-category">{selectedHw.category} // {selectedHw.badge}</span>
                </div>
              </div>

              {/* Hardware Parameters */}
              <div className="panel-param-block">
                <span className="param-label">TECHNICAL SPECIFICATIONS:</span>
                <p className="param-value">{selectedHw.specs}</p>
              </div>

              {/* Engineer's Field Notes */}
              <div className="panel-param-block">
                <span className="param-label">FIELD TESTIMONIAL & USAGE RATIONALE:</span>
                <p className="param-commentary">"{selectedHw.commentary}"</p>
              </div>

              {/* Survival Rating Score */}
              <div className="panel-rating-bar">
                <span className="rating-label">FIELD SURVIVABILITY:</span>
                <span className="rating-value">{selectedHw.rating}</span>
              </div>

              {/* Interactive Calibration Check */}
              <div className="calibration-status-box">
                <div className="cal-item">
                  <span className="dim-label">CALIBRATION DATE:</span>
                  <span className="bold-label">2026-Q1 CERTIFIED</span>
                </div>
                <div className="cal-item">
                  <span className="dim-label">TOLERANCE:</span>
                  <span className="bold-label">±0.005% NIST TRACEABLE</span>
                </div>
                <div className="cal-item">
                  <span className="dim-label">LAB BENCH LOC:</span>
                  <span className="bold-label">BAY 04 / RACK 2</span>
                </div>
              </div>

              <div className="panel-actions">
                <button 
                  className="test-ping-btn"
                  onClick={() => {
                    audioSynth.playBlip(980);
                    alert(`[OK] Ping sent to ${selectedHw.name} via GPIB / USB-TMC. Status: NOMINAL.`);
                  }}
                >
                  <Zap size={14} />
                  <span>PING INSTRUMENT VIA GPIB/USB</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
