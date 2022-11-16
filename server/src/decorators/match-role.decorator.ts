import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetTokenRole = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const jwt = new JwtService();
        const token = ctx.switchToHttp().getRequest().cookies.authToken;
        const decoded = jwt.decode(token)['role'];
        return decoded;
    },
);
