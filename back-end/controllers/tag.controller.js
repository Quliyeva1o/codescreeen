const TagModel = require('../models/tag.model');

const tag_controller = {
  getAll: async (req, res) => {
    const { title } = req.query;
    let tags;
    if (title) tags = await TagModel.find({ title: title });
    else tags = await TagModel.find();

    if (tags.length > 0) {
      res.status(200).send({
        message: "success",
        data: tags,
      });
    } else {
      res.status(204).send({
        message: "not found",
        data: null,
      });
    }
  },
   getOne : async (req, res) => {
    try {
      // Example asynchronous operation (fetching data from database)
      const tagId = req.params.id;
      const tag = await tag.findById(tagId);
  
      if (!tag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
  
      // Only send response once
      res.json({ title: tag.title });
    } catch (err) {
      console.error('Error in getOne:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  delete: async (req, res) => {
    const { id } = req.params;
    let response;
    try {
      response = await TagModel.findByIdAndDelete(id);
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
    const response = await TagModel.findByIdAndUpdate(id, req.body);
    res.send({
      message: "updated",
      response: response,
    });
  },
  post: async (req, res) => {
    const tag = new TagModel(req.body);
    await tag.save();
    res.send({
      message: "posted",
      data: tag,
    });
  },
};

module.exports = tag_controller;
