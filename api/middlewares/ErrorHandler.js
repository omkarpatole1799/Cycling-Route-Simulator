const ApiResponseJson = require('../utils/ApiResponseJson.js');

const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	console.log(err.msg, '==err.msg global error handler=================');

	const statusCode = err.statusCode || 500;

	return res
		.status(statusCode)
		.json(
			new ApiResponseJson(
				res,
				statusCode,
				false,
				'Server error',
				null,
				err.message || 'Server error'
			)
		);
};

module.exports = errorHandler;
