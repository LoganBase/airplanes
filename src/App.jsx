import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DashboardExplorer from './components/DashboardExplorer';
import Capabilities from './components/Capabilities';
import CodePlayground from './components/CodePlayground';
import CareersSection from './components/CareersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#05050A' }}>
      {/* Cinematic grid lines overlay across entire page background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(circle 800px at 50% -200px, rgba(46, 107, 255, 0.05), transparent)',
        pointerEvents: 'none',
        zIndex: 1
      }}></div>

      <Header />
      
      <main style={{ flex: 1, zIndex: 2 }}>
        <Hero />
        <DashboardExplorer />
        <Capabilities />
        <CodePlayground />
        <CareersSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
