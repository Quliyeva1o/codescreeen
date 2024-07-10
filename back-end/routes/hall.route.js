const express = require("express");
const hall_router = express.Router();
const controller = require("../controllers/index.js")
const upload = require("../middlewares/movie.post.middleware.js").upload;

hall_router.get('/api/halls', controller.hall.getAll)
hall_router.get('/api/halls/:id', controller.hall.getOne)
hall_router.delete('/api/halls/:id', controller.hall.delete)
hall_router.patch('/api/halls/:id', controller.hall.update)
hall_router.post('/api/halls',  upload.fields([{ name: "img", maxCount: 1 }, { name: "coverImg", maxCount: 1 }]), controller.hall.post)

module.exports = hall_router; 