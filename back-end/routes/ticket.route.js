const express = require("express");
const ticket_router = express.Router();
const controller = require("../controllers/index");

ticket_router.get("/api/tickets",controller.ticket.getAll);
ticket_router.get("/api/tickets/:id",controller.ticket.getOne);
ticket_router.delete("/api/tickets/:id", controller.ticket.delete);
ticket_router.patch("/api/tickets/:id", controller.ticket.update);
ticket_router.post("/api/tickets", controller.ticket.post);


module.exports = ticket_router;
