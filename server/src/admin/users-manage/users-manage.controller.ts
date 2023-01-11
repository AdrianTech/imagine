import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, Res, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UsersManageService } from './users-manage.service';
import { Response } from 'express';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { CheckUpdateRoleGuard } from 'src/guards/check-update-role.guard';
import { HashPasswordPipe } from 'src/pipes/hash-password.pipe';
import { ROLES } from 'src/shared/variables/enums';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('admin/users')
@UseGuards(JwtAuthGuard)
export class UsersManageController {
  constructor(private readonly usersService: UsersManageService) { }

  @Post()
  @Serialize(ResponseUserDto)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, CheckUpdateRoleGuard(ROLES.Admin))
  @Patch()
  @UsePipes(new HashPasswordPipe())
  @Serialize(ResponseUserDto)
  async update(@Body() updateUserDto: UpdateUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseUserDto> {
    const user = await this.usersService.update(updateUserDto);
    return user
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: Response) {
    return await this.usersService.remove(id);
  }
}
