import { Controller, Get, UseGuards } from '@nestjs/common';
import { DecodeCookie } from '../decorators/decode-cookie.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @UseGuards(JwtAuthGuard)
  @Serialize(ResponseUserDto)
  @Get('login')
  login(@DecodeCookie() cookie: number): Promise<ResponseUserDto> {
    return this.authService.rememberLogin(cookie);
  }
}
