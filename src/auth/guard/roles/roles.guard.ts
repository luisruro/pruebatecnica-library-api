import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Rol } from 'src/common/enums/role.enum';


@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) { };//Reflector allows to read metadata attached in the controllers(custom metadata)

  canActivate(context: ExecutionContext): boolean {


    //To access metadata astablished in @Roles decorator
    //This method retrieves the allowed roles to the current route or controller
    const roles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ])

    console.log(roles);

    //If no roles are specified, the route or controller is accessible by anyone. It means that rout does not need protection.
    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log(user); //{email: 'luisruro@live.com', rol: 'user', iat: 1727713784, exp: 1727800184}
    
    //Validating user role
    if (!user || !user.rol || !roles.includes(user.rol)) {
      throw new ForbiddenException('Access denied, you are unauthorized');
    }

    return true;
  }
}
