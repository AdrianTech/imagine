import { Body, Get, Controller, Delete, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLES } from 'src/shared/variables/enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { CheckFileSizePipe } from 'src/pipes/check-file-size.pipe';
import { ProductsManageService } from './products-manage.service';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ProductsService } from '../../products/products.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('admin/products')
@UseGuards(JwtAuthGuard)
export class ProductsManageController {
  constructor(private readonly productsService: ProductsManageService, private readonly publicProductsService: ProductsService) { }

  @Roles(ROLES.Moderator, ROLES.Admin)
  @Post()
  @UseInterceptors(FilesInterceptor('files', 5))
  public create(@Body() createProductDto: any, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  @Roles(ROLES.Moderator, ROLES.Admin)
  // @Serialize(CreateProductDto)
  public async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<CreateProductDto>> {
    return await this.publicProductsService.findAll(query, 'user', true);
  }

  @Roles(ROLES.Moderator, ROLES.Admin)
  @Patch('images/:id')
  @UseInterceptors(FilesInterceptor('files', 5))
  public updateProductImages(@Param('id', ParseIntPipe) id: number, @Body() body: { images: string[] }, @UploadedFiles(new CheckFileSizePipe(4)) files: Array<Express.Multer.File>) {

    return this.productsService.updateImages(id, body.images, files)
  }

  @Roles(ROLES.Moderator, ROLES.Admin)
  @Delete(':id')
  protected remove(@Param('id', ParseIntPipe) id: number) {

    return this.productsService.remove(id);
  }

}
