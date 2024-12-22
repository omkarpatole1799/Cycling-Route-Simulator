import { useState } from 'react';
import { toast } from 'react-toastify';
import Clock from '../assets/icons/Clock';
import Distance from '../assets/icons/Distance';
import Eye from '../assets/icons/Eye';
import Trash from '../assets/icons/Trash';

function UserRoutesList({
	savedRoutes,
	handleDeleteRoute,
	handlePan,
	setShowSavedRoutesMenu,
	showSavedRoutesMenu,
}) {
	const [speed, setSpeed] = useState('20');

	const handleSpeedChange = (e) => {
		let newSpeed = e.target.value;

		if (newSpeed === '' || isNaN(newSpeed)) {
			setSpeed('');
			return;
		}

		newSpeed = Number(newSpeed);
		if (newSpeed < 1) {
			toast('Speed cannot be less than 1 Km/hr.');
			setSpeed('');
			e.target.select();
		} else if (newSpeed > 80) {
			toast('Speed cannot be greater than 80 Km/hr');
			setSpeed('80');
			e.target.select();
		} else {
			setSpeed(newSpeed);
		}
	};

	function calculateTime(distance) {
		const time = Number(distance) / Number(speed);
		return time.toFixed(2);
	}

	return (
		<div
			className={`p-5 absolute h-[100vh] w-[20rem] bg-white shadow-xl top-0 right-0 overflow-auto ${
				showSavedRoutesMenu
					? 'opacity-1 pointer-events-auto visible'
					: 'opacity-0 pointer-events-none invisible'
			}`}
		>
			<h4 className="text-xl font-bold mb-3">My Routes</h4>
			<label htmlFor="my-speed" className="font-semibold">
				Speed (Km/hr)
			</label>
			<input
				type="number"
				name="speed"
				id="my-speed"
				className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md p-3"
				placeholder="Enter your speed."
				value={speed}
				onChange={handleSpeedChange}
			/>

			{savedRoutes.length === 0 && <p className="mt-5">No Routes Found.</p>}

			{savedRoutes &&
				savedRoutes.map((_route, _idx) => {
					return (
						<div
							key={_idx}
							className="mt-5 border-gray-300 rounded-md p-3 border shadow-sm hover:shadow-md transition-all duration-300 "
						>
							<div className="flex justify-between">
								<h5 className="font-semibold">{_route.name}</h5>

								<div className="flex flex-col items-end ">
									<span className="text-xs mb-0 inline-flex items-center gap-1">
										<Distance /> {_route.distance.toFixed(2)} Meter
									</span>
									<span className="text-xs mb-0 inline-flex items-center gap-1">
										<Clock /> {calculateTime(_route.distance)} Min
									</span>
								</div>
							</div>

							<div className="flex gap-3 mt-3">
								<Eye onClick={handlePan.bind(null, _route.id)} />
								{/* <Pencil /> */}
								<Trash onClick={handleDeleteRoute.bind(null, _route.id)} />
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default UserRoutesList;
