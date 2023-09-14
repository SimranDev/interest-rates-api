import { Controller, Get, Param } from '@nestjs/common';
import { LendersService } from './lenders.service';

@Controller('lenders')
export class LendersController {
  constructor(private lendersService: LendersService) {}

  @Get()
  getLenders() {
    return this.lendersService.getLenders();
  }

  @Get('products')
  getLenderProducts() {
    return this.lendersService.getLenderProducts();
  }

  @Get('products/:identifier')
  getLenderByIdentifier(@Param('identifier') identifier: string) {
    return this.lendersService.getLenderByIdentifier(identifier);
  }
}
