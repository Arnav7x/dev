# ⚡ SYNAPSE-OS // Unhinged Engineering Student Portfolio Template

> **A Cyber-Industrial Spec-Sheet & Laboratory Mission Control for Engineering Students, Silicon Architects & Hardware Hackers.**

Built with **React + Vite**, featuring real-time hardware instrumentation, tactile synthesized Web Audio effects, interactive oscilloscope & logic analyzer simulators, and a nuclear overclock surge mode.

---

## 🛠️ The 6 Primary Sections

1. **01 // ME (Identity & Telemetry Dossier)**:
   - Live system metrics (Clock frequency, Core Voltage, Operating Temperature, Baud rate).
   - Real-time interactive **Rigol Digital Oscilloscope (DSO)** with synthesized Sine, Square, Triangle, Packet, and Lissajous harmonic curves.
   - Interactive knobs for Frequency and Volt/Div scale.
   - Key engineering metrics: lines of C/C++, PCBs designed, clock jitter tolerated, and soldering burns survived.

2. **02 // PROJECTS (CAD & Architectural Blueprints)**:
   - High-impact engineering project cards styled as military/aerospace CAD specification sheets.
   - Pre-loaded with realistic, high-caliber engineering projects (6-DOF Quadruped Robot, RV32I RISC-V SoC, 1.2kW GaN Inverter, 8-Ch EEG Headband, 200MSPS Logic Analyzer, Satellite Ground Station).
   - Click any card to launch the **Deep-Dive Schematic & Bus Topology Modal**, containing ASCII/SVG block diagrams, BOM details, and engineering challenges.

3. **03 // EXPERIENCES (Mission Logs & Deployments)**:
   - Interconnected **PCB bus trace timeline** with illuminated via nodes.
   - Engineering co-ops, research lab fellowships, and Formula SAE high-voltage electrical leadership.
   - Quantitative technical impact metrics and toolchain tags.

4. **04 // SKILLS (Register Map & Saleae Logic Analyzer Simulator)**:
   - Interactive **Saleae Logic Analyzer & Bus Sniffer simulator**: switch between **I2C (400kHz)**, **SPI (25MHz)**, and **CAN-FD (5Mbps)** to watch real digital timing waveforms and decoded packet frames pulse live.
   - Categorized proficiency meters across Silicon & MCUs, Hardware CAD (KiCad, Altium), Embedded Firmware (C/C++, FreeRTOS), Busses & Protocols, and Lab Metrology.

5. **05 // EDUCATION (Academic Rigor & Avionics)**:
   - Degree, GPA, High Honors, and student IEEE / Tau Beta Pi leadership.
   - Selected engineering coursework badges with topic descriptions (Signals & Systems, VLSI, Feedback Control, Computer Architecture, DSP).
   - Campus research cleanroom and lab affiliations.

6. **06 // HARDWARE (The Engineering Workbench & Teardowns)**:
   - Interactive physical tool inventory (Rigol DS1054Z Oscilloscope, Saleae Logic Pro 8, TS101 Soldering Iron, Quick 861DW Hot Air Station, Bambu Lab X1-Carbon, Mitutoyo Calipers, Custom Liquid-Cooled CAD Workstation, Fluke 87V DMM).
   - Deep inspection panel with test pings, field testimonials, quirks, and survivability ratings.

---

## 🧪 "Unhinged" Features & Easter Eggs

- ☢️ **OVERCLOCK / POWER SURGE Toggle**:
  - Located in the top navigation bar.
  - Engages a system power surge: shifts the theme to nuclear warning red, triggers particle sparks, spools clock frequency to 6.40 GHz, raises core voltage to 1.85V, increases oscilloscope scan speeds, and triggers CRT alert scanlines.
- 🔊 **Zero-Dependency Web Audio Synthesizer**:
  - Tactile mechanical relay clicks, frequency sweeps, and telemetry blips synthesized directly using the browser's Web Audio API.
  - Muted by default to respect browser autoplay policies; toggle on with the speaker button in the navbar.
- 💻 **Diagnostic Engineering CLI Terminal (`~`)**:
  - Press the backtick/tilde key (`` ` `` or `~`) or click **CLI [~]** in the header.
  - Commands supported: `help`, `me`, `projects`, `skills`, `exp`, `edu`, `hw`, `overclock`, `fire`, `coffee`, `clear`, `contact`.
- 🎨 **Multi-Palette HUD Switcher**:
  - Choose between **Cyan Vector HUD**, **Amber Phosphor CRT**, or **Radioactive Green**.

---

## 🚀 Quick Start Guide

### 1. Run Locally
The dev server is already running! If restarting:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### 2. Customizing Your Details
All personal details, projects, experiences, coursework, and hardware tools are centralized in:
📂 **[`src/portfolioData.js`](file:///Users/arnavthakur/Documents/Portfolio/src/portfolioData.js)**

Simply update the text strings and numbers in `PORTFOLIO_CONFIG` to match your own engineering background!

### 3. Production Build
```bash
npm run build
```
Generates a lightweight, optimized static production bundle in `dist/`.
