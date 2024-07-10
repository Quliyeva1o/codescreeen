const EventModel = require("../models/event.model.js");

const event_controller = {
  getAll: async (req, res) => {
    const events = await EventModel.find();

    if (events.length > 0) {
      res.status(200).send({
        message: "success",
        data: events,
      });
    } else {
      res.send({
        message: "not found",
        data: null,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    let event;
    try {
      event = await EventModel.findById(id);
    } catch (error) {
      res.send({ error: error });
    }
    if (event) {
      res.status(200).send({
        message: "success",
        data: event,
      });
    } else {
      res.send({
        message: "no content",
        data: null,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    let response;
    try {
      response = await EventModel.findByIdAndDelete(id);
    } catch (error) {
      res.send({
        error: error,
      });
    }
    res.send({
      message: "deleted",
      response: response,
    });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const response = await EventModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  },
 
  post: async (req, res) => {
    try {
      const event = new EventModel(req.body);
      console.log(req.files);
      if (req.files &&req.files.img && req.files.coverImg) {
        event.img = "http://localhost:5050/uploads/" + req.files.img[0].filename;
        event.coverImg = "http://localhost:5050/uploads/" + req.files.coverImg[0].filename;
      }
      await event.save();
      res.status(201).json({
        message: "posted",
        data: event,
      });  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = event_controller;
