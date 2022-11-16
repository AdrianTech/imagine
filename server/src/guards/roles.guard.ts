import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import Helpers from 'src/shared/classes/Helpers';
import { UsersService } from 'src/users/users.service';
import { matchRoles } from '../shared/functions/matchRoles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject(UsersService) readonly usersService: UsersService) { }

  async canActivate(context: ExecutionContext): Promise<any> {
    const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    try {
      const user = await this.usersService.findOne(Helpers.getIdFromToken(context));
      return matchRoles(user.role, roles)
    } catch (error) {
      return false;
    }
  }
}