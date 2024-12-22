const express = require('express');
const router = express.Router();

const routescontroller = require('../controllers/simulationcontroller.js');
const routesController = require('../controllers/routesController.js');

// creating new route
router.post('/', routesController.createNewRoute);

// getting all routes
router.get('/', routesController.getAllRoutes)

// getting route by id
router.get('/:id', routesController.getRouteById);

// update route
router.put('/:id', routesController.updateRoute);

// delete route
router.delete('/:id', routesController.deleteRoute);

module.exports = router;

// References:
// POST /api/routes // Create new route
// GET /api/routes/:id // Get route by ID
// PUT /api/routes/:id // Update route
// DELETE /api/routes/:id // Delete route
