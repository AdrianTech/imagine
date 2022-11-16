import { Test, TestingModule } from '@nestjs/testing';
import { ProductsManageController } from './products-manage.controller';
import { ProductsManageService } from './products-manage.service';

describe('ProductsManageController', () => {
  let controller: ProductsManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsManageController],
      providers: [ProductsManageService],
    }).compile();

    controller = module.get<ProductsManageController>(ProductsManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
