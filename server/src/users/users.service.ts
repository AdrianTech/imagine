import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ResponseUserDto } from './dto/response-user.dto';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findAll(query: PaginateQuery) {
    try {
      return await paginate(query, this.userRepository, {
        relations: ['products'],
        sortableColumns: ['email', 'createdAt', 'updatedAt', 'username', 'role'],
        searchableColumns: ['email', 'username', 'role'],
        filterableColumns: {
          'email': [FilterOperator.IN],
          'username': [FilterOperator.EQ]
        }
      })

    } catch (error) {
      throw new HttpException({
        status: 404,
        error: 'Something went wrong'
      }, HttpStatus.BAD_REQUEST)
    }
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
