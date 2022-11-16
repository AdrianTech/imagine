import { Body, Controller, Delete, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UsersManageService } from './users-manage.service';
import { Response } from 'express';

@Controller('admin/users')
@UseGuards(JwtAuthGuard)
export class UsersManageController {
  constructor(private readonly usersService: UsersManageService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: Response) {
    return await this.usersService.remove(id);
  }
}
