import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoanProductService {
  constructor(private prisma: PrismaService) {}

  getLoanProducts() {
    return this.prisma.loanProduct.findMany();
  }
}
