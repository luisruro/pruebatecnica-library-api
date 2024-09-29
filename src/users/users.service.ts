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
        return await this.usersRepository.findOneBy({email});
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // const userFound = await this.usersRepository.findOne({
        //     where: {
        //         email: createUserDto.email
        //     }
        // })

        // if (userFound) {
        //     throw new HttpException(`User already exists ${userFound.email}`, HttpStatus.CONFLICT);
        // }

        const createdUser = this.usersRepository.create(createUserDto);
        return await this.usersRepository.save(createdUser);
    }
}
