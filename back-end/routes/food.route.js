const express = require("express");
const food_router= express.Router();
const controller = require("../controllers/index.js");
food_router.get('/api/foods',controller.food.getAll)
food_router.get('/api/foods/:id',controller.food.getOne)
food_router.delete('/api/foods/:id',controller.food.delete)
food_router.patch('/api/foods/:id',controller.food.update)
food_router.post("/api/foods", controller.food.post); 

module.exports=food_router;