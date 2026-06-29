import React, { useEffect, useRef } from 'react';
import { Shield, ChevronRight, Activity, TrendingUp, Cpu, Server } from 'lucide-react';

export default function Hero({ designMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let tOffset = 0;

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Alpha Mode Hubs
    const hubs = [
      { name: 'Dublin (HQ)', x: 0.35, y: 0.32, radius: 6, pulse: 0 },
      { name: 'London', x: 0.40, y: 0.38, radius: 4, pulse: 0 },
      { name: 'Bucharest', x: 0.49, y: 0.42, radius: 4, pulse: 0 },
      { name: 'Dubai', x: 0.62, y: 0.58, radius: 5, pulse: 0 },
      { name: 'New York', x: 0.15, y: 0.45, radius: 5, pulse: 0 },
      { name: 'Singapore', x: 0.82, y: 0.72, radius: 4, pulse: 0 },
    ];

    const routes = [
      { from: 4, to: 0, progress: 0.1, speed: 0.002, color: '#2E6BFF' },
      { from: 0, to: 1, progress: 0.4, speed: 0.006, color: '#00F0FF' },
      { from: 1, to: 2, progress: 0.0, speed: 0.004, color: '#2E6BFF' },
      { from: 2, to: 3, progress: 0.7, speed: 0.003, color: '#00F0FF' },
      { from: 3, to: 5, progress: 0.3, speed: 0.002, color: '#6A00FF' },
    ];

    let scanAngle = 0;

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      tOffset += 0.02;

      if (designMode === 'executive') {
        // BETA EXECUTIVE MODE: Render a structured financial/operational chart grid
        const padding = 60;
        const graphW = w - padding * 2;
        const graphH = h - padding * 2;

        // Draw axis grid lines
        ctx.strokeStyle = 'rgba(30, 64, 175, 0.12)';
        ctx.lineWidth = 1;
        
        // Horizontal grid
        for (let i = 0; i <= 5; i++) {
          const y = padding + (graphH * i) / 5;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(w - padding, y);
          ctx.stroke();

          // Axis Labels
          ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
          ctx.font = '10px "JetBrains Mono"';
          ctx.fillText(`FL${300 + (5 - i) * 20}`, padding - 45, y + 4);
        }

        // Vertical grid
        for (let i = 0; i <= 6; i++) {
          const x = padding + (graphW * i) / 6;
          ctx.beginPath();
          ctx.moveTo(x, padding);
          ctx.lineTo(x, h - padding);
          ctx.stroke();
        }

        // Draw Trend Line 1: Simulated Unoptimized Fuel Consumption (Red)
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x <= graphW; x++) {
          const xCoord = padding + x;
          const yVal = Math.sin(x * 0.01 + tOffset * 0.2) * 15 + Math.cos(x * 0.005) * 30 + (graphH * 0.4);
          if (x === 0) ctx.moveTo(xCoord, yVal);
          else ctx.lineTo(xCoord, yVal);
        }
        ctx.stroke();

        // Draw Trend Line 2: Amach ML Fuel Optimization Curve (Emerald Green)
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#10B981';
        ctx.beginPath();
        
        const scanIndex = Math.floor(((tOffset * 3) % graphW)); // Scanning drawing path
        
        for (let x = 0; x <= scanIndex; x++) {
          const xCoord = padding + x;
          const yVal = Math.sin(x * 0.008 + tOffset * 0.1) * 10 + Math.cos(x * 0.004) * 20 + (graphH * 0.65);
          if (x === 0) ctx.moveTo(xCoord, yVal);
          else ctx.lineTo(xCoord, yVal);
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // reset

        // Draw scanning point
        const activeX = padding + scanIndex;
        const activeY = Math.sin(scanIndex * 0.008 + tOffset * 0.1) * 10 + Math.cos(scanIndex * 0.004) * 20 + (graphH * 0.65);
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(activeX, activeY, 5, 0, Math.PI*2);
        ctx.fill();

        // Highlight optimal bounds text
        ctx.fillStyle = '#10B981';
        ctx.font = 'bold 10px "JetBrains Mono"';
        ctx.fillText("AMACH ML RECOMMENDATION [FL390]", activeX - 90, activeY - 15);

      } else {
        // ALPHA CINEMATIC MODE: Render interactive network flow
        // Draw background grid lines
        ctx.strokeStyle = 'rgba(46, 107, 255, 0.03)';
        ctx.lineWidth = 1;
        const centerX = w * 0.45;
        const centerY = h * 0.45;
        for (let r = 80; r < Math.max(w, h); r += 120) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw sweeping radar line
        scanAngle += 0.003;
        const scanLen = Math.max(w, h);
        const scanX = centerX + Math.cos(scanAngle) * scanLen;
        const scanY = centerY + Math.sin(scanAngle) * scanLen;
        
        const grad = ctx.createLinearGradient(centerX, centerY, scanX, scanY);
        grad.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
        grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(scanX, scanY);
        ctx.stroke();

        // Draw routes
        routes.forEach(route => {
          const fromHub = hubs[route.from];
          const toHub = hubs[route.to];
          
          const x1 = fromHub.x * w;
          const y1 = fromHub.y * h;
          const x2 = toHub.x * w;
          const y2 = toHub.y * h;

          const cx = (x1 + x2) / 2;
          const cy = (y1 + y2) / 2 - Math.abs(x1 - x2) * 0.15;

          ctx.strokeStyle = 'rgba(46, 107, 255, 0.08)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(cx, cy, x2, y2);
          ctx.stroke();

          route.progress += route.speed;
          if (route.progress >= 1.0) route.progress = 0;

          const t = route.progress;
          const ax = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
          const ayCorrect = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;

          ctx.shadowBlur = 10;
          ctx.shadowColor = route.color;
          ctx.fillStyle = route.color;
          ctx.beginPath();
          ctx.arc(ax, ayCorrect, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Draw hubs
        hubs.forEach(hub => {
          const hx = hub.x * w;
          const hy = hub.y * h;

          hub.pulse += 0.015;
          if (hub.pulse > 1) hub.pulse = 0;

          ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - hub.pulse)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(hx, hy, hub.radius + hub.pulse * 15, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(hx, hy, hub.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#00F0FF';
          ctx.beginPath();
          ctx.arc(hx, hy, hub.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(143, 156, 174, 0.7)';
          ctx.font = '10px "JetBrains Mono"';
          ctx.fillText(hub.name, hx + 10, hy + 4);
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [designMode]);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '100px',
      overflow: 'hidden',
      background: designMode === 'executive'
        ? 'radial-gradient(circle 600px at 70% 30%, rgba(30, 64, 175, 0.07), transparent)'
        : 'radial-gradient(circle 600px at 70% 30%, rgba(46, 107, 255, 0.07), transparent)',
      transition: 'background 0.4s ease'
    }}>
      {/* Background Geo Grid and Canvas animation */}
      <div className="geo-grid"></div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: '20%',
        width: '80%',
        zIndex: 1,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to right, transparent, black 40%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)',
      }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Badge */}
          <div>
            <div className="badge">
              <Activity style={{ width: '12px', height: '12px' }} />
              <span>
                {designMode === 'executive' 
                  ? 'ENTERPRISE OPERATIONAL METRICS // FAA & EASA VERIFIED' 
                  : 'LOGANAVIATION PROTOCOL v4.1 ACTIVE'}
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(36px, 4.5vw, 62px)',
            lineHeight: 1.1,
            fontWeight: 800,
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
          }}>
            {designMode === 'executive' ? (
              <>
                High-Trust Software <br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFF 0%, #94A3B8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Engineering for</span> <br />
                Commercial Aviation.
              </>
            ) : (
              <>
                Building <br />
                <span style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #2E6BFF 50%, #6A00FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 40px rgba(46, 107, 255, 0.1)',
                }}>High-Throughput</span> <br />
                Aviation Engines.
              </>
            )}
          </h1>

          {/* Paragraph description */}
          <p style={{
            fontSize: '17px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}>
            {designMode === 'executive' ? (
              'Amach delivers enterprise-grade software integration, automated crew rostering CSP solvers, and event-driven disruption recovery systems. Engineered for total compliance, security, and proven financial yield.'
            ) : (
              'Amach engineers mission-critical cloud infrastructures and intelligent AI pipelines for global air carriers. We solve the industry\'s most complex mathematical optimization problems—keeping your crew, baggage, and fleet in perfect synchronization.'
            )}
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '12px',
          }}>
            <a href="#solutions" className="btn-primary">
              <span>{designMode === 'executive' ? 'Audit Our Solutions' : 'Explore Tech Suite'}</span>
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </a>
            <a href="#codeplay" className="btn-secondary">
              <span>{designMode === 'executive' ? 'Review Tech Architecture' : 'View Developers Lab'}</span>
            </a>
          </div>

          {/* Data Rich Executive Section */}
          {designMode === 'executive' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginTop: '40px',
              padding: '24px',
              background: 'rgba(30, 64, 175, 0.05)',
              border: '1px solid rgba(30, 64, 175, 0.15)',
              borderRadius: '12px',
              textAlign: 'left'
            }} className="executive-stats animate-float">
              <div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>CREW OPTIMIZATION</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-display)' }}>+$4.8M</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg. annual savings per 50 airframes</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>FUEL BURN EFFICIENCY</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#10B981', fontFamily: 'var(--font-display)' }}>-4.2%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Reduction in cruise profile carbon</div>
              </div>
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '20px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>SLA AVAILABILITY</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-display)' }}>99.999%</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Mission-critical API SLA bounds</div>
              </div>
            </div>
          )}

          {/* Trust elements / logos indicator */}
          {designMode !== 'executive' && (
            <div style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(46, 107, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                TRUSTED FOR ENTERPRISE DEPLOYMENTS ACROSS ALL MAJOR CLOUDS
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                opacity: 0.5,
              }}>
                <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, letterSpacing: '0.1em' }}>AWS PARTNER</span>
                <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, letterSpacing: '0.1em' }}>AZURE CLOUD</span>
                <span style={{ fontSize: '13px', color: '#FFF', fontWeight: 600, letterSpacing: '0.1em' }}>GOOGLE CLOUD</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
