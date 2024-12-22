import Loading from '../assets/icons/Loading';

function SavePolylineModal({
	handleCancelRoute,
	handleAddRoute,
	showAddRouteModal,
	routeNameRef,
	saveRouteLoading,
}) {
	return (
		<div
			className={`p-4 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-md rounded-md ${
				!showAddRouteModal ? 'opacity-0 pointer-events-none ' : ''
			}`}
		>
			<div className="flex items-center justify-center flex-col gap-2">
				<div className="mt-1">
					<input
						type="email"
						name="email"
						id="email"
						className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md p-3"
						placeholder="Enter route name"
						ref={routeNameRef}
					/>
				</div>

				<div className="flex gap-2">
					<button
						className={`w-[100%] px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
						onClick={handleAddRoute}
						disabled={saveRouteLoading}
					>
						{saveRouteLoading && <Loading />}
						{!saveRouteLoading && <span>Save Route</span>}
					</button>

					<button
						className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={handleCancelRoute}
						disabled={saveRouteLoading}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default SavePolylineModal;
