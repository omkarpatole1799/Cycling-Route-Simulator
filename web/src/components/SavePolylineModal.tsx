function SavePolylineModal({ handleCancelRoute, handleAddRoute, show }) {
	return (
		<div
			className={`p-4 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-md rounded-md ${
				!show ? 'opacity-0 pointer-events-none ' : ''
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
					/>
				</div>

				<div className="flex gap-2">
					<button
						className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={handleAddRoute}
					>
						Save Route
					</button>

					<button
						className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={handleCancelRoute}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

export default SavePolylineModal;
