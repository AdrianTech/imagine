import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            usernameField: "email",
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request?.cookies["authToken"];

                if (!data) {
                    return null;
                }
                return data
            }]),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        })
    }

    async validate(payload: any) {

        return { userId: payload.id, username: payload.email };
    }
}