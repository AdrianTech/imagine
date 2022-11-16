import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService, private usersService: UsersService) { }

    public async login(user: LoginUserDto) {
        const data = await this.validateUser(user.email, user.password);
        const payload = { role: data.role, sub: data.id }
        return { authToken: this.jwt.sign(payload), user: data }
    }

    public async rememberLogin(cookie: number) {
        if (!cookie) throw new BadRequestException();
        return await this.usersService.findOne(cookie);
    }

    private async validateUser(email: string, password: string) {

        const user = await this.usersService.findByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException();
    }
}
