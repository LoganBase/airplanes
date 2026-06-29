import React, { useState } from 'react';
import { Code, Terminal as TerminalIcon, Play, Copy, Check, Plane, Compass, Settings, Shield } from 'lucide-react';

// Import local assets
import airportSunset from '../assets/airport_sunset.jpg';
import aviationJetEngine from '../assets/aviation_jet_engine.jpg';
import cockpitFlightDeck from '../assets/cockpit_flight_deck.jpg';

export default function CodePlayground({ designMode }) {
  // Alpha Cinematic Mode - Code Sandbox State
  const [activeFile, setActiveFile] = useState('solver.go');
  const [terminalOutput, setTerminalOutput] = useState([
    'SYSTEM: Initialized dev console logs.',
    'SYSTEM: Type "npm run test" or click "Execute Logic Suite" above.'
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copied, setCopied] = useState(false);

  // Beta Executive Mode - Image Showcase State
  const [activeShowcase, setActiveShowcase] = useState('fleet');

  const cinematicFiles = {
    'solver.go': {
      lang: 'go',
      code: `package solver

import (
	"context"
	"errors"
)

// CrewConstraintSolver handles the CSP back-tracking solver
type CrewConstraintSolver struct {
	MaxFlightTimeMins int
	MinRestPeriodMins int
}

func (s *CrewConstraintSolver) OptimizePairing(ctx context.Context, chain *PairingChain) (*OptimizedRoute, error) {
	if len(chain.Legs) == 0 {
		return nil, errors.New("empty pairing sequence")
	}

	// 1. Evaluate duty time bounds
	dutyTime := chain.CalculateDutyTime()
	if dutyTime > s.MaxFlightTimeMins {
		return s.insertDeadhead(ctx, chain)
	}

	// 2. Perform graph back-tracking
	route, ok := s.backtrack(ctx, chain, 0)
	if !ok {
		return nil, errors.New("no feasible pairing sequence found")
	}

	return route, nil
}`
    },
    'bagRouter.ts': {
      lang: 'typescript',
      code: `// baggage/router.ts
import { Graph, SortationChute, LuggageQueue } from './aviation-types';

export class BaggageSortationEngine {
  private routingGraph: Graph;

  constructor(nodes: Graph) {
    this.routingGraph = nodes;
  }

  public async computeDynamicDivert(
    blockedChuteId: string,
    currentQueue: LuggageQueue[]
  ): Promise<Map<string, SortationChute>> {
    const divertMap = new Map<string, SortationChute>();
    const activeChutes = this.routingGraph.getAvailableChutes();

    for (const bag of currentQueue) {
      const alternativePath = this.routingGraph.findKShortestPath(
        bag.originFeed, 
        bag.flightGate, 
        (chute) => chute.id !== blockedChuteId && chute.occupancy < 0.85
      );
      
      if (alternativePath) {
        divertMap.set(bag.tagId, alternativePath.nextChute);
      }
    }

    return divertMap;
  }
}`
    },
    'telemetry.rs': {
      lang: 'rust',
      code: `// telemetry/parser.rs
use tokio::sync::mpsc;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct FlightTransponderFeed {
    pub flight_id: String,
    pub lat: f64,
    pub lon: f64,
    pub alt_ft: u32,
    pub heading_deg: u16,
}

impl TelemetryStream {
    pub async fn process_incoming_feeds(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        while let Some(raw_payload) = self.receiver.recv().await {
            let feed: FlightTransponderFeed = serde_json::from_slice(&raw_payload)?;
            Self::publish_to_broker(&feed).await?;
        }
        Ok(())
    }
}`
    }
  };

  // Beta Executive Mode - Showcase Cards
  const showcaseTabs = {
    'fleet': {
      icon: <Plane style={{ width: '14px', height: '14px' }} />,
      label: 'Fleet Integration',
      image: airportSunset,
      title: 'Global Fleet Operations Control',
      description: 'We deploy secure cloud-native operations management systems across major international transit terminals. Our platforms coordinate ground handling, fueling vectors, and catering logistics in a single, unified dispatcher panel.',
      metrics: [
        { label: 'Ingestion Points', val: '240+ Airports' },
        { label: 'Active Fleets Opt', val: '1,800+ Airframes' },
        { label: 'Turnaround Latency', val: '-14% Delay Time' }
      ]
    },
    'avionics': {
      icon: <Compass style={{ width: '14px', height: '14px' }} />,
      label: 'Avionics & Telemetry',
      image: cockpitFlightDeck,
      title: 'Real-time Cockpit Telemetry Streams',
      description: 'Sub-85ms transponder data ingestion pipelines connected directly to advanced glass flight deck instruments. Generates real-time hazard vectors and dynamic flight level route suggestions straight to flight crews.',
      metrics: [
        { label: 'Stream Bandwidth', val: '4.8 GB/sec' },
        { label: 'Latency Bounds', val: '<85 Microseconds' },
        { label: 'FMS Updates', val: '100% Automated' }
      ]
    },
    'aerodynamics': {
      icon: <Settings style={{ width: '14px', height: '14px' }} />,
      label: 'Thrust Efficiency',
      image: aviationJetEngine,
      title: 'Aerodynamic Performance Analytics',
      description: 'Evaluating real-time jet engine turbine outputs, specific fuel consumption (SFC), and air density parameters. Operates machine learning regression models to calculate variable cruise altitudes and maximize block-hour margins.',
      metrics: [
        { label: 'Turbine Feeds', val: '12,000 sensors/sec' },
        { label: 'Av. Carbon Saved', val: '1.2M Tons/year' },
        { label: 'Fuel Cost Delta', val: '-4.2% Yield' }
      ]
    }
  };

  const copyToClipboard = () => {
    const activeData = cinematicFiles[activeFile];
    if (activeData) {
      navigator.clipboard.writeText(activeData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const runTests = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setTerminalOutput(prev => [
      ...prev,
      `> EXECUTING: test suite on engine "${activeFile}"`,
      'Compiling packages...',
    ]);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        '✓ Compilation completed in 340ms.',
        'Running 14 unit test assertions...'
      ]);
    }, 1000);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        'PASS  solver/crew_rostering_test.go (8 assertions, 12.4ms)',
        'PASS  solver/deadhead_insertion_test.go (6 assertions, 4.1ms)',
        '✓ ALL TESTS PASSED. Logic integrity 100%.',
        '-------------------------------------------'
      ]);
      setIsCompiling(false);
    }, 2200);
  };

  return (
    <section id="codeplay" style={{
      padding: '100px 0',
      background: 'linear-gradient(to bottom, #05050A, #080911)',
      borderTop: '1px solid rgba(46, 107, 255, 0.05)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <span className="badge" style={{ marginBottom: '16px' }}>
            {designMode === 'executive' ? 'OPERATIONAL PORTFOLIO' : 'DEVELOPER LAB'}
          </span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            {designMode === 'executive' ? 'Enterprise Integration Showcase' : 'Production-Ready Engine Stubs'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {designMode === 'executive'
              ? 'Examine how Amach integrates high-performance cloud logic with physical flight systems, airframes, and ground handling operations.'
              : 'We write clean, statically typed, highly optimized code. Explore the actual Go, TypeScript, and Rust solvers running inside LoganAviation pipelines.'}
          </p>
        </div>

        {/* Dynamic Mode Layout */}
        {designMode === 'executive' ? (
          /* BETA EXECUTIVE MODE: High Impact Image Showcase */
          <div className="glass-panel" style={{
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(30, 64, 175, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            {/* Showcase Header tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#0A0C16',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(30, 64, 175, 0.15)',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield style={{ width: '16px', height: '16px', color: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFF', fontWeight: 600, letterSpacing: '0.05em' }}>
                  AMACH OPERATIONAL PROOFS
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px' }}>
                {Object.keys(showcaseTabs).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveShowcase(key)}
                    style={{
                      background: activeShowcase === key ? 'rgba(30, 64, 175, 0.35)' : 'transparent',
                      border: 'none',
                      color: activeShowcase === key ? '#FFF' : 'var(--text-secondary)',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {showcaseTabs[key].icon}
                    <span>{showcaseTabs[key].label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase Main Display Panel */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {/* Image Frame (50%) */}
              <div style={{ flex: '1 1 400px', position: 'relative', overflow: 'hidden', height: '360px' }}>
                <img 
                  src={showcaseTabs[activeShowcase].image} 
                  alt={showcaseTabs[activeShowcase].title} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease',
                    filter: 'brightness(0.95) contrast(1.05)'
                  }} 
                />
                {/* Subtle gradient vignette overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, transparent 70%, rgba(17, 22, 37, 1) 100%)',
                  pointerEvents: 'none'
                }}></div>
              </div>

              {/* Text Description Frame (50%) */}
              <div style={{ flex: '1 1 400px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'rgba(17, 22, 37, 0.4)', textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '24px', color: '#FFF', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    {showcaseTabs[activeShowcase].title}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {showcaseTabs[activeShowcase].description}
                  </p>
                </div>

                {/* Metrics Blocks */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginTop: '32px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {showcaseTabs[activeShowcase].metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                        {metric.label}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-display)', marginTop: '4px' }}>
                        {metric.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ALPHA CINEMATIC MODE: Code Editor Sandbox */
          <div style={{
            background: '#040508',
            border: '1px solid rgba(46, 107, 255, 0.15)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            {/* Editor Header Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#0A0C16',
              padding: '12px 20px',
              borderBottom: '1px solid rgba(46, 107, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F' }}></div>
              </div>
              
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {Object.keys(cinematicFiles).map(fileName => (
                  <button
                    key={fileName}
                    onClick={() => setActiveFile(fileName)}
                    style={{
                      background: activeFile === fileName ? '#14182E' : 'transparent',
                      border: activeFile === fileName ? '1px solid rgba(46, 107, 255, 0.2)' : '1px solid transparent',
                      color: activeFile === fileName ? '#FFF' : 'var(--text-secondary)',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Code style={{ width: '12px', height: '12px', color: '#2E6BFF' }} />
                    <span>{fileName}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={copyToClipboard}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Copy code snippet"
                >
                  {copied ? <Check style={{ width: '14px', height: '14px', color: '#00FF66' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                </button>
                <button 
                  onClick={runTests}
                  disabled={isCompiling}
                  style={{
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    color: '#00F0FF',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Play style={{ width: '10px', height: '10px' }} />
                  <span>Execute Logic Suite</span>
                </button>
              </div>
            </div>

            {/* Code Editor Window */}
            <div style={{
              padding: '24px',
              overflowX: 'auto',
              textAlign: 'left',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: '#B8C0D3',
              background: '#040508',
              minHeight: '320px',
              lineHeight: 1.6
            }}>
              <pre style={{ margin: 0 }}>
                <code>{cinematicFiles[activeFile].code}</code>
              </pre>
            </div>

            {/* Terminal Console Output */}
            <div style={{
              background: '#020305',
              borderTop: '1px solid rgba(46, 107, 255, 0.12)',
              padding: '16px 24px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.03)', paddingBottom: '6px' }}>
                <TerminalIcon style={{ width: '14px', height: '14px', color: '#8F9CAE' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>INTEGRATION TERMINAL</span>
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#00FF66',
                height: '100px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {terminalOutput.map((out, idx) => (
                  <div key={idx} style={{ color: out.startsWith('✓') || out.includes('PASS') ? '#00FF66' : out.includes('FAIL') || out.includes('CRITICAL') ? '#FF6E6E' : out.startsWith('>') ? '#00F0FF' : '#8F9CAE' }}>
                    {out}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
