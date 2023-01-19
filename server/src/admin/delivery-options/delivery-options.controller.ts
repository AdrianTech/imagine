import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DeliveryOptionsService } from './delivery-options.service';
import { CreateDeliveryOptionDto } from './dto/create-delivery-option.dto';
import { UpdateDeliveryOptionDto } from './dto/update-delivery-option.dto';

@Controller('admin/delivery')
export class DeliveryOptionsController {
  constructor(private readonly deliveryOptionsService: DeliveryOptionsService) { }

  @Post()
  create(@Body() createDeliveryOptionDto: CreateDeliveryOptionDto) {
    return this.deliveryOptionsService.create(createDeliveryOptionDto);
  }

  @Get()
  findAll() {
    return this.deliveryOptionsService.findAll();
  }
  @Get('private')
  findAllAdmin() {
    return this.deliveryOptionsService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryOptionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDeliveryOptionDto: UpdateDeliveryOptionDto) {
    return this.deliveryOptionsService.update(id, updateDeliveryOptionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryOptionsService.remove(id);
  }
}
