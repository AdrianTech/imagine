import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import dbErrorHandler from 'src/shared/functions/dbErrorHandle';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
const saltOrRounds = 10;

@Injectable()
export class UsersManageService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = this.userRepository.create(createUserDto);
            const hash = bcrypt.hashSync(user.password, saltOrRounds);
            user.password = hash;
            return await this.userRepository.save(user);
        } catch (error) {
            dbErrorHandler(error.code);
        }
    }

    public async update(userData: Partial<User>): Promise<ResponseUserDto> {
        const user = await this.userRepository.findOneBy({ id: userData.id });
        if (!user) throw new NotFoundException();
        Object.assign(user, userData);
        await this.userRepository.save(user);
        return await this.userRepository.findOneBy({ id: userData.id });
    }

    public async remove(id: number) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            await this.userRepository.remove(user)
            return true
        } catch (err) {
            dbErrorHandler('404');
        }
    }
}
