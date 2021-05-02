import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MemeDocument = Meme & Document;

@Schema()
export class Meme {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  authorId: MongooseSchema.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  imgUrl: string;

  @Prop()
  created: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  likedBy: MongooseSchema.Types.ObjectId[];
}

export const MemeSchema = SchemaFactory.createForClass(Meme);
