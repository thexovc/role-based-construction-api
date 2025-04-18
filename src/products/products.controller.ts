import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { Role } from '@prisma/client';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Roles(Role.VENDOR)
  async createProduct(
    @Body() data: { name: string; description: string; price: number },
    @Request() req,
  ) {
    return this.productsService.createProduct({
      ...data,
      vendorId: req.user.id,
    });
  }

  @Get()
  async getAllProducts(@Request() req) {
    // Buyers can see all products
    if (req.user.role === Role.BUYER) {
      return this.productsService.getProducts();
    }
    // Vendors can only see their own products
    else if (req.user.role === Role.VENDOR) {
      return this.productsService.getProductsByVendor(req.user.id);
    }
    // Riders shouldn't access products
    else {
      throw new ForbiddenException('Access denied');
    }
  }

  @Get('my-products')
  @Roles(Role.VENDOR)
  async getMyProducts(@Request() req) {
    return this.productsService.getProductsByVendor(req.user.id);
  }
}
