import { Module, forwardRef, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
import { JWTStrategy } from './jwt.stategy';
import { UsersModule } from 'src/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '10d' }
  }), forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
  exports: [AuthService]
})
export class AuthModule { }
