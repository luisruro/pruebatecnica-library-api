import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { };

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneBy({ email });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(createdUser);
    }

    async findOneByEmailWithPassword(email: string) {
        return await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'rol', 'creationDate', 'deletedAt'],
        });
    }

    async findOne(id: string) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            }
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

        return this.usersRepository.update(id, user);
    }
}
