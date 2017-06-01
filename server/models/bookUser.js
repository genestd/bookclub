var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema

var BookUser = new Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  name: String,
  city: String,
  state: String
})

BookUser.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
BookUser.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("BookUser", BookUser)
