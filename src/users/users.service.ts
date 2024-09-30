import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly rolesService: RolesService
    ) { };

    async create(createUserDto: CreateUserDto) {

        //Searching the role
        const roleFound = await this.rolesService.getRoleByRol(createUserDto.rol)

        if (!roleFound) {
            throw new HttpException('Role not found, enter a valid role', HttpStatus.NOT_FOUND);
        }

        const createdUser = this.usersRepository.create(
            {
                ...createUserDto,
                rol: roleFound
            }
        );

        return await this.usersRepository.save(createdUser);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({
            relations: ['rol']
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneBy({ email });
    }

    async findOneByEmailWithPassword(email: string) {
        return await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'rol', 'creationDate'],
        });
    }

    async findOne(id: string) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            },
            relations: ['rol']
        });

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return userFound;
    }

    async deleteUser(id: string) {
        const result = await this.usersRepository.delete({ id });

        if (result.affected === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateUser(id: string, user: CreateUserDto) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Searches the role before updating the user
        const roleFound = await this.rolesService.getRoleByRol(user.rol);

        if (!roleFound) {
            throw new HttpException('Role not found, enter a valid role', HttpStatus.NOT_FOUND);
        }

        //  Updates the user including object Role
        return this.usersRepository.update(id, {
            ...user,
            rol: roleFound, // Assigning the object Role
        });
    }
}
