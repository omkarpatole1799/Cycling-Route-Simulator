import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Observable } from 'rxjs';
import { toast } from 'react-toastify';
import L from 'leaflet';

const BACKEND_URL = 'http://localhost:3000/api'; // Update with the correct backend URL

const RouteSimulation = ({ routeGeoJSON, mapInstance }) => {
	const [simulationRunning, setSimulationRunning] = useState(false);
	const [currentPosition, setCurrentPosition] = useState(0); // Position on the route (0 to 1)
	const [marker, setMarker] = useState(null);
	const [isSimulationPaused, setSimulationPaused] = useState(false);

	const routeCoordinates = routeGeoJSON.coordinates.map(([lat, lng]) => [
		lat,
		lng,
	]);

	// Initialize marker only once
	useEffect(() => {
		if (mapInstance) {
			if (marker) {
				marker.remove();
			}
			const initialMarker = L.marker(routeCoordinates[0]).addTo(mapInstance);
			setMarker(initialMarker);

			return () => {
				if (marker) {
					marker.remove();
				}
			};
		}
	}, [routeGeoJSON]);

	// This function will subscribe to the backend simulation progress and return the observable
	const observeSimulationProgress = useCallback(() => {
		return new Observable((observer) => {
			const interval = setInterval(async () => {
				if (simulationRunning && !isSimulationPaused) {
					try {
						const response = await axios.get(
							`${BACKEND_URL}/simulation/status`
						);
						const data = response.data;

						// If simulation is not running, stop the interval
						if (!data.isRunning) {
							clearInterval(interval);
							observer.complete(); // Complete only when simulation is done
						} else {
							observer.next(data.currentStep); // Emit current step
						}
					} catch (error) {
						console.error('Error fetching simulation status:', error);
						observer.complete(); // Make sure to complete the observable in case of an error
					}
				} else {
					clearInterval(interval);
					observer.complete(); // Ensure completion if simulation is paused or stopped
				}
			}, 1000);
		});
	}, [simulationRunning, isSimulationPaused]);

	// Handle the simulation control (start, pause, reset)
	const startSimulation = async () => {
		try {
			const response = await axios.post(`${BACKEND_URL}/simulation/start`, {
				route: routeCoordinates,
			});
			if (response.status === 200) {
				toast('Starting simulation.')
				setSimulationRunning(true);
				setSimulationPaused(false);
			} else {
				console.error('Failed to start simulation');
			}
		} catch (error) {
			console.error('Error starting simulation:', error);
		}
	};

	const pauseSimulation = async () => {
		try {
			const response = await axios.post(`${BACKEND_URL}/simulation/pause`);
			if (response.status === 200) {
				setSimulationRunning(false);
				setSimulationPaused(true);
			} else {
				console.error('Failed to pause simulation');
			}
		} catch (error) {
			console.error('Error pausing simulation:', error);
		}
	};

	const resetSimulation = async () => {
		try {
			const response = await axios.post(`${BACKEND_URL}/simulation/reset`);
			if (response.status === 200) {
				setSimulationRunning(false);
				setSimulationPaused(false);
				setCurrentPosition(0);
				if (marker) {
					marker.setLatLng(routeCoordinates[0]);
				}
			} else {
				toast('Failed to reset simulation');
			}
		} catch (error) {
			toast('Failed to reset simulation');
		}
	};

	// Subscribe to the simulation progress
	useEffect(() => {
		let subscription;
		if (simulationRunning && !isSimulationPaused) {
			subscription = observeSimulationProgress().subscribe({
				next: (step) => {
					const nextPosition = routeCoordinates[step];

					if (marker) {
						marker.setLatLng(nextPosition);
						mapInstance.setView(nextPosition, mapInstance.getZoom());
					}
				},
				complete: () => {
					setSimulationRunning(false);
					toast('Simulation Complete.');
					console.log('Simulation complete.');
				},
			});
		}

		return () => {
			if (subscription) {
				subscription.unsubscribe();
			}
		};
	}, [
		simulationRunning,
		isSimulationPaused,
		observeSimulationProgress,
		routeCoordinates,
		marker,
		mapInstance,
	]);

	return (
		<div>
			<div className="simulation-controls flex gap-2">
				<button onClick={startSimulation} disabled={simulationRunning}>
					Start
				</button>
				<button onClick={pauseSimulation} disabled={!simulationRunning}>
					Pause
				</button>
				<button onClick={resetSimulation} disabled={simulationRunning}>
					Reset
				</button>
			</div>
		</div>
	);
};

export default RouteSimulation;
