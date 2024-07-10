const EventSchemaValidation = require("../validations/Event.validations.js");
const multer = require("multer");

const event_middleware = (req, res, next) => {
    const { error } = EventSchemaValidation.validate(req.body);
    if (!error) {
        next();
    } else {
        const { details } = error;
        res.status(400).send({
            message: details[0].message,
            error: true,
        });
    }
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = {
    event_middleware: event_middleware,
    upload: upload,
};
