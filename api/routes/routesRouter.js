const express = require('express');
const router = express.Router();

const routescontroller = require('../controllers/simulationcontroller.js');
const routesController = require('../controllers/routesController.js');

router.post('/', routesController.createNewRoute);

router.get('/', routesController.getAllRoutes);

router.get('/:id', routesController.getRouteById);

router.put('/:id', routesController.updateRoute);

router.delete('/:id', routesController.deleteRoute);

module.exports = router;
