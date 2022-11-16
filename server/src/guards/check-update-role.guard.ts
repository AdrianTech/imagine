import { Body, CanActivate, ExecutionContext, ForbiddenException, Injectable, mixin } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { matchRoles } from '../shared/functions/matchRoles';
import { ROLES } from '../shared/variables/enums';

export const CheckUpdateRoleGuard = (...roles: ROLES[]) => {
  class CheckUpdateRoleGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ) {
      const body: ROLES = context.switchToHttp().getRequest().body;
      if (body.hasOwnProperty('role')) {
        const jwt = new JwtService()
        const token: string = context.switchToHttp().getRequest().cookies.authToken;
        if (!token) return false;
        const result = matchRoles(jwt.decode(token)['role'], roles)
        if (!result) throw new ForbiddenException("Nie masz uprawnień, aby zmieniać role")
      }
      return true;
    }
  }
  const guard = mixin(CheckUpdateRoleGuardMixin)
  return guard;
}