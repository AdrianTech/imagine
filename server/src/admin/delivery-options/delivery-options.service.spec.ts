import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryOptionsService } from './delivery-options.service';

describe('DeliveryOptionsService', () => {
  let service: DeliveryOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryOptionsService],
    }).compile();

    service = module.get<DeliveryOptionsService>(DeliveryOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
