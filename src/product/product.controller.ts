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
    return { message: 'Product saved successfully!', product };
  }
}
