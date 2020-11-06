import { Schema, model } from 'mongoose'

const memeSchema = new Schema({
  id: Number,
  author: String,
  description: String,
  imgUrl: String,
  liked: Boolean,
  created: Date,
  likedBy: Array,
})

module.exports = model('Meme', memeSchema)
