import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LendersController } from './lenders/lenders.controller';
import { LendersService } from './lenders/lenders.service';
import { LoanProductController } from './loan-product/loan-product.controller';
import { LoanProductService } from './loan-product/loan-product.service';
import { PrismaService } from './prisma.service';
import { ScraperService } from './scraper/scraper.service';

const config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

@Module({
  imports: [config, ScheduleModule.forRoot()],
  controllers: [AppController, LendersController, LoanProductController],
  providers: [
    AppService,
    PrismaService,
    LendersService,
    ScraperService,
    LoanProductService,
  ],
})
export class AppModule {}
