const AppError = require("./appError");

module.exports = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(
			new AppError(
				"Something when wrong in req query. Please try again!!!",
				400
			)
		);
	};
};
