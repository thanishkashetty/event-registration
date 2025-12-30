// Quick test script to check if events exist in database
const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });

const Event = require('./backend/models/Event');

async function testEvents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const events = await Event.find({ isActive: true });
    console.log('\n📊 Events in database:', events.length);
    
    if (events.length > 0) {
      console.log('\n📅 Event titles:');
      events.forEach((event, index) => {
        console.log(`${index + 1}. ${event.title} (${event.category})`);
      });
    } else {
      console.log('❌ No events found in database!');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

testEvents();
