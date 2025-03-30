import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ref: string;

  @Prop({ required: true })
  isScam: boolean;

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
