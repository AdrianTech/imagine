import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsManageService } from './products-manage.service';

describe('ProductsManageService', () => {
  let service: ProductsManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsManageService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
    }).compile();

    service = module.get<ProductsManageService>(ProductsManageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

// describe('test images update', () => {
//   const gallery = ['pierwsze.jpg', 'drugie.jpg', 'trzecie.jpg', 'czwarte.jpg']
//   const images = ['drugie.jpg', 'czwarte.jpg'];

//   const mockFunc = jest.fn((arr1: string[], arr2: string[]) => arr1.filter(x => !arr2.includes(x)))

//   test('test arrays difference', () => {
//     expect(mockFunc(gallery, images)).toHaveLength(2)
//     expect(mockFunc(gallery, images)).toStrictEqual(['pierwsze.jpg', 'trzecie.jpg']);
//   })
// })
