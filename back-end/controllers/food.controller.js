const FoodModel = require('../models/food.model');

const food_controller = {
  getAll: async (req, res) => {
    const { title } = req.query;
    let foods;
    if (title) foods = await FoodModel.find({ title: title });
    else foods = await FoodModel.find();

    if (foods.length > 0) {
      res.status(200).send({
        message: "success",
        data: foods,
      });
    } else {
      res.status(204).send({
        message: "not found",
        data: null,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    let food;
    try {
      food = await FoodModel.findById(id);
    } catch (error) {
      res.send({ error: error });
    }
    if (food) {
      res.status(200).send({
        message: "success",
        data: food,
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
      response = await FoodModel.findByIdAndDelete(id);
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
    const response = await FoodModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  },
  post: async (req, res) => {
    const food = new FoodModel(req.body);
    await food.save();
    res.send({
      message: "posted",
      data: food,
    });
  },
};

module.exports = food_controller;
