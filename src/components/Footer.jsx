import React from 'react';
import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#040508',
      borderTop: '1px solid rgba(46, 107, 255, 0.1)',
      padding: '60px 0 30px 0',
      color: 'var(--text-muted)',
      fontSize: '13px',
      textAlign: 'left'
    }}>
      <div className="container">
        
        {/* Top footer row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
        }}>
          {/* Logo & Description */}
          <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #2E6BFF, #6A00FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Plane style={{ color: '#FFFFFF', width: '16px', height: '16px', transform: 'rotate(-45deg)' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#FFF', letterSpacing: '0.05em' }}>
                AMACH
              </span>
            </a>
            <p style={{ lineHeight: 1.6 }}>
              Engineering resilient, high-throughput cloud logic and machine learning solvers 
              for safety-critical commercial airline operations worldwide.
            </p>
          </div>

          {/* Links Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFF', fontWeight: 600, letterSpacing: '0.05em' }}>
              SOLUTIONS
            </span>
            <a href="#solutions" className="footer-link">Crew Scheduling</a>
            <a href="#solutions" className="footer-link">Disruption Mitigation</a>
            <a href="#solutions" className="footer-link">Fuel Optimization</a>
            <a href="#solutions" className="footer-link">Baggage Telemetry</a>
          </div>

          {/* Links Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFF', fontWeight: 600, letterSpacing: '0.05em' }}>
              ARCHITECTURE
            </span>
            <a href="#capabilities" className="footer-link">AWS Migration</a>
            <a href="#capabilities" className="footer-link">Distributed Node EKS</a>
            <a href="#capabilities" className="footer-link">Service Objectives</a>
            <a href="#codeplay" className="footer-link">Developer API</a>
          </div>

          {/* Links Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFF', fontWeight: 600, letterSpacing: '0.05em' }}>
              AMACH GROUP
            </span>
            <a href="#hubs" className="footer-link">Dublin Head Office</a>
            <a href="#hubs" className="footer-link">London Division</a>
            <a href="#hubs" className="footer-link">Bucharest Engineering</a>
            <a href="#hubs" className="footer-link">Dubai MENA Gateway</a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Amach Group. All rights reserved. Built under operational mandate **LoganAviation**.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Security Standard: ISO 27001</span>
            <span style={{ color: 'var(--text-muted)' }}>Compliance: EASA Part-CAMO</span>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-link:hover {
          color: #00F0FF;
        }
      `}</style>
    </footer>
  );
}
