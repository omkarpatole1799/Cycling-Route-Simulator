const routesModel = require('../models/routesModel.js');
const ApiResponseJson = require('../utils/ApiResponseJson.js');
const routesController = {
	createNewRoute: async (req, res, next) => {
		try {
			const data = req.body;

			if (!data.userId || !data.name || !data.geometry) {
				return new ApiResponseJson(
					res,
					400,
					false,
					'Missing required fields (User Id, Name and Geometry).'
				);
			}
			const insertResponse = await routesModel.createRoute(data);
			return new ApiResponseJson(
				res,
				201,
				true,
				'Successfully saved route.',
				insertResponse?.rows[0]
			);
		} catch (error) {
			next(error);
		}
	},

	getRouteById: async (req, res, next) => {
		try {
			const id = req.params?.id;
			if (!id) {
				return new ApiResponseJson(
					res,
					400,
					false,
					'Please provide valid route id.'
				);
			}

			const route = await routesModel.getRouteById(id);
			if (route?.rows.length == 0) {
				return new ApiResponseJson(res, 400, false, 'No routes found.');
			}

			new ApiResponseJson(res, 200, true, 'Successful.', route.rows[0]);
		} catch (error) {
			next(error);
		}
	},

	updateRoute: async (req, res, next) => {
		try {
			const id = req.params?.id;
			if (!Number.isInteger(Number(id))) {
				return new ApiResponseJson(
					res,
					400,
					false,
					'Please provide valid route id.'
				);
			}

			const data = req.body;

			if (!data.name || !data.geometry) {
				return new ApiResponseJson(
					res,
					400,
					false,
					'Missing required fields (User Id, Name and Geometry).'
				);
			}

			const route = await routesModel.updateRoute(data, Number(id));

			if (route?.rows.length == 0) {
				return new ApiResponseJson(res, 400, false, 'No routes found.');
			}

			new ApiResponseJson(res, 201, true, 'Update successful.', route.rows[0]);
		} catch (error) {
			next(error);
		}
	},

	deleteRoute: async (req, res, next) => {
		try {
			const id = req.params?.id;
			if (!Number.isInteger(Number(id))) {
				return new ApiResponseJson(
					res,
					400,
					false,
					'Please provide valid route id.'
				);
			}

			const deleteResp = await routesModel.deleteRoute(id);

			console.log(deleteResp, '==deleteResp==');
			if (deleteResp?.rows.length === 0) {
				return new ApiResponseJson(res, 400, false, 'No routes found.');
			}

			new ApiResponseJson(
				res,
				200,
				true,
				'Delete successful.',
				deleteResp.rows[0]
			);
		} catch (error) {
			next(error);
		}
	},
};
module.exports = routesController;
