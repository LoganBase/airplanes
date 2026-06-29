import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, Wind, Briefcase, RefreshCw, CheckCircle, Database } from 'lucide-react';

export default function DashboardExplorer() {
  const [activeTab, setActiveTab] = useState('crew');

  // CSP Crew scheduler state
  const [qolWeight, setQolWeight] = useState(50); // 0 = Max Profit, 100 = Max Crew QoL
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
  const [windSpeed, setWindSpeed] = useState(45); // knots
  const [payloadWeight, setPayloadWeight] = useState(82); // tons
  
  // Calculate recommended fuel savings
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
    // Increment sorted bags randomly
    const interval = setInterval(() => {
      setSortedCount(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerIropSim = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    
    // Step 1: Delays LH-402
    setDisruptions(prev => prev.map(d => d.id === 'LH-402' ? { ...d, status: 'DELAYED (+90m)', crew: 'Conflict', bags: 'Hold' } : d));
    setLogs(prev => [
      { time: new Date().toTimeString().split(' ')[0], msg: 'CRITICAL: Munich departure LH-402 delayed due to ATC restrictions.' },
      ...prev
    ]);

    // Step 2: Auto Resolver triggers
    setTimeout(() => {
      setLogs(prev => [
        { time: new Date().toTimeString().split(' ')[0], msg: 'RESOLVER: Fetching backup flight deck crew from Reserve Pool A.' },
        ...prev
      ]);
    }, 1500);

    // Step 3: Resolves
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
            <span>Aviation Core Logic</span>
          </div>
          <h2 style={{ fontSize: '38px', marginBottom: '16px' }}>
            Flight Operations Logic Explorer
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Interact with our simulated core engines below. See how Amach solves safety-critical 
            problems, reduces operational friction, and maximizes airline profitability in real-time.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="glass-panel" style={{
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(46, 107, 255, 0.15)',
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
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }}></div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#FFF', fontWeight: 600, letterSpacing: '0.05em' }}>
                LOGAN-CORE-OPTIMIZER // ACTIVE_SESSION
              </span>
            </div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px' }}>
              <button 
                onClick={() => setActiveTab('crew')} 
                className={`tab-btn ${activeTab === 'crew' ? 'active' : ''}`}
              >
                <Users style={{ width: '14px', height: '14px' }} />
                <span>Crew Rostering (CSP)</span>
              </button>
              <button 
                onClick={() => setActiveTab('irops')} 
                className={`tab-btn ${activeTab === 'irops' ? 'active' : ''}`}
              >
                <AlertTriangle style={{ width: '14px', height: '14px' }} />
                <span>Disruption IROPs</span>
              </button>
              <button 
                onClick={() => setActiveTab('fuel')} 
                className={`tab-btn ${activeTab === 'fuel' ? 'active' : ''}`}
              >
                <Wind style={{ width: '14px', height: '14px' }} />
                <span>ML Fuel Optimizer</span>
              </button>
              <button 
                onClick={() => setActiveTab('bags')} 
                className={`tab-btn ${activeTab === 'bags' ? 'active' : ''}`}
              >
                <Briefcase style={{ width: '14px', height: '14px' }} />
                <span>Baggage Telemetry</span>
              </button>
            </div>
          </div>

          {/* Core Panel Content */}
          <div style={{ display: 'flex', minHeight: '440px', flexWrap: 'wrap' }}>
            {/* Left Interactive Playground (70%) */}
            <div style={{ flex: '2 1 500px', padding: '32px', borderRight: '1px solid rgba(46, 107, 255, 0.08)' }}>
              
              {/* Tab 1: Crew Rostering */}
              {activeTab === 'crew' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#FFF' }}>Dynamic Crew Pairing Optimization</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      Adjust the balance slider between **Profit Optimization** (tight scheduling) and **Crew Well-being** (flexible buffers) to solve the Constraint Satisfaction Problem.
                    </p>
                  </div>

                  {/* Slider Control */}
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
                      style={{
                        width: '100%',
                        height: '6px',
                        background: '#1A1D36',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: 'pointer',
                        accentColor: '#2E6BFF'
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span>0% QoL weight</span>
                      <span>Current Weight: {qolWeight}%</span>
                      <span>100% QoL weight</span>
                    </div>
                  </div>

                  {/* Mathematical Outputs */}
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

                  {/* Visual Node Representation */}
                  <div style={{ display: 'flex', gap: '6px', height: '30px', alignItems: 'center', background: 'rgba(0,0,0,0.1)', padding: '0 12px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PAIRING CHAINS:</span>
                    {Array.from({ length: 12 }).map((_, idx) => {
                      const isActive = idx < Math.floor(qolWeight / 8.5) + 2;
                      return (
                        <div key={idx} style={{
                          flex: 1,
                          height: '6px',
                          background: isActive ? 'linear-gradient(90deg, #2E6BFF, #00F0FF)' : '#1A1D36',
                          borderRadius: '3px',
                          boxShadow: isActive ? '0 0 6px rgba(0, 240, 255, 0.4)' : 'none',
                          transition: 'all 0.3s ease'
                        }} />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Disruption IROPs */}
              {activeTab === 'irops' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>Real-time Delay & Disruption Mitigation</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Trigger a severe delay to simulate how Amach's event-driven scheduler reroutes crew, aircraft, and bags instantly.
                      </p>
                    </div>
                    <button 
                      onClick={triggerIropSim} 
                      disabled={isSimulating}
                      className="btn-primary" 
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        background: isSimulating ? '#1A1D36' : 'linear-gradient(135deg, #FF6E6E, #D32F2F)',
                        boxShadow: isSimulating ? 'none' : '0 4px 12px rgba(255, 110, 110, 0.2)',
                        cursor: isSimulating ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <RefreshCw style={{ width: '12px', height: '12px', animation: isSimulating ? 'spin 1.5s linear infinite' : 'none' }} />
                      <span>{isSimulating ? 'Resolving Conflict...' : 'Simulate Munich Delay'}</span>
                    </button>
                  </div>

                  {/* Flight Board Grid */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr 1fr 1fr', padding: '10px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)' }}>
                      <span>FLIGHT</span>
                      <span>ORIGIN</span>
                      <span>DEST</span>
                      <span>STATUS</span>
                      <span>CREW LINK</span>
                      <span>BAGGAGE</span>
                    </div>

                    {disruptions.map(f => (
                      <div key={f.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr 1.5fr 1fr 1fr',
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
                          color: f.status.includes('DELAY') ? '#FF6E6E' : f.status.includes('RE-SCHED') ? '#00FF66' : '#8F9CAE',
                          fontWeight: f.status !== 'On Time' ? '600' : 'normal'
                        }}>
                          {f.status}
                        </span>
                        <span style={{ color: f.crew === 'Conflict' ? '#FF6E6E' : '#8F9CAE' }}>{f.crew}</span>
                        <span>{f.bags}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#00F0FF', background: 'rgba(0, 240, 255, 0.03)', padding: '10px 16px', borderRadius: '6px', border: '1px solid rgba(0, 240, 255, 0.1)' }}>
                    <CheckCircle style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                    <span>Estimated disruption passenger recovery time reduced from 6 hours to 18 minutes.</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Fuel Optimizer */}
              {activeTab === 'fuel' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>Fuel Burn Optimization Engine</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      Adjust flight parameters (Altitude and Headwind velocity) to evaluate flight envelope optimizations calculated by our machine learning models.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {/* Route Selection */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ROUTE SELECTION</span>
                        <select 
                          value={fuelRoute} 
                          onChange={(e) => setFuelRoute(e.target.value)}
                          className="dashboard-select"
                        >
                          <option value="DUB-JFK">DUB ➔ JFK (Transatlantic)</option>
                          <option value="LHR-DXB">LHR ➔ DXB (Middle East)</option>
                        </select>
                      </div>

                      {/* Altitude Slider */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          <span>CRUISE ALTITUDE</span>
                          <span style={{ color: '#FFF' }}>{altitude.toLocaleString()} FT</span>
                        </span>
                        <input 
                          type="range" 
                          min="30000" 
                          max="41000" 
                          step="1000"
                          value={altitude} 
                          onChange={(e) => setAltitude(parseInt(e.target.value))}
                          style={{ accentColor: '#00F0FF' }}
                        />
                      </div>

                      {/* Wind Speed Slider */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          <span>HEADWIND VELOCITY</span>
                          <span style={{ color: '#FFF' }}>{windSpeed} KTS</span>
                        </span>
                        <input 
                          type="range" 
                          min="0" 
                          max="120" 
                          value={windSpeed} 
                          onChange={(e) => setWindSpeed(parseInt(e.target.value))}
                          style={{ accentColor: '#00F0FF' }}
                        />
                      </div>
                    </div>

                    {/* Output display */}
                    <div style={{
                      background: 'rgba(46, 107, 255, 0.03)',
                      border: '1px solid rgba(46, 107, 255, 0.1)',
                      borderRadius: '10px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '8px'
                    }}>
                      <Wind style={{ width: '32px', height: '32px', color: '#00F0FF', filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.3))' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                        OPTIMAL CRUISE FUEL BURNOUT REDUCTION
                      </span>
                      <span style={{ fontSize: '42px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-display)', lineHeight: 1.1 }}>
                        -{fuelSavedPercentage}%
                      </span>
                      <span style={{ fontSize: '12px', color: '#8F9CAE', maxWidth: '200px' }}>
                        Saving approx. **{((fuelRoute === 'DUB-JFK' ? 2400 : 1800) * parseFloat(fuelSavedPercentage) / 100).toFixed(0)} kg** of Jet-A fuel per trip segment.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Baggage Telemetry */}
              {activeTab === 'bags' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', color: '#FFF', marginBottom: '8px' }}>Sortation Chute Throughput</h3>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Monitor baggage conveyor sorting rates. Trigger a simulated chute blockage to test automatic dynamic rerouting.
                      </p>
                    </div>
                    <button 
                      onClick={triggerBaggageJam} 
                      disabled={bagStatus === 'jammed'}
                      className="btn-secondary" 
                      style={{ fontSize: '12px', padding: '8px 16px' }}
                    >
                      Inject Blockage
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div className="telemetry-card" style={{ borderLeft: bagStatus === 'jammed' ? '3px solid #FF6E6E' : '3px solid #00F0FF' }}>
                      <span className="telemetry-label">Conveyor Sorting Velocity</span>
                      <span className="telemetry-value" style={{ color: '#FFF' }}>
                        {bagStatus === 'jammed' ? '0.4 m/s' : '3.8 m/s'}
                      </span>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-label">Cumulative Sorted (Shift)</span>
                      <span className="telemetry-value" style={{ color: '#FFF' }}>{sortedCount} bags</span>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-label">System Queue Delay</span>
                      <span className="telemetry-value" style={{ color: queueDelay > 5 ? '#FF6E6E' : '#00FF66' }}>
                        {queueDelay}s
                      </span>
                    </div>
                  </div>

                  {/* SVG Flow Map */}
                  <div style={{ height: '100px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(46, 107, 255, 0.05)' }}>
                    <div style={{ position: 'absolute', top: '15px', left: '20px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      CHUTE 14A (NORTH FEED)
                    </div>
                    {/* SVG animation representing conveyor speed */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                      <path d="M 50 50 L 300 50 L 500 80 L 800 80" fill="none" stroke="rgba(46, 107, 255, 0.15)" strokeWidth="4" />
                      <path 
                        d="M 50 50 L 300 50 L 500 80 L 800 80" 
                        fill="none" 
                        stroke="#00F0FF" 
                        strokeWidth="4" 
                        strokeDasharray="20 40"
                        style={{
                          animation: bagStatus === 'jammed' ? 'none' : 'dash 1.8s linear infinite',
                          stroke: bagStatus === 'jammed' ? '#FF6E6E' : '#00F0FF'
                        }}
                      />
                    </svg>
                  </div>
                </div>
              )}

            </div>

            {/* Right Real-time Engine Log Console (30%) */}
            <div style={{ flex: '1 1 250px', padding: '32px', background: 'rgba(5, 5, 10, 0.4)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database style={{ width: '16px', height: '16px', color: '#00F0FF' }} />
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#FFF', letterSpacing: '0.05em' }}>
                  SYSTEM LOG STREAM
                </span>
              </div>

              {/* Logs area */}
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
                    <span style={{ color: '#2E6BFF', marginRight: '6px' }}>[{log.time}]</span>
                    <span>{log.msg}</span>
                  </div>
                ))}
              </div>

              {/* Console status indicator */}
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
                <span style={{ color: bagStatus === 'jammed' ? '#FF6E6E' : '#00FF66', fontWeight: 600 }}>
                  {bagStatus === 'jammed' ? '91.2% WARNING' : '99.98% SECURE'}
                </span>
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
          to {
            stroke-dashoffset: -100;
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
