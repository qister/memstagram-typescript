import { Schema, model, Document } from 'mongoose'

import { IUser } from './User'

const memeSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true, unique: true },
  created: { type: Date, required: true },
  likedBy: [Schema.Types.ObjectId],
})

// TODO когда можно будет использовать импорты и экспорты прописать типы на бэке
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
// https://tomanagle.medium.com/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
export interface IMeme extends Document {
  authorId: IUser['_id']
  description: string
  imgUrl: string
  created: Date
  likedBy: Array<IUser['_id']>
  // TODO мб сделать другой интерфейс и расширить его вычисляемыми типами типа liked
  liked?: boolean
}

export const Meme = model<IMeme>('Meme', memeSchema)
