# LoganAviation (Amach Prototype)

Welcome to the **LoganAviation** production-ready website prototype, engineered by **Amach**. 

This system represents a state-of-the-art interactive demonstration of Amach's software capabilities in solving safety-critical, high-throughput, and NP-hard computational challenges for commercial aviation.

---

## 1. Executive & Strategic Vision

The LoganAviation design system is architected around two core principles: **absolute technological superiority** and **ironclad enterprise trust**.

### Design Layout & Rationale
* **Ultra-Minimalist Cinematic Dark Mode:** Leveraging a deep `#05050A` space-black backdrop with high-contrast glowing elements (`#00F0FF`, `#2E6BFF`). This matches the aesthetic of high-tier technical developers (e.g., Stripe, Linear, Apple) while reducing eye fatigue during operational shift work.
* **Interactive Flight Operations Logic Explorer:** An interactive, state-driven dashboard showing real-time simulations of:
  * **Crew Constraint Satisfaction Problem (CSP):** Adjusting optimization priorities between flight hours and crew Quality of Life.
  * **Irregular Operations (IROPs) Recovery Loop:** Triggering flight disruption events and witnessing auto-resolution.
  * **Machine Learning Fuel Regressors:** Modifying cruise altitude and wind speeds to calculate optimal fuel savings.
  * **Graph-Theoretic Baggage Telemetry:** Simulating BLOCKAGE anomalies and watching flow paths dynamically reroute.
* **HTML5 Canvas Telemetry Grid:** A performant, mathematical particle network rendered in the Hero section, visualizing airport hubs and real-time transponder route curves.

---

## 2. Technical Stack & Rationale

We selected a lightweight, high-performance, and modern engineering stack:

| Technology | Rationale |
| :--- | :--- |
| **Vite + React 19** | Sub-millisecond Hot Module Replacement (HMR), lightweight bundle size, and lightning-fast virtual DOM updates. |
| **Vanilla CSS 3** | Designed with custom CSS variables (`index.css`) for maximum performance, hardware-accelerated animations, and zero framework hydration overhead. Avoids the lock-in and bloat of Tailwind configurations. |
| **Lucide Icons** | SVG-based vector icons for clean scaling and sub-pixel alignment on high-DPI displays. |
| **HTML5 Canvas 2D API** | Custom particle pathfinders and radar scan rendering inside the client's rendering loop, avoiding high-overhead external canvas wrappers. |

---

## 3. Simulated Elite Agency Contributions

Under the instruction of the CEO and HR, an elite virtual engineering team was simulated to deliver this platform:

* **UX Researcher & Airline Consultant:** Mapped high-value airline pain points (crew flight limits, slot restrictions, baggage chute failures, and fuel consumption formulas).
* **UI/UX Designer:** Established the high-end, futuristic color tokens, typography scales, glassmorphism panel properties, and state transition guidelines.
* **Lead Frontend Engineer:** Authored the responsive layouts, canvas telemetry calculations, interactive slider metrics, and reactive tab routing.
* **Lead Backend Engineer:** Formulated the production code stubs in Go, Rust, and TypeScript shown in the Developer Lab, simulating real-world microservice data payloads.

---

## 4. Local Installation & Hosting

Follow these instructions to spin up the prototype locally on your workstation:

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
