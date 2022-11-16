import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product]), ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }]
})
export class OrdersModule { }
