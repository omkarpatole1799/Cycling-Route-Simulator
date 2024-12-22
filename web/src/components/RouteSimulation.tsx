import axios from 'axios';
import L from 'leaflet';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Observable } from 'rxjs';

const BACKEND_URL = 'http://localhost:3000/api';

const RouteSimulation = ({ routeGeoJSON, mapInstance, setSelectedRoute }) => {
	const [simulationRunning, setSimulationRunning] = useState(false);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [marker, setMarker] = useState(null);
	const [isSimulationPaused, setSimulationPaused] = useState(false);

	const routeCoordinates = routeGeoJSON.coordinates.map(([lat, lng]) => [
		lat,
		lng,
	]);

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

	const observeSimulationProgress = useCallback(() => {
		return new Observable((observer) => {
			const interval = setInterval(async () => {
				if (simulationRunning && !isSimulationPaused) {
					try {
						const response = await axios.get(
							`${BACKEND_URL}/simulation/status`
						);
						const data = response.data;

						if (!data.isRunning) {
							clearInterval(interval);
							observer.complete();
						} else {
							observer.next(data.currentStep);
						}
					} catch (error) {
						console.error('Error fetching simulation status:', error);
						observer.complete();
					}
				} else {
					clearInterval(interval);
					observer.complete();
				}
			}, 300);
		});
	}, [simulationRunning, isSimulationPaused]);

	const startSimulation = async () => {
		try {
			const response = await axios.post(`${BACKEND_URL}/simulation/start`, {
				route: routeCoordinates,
			});
			if (response.status === 200) {
				toast('Starting simulation.');
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
				toast('Paused simulation.');
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
					mapInstance.setView(routeCoordinates[0], mapInstance.getZoom());
				}
			} else {
				toast('Failed to reset simulation');
			}
		} catch (error) {
			toast('Failed to reset simulation');
		}
	};

	useEffect(() => {
		let subscription;
		if (simulationRunning && !isSimulationPaused) {
			subscription = observeSimulationProgress().subscribe({
				next: (step) => {
					console.log(step, '==step');
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
			<div className="simulation-controls flex gap-2 absolute flex-col left-2 top-[11rem]">
				<button
					type="button"
					className=" inline-flex items-center px-1 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={startSimulation}
					disabled={simulationRunning}
				>
					<span>Start</span>
				</button>

				{!isSimulationPaused && simulationRunning && (
					<button
						type="button"
						className=" inline-flex items-center px-1 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={pauseSimulation}
					>
						<span>Pause</span>
					</button>
				)}

				<button
					type="button"
					className=" inline-flex items-center px-1 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={resetSimulation}
					disabled={simulationRunning}
				>
					<span>Reset</span>
				</button>

				<button
					type="button"
					className=" inline-flex items-center px-1 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					onClick={() => {
						setSelectedRoute(null);
						if (marker) {
							marker.remove();
						}
					}}
				>
					<span>Cancel</span>
				</button>
			</div>
		</div>
	);
};

export default RouteSimulation;
