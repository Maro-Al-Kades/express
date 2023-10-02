const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema

const articleSchema = new SCHEMA({
  title: String,
  body: String,
  numberOfLikes: Number,
})

const Article = MONGOOSE.model("Article", articleSchema)

module.exports = Article