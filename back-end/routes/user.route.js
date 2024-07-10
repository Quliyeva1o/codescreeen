const express = require("express");
const user_router = express.Router();
const controller = require("../controllers/index");
const authenticateToken = require("../middlewares/authenticate_token");

user_router.get("/api/users", controller.user.getAll);
user_router.get("/api/users/:id", controller.user.getOne);
user_router.delete("/api/users/:id", controller.user.delete);
user_router.patch("/api/users/:id", controller.user.update);
user_router.post("/api/users", controller.user.register); 
user_router.post("/login", controller.user.user_login);
user_router.get("/api/verify/:token", controller.user.verify);

module.exports = user_router;
