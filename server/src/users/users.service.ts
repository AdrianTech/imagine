import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findAll() {
    return this.userRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email })
  }

  public async update(userData: Partial<User>, id: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

}
