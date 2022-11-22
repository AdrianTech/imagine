import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryOptionDto } from './create-delivery-option.dto';

export class UpdateDeliveryOptionDto extends PartialType(CreateDeliveryOptionDto) {}
