import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    vendorId: string;
  }) {
    return this.prisma.product.create({
      data,
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async getProducts() {
    return this.prisma.product.findMany({
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async getProductsByVendor(vendorId: string) {
    return this.prisma.product.findMany({
      where: {
        vendorId,
      },
      include: {
        vendor: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
