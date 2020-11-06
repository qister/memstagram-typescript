import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userMemes: [{ type: Types.ObjectId, ref: 'Meme' }],
})

module.exports = model('User', schema)
