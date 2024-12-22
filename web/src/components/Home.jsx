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

	const {
		isLoading: deleteRouteLoading,
		data: deleteRouteData,
		sendRequest: deleteRouteRequest,
	} = useHttp();

	const mapElRef = useRef(null);
	const mapInstance = useRef(null);
	const polyLinesref = useRef([]);
	const routeNameRef = useRef(null);
	const deleteRouteRef = useRef(null);

	const [savedRoutes, setSavedRoutes] = useState([]);

	const [showAddRouteModal, setShowAddRouteModal] = useState(false);

	const [tempRoute, setTempRoute] = useState({
		layer: null,
		latlng: null,
		polyline: null,
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
					const polyline = L.polyline(latlng).addTo(mapInstance.current);
					setTempRoute(() => ({
						layer,
						latlng,
						polyline: polyline,
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
	};

	useEffect(() => {
		if (saveRouteData) {
			toast(saveRouteData.usrMsg);
			const newRoute = JSON.parse(saveRouteData.data);
			const updatedRoutes = [...savedRoutes, newRoute];
			setSavedRoutes(updatedRoutes);
			mapInstance.current.removeLayer(tempRoute.polyline);
			setTempRoute({ layer: null, latlng: null, polyline: null });
		}
	}, [saveRouteData]);

	const handleCancelRoute = () => {
		setShowAddRouteModal(false);
		mapInstance.current.removeLayer(tempRoute.layer);
		setTempRoute({ layer: null, latlng: null, polyline: null });
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
		drawSavedRoutes();
	}, [savedRoutes]);

	async function getAllRoutes() {
		await getSavedRoutesRequest(`${BACKEND_URL}/routes`);
	}

	function drawSavedRoutes() {
		polyLinesref.current.forEach((polyline) => {
			mapInstance.current.removeLayer(polyline);
		});
		polyLinesref.current = [];
		const polylines = [];
		savedRoutes.forEach((route) => {
			const geometry = JSON.parse(route.geometry);
			const coordinates = geometry.coordinates.map(([lat, lng]) => [lat, lng]);

			const polyline = L.polyline(coordinates, {
				color: 'blue',
				weight: 3,
			}).addTo(mapInstance.current);

			polyLinesref.current.push(polyline);
		});
	}

	// =================================== deleting route =============================
	async function handleDeleteRoute(id) {
		if (!id) {
			toast('Please provide valid delete id.');
			return false;
		}
		deleteRouteRef.current = id;
		await deleteRouteRequest(`${BACKEND_URL}/routes/${Number(id)}`, 'DELETE');
	}
	function removeRouteLine(id) {
		const routeToRemove = savedRoutes.filter((_route) => _route.id === id);
		console.log(routeToRemove, '==routeToRemove==');
		mapInstance.current.removeLayer(routeToRemove[0]);
	}

	useEffect(() => {
		if (deleteRouteData) {
			toast(deleteRouteData.usrMsg);
			const updatedRoutes = savedRoutes.filter(
				(_route) => _route.id !== deleteRouteRef.current
			);
			setSavedRoutes(updatedRoutes);
			removeRouteLine(deleteRouteRef.current);
		}
	}, [deleteRouteData]);

	// ======================================= view/pan toward routes =================================

	function handlePan(id) {
		const panRoute = savedRoutes.find((_route) => {
			if (_route.id === id) {
				return _route;
			}
		});

		const panRouteCoordinates = JSON.parse(panRoute.geometry).coordinates;
		mapInstance.current.panTo(panRouteCoordinates[0]);
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

			<UserRoutesList
				savedRoutes={savedRoutes}
				handleDeleteRoute={handleDeleteRoute}
				handlePan={handlePan}
			/>
		</>
	);
}

export default Home;
