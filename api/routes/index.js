const express = require('express');
const router = express.Router();

const routesRouter = require('./routesRouter.js');
const simulationRouter = require('./simulationRouter.js');

router.use('/routes', routesRouter);

router.use('/simulation', simulationRouter);

module.exports = router;
