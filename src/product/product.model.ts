import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ref: string;

  @Prop({ required: true })
  remark: string;

  @Prop({ required: true })
  isScam: boolean;

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date;

  @Prop({ type: { total_reviews: Number, average_rating: Number }, default: { total_reviews: 0, average_rating: 0 } })
  stats: {
    total_reviews: number;
    average_rating: number;
  };

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);