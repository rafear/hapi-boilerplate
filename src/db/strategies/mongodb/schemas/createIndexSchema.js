const Mongoose = require('mongoose')

const createIndexSchema = new Mongoose.Schema({
  collection_name: {
    type: String,
    unique: false,
    required: true
  },
  bucket_name: {
    type: String,
    required: true
  },
  image_name: {
    type: String,
    required: true
  },
  face_external_id: {
    type: String,
    required: false
  },

  insertedAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = Mongoose.models.createIndex || Mongoose.model('createIndex', createIndexSchema)