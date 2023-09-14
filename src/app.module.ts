import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterestRatesController } from './interest-rates/interest-rates.controller';
import { InterestRatesService } from './interest-rates/interest-rates.service';
import { LendersController } from './lenders/lenders.controller';
import { LendersService } from './lenders/lenders.service';
import { PrismaService } from './prisma.service';
import { ScraperService } from './scraper/scraper.service';

const config = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

@Module({
  imports: [config, ScheduleModule.forRoot()],
  controllers: [AppController, InterestRatesController, LendersController],
  providers: [
    AppService,
    InterestRatesService,
    PrismaService,
    LendersService,
    ScraperService,
  ],
})
export class AppModule {}
