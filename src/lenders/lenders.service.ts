import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LendersService {
  constructor(private prisma: PrismaService) {}

  getAllLenders() {
    return this.prisma.lender.findMany();
  }
}
