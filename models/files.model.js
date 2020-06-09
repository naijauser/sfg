const mongoose = require('mongoose');

let FilesSchema = new mongoose.Schema({
  fileName: {
   type: String,
   required: true
  }, 
  fileContent: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('file', FilesSchema)