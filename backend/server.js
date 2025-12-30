const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/registrations', require('./routes/registrations'));

app.get('/', (req, res) => {
  res.json({ message: 'Event Registration System API' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: event-registration`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try stopping the process using that port or set PORT in your .env to a different value.`);
    console.error('   Example to free port on Windows (PowerShell):');
    console.error('     Get-Process -Id (Get-NetTCPConnection -LocalPort ' + PORT + ').OwningProcess | Stop-Process -Force');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});