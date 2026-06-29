import React, { useState, useEffect } from 'react';
import { Plane, Cpu, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [latency, setLatency] = useState(18);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Simulate real-time flight telemetry stream latency updates
    const interval = setInterval(() => {
      setLatency(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next < 10 ? 10 : next > 35 ? 35 : next;
      });
    }, 3000);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(5, 5, 10, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(46, 107, 255, 0.12)' : '1px solid transparent',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Brand Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #2E6BFF, #6A00FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(46, 107, 255, 0.3)',
          }}>
            <Plane style={{ color: '#FFFFFF', width: '20px', height: '20px', transform: 'rotate(-45deg)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              lineHeight: 1.1,
            }}>
              AMACH
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 500,
              color: '#00F0FF',
              letterSpacing: '0.2em',
            }}>
              LOGANAVIATION
            </span>
          </div>
        </a>

        {/* Navigation Menu */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }} className="desktop-nav">
          <a href="#solutions" className="nav-link">Solutions</a>
          <a href="#capabilities" className="nav-link">Architecture</a>
          <a href="#codeplay" className="nav-link">Developer Lab</a>
          <a href="#hubs" className="nav-link">Global Operations</a>
        </nav>

        {/* Telemetry status & CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}>
          {/* Status Telemetry */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(46, 107, 255, 0.05)',
            border: '1px solid rgba(46, 107, 255, 0.15)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#8F9CAE',
          }} className="telemetry-badge">
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#00F0FF',
              boxShadow: '0 0 8px #00F0FF',
            }}></span>
            <span>API LATENCY: {latency}ms</span>
          </div>

          <a href="#contact" className="btn-primary" style={{
            padding: '10px 18px',
            fontSize: '13px',
          }}>
            Initiate Consultation
          </a>
        </div>
      </div>

      <style>{`
        .nav-link {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 8px 0;
        }
        .nav-link:hover {
          color: #FFFFFF;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, #2E6BFF, #00F0FF);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        @media (max-width: 900px) {
          .desktop-nav, .telemetry-badge {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
