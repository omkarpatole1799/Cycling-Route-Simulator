import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw.js';
import SavePolylineModal from './SavePolylineModal.tsx';

function Home() {
	const mapElRef = useRef(null);
	const mapInstance = useRef(null);

	const [routes, setRoutes] = useState([]);
	const [showAddRouteModal, setShowAddRouteModal] = useState(false);
	const [tempRoute, setTempRoute] = useState([]);

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
				const latlng = layer.getLatLngs();
				handleAddRoute(layer, latlng);
			});

			return () => {
				mapInstance.current.remove();
			};
		}
	}, []);

	console.log(routes, '==routes==');

	const handleAddRoute = (layer, latlng) => {
		if (isPolyLineValid(latlng)) {
			setRoutes((prev) => {
				return [...prev, latlng];
			});
			mapInstance.current.addLayer(layer);
		}
	};

	const handleCancelRoute = () => {
		setShowAddRouteModal(false);
	};

	function isPolyLineValid(latlng) {
		if (latlng.length < 2) {
			return false;
		}
		return true;
	}

	return (
		<>
			<div
				ref={mapElRef}
				className="w-full h-full"
				style={{ height: '100vh' }}
			></div>

			<SavePolylineModal
				setShowAddRouteModal={setShowAddRouteModal}
				showAddRouteModal={showAddRouteModal}
			></SavePolylineModal>
		</>
	);
}

export default Home;
