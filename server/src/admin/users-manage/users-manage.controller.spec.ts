import { Test, TestingModule } from '@nestjs/testing';
import { UsersManageController } from './users-manage.controller';
import { UsersManageService } from './users-manage.service';

describe('UsersManageController', () => {
  let controller: UsersManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersManageController],
      providers: [UsersManageService],
    }).compile();

    controller = module.get<UsersManageController>(UsersManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
