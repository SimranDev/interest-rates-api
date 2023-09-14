import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoanProductService {
  constructor(private prisma: PrismaService) {}

  getAllLoanProducts() {
    return this.prisma.loanProduct.findMany();
  }
}
