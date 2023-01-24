import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadFiles } from '../shared/classes/UploadFiles';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { PaginateQuery, paginate, Paginated, FilterOperator } from 'nestjs-paginate';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }
  private readonly uploadedFile: UploadFiles = new UploadFiles()

  async findAll(query: PaginateQuery, relation?: any, availability: boolean = false): Promise<Paginated<CreateProductDto>> {
    const setAvailability = !availability ? { isAvailable: true } : {};
    return await paginate(query, this.productRepository, {
      relations: relation && [relation],
      sortableColumns: ['id', 'createdAt', 'updatedAt', 'price', 'title'],
      searchableColumns: ['title', 'price', 'description', 'production_year', 'base', 'technique'],
      filterableColumns: {
        id: [FilterOperator.IN],
        title: [FilterOperator.IN, FilterOperator.EQ],
        production_year: [FilterOperator.IN, FilterOperator.EQ],
        technique: [FilterOperator.IN, FilterOperator.EQ],
        base: [FilterOperator.IN, FilterOperator.EQ],
        price: [FilterOperator.IN, FilterOperator.GTE, FilterOperator.LTE, FilterOperator.BTW],
        isAvailable: [FilterOperator.EQ, FilterOperator.IN]
      },
      defaultSortBy: [['createdAt', 'DESC']],
      where: setAvailability,
      defaultLimit: 5,
    })
  }

  async findOne(id: number): Promise<CreateProductDto> {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: number, body: Partial<UpdateProductDto>, files: Array<Express.Multer.File>) {
    const product = await this.productRepository.findOneBy({ id })
    let updatedGallery = [];

    if (body.removeImages) {
      const deleteImgsArray = body.removeImages.split(',');
      if (product.gallery.length - deleteImgsArray.length < 1) throw new BadRequestException('Obraz powinien mieć co najmniej jedno zdjęcie');
      product.gallery = this.removeImagesHandle(product.gallery, deleteImgsArray);
      delete body.removeImages;
    }

    if (files.length) {
      if (product.gallery.length + files.length > 5) throw new BadRequestException('Obraz może mieć maksymalnie 5 zdjęć');
      updatedGallery = this.uploadedFile.processFile({ files: files, fileDest: '/uploads/' })
    }

    body.gallery = [...updatedGallery, ...product.gallery];
    body.isAvailable && (body.isAvailable = body.isAvailable === 'true');
    await this.productRepository.update(id, body);
    return await this.productRepository.findOneBy({ id });
  }

  private removeImagesHandle(gallery: string[], images: string[]): string[] {
    images.forEach((image: string) => {
      this.uploadedFile.unlinkFile({ files: images, filePath: image, fileDest: '/uploads/' })
    })
    return gallery.filter((img: string) => !images.includes(img))
  }
}
