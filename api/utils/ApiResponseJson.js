class ApiResponseJson {
	constructor(
		res,
		statusCode,
		success,
		usrMsg,
		data = null,
		errMsg = null,
		respDataType = 'json'
	) {
		this.res = res;
		this.statusCode = statusCode;
		this.success = success;
		this.usrMsg = usrMsg;
		this.data = data ? JSON.stringify(data) : null;
		this.respDataType = respDataType;
		this.errMsg = errMsg;
		this.returnRes();
	}

	returnRes() {
		return this.res.status(this.statusCode).json({
			statusCode: this.statusCode,
			success: this.success,
			usrMsg: this.usrMsg,
			data: this.data,
			respDataType: this.respDataType,
			errMsg: this.errMsg,
		});
	}
}

module.exports = ApiResponseJson;
