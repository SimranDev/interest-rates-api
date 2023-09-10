import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterestRatesService {
  constructor(private prisma: PrismaService) {}

  getAllRates() {
    return this.prisma.lenderInterestRate.findMany();
  }
}
