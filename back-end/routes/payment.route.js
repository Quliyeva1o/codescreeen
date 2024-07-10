const express = require("express")
const controller = require("../controllers")
const payment_router = express.Router()


payment_router.post("/api/payment", controller.payment.payment)


module.exports = payment_router