import React from 'react';
import { ShieldCheck, Cpu, Code2, Server, Globe2, BarChart4 } from 'lucide-react';

export default function Capabilities({ designMode }) {
  const cards = designMode === 'executive' ? [
    {
      icon: <Cpu style={{ width: '24px', height: '24px', color: '#10B981' }} />,
      title: 'FTL Regulation Optimizers',
      desc: 'Formally verified constraint solvers satisfying FAA 14 CFR Part 117 and EASA FTL block time caps. Guarantees zero schedule compliance breaches.',
      stat: '100% Compliant Pairings'
    },
    {
      icon: <ShieldCheck style={{ width: '24px', height: '24px', color: '#10B981' }} />,
      title: 'Secure Flight Telemetry Streams',
      desc: 'Sub-85ms transponder telemetry ingestion pipelines utilizing secure TLS 1.3 encryption. Fully decoupled from public networks for air carrier safety.',
      stat: '<85ms Ingestion Latency'
    },
    {
      icon: <Code2 style={{ width: '24px', height: '24px', color: '#10B981' }} />,
      title: 'IATA 753 Baggage Infrastructure',
      desc: 'Custodian transfer tracking modeled as formal state-charts. Seamlessly integrates with passenger boarding gates and carousel sortation chutes.',
      stat: 'IATA 753 Fully Compliant'
    },
    {
      icon: <Server style={{ width: '24px', height: '24px', color: '#10B981' }} />,
      title: 'Optimal Ascent ML Estimators',
      desc: 'Supervised regression pipelines predicting headwind drag coefficients to calculate altitude stepping. Reduces fuel burn and greenhouse offset costs.',
      stat: '4.2% Fuel Offset Saved'
    },
    {
      icon: <Globe2 style={{ width: '24px', height: '24px', color: '#10B981' }} />,
      title: 'Encrypted Multi-Cloud Nodes',
      desc: 'Enterprise deployments spanning AWS GovCloud and Azure for Government. Configured with geo-distributed failover networks with 99.999% uptime objectives.',
      stat: '99.999% Availability SLO'
    },
    {
      icon: <BarChart4 style={{ width: '24px', height: '24px', color: '#10B981' }} />,
      title: 'IROPs Financial Mitigation Loops',
      desc: 'Event-driven disruption routing that computes alternative airframe allocations. Balances passenger compensation claims against crew standby overhead.',
      stat: '92% Claim Payout Saved'
    }
  ] : [
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
            {designMode === 'executive' ? 'SYSTEM CERTIFICATIONS' : 'SYSTEM CAPABILITIES'}
          </span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            {designMode === 'executive' ? 'Compliance & Security Framework' : 'Mission-Critical Architecture'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {designMode === 'executive'
              ? 'Our solutions are built with a primary focus on strict civil aviation compliance, enterprise scale, and audited financial returns.'
              : 'Our simulated digital agency team mapped, designed, and architected these core pillars to solve the absolute highest-value friction points in modern commercial aviation.'}
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
              border: designMode === 'executive' ? '1px solid rgba(30, 64, 175, 0.15)' : '1px solid rgba(46, 107, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  background: designMode === 'executive' ? 'rgba(30, 64, 175, 0.08)' : 'rgba(46, 107, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: designMode === 'executive' ? '1px solid rgba(30, 64, 175, 0.15)' : '1px solid rgba(46, 107, 255, 0.15)'
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
                  {designMode === 'executive' ? 'AUDIT VERIFICATION:' : 'PERFORMANCE INDEX:'}
                </span>
                <span style={{ color: designMode === 'executive' ? '#10B981' : '#00F0FF', fontWeight: 600 }}>{card.stat}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
