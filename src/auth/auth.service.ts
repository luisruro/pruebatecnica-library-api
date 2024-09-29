import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { };

    async register ({password, email, name}: RegisterDto) {
        const userFound = await this.usersService.findOneByEmail(email);

        if (userFound) {
            throw new HttpException(`Email already registered ${userFound.email}`, HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.usersService.create({
            name,
            email,
            password: hashedPassword   
        });

        return {
            message: `User created successfully`
        }
    }
}
