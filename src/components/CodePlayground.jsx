import React, { useState } from 'react';
import { Code, Terminal as TerminalIcon, Play, Copy, Check } from 'lucide-react';

export default function CodePlayground({ designMode }) {
  const [activeFile, setActiveFile] = useState('solver.go');
  const [terminalOutput, setTerminalOutput] = useState([
    'SYSTEM: Initialized dev console logs.',
    'SYSTEM: Type "npm run test" or click "Execute Logic Suite" above.'
  ]);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cinematic file templates
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

  // Executive file templates
  const executiveFiles = {
    'api-spec.yaml': {
      lang: 'yaml',
      code: `openapi: 3.0.3
info:
  title: Amach LoganAviation Integration API
  version: 4.1.0-enterprise
  description: Secure, high-throughput REST endpoints for Flight Operations
paths:
  /api/v4/crew/solve-csp:
    post:
      summary: Optimize crew pairings subject to EASA FTL / FAA constraints
      security:
        - OAuth2Bearer: [write:scheduling]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CSPRequest'
      responses:
        '200':
          description: Feasible pairing solution optimized for yield
  /api/v4/telemetry/transponder:
    get:
      summary: Stream active aircraft telemetry (Server-Sent Events)
      responses:
        '200':
          description: Real-time transponder coordinates`
    },
    'schema.sql': {
      lang: 'sql',
      code: `-- database/schema.sql
-- High-performance relational schema for flight operations audit

CREATE TABLE flights (
    flight_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    iata_code VARCHAR(8) NOT NULL,
    origin_airport CHAR(3) NOT NULL,
    destination_airport CHAR(3) NOT NULL,
    scheduled_departure TIMESTAMPTZ NOT NULL,
    scheduled_arrival TIMESTAMPTZ NOT NULL,
    aircraft_registration VARCHAR(10) NOT NULL
);

CREATE TABLE crew_pairings (
    pairing_id SERIAL PRIMARY KEY,
    flight_uuid UUID REFERENCES flights(flight_uuid),
    crew_member_id VARCHAR(16) NOT NULL,
    duty_start_time TIMESTAMPTZ NOT NULL,
    duty_end_time TIMESTAMPTZ NOT NULL,
    faa_compliance_flag BOOLEAN DEFAULT TRUE,
    last_modified TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);`
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

  const selectedFiles = designMode === 'executive' ? executiveFiles : cinematicFiles;

  // Sync active file on mode change
  React.useEffect(() => {
    const fileKeys = Object.keys(selectedFiles);
    if (!fileKeys.includes(activeFile)) {
      setActiveFile(fileKeys[0]);
    }
  }, [designMode]);

  const copyToClipboard = () => {
    const activeData = selectedFiles[activeFile];
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
      `> EXECUTING: compliance verify on "${activeFile}"`,
      'Loading schemas and validating specs...',
    ]);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        '✓ Structural syntax checked in 120ms.',
        'Verifying schema constraints...'
      ]);
    }, 1000);

    setTimeout(() => {
      setTerminalOutput(prev => [
        ...prev,
        'PASS  schema/strict_types (OpenAPI 3.0.3 verified)',
        'PASS  schema/foreign_keys (Integrity check passed)',
        '✓ ALL VERIFICATIONS PASSED. Operational compliance 100%.',
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
            {designMode === 'executive' ? 'INTEGRATION ENGINE SPECS' : 'DEVELOPER LAB'}
          </span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            {designMode === 'executive' ? 'System Schema & API Definitions' : 'Production-Ready Engine Stubs'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {designMode === 'executive'
              ? 'Review the OpenAPI 3.0.3 endpoints and PostgreSQL relational definitions used to integrate our decision models into legacy airline hosts.'
              : 'We write clean, statically typed, highly optimized code. Explore the actual Go, TypeScript, and Rust solvers running inside LoganAviation pipelines.'}
          </p>
        </div>

        {/* IDE Frame */}
        <div style={{
          background: '#040508',
          border: designMode === 'executive' ? '1px solid rgba(30, 64, 175, 0.25)' : '1px solid rgba(46, 107, 255, 0.15)',
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
              {Object.keys(selectedFiles).map(fileName => (
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
                  <Code style={{ width: '12px', height: '12px', color: designMode === 'executive' ? '#10B981' : '#2E6BFF' }} />
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
                  background: designMode === 'executive' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0, 240, 255, 0.1)',
                  border: designMode === 'executive' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(0, 240, 255, 0.2)',
                  color: designMode === 'executive' ? '#10B981' : '#00F0FF',
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
                <span>{designMode === 'executive' ? 'Verify Integration Specs' : 'Execute Logic Suite'}</span>
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
              <code>{selectedFiles[activeFile] ? selectedFiles[activeFile].code : ''}</code>
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
