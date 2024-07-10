const TimeModel = require('../models/time.model');

const time_controller = {
  getAll: async (req, res) => {
    const { title } = req.query;
    try {
      let times;
      if (title) {
        times = await TimeModel.find({ title: title });
      } else {
        times = await TimeModel.find();
      }

      if (times.length > 0) {
        res.status(200).send({
          message: "success",
          data: times,
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
      const time = await TimeModel.findById(id);
      if (time) {
        res.status(200).send({
          message: "success",
          data: time,
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
      const response = await TimeModel.findByIdAndDelete(id);
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
      const response = await TimeModel.findByIdAndUpdate(id, req.body);
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
    const time = new TimeModel(req.body);
    try {
      await time.save();
      res.status(201).send({
        message: "posted",
        data: time,
      });
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },
};

module.exports = time_controller;
