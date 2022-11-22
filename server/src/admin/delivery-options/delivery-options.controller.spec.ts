import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryOptionsController } from './delivery-options.controller';
import { DeliveryOptionsService } from './delivery-options.service';

describe('DeliveryOptionsController', () => {
  let controller: DeliveryOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryOptionsController],
      providers: [DeliveryOptionsService],
    }).compile();

    controller = module.get<DeliveryOptionsController>(DeliveryOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
