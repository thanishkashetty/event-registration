const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Event = require('./models/Event');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-registration';

async function runSeeder() {
  try {
    console.log('🔗 Connecting to', mongoUri.startsWith('mongodb://localhost') ? mongoUri : '[PROTECTED]');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Ensure admin user exists
    let admin = await User.findOne({ email: 'admin@example.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created:', admin.email);
    } else {
      console.log('ℹ️ Admin user already exists:', admin.email);
    }

    // Remove existing events for a predictable seed
    await Event.deleteMany({});
    console.log('🧹 Cleared existing events');

    const now = Date.now();
    const sampleEvents = [
      {
        title: 'Tech Conference 2025',
        description: 'Keynotes and hands-on sessions about modern web, cloud, and AI.',
        date: new Date(now + 7 * 24 * 60 * 60 * 1000),
        time: '10:00 AM',
        venue: 'Main Auditorium',
        category: 'technical',
        maxParticipants: 200,
        currentParticipants: 0,
        registrationFee: 0,
        rules: ['Bring laptop for workshops', 'Be punctual'],
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Cultural Night',
        description: 'Performances, food stalls, and cultural showcases.',
        date: new Date(now + 14 * 24 * 60 * 60 * 1000),
        time: '6:00 PM',
        venue: 'Auditorium',
        category: 'cultural',
        maxParticipants: 150,
        currentParticipants: 0,
        registrationFee: 50,
        rules: ['Respect performers', 'No outside food'],
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Coding Workshop',
        description: 'Hands-on React + Node workshop for building fullstack apps.',
        date: new Date(now + 10 * 24 * 60 * 60 * 1000),
        time: '9:00 AM',
        venue: 'Computer Lab - Block A',
        category: 'workshop',
        maxParticipants: 50,
        currentParticipants: 0,
        registrationFee: 100,
        rules: ['Bring laptop', 'Install Node & VS Code'],
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Sports Tournament',
        description: 'Inter-department sports tournament: football, basketball & badminton.',
        date: new Date(now + 21 * 24 * 60 * 60 * 1000),
        time: '8:00 AM',
        venue: 'Sports Complex',
        category: 'sports',
        maxParticipants: 150,
        currentParticipants: 0,
        registrationFee: 25,
        rules: ['Team registration', 'Sports gear mandatory'],
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Design Sprint',
        description: 'A creative sprint to prototype UX ideas with mentors and prizes.',
        date: new Date(now + 12 * 24 * 60 * 60 * 1000),
        time: '11:00 AM',
        venue: 'Studio 3',
        category: 'workshop',
        maxParticipants: 40,
        currentParticipants: 0,
        registrationFee: 20,
        rules: ['Bring sketchbook', 'Collaborative teams of 3-4'],
        createdBy: admin._id,
        isActive: true
      },
      {
        title: 'Hackathon Mini',
        description: '24-hour mini-hack to build a prototype; mentoring available.',
        date: new Date(now + 28 * 24 * 60 * 60 * 1000),
        time: '9:00 AM',
        venue: 'Hack Lab',
        category: 'technical',
        maxParticipants: 120,
        currentParticipants: 0,
        registrationFee: 0,
        rules: ['Bring ID', 'Teams up to 4'],
        createdBy: admin._id,
        isActive: true
      }
    ];

    const created = await Event.insertMany(sampleEvents);
    console.log(`✅ Created ${created.length} sample events`);

    console.log('\n🎉 Seeding complete.');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

runSeeder();