const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationcontroller.js');

// start simulation
router.post('/start');

// pause simulation
router.post('/pause');

// reset simulation
router.post('/reset');

module.exports = router;

// References:
// POST /api/simulate/start // Start simulation
// POST /api/simulate/pause // Pause simulation
// POST /api/simulate/reset // Reset simulation
