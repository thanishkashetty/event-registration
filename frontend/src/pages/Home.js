import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      title: 'Browse Events',
      description: 'Explore upcoming events with details like date, venue, and rules.',
      icon: '📅',
      path: '/events',
      buttonText: 'View Events'
    },
    {
      title: 'My Registrations',
      description: 'Check the events you have registered for and manage participation.',
      icon: '🎫',
      path: '/my-registrations',
      buttonText: 'View Registrations'
    },
    {
      title: 'Profile',
      description: 'Update your account information and keep details up to date.',
      icon: '👤',
      path: '/profile',
      buttonText: 'Go to Profile'
    },
    {
      title: 'Help & Support',
      description: 'Need assistance? Contact the support team anytime.',
      icon: '💬',
      path: '/contact',
      buttonText: 'Contact Us'
    }
  ];

  if (user?.role === 'admin') {
    features.push({
      title: 'Admin Panel',
      description: 'Manage events, view registrations, and handle event administration.',
      icon: '⚙️',
      path: '/admin/events',
      buttonText: 'Admin Dashboard'
    });
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">EventHub</span>
          </h1>
          <p className="hero-subtitle">
            Discover amazing events, register with ease, and never miss out on the action. 
            {user && ` Welcome back, ${user.name}!`}
          </p>
          <div className="hero-stats">
            <div className="stat">
              <h3>50+</h3>
              <p>Events</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>Students</p>
            </div>
            <div className="stat">
              <h3>95%</h3>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="features-section">
        <h2 className="section-title">What would you like to do?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              onClick={() => navigate(feature.path)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <button className="feature-btn">
                {feature.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-buttons">
          <button 
            className="btn btn-primary action-btn"
            onClick={() => navigate('/events')}
          >
            🎪 Browse All Events
          </button>
          <button 
            className="btn btn-secondary action-btn"
            onClick={() => navigate('/my-registrations')}
          >
            📋 My Registrations
          </button>
          {user?.role === 'admin' && (
            <button 
              className="btn btn-success action-btn"
              onClick={() => navigate('/admin/events')}
            >
              ⚙️ Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;