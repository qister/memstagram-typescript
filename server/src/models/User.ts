import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // TODO вынести в отдельный эндпоинт
  // userMemes: [{ type: Types.ObjectId, ref: 'Meme' }],
})

module.exports = model('User', schema)
