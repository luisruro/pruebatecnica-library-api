import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { };//Reflector allows to read metadata attached in the controllers(custom metadata)

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride("roles", [
      context.getClass(),
      context.getHandler(),
    ])

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return user.rol === requiredRoles;
    // return requiredRoles.some((rol) => user.roles?.includes(rol))
  }
}
