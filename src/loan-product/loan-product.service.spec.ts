import { Test, TestingModule } from '@nestjs/testing';
import { LoanProductService } from './loan-product.service';

describe('LoanProductService', () => {
  let service: LoanProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoanProductService],
    }).compile();

    service = module.get<LoanProductService>(LoanProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
