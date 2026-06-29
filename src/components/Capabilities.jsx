import React from 'react';
import { ShieldCheck, Cpu, Code2, Server, Globe2, BarChart4 } from 'lucide-react';

export default function Capabilities() {
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
      {/* Light glow elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'rgba(46, 107, 255, 0.03)',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }}></div>

      <div className="container">
        
        {/* Title */}
        <div style={{ maxWidth: '650px', marginBottom: '60px' }}>
          <span className="badge" style={{ marginBottom: '16px' }}>SYSTEM CAPABILITIES</span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            Mission-Critical Architecture
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Our simulated digital agency team mapped, designed, and architected these core pillars 
            to solve the absolute highest-value friction points in modern commercial aviation.
          </p>
        </div>

        {/* Grid */}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

              {/* Status footer for card */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>PERFORMANCE INDEX:</span>
                <span style={{ color: '#00F0FF', fontWeight: 600 }}>{card.stat}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
