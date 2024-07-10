const MovieModel = require("../models/movie.model.js");
const multer = require("multer");

const movie_controller = {
  getAll: async (req, res) => {
    try {
      const movies = await MovieModel.find();

      if (movies.length > 0) {
        res.status(200).json({
          message: "success",
          data: movies,
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const movie = await MovieModel.findById(id);
      if (movie) {
        res.status(200).json({
          message: "success",
          data: movie,
        });
      } else {
        res.status(204).json({
          message: "no content",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await MovieModel.findByIdAndDelete(id);
      if (response) {
        res.status(200).json({
          message: "deleted",
          response: response,
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const response = await MovieModel.findByIdAndUpdate(id, req.body);
      if (response) {
        res.status(200).json({
          message: "updated",
          response: response,
        });
      } else {
        res.status(404).json({
          message: "not found",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  post: async (req, res) => {
    try {
      const movie = new MovieModel(req.body);

      if (req.files && req.files.bgImg && req.files.coverImg) {
        const bgImgPath = "http://localhost:5050/uploads/" + req.files.bgImg[0].filename;
        const coverImgPath = "http://localhost:5050/uploads/" + req.files.coverImg[0].filename;
        movie.bgImg = bgImgPath;
        movie.coverImg = coverImgPath;
      }

      await movie.save();
      res.status(201).json({
        message: "posted",
        data: movie,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error.message,
      });
    }
  },
};

module.exports = movie_controller;
