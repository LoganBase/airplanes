import React from 'react';
import { ShieldCheck, Cpu, Code2, Server, Globe2, BarChart4 } from 'lucide-react';

// Import local assets for visual cards
import runwayLanding from '../assets/runway_landing.jpg';
import operationsControl from '../assets/operations_control.jpg';
import airplaneWingFlight from '../assets/airplane_wing_flight.jpg';

export default function Capabilities({ designMode }) {
  const cards = [
    {
      icon: <Cpu style={{ width: '24px', height: '24px', color: '#00F0FF' }} />,
      title: 'CSP Optimization Solvers',
      desc: 'Custom heuristic search algorithms to solve NP-hard airline crew assignment problems (CSP). Balances strict regulatory block-hour limits with flight deck preferences.',
      stat: '98.6% Crew Rostering Efficiency'
    },
    {
      icon: <ShieldCheck style={{ width: '24px', height: '24px', color: '#00F0FF' }} />,
      title: 'Real-time Telemetry Streams',
      desc: 'Sub-second flight transponder data ingestion pipelines utilizing Apache Kafka and AWS Kinesis. Allows dispatchers to act on aircraft status updates instantly.',
      stat: '<85ms Telemetry Ingestion Latency'
    },
    {
      icon: <Code2 style={{ width: '24px', height: '24px', color: '#00F0FF' }} />,
      title: 'Graph-Theoretic Baggage Routing',
      desc: 'Custom route-mapping logic modeled as directed acyclic graphs (DAGs). Automates dynamic sorting chutes to divert baggage around conveyor failures.',
      stat: '99.97% Sorting Accuracy'
    },
    {
      icon: <Server style={{ width: '24px', height: '24px', color: '#00F0FF' }} />,
      title: 'Machine Learning Fuel Pipelines',
      desc: 'Highly trained regressors analyzing historic flight altitudes, weight variables, and wind patterns to recommend optimal flight levels (FL) on high-traffic corridors.',
      stat: '4.2% Av. Jet-A Fuel Reduction'
    },
    {
      icon: <Globe2 style={{ width: '24px', height: '24px', color: '#00F0FF' }} />,
      title: 'Multi-Cloud High-Throughput Architecture',
      desc: 'Engineered directly on AWS, GCP, and Azure with Kubernetes (EKS) orchestration. Features automatic failover and containerized geo-distributed nodes.',
      stat: '99.999% Service Level Objective'
    },
    {
      icon: <BarChart4 style={{ width: '24px', height: '24px', color: '#00F0FF' }} />,
      title: 'Predictive Disruption Analytics',
      desc: 'Event-driven recovery loops (IROPs) forecasting weather delays and airport slot congestions. Calculates optimized backup airframe assignments before delays compound.',
      stat: '3.4x Faster Disruption Recovery'
    }
  ];

  return (
    <section id="capabilities" style={{
      padding: '100px 0',
      background: 'linear-gradient(to bottom, #0B0C14, #05050A)',
      borderTop: '1px solid rgba(46, 107, 255, 0.05)',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: designMode === 'executive' ? 'rgba(30, 64, 175, 0.03)' : 'rgba(46, 107, 255, 0.03)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }}></div>

      <div className="container">
        
        {/* Title */}
        <div style={{ maxWidth: '650px', marginBottom: '60px', textAlign: 'left' }}>
          <span className="badge" style={{ marginBottom: '16px' }}>
            {designMode === 'executive' ? 'OPERATIONAL METRICS' : 'SYSTEM CAPABILITIES'}
          </span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            {designMode === 'executive' ? 'Resilience & Compliance Matrix' : 'Mission-Critical Architecture'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {designMode === 'executive'
              ? 'Verifiable performance targets achieved across global carrier network integrations.'
              : 'Our simulated digital agency team mapped, designed, and architected these core pillars to solve the absolute highest-value friction points in modern commercial aviation.'}
          </p>
        </div>

        {/* Dynamic Mode Grid */}
        {designMode === 'executive' ? (
          /* BETA EXECUTIVE MODE: High Impact 3-Column Image Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {/* Card 1: Runway Landing */}
            <div className="glass-panel visual-cap-card" style={{
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              border: '1px solid rgba(30, 64, 175, 0.25)'
            }}>
              <img src={runwayLanding} alt="FTL Compliance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'brightness(0.55)' }} />
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#10B981', marginBottom: '12px' }}>ROSTERING SOLVER</span>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '6px' }}>
                  100% COMPLIANT
                </div>
                <div style={{ fontSize: '15px', color: '#E2E8F0', fontWeight: 600, marginBottom: '4px' }}>FAA Part 117 & EASA FTL</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Algorithmic duty hour checks.</p>
              </div>
            </div>

            {/* Card 2: Operations Control Room */}
            <div className="glass-panel visual-cap-card" style={{
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              border: '1px solid rgba(30, 64, 175, 0.25)'
            }}>
              <img src={operationsControl} alt="SLA Streams" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'brightness(0.55)' }} />
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#10B981', marginBottom: '12px' }}>TELEMETRY STREAM</span>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '6px' }}>
                  99.999% UPTIME
                </div>
                <div style={{ fontSize: '15px', color: '#E2E8F0', fontWeight: 600, marginBottom: '4px' }}>Decoupled Data Pipeline</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>&lt;85ms ingestion latency bounds.</p>
              </div>
            </div>

            {/* Card 3: Airplane Wing In Flight */}
            <div className="glass-panel visual-cap-card" style={{
              height: '420px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              border: '1px solid rgba(30, 64, 175, 0.25)'
            }}>
              <img src={airplaneWingFlight} alt="Fuel Optimization" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, filter: 'brightness(0.55)' }} />
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                <span className="badge" style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.3)', color: '#10B981', marginBottom: '12px' }}>FUEL MACHINE LEARNING</span>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-display)', lineHeight: 1.1, marginBottom: '6px' }}>
                  -4.2% FUEL BURN
                </div>
                <div style={{ fontSize: '15px', color: '#E2E8F0', fontWeight: 600, marginBottom: '4px' }}>Optimal Altitude Stepping</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Predictive ML drag calculations.</p>
              </div>
            </div>
          </div>
        ) : (
          /* ALPHA CINEMATIC MODE: Detailed text cards */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {cards.map((card, idx) => (
              <div key={idx} className="glass-panel" style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px',
                borderRadius: '14px',
                border: '1px solid rgba(46, 107, 255, 0.08)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'rgba(46, 107, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(46, 107, 255, 0.15)'
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{ fontSize: '20px', color: '#FFFFFF' }}>{card.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.desc}</p>
                </div>

                {/* Status footer */}
                <div style={{
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px'
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    PERFORMANCE INDEX:
                  </span>
                  <span style={{ color: '#00F0FF', fontWeight: 600 }}>{card.stat}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      <style>{`
        .visual-cap-card img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .visual-cap-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
