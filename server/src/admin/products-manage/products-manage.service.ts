import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from '../../products/dto/create-product.dto';
import { UpdateProductDto } from '../../products/dto/update-product.dto';
import { Product } from '../../products/entities/product.entity';
import { UploadFiles } from '../../shared/classes/UploadFiles';
import dbErrorHandler from '../../shared/functions/dbErrorHandle';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsManageService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }
    private readonly uploadedFile: UploadFiles = new UploadFiles()

    create(createProductDto: CreateProductDto, files: Array<Express.Multer.File>) {
        createProductDto.gallery = this.uploadedFile.processFile({ files: files, fileDest: '/uploads/' });
        createProductDto.isAvailable && (createProductDto.isAvailable = createProductDto.isAvailable === 'true');

        const product: Product = this.productRepository.create(createProductDto);
        return this.productRepository.save(product);
    }

    async findOne(id: number): Promise<CreateProductDto> {
        return await this.productRepository.findOne({ where: { id }, relations: ['user'] });
    }

    async updateImages(id: number, images: string[], files: Array<Express.Multer.File>) {
        const product: Product = await this.productRepository.findOneBy({ id },);
        try {
            if (images && images.length) {
                product.gallery = this.removeImagesHandle(product.gallery, images);
            }
            let updatedGallery: string[] = this.uploadedFile.processFile({ files: files, fileDest: '/uploads/' });
            product.gallery = [...product.gallery, ...updatedGallery];

            return this.productRepository.save(product)
        } catch (error) {
            dbErrorHandler('404')
        }

    }

    async remove(id: number): Promise<UpdateProductDto> {
        try {
            const product: Product = await this.productRepository.findOneBy({ id });
            if (product.gallery.length) {
                product.gallery.forEach((img: string) => this.uploadedFile.unlinkFile({ files: product.gallery, filePath: img, fileDest: '/uploads/' }))
            }
            await this.productRepository.remove(product)
            return product
        } catch (err) {
            dbErrorHandler('404')
        }
    }

    private removeImagesHandle(gallery: string[], images: string[]): string[] {
        images.forEach((image: string) => {
            this.uploadedFile.unlinkFile({ files: images, filePath: image, fileDest: '/uploads/' })
        })
        return gallery.filter((img: string) => !images.includes(img))
    }

}
