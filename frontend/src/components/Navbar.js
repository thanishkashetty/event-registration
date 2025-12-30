import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand" onClick={() => navigate('/') }>
          <svg className="nav-logo" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" opacity="0.12" />
            <path d="M6 16V8h2l2.5 5L13 8h2v8h-2v-4.2L10.5 17 8 11.8V16H6z" fill="currentColor" />
          </svg>
          <span className="nav-title">EventHub</span>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <div 
            className={isActive('/')}
            onClick={() => navigate('/')}
          >
            🏠 Home
          </div>
          <div 
            className={isActive('/events')}
            onClick={() => navigate('/events')}
          >
            📅 Events
          </div>
          <div 
            className={isActive('/my-registrations')}
            onClick={() => navigate('/my-registrations')}
          >
            🎫 My Registrations
          </div>
        </div>

        {/* User Section */}
        <div className="nav-user-section">
          {user ? (
            <>
              {/* User Info */}
              <div className="user-info">
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              </div>

              {/* Profile & Logout */}
              <div className="user-actions">
                <button 
                  className="profile-btn"
                  onClick={() => navigate('/profile')}
                >
                  👤 Profile
                </button>
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            /* Login/Register Buttons */
            <div className="auth-buttons">
              <button 
                className="login-btn"
                onClick={() => navigate('/login')}
              >
                🔐 Login
              </button>
              <button 
                className="register-btn"
                onClick={() => navigate('/register')}
              >
                🎉 Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn">
          <span>☰</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;