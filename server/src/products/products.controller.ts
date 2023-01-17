import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseIntPipe, UseInterceptors, CacheInterceptor, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Roles } from '../decorators/roles.decorator';
import { ROLES } from '../shared/variables/enums';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CheckFileSizePipe } from 'src/pipes/check-file-size.pipe';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @UseInterceptors(CacheInterceptor)
  public async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<CreateProductDto>> {
    console.log(query);
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
  @UseInterceptors(FilesInterceptor('files', 5))
  public update(@Body() updateProductDto: UpdateProductDto, @Param('id', ParseIntPipe) id: number, @UploadedFiles(new CheckFileSizePipe(4)) files: Array<Express.Multer.File>) {
    return this.productsService.update(id, updateProductDto, files);
  }
}
