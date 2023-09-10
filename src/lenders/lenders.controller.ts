import { Controller, Get } from '@nestjs/common';
import { LendersService } from './lenders.service';

@Controller('lenders')
export class LendersController {
  constructor(private lendersService: LendersService) {}

  @Get()
  getAllRates() {
    return this.lendersService.getAllLenders();
  }
}
