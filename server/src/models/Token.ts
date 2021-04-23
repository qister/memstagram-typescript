import { Schema, model, Document } from 'mongoose'

import { IUser } from './User'

const TokenSchema = new Schema({
  tokenId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
})

export interface IToken extends Document {
  tokenId: string
  userId: IUser['_id']
}

export const Token = model<IToken>('Token', TokenSchema)
