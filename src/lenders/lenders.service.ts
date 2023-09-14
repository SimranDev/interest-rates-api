import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LendersService {
  constructor(private prisma: PrismaService) {}

  getLenders() {
    return this.prisma.lender.findMany();
  }

  getLenderProducts() {
    return this.prisma.lender.findMany({
      include: { loanProducts: true },
    });
  }

  async getLenderByIdentifier(identifier: string) {
    const lender = await this.prisma.lender.findUnique({
      where: { identifier },
      include: { loanProducts: true },
    });

    if (!lender) {
      throw new Error(`No lender found for identifier: ${identifier}`);
    }

    return lender;
  }
}
