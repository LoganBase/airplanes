# LOGANAIR (LOGANAIR Prototype)

Welcome to the **LOGANAIR** production-ready website prototype, engineered by **LOGANAIR**. 

This system features **two distinct, fully interactive design directions** that can be toggled live on the running site for side-by-side executive comparison.

---

## 1. Multi-Design Comparison Strategy

We have delivered two distinct brand directions accessible via the **mode selector switch** in the header:

### 🚀 Version Alpha: Cinematic Dark
* **Audience:** Innovation Directors, Modern Engineering Leads.
* **Design & Feel:** Abstract neon glows, flight path transponder vectors, interactive canvas animations, fluid dark mode transitions, and modern UI elements.
* **Core Rationale:** Projects high innovation, modern tech-native maturity, and cutting-edge software engineering capabilities.

### 🏢 Version Beta: High-Trust Corporate Executive
* **Audience:** Airline CEOs, CFOs, Board Members, Compliance Inspectors.
* **Design & Feel:** Deep structured corporate navy/slate grids, solid emerald highlights (representing financial yield and return), clear numeric operational data tables, and structured charts mapping performance gains.
* **Core Rationale:** Projects absolute enterprise stability, zero-downtime reliability, compliance assurance (FAA/EASA FTL/IATA 753), and measurable business returns.

---

## 2. Technical Stack & Rationale

We selected a lightweight, high-performance, and modern engineering stack:

| Technology | Rationale |
| :--- | :--- |
| **Vite + React 19** | Sub-millisecond Hot Module Replacement (HMR), lightweight bundle size, and lightning-fast virtual DOM updates. |
| **Vanilla CSS 3** | Designed with custom CSS variables (`index.css`) for maximum performance, hardware-accelerated animations, and zero framework hydration overhead. Supports instantaneous client-side theme switching. |
| **Lucide Icons** | SVG-based vector icons for clean scaling and sub-pixel alignment on high-DPI displays. |
| **HTML5 Canvas 2D API** | Renders dynamic flight paths (Alpha Mode) or automated fuel regression line charts (Beta Mode) inside the browser's render loop without overhead. |

---

## 3. Simulated Elite Agency Contributions

* **UX Researcher & Airline Consultant:** Mapped operational constraints (FAA 14 CFR Part 117 FTL rules, IATA Res 753 custody tracking, wind drag coefficients, and delay mitigation slot fees).
* **UI/UX Designer:** Created two distinct coordinate style systems (Cinematic Neon vs. Corporate Emerald/Navy) mapped to simple global CSS class variables.
* **Lead Frontend Engineer:** Integrated state-based component switches and responsive rendering layouts.
* **Lead Backend Engineer:** Created concrete schema files (`schema.sql`) and API integration stubs (`api-spec.yaml`) representing high-fidelity backend architectures.

---

## 4. Local Installation & Hosting

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

### Setup Steps
1. Navigate to the repository root:
   ```bash
   cd airplanes
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local host address shown in your terminal (typically `http://localhost:5173`).

### Production Build & Preview
Validate correct bundling and preview the optimized build:
```bash
npm run build
npm run preview
```


