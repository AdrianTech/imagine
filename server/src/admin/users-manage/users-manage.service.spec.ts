import { Test, TestingModule } from '@nestjs/testing';
import { UsersManageService } from './users-manage.service';

describe('UsersManageService', () => {
  let service: UsersManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersManageService],
    }).compile();

    service = module.get<UsersManageService>(UsersManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
