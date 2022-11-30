import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsString, Length, IsEnum, IsEmail, IsNumber, IsPhoneNumber, Matches, IsNotEmpty, ValidateNested, IsPositive, IsBoolean, IsOptional, IsDate, ValidateIf } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsBoolean()
    @IsOptional()
    finalized?: boolean;

    @IsOptional()
    @ValidateIf(o => o.finalized)
    @IsDate()
    @Type(() => Date)
    finalizationDate: Date;
}
