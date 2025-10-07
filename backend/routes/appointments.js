const express = require('express');
const jwt = require('jsonwebtoken');
const Appointment = require('../models/Appointment');

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'dev-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const generateTreatmentPlan = () => {
  const diagnoses = ['Migraine', 'Common Cold', 'Anxiety', 'Back Pain', 'Fatigue'];
  const medicines = [
    ['Medicine A', 'Medicine B'],
    ['Vitamin C', 'Rest medication'],
    ['Relaxation therapy', 'Mild sedative'],
    ['Pain relief', 'Anti-inflammatory'],
    ['Energy supplement', 'Vitamin B12']
  ];
  const advice = [
    'Drink more water, sleep early',
    'Rest well, stay hydrated',
    'Practice meditation, avoid stress',
    'Light exercise, proper posture',
    'Regular sleep schedule, balanced diet'
  ];

  const randomIndex = Math.floor(Math.random() * diagnoses.length);
  
  return {
    diagnosis: diagnoses[randomIndex],
    recommended_medicines: medicines[randomIndex],
    lifestyle_advice: advice[randomIndex]
  };
};

router.post('/appointment', authenticateToken, async (req, res) => {
  try {
    const { doctorName, date, time } = req.body;

    if (!doctorName || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const treatmentPlan = generateTreatmentPlan();

    const appointment = new Appointment({
      userId: req.user.userId,
      doctorName,
      date,
      time,
      treatmentPlan
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/appointments', authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;