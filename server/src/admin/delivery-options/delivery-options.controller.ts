import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/shared/variables/enums';
import { DeliveryOptionsService } from './delivery-options.service';
import { CreateDeliveryOptionDto } from './dto/create-delivery-option.dto';
import { UpdateDeliveryOptionDto } from './dto/update-delivery-option.dto';

@Controller('admin/delivery')
export class DeliveryOptionsController {
  constructor(private readonly deliveryOptionsService: DeliveryOptionsService) { }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.Moderator, ROLES.Admin)
  @Post()
  create(@Body() createDeliveryOptionDto: CreateDeliveryOptionDto) {
    return this.deliveryOptionsService.create(createDeliveryOptionDto);
  }

  @Get()
  findAll() {
    return this.deliveryOptionsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.Moderator, ROLES.Admin)
  @Get('private')
  findAllAdmin() {
    return this.deliveryOptionsService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryOptionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.Moderator, ROLES.Admin)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDeliveryOptionDto: UpdateDeliveryOptionDto) {
    return this.deliveryOptionsService.update(id, updateDeliveryOptionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryOptionsService.remove(id);
  }
}
