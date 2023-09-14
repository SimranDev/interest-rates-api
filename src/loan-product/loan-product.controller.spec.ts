import { Test, TestingModule } from '@nestjs/testing';
import { LoanProductController } from './loan-product.controller';

describe('LoanProductController', () => {
  let controller: LoanProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanProductController],
    }).compile();

    controller = module.get<LoanProductController>(LoanProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
