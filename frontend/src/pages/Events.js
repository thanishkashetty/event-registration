import React, { useState, useEffect } from 'react';
import { eventsAPI, registrationsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await eventsAPI.getAll();
      // Debug: See what events are returned (helpful when API shape differs)
      console.log('Events API response (raw):', response);
      const payload = response?.data;
      if (payload?.success === false) {
        // backend returned an error payload
        const msg = payload?.message || 'Failed to load events';
        setError(msg);
        setEvents([]);
      } else {
        // support multiple payload shapes
        const eventsArray = payload?.data ?? payload?.events ?? (Array.isArray(payload) ? payload : []);
        console.log('Parsed events array length:', eventsArray.length);
        setEvents(eventsArray || []);
      }
    } catch (error) {
      console.error('Error loading events:', error, error.response?.data);
      const message = error.response?.data?.message || 'Failed to load events';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await registrationsAPI.register(eventId);
      alert('🎉 Successfully registered for the event!');
      loadEvents(); // Refresh events to update participant count
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      alert(`❌ ${message}`);
    }
  };

  if (loading) return <div style={styles.loading}>Loading events...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upcoming Events</h1>
      <div style={styles.eventsGrid}>
        {events.length === 0 ? (
          <div style={styles.noEvents}>No events found.</div>
        ) : (
          events.map(event => (
            <div key={event._id} style={styles.eventCard}>
              {/* Optional event image */}
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  style={styles.eventImage}
                />
              )}
              <div style={styles.eventHeader}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <div style={styles.badges}>
                  <span style={styles.categoryBadge}>{event.category}</span>
                  {event.registrationFee > 0 ? (
                    <span style={styles.feeBadge}>₹{event.registrationFee}</span>
                  ) : (
                    <span style={styles.freeBadge}>Free</span>
                  )}
                </div>
              </div>

              <p style={styles.eventDescription}>{event.description}</p>
              
              <div style={styles.eventDetails}>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p style={{ marginTop: 8 }}><strong>Seats:</strong> {event.currentParticipants}/{event.maxParticipants}</p>
                {event.registrationFee > 0 && (
                  <p><strong>Fee:</strong> ₹{event.registrationFee}</p>
                )}
              </div>

              {event.rules && event.rules.length > 0 && (
                <div style={styles.eventRules}>
                  <strong>Rules:</strong>
                  <ul>
                    {event.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              {user?.role === 'student' && (
                <button
                  style={{
                    ...styles.registerButton,
                    ...(event.currentParticipants >= event.maxParticipants ? styles.disabledButton : {})
                  }}
                  onClick={() => handleRegister(event._id)}
                  disabled={event.currentParticipants >= event.maxParticipants}
                >
                  {event.currentParticipants >= event.maxParticipants ? '🎟️ Event Full' : '📝 Register Now'}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;

const styles = {
  container: {
    padding: '40px',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0f1724 0%, #071126 100%)',
    color: '#e6eef8'
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '18px',
    color: '#9be7ff',
    textAlign: 'center',
    fontWeight: 800,
    letterSpacing: '0.6px',
    textShadow: '0 6px 18px rgba(155,231,255,0.08)'
  },
  eventsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '28px',
    marginTop: '18px'
  },
  eventCard: {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
    border: '1px solid rgba(155,231,255,0.06)',
    borderRadius: '14px',
    padding: '20px',
    boxShadow: '0 10px 30px rgba(2,6,23,0.6)',
    color: '#e6eef8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '360px',
    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
  },
  eventCardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 18px 50px rgba(9,18,50,0.6)'
  },
  eventImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '12px',
    objectFit: 'cover',
    maxHeight: '160px',
    border: '1px solid rgba(255,255,255,0.04)'
  },
  eventTitle: {
    fontSize: '1.35rem',
    color: '#fff',
    marginBottom: '6px',
    fontWeight: 700,
  },
  eventDescription: {
    fontSize: '0.99rem',
    marginBottom: '12px',
    color: '#cfeffd',
    opacity: 0.92
  },
  eventDetails: {
    fontSize: '0.95rem',
    marginBottom: '12px',
    color: '#b8dff3',
  },
  eventRules: {
    fontSize: '0.92rem',
    marginBottom: '12px',
    color: '#9fcfe8',
  },
  registerButton: {
    background: 'linear-gradient(90deg, #38bdf8 0%, #7c3aed 100%)',
    color: '#081029',
    border: 'none',
    borderRadius: '10px',
    padding: '10px 18px',
    fontSize: '0.98rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'filter 0.18s ease, transform 0.12s ease',
  },
  disabledButton: {
    opacity: 0.55,
    cursor: 'not-allowed',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh',
    fontSize: '1.2rem',
    color: '#9be7ff',
  },
  error: {
    color: '#ff7b7b',
    textAlign: 'center',
    marginTop: '32px',
    fontSize: '1.1rem',
  },
  noEvents: {
    textAlign: 'center',
    color: '#9fbfdc',
    fontSize: '1.05rem',
    gridColumn: '1/-1',
    padding: '40px 0',
  },
  badges: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  categoryBadge: {
    background: 'rgba(60,176,255,0.12)',
    color: '#9be7ff',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '0.78rem',
    textTransform: 'capitalize'
  },
  feeBadge: {
    background: 'linear-gradient(90deg, rgba(124,58,237,0.12), rgba(56,189,248,0.12))',
    color: '#dff7ff',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '0.78rem'
  },
  freeBadge: {
    background: 'rgba(124,58,237,0.08)',
    color: '#e6eaff',
    padding: '6px 10px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '0.78rem'
  }
};