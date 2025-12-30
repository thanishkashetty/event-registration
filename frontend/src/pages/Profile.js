import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    year: user?.year || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, you would update user data via API
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Profile</h1>
      
      <div style={styles.profileCard}>
        <div style={styles.avatarSection}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 style={styles.userName}>{user?.name}</h2>
          <p style={styles.userRole}>{user?.role?.toUpperCase()}</p>
        </div>

        <div style={styles.profileInfo}>
          {isEditing ? (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.saveButton}>
                  Save Changes
                </button>
                <button 
                  type="button" 
                  style={styles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                  <strong>Email:</strong> {user?.email}
                </div>
                <div style={styles.infoItem}>
                  <strong>Phone:</strong> {user?.phone || 'Not provided'}
                </div>
                <div style={styles.infoItem}>
                  <strong>Department:</strong> {user?.department || 'Not provided'}
                </div>
                <div style={styles.infoItem}>
                  <strong>Year:</strong> {user?.year || 'Not provided'}
                </div>
                <div style={styles.infoItem}>
                  <strong>Member since:</strong> {new Date().toLocaleDateString()}
                </div>
                <div style={styles.infoItem}>
                  <strong>Total Registrations:</strong> 0 events
                </div>
              </div>

              <button 
                style={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
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
  profileCard: {
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '20px',
    padding: '40px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
  },
  avatarSection: {
    textAlign: 'center',
    flex: 1,
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 auto 20px',
  },
  userName: {
    color: '#fff',
    margin: '0 0 5px 0',
  },
  userRole: {
    color: 'var(--cta)',
    margin: 0,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 2,
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '30px',
  },
  infoItem: {
    color: '#fff',
    padding: '10px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#fff',
    marginBottom: '5px',
    fontWeight: '500',
  },
  input: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    background: 'rgba(255,255,255,0.9)',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  },
  editButton: {
    background: 'var(--cta)',
    color: '#333',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  saveButton: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  cancelButton: {
    background: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Profile;