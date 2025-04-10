/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

interface IADataResponse {
  scamResult: string;
  remark: string;
  stats: {
    total_ratings_across_products: number;
    overall_average_rating: number;
    products_analyzed: number;
  };
  images: string[];
}
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private configService: ConfigService,
  ) {}

  async createProduct(data: { name: string }): Promise<Product> {
    const { name } = data;
    const existingProduct = await this.productModel.findOne({ name });

    const IAApiUrl = `${this.configService.get<string>('AI_API_URL')}/analyze`;

    if (existingProduct) {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      if (existingProduct.lastUpdated >= oneWeekAgo) {
        return existingProduct;
      } else {
        const response = await axios.post(IAApiUrl, { product_name: name });
        const aiData: IADataResponse = response.data;

        const isScam =
          aiData.scamResult === 'pretty good product' || 
          aiData.scamResult === 'nothing special about it'
            ? false  
            : true;

        const updatedProduct = await this.productModel.findOneAndUpdate(
          { name },
          {
            isScam,
            remark : aiData.scamResult,
            stats: {
              total_reviews: aiData.stats.total_ratings_across_products,
              average_rating: aiData.stats.overall_average_rating,
            },
            images: aiData.images,
            lastUpdated: new Date(),
          },
          { new: true }, 
        );
        return updatedProduct;
      }
    } else {
      const response = await axios.post(IAApiUrl, { product_name: name });
      const aiData: IADataResponse = response.data;

      const isScam =
        aiData.scamResult === 'pretty good product' || 
        aiData.scamResult === 'nothing special about it'
          ? false
          : true;

      const newProduct = new this.productModel({
        name,
        ref: 'ref',
        isScam,
        remark : aiData.scamResult,
        stats: {
          total_reviews: aiData.stats.total_ratings_across_products,
          average_rating: aiData.stats.overall_average_rating,
        },
        images: aiData.images,
        lastUpdated: new Date(),
      });
      return await newProduct.save();
    }
  }
}