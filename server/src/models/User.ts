import { Schema, model, Types, Document } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // TODO вынести в отдельный эндпоинт
  // userMemes: [{ type: Types.ObjectId, ref: 'Meme' }],
})

export interface IUser extends Document {
  email: string
  password: string
}

export const User = model<IUser>('User', userSchema)
