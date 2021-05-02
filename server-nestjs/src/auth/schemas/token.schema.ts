import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ unique: true })
  tokenId: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
