const HallSchemaValidation = require("../validations/Hall.validations.js");
const multer = require("multer");

const hall_middleware = (req, res, next) => {
    const { error } = HallSchemaValidation.validate(req.body);
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
  hall_middleware: hall_middleware,
  upload: upload,
};
