const express = require('express');
const router = express.Router();

const doctors = [
  { id: 'd1', name: 'Dr. Alice Nguyen', specialty: 'Neurology' },
  { id: 'd2', name: 'Dr. Ben Carter', specialty: 'Internal Medicine' },
  { id: 'd3', name: 'Dr. Sara Patel', specialty: 'Family Medicine' }
];

router.get('/doctors', (req, res) => {
  res.json(doctors);
});

module.exports = router;