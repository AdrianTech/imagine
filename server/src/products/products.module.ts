import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([Product]), MulterModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [ProductsController],
  providers: [ProductsService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
  exports: [ProductsService]
})
export class ProductsModule { }
