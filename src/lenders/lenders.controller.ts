import { Controller, Get, Param } from '@nestjs/common';
import { LendersService } from './lenders.service';

@Controller('lenders')
export class LendersController {
  constructor(private lendersService: LendersService) {}

  @Get()
  getLenders() {
    return this.lendersService.getAllLenders();
  }

  @Get(':identifier')
  getLenderByIdentifier(@Param('identifier') identifier: string) {
    return this.lendersService.getLenderByIdentifier(identifier);
  }

  @Get('products')
  getLendersWithLoanProducts() {
    return this.lendersService.getAllLendersWithLoanProducts();
  }
}
