import React, { useEffect, useRef } from 'react';
import { Shield, ChevronRight, Activity } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Hubs definition
    const hubs = [
      { name: 'Dublin (HQ)', x: 0.35, y: 0.32, radius: 6, pulse: 0 },
      { name: 'London', x: 0.40, y: 0.38, radius: 4, pulse: 0 },
      { name: 'Bucharest', x: 0.49, y: 0.42, radius: 4, pulse: 0 },
      { name: 'Dubai', x: 0.62, y: 0.58, radius: 5, pulse: 0 },
      { name: 'New York', x: 0.15, y: 0.45, radius: 5, pulse: 0 },
      { name: 'Singapore', x: 0.82, y: 0.72, radius: 4, pulse: 0 },
    ];

    // Flight paths connections (index from -> index to)
    const routes = [
      { from: 4, to: 0, progress: 0.1, speed: 0.002, color: '#2E6BFF' }, // NY -> Dublin
      { from: 0, to: 1, progress: 0.4, speed: 0.006, color: '#00F0FF' }, // Dublin -> London
      { from: 1, to: 2, progress: 0.0, speed: 0.004, color: '#2E6BFF' }, // London -> Bucharest
      { from: 2, to: 3, progress: 0.7, speed: 0.003, color: '#00F0FF' }, // Bucharest -> Dubai
      { from: 3, to: 5, progress: 0.3, speed: 0.002, color: '#6A00FF' }, // Dubai -> Singapore
      { from: 4, to: 3, progress: 0.2, speed: 0.0015, color: '#2E6BFF' }, // NY -> Dubai
    ];

    // Radar scanner
    let scanAngle = 0;

    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw background grid lines (radial radar-like circles)
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

      // Draw route paths
      routes.forEach(route => {
        const fromHub = hubs[route.from];
        const toHub = hubs[route.to];
        
        const x1 = fromHub.x * w;
        const y1 = fromHub.y * h;
        const x2 = toHub.x * w;
        const y2 = toHub.y * h;

        // Quadratic curve control point to make it curved like flight path
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2 - Math.abs(x1 - x2) * 0.15; // Arc height

        ctx.strokeStyle = 'rgba(46, 107, 255, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cx, cy, x2, y2);
        ctx.stroke();

        // Increment flight progress
        route.progress += route.speed;
        if (route.progress >= 1.0) {
          route.progress = 0;
        }

        // Calculate current position of aircraft on quadratic curve
        const t = route.progress;
        const ax = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
        const ay = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * x2; // Wait, t*t*y2

        // Wait, correction for Bezier Y calculation:
        const ayCorrect = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;

        // Draw animated flight indicator glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = route.color;
        ctx.fillStyle = route.color;
        ctx.beginPath();
        ctx.arc(ax, ayCorrect, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw hubs
      hubs.forEach(hub => {
        const hx = hub.x * w;
        const hy = hub.y * h;

        // Draw connecting/pulsing rings
        hub.pulse += 0.015;
        if (hub.pulse > 1) hub.pulse = 0;

        ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - hub.pulse)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(hx, hy, hub.radius + hub.pulse * 15, 0, Math.PI * 2);
        ctx.stroke();

        // Base hub point
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(hx, hy, hub.radius, 0, Math.PI * 2);
        ctx.fill();

        // Accent core
        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.arc(hx, hy, hub.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(143, 156, 174, 0.7)';
        ctx.font = '10px "JetBrains Mono"';
        ctx.fillText(hub.name, hx + 10, hy + 4);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '100px',
      overflow: 'hidden',
      background: 'radial-gradient(circle 600px at 70% 30%, rgba(46, 107, 255, 0.07), transparent)',
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
        <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Badge */}
          <div>
            <div className="badge">
              <Activity style={{ width: '12px', height: '12px' }} />
              <span>LOGANAVIATION PROTOCOL v4.1 ACTIVE</span>
            </div>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 'clamp(40px, 5vw, 68px)',
            lineHeight: 1.05,
            fontWeight: 800,
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
          }}>
            Building <br />
            <span style={{
              background: 'linear-gradient(135deg, #00F0FF 0%, #2E6BFF 50%, #6A00FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(46, 107, 255, 0.1)',
            }}>High-Throughput</span> <br />
            Aviation Engines.
          </h1>

          {/* Paragraph description */}
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}>
            Amach engineers mission-critical cloud infrastructures and intelligent AI pipelines 
            for global air carriers. We solve the industry's most complex mathematical optimization 
            problems—keeping your crew, baggage, and fleet in perfect synchronization.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '12px',
          }}>
            <a href="#solutions" className="btn-primary">
              <span>Explore Tech Suite</span>
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </a>
            <a href="#codeplay" className="btn-secondary">
              <span>View Developers Lab</span>
            </a>
          </div>

          {/* Trust elements / logos indicator */}
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

        </div>
      </div>
    </section>
  );
}
