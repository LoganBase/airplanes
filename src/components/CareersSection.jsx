import React from 'react';
import { MapPin, ChevronRight, Briefcase, Award } from 'lucide-react';

export default function CareersSection({ designMode }) {
  // Alpha Cinematic/Technical Hub Definitions
  const cinematicHubs = [
    { city: 'Dublin', role: 'Global HQ & AI Labs', desc: 'Managing core constraint solvers, flight scheduling graph engines, and cloud scaling infrastructure.' },
    { city: 'London', role: 'Commercial Operations & Cloud Dev', desc: 'Deploying secure AWS, Azure, and Google Cloud systems for airline enterprise partners.' },
    { city: 'Bucharest', role: 'High-Throughput Engineering', desc: 'Specializing in Rust, Go, and Kafka event streaming pipeline architectures.' },
    { city: 'Dubai', role: 'MENA Integration Hub', desc: 'Interfacing directly with premier Middle Eastern carriers for on-site operations integrations.' }
  ];

  // Beta Executive/Sales Hub Definitions
  const executiveHubs = [
    { city: 'Dublin', role: 'Corporate Headquarters', desc: 'Directing global airline program delivery, regulatory board compliance, and executive client advisory services.' },
    { city: 'London', role: 'Enterprise Client Partnerships', desc: 'Providing AWS/Azure program delivery, system compliance management, and regional account oversight.' },
    { city: 'Bucharest', role: 'SLA & Performance Engineering', desc: 'Architecting high-availability systems, low-latency transaction processing, and data security audits.' },
    { city: 'Dubai', role: 'MENA Operations Gateway', desc: 'Managing regional airline integrations, commercial implementation desk, and local enterprise operations support.' }
  ];

  const hubs = designMode === 'executive' ? executiveHubs : cinematicHubs;
  const accentColor = designMode === 'executive' ? '#10B981' : '#00F0FF';
  const pulseColor = designMode === 'executive' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0, 240, 255, 0.4)';

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
          <span className="badge" style={{ marginBottom: '16px' }}>
            {designMode === 'executive' ? 'GLOBAL OPERATIONS DESKS' : 'GLOBAL OPERATIONS'}
          </span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            {designMode === 'executive' ? 'Our Regional Operations Centers' : 'Our Global Operations Hubs'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {designMode === 'executive'
              ? 'Our systems deliver 24/7/365 operational resilience. Our regional offices manage program delivery and local carrier integrations.'
              : 'We work where aviation happens. Our engineers deploy and support safety-critical systems across major global travel hubs.'}
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
              border: designMode === 'executive' ? '1px solid rgba(30, 64, 175, 0.15)' : '1px solid rgba(46, 107, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin style={{ width: '18px', height: '18px', color: accentColor, transition: 'color 0.4s ease' }} />
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-display)' }}>
                    {hub.city}
                  </span>
                </div>
                {/* Dynamically styled pulsing dot */}
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: accentColor,
                  borderRadius: '50%',
                  boxShadow: `0 0 8px ${accentColor}`,
                  transition: 'background-color 0.4s ease, box-shadow 0.4s ease'
                }}></div>
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: designMode === 'executive' ? '#10B981' : '#2E6BFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'color 0.4s ease'
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

        {/* Careers/Advisory Banner */}
        <div className="glass-panel" style={{
          padding: '32px',
          borderRadius: '14px',
          background: designMode === 'executive'
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(30, 64, 175, 0.03) 100%)'
            : 'linear-gradient(135deg, rgba(46, 107, 255, 0.06) 0%, rgba(106, 0, 255, 0.03) 100%)',
          border: designMode === 'executive'
            ? '1px solid rgba(16, 185, 129, 0.15)'
            : '1px solid rgba(46, 107, 255, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          textAlign: 'left',
          transition: 'all 0.4s ease'
        }}>
          <div style={{ maxWidth: '600px' }}>
            <h3 style={{ fontSize: '22px', marginBottom: '8px', color: '#FFF' }}>
              {designMode === 'executive'
                ? 'Evaluate your operational system resilience'
                : 'Want to solve the hardest problems in code?'}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {designMode === 'executive'
                ? 'Request an executive advisory session. Our program delivery team will conduct a thorough compatibility audit of your airline infrastructure.'
                : 'Join a team of elite, specialized frontend, backend, and machine learning engineers. We are actively hiring for core systems developers in Dublin, Bucharest, and London.'}
            </p>
          </div>
          <a href="#contact" className="btn-secondary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}>
            {designMode === 'executive' ? (
              <>
                <Award style={{ width: '16px', height: '16px', color: '#10B981' }} />
                <span>Schedule Operations Audit</span>
              </>
            ) : (
              <>
                <Briefcase style={{ width: '16px', height: '16px', color: '#2E6BFF' }} />
                <span>Explore Positions</span>
              </>
            )}
            <ChevronRight style={{ width: '16px', height: '16px' }} />
          </a>
        </div>

      </div>
    </section>
  );
}
