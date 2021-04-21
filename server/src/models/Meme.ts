import { Schema, model, Document } from 'mongoose'

const memeSchema = new Schema({
  authorId: Schema.Types.ObjectId,
  description: String,
  imgUrl: String,
  liked: Boolean,
  created: Date,
  likedBy: [Schema.Types.ObjectId],
})

// TODO когда можно будет использовать импорты и экспорты прописать типы на бэке
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
export interface IMeme extends Document {
  authorId: Schema.Types.ObjectId
  description: string
  imgUrl: string
  liked: boolean
  created: Date
  likedBy: Schema.Types.ObjectId[]
}

module.exports = model('Meme', memeSchema)
