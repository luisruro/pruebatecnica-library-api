import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles/roles.guard';
import { Rol } from './enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

interface RequestWithUser extends Request {
    user: {
        email: string;
        rol: string;
    }
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Rol.USER)
    @Get('profile1')
    profile1(@Request() req: RequestWithUser) {
        return req.user;
    }

    @Get('profile2')
    @Auth(Rol.ADMIN)//It already contains those guards: AuthGuard, RolesGuard
    profile2(
        @Request()
        req: RequestWithUser,
    ) {
        return req.user;
    }

    @Get('profile')
    @Auth(Rol.USER)
    profile(@ActiveUser() user: ActiveUserInterface) { //@ActiveUser() es una decorador personalizado
        console.log(user)
        return this.authService.profile(user);
    }
}
