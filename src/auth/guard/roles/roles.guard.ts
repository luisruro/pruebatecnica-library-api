import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { };//Reflector allows to read metadata attached in the controllers(custom metadata)

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<Rol>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ])

    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (user.role === Rol.ADMIN) return true;

    return user.rol === requiredRoles;
    // return requiredRoles.some((rol) => user.roles?.includes(rol))
  }
}
