import { Module } from '@nestjs/common';
import { UsersManageService } from './users-manage.service';
import { UsersManageController } from './users-manage.controller';
import { UsersModule } from '../../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  }), TypeOrmModule.forFeature([User])],
  controllers: [UsersManageController],
  providers: [UsersManageService]
})
export class UsersManageModule { }
