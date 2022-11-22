import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateDeliveryOptionDto } from './dto/create-delivery-option.dto';
import { UpdateDeliveryOptionDto } from './dto/update-delivery-option.dto';
import { DeliveryOption } from './entities/delivery-option.entity';

@Injectable()
export class DeliveryOptionsService {
  constructor(@InjectRepository(DeliveryOption) private readonly deliverRepository: Repository<DeliveryOption>) { }

  create(createDeliveryOptionDto: CreateDeliveryOptionDto) {
    const deliveryOption: DeliveryOption = this.deliverRepository.create(createDeliveryOptionDto);
    return this.deliverRepository.save(deliveryOption);
  }

  findAll() {
    return this.deliverRepository.find({ where: { active: true } });
  }

  findOne(id: number) {
    return this.deliverRepository.findOneBy({ id });
  }

  async update(id: number, updateDeliveryOptionDto: UpdateDeliveryOptionDto) {
    const deliverOption: DeliveryOption = await this.deliverRepository.findOneBy({ id });
    if (!deliverOption) throw new NotFoundException();
    Object.assign(deliverOption, updateDeliveryOptionDto);
    return this.deliverRepository.save(deliverOption);
  }

  remove(id: number) {
    return this.deliverRepository.delete(id);
  }
}
