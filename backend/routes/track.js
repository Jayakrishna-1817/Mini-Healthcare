const express = require('express');
const jwt = require('jsonwebtoken');
const Track = require('../models/Track');

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

router.post('/track', authenticateToken, async (req, res) => {
  try {
    const { painLevel, energyLevel, notes } = req.body;

    if (!painLevel || !energyLevel) {
      return res.status(400).json({ error: 'Pain level and energy level are required' });
    }

    if (painLevel < 1 || painLevel > 10 || energyLevel < 1 || energyLevel > 10) {
      return res.status(400).json({ error: 'Levels must be between 1 and 10' });
    }

    const track = new Track({
      userId: req.user.userId,
      painLevel: Number(painLevel),
      energyLevel: Number(energyLevel),
      notes: notes || ''
    });

    await track.save();

    res.status(201).json(track);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/track', authenticateToken, async (req, res) => {
  try {
    const tracks = await Track.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;