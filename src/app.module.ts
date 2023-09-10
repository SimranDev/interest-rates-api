import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterestRatesController } from './interest-rates/interest-rates.controller';
import { InterestRatesService } from './interest-rates/interest-rates.service';
import { PrismaService } from './prisma.service';
import { LendersController } from './lenders/lenders.controller';
import { LendersService } from './lenders/lenders.service';

@Module({
  imports: [],
  controllers: [AppController, InterestRatesController, LendersController],
  providers: [AppService, InterestRatesService, PrismaService, LendersService],
})
export class AppModule {}
