import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Events from './pages/Events';
import MyRegistrations from './pages/MyRegistrations';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  console.log('🛡️ ProtectedRoute check:');
  console.log('👤 User:', user);
  console.log('⏳ Loading:', loading);
  
  if (loading) {
    console.log('🔄 ProtectedRoute: Still loading...');
    return <div style={styles.loading}>Loading...</div>;
  }
  
  if (!user) {
    console.log('❌ ProtectedRoute: No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ ProtectedRoute: User authenticated, rendering children');
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={styles.app}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={
              <ProtectedRoute>
                <div style={styles.appContainer}>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/my-registrations" element={<MyRegistrations />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const styles = {
  app: {
    fontFamily: "'Segoe UI', sans-serif",
    margin: 0,
    background: 'transparent',
    color: '#fff',
    minHeight: '100vh',
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#fff',
  }
};

export default App;