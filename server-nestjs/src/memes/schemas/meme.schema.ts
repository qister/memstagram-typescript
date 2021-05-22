import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document, Schema as MongooseSchema } from 'mongoose'

export type MemeDocument = Meme & Document

@Schema()
export class Meme {
  @ApiProperty({
    example: '5fa1c20446d1b111d6add6ae',
    description: 'Айди автора',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  authorId: MongooseSchema.Types.ObjectId

  @ApiProperty({
    example: 'Хороший мем',
    description: 'Описание',
  })
  @Prop()
  description: string

  @ApiProperty({
    example: ['school', 'surrealistic'],
    description: 'Список категорий',
  })
  @Prop([String])
  categories: string[]

  @ApiProperty({
    example: 'public/memes/1621273960363-шт.jpg',
    description: 'Ссылка на картинку',
  })
  @Prop()
  imgUrl: string

  @ApiProperty({
    example: '2021-05-17T17:52:40.370Z',
    description: 'Дата создания',
  })
  @Prop()
  created: Date

  @ApiProperty({
    example: ['5fa1c20446d1b111d6add6ae'],
    description: 'Список айди лайкнувших юзеров',
  })
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  likedBy: MongooseSchema.Types.ObjectId[]
}

export const MemeSchema = SchemaFactory.createForClass(Meme)
