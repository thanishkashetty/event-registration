const mongoose = require('mongoose');

require('dotenv').config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-registration';

console.log('🔗 Attempting to connect to MongoDB...');
console.log(`   Using URI: ${mongoUri.startsWith('mongodb://localhost') ? mongoUri : '[PROTECTED_CONNECTION_STRING]'}`);

mongoose.connect(mongoUri)
.then(async () => {
  console.log('✅ Connected to MongoDB successfully!');
  
  // Create simple schemas
  const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
  }));
  
  const Event = mongoose.model('Event', new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    venue: String
  }));
  
  // Clear any existing data
  await User.deleteMany({});
  await Event.deleteMany({});
  console.log('🗑️ Cleared existing data');
  
  // Create sample users
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  });
  console.log('✅ Admin user created');
  
  const student = await User.create({
    name: 'John Student',
    email: 'student@example.com', 
    password: 'student123',
    role: 'student'
  });
  console.log('✅ Student user created');
  
  // Create sample events
  const events = [
    {
      title: '🎤 Music Festival 2024',
      description: 'Biggest music event of the year!',
      date: new Date('2024-12-15'),
      venue: 'Main Auditorium'
    },
    {
      title: '💻 Tech Conference',
      description: 'Latest in technology and innovation',
      date: new Date('2024-11-20'),
      venue: 'Tech Park'
    }
  ];
  
  for (const eventData of events) {
    await Event.create(eventData);
    console.log(`✅ Event created: ${eventData.title}`);
  }
  
  console.log('\n🎉 DATABASE CREATION COMPLETE!');
  console.log('📊 Database: event-registration');
  console.log('📁 Collections: users, events');
  console.log('👤 Users: admin@example.com / admin123');
  console.log('👤 Users: student@example.com / student123');
  
  mongoose.connection.close();
})
.catch(err => {
  console.log('❌ MONGODB CONNECTION FAILED:');
  console.log('   Error:', err.message);
  console.log('\n🔧 TROUBLESHOOTING:');
  console.log('   1. Make sure MongoDB is installed');
  console.log('   2. Start MongoDB service:');
  console.log('      - Press Windows + R, type "services.msc"');
  console.log('      - Find "MongoDB" and click "Start"');
  console.log('   3. Or install MongoDB Compass and start from there');
});