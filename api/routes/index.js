const express = require('express');
const router = express.Router();

const routesRouter = require('./routesRouter.js');
const simulationRouter = require('./simulationRouter.js');

// routes
router.use('/routes', routesRouter);

// simulation
router.use('/simulation', simulationRouter);

module.exports = router;
