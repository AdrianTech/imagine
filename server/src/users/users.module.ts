import { Module, forwardRef, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [UsersController],
  providers: [UsersService, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
  exports: [UsersService]
})
export class UsersModule { }
