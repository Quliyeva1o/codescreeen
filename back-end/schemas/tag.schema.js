const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    title: String,
    MovieIds: Array,
  },
  { timestamps: true, versionKey: false }
);

module.exports = tagSchema;
