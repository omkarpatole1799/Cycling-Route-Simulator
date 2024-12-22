const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationcontroller.js');

router.post('/start', simulationController._startSimulation);

router.post('/pause', simulationController.pauseSimulation);

router.post('/reset', simulationController.resetSimulation);

router.get('/status', simulationController.simulationStatus);

module.exports = router;
