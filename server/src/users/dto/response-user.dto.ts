import { Exclude, Expose, Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { Product } from "../../products/entities/product.entity";
import { ROLES } from "../../shared/variables/enums";

export class ResponseUserDto {
    @Expose()
    id: number;
    @Expose()
    username: string;
    @Expose()
    role: ROLES;
    @Expose()
    email: string;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;
    @Expose()
    @Type(() => CreateProductDto)
    products: CreateProductDto[];
    @Exclude()
    password?: string;
    constructor(partial: Partial<ResponseUserDto>) {
        Object.assign(this, partial)
    }
}