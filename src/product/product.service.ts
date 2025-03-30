import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(data: { name: string }): Promise<Product> {
    const { name } = data;
    const existingProduct = await this.productModel.findOne({ name });
    if (
      existingProduct &&
      existingProduct.lastUpdated <
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ) {
      //make api call to use our own ai to test if the product is a scam
      const updatedProduct = await this.productModel.findOneAndUpdate(
        { name: existingProduct.name },
        //the changes to do after the api call:
        { lastUpdated: new Date() },
        { new: true },
      );
    } else if (existingProduct) {
      return existingProduct;
    } else {
      //make api call to use our own ai to test if the product is a scam
      //the changes to do after the api call:
      const newProduct = new this.productModel({
        name,
        ref: 'ref',
        isScam: false,
        lastUpdated: new Date(),
      });
      await newProduct.save();
    }
  }
}
