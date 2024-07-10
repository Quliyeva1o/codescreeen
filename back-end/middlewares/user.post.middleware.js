const UserSchemaValidation = require("../validations/User.validations.js");

const user_middleware = (req, res, next) => {
    const { error } = UserSchemaValidation.validate(req.body);
    if (!error) {
        next();
    }
    else {
        const { details } = error;
        res.send({
            message: details[0].message,
            error: true,
        });
    }
};

module.exports = user_middleware;