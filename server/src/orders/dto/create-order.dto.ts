import { Expose, Type } from "class-transformer";
import { IsString, Length, IsEnum, IsEmail, IsNumber, IsPhoneNumber, Matches, IsNotEmpty, ValidateNested, IsPositive } from "class-validator";
import { DeliveryOption } from "src/admin/delivery-options/entities/delivery-option.entity";
import { DELIVERY } from "../../shared/variables/enums";
import { OrderProductsDto } from "./order-products.dto";

export class CreateOrderDto {

    @IsString()
    @Length(3, 40)
    name: string;

    @IsString()
    @Length(3, 40)
    surname: string;

    @IsString()
    @Length(3, 60)
    city: string;

    @IsString()
    voivodeship: string;

    @IsString()
    @IsPhoneNumber("PL")
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    address: string;

    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsString()
    @Matches(/^[0-9]{2}-[0-9]{3}/, {
        message: 'Poprawny kod pocztowy: "44-100"', context: {
            errorCode: 9999
        }
    })
    zipcode: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => OrderProductsDto)
    productsList: OrderProductsDto[]

    @IsNumber()
    totalPrice: number;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    @Type(() => DeliveryOption)
    @IsNumber()
    deliver: DeliveryOption
}
