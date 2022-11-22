import { Module } from '@nestjs/common';
import { ProductsManageService } from './products-manage.service';
import { ProductsManageController } from './products-manage.controller';
import { ProductsModule } from '../../products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../products/entities/product.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [ProductsModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  }), TypeOrmModule.forFeature([Product])],
  controllers: [ProductsManageController],
  providers: [ProductsManageService]
})
export class ProductsManageModule { }
