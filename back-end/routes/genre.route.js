const express = require("express");
const genre_router = express.Router();
const controller = require("../controllers/index");

genre_router.get("/api/genres", controller.genre.getAll);
genre_router.get("/api/genres/:id",controller.genre.getOne);
genre_router.delete("/api/genres/:id", controller.genre.delete);
genre_router.patch("/api/genres/:id", controller.genre.update);
genre_router.post("/api/genres", controller.genre.post);


module.exports = genre_router;
