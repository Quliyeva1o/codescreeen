const mongoose = require("mongoose");
const ticketSchema = require('../schemas/ticket.schema');

const TicketModel = mongoose.model("Tickets", ticketSchema);

module.exports = TicketModel;