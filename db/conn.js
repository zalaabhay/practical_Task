const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/blogDB")
.then(() => console.log("Database Connected Successfully"))
.catch((err) => console.log("Error connecting db: ", err))

module.exports = mongoose