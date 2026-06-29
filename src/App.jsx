import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DashboardExplorer from './components/DashboardExplorer';
import Capabilities from './components/Capabilities';
import CodePlayground from './components/CodePlayground';
import CareersSection from './components/CareersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [designMode, setDesignMode] = useState('cinematic'); // 'cinematic' | 'executive'

  return (
    <div 
      className={designMode === 'executive' ? 'executive-mode' : ''} 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        background: 'var(--bg-base)',
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: designMode === 'executive'
          ? 'radial-gradient(circle 800px at 50% -200px, rgba(30, 64, 175, 0.04), transparent)'
          : 'radial-gradient(circle 800px at 50% -200px, rgba(46, 107, 255, 0.05), transparent)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'background-image 0.4s ease'
      }}></div>

      <Header designMode={designMode} setDesignMode={setDesignMode} />
      
      <main style={{ flex: 1, zIndex: 2 }}>
        <Hero designMode={designMode} />
        <DashboardExplorer designMode={designMode} />
        <Capabilities designMode={designMode} />
        <CodePlayground designMode={designMode} />
        <CareersSection designMode={designMode} />
        <ContactSection designMode={designMode} />
      </main>

      <Footer designMode={designMode} />
    </div>
  );
}
