import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Roles } from '../decorators/roles.decorator';
import { ROLES } from '../shared/variables/enums';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  public async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<CreateProductDto>> {
    return await this.productsService.findAll(query);
  }

  @Get(':id')
  @Serialize(CreateProductDto)
  public async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(ROLES.Moderator, ROLES.Admin)
  @Patch(':id')
  public update(@Body() updateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number) {
    return this.productsService.update(id, updateProductDto);
  }
}
