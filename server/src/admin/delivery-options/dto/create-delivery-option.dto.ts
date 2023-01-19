import { Exclude, Expose, Type } from "class-transformer";
import { IsString, IsNumber, IsPositive, MinLength, IsOptional } from "class-validator";
import { OrderProductsDto } from "src/orders/dto/order-products.dto";
import { Order } from "../../../orders/entities/order.entity";

export class CreateDeliveryOptionDto {

    @Expose()
    @IsNumber()
    @IsPositive()
    price: number;

    @Expose()
    @IsString()
    @MinLength(3)
    name: string;

    @Expose()
    @IsOptional()
    active: boolean;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    @Type(() => OrderProductsDto)
    orders: Order[]
}
