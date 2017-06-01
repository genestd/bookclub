var mongoose = require('mongoose')
var Schema = mongoose.Schema

var Book = new Schema({
  title: String,
  author: String,
  coverImage: String,
  owner: String,
  available: Boolean,
  dueDate: Date,
  borrows: Number,
  borrowedBy: String
})

module.exports = mongoose.model("Book", Book)
