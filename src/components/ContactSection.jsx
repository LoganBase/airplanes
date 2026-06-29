import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    solution: 'crew',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1800);
  };

  return (
    <section id="contact" style={{
      padding: '100px 0',
      background: 'linear-gradient(to bottom, #05050A, #0A0C14)',
      borderTop: '1px solid rgba(46, 107, 255, 0.05)',
      position: 'relative'
    }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
        
        {/* Left text panel */}
        <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
          <span className="badge" style={{ marginBottom: '16px' }}>ENGAGEMENT GATEWAY</span>
          <h2 style={{ fontSize: '38px', marginBottom: '16px', lineHeight: 1.15 }}>
            Optimize Your Flight <br />
            Operations Infrastructure.
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            We work directly with airline CTOs, dispatch directors, and ops managers to build bespoke, 
            zero-downtime microservice pipelines. Get in touch to schedule a technical architecture session.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00F0FF' }}></div>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>Avg. Deployment Time: 90 Days</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00F0FF' }}></div>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>24/7/365 Dedicated SRE Support</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00F0FF' }}></div>
              <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>EASA / FAA Compliance Assured</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div style={{ flex: '1 1 400px' }}>
          <div className="glass-panel" style={{
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid rgba(46, 107, 255, 0.15)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            textAlign: 'left'
          }}>
            {status === 'success' ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                <CheckCircle2 style={{ width: '64px', height: '64px', color: '#00FF66', filter: 'drop-shadow(0 0 10px rgba(0,255,102,0.2))' }} />
                <h3 style={{ fontSize: '24px', color: '#FFF' }}>Protocol Initialized</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '320px', lineHeight: 1.6 }}>
                  Consultation request logged. A lead solutions architect from our **{formData.company || 'aviation'}** desk will contact you within 2 business hours.
                </p>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  background: 'rgba(0,255,102,0.03)',
                  border: '1px solid rgba(0,255,102,0.1)',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  marginTop: '12px'
                }}>
                  STATUS: QUEUED // ADVISOR_ASSIGNED
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="form-name" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>NAME</label>
                  <input 
                    type="text" 
                    id="form-name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="contact-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="form-email" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>WORK EMAIL</label>
                  <input 
                    type="email" 
                    id="form-email"
                    required
                    placeholder="jane.doe@airline.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="contact-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="form-company" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>AIRLINE / ORGANIZATION</label>
                  <input 
                    type="text" 
                    id="form-company"
                    placeholder="AeroGlobe Airlines"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="contact-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="form-solution" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>PRIMARY SOLUTION FOCUS</label>
                  <select 
                    id="form-solution"
                    value={formData.solution}
                    onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                    className="contact-select"
                  >
                    <option value="crew">Crew Scheduling & Pairing (CSP)</option>
                    <option value="bags">Baggage Telemetry Systems</option>
                    <option value="fuel">Fuel & Carbon ML Solvers</option>
                    <option value="irops">IROPs Disruption Mitigation</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-primary"
                  style={{
                    justifyContent: 'center',
                    marginTop: '8px',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1
                  }}
                >
                  <Send style={{ width: '14px', height: '14px' }} />
                  <span>{status === 'submitting' ? 'Transmitting Request...' : 'Initiate Operational Audit'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .contact-input, .contact-select {
          background: rgba(5, 5, 10, 0.6);
          border: 1px solid rgba(46, 107, 255, 0.15);
          color: #FFF;
          padding: 12px;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .contact-input:focus, .contact-select:focus {
          border-color: #00F0FF;
        }
      `}</style>
    </section>
  );
}
