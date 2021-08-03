import { Schema, model, Document } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  avatar: { type: String, required: false },
  // TODO вынести в отдельный эндпоинт
  // userMemes: [{ type: Types.ObjectId, ref: 'Meme' }],
})

export interface IUser extends Document {
  email: string
  password: string
  nickname: string
  avatar: string
}

export const User = model<IUser>('User', userSchema)
