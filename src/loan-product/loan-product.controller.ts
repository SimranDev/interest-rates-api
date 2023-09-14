import { Controller, Get } from '@nestjs/common';
import { LoanProductService } from './loan-product.service';

@Controller('loan-products')
export class LoanProductController {
  constructor(private loanProduct: LoanProductService) {}

  @Get()
  getLoanProducts() {
    return this.loanProduct.getLoanProducts();
  }
}
