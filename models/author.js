const mongoose = require('mongoose')

// like a table
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})
// name of table inside database
module.exports = mongoose.model('Author', authorSchema)