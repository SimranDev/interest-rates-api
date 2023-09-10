import { Controller, Get } from '@nestjs/common';
import { InterestRatesService } from './interest-rates.service';

@Controller('interest-rates')
export class InterestRatesController {
  constructor(private interestRatesService: InterestRatesService) {}

  @Get()
  getAllRates() {
    return this.interestRatesService.getAllRates();
  }
}
