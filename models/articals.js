const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
  }, { timestamps: true });
  

  const artical = mongoose.model("Artical", articleSchema);

  module.exports = artical;