import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { TokenUtil } from '../utils/token.util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = TokenUtil.parseBearerToken(request);
    return this.matchRoles(roles, user.role);
  }

  private matchRoles(routeRoles: string[], userRole: string): boolean {
    return routeRoles.some((role) => role === userRole);
  }
}
