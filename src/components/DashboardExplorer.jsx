import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, Wind, Briefcase, RefreshCw, CheckCircle, Database, ShieldAlert, Award } from 'lucide-react';

export default function DashboardExplorer({ designMode }) {
  const [activeTab, setActiveTab] = useState('crew');

  // CSP Crew scheduler state
  const [qolWeight, setQolWeight] = useState(50);
  const pairingsCalculated = Math.floor(10000 + (qolWeight * 182));
  const deadheadsSaved = Math.max(5, Math.floor(45 - (qolWeight * 0.35)));
  const bufferStability = Math.floor(65 + (qolWeight * 0.3));
  const costDelta = ((qolWeight - 50) * 0.08).toFixed(2);

  // IROPs State
  const [disruptions, setDisruptions] = useState([
    { id: 'LH-402', origin: 'MUC', dest: 'JFK', status: 'On Time', crew: 'Assigned', bags: 'Routed' },
    { id: 'BA-117', origin: 'LHR', dest: 'LAX', status: 'On Time', crew: 'Assigned', bags: 'Routed' },
    { id: 'EI-108', origin: 'DUB', dest: 'SFO', status: 'On Time', crew: 'Assigned', bags: 'Routed' },
    { id: 'AF-291', origin: 'CDG', dest: 'DXB', status: 'On Time', crew: 'Assigned', bags: 'Routed' },
  ]);
  const [logs, setLogs] = useState([
    { time: '12:04:12', msg: 'System monitoring 1,842 active transponder feeds.' },
    { time: '12:05:00', msg: 'Optimizer solved CSP pairings for shift segment D-4.' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // ML Fuel State
  const [fuelRoute, setFuelRoute] = useState('DUB-JFK');
  const [altitude, setAltitude] = useState(36000);
  const [windSpeed, setWindSpeed] = useState(45);
  const [payloadWeight, setPayloadWeight] = useState(82);
  
  const optimalAlt = fuelRoute === 'DUB-JFK' ? 38000 : 39000;
  const fuelSavedPercentage = (
    8.2 + 
    ((optimalAlt - altitude) * 0.0005) + 
    (windSpeed > 30 ? (windSpeed - 30) * 0.03 : 0) -
    ((payloadWeight - 80) * 0.05)
  ).toFixed(2);

  // Baggage State
  const [bagStatus, setBagStatus] = useState('normal');
  const [sortedCount, setSortedCount] = useState(8235);
  const [queueDelay, setQueueDelay] = useState(1.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setSortedCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerIropSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    
    setDisruptions(prev => prev.map(d => d.id === 'LH-402' ? { ...d, status: 'DELAYED (+90m)', crew: 'Conflict', bags: 'Hold' } : d));
    setLogs(prev => [
      { time: new Date().toTimeString().split(' ')[0], msg: 'CRITICAL: Munich departure LH-402 delayed due to ATC restrictions.' },
      ...prev
    ]);

    setTimeout(() => {
      setLogs(prev => [
        { time: new Date().toTimeString().split(' ')[0], msg: 'RESOLVER: Fetching backup flight deck crew from Reserve Pool A.' },
        ...prev
      ]);
    }, 1500);

    setTimeout(() => {
      setDisruptions(prev => prev.map(d => d.id === 'LH-402' ? { ...d, status: 'RE-SCHEDULED', crew: 'Backup Assigned', bags: 'Re-routed (SQR)' } : d));
      setLogs(prev => [
        { time: new Date().toTimeString().split(' ')[0], msg: 'SUCCESS: Restructured pairing sequence. Operational cost minimized.' },
        ...prev
      ]);
      setIsSimulating(false);
    }, 3200);
  };

  const triggerBaggageJam = () => {
    setBagStatus('jammed');
    setQueueDelay(18.5);
    setLogs(prev => [
      { time: new Date().toTimeString().split(' ')[0], msg: 'WARNING: Chute 14B High-Throughput Diverter detected blockage.' },
      ...prev
    ]);

    setTimeout(() => {
      setLogs(prev => [
        { time: new Date().toTimeString().split(' ')[0], msg: 'DYNAMIC ROUTING: Rerouting sorting queue to backup Chute 15A.' },
        ...prev
      ]);
    }, 1200);

    setTimeout(() => {
      setBagStatus('resolved');
      setQueueDelay(3.2);
      setLogs(prev => [
        { time: new Date().toTimeString().split(' ')[0], msg: 'RESOLVED: Queue cleared. Diverter returns to neutral.' },
        ...prev
      ]);
    }, 3000);
  };

  return (
    <section id="solutions" style={{
      padding: '100px 0',
      background: 'linear-gradient(to bottom, #05050A, #0B0C14)',
      borderTop: '1px solid rgba(46, 107, 255, 0.08)',
      position: 'relative',
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 60px auto' }}>
          <div className="badge" style={{ marginBottom: '16px' }}>
            <span>{designMode === 'executive' ? 'COMPLIANCE & YIELD CONTROLLER' : 'Aviation Core Logic'}</span>
          </div>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            {designMode === 'executive' ? 'Flight Operations Audit Panel' : 'Flight Operations Logic Explorer'}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {designMode === 'executive' 
              ? 'Evaluate technical solutions mapped against strict FAA 14 CFR Part 117 / EASA regulatory frameworks. Inspect solver efficiency and real-time yield optimization metrics below.'
              : 'Interact with our simulated core engines below. See how LOGANAIR solves safety-critical problems, reduces operational friction, and maximizes airline profitability in real-time.'}
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel" style={{
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: designMode === 'executive' ? '1px solid rgba(30, 64, 175, 0.25)' : '1px solid rgba(46, 107, 255, 0.15)',
        }}>
          {/* Header Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            background: 'rgba(10, 12, 22, 0.9)',
            borderBottom: '1px solid rgba(46, 107, 255, 0.12)',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: designMode === 'executive' ? '#10B981' : '#00F0FF', boxShadow: designMode === 'executive' ? '0 0 10px #10B981' : '0 0 10px #00F0FF' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FFF', fontWeight: 600, letterSpacing: '0.05em' }}>
                {designMode === 'executive' ? 'AUDIT::LOGANAIR_DECISION_ENGINE' : 'LOGAN-CORE-OPTIMIZER // ACTIVE_SESSION'}
              </span>
            </div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px' }}>
              <button 
                onClick={() => setActiveTab('crew')} 
                className={`tab-btn ${activeTab === 'crew' ? 'active' : ''}`}
              >
                <Users style={{ width: '14px', height: '14px' }} />
                <span>{designMode === 'executive' ? 'Crew FTL Solver' : 'Crew Rostering (CSP)'}</span>
              </button>
              <button 
                onClick={() => setActiveTab('irops')} 
                className={`tab-btn ${activeTab === 'irops' ? 'active' : ''}`}
              >
                <AlertTriangle style={{ width: '14px', height: '14px' }} />
                <span>{designMode === 'executive' ? 'IROPs Yield Recovery' : 'Disruption IROPs'}</span>
              </button>
              <button 
                onClick={() => setActiveTab('fuel')} 
                className={`tab-btn ${activeTab === 'fuel' ? 'active' : ''}`}
              >
                <Wind style={{ width: '14px', height: '14px' }} />
                <span>{designMode === 'executive' ? 'ML Fuel Drag Engine' : 'ML Fuel Optimizer'}</span>
              </button>
              <button 
                onClick={() => setActiveTab('bags')} 
                className={`tab-btn ${activeTab === 'bags' ? 'active' : ''}`}
              >
                <Briefcase style={{ width: '14px', height: '14px' }} />
                <span>{designMode === 'executive' ? 'IATA 753 Telemetry' : 'Baggage Telemetry'}</span>
              </button>
            </div>
          </div>

          {/* Core Panel Content */}
          <div style={{ display: 'flex', minHeight: '440px', flexWrap: 'wrap' }}>
            {/* Left Interactive Playground (70%) */}
            <div style={{ flex: '2 1 500px', padding: '32px', borderRight: '1px solid rgba(46, 107, 255, 0.08)' }}>
              
              {/* Tab 1: Crew Rostering */}
              {activeTab === 'crew' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#FFF' }}>
                      {designMode === 'executive' ? 'Regulatory Compliance & Crew Scheduling Solver' : 'Dynamic Crew Pairing Optimization'}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {designMode === 'executive'
                        ? 'Enforces FAA 14 CFR Part 117 / EASA FTL block time bounds (max 100 block-hours/month) while using heuristic backtracking to allocate reserve standbys.'
                        : 'Adjust the balance slider between Profit Optimization (tight scheduling) and Crew Well-being (flexible buffers) to solve the Constraint Satisfaction Problem.'}
                    </p>
                  </div>

                  {designMode === 'executive' ? (
                    /* Executive Mode Data Tables */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div style={{ background: 'rgba(30, 64, 175, 0.05)', border: '1px solid rgba(30,64,175,0.15)', padding: '16px', borderRadius: '8px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>REGULATORY AUDIT</span>
                          <div style={{ fontSize: '15px', color: '#FFF', fontWeight: 600, marginTop: '4px' }}>FAA Part 117 Compliant</div>
                        </div>
                        <div style={{ background: 'rgba(30, 64, 175, 0.05)', border: '1px solid rgba(30,64,175,0.15)', padding: '16px', borderRadius: '8px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>SOLVE COMPLEXITY</span>
                          <div style={{ fontSize: '15px', color: '#FFF', fontWeight: 600, marginTop: '4px' }}>O(N log N) Graph Redux</div>
                        </div>
                        <div style={{ background: 'rgba(30, 64, 175, 0.05)', border: '1px solid rgba(30,64,175,0.15)', padding: '16px', borderRadius: '8px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PAIRING RELIABILITY</span>
                          <div style={{ fontSize: '15px', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>99.92% Validated</div>
                        </div>
                      </div>

                      {/* Comparison Table */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PERFORMANCE MATRIX: MANUAL DISPATCH VS. LOGANAIR ENGINE</span>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '10px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)' }}>
                          <span>METRIC</span>
                          <span>MANUAL SCHEDULING</span>
                          <span>LOGANAIR SOLVER</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '10px 16px', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <span>Overtime Flight Legs Allocated</span>
                          <span style={{ color: '#FF6E6E' }}>14.2%</span>
                          <span style={{ color: '#10B981', fontWeight: 600 }}>0.0% (Zero Violations)</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '10px 16px', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <span>Constraint Pairing Calculate Time</span>
                          <span>5.8 Hours</span>
                          <span style={{ color: '#10B981', fontWeight: 600 }}>1.4 Seconds</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '10px 16px', fontSize: '13px' }}>
                          <span>Crew Quality of Life (QoL) Index</span>
                          <span>62.4%</span>
                          <span style={{ color: '#10B981', fontWeight: 600 }}>96.8% Optimized</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Cinematic Slider interface */
                    <>
                      <div style={{ background: 'rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(46, 107, 255, 0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
                          <span style={{ color: '#FF6E6E' }}>MAX PROFITABILITY</span>
                          <span style={{ color: '#00F0FF' }}>BALANCED MODEL</span>
                          <span style={{ color: '#00FF66' }}>MAX CREW COMFORT</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={qolWeight}
                          onChange={(e) => setQolWeight(parseInt(e.target.value))}
                          style={{ width: '100%', height: '6px', background: '#1A1D36', borderRadius: '3px', outline: 'none', cursor: 'pointer', accentColor: '#2E6BFF' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <span>0% QoL weight</span>
                          <span>Current Weight: {qolWeight}%</span>
                          <span>100% QoL weight</span>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                        <div className="telemetry-card">
                          <span className="telemetry-label">Feasible Pairings</span>
                          <span className="telemetry-value" style={{ color: '#FFF' }}>{pairingsCalculated.toLocaleString()}</span>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-label">Deadheads Saved</span>
                          <span className="telemetry-value" style={{ color: '#00F0FF' }}>{deadheadsSaved} legs/day</span>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-label">Buffer Stability</span>
                          <span className="telemetry-value" style={{ color: '#00FF66' }}>{bufferStability}%</span>
                        </div>
                        <div className="telemetry-card">
                          <span className="telemetry-label">Est. Cost Delta</span>
                          <span className="telemetry-value" style={{ color: parseFloat(costDelta) >= 0 ? '#00FF66' : '#FF6E6E' }}>
                            {costDelta >= 0 ? `+${costDelta}%` : `${costDelta}%`}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Tab 2: Disruption IROPs */}
              {activeTab === 'irops' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>
                        {designMode === 'executive' ? 'Financial Recovery during Irregular Operations (IROPs)' : 'Real-time Delay & Disruption Mitigation'}
                      </h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {designMode === 'executive'
                          ? 'Minimizes block-time delays, hotel routing logistics, and alternative segment passenger compensation during flight cancellations.'
                          : 'Trigger a severe delay to simulate how LOGANAIR\'s event-driven scheduler reroutes crew, aircraft, and bags instantly.'}
                      </p>
                    </div>
                    <button 
                      onClick={triggerIropSim} 
                      disabled={isSimulating}
                      className="btn-primary" 
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        background: designMode === 'executive' ? '#1E40AF' : 'linear-gradient(135deg, #FF6E6E, #D32F2F)',
                        boxShadow: 'none'
                      }}
                    >
                      <RefreshCw style={{ width: '12px', height: '12px', animation: isSimulating ? 'spin 1.5s linear infinite' : 'none' }} />
                      <span>{isSimulating ? 'Recalculating Recovery...' : 'Execute Recovery Simulation'}</span>
                    </button>
                  </div>

                  {/* Flight Board Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr 1fr 1fr', padding: '10px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)' }}>
                      <span>FLIGHT</span>
                      <span>ORIGIN</span>
                      <span>DEST</span>
                      <span>STATUS</span>
                      <span>{designMode === 'executive' ? 'FINANCIAL IMPACT' : 'CREW LINK'}</span>
                      <span>BAGGAGE</span>
                    </div>

                    {disruptions.map(f => (
                      <div key={f.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '1.2fr 1fr 1fr 1.5fr 1fr 1fr',
                        padding: '12px 16px',
                        background: 'rgba(14, 16, 29, 0.4)',
                        border: '1px solid rgba(46, 107, 255, 0.05)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)',
                        color: '#FFF',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}>
                        <span style={{ fontWeight: 700, color: '#2E6BFF' }}>{f.id}</span>
                        <span>{f.origin}</span>
                        <span>{f.dest}</span>
                        <span style={{ 
                          color: f.status.includes('DELAY') ? '#FF6E6E' : f.status.includes('RE-SCHED') ? '#10B981' : '#8F9CAE',
                          fontWeight: f.status !== 'On Time' ? '600' : 'normal'
                        }}>
                          {f.status}
                        </span>
                        <span style={{ color: f.crew === 'Conflict' ? '#FF6E6E' : '#8F9CAE' }}>
                          {designMode === 'executive'
                            ? (f.status.includes('DELAY') ? '$8,400/hr' : '$0 Saved')
                            : f.crew}
                        </span>
                        <span>{f.bags}</span>
                      </div>
                    ))}
                  </div>

                  {designMode === 'executive' && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '12px',
                      padding: '16px',
                      background: 'rgba(16, 185, 129, 0.05)',
                      border: '1px solid rgba(16, 185, 129, 0.15)',
                      borderRadius: '8px'
                    }}>
                      <div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>AVERAGE SAVINGS</div>
                        <div style={{ fontSize: '18px', color: '#10B981', fontWeight: 700 }}>$148,200 / IROP Event</div>
                      </div>
                      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '16px' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>CONGESTION PENALTY</div>
                        <div style={{ fontSize: '18px', color: '#FFF', fontWeight: 700 }}>-76% Rerouting Fees</div>
                      </div>
                      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '16px' }}>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PASSENGER COMP</div>
                        <div style={{ fontSize: '18px', color: '#FFF', fontWeight: 700 }}>-92% Delay Claims</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Fuel Optimizer */}
              {activeTab === 'fuel' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>
                      {designMode === 'executive' ? 'Machine Learning Fuel Ingestion & Regression Analysis' : 'Fuel Burn Optimization Engine'}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {designMode === 'executive'
                        ? 'Analyzes historical flight data and weather forecasts using random forest regressors to compute optimal, variable altitudes ($H$) reducing drag factors.'
                        : 'Adjust flight parameters (Altitude and Headwind velocity) to evaluate flight envelope optimizations calculated by our machine learning models.'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>FLIGHT PROFILE CORRIDOR</span>
                        <select value={fuelRoute} onChange={(e) => setFuelRoute(e.target.value)} className="dashboard-select">
                          <option value="DUB-JFK">DUB ➔ JFK (B789 Cruise profile)</option>
                          <option value="LHR-DXB">LHR ➔ DXB (A359 Cruise profile)</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          <span>BAROMETRIC ALTITUDE</span>
                          <span style={{ color: '#FFF' }}>{altitude.toLocaleString()} FT</span>
                        </span>
                        <input type="range" min="30000" max="41000" step="1000" value={altitude} onChange={(e) => setAltitude(parseInt(e.target.value))} style={{ accentColor: '#10B981' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          <span>WIND DRIFT VECTOR</span>
                          <span style={{ color: '#FFF' }}>{windSpeed} KTS</span>
                        </span>
                        <input type="range" min="0" max="120" value={windSpeed} onChange={(e) => setWindSpeed(parseInt(e.target.value))} style={{ accentColor: '#10B981' }} />
                      </div>
                    </div>

                    {/* Output */}
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.03)',
                      border: '1px solid rgba(16, 185, 129, 0.12)',
                      borderRadius: '10px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '8px'
                    }}>
                      <Wind style={{ width: '32px', height: '32px', color: '#10B981', filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.2))' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                        VERIFIABLE FUEL BURN REDUCTION
                      </span>
                      <span style={{ fontSize: '42px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                        -{fuelSavedPercentage}%
                      </span>
                      <span style={{ fontSize: '12px', color: '#8F9CAE', maxWidth: '220px' }}>
                        Saves approx. **{((fuelRoute === 'DUB-JFK' ? 2400 : 1800) * parseFloat(fuelSavedPercentage) / 100).toFixed(0)} kg** of Jet-A fuel. Equates to **{(parseFloat(fuelSavedPercentage) * 3.15).toFixed(1)} tons of CO2 offset** per segment.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Baggage Telemetry */}
              {activeTab === 'bags' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>
                      {designMode === 'executive' ? 'IATA Resolution 753 Baggage Ingestion Audit' : 'Sortation Chute Throughput'}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      {designMode === 'executive'
                        ? 'Validates dynamic tracking at critical custody handovers: Check-in, Aircraft Loading, Transfers, and Passenger Carousel arrival.'
                        : 'Monitor baggage conveyor sorting rates. Trigger a simulated chute blockage to test automatic dynamic rerouting.'}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div className="telemetry-card" style={{ borderLeft: '3px solid #10B981' }}>
                      <span className="telemetry-label">IATA Tracking Compliance</span>
                      <span className="telemetry-value" style={{ color: '#FFF' }}>100.00% Verified</span>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-label">Ingest Conveyor Load</span>
                      <span className="telemetry-value" style={{ color: '#FFF' }}>14,240 bags/hr</span>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-label">Misrouted Baggage Rate</span>
                      <span className="telemetry-value" style={{ color: '#10B981' }}>&lt; 0.003% (Target: 0.01%)</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#10B981', background: 'rgba(16, 185, 129, 0.03)', padding: '10px 16px', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <Award style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                    <span>Meets all digital telemetry directives for civil aviation baggage safety compliance audits.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right Real-time Engine Log Console (30%) */}
            <div style={{ flex: '1 1 250px', padding: '32px', background: 'rgba(5, 5, 10, 0.4)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database style={{ width: '16px', height: '16px', color: designMode === 'executive' ? '#10B981' : '#00F0FF' }} />
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#FFF', letterSpacing: '0.05em' }}>
                  {designMode === 'executive' ? 'AUDIT LOG FEED' : 'SYSTEM LOG STREAM'}
                </span>
              </div>

              {/* Logs */}
              <div style={{
                flex: 1,
                background: '#040508',
                borderRadius: '8px',
                border: '1px solid rgba(46, 107, 255, 0.08)',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
                overflowY: 'auto',
                maxHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                textAlign: 'left'
              }}>
                {logs.map((log, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                    <span style={{ color: designMode === 'executive' ? '#10B981' : '#2E6BFF', marginRight: '6px' }}>[{log.time}]</span>
                    <span>{log.msg}</span>
                  </div>
                ))}
              </div>

              {/* Console status */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '6px',
                border: '1px solid rgba(46, 107, 255, 0.05)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)'
              }}>
                <span style={{ color: 'var(--text-muted)' }}>INTEGRITY INDEX:</span>
                <span style={{ color: '#00FF66', fontWeight: 600 }}>99.98% SECURE</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 6px;
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          color: #FFF;
          background: rgba(255, 255, 255, 0.03);
        }
        .tab-btn.active {
          color: #FFF;
          background: rgba(46, 107, 255, 0.15);
          box-shadow: 0 2px 8px rgba(46, 107, 255, 0.15);
        }
        .executive-mode .tab-btn.active {
          background: rgba(30, 64, 175, 0.35);
          box-shadow: 0 2px 8px rgba(30, 64, 175, 0.2);
        }
        .telemetry-card {
          background: rgba(14, 16, 29, 0.5);
          border: 1px solid rgba(46, 107, 255, 0.08);
          padding: 16px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .telemetry-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .telemetry-value {
          font-size: 18px;
          font-weight: 700;
        }
        .dashboard-select {
          background: #0E101D;
          border: 1px solid rgba(46, 107, 255, 0.15);
          color: #FFF;
          padding: 10px;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          cursor: pointer;
        }
        .dashboard-select:focus {
          border-color: #00F0FF;
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

