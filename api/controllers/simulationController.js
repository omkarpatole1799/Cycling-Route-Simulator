const { Observable } = require('rxjs');
let simulationInterval = null;
let simulationState = {
	isRunning: false,
	isPaused: false,
	currentStep: 0,
	route: [],
	totalSteps: 0,
};

const startSimulation = () => {
	return new Observable((observer) => {
		let step = 0;
		simulationInterval = setInterval(() => {
			if (simulationState.isPaused) {
				clearInterval(simulationInterval);
				return;
			}

			step++;
			if (step >= simulationState.totalSteps) {
				clearInterval(simulationInterval);
				simulationState.isRunning = false;
				simulationState.currentStep = simulationState.totalSteps - 1;
				observer.complete();
			} else {
				simulationState.currentStep = step;
				observer.next(simulationState.currentStep);
			}
		}, 1000);
	});
};

const simulationController = {
	_startSimulation: async (req, res, next) => {
		if (simulationState.isRunning) {
			return res.status(400).json({ message: 'Simulation already running' });
		}

		const { route } = req.body;
		simulationState.route = route;
		simulationState.totalSteps = route.length;
		simulationState.isRunning = true;
		simulationState.isPaused = false;
		simulationState.currentStep = 0;

		res.setHeader('Content-Type', 'application/json');
		res.flushHeaders();

		startSimulation().subscribe({
			next: (step) => {
				console.log(`Simulation step: ${step}`);
				res.send(step - 1);
			},
			complete: () => {
				res.end();
				console.log('Simulation completed.');
			},
		});
	},

	pauseSimulation: async (req, res, next) => {
		if (!simulationState.isRunning) {
			return res.status(400).json({ message: 'Simulation is not running' });
		}

		simulationState.isPaused = true;
		clearInterval(simulationInterval);
		res.status(200).json({ message: 'Simulation paused' });
	},

	resetSimulation: async (req, res, next) => {
		clearInterval(simulationInterval);
		simulationState = {
			isRunning: false,
			isPaused: false,
			currentStep: 0,
			route: [],
			totalSteps: 0,
		};
		res.status(200).json({ message: 'Simulation reset' });
	},

	simulationStatus: async (req, res, next) => {
		res.status(200).json({
			isRunning: simulationState.isRunning,
			currentStep: simulationState.currentStep,
		});
	},
};

module.exports = simulationController;
