const express = require('express');
const router = express.Router();
console.log('🔐 Auth routes loaded');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth API is working!',
    timestamp: new Date().toISOString()
  });
});

// Register route
router.post('/register', async (req, res) => {
  try {
    console.log('🔔 POST /api/auth/register called with body:', req.body);
    const { name, email, password, phone, department, year } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }
    const user = new User({ name, email, password, phone, department, year });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    
    // Return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      year: user.year,
      role: user.role
    };
    
    res.json({ success: true, token, user: userResponse, message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    
    // Return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      year: user.year,
      role: user.role
    };
    
    res.json({ success: true, token, user: userResponse, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
});

module.exports = router;