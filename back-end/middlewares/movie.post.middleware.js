const multer = require("multer");
const MovieSchemaValidation = require("../validations/Movie.validations");

const movie_middleware = (req, res, next) => {
  const { error } = MovieSchemaValidation.validate(req.body);
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
  movie_middleware: movie_middleware,
  upload: upload,
};
