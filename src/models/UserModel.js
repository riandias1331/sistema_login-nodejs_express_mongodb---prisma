const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  // user: {
  //     type: String,
  //     required: true
  // },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('database', UserSchema)

module.exports = User

