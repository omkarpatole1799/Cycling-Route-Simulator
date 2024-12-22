import L, { latLng } from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw.js';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import SavePolylineModal from './SavePolylineModal.tsx';
import UserRoutesList from './UserRoutesList.tsx';

import useHttp from '../hooks/useHttp.tsx';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
	const {
		isLoading: saveRouteLoading,
		data: saveRouteData,
		error: saveRouteError,
		sendRequest: saveRouteRequest,
	} = useHttp();

	const {
		isLoading: getSavedRoutesLoading,
		data: savedRoutesData,
		sendRequest: getSavedRoutesRequest,
	} = useHttp();

	const mapElRef = useRef(null);
	const mapInstance = useRef(null);
	const routeNameRef = useRef(null);

	const [savedRoutes, setSavedRoutes] = useState([]);

	const [showAddRouteModal, setShowAddRouteModal] = useState(false);

	const [tempRoute, setTempRoute] = useState({
		layer: null,
		latlng: null,
	});

	useEffect(() => {
		if (mapElRef.current) {
			mapInstance.current = L.map(mapElRef.current).setView(
				[52.505, -0.09],
				13
			);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
				mapInstance.current
			);

			const drawnItems = new L.FeatureGroup();

			mapInstance.current.addLayer(drawnItems);
			const drawControl = new L.Control.Draw({
				draw: {
					polygon: false,
					rectangle: false,
					circle: false,
					marker: false,
					circlemarker: false,
				},
				edit: {
					featureGroup: drawnItems,
				},
			});
			mapInstance.current.addControl(drawControl);

			mapInstance.current.on('draw:created', function (e) {
				const layer = e.layer;
				layer.setStyle({ color: 'blue', weight: 3 });
				const latlng = layer.getLatLngs();

				if (isPolyLineValid(latlng)) {
					mapInstance.current.addLayer(layer);
					setTempRoute(() => ({
						layer,
						latlng,
					}));
					setShowAddRouteModal(true);
				}
			});

			return () => {
				mapInstance.current.remove();
			};
		}
	}, []);

	const handleAddRoute = async () => {
		setShowAddRouteModal(false);

		console.log(routeNameRef.current.value, '==routeNameRef.current==');
		const requestData = {
			userId: 1,
			name: routeNameRef.current.value,
			geometry: {
				type: 'LineString',
				coordinates: tempRoute.latlng.map((_latlng) => [
					_latlng.lat,
					_latlng.lng,
				]),
			},
		};

		await saveRouteRequest(`${BACKEND_URL}/routes`, 'POST', requestData, {
			'Content-Type': 'application/json',
		});

		setTempRoute({ layer: null, latlng: null });
	};

	useEffect(() => {
		if (saveRouteData) {
			toast(saveRouteData.usrMsg);
			getAllRoutes();
		}
	}, [saveRouteData]);

	const handleCancelRoute = () => {
		setShowAddRouteModal(false);
		mapInstance.current.removeLayer(tempRoute.layer);
		setTempRoute({ layer: null, latlng: null });
	};

	function isPolyLineValid(latlng) {
		if (latlng.length < 2) {
			return false;
		}
		return true;
	}

	useEffect(() => {
		getAllRoutes();
	}, []);

	useEffect(() => {
		if (savedRoutesData) {
			setSavedRoutes(JSON.parse(savedRoutesData.data));
		}
	}, [savedRoutesData]);

	useEffect(() => {
		if (savedRoutes.length > 0) {
			drawSavedRoutes();
		}
	}, [savedRoutes]);

	async function getAllRoutes() {
		await getSavedRoutesRequest(`${BACKEND_URL}/routes`);
	}

	function drawSavedRoutes() {
		savedRoutes.forEach((route) => {
			const geometry = JSON.parse(route.geometry);
			const coordinates = geometry.coordinates.map(([lat, lng]) => [lat, lng]);

			L.polyline(coordinates, { color: 'blue', weight: 3 }).addTo(
				mapInstance.current
			);
		});
	}

	return (
		<>
			<div
				ref={mapElRef}
				className="w-full h-full"
				style={{ height: '95vh' }}
			></div>
			<SavePolylineModal
				routeNameRef={routeNameRef}
				handleAddRoute={handleAddRoute}
				handleCancelRoute={handleCancelRoute}
				setShowAddRouteModal={setShowAddRouteModal}
				showAddRouteModal={showAddRouteModal}
			></SavePolylineModal>

			{savedRoutes.length > 0 && <UserRoutesList savedRoutes={savedRoutes} />}
		</>
	);
}

export default Home;
