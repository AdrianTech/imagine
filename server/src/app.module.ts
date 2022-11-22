import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DecoratorsModule } from './decorators/decorators.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ProductsManageModule } from './admin/products-manage/products-manage.module';
import { UsersManageModule } from './admin/users-manage/users-manage.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import * as dotenv from 'dotenv';
import { DeliveryOptionsModule } from './admin/delivery-options/delivery-options.module';
import general from './configs/general';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // cache: {
    //   type: "database",
    //   tableName: "cache",
    //   duration: 300000
    // },
    entities: ['**/*.entity.js'],
    synchronize: true,
  }), AuthModule, UsersModule, ProductsModule, DecoratorsModule, ProductsManageModule, UsersManageModule, ConfigModule.forRoot({ isGlobal: true }), OrdersModule, DeliveryOptionsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard
  },],
})
export class AppModule { }
