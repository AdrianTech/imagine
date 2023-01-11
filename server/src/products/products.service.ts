import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFiles } from '../shared/classes/UploadFiles';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginateQuery, paginate, Paginated, FilterOperator } from 'nestjs-paginate';
import Helpers from 'src/shared/classes/Helpers';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }
  private readonly uploadedFile: UploadFiles = new UploadFiles()

  async findAll(query: PaginateQuery, relation?: any): Promise<Paginated<CreateProductDto>> {
    return await paginate(query, this.productRepository, {
      relations: relation && [relation],
      sortableColumns: ['id', 'createdAt', 'updatedAt', 'price', 'title'],
      searchableColumns: ['title', 'price', 'description'],
      defaultSortBy: [['createdAt', 'DESC']],
      where: { isAvailable: true },
      defaultLimit: 5,
    })
  }

  async findOne(id: number): Promise<CreateProductDto> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: number, body: Partial<UpdateProductDto>, files: Array<Express.Multer.File>) {
    const product = await this.productRepository.findOneBy({ id })

    if (files.length) {
      if (product.gallery.length + files.length > 5) throw new BadRequestException('Obraz może mieć maksymalnie 5 zdjęć');
      body.gallery = this.uploadedFile.processFile({ files: files, fileDest: '/uploads/' });
    }

    if (body.removeImages) {
      if (product.gallery.length - body.removeImages.length < 1) throw new BadRequestException('Obraz powinien mieć co najmniej jedno zdjęcie');
      body.gallery = product.gallery.filter((item: string) => !body.removeImages.includes(item))
      body.removeImages.forEach((img: string) => this.uploadedFile.unlinkFile({ files: product.gallery, filePath: img, fileDest: '/uploads/' }))
      delete body.removeImages;
    }

    body.isAvailable && (body.isAvailable = Boolean(body.isAvailable));
    await this.productRepository.update(id, body);
    return await this.productRepository.findOneBy({ id });
  }
}
