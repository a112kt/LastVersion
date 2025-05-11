const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
});


router.post('/', async (req, res) => {
  try {
    const { rate, comment } = req.body;
    const newFeedback = new Feedback({ rate, comment });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ message: 'Error adding feedback' });
  }
});

module.exports = router;


