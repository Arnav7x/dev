import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export function OscilloscopeCanvas({ isOverclocked = false, colorMode = 'beige' }) {
  const canvasRef = useRef(null);
  const [waveType, setWaveType] = useState('sine'); // sine, square, triangle, lissajous, pulse
  const [freq, setFreq] = useState(3.0);
  const [amplitude] = useState(34);
  const [isRunning, setIsRunning] = useState(true);
  const [stats, setStats] = useState({ vpp: "3.28 V", freqDisplay: "1.000 kHz", duty: "50.0%" });

  // Minimal aesthetic color schemes
  const colorMap = {
    beige: { stroke: '#c25e2e', bg: '#201d1a', grid: 'rgba(255, 255, 255, 0.08)', sub: '#a8a29e' },
    sage: { stroke: '#65a30d', bg: '#1c1f1a', grid: 'rgba(255, 255, 255, 0.08)', sub: '#a8a29e' },
    monochrome: { stroke: '#f5f0e8', bg: '#171513', grid: 'rgba(255, 255, 255, 0.08)', sub: '#78716c' },
    dark: { stroke: '#e77c4c', bg: '#100f0e', grid: 'rgba(255, 248, 235, 0.08)', sub: '#b7aea3' },
    overclock: { stroke: '#ef4444', bg: '#2b1010', grid: 'rgba(239, 68, 68, 0.15)', sub: '#fca5a5' }
  };

  const currentColor = isOverclocked ? colorMap.overclock : (colorMap[colorMode] || colorMap.beige);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const render = () => {
      const width = canvas.width = canvas.parentElement.clientWidth || 540;
      const height = canvas.height = canvas.parentElement.clientHeight || 180;

      // Dark tactile display inside minimal beige casing
      ctx.fillStyle = currentColor.bg;
      ctx.fillRect(0, 0, width, height);

      // Oscilloscope Graticule
      ctx.strokeStyle = currentColor.grid;
      ctx.lineWidth = 1;

      const numDivX = 10;
      const numDivY = 6;
      const dx = width / numDivX;
      const dy = height / numDivY;

      ctx.beginPath();
      for (let x = 0; x <= width; x += dx) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += dy) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center crosshairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Waveform rendering
      ctx.save();
      ctx.strokeStyle = currentColor.stroke;
      ctx.lineWidth = 2.2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.beginPath();
      const centerY = height / 2;
      const effectiveFreq = isOverclocked ? freq * 2.2 : freq;
      const effectiveAmp = isOverclocked ? amplitude * 1.25 : amplitude;

      if (waveType === 'lissajous') {
        const centerX = width / 2;
        const radiusX = Math.min(width * 0.35, 120);
        const radiusY = Math.min(height * 0.38, 55);
        const a = 3;
        const b = 2;
        const delta = time * 1.5;

        for (let t = 0; t <= Math.PI * 2; t += 0.03) {
          const x = centerX + radiusX * Math.sin(a * t + delta);
          const y = centerY + radiusY * Math.sin(b * t);
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        for (let x = 0; x < width; x += 2) {
          let y = centerY;
          const theta = (x / width) * Math.PI * 2 * effectiveFreq + time * (isOverclocked ? 6 : 3.2);

          if (waveType === 'sine') {
            y += Math.sin(theta) * effectiveAmp;
          } else if (waveType === 'square') {
            const raw = Math.sin(theta);
            y += Math.tanh(raw * 16) * effectiveAmp;
          } else if (waveType === 'triangle') {
            const mod = (theta % (Math.PI * 2)) / (Math.PI * 2);
            const val = mod < 0.5 ? (mod * 4 - 1) : (3 - mod * 4);
            y += val * effectiveAmp;
          } else if (waveType === 'pulse') {
            const bit = Math.floor((theta * 2) % 16);
            const bitPattern = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1];
            const isHigh = bitPattern[bit] === 1;
            y += (isHigh ? -1 : 1) * effectiveAmp * 0.85;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.restore();

      if (isRunning) {
        time += 0.03;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [waveType, freq, amplitude, isRunning, isOverclocked, currentColor]);

  const handleWaveChange = (type) => {
    audioSynth.playRelayClick();
    setWaveType(type);
    if (type === 'sine') setStats({ vpp: "3.30 V", freqDisplay: "1.000 kHz", duty: "50.0%" });
    if (type === 'square') setStats({ vpp: "3.28 V", freqDisplay: "500.0 kHz", duty: "49.8%" });
    if (type === 'triangle') setStats({ vpp: "2.80 V", freqDisplay: "20.00 kHz", duty: "50.0%" });
    if (type === 'pulse') setStats({ vpp: "3.31 V", freqDisplay: "2.400 Mbps", duty: "BURST" });
    if (type === 'lissajous') setStats({ vpp: "4.20 V", freqDisplay: "F1:3 F2:2", duty: "PHASE" });
  };

  return (
    <div className={`oscilloscope-wrapper ${isOverclocked ? 'overclocked' : ''}`}>
      {/* Top Header Bar */}
      <div className="scope-header">
        <div className="scope-title-badge">
          <span className="live-dot"></span>
          <span className="scope-title">NETWORK & PACKET TELEMETRY // REAL-TIME STREAM</span>
        </div>

        <div className="scope-stats-row">
          <span className="stat-pill"><span className="dim">Vpp:</span> {isOverclocked ? "5.82 V" : stats.vpp}</span>
          <span className="stat-pill"><span className="dim">Throughput:</span> {isOverclocked ? "6.400 Gbps" : stats.freqDisplay}</span>
          <span className="stat-pill status-tag">{isRunning ? "RUN" : "STOP"}</span>
        </div>
      </div>

      {/* Screen Container */}
      <div className="scope-screen-bezel">
        <canvas ref={canvasRef} className="scope-canvas" />

        <div className="scope-screen-watermark">
          <span>SYNAPSE ENGINE</span>
          <span>LATENCY: &lt;15ms</span>
        </div>
      </div>

      {/* Minimal Tactile Control Strip */}
      <div className="scope-controls">
        <div className="btn-group">
          {['sine', 'square', 'triangle', 'pulse', 'lissajous'].map((type) => (
            <button 
              key={type}
              className={`scope-btn ${waveType === type ? 'active' : ''}`}
              onClick={() => handleWaveChange(type)}
            >
              {type === 'lissajous' ? 'LISSAJ.' : type.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="scope-sliders">
          <label className="slider-label">
            <span>FREQ</span>
            <input 
              type="range" 
              min="0.5" 
              max="8" 
              step="0.1" 
              value={freq}
              onChange={(e) => {
                setFreq(parseFloat(e.target.value));
                audioSynth.playBlip(300 + e.target.value * 100);
              }}
              className="scope-range"
            />
          </label>
        </div>

        <button 
          className={`scope-btn-icon ${isRunning ? 'active' : 'warn'}`}
          onClick={() => {
            audioSynth.playRelayClick();
            setIsRunning(!isRunning);
          }}
          title={isRunning ? "Freeze Signal" : "Run Continuous"}
        >
          {isRunning ? <Pause size={13} /> : <Play size={13} />}
          <span>{isRunning ? "PAUSE" : "RESUME"}</span>
        </button>
      </div>
    </div>
  );
}
