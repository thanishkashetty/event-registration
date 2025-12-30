import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Help & Support</h1>
      
      <div style={styles.content}>
        <div style={styles.contactInfo}>
          <h2 style={styles.sectionTitle}>Get in Touch</h2>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📧</span>
            <div>
              <strong>Email</strong>
              <p>support@eventhub.com</p>
            </div>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📞</span>
            <div>
              <strong>Phone</strong>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>🕒</span>
            <div>
              <strong>Support Hours</strong>
              <p>Monday - Friday: 9AM - 6PM</p>
              <p>Saturday: 10AM - 4PM</p>
            </div>
          </div>
          <div style={styles.contactItem}>
            <span style={styles.icon}>📍</span>
            <div>
              <strong>Address</strong>
              <p>123 College Street<br />Academic City, AC 12345</p>
            </div>
          </div>
        </div>

        <div style={styles.contactForm}>
          <h2 style={styles.sectionTitle}>Send us a Message</h2>
          <form onSubmit={handleSubmit} style={styles.form} aria-label="Contact Form">
            <div style={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                style={styles.textarea}
                rows="5"
                required
              />
            </div>
            <button type="submit" style={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div style={styles.faqSection}>
        <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div style={styles.faqGrid}>
          <div style={styles.faqItem}>
            <h3 style={styles.faqItemTitle}>How do I register for an event?</h3>
            <p style={styles.faqItemText}>Go to the Events page, browse available events, and click the "Register Now" button on any event you'd like to attend.</p>
          </div>
          <div style={styles.faqItem}>
            <h3 style={styles.faqItemTitle}>Can I cancel my registration?</h3>
            <p style={styles.faqItemText}>Yes, you can cancel your registration from the "My Registrations" page up to 24 hours before the event.</p>
          </div>
          <div style={styles.faqItem}>
            <h3 style={styles.faqItemTitle}>Is there a registration fee?</h3>
            <p style={styles.faqItemText}>Some events may have a registration fee, which will be clearly mentioned on the event details page.</p>
          </div>
          <div style={styles.faqItem}>
            <h3 style={styles.faqItemTitle}>How do I update my profile?</h3>
            <p style={styles.faqItemText}>You can update your profile information from the "Profile" page in your account dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    flex: 1,
    minHeight: '80vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#fff',
    fontSize: '2.5rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto 50px',
  },
  contactInfo: {
    background: 'rgba(255,255,255,0.15)',
    padding: '30px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  contactForm: {
    background: 'rgba(255,255,255,0.15)',
    padding: '30px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: '25px',
    fontSize: '1.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    marginBottom: '25px',
    color: '#fff',
  },
  icon: {
    fontSize: '1.5rem',
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
  input: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    background: 'rgba(255,255,255,0.9)',
  },
  textarea: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    background: 'rgba(255,255,255,0.9)',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitButton: {
    background: 'var(--cta)',
    color: '#0b1220',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  faqSection: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
  },
  faqItem: {
    background: 'rgba(255,255,255,0.15)',
    padding: '25px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  faqItemTitle: {
    color: '#fff',
    marginBottom: '15px',
  },
  faqItemText: {
    color: '#f9f9f9',
    lineHeight: '1.5',
  },
};

export default Contact;