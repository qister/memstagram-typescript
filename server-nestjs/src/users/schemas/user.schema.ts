import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @ApiProperty({ example: 'test@test.com', description: 'почта' })
  @Prop({ type: String, required: true, unique: true })
  email: string

  @ApiProperty({ example: '123123', description: 'пароль' })
  @Prop({ type: String, required: true })
  password: string

  @ApiProperty({ example: 'myNickname', description: 'никнейм' })
  @Prop({ type: String, unique: true })
  nickname: string
}

export const UserSchema = SchemaFactory.createForClass(User)
