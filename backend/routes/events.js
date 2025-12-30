const express = require('express');
const Event = require('../models/Event');
const { auth } = require('../middleware/auth');

const router = express.Router();
console.log('🗓️ Events routes loaded');

// Get all active events
router.get('/', auth, async (req, res) => {
  try {
    console.log('🔔 GET /api/events called by user:', req.user?._id);
    const events = await Event.find({ isActive: true })
      .populate('createdBy', 'name email')
      .sort({ date: 1 });
    
    res.json({
      success: true,
      data: events,
      count: events.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching events', 
      error: error.message 
    });
  }
});

// Get single event
router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: 'Event not found' 
      });
    }

    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching event', 
      error: error.message 
    });
  }
});

// Create event (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user._id
    });

    await event.save();
    
    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error while creating event', 
      error: error.message 
    });
  }
});

module.exports = router;