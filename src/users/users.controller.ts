import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Auth(Rol.ADMIN)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {};

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findOne(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        await this.usersService.deleteUser(id);
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
        await this.usersService.updateUser(id, user);
    }
}
