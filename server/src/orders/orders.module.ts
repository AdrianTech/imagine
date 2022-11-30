import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/entities/product.entity';
import { DeliveryOption } from '../admin/delivery-options/entities/delivery-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, DeliveryOption]), ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
