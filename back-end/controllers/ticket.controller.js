const TicketModel = require('../models/ticket.model');

const ticket_controller = {
  getAll: async (req, res) => {
    const { title } = req.query;
    try {
      let tickets;
      if (title) {
        tickets = await TicketModel.find({ title: title });
      } else {
        tickets = await TicketModel.find();
      }

      if (tickets.length > 0) {
        res.status(200).send({
          message: "success",
          data: tickets,
        });
      } else {
        res.status(204).send({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },

  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const ticket = await TicketModel.findById(id);
      if (ticket) {
        res.status(200).send({
          message: "success",
          data: ticket,
        });
      } else {
        res.status(404).send({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TicketModel.findByIdAndDelete(id);
      if (response) {
        res.status(200).send({
          message: "deleted",
          response: response,
        });
      } else {
        res.status(404).send({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await TicketModel.findByIdAndUpdate(id, req.body);
      if (response) {
        res.status(200).send({
          message: "updated",
          response: response,
        });
      } else {
        res.status(404).send({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },

  post: async (req, res) => {
    const ticket = new TicketModel(req.body);
    try {
      await ticket.save();
      res.status(201).send({
        message: "posted",
        data: ticket,
      });
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },
};

module.exports = ticket_controller;
