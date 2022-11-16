import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
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

  async update(id: number, updateProductDto: Partial<UpdateProductDto>) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException();
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product)
  }
}
