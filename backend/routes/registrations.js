const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register for event
router.post('/', auth, async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event || !event.isActive) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found or inactive' 
      });
    }

    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ 
        success: false, 
        message: 'Event is full' 
      });
    }

    // Check if already registered
    const existingRegistration = await Registration.findOne({
      student: req.user._id,
      event: eventId
    });

    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: 'Already registered for this event' 
      });
    }

    // Create registration
    const registration = new Registration({
      student: req.user._id,
      event: eventId
    });

    await registration.save();

    // Update event participant count
    await Event.findByIdAndUpdate(eventId, {
      $inc: { currentParticipants: 1 }
    });

    // Populate the response with event details
    const populatedRegistration = await Registration.findById(registration._id)
      .populate('event')
      .populate('student', 'name email');

    res.status(201).json({
      success: true,
      data: populatedRegistration,
      message: 'Successfully registered for the event'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error during registration', 
      error: error.message 
    });
  }
});

// Get user's registrations
router.get('/my-registrations', auth, async (req, res) => {
  try {
    const registrations = await Registration.find({ student: req.user._id })
      .populate('event')
      .sort({ registrationDate: -1 });

    res.json({
      success: true,
      data: registrations,
      count: registrations.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching registrations', 
      error: error.message 
    });
  }
});

// Cancel registration
router.delete('/:id', auth, async (req, res) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      student: req.user._id
    }).populate('event');

    if (!registration) {
      return res.status(404).json({ 
        success: false,
        message: 'Registration not found' 
      });
    }

    // Update event participant count
    await Event.findByIdAndUpdate(registration.event._id, {
      $inc: { currentParticipants: -1 }
    });

    await Registration.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Registration cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Server error while cancelling registration', 
      error: error.message 
    });
  }
});

module.exports = router;