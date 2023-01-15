import { Expose, Type } from "class-transformer";
import { IsString, Length, IsNumber, IsOptional, IsDate, ValidateIf, MinDate, Min } from "class-validator";
import { Meta, Links } from "../../shared/dtos/paginate-dto";
import { ResponseUserDto } from "../../users/dto/response-user.dto";

class ResponseProductDto {

    @Expose()
    id: number

    @IsString()
    @Expose()
    @Length(10, 100)
    title: string;

    @Length(10, 500)
    @Expose()
    description: string;

    @IsNumber()
    @Expose()
    price: number;


    @ValidateIf(o => o.discount_start || o.discount_end)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(1.00)
    // @Matches(/[+-]?\d+(\.\d+)?/g, { message: "Prawidłowy format ceny np. 20.00" })
    @Expose()
    discount_price: number;

    @ValidateIf(o => o.discount_price)
    @IsDate({ message: "Cena promocyna wymagnia podania prawidłowej daty jej zakończenia" })
    @MinDate(new Date(), { message: "Data rozpoczęcia promocji nie może być nie starsza niż 'teraz'" })
    @Expose()
    discount_start: Date;

    @ValidateIf(o => o.discount_price)
    @IsDate({ message: "Cena promocyna wymagnia podania prawidłowej daty jej zakończenia" })
    @Expose()
    discount_end: Date;

    @Expose()
    @IsNumber()
    dimension_x: number;

    @Expose()
    @IsNumber()
    dimension_y: number;

    @IsOptional()
    @Expose()
    isAvailable: any;

    @Expose()
    @IsString()
    production_year: string;

    @Expose()
    @IsString()
    technique: string;

    @Expose()
    @IsString()
    style: string;

    @Expose()
    @IsString()
    base: string;

    @Expose()
    gallery: any;

    @IsNumber()
    @Expose()
    userId: number;

    @Expose()
    isPromotion: boolean;

    @Expose()
    @Type(() => ResponseUserDto)
    user: ResponseUserDto

    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}

export class PaginatedClass {
    @Expose()
    data: ResponseProductDto
    @Expose()
    @Type(() => Meta)
    meta: Meta
    @Expose()
    @Type(() => Links)
    links: Links
}