import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/guard/roles.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Role } from '@prisma/client';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Roles(Role.VENDOR)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req,
  ) {
    return this.productsService.createProduct({
      ...createProductDto,
      vendorId: req.user.id,
    });
  }

  @Get()
  async getAllProducts(@Request() req, @Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    if (req.user.role === Role.BUYER) {
      return this.productsService.getProducts(page, limit);
    } else if (req.user.role === Role.VENDOR) {
      return this.productsService.getProductsByVendor(req.user.id, page, limit);
    } else {
      throw new ForbiddenException('Access denied');
    }
  }

  @Get('my-products')
  @Roles(Role.VENDOR)
  async getMyProducts(@Request() req, @Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.productsService.getProductsByVendor(req.user.id, page, limit);
  }
}
