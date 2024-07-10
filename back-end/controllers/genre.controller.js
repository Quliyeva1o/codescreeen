const GenreModel = require('../models/genre.model');

const genre_controller = {
  getAll: async (req, res) => {
    const { title } = req.query;
    let genres;
    try {
      if (title) {
        genres = await GenreModel.find({ title: title });
      } else {
        genres = await GenreModel.find();
      }
      if (genres.length > 0) {
        res.status(200).send({
          message: "success",
          data: genres,
        });
      } else {
        res.status(204).send({
          message: "no content",
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
      const genre = await GenreModel.findById(id);
      if (genre) {
        res.status(200).send({
          message: "success",
          data: genre,
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
      const response = await GenreModel.findByIdAndDelete(id);
      if (response) {
        res.status(200).send({
          message: "deleted",
          data: response,
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
      const response = await GenreModel.findByIdAndUpdate(id, req.body, { new: true });
      if (response) {
        res.status(200).send({
          message: "updated",
          data: response,
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
    try {
      const genre = new GenreModel(req.body);
      await genre.save();
      res.status(201).send({
        message: "posted",
        data: genre,
      });
    } catch (error) {
      res.status(500).send({
        message: "error",
        error: error.message,
      });
    }
  },
};

module.exports = genre_controller;
