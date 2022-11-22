import { Module } from '@nestjs/common';
import { DeliveryOptionsService } from './delivery-options.service';
import { DeliveryOptionsController } from './delivery-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOption } from './entities/delivery-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOption])],
  controllers: [DeliveryOptionsController],
  providers: [DeliveryOptionsService]
})
export class DeliveryOptionsModule { }
