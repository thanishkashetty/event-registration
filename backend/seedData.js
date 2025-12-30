const mongoose = require('mongoose');
const User = require('./models/User');
const Event = require('./models/Event');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890',
      department: 'Administration',
      year: 'N/A'
    });
    await admin.save();
    console.log('✅ Admin user created');

    // Create sample student
    const student = new User({
      name: 'John Student',
      email: 'student@example.com',
      password: 'student123',
      role: 'student',
      phone: '+0987654321',
      department: 'Computer Science',
      year: '3rd Year'
    });
    await student.save();
    console.log('✅ Student user created');

    // Create sample events
    const events = [
      {
        title: '🎤 Annual Music Festival 2024',
        description: 'Join us for the biggest music event of the year featuring top artists and bands from across the country.',
        date: new Date('2024-12-15'),
        time: '6:00 PM',
        venue: 'Main Auditorium',
        category: 'cultural',
        maxParticipants: 500,
        registrationFee: 100,
        rules: ['No outside food allowed', 'Age limit: 16+', 'Valid ID required'],
        createdBy: admin._id
      },
      {
        title: '💻 Tech Innovation Summit',
        description: 'Explore the latest trends in technology, AI, and innovation with industry experts and workshops.',
        date: new Date('2024-11-20'),
        time: '9:00 AM',
        venue: 'Tech Park Convention Center',
        category: 'technical',
        maxParticipants: 200,
        registrationFee: 50,
        rules: ['Laptop required for workshops', 'Registration mandatory'],
        createdBy: admin._id
      },
      {
        title: '⚽ Inter-College Sports Tournament',
        description: 'Annual sports competition featuring football, basketball, cricket and more. Show your sports spirit!',
        date: new Date('2024-10-25'),
        time: '8:00 AM',
        venue: 'University Sports Ground',
        category: 'sports',
        maxParticipants: 300,
        registrationFee: 0,
        rules: ['Sports attire required', 'Medical certificate needed'],
        createdBy: admin._id
      },
      {
        title: '🎨 Web Development Workshop',
        description: 'Hands-on workshop on modern web development technologies including React, Node.js and MongoDB.',
        date: new Date('2024-11-05'),
        time: '10:00 AM',
        venue: 'Computer Lab 301',
        category: 'workshop',
        maxParticipants: 50,
        registrationFee: 20,
        rules: ['Basic programming knowledge expected', 'Bring your own laptop'],
        createdBy: admin._id
      }
    ];

    for (const eventData of events) {
      const event = new Event(eventData);
      await event.save();
      console.log(`✅ Event created: ${event.title}`);
    }

    console.log('\n🎉 Sample data created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Student: student@example.com / student123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

seedData();