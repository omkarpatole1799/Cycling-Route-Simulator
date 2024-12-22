import Eye from '../assets/icons/Eye';
import Pencil from '../assets/icons/Pencil';
import Trash from '../assets/icons/Trash';

function UserRoutesList({ savedRoutes, handleDeleteRoute }) {
    console.log(savedRoutes);
    
	return (
		<div className="p-5 absolute h-[100vh] w-[20rem] bg-white shadow-xl top-0 right-0 overflow-auto">
			<h4 className="text-xl font-bold">My Routes</h4>

			{savedRoutes.length === 0 && <p className='mt-5'>No Routes Found.</p>}

			{savedRoutes &&
				savedRoutes.map((_route, _idx) => {
					return (
						<div
							key={_idx}
							className="mt-5 border-gray-300 rounded-md p-3 border shadow-sm hover:shadow-md transition-all duration-300 "
						>
							<h5 className="font-semibold">{_route.name} ({_route.distance.toFixed(2)} M)</h5>

							<div className="flex gap-3 mt-3">
								<Eye />
								<Pencil />
								<Trash onClick={handleDeleteRoute.bind(null, _route.id)} />
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default UserRoutesList;
