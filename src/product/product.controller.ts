import { Controller, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async isProductScam(@Body() body: { name: string }) {
    const { name } = body;
    console.log(name);
    const product = await this.productService.createProduct(body);
    return {
      message: 'Product processed successfully!',
      product: {
        name: product.name,
        isScam: product.isScam,
        remark : product.remark,
        stats: product.stats,
        images: product.images,
        lastUpdated: product.lastUpdated,
      },
    };
  }
}