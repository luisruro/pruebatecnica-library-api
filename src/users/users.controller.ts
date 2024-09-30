import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/role.enum';

@Auth(Rol.ADMIN)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};
}
