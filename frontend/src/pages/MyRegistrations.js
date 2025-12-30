import React, { useState, useEffect } from 'react';
import { registrationsAPI } from '../services/api';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      const response = await registrationsAPI.getMyRegistrations();
      setRegistrations(response.data.data || []);
    } catch (error) {
      console.error('Error loading registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (registrationId) => {
    if (window.confirm('Are you sure you want to cancel this registration?')) {
      try {
        await registrationsAPI.cancel(registrationId);
        alert('Registration cancelled successfully!');
        loadRegistrations();
      } catch (error) {
        alert('Failed to cancel registration');
      }
    }
  };

  if (loading) return <div style={styles.loading}>Loading your registrations...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Registrations</h1>
      
      {registrations.length === 0 ? (
        <div style={styles.emptyState}>
          <h3>No Registrations Yet</h3>
          <p>You haven't registered for any events yet.</p>
          <button 
            style={styles.browseButton}
            onClick={() => window.location.href = '/events'}
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div style={styles.registrationsGrid}>
          {registrations.map(registration => (
            <div key={registration._id} style={styles.registrationCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.eventTitle}>{registration.event?.title}</h3>
                <span style={styles.statusBadge}>{registration.status}</span>
              </div>
              
              <div style={styles.eventDetails}>
                <p style={styles.eventDetailsP}>📅 <strong>Date:</strong> {new Date(registration.event?.date).toLocaleDateString()}</p>
                <p style={styles.eventDetailsP}>⏰ <strong>Time:</strong> {registration.event?.time}</p>
                <p style={styles.eventDetailsP}>📍 <strong>Venue:</strong> {registration.event?.venue}</p>
                <p style={styles.eventDetailsP}>🎯 <strong>Category:</strong> {registration.event?.category}</p>
                <p style={styles.eventDetailsP}>📝 <strong>Registered on:</strong> {new Date(registration.registrationDate).toLocaleDateString()}</p>
              </div>

              <button
                style={styles.cancelButton}
                onClick={() => handleCancel(registration._id)}
              >
                Cancel Registration
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    flex: 1,
    minHeight: '80vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#fff',
    fontSize: '2.5rem',
  },
  loading: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '18px',
    padding: '40px',
  },
  emptyState: {
    textAlign: 'center',
    background: 'rgba(255,255,255,0.06)',
    padding: '50px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  browseButton: {
    background: 'var(--cta)',
    color: '#0b1220',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
  },
  registrationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
  },
  registrationCard: {
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '15px',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  eventTitle: {
    color: '#fff',
    fontSize: '1.3rem',
    margin: 0,
    flex: 1,
  },
  statusBadge: {
    background: '#28a745',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  eventDetails: {
    color: '#f9f9f9',
    marginBottom: '20px',
  },
  eventDetailsP: {
    margin: '8px 0',
    fontSize: '14px',
  },
  cancelButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
};

export default MyRegistrations;