const express = require("express");
const event_router = express.Router();
const event_middleware = require("../middlewares/event.post.middleware.js").event_middleware;
const upload = require("../middlewares/event.post.middleware.js").upload;
const controller = require("../controllers/index.js");

event_router.get('/api/events', controller.event.getAll);
event_router.get('/api/events/:id', controller.event.getOne);
event_router.delete('/api/events/:id', controller.event.delete);
event_router.patch('/api/events/:id', controller.event.update);
event_router.post('/api/events',  upload.fields([{ name: "img", maxCount: 1 }, { name: "coverImg", maxCount: 1 }]), event_middleware, controller.event.post);

module.exports = event_router;
  