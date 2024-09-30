import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles/roles.guard';

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
    @Roles('user')
    @Get('profile')
    profile(@Request() req: RequestWithUser) {
        return req.user;
    }
}
