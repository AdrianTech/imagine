import { Controller, Get, Post, Body, Patch, Param, Res, UseGuards, ParseIntPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DecodeCookie } from '../decorators/decode-cookie.decorator';
import { ROLES } from '../shared/variables/enums';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ResponseUserDto } from './dto/response-user.dto';
import { cookieConfig } from '../configs/cookie';
import { HashPasswordPipe } from '../pipes/hash-password.pipe';
import { CheckUpdateRoleGuard } from '../guards/check-update-role.guard';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly auth: AuthService, private jwt: JwtService,) { }

  @Post('login')
  @Serialize(ResponseUserDto)
  async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) res: any): Promise<ResponseUserDto> {
    const { authToken, user } = await this.auth.login(body);
    res.cookie('authToken', authToken, cookieConfig);
    return user;
  }
  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.Moderator, ROLES.Admin)
  @Get()
  // @Serialize(ResponseUserDto)
  findAll(@Paginate() query: PaginateQuery) {
    return this.usersService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  public logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authToken');
    return "Ok"
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @Serialize(ResponseUserDto)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, CheckUpdateRoleGuard(ROLES.Admin))
  @Patch()
  @UsePipes(new HashPasswordPipe())
  @Serialize(ResponseUserDto)
  async update(@Body() updateUserDto: UpdateUserDto, @DecodeCookie() id: number, @Res({ passthrough: true }) res: Response): Promise<ResponseUserDto> {
    const user = await this.usersService.update(updateUserDto, id);
    if (user.role) {
      const payload: string = this.jwt.sign({ role: user.role, sub: user.id })
      res.cookie('authToken', payload, cookieConfig)
    }
    return user
  }
}
