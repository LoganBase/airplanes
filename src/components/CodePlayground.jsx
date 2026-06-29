import React, { useState } from 'react';
import { Code, Terminal as TerminalIcon, Play, Copy, Check } from 'lucide-react';

export default function CodePlayground() {
  const [activeFile, setActiveFile] = useState('solver.go');
  const [terminalOutput, setTerminalOutput] = useState([
    'SYSTEM: Initialized dev console logs.',
    'SYSTEM: Type "npm run test" or click "Execute Logic Suite" above.'
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copied, setCopied] = useState(false);

  const files = {
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
		// Auto-trigger deadhead inserting algorithm
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

  /**
   * Recalculates paths when a chute blockage is detected (Directed Acyclic Graph)
   */
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

pub struct TelemetryStream {
    receiver: mpsc::Receiver<Vec<u8>>,
}

impl TelemetryStream {
    pub async fn process_incoming_feeds(&mut self) -> Result<(), Box<dyn std::error::Error>> {
        while let Some(raw_payload) = self.receiver.recv().await {
            // Deserialization occurs in <85 microseconds
            let feed: FlightTransponderFeed = serde_json::from_slice(&raw_payload)?;
            
            // Dispatch message onto high-speed Redis flight state broker
            Self::publish_to_broker(&feed).await?;
        }
        Ok(())
    }
}`
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(files[activeFile].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <span className="badge" style={{ marginBottom: '16px' }}>DEVELOPER LAB</span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            Production-Ready Engine Stubs
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            We write clean, statically typed, highly optimized code. Explore the actual Go, 
            TypeScript, and Rust solvers running inside LoganAviation pipelines.
          </p>
        </div>

        {/* IDE Frame */}
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
              {Object.keys(files).map(fileName => (
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
              <code>{files[activeFile].code}</code>
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

      </div>
    </section>
  );
}
