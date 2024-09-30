import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/common/enums/role.enum';


@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { };//Reflector allows to read metadata attached in the controllers(custom metadata)

  canActivate(context: ExecutionContext): boolean {

    const rol = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ])

    console.log(rol);

    if (!rol) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if(user.rol === Rol.ADMIN) {
      return true;
    }

    return rol === user.rol;
  }
}
