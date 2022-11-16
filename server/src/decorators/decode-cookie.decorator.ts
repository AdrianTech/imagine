import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const DecodeCookie = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const jwt = new JwtService();
        const token = ctx.switchToHttp().getRequest().cookies.authToken;
        const decoded = jwt.decode(token);
        if (!decoded) throw new UnauthorizedException();
        return decoded.sub;
    },
);
