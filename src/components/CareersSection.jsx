import React from 'react';
import { MapPin, Globe, ChevronRight } from 'lucide-react';

export default function CareersSection() {
  const hubs = [
    { city: 'Dublin', role: 'Global HQ & AI Labs', desc: 'Managing core constraint solvers, flight scheduling graph engines, and cloud scaling infrastructure.' },
    { city: 'London', role: 'Commercial Operations & Cloud Dev', desc: 'Deploying secure AWS, Azure, and Google Cloud systems for airline enterprise partners.' },
    { city: 'Bucharest', role: 'High-Throughput Engineering', desc: 'Specializing in Rust, Go, and Kafka event streaming pipeline architectures.' },
    { city: 'Dubai', role: 'MENA Integration Hub', desc: 'Interfacing directly with premier Middle Eastern carriers for on-site operations integrations.' }
  ];

  return (
    <section id="hubs" style={{
      padding: '100px 0',
      background: 'linear-gradient(to bottom, #080911, #05050A)',
      borderTop: '1px solid rgba(46, 107, 255, 0.05)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <span className="badge" style={{ marginBottom: '16px' }}>GLOBAL OPERATIONS</span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            Our Global Operations Hubs
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            We work where aviation happens. Our engineers deploy and support safety-critical systems 
            across major global travel hubs.
          </p>
        </div>

        {/* Hubs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {hubs.map((hub, idx) => (
            <div key={idx} className="glass-panel" style={{
              padding: '28px',
              borderRadius: '12px',
              border: '1px solid rgba(46, 107, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: '#00F0FF' }} />
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-display)' }}>
                    {hub.city}
                  </span>
                </div>
                <span className="pulse-indicator"></span>
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#2E6BFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {hub.role}
                </span>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
                  {hub.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Careers banner */}
        <div className="glass-panel" style={{
          padding: '32px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, rgba(46, 107, 255, 0.06) 0%, rgba(106, 0, 255, 0.03) 100%)',
          border: '1px solid rgba(46, 107, 255, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          textAlign: 'left'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '8px', color: '#FFF' }}>
              Want to solve the hardest problems in code?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Join a team of elite, specialized frontend, backend, and machine learning engineers. 
              We are actively hiring for core systems developers in Dublin, Bucharest, and London.
            </p>
          </div>
          <a href="#contact" className="btn-secondary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}>
            <span>View Positions</span>
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </a>
        </div>

      </div>

      <style>{`
        .pulse-indicator {
          width: 8px;
          height: 8px;
          background: #00F0FF;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.7);
          animation: pulsePoint 2s infinite;
        }
        @keyframes pulsePoint {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 240, 255, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(0, 240, 255, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 240, 255, 0);
          }
        }
      `}</style>
    </section>
  );
}
