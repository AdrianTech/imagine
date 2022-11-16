import { Expose, Type } from "class-transformer";
import { IsString, IsNumber, IsPositive, IsOptional, IsNotEmpty, IsUUID } from "class-validator";

export class OrderProductsDto {
    @IsNumber()
    @IsNotEmpty()
    readonly id: number

    @IsString()
    @IsNotEmpty()
    title: string

    @IsNumber()
    @IsPositive()
    price: number

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    total: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    discount_price?: number | null
}