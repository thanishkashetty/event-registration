import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      setMessage('✅ Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1000);
    } else {
      setMessage('❌ ' + result.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Animated background shapes */}
      <div style={styles.shape1}></div>
      <div style={styles.shape2}></div>
      <div style={styles.shape3}></div>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.badge}>EventHub</div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue your journey</p>
        </div>
        
        {message && (
          <div style={{
            padding: '14px 20px',
            borderRadius: '12px',
            marginBottom: '24px',
            background: message.includes('✅') ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff',
            fontWeight: '600',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            border: 'none'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 15px 40px rgba(56,189,248,0.4)')}
            onMouseOut={(e) => (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 10px 30px rgba(56,189,248,0.3)')}
          >
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <div style={styles.demoBox}>
          <div style={{fontSize: '12px', fontWeight: '700', color: '#38bdf8', marginBottom: '10px', letterSpacing: '0.5px', textTransform: 'uppercase'}}>
            Demo Credentials
          </div>
          <div style={{fontSize: '14px', color: '#475569', lineHeight: '1.8', fontWeight: '500'}}>
            <strong style={{color: '#0f172a'}}>Email:</strong> admin@example.com<br/>
            <strong style={{color: '#0f172a'}}>Password:</strong> admin123
          </div>
        </div>

        <div style={styles.footer}>
          <span style={styles.footerText}>Don't have an account?</span>
          <Link to="/register" style={styles.footerLink}>Create one</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    position: 'relative',
    overflow: 'hidden'
  },
  shape1: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(56,189,248,0.15), transparent)',
    top: '-10%',
    right: '-5%',
    animation: 'float 6s ease-in-out infinite'
  },
  shape2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent)',
    bottom: '-5%',
    left: '-5%',
    animation: 'float 8s ease-in-out infinite'
  },
  shape3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(56,189,248,0.1), transparent)',
    top: '40%',
    left: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  card: {
    background: 'rgba(255,255,255,0.97)',
    padding: '50px 45px',
    borderRadius: '24px',
    boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
    maxWidth: '480px',
    width: '100%',
    backdropFilter: 'blur(20px)',
    position: 'relative',
    zIndex: 1,
    border: '1px solid rgba(255,255,255,0.2)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    background: 'linear-gradient(135deg, #38bdf8, #7c3aed)',
    color: '#fff',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    marginBottom: '20px',
    textTransform: 'uppercase',
    boxShadow: '0 4px 15px rgba(56,189,248,0.3)'
  },
  title: {
    color: '#0f172a',
    margin: '0 0 12px',
    fontSize: '32px',
    fontWeight: '800',
    letterSpacing: '-1px'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '15px',
    margin: 0,
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#475569',
    marginBottom: '8px',
    letterSpacing: '0.3px',
    textTransform: 'uppercase'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '15px',
    color: '#0f172a',
    background: '#fff',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    fontWeight: '500'
  },
  button: {
    padding: '16px 24px',
    background: 'linear-gradient(135deg, #38bdf8, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 10px 30px rgba(56,189,248,0.3)',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  demoBox: {
    marginTop: '28px',
    padding: '20px',
    background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
    borderRadius: '16px',
    border: '2px solid #cbd5e1',
    textAlign: 'center'
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '1px solid #e2e8f0'
  },
  footerText: {
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500'
  },
  footerLink: {
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: '700',
    marginLeft: '6px',
    transition: 'color 0.2s'
  }
};

export default Login;